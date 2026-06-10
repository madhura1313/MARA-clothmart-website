import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X, Sun, Moon, Sparkles, MessageSquare, Heart, User } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  wishlistCount: number;
  onOpenAccount: (tab: "profile" | "wishlist" | "orders") => void;
}

export default function Header({
  darkMode,
  setDarkMode,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  onNavigateToSection,
  wishlistCount,
  onOpenAccount
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Collections", id: "collections" },
    { label: "Showcase", id: "showcase" },
    { label: "Contact", id: "contact" }
  ];

  const handleLinkClick = (id: string) => {
    onNavigateToSection(id);
    setIsMobileMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    // Elegant simulation or actual whatsapp redirect
    const number = "1234567890";
    const text = encodeURIComponent("Hello MARA Clothmart! I’m interested in your premium collections.");
    window.open(`https://wa.me/${number}?text=${text}`, "_blank");
  };  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-none border-b border-zinc-900/10 dark:border-white/10 py-3"
          : "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm py-5 border-b border-zinc-900/10 dark:border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between min-h-[50px]">
          
          {/* Left Navigation (Desktop Only) */}
          <nav className="hidden lg:flex items-center space-x-6 w-1/3">
            {navLinks.slice(0, 3).map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="font-sans font-medium text-[10px] tracking-[0.25em] text-zinc-900 dark:text-zinc-100 hover:text-gold dark:hover:text-gold uppercase cursor-pointer transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Absolute Centered Branding (Editorial Style Logo) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <button
              onClick={() => handleLinkClick("home")}
              className="focus:outline-none flex flex-col items-center group cursor-pointer"
            >
              <span className="text-3xl sm:text-4xl font-serif tracking-[0.18em] font-bold italic uppercase text-zinc-900 dark:text-white leading-none transition-transform group-hover:scale-102">
                Mara
              </span>
              <span className="text-[7px] tracking-[0.5em] text-gold font-medium uppercase mt-1">
                Clothmart
              </span>
            </button>
          </div>

          {/* Desktop Right items & Controls */}
          <div className="flex items-center justify-end space-x-4 w-1/2 lg:w-1/3 ml-auto">
            
            {/* Desktop Navigation Second Half */}
            <nav className="hidden xl:flex items-center space-x-6 mr-4">
              {navLinks.slice(3).map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="font-sans font-medium text-[10px] tracking-[0.25em] text-zinc-900 dark:text-zinc-100 hover:text-gold dark:hover:text-gold uppercase cursor-pointer transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Search Input Bar (Desktop) */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className={`pl-8 pr-4 py-1.5 rounded-none text-[10px] tracking-widest border transition-all duration-300 focus:outline-none ${
                  isSearchFocused
                    ? "w-48 border-zinc-900 dark:border-white bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
                    : "w-32 border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-650 dark:text-zinc-400"
                }`}
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            </div>

            {/* Light/Dark Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-gold dark:hover:text-gold cursor-pointer transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onOpenAccount("wishlist")}
              className="relative p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-gold dark:hover:text-gold cursor-pointer transition-all duration-200 hover:scale-105"
              aria-label="Wishlist"
              title="My Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? "fill-gold text-gold" : ""}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-white text-[8px] font-mono font-bold flex items-center justify-center rounded-none border border-white dark:border-zinc-950">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account Profile Button */}
            <button
              onClick={() => onOpenAccount("profile")}
              className="p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-gold dark:hover:text-gold cursor-pointer transition-all duration-200 hover:scale-105"
              aria-label="My Account"
              title="My Account"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-gold dark:hover:text-gold cursor-pointer transition-all duration-200 hover:scale-105"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-950 dark:bg-white text-white dark:text-black text-[8px] font-mono font-bold flex items-center justify-center rounded-none border border-white dark:border-zinc-950">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Consultation */}
            <button
              onClick={handleWhatsAppClick}
              title="Speak with stylist"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 dark:bg-white hover:bg-gold dark:hover:bg-gold text-white dark:text-black dark:hover:text-white font-sans text-[9px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Stylist</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 lg:hidden text-zinc-805 dark:text-white hover:text-gold cursor-pointer transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-lg px-4 pt-4 pb-6 space-y-4 animate-fadeIn">
          {/* Mobile Search */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-none text-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-gold focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-3 px-2 font-sans font-medium text-sm tracking-wider text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-gold uppercase transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Quick buttons */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppClick}
              className="flex justify-center items-center space-x-2 py-2.5 bg-[#4ADE80]/80 dark:bg-emerald-600 dark:text-white text-zinc-950 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCart();
              }}
              className="flex justify-center items-center space-x-2 py-2.5 bg-black dark:bg-white text-white dark:text-black font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart ({cartCount})</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAccount("wishlist");
              }}
              className="flex justify-center items-center space-x-2 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-gold fill-gold/15" />
              <span>Wishlist ({wishlistCount})</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAccount("profile");
              }}
              className="flex justify-center items-center space-x-2 py-2.5 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
