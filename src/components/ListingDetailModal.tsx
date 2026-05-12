import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Star, 
  MapPin, 
  MessageSquare, 
  CreditCard, 
  Share2, 
  ShieldCheck, 
  Clock,
  ArrowRight,
  TrendingUp,
  ShoppingBag
} from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';
import { getCategoryName, getSubcategoryName } from '../constants/categories';
import { ReviewSection } from './ReviewSection';
import { ReviewModal } from './ReviewModal';

interface ListingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: {
    id: string;
    sellerId: string;
    title: string;
    price: number;
    location: string;
    category: string;
    subcategory?: string;
    videoUrl?: string;
    image: string;
    type: 'product' | 'service';
    sellerName: string;
    averageRating?: number;
    reviewCount?: number;
    description?: string;
  };
  onChatClick: (id: string, sellerId: string) => void;
  onBuyClick: (id: string) => void;
  onSellerClick?: (sellerId: string) => void;
}

export function ListingDetailModal({ isOpen, onClose, listing, onChatClick, onBuyClick, onSellerClick }: ListingDetailModalProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Left Side: Images/Video */}
          <div className="md:w-1/2 h-64 md:h-full bg-slate-100 relative group">
             {listing.videoUrl ? (
               <div className="w-full h-full">
                  <iframe 
                    className="w-full h-full"
                    src={listing.videoUrl.includes('youtube.com') 
                      ? listing.videoUrl.replace('watch?v=', 'embed/') 
                      : listing.videoUrl}
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
               </div>
             ) : (
               <img 
                 src={listing.image} 
                 alt={listing.title} 
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
             )}
             <div className="absolute top-6 left-6 flex gap-2">
                <span className={cn(
                  "px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl backdrop-blur-md",
                  listing.type === 'product' ? "bg-white/90 text-blue-600" : "bg-teal-500/90 text-white"
                )}>
                  {listing.type === 'product' ? 'Produkt' : 'Usługa'}
                </span>
             </div>
             <button 
               onClick={onClose}
               className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
             >
               <X size={24} />
             </button>
          </div>

          {/* Right Side: Content */}
          <div className="md:w-1/2 flex flex-col h-full bg-white overflow-y-auto">
             <div className="p-8 md:p-12 space-y-8">
                {/* Header */}
                <div className="space-y-4">
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                        {getCategoryName(listing.category)}
                      </span>
                      {listing.subcategory && (
                        <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest">
                          {getSubcategoryName(listing.category, listing.subcategory)}
                        </span>
                      )}
                   </div>
                   <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                     {listing.title}
                   </h2>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className={cn("fill-amber-400 text-amber-400", (listing.averageRating || 0) === 0 && "text-slate-200 fill-slate-200")} />
                        <span className="text-lg font-black text-slate-900">{listing.averageRating?.toFixed(1) || '0.0'}</span>
                        <span className="text-sm font-bold text-slate-400">({listing.reviewCount || 0} opinii)</span>
                      </div>
                      <div className="h-4 w-px bg-slate-100" />
                      <div className="flex items-center gap-2 text-slate-500">
                         <MapPin size={16} />
                         <span className="text-sm font-bold italic">{listing.location}</span>
                      </div>
                   </div>
                </div>

                {/* Price and Auth Info */}
                <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cena Brutto</p>
                      <p className="text-4xl font-black text-slate-900 tracking-tighter">{formatPrice(listing.price)}</p>
                   </div>
                   <div className="text-right">
                      <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 shadow-sm mb-1">
                         <ShieldCheck size={14} />
                         <span className="text-[10px] font-black uppercase tracking-widest">Bezpieczna płatność</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 italic">od certyfikowanego sprzedawcy</p>
                   </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Informacje o produkcie</h3>
                   <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                     {listing.description || "Sprzedawca nie dodał jeszcze opisu tego produktu. Skorzystaj z czatu, aby dowiedzieć się więcej."}
                   </p>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm">
                   <div 
                     onClick={() => {
                        onClose();
                        onSellerClick?.(listing.sellerId);
                     }}
                     className="flex items-center gap-4 cursor-pointer group/seller"
                   >
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black group-hover/seller:bg-blue-600 group-hover/seller:text-white transition-all overflow-hidden">
                         <img 
                           src={`https://api.dicebear.com/7.x/initials/svg?seed=${listing.sellerName}`} 
                           alt={listing.sellerName}
                           className="h-full w-full object-cover"
                         />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Sprzedawca</p>
                         <p className="text-sm font-black text-slate-900 group-hover/seller:text-blue-600 transition-colors">{listing.sellerName}</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => onChatClick(listing.id, listing.sellerId)}
                     className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors flex items-center gap-2"
                   >
                     Napisz <MessageSquare size={14} />
                   </button>
                </div>

                {/* Reviews Section */}
                <div className="pt-8 border-t border-slate-100 space-y-8">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Oceny i Recenzje</h3>
                      <button 
                        onClick={() => setIsReviewModalOpen(true)}
                        className="text-xs font-black text-blue-600 flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
                      >
                         Dodaj Swoją Gwiazdkę <ArrowRight size={14} />
                      </button>
                   </div>
                   
                   <ReviewSection 
                     targetId={listing.id} 
                     targetType="listing" 
                     averageRating={listing.averageRating}
                     reviewCount={listing.reviewCount}
                   />
                </div>

                {/* Action Footer */}
                <div className="sticky bottom-0 bg-white/80 backdrop-blur-md pt-6 pb-2 grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => onBuyClick(listing.id)}
                     className="py-5 bg-blue-600 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                   >
                      <ShoppingBag size={18} /> Kup Teraz
                   </button>
                   <button 
                     onClick={() => setIsReviewModalOpen(true)}
                     className="py-5 bg-slate-900 text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95"
                   >
                      <Star size={18} /> Oceń Towar
                   </button>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        targetId={listing.id}
        targetType="listing"
        targetTitle={listing.title}
        onSuccess={() => window.location.reload()}
      />
    </AnimatePresence>
  );
}
