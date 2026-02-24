import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { MessageSquare, Camera, X, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AICropDoctor = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Habari! Mimi ni daktari wako wa mimea. Naweza kukusaidiaje leo? Unaweza kupakia picha ya mmea wako au kuelezea tatizo.", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiText = "Asante kwa taarifa. Kwa uchunguzi wa kina, tafadhali pakia picha ya mmea ulioathirika au wasiliana na wataalamu wetu kwa WhatsApp.";

      const lowerInput = userMessage.text.toLowerCase();
      if (lowerInput.includes('mahindi') || lowerInput.includes('maize')) {
        aiText = "Kwa zao la mahindi, magonjwa ya kawaida ni Viwavijeshi au Madoa ya Majani. Je, unaona dalili zipi kwenye majani?";
      } else if (lowerInput.includes('bei') || lowerInput.includes('price')) {
        aiText = "Kwa bei za soko za hivi karibuni, tafadhali angalia sehemu yetu ya Takwimu za Soko kwenye tovuti.";
      }

      const aiMessage = { id: Date.now() + 1, text: aiText, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const whatsappLink = "https://wa.me/255740691481?text=Hello%20AOC%20TZ,%20I%20need%20help%20with%20my%20crops.";
  const telegramLink = "https://t.me/aoc_tz_bot";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[80vh] flex flex-col bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/10 overflow-hidden"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center shrink-0 shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold font-heading text-sm">AI</div>
                <div>
                  <div className="font-bold text-[0.95rem] leading-tight">{t('aiDoctor.title')}</div>
                  <div className="text-[0.75rem] text-white/80 font-medium">{isTyping ? 'Anachapa...' : 'Mtandaoni'}</div>
                </div>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white border-none cursor-pointer" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-5 bg-slate-50/50">
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                    {msg.sender === 'ai' && <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[0.65rem] shrink-0">AI</div>}
                    <div className={`p-3.5 text-[0.9rem] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-2xl rounded-br-sm' : 'bg-white text-text border border-black/5 rounded-2xl rounded-bl-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-end gap-2 max-w-[85%] self-start">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[0.65rem] shrink-0">AI</div>
                    <div className="p-3.5 text-[0.9rem] leading-relaxed shadow-sm bg-white text-text border border-black/5 rounded-2xl rounded-bl-sm flex gap-1 items-center justify-center text-primary py-2 px-3">
                      <span className="animate-bounce delay-75">•</span><span className="animate-bounce delay-150">•</span><span className="animate-bounce delay-300">•</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-4 bg-white border-t border-black/5 shrink-0 flex flex-col gap-3">
              <form onSubmit={handleSend} className="flex items-center gap-2 bg-surface rounded-full p-1 border border-black/5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <button type="button" className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-primary rounded-full hover:bg-white transition-colors cursor-pointer border-none shrink-0" title="Upload Image">
                  <Camera size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Andika hapa..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent border-none text-[0.9rem] text-text px-2 py-2 focus:outline-none min-w-0"
                />
                <button type="submit" className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full transition-all duration-300 hover:scale-105 hover:bg-primary-light disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer border-none shrink-0" disabled={!inputValue.trim()}>
                  <Send size={18} />
                </button>
              </form>
              <div className="flex justify-between items-center px-1">
                <small className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">Au wasiliana nasi:</small>
                <div className="flex items-center gap-2">
                  <a href={whatsappLink} target="_blank" rel="noreferrer" title="WhatsApp" className="text-text-muted hover:text-primary transition-colors p-1"><MessageCircle size={18} /></a>
                  <a href={telegramLink} target="_blank" rel="noreferrer" title="Telegram" className="text-text-muted hover:text-primary transition-colors p-1"><Send size={18} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`bg-primary text-white flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer border-none group ${isOpen ? 'w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 rotate-90' : 'h-14 rounded-full px-4 gap-2.5 hover:shadow-xl hover:-translate-y-1'}`}
        onClick={() => setIsOpen(!isOpen)}
        title={t('aiDoctor.title')}
      >
        {isOpen ? <X size={24} className="-rotate-90" /> : <MessageSquare size={24} />}
        {!isOpen && <span className="font-bold text-[0.95rem] whitespace-nowrap hidden sm:block pr-2">{t('aiDoctor.title')}</span>}
      </button>
    </div>
  );
};

export default AICropDoctor;
