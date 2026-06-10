import React from "react";
import { motion } from "motion/react";
import { Check, ShieldCheck, TrendingUp, DollarSign, Heart, Award, Users } from "lucide-react";

export default function Features() {
  const highlights = [
    {
      num: "01",
      title: "Premium Quality Fabrics",
      details: "Our clothing is crafted with organic wool, top-shelf Egyptian cotton, and custom silks that maintain premium drape, luster, and wash durability.",
      icon: Award,
    },
    {
      num: "02",
      title: "Latest Fashion Trends",
      details: "We align with top global stylists, updating our lines each season with cutting-edge designs directly inspired by European runway capsule lists.",
      icon: TrendingUp,
    },
    {
      num: "03",
      title: "Reasonable Pricing",
      details: "By retaining in-house pattern-making teams and direct fabrics supplier agreements, we completely bypass third party markup cost barriers.",
      icon: DollarSign,
    },
    {
      num: "04",
      title: "Excellent Customer Support",
      details: "Experience personalized custom styling assistance, hassle-free returns on fitted items, and proactive answers within minutes.",
      icon: Heart,
    },
    {
      num: "05",
      title: "Wide Product Variety",
      details: "From exquisite ethnics and heavy outerwear to comfortable playwear for kids and luxury, crisp, professional executive formalwear.",
      icon: ShieldCheck,
    },
    {
      num: "06",
      title: "Trusted by Thousands",
      details: "For over 10 years, our flagship boutique has earned high praises and perfect 5-star customer ratings across regional fashion circuits.",
      icon: Users,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-[#F5F5F5] dark:bg-zinc-950/40 border-t border-b border-zinc-900/10 dark:border-white/10 relative overflow-hidden text-left">
      
      {/* Absolute faint campaign line rails */}
      <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-zinc-900/5 dark:bg-white/5 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-zinc-900/5 dark:bg-white/5 pointer-events-none hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-xl space-y-3 mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium text-gold uppercase block">
            Why We Excel
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Why Choose <span className="italic font-normal">Mara</span>
          </h2>
          <div className="w-10 h-[1px] bg-zinc-950 dark:bg-zinc-200"></div>
          <p className="font-sans text-xs text-zinc-550 dark:text-zinc-400 font-light leading-relaxed">
            At MARA, we care deeply about luxury feel, fabric source traceability, and custom fit confidence, ensuring that your garments look spectacular season after season.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-zinc-900 p-8 border border-zinc-900/10 dark:border-white/10 relative group rounded-none shadow-none hover:bg-white/80 dark:hover:bg-zinc-900/80 transition-all duration-300"
              >
                {/* Horizontal checklist layout */}
                <div className="flex gap-4">
                  
                  {/* Left Side Icon Frame */}
                  <div className="w-8 h-8 border border-zinc-900/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-zinc-950 dark:text-zinc-50 group-hover:border-gold transition-colors duration-300">
                    <Icon className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 group-hover:text-gold" />
                  </div>

                  {/* Right Side Info */}
                  <div className="space-y-1.5 flex-1 select-none">
                    <div className="flex items-center space-x-2">
                      <span className="text-gold font-sans text-xs font-semibold">{highlight.num} /</span>
                      <h3 className="font-sans font-semibold text-[11px] tracking-wider uppercase text-zinc-900 dark:text-white">
                        {highlight.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                      {highlight.details}
                    </p>
                  </div>

                </div>

                {/* Subtle side gold bar on active hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-transparent group-hover:bg-gold transition-colors duration-350"></div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
