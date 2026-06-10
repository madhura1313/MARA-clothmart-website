import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck, Heart, Award, ArrowUpRight } from "lucide-react";
import { STATS } from "../data";

// Animated counter utility component
function Counter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [count, setCount] = useState<string>("0");
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse values like "10,000+", "500+", "50+", "5-Star"
    const isStar = value.includes("5-Star");
    const rawNumber = parseInt(value.replace(/,/g, "").replace(/\+/g, ""));
    if (isNaN(rawNumber)) {
      setCount(value);
      return;
    }

    let start = 0;
    const end = rawNumber;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    
    // Fast step counter
    const step = () => {
      start += Math.ceil(end / 40); // 40 steps max to count smoothly without lag
      if (start >= end) {
        setCount(value);
      } else {
        const formatted = start.toLocaleString();
        setCount(isStar ? `${start}-Star` : `${formatted}+`);
        setTimeout(step, incrementTime);
      }
    };
    
    setTimeout(step, 50);
  }, [value, duration, isInView]);

  return (
    <span ref={elementRef} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 dark:text-white">
      {count}
    </span>
  );
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-zinc-950 border-t border-b border-zinc-900/10 dark:border-white/10 relative overflow-hidden">
      
      {/* Absolute faint branding text in backdrop */}
      <div className="absolute right-[5%] top-12 text-[10px] uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800 font-mono select-none">
        Heritage Documented // Est. 2016
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Professional Images & floating achievement badge (Col 1 to 5) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
            
            <div className="space-y-4">
              <div className="overflow-hidden rounded-none border border-zinc-900/10 dark:border-white/10 p-2 bg-zinc-50 dark:bg-zinc-900/30">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=400"
                  alt="Elegant styling MARA"
                  className="w-full h-48 sm:h-64 object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-none"
                />
              </div>
              <div className="bg-transparent p-6 flex flex-col justify-between h-40 sm:h-48 border border-zinc-900/10 dark:border-white/10 text-left rounded-none">
                <span className="text-[10px] font-bold text-gold uppercase tracking-[0.25em]">01 / Precision</span>
                <div>
                  <h4 className="font-sans font-medium text-[10px] tracking-widest text-zinc-900 dark:text-white uppercase">Guaranteed Quality</h4>
                  <p className="text-[11px] font-sans text-zinc-500 mt-1.5 font-light leading-relaxed">Every individual fiber checked at our boutique atelier before boxing.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-zinc-950 text-white dark:bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between h-40 sm:h-48 relative overflow-hidden text-left rounded-none">
                <div>
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-1">Authentic</p>
                  <span className="text-3xl sm:text-4xl font-serif font-bold italic text-white leading-none">10+ Years</span>
                </div>
                <div>
                  <h4 className="font-sans font-light text-[9px] tracking-[0.2em] uppercase text-zinc-400">Atelier Craftsmanship</h4>
                </div>
              </div>
              <div className="overflow-hidden rounded-none border border-zinc-900/10 dark:border-white/10 p-2 bg-zinc-50 dark:bg-zinc-900/30">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400"
                  alt="MARA Clothmart boutique decor"
                  className="w-full h-48 sm:h-64 object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-none"
                />
              </div>
            </div>
          </div>

          {/* Right: Text Information (Col 6 to 12) */}
          <div className="lg:col-span-7 text-left space-y-8 lg:pl-4">
            <div className="space-y-3">
              <span className="font-sans text-[10px] tracking-[0.3em] font-medium text-gold uppercase block">
                Heritage & Promise
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                About <span className="italic font-normal">Mara</span>
              </h2>
              <div className="w-10 h-[1px] bg-zinc-950 dark:bg-zinc-200"></div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
              MARA Clothmart is committed to bringing stylish, comfortable, and high-quality fashion to customers. With carefully selected collections and excellent customer support, we help people express their unique style with absolute confidence. We combine global trending aesthetics with traditional raw premium weaves to provide luxury silhouettes at attainable rates.
            </p>

            {/* Mission & Vision Tabs/Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="p-5 border-l border-zinc-900/10 dark:border-white/10 space-y-2">
                <span className="font-sans font-semibold text-[10px] tracking-[0.25em] text-gold uppercase block">The Mission</span>
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed font-light">
                  To craft impeccably styled, luxury-feel garments highlighting comfort, robust structural durability, and ethical material sourcing.
                </p>
              </div>

              <div className="p-5 border-l border-zinc-900/10 dark:border-white/10 space-y-2">
                <span className="font-sans font-semibold text-[10px] tracking-[0.25em] text-gold uppercase block">The Vision</span>
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed font-light">
                  To become the benchmarking multi-generational clothing house, setting standard paradigms for design transparency.
                </p>
              </div>
            </div>

            {/* Statistics Counters panel (Fulfills animated stats requirement) */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-zinc-900/10 dark:border-white/10"
            >
              {STATS.map((stat, i) => (
                <motion.div key={i} variants={itemVariants} className="space-y-1.5">
                  <div className="flex items-baseline space-x-1 justify-start">
                    <Counter value={stat.value} />
                  </div>
                  <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-zinc-400 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stylist invite action */}
            <div className="inline-flex items-center space-x-3 bg-[#F9F9F9] dark:bg-zinc-900/30 p-4 w-full justify-between border border-zinc-900/10 dark:border-white/10 rounded-none">
              <div className="flex items-center space-x-3 text-zinc-700 dark:text-zinc-350">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
                <span className="font-sans text-xs font-light">Customer-first, premium tailored fit alignments.</span>
              </div>
              <a href="#contact" className="font-sans text-[9px] uppercase tracking-[0.2em] font-medium text-gold hover:text-gold/80 inline-flex items-center space-x-1.5 transition-colors">
                <span>Join Atelier</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
