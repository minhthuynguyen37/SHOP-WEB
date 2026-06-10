import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Check, SendIcon, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function MessengerChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Chào nàng! Tina Shop rất hạnh phúc được đón tiếp nàng ghé thăm không gian lụa tơ tằm thượng hạng. 🥰',
      time: 'Vừa xong'
    },
    {
      id: '2',
      sender: 'bot',
      text: 'Nàng cần stylist của chúng mình tư vấn chi tiết về bảng size, chất liệu dệt Haute Couture hay đặt may riêng cho sự kiện đặc biệt sắp tới ạ?',
      time: 'Vừa xong'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate luxury assistance typing standard response
    setTimeout(() => {
      setIsTyping(false);
      let replyText = 'Dạ thưa quý nàng, tin nhắn đã được chuyển tiếp trực tiếp đến stylist trưởng của Tina Shop. Stylist sẽ liên hệ trực tiếp cho nàng qua số điện thoại hoặc tin nhắn Zalo/Messenger ngay lập tức trong 5-10 phút để phục vụ chu đáo nhất ạ! ✨';
      
      const lowerText = textToSend.toLowerCase();
      if (lowerText.includes('size') || lowerText.includes('đo') || lowerText.includes('vừa')) {
        replyText = 'Dạ về size thiết kế, Tina hỗ trợ may riêng tỉ mỉ theo chính xác số đo 3 vòng của nàng hoàn toàn miễn phí nha! Nàng vui lòng để lại Số điện thoại, stylist sẽ gọi điện hỗ trợ nàng lấy số đo chuẩn xác tức thì ạ. ❤️';
      } else if (lowerText.includes('giá') || lowerText.includes('bao nhiêu') || lowerText.includes('tiền')) {
        replyText = 'Dạ các sản phẩm lụa Haute Couture cao cấp của Tina Shop đang được ưu đãi trọn gói may đo riêng chỉ từ 750k - 1500k kèm hộp quà tặng sang trọng. Nàng ưng ý mẫu đầm nào để chuyên viên gửi trọn bộ album ảnh thật mặc lên dáng tôn da gửi riêng cho nàng nhé! 🥰';
      } else if (lowerText.includes('địa chỉ') || lowerText.includes('ở đâu') || lowerText.includes('đường')) {
        replyText = 'Dạ hiện tại Tina Shop có showroom cao cấp tại: \n📍 Chi nhánh 1: Shop 08, Tầng G, Thương xá Đồng Khởi, Q.1, TP. HCM \n📍 Chi nhánh 2: Số 68 Đường Nguyễn Năng Tĩnh, Phường Đông Vĩnh, Thành phố Vinh, Nghệ An.\n\nMời nàng ghé showroom thử đồ uống trà couture và trải nghiệm cảm giác mềm mịn của tơ tằm thiên nhiên ạ!';
      }

      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 1200);
  };

  const handlePresetSelect = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div id="floating-messenger-chat-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Messenger Chat Dialogue Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-[340px] sm:w-[380px] h-[520px] bg-slate-950/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col backdrop-blur-2xl mb-4"
          >
            {/* Elegant Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <Sparkles className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-md"></span>
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-sm font-black text-white uppercase tracking-wider">Tina Couture Chat</h4>
                  <p className="text-[10px] text-emerald-400 font-sans font-semibold">Tư vấn trực tiếp online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start gap-2.5`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-500/20 text-gold-400 font-serif text-[10px] font-black flex items-center justify-center shrink-0">
                        T
                      </div>
                    )}
                    <div className="max-w-[78%] flex flex-col">
                      <div
                        className={`p-3 text-xs font-sans leading-relaxed rounded-2xl ${
                          isBot
                            ? 'bg-white/5 border border-white/5 text-slate-200 rounded-tl-none text-left whitespace-pre-line'
                            : 'bg-gold-500 text-slate-950 font-bold rounded-tr-none text-left'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1 pl-1 text-left">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Simulated Stylist Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gold-500/15 border border-gold-500/20 text-gold-400 font-serif text-[10px] font-black flex items-center justify-center shrink-0">
                    T
                  </div>
                  <div className="p-3 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gold-400/80 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gold-400/80 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gold-400/80 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions suggestion pills */}
            <div className="px-4 py-2 bg-slate-900/30 border-t border-white/5 flex flex-wrap gap-1.5">
              {[
                '🌸 Tư vấn mẫu mới nhất',
                '📐 May đo riêng theo số đo',
                '📍 Showroom Nguyễn Năng Tĩnh ở đâu?',
                '🚚 Miễn phí vận chuyển không?'
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => handlePresetSelect(q)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-gold-500 hover:text-slate-950 transition-all font-sans text-[10px] text-slate-300 font-semibold cursor-pointer border border-white/5"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Text Input Panel */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2.5"
            >
              <input
                type="text"
                placeholder="Nhập câu hỏi của quý nàng tại đây..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-xl bg-gold-500 text-slate-950 flex items-center justify-center font-bold hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all cursor-pointer focus:outline-none shrink-0"
              >
                <Send className="w-4 h-4 text-slate-950" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkled Messenger Button with Ripple Rings */}
      <div className="relative">
        {/* Ambient Pulsing Glow Rings */}
        <span className="absolute -inset-1.5 rounded-full bg-gold-500/30 blur-md animate-ping pointer-events-none"></span>
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-sky-400 via-pink-500 to-indigo-500/30 opacity-75 animate-pulse filter blur-sm pointer-events-none"></span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-pink-600 to-amber-500 text-white flex items-center justify-center shadow-2xl hover:scale-115 active:scale-90 transition-all duration-300 cursor-pointer focus:outline-none z-10 border border-white/20`}
          title="Trò chuyện với Tina Shop"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6.5 h-6.5 text-white fill-white/10 animate-bounce-slow" />
          )}

          {/* Unread Alert Dot indicator */}
          {!isOpen && (
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-black font-sans text-white">
              1
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
