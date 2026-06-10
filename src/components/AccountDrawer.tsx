import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { X, Heart, User, Clock, Trash2, ArrowRight, ShoppingBag, Eye, LogOut, Check, Save } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { CartItem } from "./CartDrawer";

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  joinedDate: string;
  tier: "Silver Client" | "Gold VIP" | "Platinum Ambassador";
}

export interface OrderRecord {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  address: string;
  paymentMethod: string;
}

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "profile" | "wishlist" | "orders";
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onInstantAdd: (product: Product, size: string, color: string) => void;
  onOpenQuickView: (product: Product) => void;
  // Auth state
  userProfile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile | null) => void;
  orders: OrderRecord[];
}

export default function AccountDrawer({
  isOpen,
  onClose,
  initialTab = "profile",
  wishlistIds,
  onToggleWishlist,
  onInstantAdd,
  onOpenQuickView,
  userProfile,
  onUpdateProfile,
  orders
}: AccountDrawerProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "wishlist" | "orders">(initialTab);
  
  // Registration form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regError, setRegError] = useState("");

  // Editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      // Reset forms if needed
      setRegError("");
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (userProfile) {
      setEditName(userProfile.name);
      setEditPhone(userProfile.phone || "");
    }
  }, [userProfile]);

  if (!isOpen) return null;

  // Resolve products from IDs
  const wishlistProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  // Handle registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) {
      setRegError("Please enter your name");
      return;
    }
    if (!regEmail.trim() || !/\s*@\s*/.test(regEmail)) {
      setRegError("Please enter a valid email address");
      return;
    }

    const newProfile: UserProfile = {
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      tier: "Silver Client"
    };

    onUpdateProfile(newProfile);
    setRegName("");
    setRegEmail("");
    setRegPhone("");
    setRegError("");
    setActiveTab("profile");
  };

  // Handle update profile
  const handleSaveProfileEdit = () => {
    if (!userProfile) return;
    if (!editName.trim()) return;

    onUpdateProfile({
      ...userProfile,
      name: editName.trim(),
      phone: editPhone.trim()
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to sign out from your MARA account?")) {
      onUpdateProfile(null);
      setIsEditing(false);
      setActiveTab("profile");
    }
  };

  // Determine user level based on orders
  const getUserTier = (orderCount: number): "Silver Client" | "Gold VIP" | "Platinum Ambassador" => {
    if (orderCount >= 5) return "Platinum Ambassador";
    if (orderCount >= 2) return "Gold VIP";
    return "Silver Client";
  };

  const activeTier = userProfile ? getUserTier(orders.length) : "Silver Client";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="account-drawer-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Backdrop overlay */}
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
          aria-hidden="true"
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-300">
            
            <div className="flex h-full flex-col bg-white dark:bg-zinc-900 border-l border-zinc-900/10 dark:border-white/10 shadow-2xl overflow-y-auto">
              
              {/* Drawer Header */}
              <div className="px-6 py-6 border-b border-zinc-900/10 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gold" />
                  <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-[0.2em]">
                    {activeTab === "profile" && "Personal Account"}
                    {activeTab === "wishlist" && "Personal Wishlist"}
                    {activeTab === "orders" && "Order History"}
                  </h2>
                </div>
                
                <button
                  onClick={onClose}
                  className="rounded-none p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs (Only active if logged in) */}
              {userProfile && (
                <div className="grid grid-cols-3 border-b border-zinc-900/10 dark:border-white/10 text-center text-[10px] uppercase font-sans tracking-[0.15em]">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`py-3.5 border-r border-zinc-905/10 dark:border-white/5 cursor-pointer font-medium transition-colors ${
                      activeTab === "profile" 
                        ? "bg-zinc-50 dark:bg-zinc-800/40 text-gold font-semibold border-b-2 border-b-gold" 
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50/50"
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`py-3.5 border-r border-zinc-905/10 dark:border-white/5 cursor-pointer font-medium transition-colors relative ${
                      activeTab === "wishlist" 
                        ? "bg-zinc-50 dark:bg-zinc-800/40 text-gold font-semibold border-b-2 border-b-gold" 
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50/50"
                    }`}
                  >
                    Wishlist
                    {wishlistIds.length > 0 && (
                      <span className="ml-1.5 px-1 bg-gold text-white text-[8px] rounded-sm font-mono inline-block">
                        {wishlistIds.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`py-3.5 cursor-pointer font-medium transition-colors ${
                      activeTab === "orders" 
                        ? "bg-zinc-50 dark:bg-zinc-800/40 text-gold font-semibold border-b-2 border-b-gold" 
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50/50"
                    }`}
                  >
                    Orders
                    {orders.length > 0 && (
                      <span className="ml-1.5 px-1 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[8px] rounded-sm font-mono inline-block">
                        {orders.length}
                      </span>
                    )}
                  </button>
                </div>
              )}

              {/* Drawer Content */}
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  
                  {/* LOGGED OUT: REGISTRATION PANEL (FORCE IF NO PROFILE) */}
                  {!userProfile ? (
                    <div className="space-y-6 pt-4 text-left animate-fadeIn">
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                          Join the MARA Club
                        </h3>
                        <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                          Register your prestigious personal profile to unlock your personalized **Style Wishlist**, track your bespoke tailored **Invoices & Orders**, and earn exclusive **Gold VIP access**.
                        </p>
                      </div>

                      <form onSubmit={handleRegister} className="space-y-4 pt-2">
                        <div>
                          <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-450 mb-1.5">Your Full Name</label>
                          <input 
                            type="text" 
                            required
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            placeholder="Lady / Lord Harrington"
                            className="w-full px-3 py-2 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-450 mb-1.5">Email Address</label>
                          <input 
                            type="email" 
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="name@exclusive.com"
                            className="w-full px-3 py-2 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-450 mb-1.5">Phone Number (Optional)</label>
                          <input 
                            type="tel" 
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            placeholder="+1 (555) 0192"
                            className="w-full px-3 py-2 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                          />
                        </div>

                        {regError && (
                          <p className="text-[10px] text-red-500 font-sans tracking-wide">
                            {regError}
                          </p>
                        )}

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-sans text-[9px] tracking-[0.25em] uppercase font-bold hover:bg-gold dark:hover:bg-gold dark:hover:text-white transition-colors cursor-pointer rounded-none mt-2"
                        >
                          Initialize Profile Card
                        </button>
                      </form>

                      {/* Guest Wishlist Information Alert */}
                      {wishlistIds.length > 0 && (
                        <div className="bg-[#FAF9F6] dark:bg-zinc-900/40 border border-gold/15 p-4 rounded-none !mt-8 text-[11px] text-left text-zinc-600 dark:text-zinc-300">
                          🌟 You currently have <strong className="text-gold">{wishlistIds.length} fashion look</strong> in your guest store session. They will be linked to your new personal profile instantly.
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* 1. TAILORED PROFILE TAB */}
                      {activeTab === "profile" && (
                        <div className="space-y-6 text-left animate-fadeIn">
                          {/* Avatar block */}
                          <div className="flex items-center space-x-4 pb-6 border-b border-zinc-900/5 dark:border-white/5">
                            <div className="w-16 h-16 bg-gradient-to-tr from-gold to-zinc-950 dark:to-white flex items-center justify-center text-white dark:text-zinc-950 font-serif font-bold text-2xl border border-zinc-900/10 select-none">
                              {userProfile.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-white">
                                  {userProfile.name}
                                </h3>
                                <span className="bg-gold/10 text-gold border border-gold/20 text-[7px] font-sans tracking-widest uppercase px-1.5 py-0.5 font-medium">
                                  {activeTier}
                                </span>
                              </div>
                              <p className="text-[10px] font-sans text-zinc-400 font-light mt-0.5">
                                Joined Style Council: {userProfile.joinedDate}
                              </p>
                              <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                                {userProfile.email}
                              </p>
                            </div>
                          </div>

                          {/* Editable details */}
                          {!isEditing ? (
                            <div className="space-y-4">
                              <h4 className="font-serif text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                Custom Styling Privileges
                              </h4>

                              <div className="space-y-2.5">
                                <div className="flex justify-between items-center text-xs py-1.5 border-b border-zinc-900/5 dark:border-white/5">
                                  <span className="text-zinc-450 font-light">Lobby Status</span>
                                  <span className="text-zinc-800 dark:text-zinc-200 uppercase font-medium text-[10px] tracking-wide">Prestige VIP</span>
                                </div>
                                <div className="flex justify-between items-center text-xs py-1.5 border-b border-zinc-900/5 dark:border-white/5">
                                  <span className="text-zinc-450 font-light">Custom Delivery</span>
                                  <span className="text-zinc-800 dark:text-zinc-200">Express Priority</span>
                                </div>
                                <div className="flex justify-between items-center text-xs py-1.5 border-b border-zinc-900/5 dark:border-white/5">
                                  <span className="text-zinc-450 font-light">Wishlist Count</span>
                                  <span className="font-mono text-gold font-bold">{wishlistIds.length} pieces</span>
                                </div>
                                <div className="flex justify-between items-center text-xs py-1.5">
                                  <span className="text-zinc-450 font-light">Total Invoices</span>
                                  <span className="font-mono text-zinc-800 dark:text-zinc-200">{orders.length} orders</span>
                                </div>
                              </div>

                              <div className="pt-4 flex gap-3">
                                <button
                                  onClick={() => {
                                    setEditName(userProfile.name);
                                    setEditPhone(userProfile.phone || "");
                                    setIsEditing(true);
                                  }}
                                  className="flex-1 py-2.5 border border-zinc-900/10 dark:border-white/10 hover:border-gold dark:hover:border-gold hover:text-gold dark:hover:text-gold text-zinc-650 dark:text-zinc-350 text-[10px] font-sans tracking-widest uppercase font-semibold transition-colors cursor-pointer rounded-none"
                                >
                                  Modify Profile
                                </button>
                                <button
                                  onClick={handleLogout}
                                  className="py-2.5 px-4 border border-rose-900/15 text-rose-500 hover:bg-rose-550/5 text-[10px] uppercase tracking-wider font-semibold hover:border-rose-500 transition-colors cursor-pointer rounded-none"
                                  title="Sign out of system profile"
                                >
                                  <LogOut className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4 pt-1 animate-fadeIn">
                              <h4 className="font-serif text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                Edit Styling Card
                              </h4>

                              <div className="space-y-3.5">
                                <div>
                                  <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-400 mb-1">Full Identity Name</label>
                                  <input 
                                    type="text" 
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-3 py-1.5 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-400 mb-1">Contact Phone</label>
                                  <input 
                                    type="tel" 
                                    value={editPhone}
                                    onChange={(e) => setEditPhone(e.target.value)}
                                    placeholder="+1 (555) 0192"
                                    className="w-full px-3 py-1.5 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                                  />
                                </div>
                              </div>

                              <div className="pt-2 flex gap-3">
                                <button
                                  onClick={() => setIsEditing(false)}
                                  className="flex-1 py-2 border border-zinc-900/10 dark:border-white/10 text-zinc-500 text-[9px] uppercase tracking-wider transition-colors cursor-pointer rounded-none"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleSaveProfileEdit}
                                  className="flex-1 py-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[9px] uppercase tracking-wider font-semibold hover:bg-gold dark:hover:bg-gold dark:hover:text-white transition-colors cursor-pointer rounded-none"
                                >
                                  Save Specs
                                </button>
                              </div>
                            </div>
                          )}

                          {/* VIP Tier Progress Gauge */}
                          <div className="bg-[#FAF9F6] dark:bg-zinc-900/20 p-4 border border-zinc-900/5 dark:border-white/5 text-[10px] font-sans">
                            <span className="text-gold font-medium uppercase tracking-wider block">
                              👑 MARA Loyalty Council
                            </span>
                            <p className="text-zinc-500 dark:text-zinc-400 text-[10px] mt-1 font-light leading-relaxed">
                              You are currently on <strong className="text-gold uppercase tracking-wide">{activeTier}</strong> tier status. 
                              {orders.length < 2 ? (
                                <span> Place <strong className="text-gold">{(2 - orders.length)}</strong> more order to qualify for VIP status!</span>
                              ) : orders.length < 5 ? (
                                <span> Place <strong className="text-gold">{(5 - orders.length)}</strong> more order for Platinum!</span>
                              ) : (
                                <span> Enjoy maximum concierge shopping!</span>
                              )}
                            </p>
                            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-[2px] mt-3 rounded-none overflow-hidden">
                              <div 
                                className="bg-gold h-full transition-all duration-300" 
                                style={{ width: `${Math.min((orders.length / 5) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. DYNAMIC WISHLIST TAB */}
                      {activeTab === "wishlist" && (
                        <div className="space-y-6 text-left animate-fadeIn">
                          {wishlistProducts.length === 0 ? (
                            <div className="h-96 flex flex-col items-center justify-center space-y-4 text-center">
                              <div className="w-12 h-12 rounded-none bg-zinc-50 dark:bg-zinc-800/40 flex items-center justify-center border border-zinc-900/10 dark:border-white/10">
                                <Heart className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
                              </div>
                              <p className="font-sans text-xs text-zinc-400 font-light">
                                Your personal lookbook wishlist is empty.
                              </p>
                              <button
                                onClick={onClose}
                                className="bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 text-white font-sans text-[9px] tracking-[0.3em] uppercase font-bold py-3 px-6 hover:bg-gold dark:hover:bg-gold dark:hover:text-white transition-colors cursor-pointer rounded-none"
                              >
                                Explore Collections
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="flex justify-between items-center pb-2 border-b border-zinc-900/10 dark:border-white/10">
                                <span className="font-serif text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                  Your Saved Garments
                                </span>
                                <span className="text-[10px] font-mono text-zinc-500">
                                  {wishlistProducts.length} Items
                                </span>
                              </div>

                              <div className="divide-y divide-zinc-900/10 dark:divide-white/10 max-h-[460px] overflow-y-auto pr-1">
                                {wishlistProducts.map((product) => (
                                  <div key={product.id} className="py-4 flex gap-4 first:pt-0 last:pb-0 group">
                                    
                                    {/* Thumbnail */}
                                    <div className="w-16 h-20 bg-zinc-50 dark:bg-zinc-805 overflow-hidden flex-shrink-0 border border-zinc-900/10 dark:border-white/10 p-1 rounded-none relative">
                                      <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover rounded-none grayscale group-hover:grayscale-0 transition-all duration-300"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                      <div>
                                        <div className="flex justify-between items-start">
                                          <h4 
                                            onClick={() => {
                                              onClose();
                                              onOpenQuickView(product);
                                            }}
                                            className="font-serif text-xs font-semibold text-zinc-900 dark:text-white hover:text-gold transition-colors cursor-pointer line-clamp-1 pr-2"
                                          >
                                            {product.name}
                                          </h4>
                                          <button
                                            onClick={() => onToggleWishlist(product)}
                                            className="text-zinc-300 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                                            title="Remove from lookbook"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>
                                        <p className="font-sans text-[8px] uppercase tracking-widest text-gold mt-0.5">
                                          {product.category}
                                        </p>
                                        <span className="font-serif text-xs font-semibold text-zinc-900 dark:text-gold block mt-1">
                                          ${product.price.toFixed(2)}
                                        </span>
                                      </div>

                                      {/* Quick placement action */}
                                      <div className="flex gap-2 pt-2">
                                        <button
                                          onClick={() => {
                                            const defaultSize = product.sizes ? product.sizes[0] : "M";
                                            const defaultColor = product.colors ? product.colors[0] : "#111111";
                                            onInstantAdd(product, defaultSize, defaultColor);
                                          }}
                                          className="flex-1 py-1.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-gold dark:hover:bg-gold dark:hover:text-white font-sans text-[8px] tracking-[0.2em] uppercase font-bold transition-colors cursor-pointer rounded-none text-center"
                                        >
                                          Add to Bag
                                        </button>
                                        <button
                                          onClick={() => {
                                            onOpenQuickView(product);
                                          }}
                                          className="border border-zinc-900/10 dark:border-white/10 px-2 py-1.5 hover:border-gold hover:text-gold text-zinc-450 dark:hover:text-gold transition-colors text-[8px] font-sans uppercase tracking-[0.1em]"
                                          title="Quick View sizes and metrics"
                                        >
                                          Options
                                        </button>
                                      </div>
                                    </div>

                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 3. INVOICED ORDER HISTORY TAB */}
                      {activeTab === "orders" && (
                        <div className="space-y-6 text-left animate-fadeIn">
                          {orders.length === 0 ? (
                            <div className="h-96 flex flex-col items-center justify-center space-y-4 text-center">
                              <div className="w-12 h-12 rounded-none bg-zinc-50 dark:bg-zinc-800/40 flex items-center justify-center border border-zinc-900/10 dark:border-white/10">
                                <Clock className="w-5 h-5 text-zinc-300 dark:text-zinc-600" />
                              </div>
                              <p className="font-sans text-xs text-zinc-400 font-light">
                                No purchase transactions found.
                              </p>
                              <button
                                onClick={onClose}
                                className="bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 text-white font-sans text-[9px] tracking-[0.3em] uppercase font-bold py-3 px-6 hover:bg-gold dark:hover:bg-gold dark:hover:text-white transition-colors cursor-pointer rounded-none"
                              >
                                View Style Catalog
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4 pb-4">
                              <div className="flex justify-between items-center pb-2 border-b border-zinc-900/10 dark:border-white/10">
                                <span className="font-serif text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                  Your Styling Shipped Orders
                                </span>
                                <span className="text-[10px] font-mono text-zinc-500">
                                  {orders.length} Records
                                </span>
                              </div>

                              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                                {orders.map((order, idx) => (
                                  <div key={idx} className="p-4 bg-[#F9F9F9] dark:bg-zinc-900/30 border border-zinc-900/10 dark:border-white/10 rounded-none space-y-3">
                                    
                                    <div className="flex justify-between items-center border-b border-zinc-900/10 dark:border-white/5 pb-2">
                                      <div>
                                        <span className="font-mono text-[9px] font-bold text-zinc-850 dark:text-zinc-200 block">
                                          {order.id}
                                        </span>
                                        <span className="text-[8px] text-zinc-400 font-light font-mono block">
                                          {order.date}
                                        </span>
                                      </div>
                                      <span className="bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-sans tracking-widest uppercase px-2 py-0.5">
                                        Processed
                                      </span>
                                    </div>

                                    {/* Order items summary */}
                                    <div className="space-y-1.5">
                                      {order.items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="flex justify-between text-[10px] text-zinc-500 font-light">
                                          <span className="line-clamp-1 max-w-[200px]">
                                            {item.product.name} (SZ: {item.size})
                                          </span>
                                          <span className="font-mono">
                                            {item.quantity} × ${item.product.price.toFixed(2)}
                                          </span>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="pt-2 border-t border-zinc-902/5 dark:border-white/5 space-y-1 text-[9px] font-sans text-zinc-450">
                                      <div>
                                        <span className="font-medium text-zinc-600 dark:text-zinc-300">Destination:</span> {order.address}
                                      </div>
                                      <div>
                                        <span className="font-medium text-zinc-600 dark:text-zinc-300">Billing:</span> {order.paymentMethod}
                                      </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-2.5 border-t border-zinc-900/10 dark:border-white/10 font-bold">
                                      <span className="text-zinc-900 dark:text-white font-serif text-[10px] uppercase tracking-wider">Invoice Charge:</span>
                                      <span className="text-gold font-serif text-[11px]">${order.total.toFixed(2)}</span>
                                    </div>

                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    </>
                  )}

                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
