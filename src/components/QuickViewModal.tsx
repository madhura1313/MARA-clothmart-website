import React, { useState, useEffect } from "react";
import { X, Star, Heart, ShieldAlert, Truck, RefreshCw, ShoppingBag } from "lucide-react";
import { Product } from "../types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export default function QuickViewModal({ 
  product, 
  onClose, 
  onAddToCart,
  wishlistIds,
  onToggleWishlist
}: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize("M");
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor("#111111");
      }
      setAddedMessage(false);
    }
  }, [product]);

  if (!product) return null;

  const isLiked = wishlistIds.includes(product.id);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay */}
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
          aria-hidden="true"
        ></div>

        {/* Trick browser into centering modal contents */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel */}
        <div className="inline-block align-bottom bg-white dark:bg-zinc-900 border border-zinc-900/10 dark:border-white/10 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full self-center rounded-none">
          
          {/* Close trigger button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer rounded-none"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2">
            
            {/* Image display Left Panel */}
            <div className="relative h-[320px] sm:h-[450px] bg-zinc-100 dark:bg-zinc-950">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-none"
                referrerPolicy="no-referrer"
              />
              {product.isNewArrival && (
                <span className="absolute top-4 left-4 bg-gold text-white text-[8px] font-sans font-bold uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-none">
                  New Arrival
                </span>
              )}
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 bg-zinc-900 text-white text-[8px] font-sans font-bold uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-none">
                  Bestseller
                </span>
              )}
            </div>

            {/* Content & interactive options Right Panel */}
            <div className="p-6 sm:p-8 flex flex-col justify-between text-left space-y-6">
              
              {/* Product Info */}
              <div className="space-y-3">
                <span className="font-sans text-[8px] uppercase tracking-[0.25em] font-medium text-gold">
                  {product.category}
                </span>
                
                <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white tracking-wide">
                  {product.name}
                </h3>

                {/* Rating & reviews */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-zinc-200 dark:text-zinc-805"}`} 
                      />
                    ))}
                  </div>
                  <span className="font-sans text-[10px] tracking-wider text-zinc-400">
                    {product.rating} ({product.reviewsCount} reviews)
                  </span>
                </div>

                {/* Price display */}
                <p className="font-serif text-xl font-semibold text-zinc-900 dark:text-gold pt-1">
                  ${product.price.toFixed(2)}
                </p>

                {/* Detailed Description */}
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-300 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Selection Variables */}
              <div className="space-y-4 pt-1">
                
                {/* Color swatches */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-sans text-[9px] font-semibold text-zinc-400 uppercase tracking-[0.2em] block">
                      Color Way
                    </span>
                    <div className="flex items-center space-x-2">
                      {product.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(color)}
                          className={`w-6 h-6 rounded-none border transition-all cursor-pointer ${
                            selectedColor === color 
                              ? "border-gold ring-1 ring-gold/45 scale-105" 
                              : "border-zinc-300 dark:border-zinc-700"
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes Circles */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-sans text-[9px] font-semibold text-zinc-400 uppercase tracking-[0.2em] block">
                      Select Size
                    </span>
                    <div className="flex items-center space-x-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-8 h-8 rounded-none border text-xs font-sans transition-all cursor-pointer ${
                            selectedSize === size
                              ? "border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-medium"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-gold text-zinc-500 hover:text-zinc-805"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Material Specs */}
                <div className="grid grid-cols-2 gap-4 text-[10px] pt-4 border-t border-zinc-900/10 dark:border-white/10">
                  <div>
                    <span className="font-semibold text-zinc-400 block uppercase tracking-wider text-[8px]">Fabric</span>
                    <span className="text-zinc-700 dark:text-zinc-200 font-light">{product.material || "Premium Blend"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-400 block uppercase tracking-wider text-[8px]">Garment Care</span>
                    <span className="text-zinc-700 dark:text-zinc-200 font-light">{product.care || "Dry Clean Preferred"}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleAdd}
                  disabled={addedMessage}
                  className="flex-1 flex items-center justify-center space-x-3 bg-zinc-950 hover:bg-gold dark:bg-white dark:hover:bg-gold text-white dark:text-zinc-950 dark:hover:text-white py-3.5 px-6 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 disabled:bg-[#f6f6f6] disabled:text-zinc-400 rounded-none cursor-pointer"
                >
                  {addedMessage ? (
                    <>
                      <Star className="w-3.5 h-3.5 animate-spin" />
                      <span>Added To Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 border transition-colors rounded-none cursor-pointer ${
                    isLiked 
                      ? "bg-[#FCFCFC] dark:bg-zinc-805 border-gold/40 text-gold shadow-xs" 
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                  aria-label="Add to Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-gold text-gold" : ""}`} />
                </button>
              </div>

              {/* Policy Quick Information */}
              <div className="grid grid-cols-3 gap-2 text-[8px] font-sans text-zinc-400 uppercase tracking-[0.2em] pt-2 text-center">
                <div className="flex flex-col items-center space-y-1">
                  <Truck className="w-4 h-4 text-zinc-400 block" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <RefreshCw className="w-4 h-4 text-zinc-400 block" />
                  <span>30 Days Returns</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <ShieldAlert className="w-4 h-4 text-zinc-400 block" />
                  <span>Genuine Style</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
