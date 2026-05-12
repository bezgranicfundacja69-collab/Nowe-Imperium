import { MapPin, Star, ArrowRight, Bot, Sparkles, MessageSquare, Share2, CreditCard, Trash2 } from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { getCategoryName, getSubcategoryName } from '../constants/categories';
import { useState } from 'react';
import { ShareModal } from './ShareModal';
import { ReviewModal } from './ReviewModal';
import { ConfirmationModal } from './ConfirmationModal';
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
  onDeleteListing?: (id: string) => void;
  onAddToCart?: () => void;
  onClick?: () => void;
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
  onDeleteListing,
  onAddToCart,
  onClick,
  reviewCount = 0,
}: ListingCardProps) {
  const { user } = useAuth();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isOwner = user?.uid === sellerId;
  
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/listing/${id}` 
    : `https://noweimperium-ai.app/listing/${id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-prestige-200 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:border-prestige-300"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-prestige-100 cursor-pointer" onClick={onClick}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <span className={cn(
            "rounded-lg px-2.5 py-1 text-[9px] font-display font-black uppercase tracking-wider backdrop-blur-md shadow-sm border",
            type === 'product' 
              ? "bg-white/80 text-accent-indigo border-white/20" 
              : "bg-accent-indigo text-white border-white/10"
          )}>
            {type === 'product' ? 'Produkt' : 'Usługa'}
          </span>
          {isOwner && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteModalOpen(true);
              }}
              className="p-2 bg-rose-500/80 backdrop-blur-md text-white rounded-lg border border-white/20 hover:bg-rose-600 transition-colors shadow-lg"
              title="Usuń ofertę"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>

        <div className="absolute top-4 left-4">
            <div className="bg-prestige-950/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
               <Bot size={12} className="text-accent-indigo" />
               <span className="text-[8px] font-technical font-bold uppercase tracking-[0.1em]">AI Verified</span>
            </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              <Star size={14} className={cn("fill-accent-amber text-accent-amber", rating === 0 && "text-prestige-200 fill-prestige-200")} />
            </div>
            <span className="text-xs font-display font-bold text-prestige-900">{rating > 0 ? rating.toFixed(1) : 'New'}</span>
            {reviewCount > 0 && <span className="text-[10px] font-medium text-prestige-400">({reviewCount})</span>}
          </div>
          <div className="flex items-center gap-1 text-prestige-400">
             <MapPin size={10} />
             <span className="text-[9px] font-medium uppercase tracking-tight">{location}</span>
          </div>
        </div>
        
        <h4 onClick={onClick} className="font-display font-bold text-prestige-900 line-clamp-1 mb-1 cursor-pointer hover:text-accent-indigo transition-colors uppercase tracking-tight text-sm">
          {title}
        </h4>
        <p className="text-[9px] text-prestige-500 mb-5 font-technical font-medium uppercase tracking-[0.05em] h-4">
          {getCategoryName(category)}
          {subcategory ? ` • ${getSubcategoryName(category, subcategory)}` : ''}
        </p>

        <div className="mt-auto pt-4 border-t border-prestige-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-xl font-display font-black text-prestige-950 tracking-tighter leading-none">
                {formatPrice(price)}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-prestige-100 p-1 rounded-xl">
                 <button 
                   onClick={() => onChatClick?.(id, sellerId)}
                   className="p-2 text-prestige-500 hover:text-accent-indigo hover:bg-white rounded-lg transition-all"
                 >
                   <MessageSquare size={16} />
                 </button>
                 <button 
                   onClick={() => setIsShareModalOpen(true)}
                   className="p-2 text-prestige-500 hover:text-accent-emerald hover:bg-white rounded-lg transition-all"
                 >
                   <Share2 size={16} />
                 </button>
              </div>
              <button 
                onClick={() => onBuyClick?.(id)}
                className="px-4 py-2 bg-prestige-950 text-white rounded-xl font-display font-bold text-[10px] uppercase tracking-wider hover:bg-accent-indigo hover:shadow-lg hover:shadow-accent-indigo/20 active:scale-95 transition-all"
              >
                Kup Teraz
              </button>
            </div>
          </div>

          <div 
            onClick={() => onSellerClick?.(sellerId)}
            className="flex items-center gap-2 cursor-pointer group/seller"
          >
            <div className="h-6 w-6 rounded-full bg-prestige-100 overflow-hidden border border-prestige-200 group-hover/seller:border-accent-indigo transition-colors">
              <img 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${sellerName}`} 
                alt={sellerName}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-[10px] text-prestige-400 font-bold uppercase tracking-wider group-hover/seller:text-accent-indigo transition-colors">
              By <span className="text-prestige-900 group-hover/seller:text-accent-indigo">{sellerName}</span>
            </p>
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

      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => onDeleteListing?.(id)}
        type="danger"
        title="Usuń ofertę"
        message={`Czy na pewno chcesz trwale usunąć ofertę "${title}"? Te operacji nie można cofnąć.`}
        confirmLabel="Usuń"
        cancelLabel="Anuluj"
      />
    </motion.div>
  );
}
