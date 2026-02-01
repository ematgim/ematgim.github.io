import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: '¡Hola! ¿En qué puedo ayudarte?', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleToggleChat = () => {
    if (!isOpen && !conversationId) {
      // Generate new conversationId when opening chat for first time
      setConversationId(uuidv4());
    }
    setIsOpen(!isOpen);
  };

  const callAgentAPI = async (prompt: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/agent/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          conversationId 
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Handle SSE streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          // Keep the last incomplete line in the buffer
          buffer = lines[lines.length - 1];
          
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('data:')) {
              const dataStr = line.substring(5).trim();
              try {
                const data = JSON.parse(dataStr);
                
                // Handle chunk events
                if (data.type === 'token' && data.data) {
                  fullResponse += data.data;
                  
                  // Update message in real-time
                  setMessages((prev) => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && !lastMessage.isUser) {
                      return [
                        ...prev.slice(0, -1),
                        { ...lastMessage, text: fullResponse }
                      ];
                    }
                    return [...prev, { text: fullResponse, isUser: false }];
                  });
                }
              } catch (e) {
                console.error('Error parsing SSE data:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error calling API:', error);
      setMessages((prev) => [
        ...prev,
        { 
          text: 'Lo siento, ocurrió un error al conectar con el servidor. Asegúrate de que está ejecutándose en http://localhost:3000', 
          isUser: false 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = inputValue;
    setMessages([...messages, { text: userMessage, isUser: true }]);
    setInputValue('');

    // Add loading placeholder
    setMessages((prev) => [
      ...prev,
      { text: '...', isUser: false }
    ]);

    // Call API with streaming
    await callAgentAPI(userMessage);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-[#0a0a0a] border border-gray-800 rounded-lg shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gradient-to-r from-green-500/10 to-transparent">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                <MessageCircle size={18} className="text-[#0a0a0a]" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Chat Assistant</h3>
                <p className="text-xs text-gray-400">En desarrollo</p>
              </div>
            </div>
            <button
              onClick={handleToggleChat}
              className="p-1 hover:bg-gray-800 rounded transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={20} className="text-gray-400 hover:text-gray-200" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-green-500 text-[#0a0a0a] rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none'
                  }`}
                >
                  {message.isUser ? (
                    <p className="text-sm">{message.text}</p>
                  ) : (
                    <div className="text-sm prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold text-green-400">{children}</strong>,
                          em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2 pl-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 pl-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="text-sm">{children}</li>,
                          code: ({ children }) => <code className="bg-gray-900 px-2 py-1 rounded text-green-400 text-xs">{children}</code>,
                          h1: ({ children }) => <h1 className="font-bold text-lg mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="font-bold text-base mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="font-bold text-sm mb-1">{children}</h3>,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors shadow-[0_0_10px_rgba(34,197,94,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                <Send size={20} className="text-[#0a0a0a]" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all z-50 group"
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <X size={24} className="text-[#0a0a0a]" />
        ) : (
          <MessageCircle size={24} className="text-[#0a0a0a] group-hover:scale-110 transition-transform" />
        )}
      </button>
    </>
  );
};
