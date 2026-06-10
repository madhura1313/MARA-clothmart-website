import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Eye, ShoppingBag, Filter, Search, ArrowRight, Sparkles, Heart } from "lucide-react";
import { PRODUCTS } from "../data";
import { Product } from "../types";

interface ProductsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenQuickView: (product: Product) => void;
  onInstantAdd: (product: Product, size: string, color: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

const CATEGORIES = [
  "All",
  "Men's Fashion",
  "Women's Fashion",
  "Kids Fashion",
  "Ethnic Wear",
  "Casual Wear",
  "Formal Wear"
] as const;

export default function Products({
  searchQuery,
  setSearchQuery,
  onOpenQuickView,
  onInstantAdd,
  wishlistIds,
  onToggleWishlist
}: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Memoized filter list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch = searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="collections" className="py-24 bg-white dark:bg-zinc-950 border-t border-b border-zinc-900/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subheading */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium text-gold uppercase block">
            Signature Wardrobe
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Featured <span className="italic font-normal">Collections</span>
          </h2>
          <div className="w-10 h-[1px] bg-zinc-950 dark:bg-zinc-200 mx-auto"></div>
          <p className="font-sans text-xs text-zinc-550 dark:text-zinc-400 font-light max-w-md mx-auto leading-relaxed">
            Discover modern, premium clothing styles meticulously selected to ensure premium elegance and accessible pricing.
          </p>
        </div>

        {/* Global Catalog Filter Controls */}
        <div className="space-y-6 mb-12">
          
          {/* Horizontal category slider */}
          <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-3 text-[9px] font-sans tracking-[0.2em] uppercase transition-all duration-300 rounded-none whitespace-nowrap cursor-pointer border ${
                  selectedCategory === category
                    ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 border-zinc-950 dark:border-white"
                    : "border-zinc-900/10 dark:border-white/10 text-zinc-650 dark:text-zinc-400 hover:border-zinc-800 dark:hover:border-zinc-200 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Active filter / Search status indicator */}
          {(searchQuery.trim() !== "" || selectedCategory !== "All") && (
            <div className="flex items-center justify-between bg-[#F9F9F9] dark:bg-zinc-900/30 p-4 border border-zinc-900/10 dark:border-white/10 rounded-none">
              <p className="font-sans text-xs font-light text-zinc-500 text-left">
                Showing {filteredProducts.length} results
                {selectedCategory !== "All" && ` in "${selectedCategory}"`}
                {searchQuery.trim() !== "" && ` matching "${searchQuery}"`}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="font-sans text-[10px] text-zinc-400 hover:text-gold uppercase tracking-[0.2em] font-semibold cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>

        {/* Responsive Grid with elegant micro animations */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-zinc-900/20 dark:border-white/10 rounded-none max-w-md mx-auto">
            <Search className="w-6 h-6 text-zinc-350 mx-auto mb-3" />
            <h4 className="font-serif text-lg font-bold text-zinc-700 dark:text-zinc-300">
              No Pieces Found
            </h4>
            <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 font-light mt-1 max-w-xs mx-auto">
              We couldn't locate any items matching your exact filter queries. Try broad categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 font-sans text-[10px] uppercase font-semibold tracking-widest text-gold hover:text-gold-dark"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-900/10 dark:border-white/10 flex flex-col justify-between group cursor-pointer relative rounded-none shadow-none hover:border-zinc-950 dark:hover:border-zinc-200 transition-colors duration-300"
                >
                  
                  {/* Card Thumbnail Area with buttons overlay */}
                  <div className="relative h-[280px] sm:h-[320px] bg-zinc-50 dark:bg-zinc-950 overflow-hidden p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-700 rounded-none"
                      referrerPolicy="no-referrer"
                    />

                    {/* Floating Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-900 shadow-sm backdrop-blur-xs transition-all duration-300 cursor-pointer rounded-none border border-zinc-900/5 hover:scale-105"
                      title={wishlistIds.includes(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart 
                        className={`w-3.5 h-3.5 transition-colors duration-300 ${
                          wishlistIds.includes(product.id) 
                            ? "fill-gold text-gold" 
                            : "text-zinc-550 dark:text-zinc-400 hover:text-gold"
                        }`} 
                      />
                    </button>

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                      {product.isNewArrival && (
                        <span className="bg-gold text-white text-[8px] font-sans font-medium uppercase tracking-[0.25em] px-2.5 py-1">
                          New
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="bg-zinc-950 text-white text-[8px] font-sans font-medium uppercase tracking-[0.25em] px-2.5 py-1 border border-white/10">
                          Best
                        </span>
                      )}
                    </div>

                    {/* Hover Black Overlay & Button Trigger Panel */}
                    <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                      
                      {/* Quick view icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuickView(product);
                        }}
                        title="Quick View garment"
                        className="p-3 bg-white hover:bg-gold hover:text-white text-zinc-900 shadow-none scale-95 group-hover:scale-100 transition-all duration-300 rounded-none cursor-pointer border border-zinc-900/10"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Instant Add icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const size = product.sizes ? product.sizes[0] : "M";
                          const color = product.colors ? product.colors[0] : "#111111";
                          onInstantAdd(product, size, color);
                        }}
                        title="Add first option directly to bag"
                        className="p-3 bg-white hover:bg-gold hover:text-white text-zinc-900 shadow-none scale-95 group-hover:scale-100 transition-all duration-300 rounded-none cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </div>

                  {/* Product Details Area */}
                  <div className="p-5 text-left flex flex-col justify-between flex-1 space-y-4 border-t border-zinc-900/5 dark:border-white/5">
                    
                    <div className="space-y-1.5">
                      {/* product category */}
                      <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-gold font-semibold">
                        {product.category}
                      </span>
                      
                      {/* Name of item */}
                      <h3 className="font-serif text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-gold transition-colors duration-250 line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Rating details */}
                      <div className="flex items-center space-x-1.5 pt-0.5 text-zinc-400 dark:text-zinc-500">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        <span className="font-mono text-[9px] font-bold">
                          {product.rating}
                        </span>
                        <span className="text-[9px] opacity-30">|</span>
                        <span className="font-sans text-[9px] uppercase tracking-wider font-light">
                          {product.reviewsCount} Bought
                        </span>
                      </div>
                    </div>

                    {/* Bottom row: Pricing & Quick view link */}
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-900/5 dark:border-white/5">
                      <span className="font-sans text-xs tracking-wider font-semibold text-zinc-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onOpenQuickView(product)}
                        className="font-sans text-[9px] uppercase tracking-widest font-medium text-zinc-500 hover:text-gold inline-flex items-center space-x-1 transition-colors"
                      >
                        <span>View Piece</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
