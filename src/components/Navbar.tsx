import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, MapPin, MessageSquare, Newspaper, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
  activeSection: string;
  onSelectCategory?: (category: string) => void;
}

export default function Navbar({ onScrollTo, activeSection, onSelectCategory }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Trang Chủ', icon: null },
    { id: 'products', label: 'Bộ Sưu Tập', icon: ShoppingBag },
    { id: 'board', label: 'Bản Tin Đăng', icon: Newspaper },
    { id: 'contact', label: 'Liên Hệ & Bản Đồ', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950/45 backdrop-blur-xl shadow-lg border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand Logo - Elegant Serif/Modern Script pairing */}
          <div 
            id="navbar-brand"
            className="flex flex-col cursor-pointer"
            onClick={() => handleNavClick('hero')}
          >
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-white transition-colors duration-300">
              TINA <span className="text-gold-400 font-light drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]">SHOP</span>
            </span>
            <span className="text-[9px] tracking-[0.55em] text-slate-400 uppercase font-sans font-semibold text-center">
              Women's Couture
            </span>
          </div>

          {/* Desktop Navigation */}
          <div id="desktop-menu" className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              
              if (item.id === 'products') {
                return (
                  <div 
                    key={item.id} 
                    className="relative group"
                    onMouseEnter={() => setIsProductsDropdownOpen(true)}
                    onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => {
                        setIsProductsDropdownOpen(!isProductsDropdownOpen);
                        handleNavClick('products');
                        onSelectCategory?.('Tất cả');
                      }}
                      className={`relative font-sans text-xs tracking-[0.2em] uppercase font-semibold transition-all py-2 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                        isActive ? 'text-gold-400 font-bold' : 'text-slate-300 hover:text-gold-300'
                      }`}
                    >
                      {item.icon && <item.icon className="w-3.5 h-3.5" />}
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 shadow-[0_0_8px_#fbbf24]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Elegant Gold & Midnight Dropdown Menu */}
                    <AnimatePresence>
                      {isProductsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-1 w-56 bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 shadow-2xl z-50 space-y-1"
                        >
                          {['Váy Đầm', 'Sơ Mi', 'Set Đồ', 'Phụ Kiện'].map((sub, idx) => {
                            return (
                              <button
                                key={sub}
                                onClick={() => {
                                  onSelectCategory?.(sub);
                                  handleNavClick('products');
                                  setIsProductsDropdownOpen(false);
                                }}
                                className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-slate-950 hover:bg-gold-500 font-sans text-xs tracking-wider uppercase font-bold transition-all flex items-center justify-between cursor-pointer group/item"
                              >
                                <span className="flex items-center gap-2">
                                  <span className="text-[10px] text-gold-400 group-hover/item:text-slate-950 transition-colors">
                                    0{idx + 1}.
                                  </span>
                                  {sub}
                                </span>
                                <span className="text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity">🛒</span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-xs tracking-[0.2em] uppercase font-semibold transition-all py-2 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                    isActive ? 'text-gold-400 font-bold' : 'text-slate-300 hover:text-gold-300'
                  }`}
                >
                  {item.icon && <item.icon className="w-3.5 h-3.5" />}
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 shadow-[0_0_8px_#fbbf24]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Call to action & Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden lg:flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-slate-950 font-sans text-xs tracking-wider uppercase px-5 py-2.5 rounded-full transition-all shadow-lg hover:shadow-gold-500/20 hover:-translate-y-0.5 font-bold cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              Gửi Liên Hệ
            </button>
            
            <button
              id="menu-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {navItems.map((item) => {
                if (item.id === 'products') {
                  return (
                    <div key={item.id} className="space-y-1">
                      <button
                        onClick={() => {
                          setIsMobileProductsOpen(!isMobileProductsOpen);
                        }}
                        className={`w-full py-3 px-4 text-left font-sans text-sm font-semibold tracking-widest uppercase flex items-center justify-between rounded-lg transition-all ${
                          activeSection === item.id || isMobileProductsOpen
                            ? 'bg-white/10 text-gold-400'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon && <item.icon className="w-4 h-4 text-slate-400" />}
                          {item.label}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180 text-gold-400' : 'text-slate-400'}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isMobileProductsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-6 pr-2 py-1 space-y-1.5 overflow-hidden border-l border-white/10 ml-4"
                          >
                            <button
                              onClick={() => {
                                onSelectCategory?.('Tất cả');
                                handleNavClick('products');
                                setIsMobileProductsOpen(false);
                              }}
                              className="w-full py-2.5 px-4 text-left font-sans text-xs tracking-wider uppercase font-bold text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all flex items-center justify-between"
                            >
                              <span>✦ Xem Tất Cả</span>
                            </button>
                            {['Váy Đầm', 'Sơ Mi', 'Set Đồ', 'Phụ Kiện'].map((sub, idx) => (
                              <button
                                key={sub}
                                onClick={() => {
                                  onSelectCategory?.(sub);
                                  handleNavClick('products');
                                  setIsMobileProductsOpen(false);
                                }}
                                className="w-full py-2.5 px-4 text-left font-sans text-xs tracking-wider uppercase font-bold text-slate-400 hover:text-gold-400 rounded-lg hover:bg-white/5 transition-all flex items-center justify-between"
                              >
                                <span>{idx + 1}. {sub}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-3 px-4 text-left font-sans text-sm font-semibold tracking-widest uppercase flex items-center gap-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? 'bg-white/10 text-gold-400'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4 text-slate-400" />}
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-slate-950 font-sans text-sm tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all font-bold"
                >
                  <MessageSquare className="w-4 h-4 text-slate-950" />
                  Gửi Liên Hệ Nhanh
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
