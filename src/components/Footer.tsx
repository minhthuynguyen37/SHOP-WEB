import React, { useState } from 'react';
import { ArrowUp, Instagram, Facebook, Heart } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [emailValue, setEmailValue] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (emailValue.trim()) {
      setIsSubscribed(true);
      setEmailValue('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950/80 backdrop-blur-md text-white pt-16 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Top absolute circle background line accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div 
              className="flex flex-col cursor-pointer mb-5"
              onClick={() => onScrollTo('hero')}
            >
              <span className="font-serif text-3xl font-extrabold tracking-[0.25em] text-white">
                TINA <span className="text-gold-400 font-light drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">SHOP</span>
              </span>
              <span className="text-[10px] tracking-[0.55em] text-slate-400 uppercase font-sans font-semibold mt-1">
                Women's Couture
              </span>
            </div>
            <p className="text-slate-400 font-sans text-xs sm:text-sm leading-relaxed max-w-sm mb-6 font-normal">
              Thương hiệu thiết kế thời trang nữ dẫn đầu xu hướng thanh lịch cao cấp tại Việt Nam. Chúng tôi cam kết dệt lụa tơ tằm thiên nhiên bảo vệ môi trường nâng niu làn da phụ nữ Việt.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#facebook" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold-500 flex items-center justify-center text-slate-300 hover:text-slate-950 transition-all hover:scale-110 border border-white/10">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold-500 flex items-center justify-center text-slate-300 hover:text-slate-950 transition-all hover:scale-110 border border-white/10">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Col */}
          <div>
            <h4 className="font-serif text-sm font-black uppercase tracking-widest text-slate-300 mb-5">
              KHÁM PHÁ CỬA HÀNG
            </h4>
            <ul className="space-y-3 font-sans text-xs sm:text-sm font-semibold text-slate-400">
              <li>
                <button onClick={() => onScrollTo('hero')} className="hover:text-gold-400 transition-all cursor-pointer">
                  Trang Chủ
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('products')} className="hover:text-gold-400 transition-all cursor-pointer">
                  Sản Phẩm Couture
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('board')} className="hover:text-gold-400 transition-all cursor-pointer">
                  Bản Tin Cộng Đồng
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('contact')} className="hover:text-gold-400 transition-all cursor-pointer">
                  Bản Đồ Chi Nhánh
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe / Quick Promise */}
          <div>
            <h4 className="font-serif text-sm font-black uppercase tracking-widest text-slate-300 mb-5">
              TINA FASHION CLUB
            </h4>
            <p className="text-slate-400 font-sans text-xs leading-relaxed mb-4">
              Đăng ký nhận email thông báo sớm nhất các dịp ưu đãi đặc quyền lên tới 50% hoặc các thông tin bất động sản lân cận.
            </p>
            
            {isSubscribed ? (
              <div className="p-3 bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-xl text-center text-xs font-sans font-bold">
                ✓ Đăng ký VIP Tina Club thành công!
              </div>
            ) : (
              <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="w-full px-4 py-3 bg-transparent text-white text-xs focus:outline-none"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-gold-500 hover:bg-gold-600 text-slate-950 font-sans text-xs font-bold px-4 transition-colors cursor-pointer"
                >
                  VIP
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-slate-500 uppercase tracking-widest font-bold">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} TINA SHOP. Chế tác với</span>
            <Heart className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
            <span>dành cho Phái Đẹp</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 hover:text-white text-slate-400 transition-all"
          >
            Về đầu trang
            <ArrowUp className="w-4 h-4 p-0.5 rounded bg-white/5 border border-white/10" />
          </button>
        </div>

      </div>
    </footer>
  );
}
