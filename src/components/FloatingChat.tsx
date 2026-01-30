import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: '¡Hola! ¿En qué puedo ayudarte?', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    setMessages([...messages, { text: inputValue, isUser: true }]);
    setInputValue('');

    // Simulate a bot response (placeholder for future API integration)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: 'Gracias por tu mensaje. Pronto integraré un agente para responder.', isUser: false }
      ]);
    }, 1000);
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
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50"
              />
              <button
                type="submit"
                className="p-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors shadow-[0_0_10px_rgba(34,197,94,0.2)]"
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
