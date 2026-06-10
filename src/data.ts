import { Product, Post } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Đầm Lụa Satin Cao Cấp Tina',
    price: '1,350,000 ₫',
    description: 'Chất liệu lụa satin mượt mà, rủ nhẹ tinh tế, tôn lên nét quyến rũ quý phái cho phái đẹp.',
    category: 'Váy Đầm',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    tag: 'Bán chạy nhất'
  },
  {
    id: 'p2',
    name: 'Sơ Mi Voan Tơ Thêu Tay',
    price: '580,000 ₫',
    description: 'Chất voan tơ mềm mại thoáng mát, hoạ tiết thêu tay thủ công tỉ mỉ từng đường nét.',
    category: 'Sơ Mi',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-8262g-mm6yd9p67kzzf7@resize_w900_nl.webp?auto=format&fit=crop&q=80&w=600',
    tag: 'Mới về'
  },
  {
    id: 'p3',
    name: 'Set Blazer Luxe Classic',
    price: '1,890,000 ₫',
    description: 'Kiểu dáng blazer đứng dáng thời thượng kết hợp quần tây ống suông sang trọng tôn dáng.',
    category: 'Set Đồ',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600',
    tag: 'Premium'
  },
  {
    id: 'p4',
    name: 'Đầm Dạ Hội Pleated Maxi',
    price: '2,100,000 ₫',
    description: 'Xếp ly tinh tế dọc thân váy, thiết kế khoét lưng thanh lịch cho các buổi tiệc sang trọng.',
    category: 'Váy Đầm',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'p5',
    name: 'Túi Da Cầm Tay Mini Signature',
    price: '890,000 ₫',
    description: 'Da thật cao cấp chế tác thủ công bền bỉ, điểm nhấn quai kim loại mạ vàng sang trọng. THUY SHOPEEE GIÀU CÓA',
    category: 'Phụ Kiện',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    tag: 'Hot Trend'
  },
  {
    id: 'p6',
    name: 'Kính Mát Cat-Eye Tina Retro',
    price: '450,000 ₫',
    description: 'Chống tia UV400 tuyệt đối, gọng nhựa Acetate sang trọng ôm sát khuôn mặt thanh tú.',
    category: 'Phụ Kiện',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Lô Đất Nền Phố Góc 2 Mặt Tiền - Đối Diện Showroom Tina Shop Quận 1',
    description: 'Cần nhượng lại lô đất nền đắc địa rộng 150m2 ngay ngã tư sầm uất đối diện với cơ sở Tina Fashion Mall. Đất vuông vức cực đẹp, sổ đỏ chính chủ đầy đủ, vị trí vàng thuận tiện xây dựng showroom thời trang, quán cafe cao cấp hoặc toà nhà văn phòng luxury.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    category: 'property',
    author: 'Minh Thủy (Chủ Đầu Tư)',
    createdAt: '2026-06-08'
  },
  {
    id: 'post-2',
    title: 'Mộng Mơ Với BST "Midnight Velvet" Ra Mắt Tuần Này Tại Tina Shop',
    description: 'BST lấy cảm hứng từ những đêm tiệc Paris thơ mộng, chất liệu nhung tơ tằm mềm như mây phối cùng các đường cắt dập tinh xảo giúp các nàng tỏa sáng lộng lẫy nhất trong mọi khoảnh khắc giao thoa.',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
    category: 'fashion',
    author: 'TINA SHOP Fashion Designer',
    createdAt: '2026-06-09'
  },
  {
    id: 'post-3',
    title: 'Lô Đất Biệt Thự Nhà Vườn Hòa Lạc - View Trọn Hồ Yên Bình Gần Tina Workshop',
    description: 'Diện tích 450m2 đất thổ cư 100%, hạ tầng hoàn thiện đồng bộ, tường bao đá ong cổ kính. Không khí mát mẻ trong lành lý tưởng để lập homestay nghỉ dưỡng, workshop thời trang thủ công dệt lụa organic ngoài trời.',
    imageUrl: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=800',
    category: 'property',
    author: 'Nguyễn Tiến Tùng (Đại Diện Dự Án)',
    createdAt: '2026-06-10'
  },
  {
    id: 'post-4',
    title: 'Cách Phối Đồ Linen Cho Chuyến Đi Biển Đậm Chất Thư Thái & Aesthetic',
    description: 'Linen vẫn giữ vững ngai vàng trong thời trang mùa du lịch. Tina gợi ý nàng những combo quần ống rộng linen trắng ngà kết hợp bra top đan móc cá tính đầy phóng khoáng.',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    category: 'fashion',
    author: 'Stylist Tina Shop',
    createdAt: '2026-06-05'
  }
];

export const CATEGORIES = ['Tất cả', 'Váy Đầm', 'Sơ Mi', 'Set Đồ', 'Phụ Kiện'];
