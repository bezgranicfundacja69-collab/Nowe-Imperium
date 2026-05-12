import { motion } from 'motion/react';
import { 
  Share2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  ExternalLink,
  Zap,
  ShoppingBag,
  Layers,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

const PLATFORMS = [
  { 
    id: 'allegro', 
    name: 'Allegro', 
    color: 'bg-[#ff5a00]', 
    logo: 'A',
    status: 'Aktywny',
    items: 45,
    lastSync: '2 min temu',
    reach: 'Polska',
    type: 'local'
  },
  { 
    id: 'ebay', 
    name: 'eBay Global', 
    color: 'bg-[#0064d2]', 
    logo: 'E',
    status: 'Gotowy do połączenia',
    items: 0,
    lastSync: '-',
    reach: 'Global / USA / EU',
    type: 'global'
  },
  { 
    id: 'vinted', 
    name: 'Vinted', 
    color: 'bg-[#007782]', 
    logo: 'V',
    status: 'Aktywny',
    items: 28,
    lastSync: '15 min temu',
    reach: 'Europa',
    type: 'global'
  },
  { 
    id: 'amazon', 
    name: 'Amazon FBA', 
    color: 'bg-[#232f3e]', 
    logo: 'A',
    status: 'Konfiguracja',
    items: 0,
    lastSync: '-',
    reach: 'Global / Multi-Warehouse',
    type: 'global'
  }
];

import { ViewProps } from '../types/view';

export function IntegrationsManager({ onNavigate, cart }: ViewProps) {
  const localPlatforms = PLATFORMS.filter(p => p.type === 'local');
  const globalPlatforms = PLATFORMS.filter(p => p.type === 'global');

  return (
    <div className="space-y-12 pb-20">
      {/* Aggressive Header */}
      <div className="relative overflow-hidden rounded-[48px] bg-black px-8 py-16 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=2070" 
                alt="Global Trade" 
                className="w-full h-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-indigo-600/20 to-transparent blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-2 backdrop-blur-xl border border-white/20">
            <Globe className="text-blue-400" size={18} />
            <span className="text-xs font-black uppercase tracking-widest text-blue-200">Global Sales & Export Hub</span>
          </div>
          <h1 className="mb-8 max-w-3xl text-5xl font-black leading-[0.9] sm:text-8xl italic tracking-tighter">
            EKSPORTUJ <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-black glow-text">BEZ GRANIC.</span>
          </h1>
          <p className="mb-12 max-w-xl text-xl font-medium leading-relaxed text-slate-400 italic">
            Zintegrowany system sprzedaży zagranicznej. Wystawiaj towary na rynkach UE, USA i Azji bezpośrednio z panelu noweimperium.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Platforms Grid */}
        <div className="lg:col-span-8 space-y-12">
            
            {/* National Section */}
            <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-4">Marketplace Krajowe</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {localPlatforms.map((p) => (
                        <PlatformCard key={p.id} p={p} />
                    ))}
                </div>
            </div>

            {/* Global Section */}
            <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-6 px-4 flex items-center gap-2">
                    <Globe size={16} /> Marketplace Zagraniczne
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {globalPlatforms.map((p) => (
                        <PlatformCard key={p.id} p={p} />
                    ))}
                </div>
            </div>
            
            <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group border border-blue-500/20">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <div className="h-14 w-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-xl border border-blue-500/30">
                            <RefreshCw size={28} className="text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-black mb-4 leading-tight italic">Auto-Tłumacz & Waluty AI</h2>
                        <p className="text-slate-400 font-medium mb-8">Nasz system automatycznie tłumaczy Twoje oferty na 24 języki i przelicza ceny wg kursów bankowych w czasie rzeczywistym.</p>
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30">
                            Konfiguruj Global AI
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Sidebar News/Tips */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
                <h3 className="font-black text-slate-900 text-lg mb-6 flex items-center gap-2 uppercase tracking-tighter">
                   <Layers size={20} className="text-blue-600" /> Kolejne Integracje
                </h3>
                <div className="space-y-4">
                    {['Etsy Handmade', 'TikTok Shop Global', 'Shopee Asia', 'Rakuten Japan', 'Mercari USA'].map((s) => (
                        <div key={s} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-not-allowed group">
                            <span className="text-sm font-bold text-slate-600">{s}</span>
                            <span className="text-[8px] font-black bg-slate-200 text-slate-500 px-2 py-1 rounded-md uppercase">Wkrótce</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-emerald-600 rounded-[40px] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="text-xl font-black mb-2 italic tracking-tighter">OSZCZĘDNOŚĆ NA PRZEWALUTOWANIU</h3>
                    <p className="text-4xl font-black mb-6">DO -5%</p>
                    <p className="text-emerald-100 text-xs font-bold leading-relaxed mb-6">noweimperium używa kont wielowalutowych, eliminując wysokie prowizje bankowe przy sprzedaży zagranicznej.</p>
                    <div className="h-1 bg-white/20 rounded-full w-full mb-2">
                        <div className="h-full bg-white rounded-full w-3/4" />
                    </div>
                    <p className="text-[10px] font-black uppercase text-white/60">Status: Konta aktywne</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ p }: { p: any; key?: string }) {
    return (
        <motion.div 
            key={p.id}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
        >
            <div className="flex items-start justify-between mb-8">
                <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg", p.color)}>
                    {p.logo}
                </div>
                <div className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
                    p.status.includes('Aktywny') ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                )}>
                    {p.status.includes('Aktywny') ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                    {p.status}
                </div>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-2">{p.name}</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">{p.reach}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Oferty</p>
                    <p className="text-xl font-black text-slate-900">{p.items}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Ostatnia Sync</p>
                    <p className="text-xl font-black text-blue-600">{p.lastSync}</p>
                </div>
            </div>
            
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
               {p.status === 'Gotowy do połączenia' ? 'Połącz Konto' : 'Zarządzaj'} <ArrowUpRight size={14} />
            </button>
        </motion.div>
    );
}
