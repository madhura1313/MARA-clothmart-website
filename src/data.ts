import { Product, ServiceCard, Stat, Review, GalleryItem } from "./types";

export const STATS: Stat[] = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Fashion Products" },
  { value: "50+", label: "Trusted Brands" },
  { value: "5-Star", label: "Customer Support" }
];

export const SERVICES: ServiceCard[] = [
  {
    title: "Fashion Collections",
    description: "Explore the latest trendy clothing carefully curated for all age groups.",
    iconName: "Sparkles"
  },
  {
    title: "Men's Wear",
    description: "Discover sharp formal suits, comfortable casuals, and seasonal essentials.",
    iconName: "User"
  },
  {
    title: "Women's Wear",
    description: "Browse sophisticated evening gowns, elegant daywear, and accessories.",
    iconName: "UserCheck"
  },
  {
    title: "Kids Collection",
    description: "Soft, comfortable, durable, and playful wear designed for children.",
    iconName: "Baby"
  },
  {
    title: "Accessories",
    description: "Elevate your look with handcrafted belts, elegant scarves, and styling essentials.",
    iconName: "Gem"
  },
  {
    title: "Personalized Assistance",
    description: "Receive one-on-one professional guidance to find outfits that express your unique self.",
    iconName: "HelpCircle"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Classic Silk Navy Suit",
    category: "Formal Wear",
    price: 189.99,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600",
    description: "A masterfully tailored navy suit crafted from an ultra-premium silk-wool blend. Features natural shoulder curves, notched lapels, and double back vents for peak comfort and impeccable elegance.",
    isNewArrival: false,
    isBestSeller: true,
    colors: ["#0f172a", "#1e293b", "#334155"],
    sizes: ["S", "M", "L", "XL"],
    material: "70% Virgin Wool, 30% Mulberry Silk",
    care: "Dry Clean Only"
  },
  {
    id: "prod-2",
    name: "Premium Linen Summer Dress",
    category: "Women's Fashion",
    price: 89.50,
    rating: 4.8,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
    description: "Lightweight and remarkably breathable, this premium linen dress features a relaxed silhouette, side pockets, and an adjustable waist belt. Keeps you infinitely cool and stylish on sunlit days.",
    isNewArrival: true,
    isBestSeller: false,
    colors: ["#fafaf9", "#e7e5e4", "#d6d3d1"],
    sizes: ["XS", "S", "M", "L"],
    material: "100% Belgian Linen",
    care: "Gentle Machine Wash on Cold"
  },
  {
    id: "prod-3",
    name: "Suede Harrington Jacket",
    category: "Casual Wear",
    price: 149.00,
    rating: 4.7,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1505633560063-d8cfded1997f?auto=format&fit=crop&q=80&w=600",
    description: "A luxurious take on the vintage Harrington jacket, carefully made from premium calfskin suede. Finished with a two-button protective collar, ribbed trims, and a satin lining.",
    isNewArrival: false,
    isBestSeller: false,
    colors: ["#78350f", "#451a03", "#1e293b"],
    sizes: ["M", "L", "XL", "XXL"],
    material: "100% Suede Leather Outer, Polyester Lining",
    care: "Professional Leather Clean Only"
  },
  {
    id: "prod-4",
    name: "Classic Embroidered Kurta Set",
    category: "Ethnic Wear",
    price: 119.99,
    rating: 4.9,
    reviewsCount: 115,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
    description: "Express your roots with this elegant traditional kurta set. Standard with ornate hand-embroidery along the collar, crafted in raw hand-woven silk for unmatched luster and festivity.",
    isNewArrival: true,
    isBestSeller: true,
    colors: ["#9a3412", "#701a75", "#065f46"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Hand-woven Silk",
    care: "Dry Clean Recommended"
  },
  {
    id: "prod-5",
    name: "Unisex Street Oversized Hoodie",
    category: "Casual Wear",
    price: 59.99,
    rating: 4.6,
    reviewsCount: 195,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
    description: "Made for optimal comfort. This ultra-heavyweight cotton fleece hoodie offers an over-the-hip relaxed drape, featuring drop-shoulders and a double-layered comfy hood.",
    isNewArrival: false,
    isBestSeller: false,
    colors: ["#ea580c", "#18181b", "#71717a"],
    sizes: ["S", "M", "L", "XL"],
    material: "85% Cotton, 15% Recycled Polyester",
    care: "Machine Wash warm, Inside Out"
  },
  {
    id: "prod-6",
    name: "Floral Pleated Dress",
    category: "Women's Fashion",
    price: 129.50,
    rating: 4.8,
    reviewsCount: 73,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=600",
    description: "An elegant, midi-length pleated dress with a beautiful watercolor floral motif print. Fastened with gentle mock neck buttons and sheer balloon sleeves, perfect for high-society affairs.",
    isNewArrival: true,
    isBestSeller: false,
    colors: ["#f472b6", "#c084fc", "#38bdf8"],
    sizes: ["S", "M", "L"],
    material: "100% Recycled Chiffon",
    care: "Hand Wash Cold"
  },
  {
    id: "prod-7",
    name: "Double-Breasted Cashmere Coat",
    category: "Formal Wear",
    price: 249.99,
    rating: 5.0,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
    description: "The epitome of cold-weather executive design. Handcrafted using pure, double-faced Mongolian cashmere wool. Boasts wide structured lapels, double-breasted closure, and deep patch pockets.",
    isNewArrival: false,
    isBestSeller: true,
    colors: ["#451a03", "#1c1917", "#78716c"],
    sizes: ["S", "M", "L", "XL"],
    material: "100% pure Cashmere",
    care: "Dry Clean Only"
  },
  {
    id: "prod-8",
    name: "Comfortable Knit Kids Sweater",
    category: "Kids Fashion",
    price: 39.99,
    rating: 4.8,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600",
    description: "Cozy knit sweater made from organic combed cotton to stay incredibly soft on sensitive skin. Features adorable playful cable patterns and stretchy crewneck trims.",
    isNewArrival: true,
    isBestSeller: false,
    colors: ["#eab308", "#3b82f6", "#10b981"],
    sizes: ["2T", "3T", "4T", "5T", "6-8Y"],
    material: "100% Organic Cotton Yarn",
    care: "Machine Wash Cold, Flat Dry"
  },
  {
    id: "prod-9",
    name: "Luxe Tweed Tailored Blazer",
    category: "Women's Fashion",
    price: 159.00,
    rating: 4.9,
    reviewsCount: 37,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    description: "Elevate your professional rotation with this structured French tweed blazer. Finished with hand-stitched silk piping, embossed golden dome statement buttons, and structured padded shoulders.",
    isNewArrival: true,
    isBestSeller: true,
    colors: ["#ffffff", "#000000"],
    sizes: ["XS", "S", "M", "L"],
    material: "60% Acrylic, 40% Premium Tweed Wool",
    care: "Dry Clean Only"
  },
  {
    id: "prod-10",
    name: "Classic Soft Denim Jacket",
    category: "Kids Fashion",
    price: 45.50,
    rating: 4.7,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600",
    description: "Heavy-duty yet perfectly garment-washed denim jacket for active play. Traditional chest flaps and simple snap closures make it exceptionally easy for young hands to operate.",
    isNewArrival: false,
    isBestSeller: false,
    colors: ["#2563eb", "#60a5fa"],
    sizes: ["3Y", "4Y", "5Y", "6Y", "8Y"],
    material: "98% Combed Cotton, 2% Elastane",
    care: "Wash with like colors"
  },
  {
    id: "prod-11",
    name: "Slim Fit Executive Chinos",
    category: "Men's Fashion",
    price: 69.99,
    rating: 4.6,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    description: "Premium cotton twill chinos structured with slight stretch for comfortable all-day flexibility. Straight leg style with smooth front seams and durable secure buttons.",
    isNewArrival: false,
    isBestSeller: false,
    colors: ["#d97706", "#27272a", "#71717a"],
    sizes: ["30", "32", "34", "36", "38"],
    material: "97% Organic Twill, 3% Elastane stretch",
    care: "Machine Wash Cold"
  },
  {
    id: "prod-12",
    name: "Traditional Silk Bandhgala",
    category: "Ethnic Wear",
    price: 210.00,
    rating: 5.0,
    reviewsCount: 46,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    description: "Exquisite Bandhgala tunic featuring royal structured mandarin collars and custom carved brass buttons. Impeccably tailored from dense Banarasi art silk, highlighting a sublime sheen.",
    isNewArrival: true,
    isBestSeller: true,
    colors: ["#1e1b4b", "#450a0a", "#022c22"],
    sizes: ["M", "L", "XL", "XXL"],
    material: "Banarasi Art Silk & Premium Mercerized Cotton Lining",
    care: "Dry Clean Only"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Aria Sterling",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "The quality from MARA Clothmart is absolutely stunning. The linen dress feels incredibly luxurious, fits perfectly, and keeps me breezy in the summer sun! I'm completely in love.",
    role: "Verified Buyer",
    product: "Premium Linen Summer Dress"
  },
  {
    id: "rev-2",
    name: "Julian Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "I purchased the Navy Silk Suit for my corporate event and was blown away. Excellent fabric handfeel, sharp structure, and it earned me countless compliments. Highly recommended!",
    role: "Corporate Executive",
    product: "Classic Silk Navy Suit"
  },
  {
    id: "rev-3",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "Remarkable service. MARA's expert styling assistance helped me find exactly the right Tweed Blazer for my presentations. The attention to detail is of a true high-end atelier.",
    role: "Creative Director",
    product: "Luxe Tweed Tailored Blazer"
  },
  {
    id: "rev-4",
    name: "Marcus Thorne",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    rating: 4.8,
    text: "Very warm hoodies and casual jackets. The Harrington jacket is top tier calf skin suede, stitched beautifully. I also buy cotton pants here, always super robust.",
    role: "Loyal Customer",
    product: "Suede Harrington Jacket"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Sartorial Elegance",
    category: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "gal-2",
    title: "Chic Linen Showcase",
    category: "Women",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "gal-3",
    title: "Organic Cable Knits",
    category: "Kids",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600"
  },
  {
    id: "gal-4",
    title: "Heritage Tradition Tones",
    category: "Seasonal",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600"
  },
  {
    id: "gal-5",
    title: "Fall/Winter Capsule",
    category: "New Arrivals",
    image: "https://images.unsplash.com/photo-1505633560063-d8cfded1997f?auto=format&fit=crop&w=600"
  },
  {
    id: "gal-6",
    title: "Boutique Experience Lounge",
    category: "Store Interior",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
  }
];
