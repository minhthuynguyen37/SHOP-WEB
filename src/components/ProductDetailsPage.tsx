import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data';
import { 
  ArrowLeft, 
  ShoppingBag, 
  MessageCircle, 
  HelpCircle, 
  Check, 
  Heart, 
  Star, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';

interface ProductDetailsPageProps {
  key?: string;
  product: Product;
  onBack: () => void;
  onNotifyProduct: (product: Product) => void;
  onSelectRelated: (product: Product) => void;
}

export default function ProductDetailsPage({ 
  product, 
  onBack, 
  onNotifyProduct,
  onSelectRelated 
}: ProductDetailsPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Cát Kem');
  const [activeTab, setActiveTab] = useState<'details' | 'size' | 'fabric'>( 'details' );
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [reviewName, setReviewName] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Nguyễn Khánh Linh',
      rating: 5,
      date: '02/06/2026',
      content: 'Chất lụa siêu mượt mát lạnh rủ nhẹ đúng chuẩn lụa tơ tằm thượng hạng. Đường tơ kẽ chỉ cực kì đều đặn tinh tế, rất xứng đáng với giá tiền.'
    },
    {
      id: 2,
      author: 'Trần Thị Thu Thảo',
      rating: 5,
      date: '28/05/2026',
      content: 'Form váy mặc lên tôn dáng dã man luôn đó các nàng, che khuyết điểm eo cực tốt. Mình đặt may theo số đo mặc vừa như in. Bạn stylist tư vấn nhiệt tình nữa chứ.'
    }
  ]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Scroll to top upon mounting to act like a real standalone page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  // Recommended products: exclusion of current product
  const relatedProducts = INITIAL_PRODUCTS
    .filter(p => p.id !== product.id && (p.category === product.category || p.tag))
    .slice(0, 3);

  // Fallback to other products if none matched
  const displayRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : INITIAL_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  // Submit custom review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    
    const newReview = {
      id: Date.now(),
      author: reviewName,
      rating: reviewRating,
      date: new Date().toLocaleDateString('vi-VN'),
      content: reviewText
    };

    setReviews([newReview, ...reviews]);
    setReviewText('');
    setReviewName('');
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10"
      id="product-details-page-view"
    >
      {/* Breadcrumbs & Back Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-wide text-slate-400">
          <button 
            onClick={onBack}
            className="hover:text-gold-400 transition-colors uppercase cursor-pointer"
          >
            Trang Chủ
          </button>
          <span>/</span>
          <span className="uppercase text-slate-500">Bộ Sưu Tập</span>
          <span>/</span>
          <span className="text-gold-400 font-extrabold uppercase truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 hover:border-gold-500/40 text-slate-300 hover:text-white text-xs font-sans tracking-widest uppercase font-extrabold transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 text-gold-450" />
          QUAY LẠI CỬA HÀNG
        </button>
      </div>

      {/* Main Grid: Left Gallery, Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Image Showcases */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 border border-white/5 shadow-2xl group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {product.tag && (
              <span className="absolute top-6 left-6 bg-gold-500 text-slate-950 font-sans text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.4)] z-10 border border-gold-400/20">
                {product.tag}
              </span>
            )}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center text-slate-300 hover:text-rose-450 hover:bg-slate-950 hover:scale-110 active:scale-95 transition-all focus:outline-none"
            >
              <Heart className={`w-5.5 h-5.5 transition-colors ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            </button>
          </div>

          {/* Couture Gallery Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gold-500 bg-slate-900 cursor-pointer transition-all">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500 bg-slate-900 cursor-pointer opacity-70 hover:opacity-100 transition-all">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=400" alt="Couture detail line" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500 bg-slate-900 cursor-pointer opacity-70 hover:opacity-100 transition-all">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=400" alt="Couture vibe" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Premium Quality Highlights Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl border border-white/5 bg-white/5 flex flex-col items-center text-center">
              <Truck className="w-6 h-6 text-gold-400 mb-2.5" />
              <h5 className="font-serif text-xs font-bold text-white uppercase tracking-wider mb-1">Giao Hàng Toàn Quốc</h5>
              <p className="font-sans text-[10px] text-slate-400">Kiểm thử vừa vặn, thanh toán an toàn tại nhà</p>
            </div>
            <div className="p-4 rounded-2xl border border-white/5 bg-white/5 flex flex-col items-center text-center">
              <ShieldCheck className="w-6 h-6 text-gold-400 mb-2.5" />
              <h5 className="font-serif text-xs font-bold text-white uppercase tracking-wider mb-1">Couture Độc Bản</h5>
              <p className="font-sans text-[10px] text-slate-400">Thương hiệu cao cấp, thêu dệt tỉ mỉ từng mét lụa</p>
            </div>
            <div className="p-4 rounded-2xl border border-white/5 bg-white/5 flex flex-col items-center text-center">
              <RefreshCw className="w-6 h-6 text-gold-400 mb-2.5" />
              <h5 className="font-serif text-xs font-bold text-white uppercase tracking-wider mb-1">Hỗ Trợ Đổi Trả Tận Tâm</h5>
              <p className="font-sans text-[10px] text-slate-400">Điều chỉnh size vừa vặn trọn vẹn vóc dáng</p>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Price, Order Inquiry panel & size helper */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-xs uppercase font-sans font-bold text-gold-400 tracking-widest mb-2.5 block">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <div className="text-3xl font-serif font-black text-gold-400">
                {product.price}
              </div>
              <div className="h-5 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-sans font-semibold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-slate-400 font-normal ml-1">({reviews.length} đánh giá thực tế)</span>
              </div>
            </div>

            <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed mb-6">
              {product.description} Thương hiệu Tina Shop cam kết sử dụng chất liệu cao cấp, mỏng nhẹ dịu mát bảo vệ làn da của phái đẹp đồng thời kiến tạo phom dáng thướt tha, trang trọng đầy thanh lịch.
            </p>
          </div>

          <div className="h-px bg-white/10" />

          {/* Color choice */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-slate-400 mb-3 flex items-center gap-2">
              <span>Màu sắc nghệ thuật:</span>
              <span className="text-white font-extrabold">{selectedColor}</span>
            </h4>
            <div className="flex items-center gap-3.5">
              <button 
                onClick={() => setSelectedColor('Cát Kem')}
                className={`w-9 h-9 rounded-full bg-[#E5D5C5] border transition-all ${selectedColor === 'Cát Kem' ? 'ring-2 ring-offset-2 ring-gold-500 border-whiteScale' : 'border-white/10'}`} 
                title="Cát Kem" 
              />
              <button 
                onClick={() => setSelectedColor('Hồng Pastel')}
                className={`w-9 h-9 rounded-full bg-[#E7C7C8] border transition-all ${selectedColor === 'Hồng Pastel' ? 'ring-2 ring-offset-2 ring-gold-500 border-whiteScale' : 'border-white/10'}`} 
                title="Hồng Pastel" 
              />
              <button 
                onClick={() => setSelectedColor('Trắng Ngọc')}
                className={`w-9 h-9 rounded-full bg-white border transition-all ${selectedColor === 'Trắng Ngọc' ? 'ring-2 ring-offset-2 ring-gold-500 border-whiteScale' : 'border-white/10'}`} 
                title="Trắng Ngọc" 
              />
            </div>
          </div>

          {/* Size Choice with explicit guides */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs uppercase tracking-widest font-sans font-bold text-slate-400">
                Chọn Size thiết kế:
              </h4>
              <button 
                onClick={() => setActiveTab('size')} 
                className="text-gold-400 text-xs font-sans hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Bảng Thông Số Số Đo
              </button>
            </div>
            
            <div className="flex gap-3">
              {['S', 'M', 'L', 'XL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-12 h-12 rounded-xl text-xs sm:text-sm font-extrabold transition-all border flex items-center justify-center cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-gold-500 border-gold-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.45)]'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-gold-400 hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs Section: Specifications, Size helper, Fabric details */}
          <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex border-b border-white/10 text-xs font-sans font-bold uppercase tracking-widest bg-slate-950/40">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-3.5 px-4 text-center border-b-2 cursor-pointer transition-colors ${activeTab === 'details' ? 'border-gold-500 text-gold-400 bg-white/5' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Thông tin chế tác
              </button>
              <button
                onClick={() => setActiveTab('size')}
                className={`flex-1 py-3.5 px-4 text-center border-b-2 cursor-pointer transition-colors ${activeTab === 'size' ? 'border-gold-500 text-gold-400 bg-white/5' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Thông số phom
              </button>
              <button
                onClick={() => setActiveTab('fabric')}
                className={`flex-1 py-3.5 px-4 text-center border-b-2 cursor-pointer transition-colors ${activeTab === 'fabric' ? 'border-gold-500 text-gold-400 bg-white/5' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Chất liệu tơ tằm
              </button>
            </div>

            <div className="p-6 text-xs text-slate-300 leading-relaxed font-sans space-y-3">
              {activeTab === 'details' && (
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>Thương hiệu:</strong> TINA COUTURE (Tina Shop độc quyền)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>Hoa văn:</strong> Dệt jacquard chìm hoặc thêu tay hoa mai, cúc sắc sảo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                    <span><strong>Phong cách:</strong> Sang trọng quý phái, thích hợp tiệc cưới, dạo phố, hội họp hoặc gặp mặt VIP</span>
                  </li>
                </ul>
              )}

              {activeTab === 'size' && (
                <div className="space-y-4">
                  <p className="font-semibold text-white">Bảng chuyển đổi ước lượng cân nặng lý tưởng của Tina Shop:</p>
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px] uppercase font-bold text-slate-400">
                    <div className="p-2.5 bg-slate-900 rounded-lg">Size S (40 - 47kg)</div>
                    <div className="p-2.5 bg-slate-900 rounded-lg">Size M (48 - 54kg)</div>
                    <div className="p-2.5 bg-slate-900 rounded-lg">Size L (55 - 61kg)</div>
                    <div className="p-2.5 bg-slate-900 rounded-lg">Size XL (&gt; 62kg)</div>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">Quý nàng có số đo đặc biệt vui lòng đặt may đo riêng để stylist hỗ trợ tinh chỉnh tuyệt đối hoàn hảo!</p>
                </div>
              )}

              {activeTab === 'fabric' && (
                <p>
                  Được khai thác từ tơ kén tằm tự nhiên tại Bảo Lộc, tỉnh Lâm Đồng, dệt bằng khung sợi tơ sinh học cao cấp giúp tăng độ bền màu tự nhiên, xốp mềm thoáng đãng, thân thiện môi trường và an toàn cho mọi làn da nhạy cảm.
                </p>
              )}
            </div>
          </div>

          {/* Quick Direct Stylist Consulting Booking Panel */}
          <div className="bg-gold-500/5 p-6 rounded-3xl border border-gold-500/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-black text-white uppercase tracking-wider">Đặt Khám Phá & May Đo</h5>
                <p className="text-slate-400 text-[11px] font-sans">Chọn Size & Màu vừa ý để bắt đầu tư vấn trực tiếp</p>
              </div>
            </div>

            <button
              onClick={() => onNotifyProduct({
                ...product,
                name: `${product.name} (Màu: ${selectedColor} - Size: ${selectedSize})`
              })}
              className="w-full flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-600 text-slate-950 font-sans text-xs sm:text-sm tracking-widest uppercase py-4 rounded-2xl transition-all font-bold hover:shadow-lg hover:shadow-gold-500/20 active:scale-[0.99] focus:outline-none cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              Nhận tư vấn trực tiếp & Đặt Hàng Gấp
            </button>
            
            <p className="text-[10px] text-slate-400 text-center font-sans tracking-wide">
              *Hỗ trợ cuộc gọi điện stylist tư vấn trực tiếp trong vòng 10 phút. Đảm bảo bảo mật thông tin phái đẹp.
            </p>
          </div>
        </div>
      </div>

      {/* Review Comments Section (Realistic Couture interactions) */}
      <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Review Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24">
            <p className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-gold-400 mb-1">CỘNG ĐỒNG TIN CLUB</p>
            <h3 className="font-serif text-2xl font-extrabold text-white mb-4">GỬI CẢM NHẬN CỦA NÀNG</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Tina Shop vô cùng hạnh phúc khi nhận được phản hồi và góp ý chân thành từ quý khách hàng để không ngừng nâng cao chất lượng dịch vụ dệt may couture cao cấp.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-300 mb-1.5">Tên quý cô / quý khách: *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ví dụ: Mỹ Duyên, Hoài Thương"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#070707] text-white text-xs focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-300 mb-1.5">Đánh giá chất lượng: *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button 
                      type="button"
                      key={num}
                      onClick={() => setReviewRating(num)}
                      className="p-1 focus:outline-none text-amber-450 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${reviewRating >= num ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-300 mb-1.5">Nhận xét chi tiết sản phẩm: *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Chia sẻ về chất lụa, phom dáng hoặc thái độ tư vấn của nhân viên Tina shop..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#070707] text-white text-xs focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-600 text-slate-950 font-sans text-xs tracking-widest uppercase font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                GỬI PHẢN HỒI VIP
              </button>

              {reviewSubmitted && (
                <div className="p-3 bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs rounded-xl text-center font-bold">
                  ✓ Gửi nhận xét thành công! Cám ơn vạn quý tơ lụa của nàng.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Column: Reviews Thread */}
        <div className="lg:col-span-7 space-y-6">
          <h4 className="font-serif text-lg font-black text-white uppercase tracking-wider flex items-center justify-between border-b border-white/10 pb-3">
            <span>DANH SÁCH Ý KIẾN KHÁCH HÀNG</span>
            <span className="text-gold-450 text-xs font-sans tracking-wide">({reviews.length} feedback)</span>
          </h4>

          <div className="space-y-6 divide-y divide-white/5">
            {reviews.map((rev) => (
              <div key={rev.id} className="pt-6 first:pt-0 text-left">
                <div className="flex items-center justify-between gap-4 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold-500/15 text-gold-450 border border-gold-500/20 flex items-center justify-center text-xs font-bold uppercase font-sans">
                      {rev.author.substring(0, 1)}
                    </div>
                    <div>
                      <h5 className="text-white text-xs font-sans font-bold uppercase">{rev.author}</h5>
                      <span className="text-slate-500 text-[10px]">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed pl-10">
                  {rev.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Similiar Products Carousel style */}
      <div className="mt-24 pt-10 border-t border-white/10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-gold-400 mb-2">Thủ công haute couture</p>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-white uppercase">Có thể nàng cũng say đắm</h3>
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {displayRelated.map((p) => (
            <div 
              key={p.id}
              onClick={() => onSelectRelated(p)}
              className="group cursor-pointer bg-white/5 rounded-2xl overflow-hidden p-3 border border-white/10 hover:border-gold-500/30 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900 mb-4">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-750" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-[#000]/20 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-3 right-3 text-[11px] font-sans font-extrabold text-gold-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10">
                  Xem chi tiết ✦
                </span>
              </div>
              <div className="text-left px-2">
                <span className="text-[10px] uppercase font-sans font-bold text-slate-400 tracking-widest">{p.category}</span>
                <h4 className="font-serif text-sm font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-1 mt-1 mb-1.5">{p.name}</h4>
                <div className="font-serif text-xs font-bold text-gold-400">{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
