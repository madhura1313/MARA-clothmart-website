import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { REVIEWS } from "../data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto sliding carousel configuration
  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const handlePrev = () => {
    stopTimer();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? REVIEWS.length - 1 : prevIndex - 1));
    startTimer();
  };

  const handleNext = () => {
    stopTimer();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    startTimer();
  };

  const handleDotClick = (index: number) => {
    stopTimer();
    setCurrentIndex(index);
    startTimer();
  };

  const activeReview = REVIEWS[currentIndex];

  return (
    <section className="py-24 bg-[#F5F5F5] dark:bg-zinc-950 border-b border-zinc-900/10 dark:border-white/10 relative overflow-hidden">
      
      {/* Absolute faint campaign line rails */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-zinc-900/5 dark:bg-white/5 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-zinc-900/5 dark:bg-white/5 pointer-events-none hidden md:block"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium text-gold uppercase block">
            Client Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            What Our <span className="italic font-normal">Patrons</span> Say
          </h2>
          <div className="w-10 h-[1px] bg-zinc-950 dark:bg-zinc-200 mx-auto"></div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative bg-white dark:bg-zinc-900 border border-zinc-900/10 dark:border-white/10 p-8 sm:p-12 shadow-none min-h-[300px] flex flex-col justify-between rounded-none"
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
        >
          
          {/* Quote block and stars */}
          <div className="space-y-6 text-left">
            
            {/* Stars rating */}
            <div className="flex items-center text-gold gap-1">
              {[...Array(5)].map((_, idx) => (
                <Star 
                  key={idx} 
                  className={`w-3.5 h-3.5 fill-gold ${idx < Math.floor(activeReview.rating) ? "text-gold" : "text-zinc-200 dark:text-zinc-700"}`} 
                />
              ))}
            </div>

            {/* Testimonial Statement */}
            <p className="font-serif text-base sm:text-lg lg:text-xl italic text-zinc-800 dark:text-zinc-200 leading-relaxed font-light">
              "{activeReview.text}"
            </p>

          </div>

          {/* Bottom user details cluster row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 mt-6 border-t border-zinc-900/5 dark:border-white/5">
            
            {/* User Bio */}
            <div className="flex items-center space-x-4 text-left">
              <img 
                src={activeReview.avatar} 
                alt={activeReview.name} 
                className="w-12 h-12 rounded-none object-cover border border-zinc-900/10 dark:border-white/10"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-sans font-semibold text-[11px] tracking-widest text-zinc-900 dark:text-white uppercase leading-none">
                  {activeReview.name}
                </h4>
                <span className="font-sans text-[9px] tracking-[0.15em] text-gold uppercase mt-2 inline-block font-light">
                  {activeReview.role}
                </span>
              </div>
            </div>

            {/* Linked item tag */}
            {activeReview.product && (
              <div className="text-left sm:text-right">
                <span className="font-sans text-[8px] uppercase tracking-wider text-zinc-400 block font-semibold">Purchased:</span>
                <span className="font-serif text-xs font-normal text-zinc-600 dark:text-zinc-300 italic">{activeReview.product}</span>
              </div>
            )}

          </div>

          {/* Absolute Navigation Handles */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between px-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-3 bg-zinc-950 text-white dark:bg-white dark:text-black hover:bg-gold dark:hover:bg-gold hover:text-white dark:hover:text-white border border-zinc-800/10 pointer-events-auto rounded-none transition-colors transform -translate-x-12 cursor-pointer"
              aria-label="Previous Testimonial reviews"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-zinc-950 text-white dark:bg-white dark:text-black hover:bg-gold dark:hover:bg-gold hover:text-white dark:hover:text-white border border-zinc-800/10 pointer-events-auto rounded-none transition-colors transform translate-x-12 cursor-pointer"
              aria-label="Next Testimonial reviews"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Carousel Pagination indicator Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-[2px] transition-all rounded-none cursor-pointer ${
                currentIndex === idx 
                  ? "bg-gold w-8" 
                  : "bg-zinc-300 dark:bg-zinc-800 w-4 hover:bg-zinc-400"
              }`}
              title={`Review index ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
