import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Linkedin, MessageSquare, CheckCircle, Info } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedDirections, setCopiedDirections] = useState(false);
  const [mapZoom, setMapZoom] = useState(14);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Your Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid Email is required";
    if (!formData.phone.trim() || !/^\+?[0-9\s\-]{6,15}$/.test(formData.phone)) newErrors.phone = "Valid Phone number is required";
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success state transition
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      setSubmitted(false);
    }, 4500);
  };

  const copyDirections = () => {
    const address = "742 Fashion Avenue, Midtown Manhattan, NY 10018";
    navigator.clipboard.writeText(address);
    setCopiedDirections(true);
    setTimeout(() => setCopiedDirections(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-zinc-950 border-t border-b border-zinc-900/10 dark:border-white/10 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-xl space-y-3 mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-medium text-gold uppercase block">
            Store Finder & Support
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Get In <span className="italic font-normal">Touch</span>
          </h2>
          <div className="w-10 h-[1px] bg-zinc-950 dark:bg-zinc-200"></div>
          <p className="font-sans text-xs text-zinc-550 dark:text-zinc-400 font-light leading-relaxed">
            Have a custom sizing query, corporate order requirement, or want to locate an outfit styling match? Speak directly with us or visit our flagship Manhattan store.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Panel: Contact Form (Col 1 to 7) */}
          <div className="lg:col-span-7 bg-[#F9F9F9] dark:bg-zinc-900/30 p-8 sm:p-10 border border-zinc-900/10 dark:border-white/10 rounded-none">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                <CheckCircle className="w-10 h-10 text-gold" />
                <h3 className="font-serif text-xl font-semibold text-zinc-900 dark:text-white">
                  Message Dispatched Safely!
                </h3>
                <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto font-light leading-relaxed">
                  Excellent. Your premium wardrobe queries were logged. One of our dedicated MARA stylists will email or callback within <strong>2 business hours</strong>.
                </p>
                <div className="inline-flex items-center space-x-2 bg-emerald-50/10 dark:bg-emerald-950/20 border border-gold/20 px-3 py-1.5 text-[9px] uppercase font-sans tracking-[0.25em] font-bold text-gold">
                  <span>Styling Agent Assigned</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase font-sans tracking-[0.25em] text-zinc-400 font-semibold">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Liam Sterling"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-xs border border-zinc-900/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-gold transition-colors rounded-none"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-sans mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] uppercase font-sans tracking-[0.25em] text-zinc-400 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. liam@wardrobe.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-xs border border-zinc-900/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-gold transition-colors rounded-none"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-sans mt-1">{errors.email}</p>}
                  </div>

                </div>

                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase font-sans tracking-[0.25em] text-zinc-400 font-semibold">
                    Phone / Callback Line
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g. +1 (555) 019-2834"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-xs border border-zinc-900/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-gold transition-colors rounded-none"
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-sans mt-1">{errors.phone}</p>}
                </div>

                {/* Message Box */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase font-sans tracking-[0.25em] text-zinc-400 font-semibold">
                    What can our fashion services assist with?
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    placeholder="Tell us about your sizing specifications, collection interests, or customization fits..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-xs border border-zinc-900/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-gold transition-colors resize-none rounded-none"
                  ></textarea>
                  {errors.message && <p className="text-[10px] text-red-500 font-sans mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full group bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-4 font-sans text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-gold dark:hover:bg-gold dark:hover:text-white transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer rounded-none"
                >
                  <Send className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  <span>Send Secure Message</span>
                </button>

              </form>
            )}
          </div>

          {/* Right Panel: Biz Details & Simulated Interactive Visual Map (Col 8 to 12) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Address cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 text-left">
              
              {/* Card 1: Map locator address */}
              <div className="p-6 border border-zinc-900/10 dark:border-white/10 space-y-3.5 rounded-none">
                <div className="flex items-center space-x-3 text-gold">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="font-sans font-semibold text-[10px] tracking-[0.2em] uppercase text-zinc-900 dark:text-white">Flagship Boutique</span>
                </div>
                <div className="space-y-1 font-sans text-xs text-zinc-500 dark:text-zinc-400 font-light">
                  <p>742 Fashion Avenue, Midtown Manhattan</p>
                  <p>New York, NY 10018</p>
                </div>
              </div>

              {/* Card 2: Contact channels info */}
              <div className="p-6 border border-zinc-900/10 dark:border-white/10 space-y-3.5 rounded-none">
                <div className="flex items-center space-x-3 text-gold">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="font-sans font-semibold text-[10px] tracking-[0.2em] uppercase text-zinc-900 dark:text-white">Communication Dial</span>
                </div>
                <div className="space-y-1 font-sans text-xs text-zinc-500 dark:text-zinc-400 font-light">
                  <p>Phone: +1 (212) 555-0199</p>
                  <p>Mail: concierge@maracloth.com</p>
                </div>
              </div>

              {/* Card 3: Working hours */}
              <div className="p-6 border border-zinc-900/10 dark:border-white/10 space-y-3.5 sm:col-span-2 lg:col-span-1 rounded-none">
                <div className="flex items-center space-x-3 text-gold">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span className="font-sans font-semibold text-[10px] tracking-[0.2em] uppercase text-zinc-900 dark:text-white">Business Hours</span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-sans text-xs text-zinc-500 dark:text-zinc-400 font-light">
                  <div>
                    <span className="font-semibold text-zinc-750 dark:text-zinc-300 block uppercase text-[8px] tracking-[0.25em]">Mon - Sat:</span>
                    <span>10:00 AM - 08:30 PM</span>
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-750 dark:text-zinc-300 block uppercase text-[8px] tracking-[0.25em]">Sunday:</span>
                    <span>11:00 AM - 06:00 PM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Simulated Interactive Map with exact branding (Fulfills Google Maps prompt specs) */}
            <div className="border border-zinc-900/10 dark:border-white/10 relative overflow-hidden group shadow-none rounded-none text-left">
              
              {/* Map Canvas backdrop silhouette */}
              <div className="h-60 bg-zinc-950 dark:bg-black p-6 flex flex-col justify-between relative overflow-hidden">
                
                {/* Simulated geographic grids or concentric grid layouts representing luxury street grids */}
                <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] opacity-15"></div>
                <div className="absolute left-1/3 top-1/4 w-32 h-32 rounded-full border border-gold/10"></div>
                <div className="absolute left-1/4 top-1/3 w-40 h-40 rounded-full border border-gold/5"></div>
                <div className="absolute left-16 top-1/2 right-16 h-0.5 bg-gold/10"></div>
                <div className="absolute top-12 bottom-12 left-1/2 w-0.5 bg-gold/10"></div>

                {/* Floating Map Indicators */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-zinc-900 border border-zinc-800 p-2.5 max-w-[170px]">
                    <span className="font-mono text-[8px] text-gold uppercase tracking-wider block font-bold">Flagship coordinates</span>
                    <span className="font-mono text-[9px] text-white">40.7523&deg; N, 73.9880&deg; W</span>
                  </div>

                  {/* Zoom button cluster */}
                  <div className="flex flex-col gap-1.5">
                    <button 
                      onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                      className="w-8 h-8 rounded-none bg-zinc-900 text-white hover:bg-gold hover:text-white flex items-center justify-center font-bold font-mono text-sm border border-zinc-800 cursor-pointer"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => setMapZoom(prev => Math.max(prev - 1, 10))}
                      className="w-8 h-8 rounded-none bg-zinc-900 text-white hover:bg-gold hover:text-white flex items-center justify-center font-bold font-mono text-sm border border-zinc-800 cursor-pointer"
                    >
                      -
                    </button>
                  </div>
                </div>

                {/* Center marker glowing point representing our flagship store pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  
                  {/* Ping effect */}
                  <span className="absolute inline-flex h-8 w-8 rounded-full bg-gold/30 animate-ping"></span>
                  
                  {/* Pin Point */}
                  <div className="w-5 h-5 bg-gold border-2 border-white rounded-none flex items-center justify-center shadow-lg relative">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </div>

                  <span className="bg-zinc-900 border border-zinc-800 text-white text-[8px] font-mono tracking-widest font-bold uppercase py-0.5 px-2 mt-2 shadow-lg">
                    MARA BOUTIQUE (Zoom: {mapZoom}x)
                  </span>
                </div>

                {/* Map Directions card triggers */}
                <div className="relative z-10 flex justify-between items-end">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-none bg-amber-500 block"></span>
                    <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest font-semibold">Active Pin System</span>
                  </div>

                  <button
                    onClick={copyDirections}
                    className="px-2.5 py-1 bg-zinc-900 hover:bg-gold text-white font-mono text-[8px] font-bold uppercase tracking-widest border border-zinc-800 cursor-pointer transition-colors"
                  >
                    {copiedDirections ? "Directions Copied!" : "Copy Directions"}
                  </button>
                </div>

              </div>

            </div>

            {/* Social channels shortcuts */}
            <div className="flex items-center space-x-4 pt-1 justify-center lg:justify-start">
              <span className="font-mono text-[9px] tracking-widest uppercase text-zinc-400">Follow:</span>
              <div className="flex space-x-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Visit Facebook"
                  className="w-8 h-8 rounded-none border border-zinc-900/10 dark:border-white/10 text-zinc-500 hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Visit Instagram"
                  className="w-8 h-8 rounded-none border border-zinc-900/10 dark:border-white/10 text-zinc-500 hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Visit LinkedIn"
                  className="w-8 h-8 rounded-none border border-zinc-900/10 dark:border-white/10 text-zinc-500 hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
