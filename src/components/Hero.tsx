import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onPostNow: () => void;
}

export default function Hero({ onExplore, onPostNow }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen bg-transparent flex items-center overflow-hidden pt-24 pb-16">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-gold-500/10 blur-[130px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Animated Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 text-gold-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase self-center lg:self-start mb-6 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 fill-gold-400 animate-pulse text-gold-400" />
              THỜI TRANG NỮ CAO CẤP TINA SHOP
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight"
            >
              Nâng Tầm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-gold-400 to-amber-200 font-normal italic">
                Phong Cách
              </span> <br />
              Cùng Bạn Tỏa Sáng
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal"
            >
              Khám phá trọn bộ sưu tập đầm lụa, blazer tôn dáng và phụ kiện thiết kế thời thượng nhất 2026. Tina Shop mang đến sự hòa quyện tuyệt vời giữa tính cổ điển lãng mạn và tinh tế hiện đại dưới một thiết kế Frosted Glass sang trọng.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={onExplore}
                className="group flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-slate-950 font-sans text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all shadow-lg shadow-gold-500/20 hover:shadow-gold-500/35 hover:-translate-y-0.5 cursor-pointer font-bold"
              >
                Mua Ngay 2026 Collection
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onPostNow}
                className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-sans text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all hover:shadow-md cursor-pointer font-bold backdrop-blur-md"
              >
                Góc Chia Sẻ / Đăng Tin
                <Star className="w-4 h-4 text-gold-400 fill-gold-400 animate-pulse" />
              </button>
            </motion.div>

            {/* Micro Stats or Trust Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0 text-left"
            >
              <div>
                <dt className="text-xl sm:text-2xl font-serif font-bold text-white">50k+</dt>
                <dd className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold font-sans mt-1">Khách Hàng</dd>
              </div>
              <div className="border-l border-white/10 pl-4">
                <dt className="text-xl sm:text-2xl font-serif font-bold text-white">99.8%</dt>
                <dd className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold font-sans mt-1">Hài Lòng</dd>
              </div>
              <div className="border-l border-white/10 pl-4">
                <dt className="text-xl sm:text-2xl font-serif font-bold text-white">20+</dt>
                <dd className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold font-sans mt-1">Cửa Hàng</dd>
              </div>
            </motion.div>
          </div>

          {/* High-Impact Visual Collage */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-full max-w-[400px] h-[480px] sm:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl z-10"
            >
              {/* Elegant fashion model shot */}
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
                alt="Tina Shop Collection"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <p className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-gold-300 mb-1">Xu hướng mùa này</p>
                <h4 className="font-serif text-lg sm:text-xl font-bold leading-tight">Đầm lụa cát bay siêu tinh xảo & đầm cổ yếm đính ngọc</h4>
              </div>
            </motion.div>

            {/* Tiny Floating decorative badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-2 sm:right-4 bg-slate-900/80 backdrop-blur-md shadow-2xl border border-white/10 p-4 rounded-2xl flex items-center gap-3 z-25 max-w-[180px]"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-sans font-bold text-slate-100 leading-snug">Bộ thiết kế tự hào thủ công</p>
                <p className="text-[9px] font-sans text-slate-400">100% tơ tằm dệt tay</p>
              </div>
            </motion.div>

            {/* Bottom Left Badge: Dynamic Property / Location hint */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-4 -left-2 sm:-left-4 bg-slate-900/80 backdrop-blur-md shadow-2xl border border-white/15 p-3.5 rounded-2xl flex items-center gap-3 z-10 max-w-[210px] cursor-pointer"
              onClick={onPostNow}
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-sans font-bold text-slate-100 leading-snug">Hạ tầng bđs kết hợp?</p>
                <p className="text-[9px] font-sans text-gold-300 font-semibold underline">Xem tin đăng lô đất vị trí vàng vây quanh shop</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
