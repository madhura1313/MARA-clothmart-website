import React, { useState, useEffect } from "react";
import { ArrowUp, Star, Sparkles, AlertCircle, ShoppingBag, MessageSquare, X } from "lucide-react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Products from "./components/Products";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import QuickViewModal from "./components/QuickViewModal";
import CartDrawer, { CartItem } from "./components/CartDrawer";
import AccountDrawer, { UserProfile, OrderRecord } from "./components/AccountDrawer";
import { Product } from "./types";

export default function App() {
  // Theme Dark/Light
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("mara-dark-mode");
    if (saved !== null) return saved === "true";
    return false; // Default comfortable light theme
  });

  // Shopping Bag List (Persisted)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("mara-cart-items");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Personal Wishlist IDs (Persisted)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("mara-wishlist");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User Profile Credentials (Persisted)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("mara-user-profile");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Shipped / Checked out Invoice Orders
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem("mara-order-record");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState<"profile" | "wishlist" | "orders">("profile");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Custom interactive Toast Banner notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark class on mount and changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("mara-dark-mode", String(darkMode));
  }, [darkMode]);

  // Sync cart items to storage
  useEffect(() => {
    localStorage.setItem("mara-cart-items", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync wishlist to storage
  useEffect(() => {
    localStorage.setItem("mara-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync profile details to storage
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("mara-user-profile", JSON.stringify(userProfile));
    } else {
      localStorage.removeItem("mara-user-profile");
    }
  }, [userProfile]);

  // Sync order invoices to storage
  useEffect(() => {
    localStorage.setItem("mara-order-record", JSON.stringify(orders));
  }, [orders]);

  // Back-to-Top Visibility handle
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section smooth routing anchor navigator
  const handleNavigateToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toast trigger helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    const id = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
    return () => clearTimeout(id);
  };

  // Add Item
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems((prevItems) => {
      // Check if exact product / size / color exists
      const existingIdx = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingIdx !== -1) {
        const copied = [...prevItems];
        copied[existingIdx].quantity += 1;
        triggerToast(`Updated quantity of "${product.name}" in bag!`);
        return copied;
      } else {
        triggerToast(`Added "${product.name}" (${size}) to bag!`);
        return [...prevItems, { product, size, color, quantity: 1 }];
      }
    });
  };

  const handleInstantAdd = (product: Product, size: string, color: string) => {
    handleAddToCart(product, size, color);
  };

  // Remove item
  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => {
      const copied = [...prevItems];
      copied.splice(index, 1);
      return copied;
    });
    triggerToast("Item removed from bag");
  };

  // Update item quantity
  const handleUpdateQuantity = (index: number, change: number) => {
    setCartItems((prevItems) => {
      const copied = [...prevItems];
      const newQty = copied[index].quantity + change;
      if (newQty <= 0) {
        copied.splice(index, 1);
        triggerToast("Item removed from bag");
      } else {
        copied[index].quantity = newQty;
      }
      return copied;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    triggerToast("Bag cleared completely");
  };

  // Toggle products in personal lookbook Wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        triggerToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        triggerToast(`Added "${product.name}" to wishlist!`);
        return [...prev, product.id];
      }
    });
  };

  // Open personalized dynamic Account Drawer with specific tab active
  const handleOpenAccount = (tab: "profile" | "wishlist" | "orders") => {
    setAccountTab(tab);
    setIsAccountOpen(true);
  };

  // Register modern checked out invoice sheets
  const handleNewOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    // Also, if profile is not setup, personalize automatically to capture credentials
    if (!userProfile) {
      setUserProfile({
        name: "Valued Ambassador",
        email: "authenticated@mara.club",
        joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        tier: "Silver Client"
      });
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent("Hello MARA Clothmart! I’m checking out your premium catalog.");
    window.open(`https://wa.me/1234567890?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Floating Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigateToSection={handleNavigateToSection}
        wishlistCount={wishlist.length}
        onOpenAccount={handleOpenAccount}
      />

      {/* Main Sections */}
      <main className="relative">
        
        {/* HERO SECTION */}
        <Hero onNavigateToSection={handleNavigateToSection} />

        {/* ABOUT US SECTION */}
        <About />

        {/* SERVICES SECTION */}
        <Services />

        {/* FEATURED PRODUCTS SECTION */}
        <Products
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenQuickView={setSelectedProduct}
          onInstantAdd={handleInstantAdd}
          wishlistIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* WHY CHOOSE US */}
        <Features />

        {/* GALLERY SECTION */}
        <Gallery />

        {/* TESTIMONIALS SECTION */}
        <Testimonials />        {/* CALL TO ACTION QUICK BANNER (Section 8) */}
        <section className="py-24 bg-zinc-950 text-white dark:bg-zinc-950 border-t border-b border-zinc-900/40 relative overflow-hidden">
          {/* subtle gold ambient glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-[42px] font-bold tracking-wide text-white leading-tight">
              Ready to Upgrade Your Style?
            </h2>
            <p className="font-sans text-xs text-zinc-400 max-w-lg mx-auto font-light leading-relaxed tracking-wide">
              Explore our latest sophisticated collections and discover meticulous tailoring designs that elevate your everyday confidence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleNavigateToSection("collections")}
                className="bg-gold hover:bg-white text-zinc-950 hover:text-zinc-950 font-sans text-[10px] tracking-[0.25em] uppercase font-medium py-4 px-8 transition-all duration-300 rounded-none cursor-pointer"
              >
                Shop Now
              </button>
              <button
                onClick={() => handleNavigateToSection("contact")}
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/40 font-sans text-[10px] tracking-[0.25em] uppercase font-medium py-4 px-8 transition-all duration-300 rounded-none cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <Contact />

      </main>

      {/* FOOTER SECTION */}
      <Footer onNavigateToSection={handleNavigateToSection} />

      {/* QUICK VIEW DETAILS MODAL */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        wishlistIds={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onNewOrder={handleNewOrder}
      />

      {/* PERSONAL ACCOUNT & WISHLIST DRAWER */}
      <AccountDrawer
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        initialTab={accountTab}
        wishlistIds={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onInstantAdd={handleInstantAdd}
        onOpenQuickView={setSelectedProduct}
        userProfile={userProfile}
        onUpdateProfile={setUserProfile}
        orders={orders}
      />

      {/* FLOATING ACTION UTILITIES (FLOATING RAIL BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        
        {/* PREMIUM WHATSAPP FLOATING CHAT BALLOON */}
        <button
          onClick={handleWhatsAppChat}
          title="Direct WhatsApp live style consultation support"
          className="relative group p-4 bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:scale-108 transition-all duration-300 rounded-none cursor-pointer"
          aria-label="WhatsApp Stylist Chat Button"
        >
          {/* Ambient live pulse ring */}
          <span className="absolute inset-0 rounded-none border border-emerald-500 animate-ping opacity-75 pointer-events-none"></span>
          <MessageSquare className="w-5 h-5" />
          
          {/* Quick styling tag hint on hover */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-zinc-900 text-white text-[9px] font-mono tracking-widest uppercase font-bold py-1.5 px-3 whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block pointer-events-none">
            Stylist Chat Live
          </span>
        </button>

        {/* BACK TO TOP ICON BUTTON */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Smooth scroll up"
            className="p-3.5 bg-zinc-900 border border-zinc-800 dark:bg-white text-white dark:text-black hover:bg-gold dark:hover:bg-gold hover:text-white dark:hover:text-white shadow-xl transition-all duration-300 cursor-pointer animate-fadeIn"
            aria-label="Back to top scroll button"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

      </div>

      {/* TOAST SYSTEM POPUP ALERTS */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-zinc-950 border border-zinc-850 text-white p-4.5 shadow-2xl flex items-center justify-between space-x-4 max-w-sm border-l-4 border-l-gold animate-slideIn">
          <div className="flex items-center space-x-3 text-left">
            <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="font-sans text-xs text-zinc-250 font-light">{toastMessage}</span>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="p-1 text-zinc-500 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}

