export interface Product {
  id: string;
  name: string;
  category: "Men's Fashion" | "Women's Fashion" | "Kids Fashion" | "Ethnic Wear" | "Casual Wear" | "Formal Wear";
  image: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  colors?: string[];
  sizes?: string[];
  material?: string;
  care?: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  iconName: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  role: string;
  product?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Men" | "Women" | "Kids" | "Seasonal" | "New Arrivals" | "Store Interior";
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
