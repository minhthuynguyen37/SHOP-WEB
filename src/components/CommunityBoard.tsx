import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Post } from '../types';
import { INITIAL_POSTS } from '../data';
import { 
  PlusCircle, 
  MapPin, 
  ImageIcon, 
  User, 
  Tag, 
  Calendar, 
  Clock, 
  Send, 
  AlertCircle, 
  Grid, 
  Layers, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface CommunityBoardProps {
  formTriggerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function CommunityBoard({ formTriggerRef }: CommunityBoardProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'fashion' | 'property'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageOption, setImageOption] = useState<'url' | 'preset' | 'upload'>('preset');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [uploadedBase64, setUploadedBase64] = useState('');
  const [postCategory, setPostCategory] = useState<'fashion' | 'property'>('fashion');
  const [author, setAuthor] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Preset images for users to choose quickly to make testing smooth
  const PRESET_IMAGES = [
    {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      label: 'Đất nền thành phố'
    },
    {
      url: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=800',
      label: 'Đất nhà vườn / Biệt thự'
    },
    {
      url: 'https://images.unsplash.com/photo-1464821959644-12d0741fe600?auto=format&fit=crop&q=80&w=800',
      label: 'Đồi núi / Trang trại'
    },
    {
      url: 'https://images.unsplash.com/photo-1490274147415-62b97eaba13f?auto=format&fit=crop&q=80&w=800',
      label: 'Đầm xòe lãng mạn'
    },
    {
      url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800',
      label: 'Thời trang Thu Đông'
    },
    {
      url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
      label: 'Cửa hàng Tina Shop sầm uất'
    }
  ];

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('tina_posts');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(INITIAL_POSTS);
      }
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('tina_posts', JSON.stringify(INITIAL_POSTS));
    }
  }, []);

  const handleFilterChange = (filter: 'all' | 'fashion' | 'property') => {
    setSelectedFilter(filter);
  };

  // Base64 File Upload Processor
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg('Vui lòng chọn ảnh dung lượng dưới 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedBase64(reader.result as string);
        setErrorMsg('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tiêu đề bài viết.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg(postCategory === 'property' ? 'Vui lòng nhập phần giới thiệu lô đất.' : 'Vui lòng nhập nội dung giới thiệu bài viết.');
      return;
    }
    if (!author.trim()) {
      setErrorMsg('Vui lòng nhập tên người đăng bài.');
      return;
    }

    let resolvedImageUrl = '';
    if (imageOption === 'preset') {
      resolvedImageUrl = PRESET_IMAGES[selectedPresetIndex].url;
    } else if (imageOption === 'url') {
      if (!imageUrl.trim()) {
        setErrorMsg('Vui lòng nhập link ảnh hợp lệ.');
        return;
      }
      resolvedImageUrl = imageUrl.trim();
    } else {
      if (!uploadedBase64) {
        setErrorMsg('Vui lòng chọn hoặc tải ảnh lên.');
        return;
      }
      resolvedImageUrl = uploadedBase64;
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      imageUrl: resolvedImageUrl,
      category: postCategory,
      author: author.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('tina_posts', JSON.stringify(updatedPosts));

    // Reset Form
    setTitle('');
    setDescription('');
    setImageUrl('');
    setUploadedBase64('');
    setAuthor('');
    setSuccessMsg(true);
    
    setTimeout(() => {
      setSuccessMsg(false);
      setIsFormOpen(false);
    }, 1500);
  };

  const filteredPosts = selectedFilter === 'all'
    ? posts
    : posts.filter(post => post.category === selectedFilter);

  return (
    <section id="board" ref={formTriggerRef} className="py-24 bg-transparent relative">
      {/* Elegant Neon Spotlights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-gold-400 mb-2">Cộng Đồng Đăng Tin</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              GÓC CHIA SẺ & BẢN TIN ĐĂNG
            </h2>
            <div className="w-16 h-1 bg-gold-500 mt-4 mb-4 rounded-full shadow-[0_0_8px_#fbbf24]" />
            <p className="text-slate-300 text-sm max-w-xl font-normal leading-relaxed">
              Không gian tương tác dành cho thành viên: Giới thiệu các dự án, các lô đất vàng chung quanh showroom, cập nhật xu hướng thời trang và phong cách sống hàng ngày.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-slate-950 font-sans text-xs sm:text-sm tracking-widest uppercase px-6 py-3.5 rounded-full transition-all shadow-lg hover:shadow-gold-500/20 hover:-translate-y-0.5 focus:outline-none cursor-pointer self-start md:self-auto font-bold"
          >
            <PlusCircle className="w-5 h-5 fill-slate-950 text-gold-500 animate-bounce" />
            Đăng Tin Mới Ngay
          </button>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-10">
          <div className="flex flex-wrap gap-2">
            {[
              { type: 'all', label: 'Tất Cả Tin Đăng', icon: Layers },
              { type: 'fashion', label: 'Thời Trang Nữ', icon: Tag },
              { type: 'property', label: 'Giới Thiệu Lô Đất', icon: MapPin },
            ].map((btn) => {
              const SelectedIcon = btn.icon;
              return (
                <button
                  key={btn.type}
                  onClick={() => handleFilterChange(btn.type as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all focus:outline-none cursor-pointer border ${
                    selectedFilter === btn.type
                      ? 'bg-gold-500 border-gold-500 text-slate-950 shadow-[0_4px_20px_rgba(245,158,11,0.35)]'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border-white/10'
                  }`}
                >
                  <SelectedIcon className="w-3.5 h-3.5" />
                  {btn.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-sans text-slate-300 uppercase tracking-widest font-semibold flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <Clock className="w-4 h-4 text-gold-400" />
            Mới cập nhật: Hôm nay
          </div>
        </div>

        {/* Board Posts Display with Masonry Grid Layout */}
        <div id="posts-container" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  key={post.id}
                  id={`post-card-${post.id}`}
                  className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col sm:flex-row h-full group"
                >
                  {/* Left: post image */}
                  <div className="sm:w-2/5 relative min-h-[220px] sm:min-h-full bg-slate-900 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Category Overlay tag */}
                    <span className={`absolute top-4 left-4 font-sans text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-md ${
                      post.category === 'property' 
                        ? 'bg-amber-500/90 text-white border border-amber-400/20' 
                        : 'bg-gold-500/90 text-slate-950 border border-gold-400/20'
                    }`}>
                      {post.category === 'property' ? 'Bất Động Sản' : 'Xu hướng / Style'}
                    </span>
                  </div>

                  {/* Right: post body */}
                  <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-3">
                        <span className="flex items-center gap-1 text-slate-300">
                          <User className="w-3.5 h-3.5 text-gold-400" />
                          {post.author}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.createdAt}
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-3 leading-snug group-hover:text-gold-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {/* Description container */}
                      <p className="text-slate-300 font-sans text-xs leading-relaxed mb-4 line-clamp-4">
                        {post.description}
                      </p>
                    </div>

                    {/* Bottom visual hint */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      {post.category === 'property' ? (
                        <span className="flex items-center gap-1 text-[10px] font-sans font-bold text-amber-300 bg-amber-955/20 px-2.5 py-1 rounded-md uppercase tracking-wider border border-amber-500/20">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          Quanh Showroom
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-sans font-bold text-gold-300 bg-amber-955/20 px-2.5 py-1 rounded-md uppercase tracking-wider border border-gold-500/20">
                          <Tag className="w-3 h-3 text-gold-400" />
                          Tina Design
                        </span>
                      )}

                      <span className="text-[10px] font-sans font-bold text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-slate-950 transition-all cursor-pointer">
                        Xem chi tiết
                      </span>
                    </div>

                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full py-16 text-center glass-panel border-2 border-dashed border-white/15 rounded-3xl flex flex-col items-center justify-center p-8">
                <AlertCircle className="w-12 h-12 text-slate-500 mb-3" />
                <h4 className="font-serif text-lg font-bold text-white mb-1">Không thấy bài viết nào</h4>
                <p className="text-sm font-sans text-slate-300">Hãy là người đầu tiên giới thiệu lô đất hay chia sẻ gu thời trang tinh tế!</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic modal with Dark Glassmorphism for adding a new Post listing */}
        <AnimatePresence>
          {isFormOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
                onClick={() => setIsFormOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative bg-slate-950/90 backdrop-blur-2xl w-full max-w-2xl rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl z-20 border border-white/10 max-h-[90vh] overflow-y-auto"
              >
                {/* Form Title */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-white uppercase">
                      ĐĂNG TIN MỚI CỦA BẠN
                    </h3>
                    <p className="text-xs font-sans text-slate-400 mt-1">Đóng góp thông tin hữu ích cho cộng đồng Tina Shop</p>
                  </div>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none cursor-pointer text-xs font-sans font-bold border border-white/10"
                  >
                    Đóng
                  </button>
                </div>

                {successMsg ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <CheckCircle className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                    <h4 className="font-serif text-xl font-bold text-white mb-2">Đăng bài hoàn thành!</h4>
                    <p className="text-sm font-sans text-slate-300">Bài viết của bạn đã hiển thị tức thì trên bảng tin quốc tế TINA SHOP.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Choose category */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-sans font-bold text-slate-300 mb-2">
                        Thể loại tin đăng
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPostCategory('fashion')}
                          className={`p-3.5 rounded-xl border text-center font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            postCategory === 'fashion'
                              ? 'bg-gold-500/10 border-gold-500 text-gold-300 ring-1 ring-gold-500'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          👗 Thời Trang & Style
                        </button>
                        <button
                          type="button"
                          onClick={() => setPostCategory('property')}
                          className={`p-3.5 rounded-xl border text-center font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            postCategory === 'property'
                              ? 'bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          🏡 Giới Thiệu Lô Đất
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-sans font-bold text-slate-300 mb-1.5">
                        {postCategory === 'property' ? 'Tiêu đề (Ví dụ: Nhượng lô đất nền vàng quanh shop...)' : 'Tiêu đề thời trang / Phong cách dạo chơi'}
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={postCategory === 'property' ? 'Tiêu đề giới thiệu bán đất/mặt bằng tốt...' : 'Ví dụ: Thiết kế tay sứa ngọt ngào đón xu hướng Hàn Quốc'}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>

                    {/* Image Options */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-sans font-bold text-slate-300 mb-1.5">
                        Ảnh bài viết
                      </label>
                      <div className="flex bg-white/5 p-1 rounded-xl mb-3 text-xs font-sans font-bold border border-white/5">
                        <button
                          type="button"
                          onClick={() => setImageOption('preset')}
                          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${imageOption === 'preset' ? 'bg-gold-500 text-slate-950 shadow-md' : 'text-slate-400'}`}
                        >
                          Chọn từ thư viện ảnh
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageOption('url')}
                          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${imageOption === 'url' ? 'bg-gold-500 text-slate-950 shadow-md' : 'text-slate-400'}`}
                        >
                          Nhập Link Ảnh (URL)
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageOption('upload')}
                          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${imageOption === 'upload' ? 'bg-gold-500 text-slate-950 shadow-md' : 'text-slate-400'}`}
                        >
                          Tải ảnh tập tin
                        </button>
                      </div>

                      {imageOption === 'preset' && (
                        <div className="grid grid-cols-3 gap-2 p-2 bg-white/5 rounded-xl border border-white/10">
                          {PRESET_IMAGES.map((img, idx) => (
                              <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedPresetIndex(idx)}
                              className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                selectedPresetIndex === idx ? 'border-gold-500 scale-95 shadow-[0_0_10px_#fbbf24]' : 'border-transparent'
                              }`}
                            >
                              <img src={img.url} alt="preset thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-slate-950/60 flex items-end p-1.5">
                                <span className="text-[8px] text-white font-mono uppercase truncate block w-full text-left">{img.label}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {imageOption === 'url' && (
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="Dán link ảnh Unsplash hoặc các nguồn khác tại đây..."
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500 animate-fadeIn"
                        />
                      )}

                      {imageOption === 'upload' && (
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer relative">
                          <input
                             id="custom-file-upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {uploadedBase64 ? (
                            <div className="flex flex-col items-center justify-center">
                              <img src={uploadedBase64} alt="Preview uploaded file" className="w-24 h-24 object-cover rounded-lg shadow-md mb-2" />
                              <p className="text-xs text-emerald-400 font-bold">Chuyển đổi thành công! Ảnh sẵn sàng đăng.</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <span className="w-8 h-8 text-slate-400 mb-2 flex items-center justify-center font-bold text-lg">+</span>
                              <p className="text-xs font-sans font-bold text-slate-300">Kéo thả hoặc nhấp để chọn tệp tin</p>
                              <p className="text-[10px] text-slate-500 mt-1">Hỗ trợ JPG, PNG dưới 2MB</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Author Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-sans font-bold text-slate-300 mb-1.5">
                        Tên Người Đăng Tin
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Ví dụ: Vy Nguyễn / Nguyễn Thọ Land..."
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>

                    {/* Description Textarea */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-sans font-bold text-slate-300 mb-1.5">
                        {postCategory === 'property' ? 'Mô tả giới thiệu lô đất (Diện tích, vị trí, giá, pháp lý...)' : 'Nội dung chia sẻ thời trang / phối đồ / cuộc sống'}
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={postCategory === 'property' 
                          ? 'Mô tả chi tiết lô đất: Mặt tiền mấy mét, hướng phong thủy thế nào, nằm ngay cạnh Tina Shop cách bao nhiêu bước chân...' 
                          : 'Chia sẻ ngay những bức ảnh quý phái, cách phối hợp màu sắc quyến rũ mang thương hiệu TINA...'
                        }
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500"
                        required
                      />
                    </div>

                    {/* Error block */}
                    {errorMsg && (
                      <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errorMsg}
                      </div>
                    )}

                    {/* Submit buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="flex-1 py-3.5 text-center font-sans text-xs font-bold uppercase tracking-wider text-slate-400 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-slate-950 font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-slate-950" />
                        Đăng Tin Ngay
                      </button>
                    </div>

                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
