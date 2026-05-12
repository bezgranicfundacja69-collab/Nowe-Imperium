import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { autoImportProducts } from '../services/automationService';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { 
  Zap, 
  TrendingUp, 
  Brain, 
  Globe, 
  Rocket,
  Flame,
  RefreshCw,
  Cpu,
  Link as LinkIcon,
  ShieldCheck,
  CreditCard,
  Network,
  Database,
  Search,
  ShoppingCart,
  Languages,
  Layers,
  ChevronRight,
  ExternalLink,
  Store,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  X,
  Eye,
  BarChart as BarChartIcon,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice, cn } from '../lib/utils';
import { CATEGORIES } from '../constants/categories';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer,
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  Cell
} from 'recharts';

const PERFORMANCE_DATA = [
  { name: '08:00', profit: 45 },
  { name: '10:00', profit: 52 },
  { name: '12:00', profit: 48 },
  { name: '14:00', profit: 70 },
  { name: '16:00', profit: 61 },
  { name: '18:00', profit: 55 },
  { name: '20:00', profit: 67 },
];

const MARKET_RADAR_DATA = [
  { subject: 'Elektronika', A: 120, fullMark: 150 },
  { subject: 'Moda', A: 98, fullMark: 150 },
  { subject: 'Dom', A: 86, fullMark: 150 },
  { subject: 'Uroda', A: 99, fullMark: 150 },
  { subject: 'Sport', A: 85, fullMark: 150 },
  { subject: 'Motoryzacja', A: 65, fullMark: 150 },
];

type Language = 'pl' | 'en' | 'de' | 'fr' | 'es';

const SHOPS = [
  { id: 'aliexpress', name: 'AliExpress Global', region: 'int', type: 'Sourcing', coverage: 'Chiny/Global', desc: 'Bezpośredni dostęp do bazy producentów z Chin. Automatyczny import dropshipping v2.0.' },
  { id: 'temu', name: 'Temu Enterprise', region: 'int', type: 'Marketplace', coverage: 'Global', desc: 'Najszybciej rosnący marketplace świata. Pełna integracja z logistyką Alpinator.' },
  { id: 'amazon', name: 'Amazon FBA Hub', region: 'int', type: 'Marketplace', coverage: 'Global', desc: 'Zarządzaj zapasami Amazon FBA bezpośrednio z panelu noweimperium.' },
  { id: 'vinted', name: 'Vinted Alpha', region: 'eu', type: 'C2C', coverage: 'Europe', desc: 'Automatyzacja wyszukiwania okazji i relisting w modelu arbitrage fashion.' },
  { id: 'ebay', name: 'eBay Global Reach', region: 'int', type: 'Marketplace', coverage: 'Global', desc: 'Integracja z największym rynkiem aukcyjnym świata. Automatyczne licytacje AI.' },
  { id: 'etsy', name: 'Etsy Creative', region: 'int', type: 'Handmade', coverage: 'Global', desc: 'Rynek unikalnych produktów. Synchronizacja niszowych baz rynkowych.' },
  { id: 'allegro', name: 'Allegro Enterprise', region: 'pl', type: 'Marketplace', coverage: 'Polska/EU', desc: 'Największy marketplace w Polsce. Pełna integracja SMART i Allegro Lokalnie.' },
  { id: 'olx', name: 'OLX Business', region: 'pl', type: 'Classifieds', coverage: 'Poland', desc: 'Automatyczne wystawianie i zarządzanie ogłoszeniami lokalnymi.' },
];

import { ViewProps } from '../types/view';

export function AutomationDashboard({ onNavigate, cart }: ViewProps) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [importing, setImporting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Elektronika');
  const [autoEarning, setAutoEarning] = useState(true);
  const [language, setLanguage] = useState<Language>('pl');
  const [previewShop, setPreviewShop] = useState<any | null>(null);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, 'wallets', user.uid), (doc) => {
      if (doc.exists()) setWallet(doc.data());
    }, (error) => {
      console.error("AutomationDashboard wallet error:", error);
    });
    return unsub;
  }, [user]);

  useEffect(() => {
    if (!autoEarning || !user) return;
    const interval = setInterval(async () => {
      const walletRef = doc(db, 'wallets', user.uid);
      try {
        await setDoc(walletRef, {
          balance: increment(0.01),
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, `wallets/${user.uid}`);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [autoEarning, user]);

  const handleAutoImport = async () => {
    if (!user) return;
    setImporting(true);
    try {
      await autoImportProducts(selectedCategory, user.uid);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setImporting(false), 2000);
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[3rem] bg-prestige-950 p-10 text-white shadow-2xl sm:p-20 group min-h-[420px] flex items-center border border-white/5">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
                alt="Automation" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-[2000ms] group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-prestige-950 via-prestige-950/60 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between w-full gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-10">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-accent-indigo/10 px-5 py-2 text-[10px] font-technical font-bold uppercase tracking-[0.3em] text-accent-indigo border border-accent-indigo/20 backdrop-blur-md">
                <Cpu size={14} className="animate-pulse" /> Alpinator Enterprise v4.2
              </div>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter sm:text-7xl mb-8 uppercase italic leading-none">
              Hyper <span className="text-accent-indigo">Automation</span>
            </h1>
            <p className="text-prestige-400 max-w-md text-lg font-medium leading-relaxed italic border-l-2 border-accent-indigo/30 pl-6">
              Zintegrowany dropshipping i faktoring z bezpośrednim podglądem baz rynkowych.
            </p>
          </div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-12 border border-white/10 shadow-3xl min-w-[280px]"
          >
            <p className="text-[10px] uppercase font-technical font-bold tracking-[0.3em] text-prestige-500 mb-2">noweCash Flow</p>
            <p className="text-6xl font-display font-black text-prestige-50 tracking-tighter">
              {formatPrice(wallet?.balance || 0)}
            </p>
            <div className="flex items-center gap-2 text-accent-emerald text-[10px] font-technical font-bold uppercase tracking-widest mt-2 px-3 py-1 bg-accent-emerald/10 rounded-full">
              <TrendingUp size={12} /> +0.01 PLN / 10s
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          {/* Marketplace Connectors */}
          <section className="bg-white rounded-[2.5rem] border border-prestige-200 p-12 shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-5 mb-12">
              <div className="h-14 w-14 rounded-2xl bg-prestige-50 text-accent-indigo flex items-center justify-center shadow-inner border border-prestige-100">
                <Globe size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold text-prestige-950 tracking-tight">noweConnect Bases</h2>
                <p className="text-sm font-medium text-prestige-400 italic">Podgląd i integracja światowych marketplace.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
               {SHOPS.map(shop => (
                 <div 
                  key={shop.id} 
                  onClick={() => setPreviewShop(shop)}
                  className="p-8 rounded-[2rem] border border-prestige-100 bg-prestige-50/30 hover:border-accent-indigo/30 hover:bg-white hover:shadow-xl hover:shadow-prestige-200/50 transition-all group cursor-pointer"
                 >
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-prestige-100">
                         <Store size={22} className="text-prestige-400 group-hover:text-accent-indigo transition-colors" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-accent-indigo/10 text-[9px] font-technical font-bold uppercase tracking-widest text-accent-indigo">CONNECTED</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-prestige-950 mb-1">{shop.name}</h3>
                    <p className="text-[10px] font-technical font-bold text-prestige-400 uppercase tracking-widest mb-6 group-hover:text-accent-indigo transition-colors">In-depth database analysis</p>
                    <div className="flex items-center gap-2 text-[9px] font-technical font-bold text-prestige-500 uppercase tracking-tighter">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
                      Live Feed Active
                    </div>
                 </div>
               ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-prestige-100">
               <button 
                onClick={handleAutoImport}
                disabled={importing}
                className="prestige-button-primary !py-5 !px-12 !rounded-2xl shadow-xl shadow-accent-indigo/20 w-full sm:w-auto"
               >
                 {importing ? <RefreshCw className="animate-spin mr-3" size={20} /> : <Search className="mr-3" size={20} />}
                 Sync Enterprise Repositories
               </button>
            </div>
          </section>

          {/* Market Insights & Charts */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] border border-prestige-200 p-10 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-prestige-950 tracking-tight">Bot Output</h2>
                      <p className="text-xs text-prestige-400 font-medium italic mt-1">Real-time revenue monitoring</p>
                    </div>
                    <span className="text-[9px] font-technical font-bold text-accent-emerald bg-accent-emerald/10 px-3 py-1 rounded-full tracking-widest uppercase">LIVE TRACK</span>
                </div>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={PERFORMANCE_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                            <YAxis hide />
                            <ChartTooltip 
                                cursor={{fill: '#f8fafc'}}
                                contentStyle={{ borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)', backgroundColor: 'white' }}
                            />
                            <Bar dataKey="profit" radius={[6, 6, 0, 0]}>
                                {PERFORMANCE_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === PERFORMANCE_DATA.length - 1 ? '#4338ca' : '#e2e8f0'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-prestige-200 p-10 shadow-sm">
                <div className="mb-10">
                  <h2 className="text-2xl font-display font-bold text-prestige-950 tracking-tight">Market Saturation</h2>
                  <p className="text-xs text-prestige-400 font-medium italic mt-1">Global niche analysis</p>
                </div>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MARKET_RADAR_DATA}>
                            <PolarGrid stroke="#f1f5f9" />
                            <PolarAngleAxis dataKey="subject" tick={{fontSize: 8, fill: '#94a3b8', fontWeight: 700}} />
                            <PolarRadiusAxis hide />
                            <Radar
                                name="Rynki"
                                dataKey="A"
                                stroke="#4338ca"
                                fill="#4338ca"
                                fillOpacity={0.15}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] border border-prestige-200 p-12 shadow-sm overflow-hidden border-b-8 border-b-accent-indigo">
             <div className="flex items-center gap-5 mb-10">
               <div className="h-12 w-12 rounded-xl bg-prestige-50 flex items-center justify-center text-accent-indigo">
                 <Database size={28} />
               </div>
               <div>
                  <h2 className="text-2xl font-display font-bold text-prestige-950 tracking-tight">Eksplorator Trendów AI</h2>
                  <p className="text-xs text-prestige-400 font-medium italic">Globalne dane trendowe v3.0</p>
               </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <MarketInsight title="Rynek USA" trend="UP" items="2.4M" avgMargin="18%" />
                <MarketInsight title="Rynek EU" trend="STABLE" items="5.1M" avgMargin="14%" />
                <MarketInsight title="Rynek Azja" trend="BOOM" items="12.8M" avgMargin="24%" />
             </div>
          </section>
        </div>

        {/* Sidebar / Stats */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-prestige-950 rounded-[2.5rem] p-10 text-white shadow-2xl border border-white/5">
             <h3 className="font-technical font-bold text-prestige-500 uppercase tracking-[0.3em] text-[10px] mb-10 flex items-center gap-2">
                <Brain size={14} className="text-accent-indigo" /> System Core Health
             </h3>
             <div className="space-y-8">
                <StatusItem label="Database Indexing" value="98.2%" active />
                <StatusItem label="Price Arbitrage" value="Active" active />
                <StatusItem label="Cloud Logistics" value="Enterprise" active />
             </div>
           </div>

           <div className="bg-accent-indigo rounded-[2.5rem] p-10 text-white shadow-xl group hover:scale-[1.02] transition-transform">
             <h4 className="text-xl font-display font-bold mb-3 tracking-tight">Passive Income Bot</h4>
             <div className="text-4xl font-display font-black mb-10 tracking-tighter">{formatPrice(wallet?.balance || 0)}</div>
             <button 
                onClick={() => setAutoEarning(!autoEarning)} 
                className="w-full py-5 rounded-2xl bg-white/10 backdrop-blur-md text-white text-[10px] font-technical font-bold uppercase tracking-widest hover:bg-white hover:text-accent-indigo transition-all border border-white/10"
             >
               {autoEarning ? 'Shutdown Automation' : 'Ignite System'}
             </button>
           </div>
        </aside>
      </div>

      {/* Shop Preview Modal */}
      <AnimatePresence>
        {previewShop && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setPreviewShop(null)}
              className="absolute inset-0 bg-prestige-950/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-[3.5rem] overflow-hidden shadow-3xl h-[640px] flex flex-col border border-prestige-200"
            >
              <div className="p-10 border-b border-prestige-100 flex items-center justify-between bg-prestige-50/50">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 bg-accent-indigo rounded-[1.25rem] text-white flex items-center justify-center shadow-lg shadow-accent-indigo/20">
                    <Store size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-prestige-950 tracking-tight">{previewShop.name}</h3>
                    <p className="text-[10px] font-technical font-bold text-accent-indigo uppercase tracking-widest">{previewShop.coverage}</p>
                  </div>
                </div>
                <button 
                    onClick={() => setPreviewShop(null)} 
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-prestige-200/50 text-prestige-500 hover:bg-rose-50 hover:text-rose-600 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8">
                 <div className="bg-prestige-50 p-8 rounded-[2rem] border border-prestige-100 relative group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap size={40} className="text-accent-indigo" />
                    </div>
                    <p className="text-[10px] font-technical font-bold text-prestige-400 uppercase tracking-widest mb-3">Enterprise Abstract</p>
                    <p className="text-sm text-prestige-950 leading-relaxed font-medium italic">{previewShop.desc}</p>
                 </div>

                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-technical font-bold uppercase text-prestige-400 tracking-widest">Global Live Feed</p>
                        <div className="flex items-center gap-2">
                             <div className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
                             <span className="text-[9px] font-technical font-bold text-accent-emerald uppercase tracking-tighter">Real-time data flow</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <MarketItem name="iPhone 15 Pro" price="4,999 PLN" margin="+15%" />
                       <MarketItem name="Nike Air Max" price="450 PLN" margin="+22%" />
                       <MarketItem name="Smart Watch V2" price="120 PLN" margin="+45%" />
                       <MarketItem name="Drone Pro 4K" price="1,200 PLN" margin="+18%" />
                    </div>
                 </div>

                 <div className="p-8 rounded-[2rem] bg-prestige-950 text-white flex items-center justify-between shadow-xl">
                    <div>
                      <p className="text-[9px] font-technical font-bold uppercase tracking-[0.2em] text-prestige-500 mb-1">Automation Status</p>
                      <p className="text-base font-display font-bold tracking-tight">Full Alpination System Active</p>
                    </div>
                    <div className="h-3 w-3 rounded-full bg-accent-emerald shadow-[0_0_15px_rgba(52,211,153,0.5)] animate-pulse" />
                 </div>
              </div>

              <div className="p-10 border-t border-prestige-100 bg-prestige-50/50">
                 <button className="prestige-button-primary w-full !py-5 !rounded-2xl shadow-xl shadow-accent-indigo/20">
                    Open Advanced Control Panel
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MarketInsight({ title, trend, items, avgMargin }: any) {
  return (
    <div className="p-8 rounded-[2rem] bg-prestige-50/50 border border-prestige-100 hover:bg-white hover:shadow-lg transition-all group">
       <div className="flex items-center justify-between mb-6">
         <h4 className="text-[11px] font-technical font-bold uppercase tracking-widest text-prestige-950">{title}</h4>
         <span className={cn(
             "text-[9px] font-technical font-bold px-3 py-1 rounded-full",
             trend === 'BOOM' ? "bg-accent-emerald/10 text-accent-emerald" : "bg-accent-indigo/10 text-accent-indigo"
         )}>{trend}</span>
       </div>
       <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[9px] font-technical font-bold text-prestige-400 uppercase tracking-tighter mb-1">Total Assets</p>
            <p className="text-lg font-display font-bold text-prestige-950 tracking-tight">{items}</p>
          </div>
          <div>
            <p className="text-[9px] font-technical font-bold text-prestige-400 uppercase tracking-tighter mb-1">Avg. Margin</p>
            <p className="text-lg font-display font-bold text-accent-emerald tracking-tight">{avgMargin}</p>
          </div>
       </div>
    </div>
  );
}

function MarketItem({ name, price, margin }: any) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-prestige-100 shadow-sm flex items-center justify-between hover:border-accent-indigo/20 transition-all group">
       <div>
         <p className="text-xs font-display font-bold text-prestige-800 tracking-tight group-hover:text-prestige-950">{name}</p>
         <p className="text-[10px] font-technical font-bold text-accent-indigo tracking-wider mt-0.5">{price}</p>
       </div>
       <span className="text-[10px] font-technical font-bold text-accent-emerald bg-accent-emerald/5 px-2 py-0.5 rounded-md">{margin}</span>
    </div>
  );
}

function StatusItem({ label, value, active }: any) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-technical font-bold uppercase tracking-widest text-prestige-500">{label}</span>
        <span className={cn("text-[10px] font-technical font-bold uppercase tracking-tighter", active ? "text-accent-indigo" : "text-prestige-700")}>{value}</span>
      </div>
      <div className="h-1.5 w-full bg-prestige-900 rounded-full overflow-hidden">
         <motion.div 
            initial={{ width: 0 }}
            animate={{ width: active ? '100%' : '0%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-accent-indigo" 
         />
      </div>
    </div>
  );
}
