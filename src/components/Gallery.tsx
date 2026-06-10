import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";
import { GALLERY_ITEMS } from "../data";
import { GalleryItem } from "../types";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    return ["All", "Men", "Women", "Kids", "Seasonal", "New Arrivals", "Store Interior"];
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleOpenLightbox = (item: GalleryItem) => {
    // Find absolute index inside filtered items
    const idx = filteredItems.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="showcase" className="py-24 bg-white dark:bg-zinc-950 border-t border-b border-zinc-900/10 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Headers */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium text-gold uppercase block">
            The Atelier
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Our Fashion <span className="italic font-normal">Showcase</span>
          </h2>
          <div className="w-10 h-[1px] bg-zinc-950 dark:bg-zinc-200 mx-auto"></div>
          <p className="font-sans text-xs text-zinc-550 dark:text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
            Browse our curated high-fashion moodboards, seasonal releases, and elegant physical boutique interior spaces.
          </p>
        </div>

        {/* Categories Menu List */}
        <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-3 overflow-x-auto pb-4 sm:pb-0 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-3 font-sans text-[9px] tracking-[0.2em] uppercase transition-all duration-300 rounded-none whitespace-nowrap cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 border-zinc-950 dark:border-white"
                  : "border-zinc-900/10 dark:border-white/10 text-zinc-650 dark:text-zinc-400 hover:border-zinc-800 dark:hover:border-zinc-200 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (Collage look) */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className="group relative h-80 overflow-hidden cursor-pointer bg-zinc-100 dark:bg-zinc-900 border border-zinc-900/10 dark:border-white/10 rounded-none p-2"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 rounded-none"
                  referrerPolicy="no-referrer"
                />

                {/* dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-400 m-2"></div>

                {/* Info Text cluster */}
                <div className="absolute bottom-8 left-8 right-8 text-left text-white transform transition-transform duration-350">
                  
                  {/* Category icon indicator */}
                  <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-gold font-semibold block mb-1">
                    {item.category} SHOWCASE
                  </span>

                  {/* Title of frame */}
                  <h3 className="font-serif text-sm font-semibold leading-tight text-white mb-2 line-clamp-1">
                    {item.title}
                  </h3>

                  {/* interactive action trigger link */}
                  <span className="inline-flex items-center space-x-1.5 text-[8px] font-sans tracking-[0.2em] text-zinc-350 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-3 h-3 text-gold" />
                    <span>Expand Frame</span>
                  </span>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LIGHTBOX MODAL OVERLAY (Activates on expand) */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-zinc-950/95 flex flex-col justify-between p-4"
              onClick={() => setLightboxIndex(null)}
            >
              
              {/* Top controls row */}
              <div className="flex justify-between items-center py-4 px-6 relative z-10 w-full max-w-7xl mx-auto">
                <span className="font-sans text-[10px] text-zinc-400 tracking-[0.25em] uppercase">
                  Frame {lightboxIndex + 1} of {filteredItems.length} &bull; {filteredItems[lightboxIndex].category}
                </span>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2.5 text-zinc-455 hover:text-white cursor-pointer bg-zinc-900 border border-zinc-800 rounded-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Image content panel */}
              <div className="flex-1 flex items-center justify-center relative w-full max-w-5xl mx-auto">
                
                {/* Prev control */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 z-10 p-3 bg-zinc-900 hover:bg-gold hover:text-white text-zinc-400 border border-zinc-850 rounded-none transition-colors cursor-pointer"
                  aria-label="Previous Showcase Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Image item wrapping */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="relative max-h-[70vh] max-w-full overflow-hidden border border-zinc-800 shadow-none rounded-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={filteredItems[lightboxIndex].image}
                    alt={filteredItems[lightboxIndex].title}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/80 p-4 text-left border-t border-zinc-850">
                    <h3 className="font-serif text-sm font-semibold text-white leading-tight">
                      {filteredItems[lightboxIndex].title}
                    </h3>
                  </div>
                </motion.div>

                {/* Next control */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 z-10 p-3 bg-zinc-900 hover:bg-gold hover:text-white text-zinc-400 border border-zinc-850 rounded-none transition-colors cursor-pointer"
                  aria-label="Next Showcase Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

              {/* Bottom description row */}
              <div className="py-6 text-center text-zinc-550 font-sans text-[9px] tracking-[0.3em] uppercase">
                &copy; MARA CLOTHMART FASHION GALLERY ATELIER EST. 2016
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
