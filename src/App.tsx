import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import CommunityBoard from './components/CommunityBoard';
import MapAndContact from './components/MapAndContact';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from './types';
import { CheckCircle, X, Bell, Info } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [globalToast, setGlobalToast] = useState<{ show: boolean; title: string; message: string }>({
    show: false,
    title: '',
    message: ''
  });

  // Ref container for community writing board trigger scrolling
  const boardRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Observe active sections for dynamic highlight on navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'products', 'board', 'contact'];
      const scrollPosition = window.scrollY + 120; // safe cushion

      const active = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          return scrollPosition >= top && scrollPosition < top + height;
        }
        return false;
      });

      if (active) {
        setActiveSection(active);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle high quality order / booking popups
  const triggerOrderNotification = (product: Product) => {
    setGlobalToast({
      show: true,
      title: 'YÊU CẦU ĐÃ GHI NHẬN!',
      message: `TINA SHOP đang soạn form tư vấn cho sản phẩm "${product.name}". Vui lòng điền thông tin nhanh ở form Liên hệ bên dưới để stylist gọi trực tiếp cho nàng!`
    });
    
    // Auto scroll to contact form so user can submit quickly
    setTimeout(() => {
      handleScrollToSection('contact');
    }, 1500);

    // Auto close toast
    setTimeout(() => {
      setGlobalToast(prev => ({ ...prev, show: false }));
    }, 7000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 scroll-smooth selection:bg-gold-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* Absolute Frosted Glass Background Spotlights / Mesh Gradients */}
      <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[35%] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-[-15%] w-[45%] h-[40%] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[15%] left-[-10%] w-[50%] h-[35%] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[40%] bg-gold-600/5 rounded-full blur-[130px] pointer-events-none z-0"></div>

      {/* Premium top branding navbar */}
      <Navbar onScrollTo={handleScrollToSection} activeSection={activeSection} />

      {/* Main components showcase */}
      <main>
        {/* HERO */}
        <Hero 
          onExplore={() => handleScrollToSection('products')} 
          onPostNow={() => handleScrollToSection('board')} 
        />

        {/* CLOTHES / PRODUCTS CATALOGUE */}
        <Products onNotifyProduct={triggerOrderNotification} />

        {/* INTEGRATED GUEST POSTS/COMMUNITY BOARD ("giới thiệu lô đất, ảnh, tiêu đề") */}
        <CommunityBoard formTriggerRef={boardRef} />

        {/* INTEGRATED MAPS AND CONTACT INFO FORM */}
        <MapAndContact />
      </main>

      {/* FOOTER */}
      <Footer onScrollTo={handleScrollToSection} />

      {/* Dynamic Global Custom Success Toast Messages */}
      <AnimatePresence>
        {globalToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md bg-slate-950/90 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-5 border border-white/10 flex items-start gap-4"
          >
            <div className="w-9 h-9 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <Bell className="w-5 h-5" />
            </div>
            
            <div className="flex-grow text-left">
              <h4 className="font-serif text-xs font-black text-white uppercase tracking-widest mb-1">
                {globalToast.title}
              </h4>
              <p className="font-sans text-slate-300 text-xs leading-relaxed">
                {globalToast.message}
              </p>
            </div>

            <button
              onClick={() => setGlobalToast(prev => ({ ...prev, show: false }))}
              className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
