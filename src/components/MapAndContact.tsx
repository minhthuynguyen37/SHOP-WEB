import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  Compass,
  Info
} from 'lucide-react';

export default function MapAndContact() {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<'hcm' | 'hanoi'>('hcm');

  // Branch Addresses & Coordinates
  const BRANCHES = {
    hcm: {
      address: 'Shop 08, Tầng G, Thương xá Đồng Khởi, 151 Đồng Khởi, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      phone: '0901.888.999',
      hours: '08:30 AM - 10:00 PM',
      mapsIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.460232426312!2d106.700146315334!3d10.776019462145887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919.460232!2zMTUxIMSQ4buTbmcgS2jhu59pLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1689531839811!5m2!1svi!2s'
    },
    hanoi: {
      address: 'Biệt Thự Số 12, Phố Tràng Tiền, Quận Hoàn Kiếm, Hà Nội (Gần Nhà Hát Lớn)',
      phone: '0902.666.777',
      hours: '09:00 AM - 09:30 PM',
      mapsIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.113204961559!2d105.85236731538356!3d21.02813639317585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3724.1132!2zMTIgVHLDoG5nIFRp4buBbiwgSG_DoG4gS2nhur9tLCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1689531940922!5m2!1svi!2s'
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      
      // Auto dismiss success window
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-gold-400 mb-2">Kết Nối Với Chúng Tôi</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            LIÊN HỆ & BẢN ĐỒ CHI NHÁNH
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mb-6 rounded-full shadow-[0_0_8px_#fbbf24]" />
          <p className="text-slate-300 text-sm font-sans font-normal leading-relaxed">
            Điền thông tin đặt mua hàng gấp, đăng ký làm đại lý hoặc nhận thông tin chiết khấu của các dự án bất động sản chung quanh showroom Tina Shop.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact Form with Glassmorphism */}
          <div className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-gold-500/20 flex items-center justify-center text-gold-400 border border-gold-500/25">
                  <MessageSquare className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-extrabold text-white">FORM LIÊN HỆ NHANH</h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">Phản hồi ngay tức thì trong 15 phút</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center flex flex-col items-center justify-center py-10"
                  >
                    <CheckCircle className="w-12 h-12 text-emerald-400 mb-3 animate-pulse" />
                    <h4 className="font-serif text-lg font-bold text-white mb-1">GỬI LỜI NHẮN ĐÃ THÀNH CÔNG!</h4>
                    <p className="text-xs font-sans text-slate-300 leading-relaxed">
                      Cảm ơn nàng đã gửi lời nhắn cho TINA SHOP. Đội ngũ stylist của chúng tôi cùng tư vấn viên dự án sẽ liên hệ ngay cho bạn qua số điện thoại/Zalo trong thời gian sớm nhất!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-sans font-bold text-slate-300 mb-1">
                        Họ Và Tên Khách Hàng <span className="text-gold-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ví dụ: Hoàng Minh Thủy"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-sans font-bold text-slate-300 mb-1">
                        Số Điện Thoại / Zalo <span className="text-gold-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ví dụ: 0901234567"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-sans font-bold text-slate-300 mb-1">
                        Hộp thư Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ví dụ: thuy@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-sans font-bold text-slate-300 mb-1">
                        Lời nhắn hoặc Mã sản phẩm / Lô đất dã xem <span className="text-gold-500">*</span>
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Điền lời nhắn của bạn (Ví dụ: Tư vấn giúp tôi đầm lụa satin size M, hoặc tôi quan tâm vị trí của lô đất dốc quanh shop...)"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 disabled:bg-slate-800 text-slate-950 font-sans text-xs tracking-widest uppercase py-3.5 rounded-xl transition-all font-bold cursor-pointer hover:shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>Đang gửi yêu cầu...</>
                      ) : (
                        <>
                          Gửi Yêu Cầu Nhận Tư Vấn
                          <Send className="w-3.5 h-3.5 text-slate-950" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

            {/* Micro Contact Cards Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-semibold text-white">Hotline tư văn thời trang:</span>
                <span className="font-mono text-slate-300">{BRANCHES[selectedBranch].phone}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="font-semibold text-white">Email quản lý đơn hàng:</span>
                <span className="font-mono text-slate-300">contact@tinashop.vn</span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Interactive Branches Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden glass-panel relative flex flex-col justify-between">
            
            {/* Top Branch Selector Toggle Tab with Dark Glass Style */}
            <div className="p-5 sm:p-6 bg-slate-950/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-gold-400 animate-pulse" />
                <span className="font-serif text-base font-extrabold text-white uppercase">Tìm TINA SHOP Gần Bạn</span>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl text-xs font-sans font-bold border border-white/5">
                <button
                  type="button"
                  onClick={() => setSelectedBranch('hcm')}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedBranch === 'hcm' 
                      ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Hồ Chí Minh
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBranch('hanoi')}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedBranch === 'hanoi' 
                      ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20 font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Hà Nội
                </button>
              </div>
            </div>

            {/* Embedded maps Iframe with detailed address overlays */}
            <div className="relative flex-grow min-h-[350px] bg-slate-900 flex flex-col justify-end">
              <iframe
                src={BRANCHES[selectedBranch].mapsIframe}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of Tina Shop ${selectedBranch.toUpperCase()}`}
                className="w-full h-full opacity-85 hover:opacity-100 transition-opacity"
              ></iframe>

              {/* Map Info Overlay dark glassmorphism card */}
              <div className="relative z-10 m-4 p-4 sm:p-5 bg-slate-950/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 max-w-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 shrink-0 mt-0.5 border border-gold-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-black text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      Showroom Tina {selectedBranch === 'hcm' ? 'Quận 1, HCMC' : 'Tràng Tiền, Hà Nội'}
                    </h4>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed mb-3">
                      {BRANCHES[selectedBranch].address}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-sans text-slate-400 font-semibold border-t border-white/10 pt-2.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        Giờ mở cửa: {BRANCHES[selectedBranch].hours}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        SĐT: {BRANCHES[selectedBranch].phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property list hint box embedded at footer of branch map */}
            <div className="bg-amber-500/5 p-4 border-t border-amber-500/10 flex items-center gap-3.5 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/20">
                <Info className="w-4.5 h-4.5" />
              </div>
              <div className="text-left flex-grow">
                <p className="text-xs font-sans text-amber-200 leading-snug">
                  <strong className="font-bold">Mẹo thực tế:</strong> Các lô bất động sản được chia sẻ trong mục <strong className="font-semibold">"Bản Tin Đăng"</strong> đều nằm trong bán kính sầm uất 1km xung quanh showroom của chúng tôi, mở ra cơ hội kinh doanh kết hợp đắc địa.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
