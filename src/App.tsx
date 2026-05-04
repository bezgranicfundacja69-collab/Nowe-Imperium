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
import { OmniBotsManager } from './components/OmniBotsManager';
import { AIHelpView } from './components/AIHelpView';
import { InvestorCenterView } from './components/InvestorCenterView';
import { OurAppsView } from './components/OurAppsView';
import { OmniBotsHomeSummary } from './components/OmniBotsHomeSummary.tsx';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from './lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, getDocs, where, addDoc, serverTimestamp } from 'firebase/firestore';
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
  Building2
} from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const [currentView, setCurrentView] = useState<'home' | 'automation' | 'wallet' | 'rewards' | 'media' | 'contact' | 'seller' | 'settings' | 'messages' | 'business' | 'wholesale' | 'integrations' | 'tourism' | 'idea-bank' | 'ai-scraping' | 'partners' | 'affiliate-bot' | 'marketing-manager' | 'ready-businesses' | 'omni-bots' | 'ai-help' | 'investors' | 'our-apps'>('home');
  const [cart, setCart] = useState<{ id: string, title: string, price: number, image: string }[]>([]);
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
  const { user } = useAuth();

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
      
      const snap = await getDocs(q);
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
        });
        
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
    alert(`Przenoszenie do procesu płatności dla oferty: ${id}. Za chwilę nastąpi przekierowanie do bezpiecznej bramki płatniczej.`);
    setCurrentView('wallet');
  };

  useEffect(() => {
    const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'), limit(12));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(data);
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
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
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
      
      <AddListingModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      
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
                onSelect={(cat, sub) => setFilters({ category: cat, subcategory: sub })}
                onViewChange={(view) => setCurrentView(view)}
              />

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              
              {/* Sidebar */}
              <aside className="lg:col-span-3 space-y-6">
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Zap size={18} className="text-blue-600" /> Szybki Dostęp
                  </h3>
                  <ul className="space-y-2">
                    <NavItem icon={<TrendingUp size={16} />} label="Automatyzacja" onClick={() => setCurrentView('automation')} premium />
                    <NavItem icon={<Bot size={16} />} label="Centrum Botów Omni" onClick={() => setCurrentView('omni-bots')} premium />
                    <NavItem icon={<Bot size={16} />} label="Bot Afiliacyjny" onClick={() => setCurrentView('affiliate-bot')} premium />
                    <NavItem icon={<HelpCircle size={16} />} label="Pomoc AI" onClick={() => setCurrentView('ai-help')} />
                    <NavItem icon={<Trophy size={16} />} label="Graj i Zarabiaj" onClick={() => setCurrentView('rewards')} />
                    <NavItem icon={<Briefcase size={16} />} label="Centrum Biznesu" onClick={() => setCurrentView('business')} premium />
                    <NavItem icon={<Globe size={16} />} label="Multikanałowa Sprzedaż" onClick={() => setCurrentView('integrations')} premium />
                    <NavItem icon={<Workflow size={16} />} label="Pobieranie Produktów AI" onClick={() => setCurrentView('ai-scraping')} premium />
                    <NavItem icon={<Bot size={16} />} label="Marketing Manager AI" onClick={() => setCurrentView('marketing-manager')} premium />
                    <NavItem icon={<Sparkles size={16} />} label="Asystent AI" onClick={() => (window as any).toggleOmniAgent?.()} premium />
                    <NavItem icon={<Briefcase size={16} />} label="Gotowe Biznesy" onClick={() => setCurrentView('ready-businesses')} premium />
                    <NavItem icon={<AppWindow size={16} />} label="Nasze Aplikacje" onClick={() => setCurrentView('our-apps')} premium />
                    <NavItem icon={<Building2 size={16} />} label="Inwestorzy & Finanse" onClick={() => setCurrentView('investors')} premium />
                    <NavItem icon={<Database size={16} />} label="Hurtownie & Drop" onClick={() => setCurrentView('wholesale')} />
                    <NavItem icon={<Users size={16} />} label="Dział Partnerzy" onClick={() => setCurrentView('wholesale')} />
                    <NavItem icon={<Palmtree size={16} />} label="Dział Turystyka" onClick={() => setCurrentView('tourism')} />
                    <NavItem icon={<Lightbulb size={16} />} label="Bank Pomysłów" onClick={() => setCurrentView('idea-bank')} />
                    <NavItem icon={<Newspaper size={16} />} label="OmniGazeta" onClick={() => setCurrentView('media')} />
                    <NavItem icon={<CreditCard size={16} />} label="Mój Portfel" onClick={() => setCurrentView('wallet')} />
                    <NavItem icon={<Handshake size={16} />} label="Zamienię / Oddam" onClick={() => {
                      setFilters({ category: 'community', subcategory: '' });
                      setCurrentView('home');
                    }} />
                    <NavItem icon={<ShieldCheck size={16} />} label="Bezpieczeństwo" />
                  </ul>
                </div>

                <div 
                  onClick={() => setCurrentView('automation')}
                  className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-[32px] text-white shadow-lg overflow-hidden relative group cursor-pointer"
                >
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <h4 className="font-bold mb-2 relative z-10 flex items-center gap-2 text-sm italic">
                     Super-Zarabianie
                  </h4>
                  <p className="text-[10px] text-indigo-100 mb-6 relative z-10">Uruchom bota 24/7. Zarabiaj pasywnie na handlu.</p>
                  <div className="w-full py-2.5 bg-white text-indigo-600 font-bold rounded-xl text-xs text-center shadow-sm">
                    Aktywuj Teraz
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentView('investors')}
                  className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-xs">
                    <Briefcase size={16} className="text-blue-600" /> OmniBusiness Hub
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
                    <AppWindow size={16} /> OmniMarket Mobile
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
                   <div className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-16 text-white shadow-2xl sm:px-16 sm:py-24 group">
                    {/* Background Graphic */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2689" 
                            alt="Background" 
                            className="w-full h-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
                    </div>

                    <div className="relative z-10">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono backdrop-blur-md">
                          <Sparkles size={14} className="animate-spin-slow" /> Hyper-Fast Market AI v2.0
                        </div>
                        <h2 className="text-5xl font-black mb-8 leading-[0.85] sm:text-9xl tracking-tighter italic glow-text">
                          ZARABIAJ <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-black">WSZĘDZIE.</span>
                        </h2>
                        <p className="text-slate-300 mb-12 max-w-2xl text-2xl font-medium leading-relaxed italic">
                          Totalna automatyzacja handlu. Allegro, OLX, Vinted w jednym miejscu. Zdominuj rynek z OmniMarket AI.
                        </p>
                        <div className="flex flex-wrap gap-8">
                          <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="rounded-[32px] bg-white px-12 py-6 text-sm font-black uppercase tracking-widest text-slate-900 transition-all hover:bg-blue-500 hover:text-white hover:scale-105 shadow-2xl hover:shadow-blue-500/40"
                          >
                            Wystaw Ofertę
                          </button>
                          <button 
                            onClick={() => setCurrentView('integrations')}
                            className="flex items-center gap-3 rounded-[32px] bg-blue-600 px-12 py-6 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-blue-700 hover:scale-105 shadow-2xl shadow-blue-600/60"
                          >
                            Integracje Allegro/OLX <ArrowRight size={20} />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                <OmniBotsHomeSummary onManageBots={() => setCurrentView('omni-bots')} />

                {/* Latest Listings */}
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">
                      {searchQuery ? `Wyniki dla: ${searchQuery}` : 'Najnowsze Oferty'}
                    </h2>
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
                          sellerName={listing.sellerName || 'OmniSeller'}
                          rating={listing.rating || 5.0}
                          onSellerClick={(id) => {
                            setSelectedSellerId(id);
                            setCurrentView('seller');
                          }}
                          onChatClick={handleStartChat}
                          onBuyClick={handleBuy}
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
              <AutomationDashboard />
            </motion.div>
          )}

          {currentView === 'wallet' && (
            <motion.div key="wallet" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <WalletView />
            </motion.div>
          )}

          {currentView === 'media' && (
            <motion.div key="media" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <MediaCenter />
            </motion.div>
          )}

          {currentView === 'rewards' && (
            <motion.div key="rewards" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}>
              <RewardsCenter />
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
              />
            </motion.div>
          )}

          {currentView === 'wholesale' && (
            <motion.div key="wholesale" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <WholesaleMarket onViewChange={(view) => setCurrentView(view)} />
            </motion.div>
          )}

          {currentView === 'integrations' && (
            <motion.div key="integrations" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <IntegrationsManager />
            </motion.div>
          )}

          {currentView === 'tourism' && (
            <motion.div key="tourism" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <TourismHub />
            </motion.div>
          )}

          {currentView === 'idea-bank' && (
            <motion.div key="idea-bank" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <IdeaBank />
            </motion.div>
          )}

          {currentView === 'ai-scraping' && (
            <motion.div key="ai-scraping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <AIAutomationHub />
            </motion.div>
          )}

          {currentView === 'affiliate-bot' && (
            <motion.div key="affiliate-bot" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <AffiliateBot />
            </motion.div>
          )}

          {currentView === 'marketing-manager' && (
            <motion.div key="marketing-manager" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <MarketingManager />
            </motion.div>
          )}

          {currentView === 'ready-businesses' && (
            <motion.div key="ready-businesses" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ReadyBusinesses />
            </motion.div>
          )}

          {currentView === 'omni-bots' && (
            <motion.div key="omni-bots" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <OmniBotsManager />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ContactView />
            </motion.div>
          )}

          {currentView === 'ai-help' && (
            <motion.div key="ai-help" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <AIHelpView />
            </motion.div>
          )}

          {currentView === 'investors' && (
            <motion.div key="investors" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <InvestorCenterView />
            </motion.div>
          )}

          {currentView === 'our-apps' && (
            <motion.div key="our-apps" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <OurAppsView />
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
              <ProfileSettingsView onBack={() => setCurrentView('home')} />
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
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BenefitsSection />

      <footer className="border-t border-slate-100 bg-white py-20 mt-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              OmniMarket AI
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-10 mb-12 text-sm font-bold text-slate-500">
            <FooterLink label="Zarabianie" onClick={() => setCurrentView('automation')} />
            <FooterLink label="Nasze Aplikacje" onClick={() => setCurrentView('our-apps')} />
            <FooterLink label="Gry & Nagrody" onClick={() => setCurrentView('rewards')} />
            <FooterLink label="Pomoc AI" onClick={() => setCurrentView('ai-help')} />
            <FooterLink label="Bank Pomysłów" onClick={() => setCurrentView('idea-bank')} />
            <FooterLink label="Kontakt" onClick={() => setCurrentView('contact')} />
            <FooterLink label="OmniMedia" onClick={() => setCurrentView('media')} />
          </div>
          <p className="text-xs text-slate-400 font-medium mb-1">© 2026 OmniMarket AI - Wszystkie prawa zastrzeżone.</p>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Właściciel & Pomysłodawca: Arkadiusz Smyka</p>
        </div>
      </footer>
      <SiteAssistant />
    </div>
  );
}

function NavItem({ icon, label, onClick, premium }: { icon: any, label: string, onClick?: () => void, premium?: boolean }) {
  return (
    <li onClick={onClick} className={cn("flex items-center justify-between gap-3 text-sm font-bold cursor-pointer transition-all p-3 rounded-2xl", premium ? "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-blue-600")}>
      <div className="flex items-center gap-3">{icon} {label}</div>
      {premium && <div className="h-2 w-2 rounded-full bg-current animate-pulse" />}
    </li>
  );
}

function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="rounded-[48px] bg-white border border-slate-100 p-12 text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <h2 className="mb-16 text-4xl font-black text-slate-900 tracking-tight">Zarabiaj bez limitów z OmniMarket AI</h2>
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
            desc="Graj w gry i wykonuj zadania, aby zarabiać OmniCash. Zamieniaj czas na realną walutę." 
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
