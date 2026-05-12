import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Minus, Maximize2, MessageSquare, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { getAIAssistantResponse } from '../services/aiService';

export function SiteAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Witaj! Jestem Twoim noweAgentem. Jak mogę Ci dzisiaj pomóc w zarabianiu lub zakupach?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (window as any).togglenoweAgent = () => setIsOpen(prev => !prev);
    return () => { delete (window as any).togglenoweAgent; };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideText?: string) => {
    const userMessage = overrideText || inputValue.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getAIAssistantResponse(userMessage, "Jesteś pływającym asystentem na stronie noweimperium AI. Pomagasz nawigować, szukać okazji i wyjaśniasz automatyzację.");
      setMessages(prev => [...prev, { role: 'assistant', content: response || "🤖 Przepraszam, ale nie otrzymałem odpowiedzi od modułu AI. Spróbuj ponownie." }]);
    } catch (err: any) {
      // getAIAssistantResponse already uses handleGeminiError and returns a string, 
      // but in case of a crash before that, we have this fallback.
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "❌ Wystąpił krytyczny błąd podczas komunikacji z asystentem. Spróbuj odświeżyć stronę." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[380px] overflow-hidden rounded-[32px] bg-white shadow-2xl border border-slate-100 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Bot size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest">noweAgent AI</h3>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400">Online • 24/7 Support</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl p-4 text-sm font-medium leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "ml-auto bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                  )}
                >
                  {msg.content}
                </motion.div>
              ))}
              {isTyping && (
                <div className="bg-white border border-slate-100 text-slate-400 p-3 rounded-2xl rounded-tl-none w-fit text-xs font-bold animate-pulse flex items-center gap-2">
                  <Sparkles size={12} /> noweAgent myśli...
                </div>
              )}

              {!isTyping && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    "Jak zarabiać?",
                    "Czym są boty AI?",
                    "Integracja Allegro",
                    "Centrum Inwestora"
                  ].map((text) => (
                    <button
                      key={text}
                      onClick={() => handleSend(text)}
                      className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-white border border-slate-100 rounded-full text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Zapytaj o cokolwiek..."
                  className="w-full rounded-2xl bg-slate-50 border-none pl-4 pr-12 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 w-16 rounded-3xl flex items-center justify-center text-white shadow-2xl transition-all duration-300",
          isOpen ? "bg-slate-900 rotate-90" : "bg-blue-600"
        )}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
}
