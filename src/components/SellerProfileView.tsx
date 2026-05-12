import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Mail, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowLeft, 
  ExternalLink, 
  Filter,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Share2,
  Linkedin,
  Github,
  Clock,
  Quote,
  Trophy,
  BadgeCheck,
  Zap
} from 'lucide-react';
import { ListingCard } from './ListingCard';
import { cn } from '../lib/utils';
import { ShareModal } from './ShareModal';

import { ReviewModal } from './ReviewModal';
import { ReviewSection } from './ReviewSection';
import { useAuth } from '../hooks/useAuth';

import { ViewProps } from '../types/view';

interface SellerProfileViewProps extends ViewProps {
  sellerId: string;
  onBack?: () => void;
  onNavigateToSeller?: (id: string) => void;
  onChatClick?: (listingId: string, sellerId: string) => void;
  onBuyClick?: (listingId: string) => void;
  onDeleteListing?: (id: string) => void;
}

export function SellerProfileView({ 
  sellerId, 
  onBack, 
  onNavigateToSeller, 
  onChatClick, 
  onBuyClick, 
  onDeleteListing,
  onNavigate,
  cart 
}: SellerProfileViewProps) {
  const { user: currentUser } = useAuth();
  const [seller, setSeller] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const profileUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/seller/${sellerId}` 
    : `https://noweimperium-ai.app/seller/${sellerId}`;

  const fetchSellerData = async () => {
    setLoading(true);
    try {
      // Fetch seller info
      const sellerRef = doc(db, 'users', sellerId);
      const sellerSnap = await getDoc(sellerRef);
      
      if (sellerSnap.exists()) {
        setSeller(sellerSnap.data());
      }

      // Fetch seller listings
      const listingsRef = collection(db, 'listings');
      const listingsQuery = query(listingsRef, where('sellerId', '==', sellerId));
      const listingsSnap = await getDocs(listingsQuery);
      
      const listingsData = listingsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setListings(listingsData);
    } catch (error) {
      console.error("Error fetching seller data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerData();
  }, [sellerId, refreshTrigger]);

  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      const price = item.price || 0;
      const min = minPrice === '' ? -Infinity : parseFloat(minPrice);
      const max = maxPrice === '' ? Infinity : parseFloat(maxPrice);
      return price >= min && price <= max;
    });
  }, [listings, minPrice, maxPrice]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-14 w-14 border-4 border-accent-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="text-center py-24 bg-white rounded-[3rem] border border-prestige-200 glass-card">
        <ArrowLeft className="mx-auto cursor-pointer mb-6 text-prestige-400 hover:text-accent-indigo transition-colors" onClick={onBack} />
        <p className="text-prestige-500 font-display font-medium text-lg italic">User profile not identified in our sequence.</p>
        <button onClick={onBack} className="mt-8 prestige-button-primary !px-10">Back to Grid</button>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-6xl mx-auto">
      {/* Header / Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-3 text-[10px] font-technical font-bold text-prestige-400 hover:text-accent-indigo transition-all group uppercase tracking-[0.2em]"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-prestige-200 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <Quote size={80} className="text-prestige-950" />
            </div>
            <div className="relative mx-auto w-36 h-36 mb-8 group">
              <div className="absolute inset-0 bg-accent-indigo/10 rounded-full animate-pulse group-hover:scale-110 transition-transform duration-500" />
              {seller.photoURL ? (
                <img 
                  src={seller.photoURL} 
                  alt={seller.displayName} 
                  className="relative z-10 w-full h-full object-cover rounded-full border-[6px] border-white shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="relative z-10 w-full h-full bg-prestige-950 rounded-full flex items-center justify-center text-white text-5xl font-display font-black border-[6px] border-white shadow-2xl">
                  {seller.displayName?.substring(0, 2).toUpperCase()}
                </div>
              )}
              {seller.rating >= 4.8 && (
                <div className="absolute -bottom-1 -right-1 bg-accent-indigo text-white p-2.5 rounded-2xl shadow-xl border-4 border-white">
                  <ShieldCheck size={24} />
                </div>
              )}
            </div>

            <h2 className="text-3xl font-display font-bold text-prestige-950 mb-2 tracking-tight">{seller.displayName}</h2>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-accent-amber">
                <Star size={18} fill="currentColor" />
                <span className="text-base font-display font-black tracking-tight">{seller.rating?.toFixed(1) || '5.0'}</span>
              </div>
              <span className="text-xs text-prestige-400 font-medium italic">({seller.reviewCount || 0} reviews)</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <div className="px-4 py-1.5 bg-prestige-50 rounded-full text-[9px] font-technical font-bold text-prestige-500 uppercase tracking-widest flex items-center gap-2 border border-prestige-100">
                <MapPin size={12} className="text-accent-indigo" /> {seller.location || 'Polska'}
              </div>
              <div className="px-4 py-1.5 bg-prestige-50 rounded-full text-[9px] font-technical font-bold text-prestige-500 uppercase tracking-widest flex items-center gap-2 border border-prestige-100">
                <Calendar size={12} className="text-accent-indigo" /> Enterprise Partner
              </div>
            </div>

            <div className="relative p-6 rounded-3xl bg-prestige-50 text-left border border-prestige-100 mb-10">
               <p className="text-sm text-prestige-600 font-medium leading-relaxed italic">
                "{seller.bio || 'Ten sprzedawca nie dodał jeszcze bio, ale jego oferty mówią same za siebie!'}"
               </p>
            </div>

            {/* Social Links Section */}
            {seller.socialLinks && Object.values(seller.socialLinks).some(link => !!link) && (
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {seller.socialLinks.facebook && (
                  <SocialLink href={seller.socialLinks.facebook} icon={<Facebook size={18} />} color="hover:text-blue-600" />
                )}
                {seller.socialLinks.instagram && (
                  <SocialLink href={seller.socialLinks.instagram} icon={<Instagram size={18} />} color="hover:text-pink-600" />
                )}
                {seller.socialLinks.tiktok && (
                  <SocialLink href={seller.socialLinks.tiktok} icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  } color="hover:text-prestige-950" />
                )}
                {seller.socialLinks.youtube && (
                  <SocialLink href={seller.socialLinks.youtube} icon={<Youtube size={18} />} color="hover:text-rose-600" />
                )}
                {seller.socialLinks.linkedin && (
                  <SocialLink href={seller.socialLinks.linkedin} icon={<Linkedin size={18} />} color="hover:text-indigo-700" />
                )}
                {seller.socialLinks.github && (
                  <SocialLink href={seller.socialLinks.github} icon={<Github size={18} />} color="hover:text-prestige-950" />
                )}
              </div>
            )}

            <div className="space-y-4">
              <button 
                onClick={() => onChatClick?.('', sellerId)}
                className="prestige-button-primary w-full !py-5 !rounded-2xl shadow-xl shadow-accent-indigo/10"
              >
                <Mail size={18} className="mr-3" /> Secure Inquiry
              </button>

              {currentUser && currentUser.uid !== sellerId && (
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="prestige-button-secondary w-full !py-5 !rounded-2xl !bg-transparent !border-prestige-200 !text-prestige-600 hover:!bg-prestige-50 hover:!text-accent-indigo"
                >
                  <Star size={18} className="mr-3" /> Rate Profile
                </button>
              )}

              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="prestige-button-secondary w-full !py-5 !rounded-2xl !bg-transparent !border-prestige-200 !text-prestige-600 hover:!bg-prestige-50 hover:!text-accent-indigo"
              >
                <Share2 size={18} className="mr-3" /> Udostępnij Profil
              </button>
            </div>
          </div>

          {/* Filters Sidebar Section */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-prestige-200">
             <h3 className="text-[10px] font-technical font-bold text-prestige-950 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <Filter size={14} className="text-accent-indigo" /> Price Architect
             </h3>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[9px] font-technical font-bold text-prestige-400 uppercase tracking-widest ml-1">Minimum Valuation</label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-prestige-50 border border-prestige-100 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-accent-indigo/5 focus:border-accent-indigo/30 focus:bg-white outline-none transition-all font-display font-bold text-prestige-950"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[9px] font-technical font-bold text-prestige-400 uppercase">PLN</span>
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-technical font-bold text-prestige-400 uppercase tracking-widest ml-1">Maximum Valuation</label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Uncapped"
                        className="w-full bg-prestige-50 border border-prestige-100 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-accent-indigo/5 focus:border-accent-indigo/30 focus:bg-white outline-none transition-all font-display font-bold text-prestige-950"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[9px] font-technical font-bold text-prestige-400 uppercase">PLN</span>
                   </div>
                </div>
                {(minPrice || maxPrice) && (
                   <button 
                     onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                     className="w-full py-2 text-[10px] font-technical font-bold text-prestige-400 hover:text-rose-600 transition-colors uppercase tracking-[0.2em] text-center"
                   >
                     Reset Filters
                   </button>
                )}
             </div>
          </div>

          <div className="bg-prestige-950 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-white/5">
             <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-accent-indigo/20 blur-[80px]" />
             <h3 className="text-xl font-display font-bold mb-5 flex items-center gap-3 tracking-tight">
                <ShieldCheck size={22} className="text-accent-indigo" /> Secure Trade
             </h3>
             <p className="text-xs text-prestige-400 font-medium mb-8 leading-relaxed italic">
                Ten profil został zweryfikowany przez noweimperium AI. Wszystkie transakcje są ubezpieczone do 5000 PLN.
             </p>
             <div className="inline-flex text-[9px] uppercase font-technical font-bold tracking-[0.3em] bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/30 px-5 py-2 rounded-full backdrop-blur-sm">
                Verified Global Seller
             </div>
          </div>
        </div>

        {/* Listings Content */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-3xl font-display font-bold text-prestige-950 flex items-center gap-4 tracking-tight">
              <ShoppingBag className="text-accent-indigo" size={28} /> Portfolio <span className="text-lg font-medium text-prestige-400">({filteredListings.length})</span>
            </h3>
            <div className="flex items-center gap-3 text-[10px] font-technical font-bold text-prestige-400 uppercase tracking-widest bg-white px-5 py-2 rounded-full border border-prestige-200">
               Sequence: 
               <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-prestige-950 font-bold">
                 <option>Chronological</option>
                 <option>Capital Low-High</option>
               </select>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {filteredListings.map((listing) => (
                <ListingCard 
                  key={listing.id} 
                  id={listing.id}
                  sellerId={sellerId}
                  title={listing.title}
                  price={listing.price}
                  location={listing.location}
                  category={listing.category}
                  subcategory={listing.subcategory}
                  type={listing.type}
                  image={listing.images?.[0] || 'https://picsum.photos/seed/market/400/300'}
                  sellerName={seller.displayName}
                  rating={seller.rating}
                  onSellerClick={() => onNavigateToSeller?.(sellerId)}
                  onChatClick={onChatClick}
                  onBuyClick={onBuyClick}
                  onDeleteListing={onDeleteListing}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-24 rounded-[3rem] border border-prestige-200 text-center shadow-sm flex flex-col items-center">
               <div className="h-20 w-20 bg-prestige-50 rounded-3xl flex items-center justify-center text-prestige-200 mb-8">
                 <Filter size={40} />
               </div>
               <p className="font-display font-bold text-prestige-400 text-lg">No assets match your valuation parameters.</p>
               <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} className="mt-8 prestige-button-secondary !px-10 !py-4 transition-all">Clear Constraints</button>
            </div>
          )}

          {/* Reviews Section */}
          <div className="space-y-10 pt-16 border-t border-prestige-200">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-3xl font-display font-bold text-prestige-950 flex items-center gap-4 tracking-tight">
                <Star className="text-accent-amber" fill="currentColor" size={28} /> Client Endorsements <span className="text-lg font-medium text-prestige-400">({seller.reviewCount || 0})</span>
              </h3>
              {currentUser && currentUser.uid !== sellerId && (
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="prestige-button-secondary !py-2.5 !px-6 !rounded-full !text-[9px] uppercase tracking-widest border border-prestige-200"
                >
                  Write Review
                </button>
              )}
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-prestige-200 shadow-sm">
              <ReviewSection 
                targetId={sellerId} 
                targetType="user" 
                averageRating={seller.rating || 5.0} 
                reviewCount={seller.reviewCount || 0} 
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        </div>
      </div>

      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        targetId={sellerId}
        targetType="user"
        targetTitle={seller.displayName || 'Sprzedawca'}
        onSuccess={() => setRefreshTrigger(prev => prev + 1)}
      />

      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`Profil sprzedawcy: ${seller.displayName}`}
        url={profileUrl}
      />
    </div>
  );
}

function SocialLink({ href, icon, color }: { href: string, icon: any, color: string }) {
  // Add protocol if missing
  const url = href.startsWith('http') ? href : `https://${href}`;
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn("h-12 w-12 flex items-center justify-center bg-prestige-50 text-prestige-400 rounded-2xl transition-all hover:bg-white hover:shadow-xl hover:scale-110 border border-prestige-100", color)}
    >
      {icon}
    </a>
  );
}
