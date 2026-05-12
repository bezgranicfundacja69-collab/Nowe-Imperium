import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  ShoppingBag, 
  Star, 
  MapPin, 
  CreditCard,
  Lock,
  ChevronRight
} from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: {
    id: string;
    title: string;
    price: number;
    image: string;
    sellerName: string;
    location: string;
    averageRating?: number;
  } | null;
  onConfirm: () => void;
}

export function BuyNowModal({ isOpen, onClose, listing, onConfirm }: BuyNowModalProps) {
  if (!listing) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left side: Visual Summary */}
            <div className="md:w-5/12 bg-slate-50 relative p-8 flex flex-col items-center justify-center border-r border-slate-100">
               <div className="relative w-full aspect-square rounded-[32px] overflow-hidden shadow-xl mb-6">
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                     <p className="text-white text-xs font-black uppercase tracking-widest bg-blue-600/80 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                        {formatPrice(listing.price)}
                     </p>
                  </div>
               </div>
               
               <div className="w-full space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                           <ShieldCheck size={16} />
                        </div>
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Ochrona Kupującego</span>
                     </div>
                     <ChevronRight size={14} className="text-slate-300" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                           <Star size={16} />
                        </div>
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Pewny Sprzedawca</span>
                     </div>
                     <ChevronRight size={14} className="text-slate-300" />
                  </div>
               </div>
            </div>

            {/* Right side: Actions & Details */}
            <div className="md:w-7/12 p-10 flex flex-col justify-between">
               <div>
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                        <ShoppingBag size={14} /> Twoje Zamówienie
                     </div>
                     <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                        <X size={20} />
                     </button>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 italic tracking-tight mb-4 mb-2 leading-tight uppercase">
                    {listing.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-8">
                     <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin size={14} />
                        <span className="text-xs font-bold italic">{listing.location}</span>
                     </div>
                     <div className="h-3 w-px bg-slate-200" />
                     <div className="flex items-center gap-1.5 text-slate-900 font-black text-xs">
                        {listing.sellerName}
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-medium text-slate-500 italic">Cena produktu:</span>
                           <span className="text-sm font-black text-slate-900">{formatPrice(listing.price)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-xs font-medium text-slate-500 italic">Opłata serwisowa (ESCROW):</span>
                           <span className="text-sm font-black text-emerald-600">0.00 PLN</span>
                        </div>
                        <div className="h-px bg-slate-200 w-full mb-4" />
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-black text-slate-900 uppercase">Suma:</span>
                           <span className="text-2xl font-black text-blue-600 italic tracking-tighter">{formatPrice(listing.price)}</span>
                        </div>
                     </div>

                     <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <Lock size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-[10px] font-medium text-blue-700 leading-relaxed italic">
                           Twoje środki zostaną zablokowane na rachunku powierniczym (ESCROW) do momentu potwierdzenia otrzymania towaru. To najbezpieczniejszy sposób zakupu w sieci.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="mt-10 space-y-4">
                  <button 
                    onClick={onConfirm}
                    className="w-full py-5 bg-slate-950 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-95"
                  >
                     Przejdź do Płatności <ArrowRight size={18} />
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600"
                  >
                     Wróć do przeglądania
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
