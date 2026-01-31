import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: '¡Hola! ¿En qué puedo ayudarte?', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage = inputValue;
    
    // Agregar mensaje del usuario
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Llamar al endpoint de streaming
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      console.log(`[Chat] Conectando a ${apiUrl}/api/chat/stream`);
      
      const response = await fetch(`${apiUrl}/api/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          model: 'llama3.2'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Chat] Error HTTP ${response.status}:`, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText || 'Error desconocido'}`);
      }

      console.log('[Chat] Conexión establecida, recibiendo stream...');

      // Procesar el stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let botMessage = '';
      let messageAdded = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((line) => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            
            // Ignorar el token [DONE]
            if (dataStr === '[DONE]') {
              console.log('[Chat] Stream completado');
              continue;
            }

            try {
              const data = JSON.parse(dataStr);

              if (data.error) {
                console.error('[Chat] Error del servidor:', data.error);
                throw new Error(data.error);
              }

              if (data.text) {
                botMessage += data.text;

                // Agregar el mensaje del bot la primera vez
                if (!messageAdded) {
                  setMessages((prev) => [...prev, { text: botMessage, isUser: false }]);
                  messageAdded = true;
                } else {
                  // Actualizar el último mensaje (del bot)
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].text = botMessage;
                    return updated;
                  });
                }
              }
            } catch (parseError) {
              console.warn('[Chat] Error al parsear línea:', dataStr, parseError);
            }
          }

        }
      }

      if (!messageAdded) {
        setMessages((prev) => [...prev, { text: 'No se recibió respuesta del modelo.', isUser: false }]);
      }
    } catch (error) {
      console.error('[Chat] Error completo:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      const userFriendlyError = errorMessage.includes('Failed to fetch') 
        ? `❌ No se puede conectar al servidor. Verifica que esté corriendo en ${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`
        : `❌ Error: ${errorMessage}`;
      setMessages((prev) => [
        ...prev,
        { text: userFriendlyError, isUser: false }
      ]);
    } finally {
      setIsLoading(false);
    }
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
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 rounded-lg rounded-bl-none p-3 flex items-center gap-2">
                  <Loader size={16} className="animate-spin" />
                  <span className="text-sm">Pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                placeholder={isLoading ? "Esperando respuesta..." : "Escribe tu mensaje..."}
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading || inputValue.trim() === ''}
                className="p-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-[0_0_10px_rgba(34,197,94,0.2)]"
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
