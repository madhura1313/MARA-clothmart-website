import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { SERVICES } from "../data";

// Helper to resolve icon by string from Lucide
function IconResolver({ name, className }: { name: string; className: string }) {
  // Map icons safely
  const resolved = (Icons as any)[name];
  if (!resolved) {
    return <Icons.Sparkles className={className} />;
  }
  return React.createElement(resolved, { className });
}

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section id="services" className="py-24 bg-[#F5F5F5] dark:bg-zinc-950/70 relative overflow-hidden border-b border-zinc-900/10 dark:border-white/10">
      
      {/* Delicate line overlay */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-zinc-900/5 dark:bg-white/5 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-zinc-900/5 dark:bg-white/5 pointer-events-none hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium text-gold uppercase block">
            Craftsmanship & Care
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Our <span className="italic font-normal">Expertise</span>
          </h2>
          <div className="w-10 h-[1px] bg-zinc-950 dark:bg-zinc-200 mx-auto"></div>
          <p className="font-sans text-xs text-zinc-550 dark:text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
            Experience our comprehensive wardrobe offerings designed to ensure you discover fabric selections with unparalleled comfort.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white dark:bg-zinc-900 p-8 border border-zinc-900/10 dark:border-white/10 relative group flex flex-col justify-between text-left h-72 cursor-pointer rounded-none hover:bg-white/90 dark:hover:bg-zinc-900/90 transition-all duration-300"
            >
              {/* Card Header styling */}
              <div className="space-y-4">
                
                {/* Minimalist Icon */}
                <div className="w-10 h-10 border border-zinc-900/10 dark:border-white/10 flex items-center justify-center transition-colors duration-300 group-hover:border-gold">
                  <IconResolver 
                    name={service.iconName} 
                    className="w-4 h-4 text-zinc-800 dark:text-zinc-200 group-hover:text-gold transition-colors duration-300" 
                  />
                </div>

                {/* Service Title */}
                <h3 className="font-sans font-semibold text-[11px] tracking-widest text-zinc-900 dark:text-white uppercase transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                  {service.description}
                </p>

              </div>

              {/* Bottom Decorative Indicator */}
              <div className="flex items-center space-x-2 text-[9px] font-mono tracking-widest text-zinc-400 group-hover:text-gold uppercase pt-4 transition-colors duration-300 border-t border-zinc-900/5 dark:border-white/5">
                <span>Explore Department</span>
                <Icons.ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Top Right Accent line instead of blocky triangle */}
              <div className="absolute top-0 right-0 w-8 h-[1.5px] bg-transparent group-hover:bg-gold transition-colors duration-300"></div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
