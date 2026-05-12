import { CategoryBar } from './components/CategoryBar';
import { Navbar } from './components/Navbar';
import { ListingCard } from './components/ListingCard';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { AutomationDashboard } from './components/AutomationDashboard';
import { WalletView } from './components/WalletView';
import { MediaCenter } from './components/MediaCenter';
import { RewardsCenter } from './components/RewardsCenter';
import { ContactView } from './components/ContactView';
import { AddListingModal } from './components/AddListingModal';
import { SiteAssistant } from './components/SiteAssistant';
import { SellerProfileView } from './components/SellerProfileView';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { ChatView } from './components/ChatView';
import { BusinessHub } from './components/BusinessHub';
import { WholesaleMarket } from './components/WholesaleMarket';
import { IntegrationsManager } from './components/IntegrationsManager';
import { TourismHub } from './components/TourismHub';
import { IdeaBank } from './components/IdeaBank';
import { AIAutomationHub } from './components/AIAutomationHub';
import { AffiliateBot } from './components/AffiliateBot';
import { MarketingManager } from './components/MarketingManager';
import { ReadyBusinesses } from './components/ReadyBusinesses';
import { NoweBotsManager } from './components/NoweBotsManager';
import { AIHelpView } from './components/AIHelpView';
import { InvestorCenterView } from './components/InvestorCenterView';
import { OurAppsView } from './components/OurAppsView';
import { NoweBotsHomeSummary } from './components/NoweBotsHomeSummary';
import { DropshippingHub } from './components/DropshippingHub';
import { MarketplaceImporter } from './components/MarketplaceImporter';
import { CollaborationHub } from './components/CollaborationHub';
import { ListingDetailModal } from './components/ListingDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { NotificationService } from './components/NotificationService';
import { BuyNowModal } from './components/BuyNowModal';
import { CrowdfundingHub } from './components/CrowdfundingHub';
import { SocialInvestmentHub } from './components/SocialInvestmentHub';
import { PitchDeckHub } from './components/PitchDeckHub';
import { Toaster, toast } from 'sonner';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from './lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, getDocs, where, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  Heart, 
  MessageSquare, 
  ShoppingBag, 
  Zap, 
  TrendingUp, 
  Brain,
  ShieldCheck,
  CreditCard,
  Briefcase,
  AppWindow,
  Download,
  Trophy,
  Newspaper,
  Mail,
  Gamepad2,
  GraduationCap,
  Tractor,
  Handshake,
  Gift,
  Users,
  Database,
  Palmtree,
  Lightbulb,
  Workflow,
  MapPin,
  Globe,
  Bot,
  HelpCircle,
  Building2,
  Rocket,
  PieChart,
  Bell
} from 'lucide-react';
import { cn } from './lib/utils';

import { NotificationManager } from './components/NotificationManager';
import { saveUserPreferences, getUserPreferences } from './services/notificationService';

import { ViewProps, AppView } from './types/view';

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [cart, setCart] = useState<{ id: string, title: string, price: number, image: string }[]>([]);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [selectedChatDetails, setSelectedChatDetails] = useState<{ listingId?: string, sellerId?: string } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ 
    category: '', 
    subcategory: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    sortBy: 'newest' as 'newest' | 'price-asc' | 'price-desc' | 'popular'
  });
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<any>(null);
  const { user } = useAuth();

  const handleQuickSubscribe = async () => {
    if (!user) {
      toast.error("Zaloguj się, aby subskrybować kategorię.");
      return;
    }
    if (!filters.category) return;

    try {
      const current = await getUserPreferences(user.uid);
      const cats = current?.subscribedCategories || [];
      if (!cats.includes(filters.category)) {
        await saveUserPreferences(user.uid, {
          subscribedCategories: [...cats, filters.category]
        });
        toast.success(`Subskrybujesz teraz nowe oferty w: ${filters.category}`);
      } else {
        toast.info(`Już subskrybujesz tę kategorię.`);
      }
    } catch (error) {
      toast.error("Błąd zapisu subskrypcji.");
    }
  };

  const handleAddToCart = (listing: any) => {
    setCart(prev => [...prev, { id: listing.id, title: listing.title, price: listing.price, image: listing.image }]);
  };

  const handleStartChat = async (listingId: string, sellerId: string) => {
    if (!user) {
      alert("Zaloguj się, aby rozmawiać ze sprzedawcami.");
      return;
    }

    if (user.uid === sellerId) {
      alert("To Twoja własna oferta.");
      return;
    }

    try {
      // Check if conversation already exists
      const q = listingId ? query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', user.uid),
        where('listingId', '==', listingId)
      ) : query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', user.uid),
        where('sellerId', '==', sellerId)
      );
      
      const snap = await getDocs(q).catch(e => handleFirestoreError(e, OperationType.GET, 'conversations'));
      if (!snap) return;
      const existing = snap.docs.find(d => d.data().participants.includes(sellerId));

      if (existing) {
        setSelectedChatDetails({ listingId: existing.data().listingId, sellerId });
        setCurrentView('messages');
      } else if (listingId) {
        // Create new conversation linked to listing
        const listing = listings.find(l => l.id === listingId);
        
        await addDoc(collection(db, 'conversations'), {
          participants: [user.uid, sellerId],
          buyerId: user.uid,
          sellerId: sellerId,
          listingId: listingId,
          listingTitle: listing?.title || 'Zapytanie o ofertę',
          listingImage: listing?.image || listing?.images?.[0] || '',
          lastMessage: '',
          updatedAt: serverTimestamp()
        }).catch(e => handleFirestoreError(e, OperationType.WRITE, 'conversations'));
        
        setSelectedChatDetails({ listingId, sellerId });
        setCurrentView('messages');
      } else {
        // Just go to messages
        setCurrentView('messages');
      }
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const handleBuy = (id: string) => {
    const item = listings.find(l => l.id === id);
    if (!user) {
      toast.error("Zaloguj się, aby dokonać zakupu.");
      return;
    }
    if (item) {
      setCheckoutItem(item);
      setIsBuyNowModalOpen(true);
    }
  };

  const handleProceedToCheckout = () => {
    setIsBuyNowModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleDeleteListing = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'listings', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `listings/${id}`);
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    setIsCheckoutModalOpen(false);
    alert(`🎉 Płatność pomyślna! ID Transakcji: ${paymentId}. Twoje zamówienie jest teraz przetwarzane przez sprzedawcę.`);
    // Opcjonalnie: przenieś użytkownika do widoku portfela lub zamówień
    setCurrentView('wallet');
  };

  useEffect(() => {
    const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'), limit(12));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'listings');
    });
    return unsub;
  }, []);

  const filteredListings = useMemo(() => {
    let result = listings.filter(l => {
      const matchesSearch = !searchQuery || 
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !filters.category || l.category === filters.category;
      const matchesSubcategory = !filters.subcategory || l.subcategory === filters.subcategory;
      
      const price = l.price || 0;
      const matchesMinPrice = !filters.minPrice || price >= parseFloat(filters.minPrice);
      const matchesMaxPrice = !filters.maxPrice || price <= parseFloat(filters.maxPrice);
      const matchesLocation = !filters.location || l.location?.toLowerCase().includes(filters.location.toLowerCase());
      
      return matchesSearch && matchesCategory && matchesSubcategory && matchesMinPrice && matchesMaxPrice && matchesLocation;
    });

    if (filters.sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (filters.sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (filters.sortBy === 'popular') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (filters.sortBy === 'newest') result.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

    return result;
  }, [listings, searchQuery, filters]);

  return (
    <div className="min-h-screen bg-prestige-50 selection:bg-accent-indigo/10 selection:text-accent-indigo">
      <Toaster position="top-right" richColors />
      <NotificationService />
      <Navbar 
        onNavigate={(view: any) => {
          if (view === 'profile' && user) {
            setSelectedSellerId(user.uid);
            setCurrentView('seller');
          } else {
            setCurrentView(view);
          }
        }} 
        onSearchChange={setSearchQuery}
        searchValue={searchQuery}
        cartCount={cart.length}
      />
      
      {selectedListing && (
        <ListingDetailModal 
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          listing={selectedListing}
          onChatClick={handleStartChat}
          onBuyClick={handleBuy}
          onSellerClick={(id) => {
            setSelectedSellerId(id);
            setCurrentView('seller');
          }}
        />
      )}
      <AddListingModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      
      <BuyNowModal 
        isOpen={isBuyNowModalOpen}
        onClose={() => setIsBuyNowModalOpen(false)}
        listing={checkoutItem}
        onConfirm={handleProceedToCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        item={checkoutItem}
        onSuccess={handlePaymentSuccess}
      />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <CategoryBar 
                selectedCategory={filters.category}
                selectedSubcategory={filters.subcategory}
                onSelect={(cat, sub) => setFilters(prev => ({ ...prev, category: cat, subcategory: sub }))}
                onViewChange={(view) => setCurrentView(view)}
              />

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              
              {/* Sidebar */}
              <aside className="lg:col-span-3 space-y-6">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-prestige-200">
                  <h3 className="font-display font-bold text-prestige-950 mb-6 flex items-center gap-2.5 px-2">
                    <Zap size={18} className="text-accent-indigo" /> 
                    <span className="tracking-tight">Szybki Dostęp</span>
                  </h3>
                  <ul className="space-y-1">
                    <NavItem icon={<TrendingUp size={16} />} label="Automatyzacja" onClick={() => setCurrentView('automation')} premium />
                    <NavItem icon={<Bot size={16} />} label="Zarządzanie Botami AI" onClick={() => setCurrentView('nowe-bots')} premium />
                    <NavItem icon={<Zap size={16} />} label="Dropshipping AI Hub" onClick={() => setCurrentView('dropshipping-hub')} premium />
                    <NavItem icon={<Bot size={16} />} label="Bot Afiliacyjny" onClick={() => setCurrentView('affiliate-bot')} premium />
                    <NavItem icon={<HelpCircle size={16} />} label="Pomoc AI" onClick={() => setCurrentView('ai-help')} />
                    <NavItem icon={<Trophy size={16} />} label="Graj i Zarabiaj" onClick={() => setCurrentView('rewards')} />
                    <NavItem icon={<Briefcase size={16} />} label="Centrum Biznesu" onClick={() => setCurrentView('business')} premium />
                    <NavItem icon={<Globe size={16} />} label="Multikanałowa Sprzedaż" onClick={() => setCurrentView('integrations')} premium />
                    <NavItem icon={<Workflow size={16} />} label="Pobieranie Produktów AI" onClick={() => setCurrentView('ai-scraping')} premium />
                    <NavItem icon={<Bot size={16} />} label="Marketing Manager AI" onClick={() => setCurrentView('marketing-manager')} premium />
                    <NavItem icon={<Sparkles size={16} />} label="Asystent AI" onClick={() => (window as any).togglenoweAgent?.()} premium />
                    <NavItem icon={<Briefcase size={16} />} label="Gotowe Biznesy" onClick={() => setCurrentView('ready-businesses')} premium />
                    <NavItem icon={<Rocket size={16} />} label="Pitch Business (VC)" onClick={() => setCurrentView('pitch')} premium />
                    <NavItem icon={<PieChart size={16} />} label="Inwestycje Społecznościowe" onClick={() => setCurrentView('equity')} premium />
                    <NavItem icon={<Heart size={16} />} label="Zbiórki & Fundacja" onClick={() => setCurrentView('crowdfunding')} premium />
                    <NavItem icon={<AppWindow size={16} />} label="Nasze Aplikacje" onClick={() => setCurrentView('our-apps')} premium />
                    <NavItem icon={<Building2 size={16} />} label="Inwestorzy & Finanse" onClick={() => setCurrentView('investors')} premium />
                    <NavItem icon={<Database size={16} />} label="Hurtownie & Drop" onClick={() => setCurrentView('wholesale')} />
                    <NavItem icon={<Users size={16} />} label="Dział Partnerzy" onClick={() => setCurrentView('wholesale')} />
                    <NavItem icon={<Palmtree size={16} />} label="Dział Turystyka" onClick={() => setCurrentView('tourism')} />
                    <NavItem icon={<Lightbulb size={16} />} label="Bank Pomysłów" onClick={() => setCurrentView('idea-bank')} />
                    <NavItem icon={<Newspaper size={16} />} label="noweimperium Gazeta" onClick={() => setCurrentView('media')} />
                    <NavItem icon={<CreditCard size={16} />} label="Mój Portfel" onClick={() => setCurrentView('wallet')} />
                    <NavItem icon={<Handshake size={16} />} label="Dołącz do nas / Współpraca" onClick={() => setCurrentView('collaboration')} premium />
                    <NavItem icon={<Handshake size={16} />} label="Zamienię / Oddam" onClick={() => {
                      setFilters({ category: 'community', subcategory: '' });
                      setCurrentView('home');
                    }} />
                    <NavItem icon={<ShieldCheck size={16} />} label="Bezpieczeństwo" />
                  </ul>
                </div>

                <div 
                  onClick={() => setCurrentView('automation')}
                  className="bg-prestige-950 p-8 rounded-[2rem] text-white shadow-xl overflow-hidden relative group cursor-pointer border border-white/5"
                >
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 h-40 w-40 rounded-full bg-accent-indigo/20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <h4 className="font-display font-bold mb-3 relative z-10 flex items-center gap-2 text-base tracking-tight italic">
                     Super-Zarabianie
                  </h4>
                  <p className="text-xs text-prestige-400 mb-8 relative z-10 leading-relaxed">Uruchom profesjonalnego bota handlowego 24/7. Pasywny dochód zasięgu ręki.</p>
                  <div className="w-full py-3 bg-white text-prestige-950 font-display font-bold rounded-xl text-[10px] uppercase tracking-widest text-center shadow-lg active:scale-95 transition-transform">
                    Aktywuj Teraz
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentView('investors')}
                  className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-xs">
                    <Briefcase size={16} className="text-blue-600" /> noweimperium Business Hub
                  </h4>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                         <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Inwestorzy & Finanse</span>
                         <TrendingUp size={12} className="text-emerald-500" />
                     </div>
                     <div className="flex items-center justify-between">
                         <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Kredyty & Dotacje</span>
                         <CreditCard size={12} className="text-blue-500" />
                     </div>
                     <div className="h-10 w-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-colors rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest">
                        Otwórz Finansowanie
                     </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-[32px] text-white overflow-hidden relative group">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-sm">
                    <AppWindow size={16} /> noweimperium Mobile
                  </h4>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors">
                    <Download size={14} /> Pobierz App
                  </button>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-9 space-y-8">
                {/* Hero Banner */}
                {!searchQuery && (
                   <div className="relative overflow-hidden rounded-[4rem] bg-prestige-950 p-10 text-white shadow-2xl sm:p-20 group min-h-[500px] flex items-center border border-white/5">
                    {/* Background Graphic */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2689" 
                            alt="Background" 
                            className="w-full h-full object-cover opacity-20 transition-transform duration-[2000ms] group-hover:scale-105"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-prestige-950 via-prestige-950/40 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-3xl">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="inline-flex items-center gap-2.5 rounded-full bg-accent-indigo/10 px-5 py-2 text-[10px] font-technical font-bold uppercase tracking-[0.3em] text-accent-indigo border border-accent-indigo/20 mb-10 backdrop-blur-md">
                          <Sparkles size={14} className="animate-pulse" /> Prestige Ecosystem Enterprise v3.0
                        </div>
                        <h2 className="text-6xl font-display font-black mb-8 leading-[0.88] sm:text-[112px] tracking-tighter uppercase italic">
                          DOMINACJA <br /> <span className="text-accent-indigo">INTELIGENTNA.</span>
                        </h2>
                        <p className="text-prestige-400 mb-12 max-w-xl text-xl font-medium leading-relaxed italic border-l-2 border-accent-indigo/30 pl-6">
                          Przekraczaj granice handlu z zaawansowaną sztuczną inteligencją. Twój biznes zasługuje na prestiż.
                        </p>
                        <div className="flex flex-wrap gap-6">
                          <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="prestige-button-primary !py-5 !px-12 !rounded-[2rem] shadow-2xl shadow-accent-indigo/10"
                          >
                            Wystaw Ofertę
                          </button>
                          <button 
                            onClick={() => setCurrentView('integrations')}
                            className="prestige-button-secondary !py-5 !px-12 !rounded-[2rem] !border-prestige-700 !bg-transparent hover:!bg-white/5 !text-white"
                          >
                            Ekosystem AI <ArrowRight size={20} className="ml-2" />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                <NoweBotsHomeSummary onManageBots={() => setCurrentView('nowe-bots')} />

                {/* Latest Listings */}
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-black tracking-tight text-slate-900">
                        {searchQuery ? `Wyniki dla: ${searchQuery}` : filters.category ? `Kategoria: ${filters.category}` : 'Najnowsze Oferty'}
                      </h2>
                      {filters.category && !searchQuery && (
                        <button 
                          onClick={handleQuickSubscribe}
                          className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                        >
                          <Bell size={12} /> Powiadom o nowych
                        </button>
                      )}
                    </div>
                    {!searchQuery && (
                      <button className="text-sm font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                        Wszystkie okazje <TrendingUp size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>

                  {filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                      {filteredListings.map((listing) => (
                        <ListingCard 
                          key={listing.id} 
                          id={listing.id}
                          sellerId={listing.sellerId}
                          title={listing.title}
                          price={listing.price}
                          location={listing.location}
                          category={listing.category}
                          subcategory={listing.subcategory}
                          type={listing.type}
                          image={listing.image || listing.images?.[0] || 'https://picsum.photos/seed/market/400/300'}
                          sellerName={listing.sellerName || 'noweSeller'}
                          rating={listing.averageRating || listing.rating || 0}
                          reviewCount={listing.reviewCount || 0}
                          onSellerClick={(id) => {
                            setSelectedSellerId(id);
                            setCurrentView('seller');
                          }}
                          onChatClick={handleStartChat}
                          onBuyClick={handleBuy}
                          onDeleteListing={handleDeleteListing}
                          onClick={() => {
                            setSelectedListing(listing);
                            setIsDetailModalOpen(true);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-32 bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl opacity-50" />
                        <div className="relative z-10">
                            <div className="relative mx-auto w-32 h-32 mb-8">
                                <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-40" />
                                <ShoppingBag size={64} className="absolute inset-0 m-auto text-blue-500" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Szukasz czegoś wyjątkowego?</h3>
                            <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
                                Obecnie nie ma tu żadnych ofert, ale to świetna okazja, aby być pierwszym!
                            </p>
                            <button 
                                onClick={() => setIsAddModalOpen(true)}
                                className="mt-10 px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-xl shadow-slate-900/20"
                            >
                                Dodaj Pierwszą Ofertę
                            </button>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

          {currentView === 'automation' && (
            <motion.div key="automation" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <AutomationDashboard onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'wallet' && (
            <motion.div key="wallet" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <WalletView onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'media' && (
            <motion.div key="media" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <MediaCenter onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'rewards' && (
            <motion.div key="rewards" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}>
              <RewardsCenter onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'business' && (
            <motion.div key="business" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <BusinessHub 
                onCategorySelect={(cat, sub) => {
                  setFilters({ category: cat, subcategory: sub });
                  setCurrentView('home');
                }} 
                onViewChange={(view) => setCurrentView(view)}
                onNavigate={setCurrentView}
                cart={cart}
              />
            </motion.div>
          )}

          {currentView === 'wholesale' && (
            <motion.div key="wholesale" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <WholesaleMarket onViewChange={(view) => setCurrentView(view)} onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'integrations' && (
            <motion.div key="integrations" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <IntegrationsManager onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'tourism' && (
            <motion.div key="tourism" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <TourismHub onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'idea-bank' && (
            <motion.div key="idea-bank" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <IdeaBank onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'ai-scraping' && (
            <motion.div key="ai-scraping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <AIAutomationHub onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'affiliate-bot' && (
            <motion.div key="affiliate-bot" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <AffiliateBot onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'marketing-manager' && (
            <motion.div key="marketing-manager" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <MarketingManager onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'ready-businesses' && (
            <motion.div key="ready-businesses" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ReadyBusinesses onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'nowe-bots' && (
            <motion.div key="nowe-bots" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <NoweBotsManager onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'dropshipping-hub' && (
            <motion.div key="dropshipping-hub" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <DropshippingHub onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'collaboration' && (
            <motion.div key="collaboration" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <CollaborationHub onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ContactView onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'ai-help' && (
            <motion.div key="ai-help" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <AIHelpView onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'investors' && (
            <motion.div key="investors" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <InvestorCenterView onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'crowdfunding' && (
            <motion.div key="crowdfunding" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <CrowdfundingHub onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'equity' && (
            <motion.div key="equity" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <SocialInvestmentHub onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'pitch' && (
            <motion.div key="pitch" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <PitchDeckHub onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'our-apps' && (
            <motion.div key="our-apps" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <OurAppsView onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'seller' && selectedSellerId && (
            <motion.div 
              key="seller" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
            >
              <SellerProfileView 
                sellerId={selectedSellerId} 
                onBack={() => setCurrentView('home')} 
                onNavigateToSeller={(id) => setSelectedSellerId(id)}
                onChatClick={handleStartChat}
                onBuyClick={handleBuy}
                onDeleteListing={handleDeleteListing}
                onNavigate={setCurrentView}
                cart={cart}
              />
            </motion.div>
          )}

          {currentView === 'settings' && (
            <motion.div 
              key="settings" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
            >
              <ProfileSettingsView onBack={() => setCurrentView('home')} onNavigate={setCurrentView} cart={cart} />
            </motion.div>
          )}

          {currentView === 'messages' && (
            <motion.div 
              key="messages" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
            >
              <ChatView 
                onBack={() => setCurrentView('home')} 
                initialListingId={selectedChatDetails?.listingId}
                initialSellerId={selectedChatDetails?.sellerId}
                onNavigate={setCurrentView}
                cart={cart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BenefitsSection />

      <footer className="border-t border-prestige-200 bg-white py-24 mt-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex h-12 w-12 bg-prestige-950 rounded-2xl items-center justify-center mb-4">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <span className="text-2xl font-display font-black text-prestige-950 tracking-tighter uppercase">
              nowe<span className="text-accent-indigo">imperium</span>
            </span>
            <div className="h-0.5 w-12 bg-accent-indigo mt-1 rounded-full opacity-50" />
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-14 text-xs font-display font-bold uppercase tracking-widest text-prestige-400">
            <FooterLink label="Zarabianie" onClick={() => setCurrentView('automation')} />
            <FooterLink label="Nasze Aplikacje" onClick={() => setCurrentView('our-apps')} />
            <FooterLink label="Gry & Nagrody" onClick={() => setCurrentView('rewards')} />
            <FooterLink label="Pomoc AI" onClick={() => setCurrentView('ai-help')} />
            <FooterLink label="Współpraca" onClick={() => setCurrentView('collaboration')} />
            <FooterLink label="noweimperium Media" onClick={() => setCurrentView('media')} />
          </div>
          <div className="max-w-md mx-auto py-8 border-y border-prestige-100 mb-8">
             <p className="text-[10px] text-prestige-400 font-technical font-medium uppercase tracking-widest leading-loose">
               Prestige Ecosystem to zastrzeżony znak towarowy firmy noweimperium Enterprise Solution. Wszystkie procesy są weryfikowane przez zaawansowaną sztuczną inteligencję.
             </p>
          </div>
          <p className="text-[9px] text-prestige-300 font-technical font-bold uppercase tracking-[0.3em]">© 2026 noweimperium • ARKADIUSZ SMYKA ENTERPRISE</p>
        </div>
      </footer>
      <SiteAssistant />
    </div>
  );
}

function NavItem({ icon, label, onClick, premium }: { icon: any, label: string, onClick?: () => void, premium?: boolean }) {
  return (
    <li onClick={onClick} className={cn(
      "group flex items-center justify-between gap-3 text-xs font-display font-semibold cursor-pointer transition-all p-3 rounded-2xl border border-transparent", 
      premium 
        ? "bg-indigo-50/40 text-accent-indigo hover:bg-accent-indigo hover:text-white hover:shadow-lg hover:shadow-accent-indigo/20" 
        : "text-prestige-600 hover:bg-prestige-100 hover:text-prestige-950"
    )}>
      <div className="flex items-center gap-3">
        <span className={cn("transition-transform group-hover:scale-110", premium ? "text-accent-indigo group-hover:text-white" : "text-prestige-400 group-hover:text-accent-indigo")}>
          {icon}
        </span> 
        {label}
      </div>
      {premium && <Sparkles size={12} className="text-accent-indigo group-hover:text-white animate-pulse" />}
    </li>
  );
}

function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="rounded-[48px] bg-white border border-slate-100 p-12 text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <h2 className="mb-16 text-4xl font-black text-slate-900 tracking-tight">Zarabiaj bez limitów z noweimperium AI</h2>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 relative z-10">
          <BenefitItem 
            icon={<Tractor size={32} />} 
            title="Dla Rolnika" 
            desc="Specjalna sekcja dla rolnictwa - od maszyn po płody rolne i nawozy. Wspieramy polską wieś." 
            color="bg-green-50 text-green-600" 
            image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
          />
          <BenefitItem 
            icon={<Gamepad2 size={32} />} 
            title="Gamer & Rewards" 
            desc="Graj w gry i wykonuj zadania, aby zarabiać noweCash. Zamieniaj czas na realną walutę." 
            color="bg-indigo-50 text-indigo-600" 
            image="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800"
          />
          <BenefitItem 
            icon={<GraduationCap size={32} />} 
            title="Akademia Biznesu" 
            desc="Kursy i szkolenia z AI, dropshippingu i marketingu. Pakiet wiedzy od ekspertów." 
            color="bg-amber-50 text-amber-600" 
            image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
          />
        </div>
      </div>
    </section>
  );
}

function BenefitItem({ icon, title, desc, color, image }: any) {
  return (
    <div className="group relative transition-all hover:translate-y-[-8px]">
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity">
        <img src={image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="relative z-10">
        <div className={cn("mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl shadow-sm transition-transform group-hover:scale-110", color)}>
            {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-sm font-medium text-slate-500 leading-relaxed px-4">{desc}</p>
      </div>
    </div>
  );
}

function FooterLink({ label, onClick }: { label: string, onClick?: () => void }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick?.(); }} className="hover:text-blue-600 transition-colors">
      {label}
    </a>
  );
}
