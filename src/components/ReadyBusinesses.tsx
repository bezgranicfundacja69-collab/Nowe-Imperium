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
  Cpu
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getReadyMadeBusinesses, ReadyMadeStore } from '../services/readyMadeStoreService';

export function ReadyBusinesses() {
  const [businesses, setBusinesses] = useState<ReadyMadeStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

      {/* Integration Hub - New Section */}
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
            desc="Masz sklep na Shopify? Wyeksportuj go jednym kliknięciem do OmniMarket i znajdź inwestora."
            color="emerald"
            icon={<Globe />}
         />
      </section>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-4 z-40 backdrop-blur-xl bg-white/80">
         <div className="flex flex-wrap items-center gap-2">
            {['all', 'shoper', 'shopify', 'dropshipping', 'saas'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filtered.map((store) => (
              <motion.div
                key={store.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={store.image} 
                    alt={store.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                       <ShieldCheck size={12} className="text-blue-400" />
                       <span className="text-[10px] font-black text-white uppercase tracking-tighter">AI Verified Model</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{store.platform} • {store.category}</span>
                     <span className="text-lg font-black italic text-slate-900">{store.price.toLocaleString()} PLN</span>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 mb-4 italic leading-none truncate">{store.title}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2 italic leading-relaxed">
                    {store.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Przychód/mc</span>
                        <span className="text-md font-black text-slate-900 italic">~{store.monthlyRevenue?.toLocaleString()} PLN</span>
                     </div>
                     <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Zysk/mc</span>
                        <span className="text-md font-black text-emerald-700 italic">~{store.monthlyProfit?.toLocaleString()} PLN</span>
                     </div>
                  </div>

                  <div className="space-y-2 mb-8 flex-1">
                     {store.features.slice(0, 3).map((f, idx) => (
                       <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                          <CheckCircle2 size={12} className="text-emerald-500" /> {f}
                       </div>
                     ))}
                  </div>

                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/30">
                     Szczegóły Przejęcia <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Action Footer */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <Rocket size={300} />
         </div>
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-xl">
               <h2 className="text-4xl font-black mb-6 italic leading-tight uppercase tracking-tighter">Wystaw Swój Sklep na Sprzedaż</h2>
               <p className="text-indigo-100 text-lg font-medium leading-relaxed italic mb-8">Masz działający biznes e-commerce, stronę SaaS lub gotowy model dropshippingowy? Sprzedaj go błyskawicznie inwestorom z OmniMarket.</p>
               <div className="flex justify-center lg:justify-start gap-4">
                  <div className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                     <Database size={14} /> 1.2k Inwestorów
                  </div>
                  <div className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck size={14} /> Escrow Protection
                  </div>
               </div>
            </div>
            <button className="px-12 py-6 bg-white text-indigo-600 rounded-[32px] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-900/20 flex items-center gap-3">
               <PlusCircle size={20} /> Dodaj Ofertę Biznesu
            </button>
         </div>
      </section>
    </div>
  );
}

function IntegrationBadge({ icon, label }: { icon: any, label: string }) {
   return (
      <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors">
         <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
            {icon}
         </div>
         <p className="text-sm font-bold">{label}</p>
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
      <div className={cn("p-8 rounded-[40px] border transition-all hover:shadow-xl group", colors[color])}>
         <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {icon}
         </div>
         <h4 className="text-lg font-black italic mb-2">{title}</h4>
         <p className="text-xs font-medium text-slate-500 italic mb-6 leading-relaxed">{desc}</p>
         <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all">
            Połącz Teraz <ArrowRight size={14} />
         </button>
      </div>
   );
}
