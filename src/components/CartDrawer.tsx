import React, { useState } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CreditCard, Landmark, CheckCircle, ShieldCheck } from "lucide-react";
import { Product } from "../types";

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, change: number) => void;
  onClearCart: () => void;
  onNewOrder?: (order: { id: string; items: CartItem[]; total: number; date: string; address: string; paymentMethod: string }) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onNewOrder
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderReference, setOrderReference] = useState("");

  if (!isOpen) return null;

  // Invoice calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 150;
  const shippingFee = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 9.99);
  const taxRate = 0.08; // 8% sales tax
  const taxFee = subtotal * taxRate;
  const grandTotal = subtotal + shippingFee + taxFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors as user typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ""
      });
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid Email is required";
    if (!formData.address.trim()) errors.address = "Delivery Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.zip.trim()) errors.zip = "Postal Code is required";
    
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, "").length < 16) {
        errors.cardNumber = "Enter valid 16-digit Card Number";
      }
      if (!formData.cardExpiry.trim()) errors.cardExpiry = "Expiry Date is required";
      if (!formData.cardCvc.trim() || formData.cardCvc.length < 3) errors.cardCvc = "CVC is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Generate random order reference
    const rand = Math.floor(1000 + Math.random() * 9000);
    const orderRefID = `MARA-2026-${rand}`;
    setOrderReference(orderRefID);
    setCheckoutStep("success");

    if (onNewOrder) {
      onNewOrder({
        id: orderRefID,
        items: [...cartItems],
        total: grandTotal,
        date: new Date().toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric", 
          year: "numeric", 
          hour: "2-digit", 
          minute: "2-digit" 
        }),
        address: `${formData.address}, ${formData.city} ${formData.zip}`,
        paymentMethod: formData.paymentMethod === "card" ? "Credit Card" : "Cash on Delivery"
      });
    }
  };

  const handleFinishOrder = () => {
    onClearCart();
    setCheckoutStep("cart");
    // Clear forms
    setFormData({
      name: "",
      email: "",
      address: "",
      city: "",
      zip: "",
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: ""
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Dark Background Overlay */}
        <div 
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
          aria-hidden="true"
        ></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-300">
            
            <div className="flex h-full flex-col bg-white dark:bg-zinc-900 border-l border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-y-auto">
              
              {/* Drawer Header */}
              <div className="px-6 py-6 border-b border-zinc-900/10 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-[0.2em]">
                    {checkoutStep === "cart" && "Shopping Bag"}
                    {checkoutStep === "form" && "Secure Checkout"}
                    {checkoutStep === "success" && "Order Success"}
                  </h2>
                </div>
                
                <button
                  onClick={onClose}
                  className="rounded-none p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body depending on stage */}
              <div className="flex-1 px-6 py-6 overflow-y-auto text-left">
                
                {/* STEP 1: SHOPPING BAG ITEMS LIST */}
                {checkoutStep === "cart" && (
                  <>
                    {cartItems.length === 0 ? (
                      <div className="h-96 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 rounded-none bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-900/10 dark:border-white/10">
                          <ShoppingBag className="w-5 h-5 text-zinc-400" />
                        </div>
                        <p className="font-sans text-xs text-zinc-400 font-light">
                          Your shopping bag is completely empty.
                        </p>
                        <button
                          onClick={onClose}
                          className="bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 text-white font-sans text-[9px] tracking-[0.3em] uppercase font-bold py-3 px-6 hover:bg-gold dark:hover:bg-gold dark:hover:text-white transition-colors cursor-pointer rounded-none"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        
                        {/* Free Shipping Progress Alert */}
                        <div className="bg-[#F9F9F9] dark:bg-zinc-900/30 p-4 border border-zinc-900/10 dark:border-white/10 text-[10px] font-sans rounded-none">
                          {isFreeShipping ? (
                            <span className="text-gold font-medium uppercase tracking-wider block">
                              🎉 Your order qualifies for <strong>Free Shipping</strong>.
                            </span>
                          ) : (
                            <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                              Add <strong className="text-gold">${(150 - subtotal).toFixed(2)}</strong> more for <strong>Free Express Shipping</strong>.
                            </span>
                          )}
                          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-[2px] mt-3 rounded-none overflow-hidden">
                            <div 
                              className="bg-gold h-full transition-all duration-300" 
                              style={{ width: `${Math.min((subtotal / 150) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Items Stack */}
                        <div className="divide-y divide-zinc-900/10 dark:divide-white/10">
                          {cartItems.map((item, index) => (
                            <div key={index} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                              
                              {/* Thumb */}
                              <div className="w-20 h-24 bg-zinc-50 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-900/10 dark:border-white/10 p-1 rounded-none">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-cover rounded-none"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              {/* Details */}
                              <div className="flex-1 flex flex-col justify-between">
                                <div className="space-y-1">
                                  <h4 className="font-serif text-xs font-semibold text-zinc-900 dark:text-white line-clamp-1">
                                    {item.product.name}
                                  </h4>
                                  
                                  <div className="flex flex-wrap gap-2 text-[8px] font-sans tracking-widest text-zinc-400 uppercase">
                                    <span className="bg-[#F5F5F5] dark:bg-zinc-800 px-1.5 py-0.5 rounded-none">SZ: {item.size}</span>
                                    {item.color && (
                                      <span className="flex items-center gap-1 bg-[#F5F5F5] dark:bg-zinc-800 px-1.5 py-0.5 rounded-none">
                                        COL:{" "}
                                        <span 
                                          className="w-2 h-2 rounded-none border border-white" 
                                          style={{ backgroundColor: item.color }}
                                        />
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                  {/* Quantity selector */}
                                  <div className="flex items-center border border-zinc-900/10 dark:border-white/10 rounded-none">
                                    <button
                                      onClick={() => onUpdateQuantity(index, -1)}
                                      className="p-1 px-2 text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-1.5 font-sans text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(index, 1)}
                                      className="p-1 px-2 text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>

                                  {/* Price */}
                                  <div className="text-right">
                                    <span className="font-serif text-xs font-semibold text-zinc-900 dark:text-gold block">
                                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                    <button
                                      onClick={() => onRemoveItem(index)}
                                      className="text-zinc-300 hover:text-red-500 transition-colors mt-1 p-0.5 cursor-pointer block ml-auto"
                                      title="Remove item"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>

                                </div>

                              </div>

                            </div>
                          ))}
                        </div>

                      </div>
                    )}
                  </>
                )}

                {/* STEP 2: SHIPPING & BILLING ADDRESS SECURE FORM */}
                {checkoutStep === "form" && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                    
                    <div>
                      <h3 className="font-sans text-[10px] font-semibold text-gold uppercase tracking-[0.2em] block mb-3 border-b border-zinc-900/10 dark:border-white/10 pb-1">
                        1. Delivery Destination
                      </h3>
                      <div className="space-y-3">
                        {/* Name */}
                        <div>
                          <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-450 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full px-3 py-2 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                          />
                          {formErrors.name && <p className="text-[10px] text-red-500 mt-0.5 font-sans">{formErrors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-450 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="w-full px-3 py-2 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                          />
                          {formErrors.email && <p className="text-[10px] text-red-500 mt-0.5 font-sans">{formErrors.email}</p>}
                        </div>

                        {/* Street Address */}
                        <div>
                          <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-450 mb-1">Delivery Address</label>
                          <input 
                            type="text" 
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Apt 4B, 123 Fashion Blvd"
                            className="w-full px-3 py-2 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                          />
                          {formErrors.address && <p className="text-[10px] text-red-500 mt-0.5 font-sans">{formErrors.address}</p>}
                        </div>

                        {/* Row: City & Zip */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-455 mb-1">City</label>
                            <input 
                              type="text" 
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="New York"
                              className="w-full px-3 py-2 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                            />
                            {formErrors.city && <p className="text-[10px] text-red-500 mt-0.5 font-sans">{formErrors.city}</p>}
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-455 mb-1">Zip Code</label>
                            <input 
                              type="text" 
                              name="zip"
                              value={formData.zip}
                              onChange={handleInputChange}
                              placeholder="10001"
                              className="w-full px-3 py-2 text-xs border border-zinc-900/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                            />
                            {formErrors.zip && <p className="text-[10px] text-red-500 mt-0.5 font-sans">{formErrors.zip}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-sans text-[10px] font-semibold text-gold uppercase tracking-[0.2em] block mb-3 border-b border-zinc-900/10 dark:border-white/10 pb-1">
                        2. Secure Payment Gateway
                      </h3>
                      
                      {/* Selection tabs for payment */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                          className={`flex items-center justify-center space-x-2 py-3 border text-[10px] uppercase tracking-wider cursor-pointer rounded-none transition-colors ${
                            formData.paymentMethod === "card"
                              ? "border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold"
                              : "border-zinc-900/10 dark:border-white/10 text-zinc-400 bg-transparent"
                          }`}
                        >
                          <CreditCard className="w-3 h-3" />
                          <span>Credit Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: "cod" })}
                          className={`flex items-center justify-center space-x-2 py-3 border text-[10px] uppercase tracking-wider cursor-pointer rounded-none transition-colors ${
                            formData.paymentMethod === "cod"
                              ? "border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold"
                              : "border-zinc-900/10 dark:border-white/10 text-zinc-400 bg-transparent"
                          }`}
                        >
                          <Landmark className="w-3 h-3" />
                          <span>On Delivery</span>
                        </button>
                      </div>

                      {formData.paymentMethod === "card" ? (
                        <div className="space-y-3 bg-[#F9F9F9] dark:bg-zinc-900/30 p-3.5 border border-zinc-900/10 dark:border-white/10 rounded-none animate-fadeIn">
                          {/* Card Number */}
                          <div>
                            <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-400 mb-1">Card Number</label>
                            <input 
                              type="text" 
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="4111 2222 3333 4444"
                              maxLength={19}
                              className="w-full px-3 py-1.5 text-xs border border-zinc-900/10 dark:border-white/10 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                            />
                            {formErrors.cardNumber && <p className="text-[10px] text-red-500 mt-0.5 font-sans">{formErrors.cardNumber}</p>}
                          </div>
                          {/* Row expiry / Cvc */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-400 mb-1">Expiry Date</label>
                              <input 
                                type="text" 
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                maxLength={5}
                                className="w-full px-3 py-1.5 text-xs border border-zinc-900/10 dark:border-white/10 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                              />
                              {formErrors.cardExpiry && <p className="text-[10px] text-red-500 mt-0.5 font-sans">{formErrors.cardExpiry}</p>}
                            </div>
                            <div>
                              <label className="block text-[8px] uppercase font-sans tracking-[0.25em] text-zinc-400 mb-1">CVC Code</label>
                              <input 
                                type="password" 
                                name="cardCvc"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                placeholder="123"
                                maxLength={4}
                                className="w-full px-3 py-1.5 text-xs border border-zinc-900/10 dark:border-white/10 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-gold rounded-none"
                              />
                              {formErrors.cardCvc && <p className="text-[10px] text-red-500 mt-0.5 font-sans">{formErrors.cardCvc}</p>}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/20 text-[10px] font-sans text-gold uppercase tracking-wider text-center border border-zinc-900/10 dark:border-white/10 rounded-none animate-fadeIn">
                          📦 Cash or Card payment accepted at your doorstep.
                        </div>
                      )}

                    </div>

                    <div className="flex gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep("cart")}
                        className="flex-1 py-3 border border-zinc-900/15 dark:border-white/10 font-sans text-[9px] tracking-[0.25em] uppercase text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer rounded-none"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-sans text-[9px] tracking-[0.25em] uppercase font-bold hover:bg-gold dark:hover:bg-gold dark:hover:text-white transition-colors cursor-pointer rounded-none"
                      >
                        Place Order
                      </button>
                    </div>

                  </form>
                )}

                {/* STEP 3: SUCCESS CONFIRMATION INVOICE SLIDE */}
                {checkoutStep === "success" && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-8 pb-4">
                    <CheckCircle className="w-12 h-12 text-gold animate-pulse" />
                    
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
                        Order Dispatched Successfully
                      </h3>
                      <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 font-light max-w-xs mx-auto leading-relaxed">
                        Your exquisite fashion order was successfully routed. We will dispatch your signature shipment pack shortly.
                      </p>
                    </div>

                    <div className="bg-[#F9F9F9] dark:bg-zinc-900/30 p-4 border border-zinc-900/10 dark:border-white/10 block w-full space-y-2.5 text-left text-xs font-sans rounded-none">
                      <div className="flex justify-between border-b border-zinc-900/10 dark:border-white/10 pb-1.5">
                        <span className="font-sans text-zinc-400 uppercase tracking-widest text-[8px]">Receipt ID:</span>
                        <span className="font-mono font-bold text-zinc-850 dark:text-white">{orderReference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Shipped To:</span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Mode:</span>
                        <span className="font-medium uppercase text-zinc-800 dark:text-zinc-200">
                          {formData.paymentMethod === "card" ? "Credit Card Auth" : "Cash on Delivery"}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-zinc-900/10 dark:border-white/10 pt-1.5 font-bold">
                        <span className="text-zinc-900 dark:text-white font-serif">Charge Code Total:</span>
                        <span className="text-gold font-serif">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center space-x-2 text-[9px] text-zinc-450 uppercase tracking-[0.2em]">
                      <ShieldCheck className="w-4 h-4 text-gold" />
                      <span>End-To-End Encrypted SSL Secure</span>
                    </div>

                    <button
                      onClick={handleFinishOrder}
                      className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-sans text-[9px] tracking-[0.25em] uppercase font-bold py-3.5 transition-colors hover:bg-gold dark:hover:bg-gold dark:hover:text-white cursor-pointer rounded-none"
                    >
                      Return to Store
                    </button>
                  </div>
                )}

              </div>

              {/* Drawer Footer (Only shown in cart list stage) */}
              {checkoutStep === "cart" && cartItems.length > 0 && (
                <div className="px-6 py-6 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-900/10 dark:border-white/10 space-y-4 rounded-none">
                  
                  {/* Bill Summary */}
                  <div className="space-y-2 text-xs font-sans text-zinc-500 text-left">
                    <div className="flex justify-between text-zinc-650 dark:text-zinc-400 font-light">
                      <span>Subtotal</span>
                      <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-650 dark:text-zinc-400 font-light">
                      <span>Stylist Delivery Fee</span>
                      <span className="font-mono font-medium">
                        {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-650 dark:text-zinc-400 font-light">
                      <span>Standard Tax (8%)</span>
                      <span className="font-mono font-medium">${taxFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-900 dark:text-white font-semibold border-t border-zinc-900/10 dark:border-white/10 pt-2.5 font-serif text-sm">
                      <span>Total Invoice</span>
                      <span className="font-mono text-gold">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout buttons assembly */}
                  <div className="space-y-2.5">
                    <button
                      onClick={() => setCheckoutStep("form")}
                      className="w-full flex items-center justify-center space-x-2.5 bg-zinc-950 hover:bg-gold dark:bg-white dark:hover:bg-gold text-white dark:text-zinc-950 dark:hover:text-white py-4 font-sans text-[10px] tracking-[0.25em] uppercase font-bold transition-all duration-300 cursor-pointer rounded-none"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={onClearCart}
                      className="w-full text-center font-sans text-[9px] tracking-[0.2em] uppercase text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      Clear All Items
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
