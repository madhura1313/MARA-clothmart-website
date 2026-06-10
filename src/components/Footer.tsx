import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, Heart, Sparkles, MessageSquare } from "lucide-react";

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export default function Footer({ onNavigateToSection }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Check if user was already subscribed previously in this session/browser
    const alreadySubscribed = localStorage.getItem("mara-news-subscribed");
    if (alreadySubscribed === "true") {
      setSubscribed(true);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Please enter a valid email address");
      return;
    }

    // Persist subscription client-side
    localStorage.setItem("mara-news-subscribed", "true");
    setSubscribed(true);
    setEmail("");
  };

  const handleLinkClick = (id: string) => {
    onNavigateToSection(id);
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-white/5 py-16 relative">
      
      {/* Top Banner Accent - Elegant Gold Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold/30"></div>

      {/* Main Footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 text-left">
          
          {/* Col 1: Brand details (Col span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => handleLinkClick("home")}
              className="flex flex-col items-start focus:outline-none cursor-pointer group text-left"
            >
              <h3 className="font-serif text-3xl font-bold tracking-[0.22em] text-white leading-none uppercase">
                MARA
              </h3>
              <span className="font-sans text-[8px] tracking-[0.35em] text-gold font-medium uppercase block mt-1">
                CLOTHMART
              </span>
            </button>

            <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              MARA Clothmart offers modern, premium, and affordable fashion collections for men, women, and children. Designed for elegance, comfort, and confidence since 2016.
            </p>

            <div className="space-y-1 font-sans text-[9px] tracking-[0.2em] text-zinc-550 uppercase">
              <p>Corporate Concierge Lines</p>
              <p className="text-white font-bold font-sans text-xs pt-1">+1 (212) 555-0199</p>
            </div>
          </div>

          {/* Col 2: Quick Links (Col span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-sans font-semibold text-[10px] tracking-[0.25em] text-white uppercase block pb-2 border-b border-white/5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: "Home Base", id: "home" },
                { label: "About Story", id: "about" },
                { label: "Featured Collections", id: "collections" },
                { label: "Design Showcase", id: "showcase" },
                { label: "Contact Stylists", id: "contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="hover:text-gold text-zinc-400 transition-colors block text-left cursor-pointer font-sans text-xs font-light tracking-wide"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services / Departments (Col span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-sans font-semibold text-[10px] tracking-[0.25em] text-white uppercase block pb-2 border-b border-white/5">
              Departments
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <button 
                  onClick={() => handleLinkClick("collections")}
                  className="hover:text-gold text-zinc-400 transition-colors block text-left font-sans text-xs tracking-wide"
                >
                  Men's Fashion Wear
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("collections")}
                  className="hover:text-gold text-zinc-400 transition-colors block text-left font-sans text-xs tracking-wide"
                >
                  Women's Wardrobe
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("collections")}
                  className="hover:text-gold text-zinc-400 transition-colors block text-left font-sans text-xs tracking-wide"
                >
                  Kids Cotton Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("collections")}
                  className="hover:text-gold text-zinc-400 transition-colors block text-left font-sans text-xs tracking-wide"
                >
                  Ethnic Signature sets
                </button>
              </li>
              <li>
                <span className="text-zinc-600 block text-left font-sans text-xs tracking-wide">
                  Handcrafted Accessories
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription (Col span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-sans font-semibold text-[10px] tracking-[0.25em] text-white uppercase block pb-2 border-b border-white/5">
              Newsletter
            </h4>
            <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Subscribe to unlock priority access to premium collections, seasonal pre-orders, and elite discount event lists.
            </p>

            {subscribed ? (
              <div className="p-4 bg-zinc-900/30 border border-white/10 space-y-1.5 text-left animate-fadeIn rounded-none">
                <div className="flex items-center space-x-2 text-gold">
                  <Heart className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span className="font-sans font-semibold text-[9px] uppercase tracking-[0.25em]">Subscriber Enrolled!</span>
                </div>
                <p className="font-sans text-xs text-zinc-400 font-light">
                  Welcome to the exclusive MARA Club. You will receive private lookbook updates shortly.
                </p>
                <button
                  onClick={() => {
                    localStorage.removeItem("mara-news-subscribed");
                    setSubscribed(false);
                  }}
                  className="text-[9px] font-sans uppercase tracking-[0.2em] text-zinc-550 hover:text-gold mt-1.5 cursor-pointer block"
                >
                  Opt-out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex items-center border border-white/10 bg-zinc-900/30 p-1 rounded-none">
                  <Mail className="w-3.5 h-3.5 text-zinc-600 ml-3 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMsg("");
                    }}
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-3 bg-white text-zinc-950 hover:bg-gold hover:text-white transition-colors cursor-pointer rounded-none"
                    aria-label="Submit newsletter details"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {errorMsg && <p className="text-[10px] text-red-500 text-left font-sans mt-1">{errorMsg}</p>}
                <div className="flex items-center space-x-1.5 text-[8px] font-sans tracking-[0.15em] text-zinc-550 justify-start uppercase">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>Curated styling digests only, no spam.</span>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright / policy row */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-550">
          
          {/* copyright text */}
          <div className="flex items-center space-x-1 uppercase tracking-[0.2em] text-[9px]">
            <span>&copy; 2026 MARA CLOTHMART. ALL RIGHTS RESERVED.</span>
          </div>

          {/* policy anchors */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 uppercase tracking-[0.2em] text-[9px] justify-center">
            <span>Secure Payments</span>
            <span>Global shipping trace</span>
            <span>Privacy Safeguards</span>
            <span>Terms of fashion</span>
          </div>

        </div>

      </div>

    </footer>
  );
}
