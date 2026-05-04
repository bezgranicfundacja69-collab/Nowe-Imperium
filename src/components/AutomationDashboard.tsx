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
  { id: 'all', name: 'Allegro PL', region: 'pl', type: 'Marketplace', coverage: 'Polska/EU', desc: 'Największy marketplace w Polsce. Pełna integracja SMART.' },
  { id: 'ama', name: 'Amazon Global', region: 'int', type: 'Marketplace', coverage: 'Global', desc: 'Sprzedaż na rynkach zachodnich z logistyką FBA.' },
  { id: 'ali', name: 'AliExpress Hub', region: 'int', type: 'Sourcing', coverage: 'Chiny/Global', desc: 'Bezpośredni import z Chin z darmową dostawą AI.' },
  { id: 'bay', name: 'eBay Sync', region: 'int', type: 'Marketplace', coverage: 'Global', desc: 'Globalna sprzedaż przedmiotów kolekcjonerskich i tech.' },
];

export function AutomationDashboard() {
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
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
                alt="Automation" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-400 border border-blue-500/30">
                <Cpu size={14} className="animate-spin-slow" /> Alpinator v4.2
              </div>
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-7xl mb-6">
              Hiper <span className="text-blue-500">Automatyzacja</span>
            </h1>
            <p className="text-slate-400 max-w-lg text-xl font-medium leading-relaxed italic">
              Zintegrowany dropshipping i faktoring z bezpośrednim podglądem baz rynkowych.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white/5 backdrop-blur-3xl rounded-[40px] p-10 border border-white/10 shadow-2xl">
            <p className="text-xs uppercase font-black tracking-[0.3em] text-slate-500">Saldo OmniCash</p>
            <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              {formatPrice(wallet?.balance || 0)}
            </p>
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
              <TrendingUp size={14} /> +0.01 PLN / 10s
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Marketplace Connectors */}
          <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                <Globe size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">OmniConnect Bases</h2>
                <p className="text-sm font-bold text-slate-400">Podgląd i integracja światowych marketplace.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
               {SHOPS.map(shop => (
                 <div 
                  key={shop.id} 
                  onClick={() => setPreviewShop(shop)}
                  className="p-6 rounded-[32px] border border-slate-50 bg-slate-50/50 hover:border-blue-200 transition-all group cursor-pointer"
                 >
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                         <Store size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <span className="px-2 py-1 rounded bg-blue-100 text-[8px] font-black uppercase text-blue-600">ZINTEGROWANO</span>
                    </div>
                    <h3 className="font-black text-slate-900 mb-1">{shop.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 group-hover:text-blue-500 transition-colors">Kliknij aby zobaczyć bazę</p>
                    <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase">
                      <Eye size={12} /> Live Preview Aktywny
                    </div>
                 </div>
               ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-50">
               <button 
                onClick={handleAutoImport}
                disabled={importing}
                className="flex items-center gap-3 rounded-2xl px-10 py-5 text-sm font-black uppercase tracking-widest bg-blue-600 text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50"
               >
                 {importing ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
                 Synchronizuj Wszystkie Bazy
               </button>
            </div>
          </section>

          {/* Market Insights & Charts */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <BarChartIcon className="text-blue-600" size={24} /> Wyniki Bota
                    </h2>
                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">LIVE</span>
                </div>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={PERFORMANCE_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
                            <YAxis hide />
                            <ChartTooltip 
                                cursor={{fill: '#f8fafc'}}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="profit" radius={[6, 6, 0, 0]}>
                                {PERFORMANCE_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === PERFORMANCE_DATA.length - 1 ? '#3b82f6' : '#e2e8f0'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
                    <Activity className="text-blue-600" size={24} /> Nasycenie Rynku
                </h2>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MARKET_RADAR_DATA}>
                            <PolarGrid stroke="#f1f5f9" />
                            <PolarAngleAxis dataKey="subject" tick={{fontSize: 8, fill: '#94a3b8', fontWeight: 700}} />
                            <PolarRadiusAxis hide />
                            <Radar
                                name="Rynki"
                                dataKey="A"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.5}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </section>

          <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm overflow-hidden">
             <div className="flex items-center gap-4 mb-8">
               <Database className="text-blue-500" size={32} />
               <h2 className="text-2xl font-black text-slate-900">Eksplorator Trendów AI</h2>
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
           <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl">
             <h3 className="font-black text-slate-400 uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
                <Brain size={14} className="text-blue-500" /> OmniCore AI Status
             </h3>
             <div className="space-y-6">
                <StatusItem label="Przetwarzanie Baz" value="98.2%" active />
                <StatusItem label="Arbitraż Cenowy" value="Aktywny" active />
                <StatusItem label="Auto-Faktoring" value="Gotowy" active />
             </div>
           </div>

           <div className="bg-blue-600 rounded-[40px] p-10 text-white shadow-xl">
             <h4 className="text-xl font-black mb-4">Dochód Pasywny</h4>
             <div className="text-3xl font-black mb-6">{formatPrice(wallet?.balance || 0)}</div>
             <button onClick={() => setAutoEarning(!autoEarning)} className="w-full py-4 rounded-2xl bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
               {autoEarning ? 'Zatrzymaj Boty' : 'Uruchom Boty'}
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[48px] overflow-hidden shadow-2xl h-[600px] flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-600 rounded-2xl text-white flex items-center justify-center">
                    <Store size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{previewShop.name}</h3>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{previewShop.coverage}</p>
                  </div>
                </div>
                <button onClick={() => setPreviewShop(null)} className="text-slate-400 hover:text-slate-900 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                 <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                    <p className="text-sm font-bold text-blue-900 mb-2">Opis Bazy</p>
                    <p className="text-xs text-blue-600 leading-relaxed font-medium">{previewShop.desc}</p>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Ostatnio Zaimportowane Produkty (Live)</p>
                    <div className="grid grid-cols-2 gap-4">
                       <MarketItem name="iPhone 15 Pro" price="4,999 PLN" margin="+15%" />
                       <MarketItem name="Nike Air Max" price="450 PLN" margin="+22%" />
                       <MarketItem name="Smart Watch V2" price="120 PLN" margin="+45%" />
                       <MarketItem name="Drone Pro 4K" price="1,200 PLN" margin="+18%" />
                    </div>
                 </div>

                 <div className="p-6 rounded-3xl bg-slate-900 text-white flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">Status Automatyzacji</p>
                      <p className="text-sm font-black">Pełna Alpinacja Aktywna</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                 </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                 <button className="w-full py-5 bg-blue-600 text-white rounded-[24px] text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                    Otwórz Panel Konfiguracyjny Bazy
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
    <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
       <div className="flex items-center justify-between mb-4">
         <h4 className="text-sm font-black text-slate-900">{title}</h4>
         <span className="text-[8px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full">{trend}</span>
       </div>
       <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Bazy</p>
            <p className="text-xs font-black">{items}</p>
          </div>
          <div>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Marża</p>
            <p className="text-xs font-black text-green-600">+{avgMargin}</p>
          </div>
       </div>
    </div>
  );
}

function MarketItem({ name, price, margin }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all">
       <div>
         <p className="text-[10px] font-black text-slate-800">{name}</p>
         <p className="text-[10px] font-bold text-blue-600">{price}</p>
       </div>
       <span className="text-[8px] font-black text-green-600">{margin}</span>
    </div>
  );
}

function StatusItem({ label, value, active }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <span className={cn("text-xs font-black uppercase tracking-tighter", active ? "text-blue-400" : "text-slate-600")}>{value}</span>
    </div>
  );
}
