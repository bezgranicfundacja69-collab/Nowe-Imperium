import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { motion } from 'motion/react';
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
  BadgeCheck
} from 'lucide-react';
import { ListingCard } from './ListingCard';
import { cn } from '../lib/utils';

import { ReviewModal } from './ReviewModal';
import { ReviewSection } from './ReviewSection';
import { useAuth } from '../hooks/useAuth';

interface SellerProfileViewProps {
  sellerId: string;
  onBack?: () => void;
  onNavigateToSeller?: (id: string) => void;
  onChatClick?: (listingId: string, sellerId: string) => void;
  onBuyClick?: (listingId: string) => void;
}

export function SellerProfileView({ sellerId, onBack, onNavigateToSeller, onChatClick, onBuyClick }: SellerProfileViewProps) {
  const { user: currentUser } = useAuth();
  const [seller, setSeller] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="text-center py-20 bg-white rounded-[32px] border border-slate-100">
        <ArrowLeft className="mx-auto cursor-pointer mb-4 text-slate-400" onClick={onBack} />
        <p className="text-slate-500 font-bold">Użytkownik nie został odnaleziony.</p>
        <button onClick={onBack} className="mt-6 text-blue-600 font-black hover:underline">Wróć do strony głównej</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header / Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Wróć do wyników
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 text-center">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse" />
              {seller.photoURL ? (
                <img 
                  src={seller.photoURL} 
                  alt={seller.displayName} 
                  className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="relative z-10 w-full h-full bg-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-black border-4 border-white shadow-lg">
                  {seller.displayName?.substring(0, 2).toUpperCase()}
                </div>
              )}
              {seller.rating >= 4.8 && (
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-2xl shadow-lg border-2 border-white">
                  <ShieldCheck size={20} />
                </div>
              )}
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-1">{seller.displayName}</h2>
            
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-black">{seller.rating?.toFixed(1) || '5.0'}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">({seller.reviewCount || 0} opinii)</span>
              
              {/* Trust Indicators */}
              {(seller.rating >= 4.8 && (seller.reviewCount || 0) >= 10) && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md text-[9px] font-black uppercase tracking-wider border border-amber-200">
                  <Trophy size={10} /> Super Sprzedawca
                </div>
              )}
              {seller.rating >= 4.5 && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[9px] font-black uppercase tracking-wider border border-blue-200">
                  <BadgeCheck size={10} /> Zweryfikowany
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                <MapPin size={12} /> {seller.location || 'Polska'}
              </div>
              <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                <Calendar size={12} /> Od 2026
              </div>
            </div>

            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 italic">
              "{seller.bio || 'Ten sprzedawca nie dodał jeszcze bio, ale jego oferty mówią same za siebie!'}"
            </p>

            {/* Social Links Section */}
            {seller.socialLinks && Object.values(seller.socialLinks).some(link => !!link) && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
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
                  } color="hover:text-slate-900" />
                )}
                {seller.socialLinks.messenger && (
                  <SocialLink href={seller.socialLinks.messenger} icon={<MessageCircle size={18} />} color="hover:text-blue-500" />
                )}
                {seller.socialLinks.youtube && (
                  <SocialLink href={seller.socialLinks.youtube} icon={<Youtube size={18} />} color="hover:text-red-600" />
                )}
                {seller.socialLinks.twitter && (
                  <SocialLink href={seller.socialLinks.twitter} icon={<Twitter size={18} />} color="hover:text-sky-500" />
                )}
                {seller.socialLinks.linkedin && (
                  <SocialLink href={seller.socialLinks.linkedin} icon={<Linkedin size={18} />} color="hover:text-blue-700" />
                )}
                {seller.socialLinks.github && (
                  <SocialLink href={seller.socialLinks.github} icon={<Github size={18} />} color="hover:text-slate-900" />
                )}
              </div>
            )}

            <button 
              onClick={() => onChatClick?.('', sellerId)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg mb-3"
            >
              <Mail size={18} /> Wyślij Wiadomość
            </button>

            {currentUser && currentUser.uid !== sellerId && (
              <button 
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full py-4 bg-white text-blue-600 border-2 border-blue-100 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <Star size={18} /> Oceń Sprzedawcę
              </button>
            )}
          </div>

          {/* Filters Sidebar Section */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
             <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Filter size={14} className="text-blue-600" /> Filtry Ceny
             </h3>
             <div className="space-y-4">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Cena Minimalna</label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">PLN</span>
                   </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Cena Maksymalna</label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Brak"
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">PLN</span>
                   </div>
                </div>
                {(minPrice || maxPrice) && (
                   <button 
                     onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                     className="w-full py-2 text-[10px] font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest text-center"
                   >
                     Wyczyść Filtry
                   </button>
                )}
             </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
             <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <ShieldCheck size={20} /> Bezpieczny Handel
             </h3>
             <p className="text-xs text-blue-100 font-medium mb-6">
                Ten profil został zweryfikowany przez OmniMarket AI. Wszystkie transakcje są ubezpieczone do 5000 PLN.
             </p>
             <div className="text-[10px] uppercase font-black tracking-widest bg-white/20 backdrop-blur-sm self-start px-3 py-1 rounded-full">
                Verified Seller
             </div>
          </div>
        </div>

        {/* Listings Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <ShoppingBag className="text-blue-600" /> Aktywne Oferty ({filteredListings.length})
            </h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
               Sortuj: 
               <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-blue-600">
                 <option>Najnowsze</option>
                 <option>Najtańsze</option>
               </select>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-16 rounded-[40px] border border-slate-100 text-center">
               <div className="text-slate-200 mb-4 flex justify-center">
                 <Filter size={64} />
               </div>
               <p className="font-bold text-slate-400">Brak ofert spełniających kryteria cenowe.</p>
               <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} className="mt-4 text-blue-600 font-black hover:underline text-sm uppercase tracking-widest">Wyczyść Filtry</button>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="lg:col-span-8 space-y-8 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <Star className="text-amber-500" fill="currentColor" /> Opinie Kupujących ({seller.reviewCount || 0})
            </h3>
            {currentUser && currentUser.uid !== sellerId && (
              <button 
                onClick={() => setIsReviewModalOpen(true)}
                className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest"
              >
                + Dodaj Opinię
              </button>
            )}
          </div>

          <ReviewSection 
            targetId={sellerId} 
            targetType="user" 
            averageRating={seller.rating || 5.0} 
            reviewCount={seller.reviewCount || 0} 
            refreshTrigger={refreshTrigger}
          />
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
      className={cn("p-3 bg-slate-50 text-slate-400 rounded-2xl transition-all hover:bg-white hover:shadow-md", color)}
    >
      {icon}
    </a>
  );
}
