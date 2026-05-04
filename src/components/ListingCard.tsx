import { MapPin, Star, ArrowRight, Bot, Sparkles, MessageSquare, Share2, CreditCard } from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { getCategoryName, getSubcategoryName } from '../constants/categories';
import { useState } from 'react';
import { ShareModal } from './ShareModal';
import { ReviewModal } from './ReviewModal';
import { useAuth } from '../hooks/useAuth';

interface ListingCardProps {
  id: string;
  sellerId: string;
  key?: string | number;
  title: string;
  price: number;
  location: string;
  category: string;
  subcategory?: string;
  image: string;
  type: 'product' | 'service';
  sellerName: string;
  rating: number;
  onSellerClick?: (sellerId: string) => void;
  onChatClick?: (id: string, sellerId: string) => void;
  onBuyClick?: (id: string) => void;
  onAddToCart?: () => void;
  reviewCount?: number;
}

export function ListingCard({
  id,
  sellerId,
  title,
  price,
  location,
  category,
  subcategory,
  image,
  type,
  sellerName,
  rating,
  onSellerClick,
  onChatClick,
  onBuyClick,
  onAddToCart,
  reviewCount = 0,
}: ListingCardProps) {
  const { user } = useAuth();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/listing/${id}` 
    : `https://omnimarket-ai.app/listing/${id}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <motion.img
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2">
          <span className={cn(
            "rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm",
            type === 'product' ? "bg-white/90 text-blue-600" : "bg-teal-500/90 text-white"
          )}>
            {type === 'product' ? 'Produkt' : 'Usługa'}
          </span>
        </div>
        <div className="absolute top-2 left-2">
            <div className="bg-blue-600 text-white p-1 rounded-lg shadow-lg flex items-center gap-1 px-2">
               <Bot size={12} />
               <span className="text-[8px] font-black uppercase tracking-tighter">AI Verified</span>
            </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-bold text-slate-800 truncate mb-1 cursor-pointer hover:text-blue-600 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-slate-500 mb-3 line-clamp-1">
          {getCategoryName(category)}
          {subcategory ? ` / ${getSubcategoryName(category, subcategory)}` : ''} 
          • {location}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div 
            onClick={() => onSellerClick?.(sellerId)}
            className="cursor-pointer group/seller flex flex-col min-w-0 flex-1 mr-2"
          >
            <div className="flex items-baseline gap-2 overflow-hidden">
              <p className="text-lg font-bold text-slate-900 group-hover/seller:text-blue-600 transition-colors whitespace-nowrap">
                {formatPrice(price)}
              </p>
              <AnimatePresence>
                {isHovered && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-tighter truncate"
                  >
                    • {title}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter group-hover/seller:text-blue-600 transition-colors">od {sellerName}</p>
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-0.5 mt-0.5"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={8} 
                        className={cn(
                          i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"
                        )} 
                      />
                    ))}
                    <span className="text-[8px] font-bold text-slate-400 ml-1">{rating.toFixed(1)}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              title="Oceń produkt"
              className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-colors"
            >
              <Star size={18} />
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              title="Udostępnij ofertę"
              className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={() => onChatClick?.(id, sellerId)}
              title="Rozpocznij czat"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <MessageSquare size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Czat</span>
            </button>
            <button 
              onClick={() => onBuyClick?.(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 group/buy"
            >
              <CreditCard size={18} className="group-hover/buy:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Kup Teraz</span>
            </button>
            <button className={cn(
              "p-2 rounded-lg transition-colors",
              type === 'product' 
                ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white" 
                : "bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white"
            )}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        title={title}
        url={shareUrl}
      />

      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        targetId={id}
        targetType="listing"
        targetTitle={title}
        onSuccess={() => window.location.reload()}
      />
    </motion.div>
  );
}
