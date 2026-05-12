import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Store, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  PlusCircle,
  Database,
  Rocket,
  Search,
  Filter,
  CheckCircle2,
  Globe,
  Layers,
  Layout,
  Cpu,
  Loader2,
  Monitor,
  Package,
  Sparkles,
  Award
} from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';
import { getReadyMadeBusinesses, ReadyMadeStore } from '../services/readyMadeStoreService';
import { useAuth } from '../hooks/useAuth';
import { addTransaction } from '../services/walletService';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { toast } from 'sonner';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  shoper: <Store size={14} />,
  shopify: <ShoppingBag size={14} />,
  dropshipping: <Package size={14} />,
  saas: <Cpu size={14} />,
  automation: <Zap size={14} />,
  marketplace: <Globe size={14} />,
};

import { ViewProps } from '../types/view';

export function ReadyBusinesses({ onNavigate, cart }: ViewProps) {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<ReadyMadeStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [wallet, setWallet] = useState<any>(null);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, 'wallets', user.uid), (doc) => {
      if (doc.exists()) setWallet(doc.data());
    });
    return unsub;
  }, [user]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getReadyMadeBusinesses();
      setBusinesses(data as ReadyMadeStore[]);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = businesses.filter(b => {
    const matchesFilter = filter === 'all' || b.category === filter;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handlePurchase = async (store: ReadyMadeStore) => {
    if (!user) {
      toast.error("Zaloguj się, aby zakupić biznes.");
      return;
    }

    if (!wallet || wallet.balance < store.price) {
      toast.error(`Niewystarczające środki. Potrzebujesz ${formatPrice(store.price)}.`);
      return;
    }

    const confirm = window.confirm(`Czy na pewno chcesz zakupić biznes "${store.title}" za ${formatPrice(store.price)}?`);
    if (!confirm) return;

    setPurchasingId(store.id);
    try {
      const success = await addTransaction(user.uid, -store.price, `Zakup Biznesu: ${store.title}`);
      if (success) {
        toast.success(`Gratulacje! Biznes "${store.title}" został przypisany do Twojego konta.`);
      } else {
        throw new Error("Transaction error");
      }
    } catch (error) {
      toast.error("Wystąpił błąd podczas transakcji.");
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[48px] bg-slate-950 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.3),transparent)]" />
            <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
                alt="Business Stores" 
                className="w-full h-full object-cover opacity-10 transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono">
              <Store size={14} className="animate-pulse" /> E-commerce Business Exchange
            </div>
            <h1 className="text-4xl font-black text-white mb-6 sm:text-7xl italic leading-tight tracking-tighter">
              Kup Gotowy <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Biznes Online</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-xl font-medium leading-relaxed italic">Gotowe sklepy internetowe zintegrowane z Shoper, Shoppity i Shopify. Zacznij e-commerce bez programowania.</p>
          </div>
          
          <div className="flex flex-col gap-4 w-full lg:w-auto">
             <IntegrationBadge icon={<Store size={16} />} label="Shoper Partner" />
             <IntegrationBadge icon={<Layout size={16} />} label="Shopify Integrated" />
             <IntegrationBadge icon={<Cpu size={16} />} label="Shoppity Ready" />
          </div>
        </div>
      </div>

      {/* Integration Hub */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <IntegrationCard 
            title="Integracja Shoper" 
            desc="Podłącz swój klucz API Shoper, aby automatycznie wystawić sklep na sprzedaż lub zaimportować gotowy szablon."
            color="blue"
            icon={<Store />}
         />
         <IntegrationCard 
            title="Integracja Shoppity" 
            desc="Szybki import gotowych sklepów z platformy Shoppity. Pełna synchronizacja stanów magazynowych AI."
            color="indigo"
            icon={<Cpu />}
         />
         <IntegrationCard 
            title="Import Shopify" 
            desc="Masz sklep na Shopify? Wyeksportuj go jednym kliknięciem do noweimperium i znajdź inwestora."
            color="emerald"
            icon={<Globe />}
         />
      </section>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-4 z-40 backdrop-blur-xl bg-white/80">
         <div className="flex flex-wrap items-center gap-2">
            {['all', 'shoper', 'shopify', 'dropshipping', 'saas', 'automation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all min-w-[80px]",
                  filter === cat ? "bg-slate-900 text-white shadow-lg" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                )}
              >
                {cat === 'all' ? 'Wszystkie' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
         </div>
         <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Szukaj biznesu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
            />
         </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filtered.map((store, idx) => (
              <motion.div
                key={store.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={cn(
                  "group relative flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden",
                  idx % 4 === 1 && "md:col-span-1 lg:col-span-1" // Opportunity for asymmetric spans if needed
                )}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={store.image} 
                    alt={store.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-blue-600/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                       <ShieldCheck size={12} className="text-white" />
                       <span className="text-[9px] font-black text-white uppercase tracking-tighter">AI Verified Asset</span>
                    </div>
                    {store.monthlyProfit > 5000 && (
                      <div className="flex items-center gap-2 bg-emerald-500/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                         <TrendingUp size={12} className="text-white" />
                         <span className="text-[9px] font-black text-white uppercase tracking-tighter">High ROI</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="h-6 w-6 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                          {CATEGORY_ICONS[store.category.toLowerCase()] || <Layers size={14} />}
                       </div>
                       <span className="text-[10px] font-black text-white/90 uppercase tracking-widest">{store.platform} • {store.category}</span>
                    </div>
                    <h3 className="text-xl font-black text-white italic leading-tight tracking-tight">{store.title}</h3>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between mb-6">
                     <span className="text-3xl font-black italic text-slate-950 tracking-tighter">{formatPrice(store.price)}</span>
                     <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Award size={12} className="text-amber-400" /> Prestige Node
                     </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 font-medium mb-8 line-clamp-2 italic leading-relaxed">
                    {store.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group-hover:bg-white transition-colors">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Przychód/mc</span>
                        <span className="text-md font-black text-slate-900 italic">~{formatPrice(store.monthlyRevenue)}</span>
                     </div>
                     <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 group-hover:bg-emerald-50 transition-colors">
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Zysk/mc</span>
                        <span className="text-md font-black text-emerald-700 italic">~{formatPrice(store.monthlyProfit)}</span>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                     {store.features.slice(0, 3).map((f, idx) => (
                       <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[9px] font-black text-slate-600 uppercase tracking-wider">
                          <CheckCircle2 size={10} className="text-emerald-500" /> {f}
                       </div>
                     ))}
                  </div>

                  <button 
                    onClick={() => handlePurchase(store)}
                    disabled={purchasingId === store.id}
                    className="w-full py-5 bg-slate-950 text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 hover:shadow-blue-600/30 disabled:opacity-50"
                  >
                    {purchasingId === store.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>Przejmij Biznes <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Action Footer */}
      <section className="bg-slate-950 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
         <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
             <Sparkles size={400} className="absolute -top-20 -right-20 text-white opacity-5 rotate-12" />
         </div>
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-xl">
               <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
                  <Rocket size={12} className="text-blue-400" /> Accelerate Your E-commerce
               </div>
               <h2 className="text-4xl md:text-5xl font-black mb-6 italic leading-tight uppercase tracking-tighter">Wystaw Swój Sklep na Sprzedaż</h2>
               <p className="text-slate-400 text-lg font-medium leading-relaxed italic mb-8">Masz działający biznes e-commerce, stronę SaaS lub gotowy model dropshippingowy? Sprzedaj go błyskawicznie inwestorom z noweimperium.</p>
               <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                     <Database size={14} className="text-blue-400" /> 1.2k Inwestorów
                  </div>
                  <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck size={14} className="text-emerald-400" /> Escrow Protection
                  </div>
               </div>
            </div>
            <button className="px-12 py-7 bg-white text-slate-950 rounded-[32px] font-black text-xs uppercase tracking-widest hover:scale-105 hover:bg-blue-50 transition-all shadow-2xl shadow-blue-500/20 flex items-center gap-3">
               <PlusCircle size={20} /> Dodaj Ofertę Biznesu
            </button>
         </div>
      </section>
    </div>
  );
}

function IntegrationBadge({ icon, label }: { icon: any, label: string }) {
   return (
      <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors group cursor-pointer">
         <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
            {icon}
         </div>
         <p className="text-sm font-bold tracking-tight">{label}</p>
      </div>
   );
}

function IntegrationCard({ title, desc, color, icon }: any) {
   const colors: any = {
      blue: "border-blue-100 bg-blue-50 text-blue-600",
      indigo: "border-indigo-100 bg-indigo-50 text-indigo-600",
      emerald: "border-emerald-100 bg-emerald-50 text-emerald-600"
   };

   return (
      <div className={cn("p-8 rounded-[40px] border transition-all hover:shadow-xl group bg-white", colors[color])}>
         <div className="h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            {icon}
         </div>
         <h4 className="text-xl font-black italic mb-3 tracking-tight text-slate-900">{title}</h4>
         <p className="text-xs font-medium text-slate-500 italic mb-8 leading-relaxed line-clamp-3">{desc}</p>
         <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all">
            Połącz Teraz <ArrowRight size={14} />
         </button>
      </div>
   );
}

