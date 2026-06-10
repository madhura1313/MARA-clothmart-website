import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Compass } from "lucide-react";

interface HeroProps {
  onNavigateToSection: (sectionId: string) => void;
}

export default function Hero({ onNavigateToSection }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center bg-[#F5F5F5] dark:bg-zinc-950 overflow-hidden border-b border-zinc-900/10 dark:border-white/10"
    >
      {/* Absolute Decorative Line Rails */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-zinc-900/5 dark:bg-white/5 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-zinc-900/5 dark:bg-white/5 pointer-events-none hidden md:block"></div>
      
      {/* Left side ambient glow */}
      <div className="absolute -left-20 top-1/4 w-80 h-80 bg-gold/10 dark:bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Info Text Cluster (Col 1 to 7) */}
          <div className="lg:col-span-7 text-left space-y-8 lg:pr-8">
            
            {/* New Season Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-3 bg-white dark:bg-zinc-900 border border-zinc-900/10 dark:border-white/10 px-4 py-2 shadow-none rounded-none"
            >
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] font-medium text-zinc-900 dark:text-zinc-100">
                The Summer Campaign SS/26
              </span>
            </motion.div>
 
             {/* Headline */}
             <div className="space-y-6">
               <motion.h1
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7, delay: 0.1 }}
                 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-zinc-900 dark:text-white"
               >
                 Fashion That <br />
                 <span className="italic font-normal text-zinc-905 dark:text-zinc-50 font-serif">
                   Defines
                 </span> <br />
                 Your Style
               </motion.h1>
 
               {/* Subheadline */}
               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7, delay: 0.2 }}
                 className="font-sans text-xs sm:text-sm lg:text-base text-zinc-700 dark:text-zinc-300 max-w-lg leading-relaxed font-light"
               >
                 Discover high-quality fashion apparel for men, women, and kids at MARA Clothmart. Meticulous fabrics meet modern silhouettes and fine tailoring to elevate your everyday aesthetics.
               </motion.p>
             </div>
 
             {/* CTAs */}
             <motion.div
               initial={{ opacity: 0, y: 25 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.7, delay: 0.3 }}
               className="flex flex-wrap gap-4 pt-2"
             >
               {/* Primary: Shop collection */}
               <button
                 onClick={() => onNavigateToSection("collections")}
                 className="group flex items-center space-x-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 px-6 font-sans font-medium tracking-[0.25em] text-[10px] uppercase transition-all duration-300 cursor-pointer rounded-none hover:bg-gold dark:hover:bg-gold hover:text-white dark:hover:text-white"
               >
                 <span>Shop Collections</span>
                 <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-200" />
               </button>
 
               {/* Secondary: Contact Us */}
               <button
                 onClick={() => onNavigateToSection("contact")}
                 className="flex items-center space-x-2 bg-transparent hover:bg-zinc-900/5 dark:hover:bg-white/5 border border-zinc-900/10 dark:border-white/10 text-zinc-805 dark:text-zinc-300 px-8 py-4 font-sans font-medium tracking-[0.25em] text-[10px] uppercase transition-all duration-300 cursor-pointer rounded-none"
               >
                 <span>Explore Story</span>
               </button>
             </motion.div>
 
             {/* Thin Line Stats Dividers (Editorial Layout) */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="flex flex-col space-y-3 pt-8 border-t border-zinc-900/10 dark:border-white/10 max-w-sm"
             >
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-[1px] bg-zinc-950 dark:bg-zinc-200"></div>
                 <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-zinc-500 dark:text-zinc-400">10,000+ Happy Customers</span>
               </div>
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-[1px] bg-zinc-950 dark:bg-zinc-200"></div>
                 <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-zinc-500 dark:text-zinc-400">50+ Handpicked Textiles</span>
               </div>
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-[1px] bg-zinc-950 dark:bg-zinc-200"></div>
                 <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-zinc-500 dark:text-zinc-400">Worldwide Doorstep Shipping</span>
               </div>
             </motion.div>
 
           </div>
 
           {/* Interactive Fashion Image Collage (Col 8 to 12) */}
           <div className="lg:col-span-5 relative flex justify-center items-center h-[400px] sm:h-[500px] lg:h-[650px] mt-8 lg:mt-0">
             
             {/* Layout Grid Separators */}
             <div className="absolute inset-0 border border-zinc-900/10 dark:border-white/10 rounded-none pointer-events-none opacity-80"></div>
 
             {/* Main Center Image - Editorial Campaign look */}
             <motion.div
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.9, delay: 0.2 }}
               className="w-[85%] h-[88%] relative group overflow-hidden border border-zinc-900/10 dark:border-white/10 bg-white dark:bg-zinc-900 p-3"
             >
               <div className="relative w-full h-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden" style={{ minHeight: "100%" }}>
                 <img
                   src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800"
                   alt="MARA Clothmart Premium Dress Collection"
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                 />
                 <div className="absolute inset-0 bg-zinc-950/10"></div>
                 
                 {/* Bottom campaign sticker layout matching Design HTML */}
                 <div className="absolute bottom-6 left-6 border-l-2 border-gold pl-4 text-left animate-slideIn">
                   <p className="text-[10px] uppercase tracking-widest text-zinc-100 mb-1 font-sans">New Arrival</p>
                   <p className="text-base sm:text-lg font-serif italic font-bold text-white leading-tight">The Heritage Atelier SS/26</p>
                   <p className="text-xs text-gold font-medium mt-1 font-mono uppercase tracking-widest">Photographed in Paris</p>
                 </div>
               </div>
             </motion.div>
 
             {/* Floating text widget replacing boxy cards */}
             <div className="absolute right-[-10px] top-12 bg-white dark:bg-zinc-900 border border-zinc-900/10 dark:border-white/10 p-4 max-w-[150px] text-left hidden xl:block shadow-sm">
               <p className="font-serif italic text-xs text-zinc-805 dark:text-zinc-200">
                 "Silhouettes transcending seasons."
               </p>
               <div className="mt-2 text-[7px] font-sans tracking-widest text-gold font-bold uppercase">
                 MARA CLOTHMART
               </div>
             </div>
           </div>

        </div>
      </div>
    </section>
  );
}
