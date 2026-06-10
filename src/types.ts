export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
  tag?: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'fashion' | 'property' | 'all';
  author: string;
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}
