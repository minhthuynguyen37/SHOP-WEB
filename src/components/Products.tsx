import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PRODUCTS, CATEGORIES } from '../data';
import { Product } from '../types';
import { ShoppingBag, Eye, Heart, X, MessageCircle, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

interface ProductsProps {
  onNotifyProduct: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onViewDetails?: (product: Product) => void;
}

export default function Products({ onNotifyProduct, selectedCategory, setSelectedCategory, onViewDetails }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const subCategories = ['Váy Đầm', 'Sơ Mi', 'Set Đồ', 'Phụ Kiện'];

  const filteredProducts = selectedCategory === 'Tất cả'
    ? INITIAL_PRODUCTS
    : INITIAL_PRODUCTS.filter(p => p.category === selectedCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <section id="products" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-gold-400 mb-2">Thế Giới Của Phái Đẹp</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            BỘ SƯU TẬP CAO CẤP TINA COUTURE
          </h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto mb-6 rounded-full shadow-[0_0_8px_#fbbf24]" />
          <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
            Mỗi thiết kế tại Tina Shop đều hướng tới sự chỉnh chu tuyệt đối về đường may, phom dáng và chất liệu thượng cổ dệt sợi quý phái, mang lại vẻ thanh lịch cuốn hút dưới ánh nhìn đầu tiên.
          </p>
        </div>

        {/* Category Filter Dropdown with Elegant Glass styling */}
        <div className="relative max-w-sm mx-auto mb-12 z-30">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-gold-500/50 transition-all duration-300 focus:outline-none cursor-pointer group shadow-lg"
          >
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-gold-400 group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-xs uppercase tracking-[0.25em] font-sans font-extrabold text-slate-300">
                Danh Mục:
              </span>
              <span className="text-xs uppercase tracking-[0.15em] font-sans font-bold text-gold-400">
                {selectedCategory}
              </span>
            </div>
            {isDropdownOpen ? (
              <ChevronUp className="w-4 h-4 text-gold-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-gold-400 transition-colors" />
            )}
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 4, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl overflow-hidden shadow-2xl z-35"
              >
                {/* 4 main sub-categories + All option */}
                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('Tất cả');
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between text-xs font-sans tracking-wider uppercase font-bold cursor-pointer ${
                      selectedCategory === 'Tất cả'
                        ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/10'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>✦ Tất cả bộ sưu tập</span>
                    {selectedCategory === 'Tất cả' && <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />}
                  </button>

                  <div className="h-[1px] bg-white/5 my-1" />

                  {subCategories.map((cat, idx) => {
                    const isSelected = selectedCategory === cat;
                    // Custom luxury sublabels in Vietnamese matching layout style
                    const subLabels = [
                      'Đầm lụa bay & đầm cổ yếm ngọc',
                      'Sơ mi voan tơ thêu tay tinh xảo',
                      'Blazer Luxe & Set váy quý phái',
                      'Túi xách da & kính mát retro'
                    ];
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center justify-between cursor-pointer group ${
                          isSelected
                            ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/10'
                            : 'hover:bg-white/5 text-left text-slate-300'
                        }`}
                      >
                        <div className="flex flex-col text-left">
                          <span className={`text-[12px] font-sans tracking-widest uppercase font-extrabold ${isSelected ? 'text-slate-950 font-bold' : 'text-slate-200 group-hover:text-gold-400 transition-colors'}`}>
                            {idx + 1}. {cat}
                          </span>
                          <span className={`text-[10px] font-sans font-semibold mt-0.5 ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                            {subLabels[idx]}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-slate-950" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Products Grid */}
        <motion.div 
          layout 
          id="products-grid" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => {
              const isFav = favorites.includes(p.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={p.id}
                  id={`product-card-${p.id}`}
                  className="group glass-panel glass-panel-hover rounded-2xl overflow-hidden p-3 transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => onViewDetails ? onViewDetails(p) : setSelectedProduct(p)}
                >
                  {/* Image wrap with tags */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark gradient hint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Status badge */}
                    {p.tag && (
                      <span className="absolute top-4 left-4 bg-gold-500 text-slate-950 font-sans text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-[0_2px_10px_rgba(245,158,11,0.3)] border border-gold-400/20">
                        {p.tag}
                      </span>
                    )}

                    {/* Quick Heart Icon */}
                    <button
                      onClick={(e) => toggleFavorite(p.id, e)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-rose-450 hover:bg-slate-900 hover:text-rose-400 hover:scale-110 shadow-md flex items-center justify-center transition-all focus:outline-none border border-white/10"
                    >
                      <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-550 text-rose-500' : 'text-slate-400'}`} />
                    </button>

                    {/* Elegant Hover Overlay Buttons */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
                      <span className="flex items-center gap-1.5 bg-gold-500 text-slate-950 font-sans text-[10px] font-bold tracking-wider uppercase px-4 py-2.5 rounded-lg shadow-lg hover:bg-gold-600 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                        Xem Chi Tiết
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="pt-5 pb-2 px-2 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="text-[10px] uppercase font-sans font-bold text-gold-400 tracking-widest">{p.category}</span>
                        <span className="font-serif text-sm font-extrabold text-white">{p.price}</span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug group-hover:text-gold-400 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-slate-300 font-sans text-xs line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#E5D5C5] border border-white/10" title="Cát Kem" />
                        <span className="w-3 h-3 rounded-full bg-[#E7C7C8] border border-white/10" title="Hồng Pastel" />
                        <span className="w-3 h-3 rounded-full bg-white border border-white/10" title="Trắng Ngọc" />
                      </div>
                      <span className="text-[11px] font-sans font-bold text-gold-400 hover:text-gold-300 underline uppercase tracking-wider flex items-center gap-1">
                        Tư vấn & Xem thêm
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Modal Dialog with Premium Dark Glassmorphism Design */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                onClick={() => setSelectedProduct(null)}
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative bg-slate-950/90 backdrop-blur-2xl w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10 grid grid-cols-1 md:grid-cols-2"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 bg-slate-900/90 hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-white shadow-md hover:scale-110 transition-transform cursor-pointer border border-white/10"
                  aria-label="Đóng chi tiết"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left: Product Image Showcase */}
                <div className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[300px] bg-slate-900">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedProduct.tag && (
                    <span className="absolute top-6 left-6 bg-gold-500 text-slate-950 font-sans text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg shadow-md z-10">
                      {selectedProduct.tag}
                    </span>
                  )}
                </div>

                {/* Right: Detailed Content and Actions */}
                <div className="p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-sans font-bold text-gold-400 tracking-widest mb-2 block">
                      {selectedProduct.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
                      {selectedProduct.name}
                    </h3>
                    <div className="text-2xl font-bold font-serif text-gold-400 mb-6 flex items-center gap-2">
                      {selectedProduct.price}
                      <span className="text-xs text-slate-400 font-sans tracking-wide font-normal">(Giá ưu đãi 2026)</span>
                    </div>

                    <div className="h-px bg-white/10 mb-6" />

                    <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-slate-400 mb-2">Giới Thiệu Sản Phẩm</h4>
                    <p className="text-slate-300 text-sm font-sans leading-relaxed mb-6">
                      {selectedProduct.description} 
                    </p>

                    {/* Sizes Selection */}
                    <div className="mb-6">
                      <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-slate-400 mb-2.5">Chọn Size</h4>
                      <div className="flex gap-2.5">
                        {['S', 'M', 'L', 'XL'].map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`w-10 h-10 rounded-lg text-xs font-bold focus:outline-none transition-all cursor-pointer border flex items-center justify-center ${
                              selectedSize === sz
                                ? 'bg-gold-500 border-gold-500 text-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                                : 'bg-white/5 border-white/10 text-slate-300 hover:border-gold-400 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Dots */}
                    <div className="mb-6">
                      <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-slate-400 mb-2">Màu Sắc Có Sẵn</h4>
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#E5D5C5] ring-2 ring-offset-2 ring-gold-500 border border-white/10 cursor-pointer" title="Cát Kem" />
                        <span className="w-6 h-6 rounded-full bg-[#E7C7C8] border border-white/10 cursor-pointer" title="Hồng Pastel" />
                        <span className="w-6 h-6 rounded-full bg-white border border-white/10 cursor-pointer" title="Trắng Ngọc" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        onNotifyProduct(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="w-full flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-600 text-slate-950 font-sans text-xs sm:text-sm tracking-widest uppercase py-4 rounded-xl transition-all font-bold hover:shadow-lg hover:shadow-gold-500/20 hover:-translate-y-0.5 focus:outline-none cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-slate-950" />
                      Nhận Tư Vấn Size & Đặt Hàng Trực Tiếp
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
