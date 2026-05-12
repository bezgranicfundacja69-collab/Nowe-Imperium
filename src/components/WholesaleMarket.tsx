import { 
  Database, 
  Globe, 
  PackageCheck, 
  PieChart, 
  Truck, 
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  Layers,
  Zap,
  Users,
  Target,
  TrendingUp,
  Video,
  ExternalLink,
  Play,
  Bot
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState } from 'react';

const WHOLESALERS = [
  { id: 'wh1', name: 'EuroGhurt Polska', type: 'Polski', category: 'Rolnictwo', integration: 'Allegro, Erpify', margin: '15-25%', link: 'https://euroghurt.pl' },
  { id: 'wh2', name: 'GlobalDrop China', type: 'Zagraniczny', category: 'Elektronika', integration: 'eBay, Amazon', margin: '40-60%', link: 'https://globaldrop.cn' },
  { id: 'wh3', name: 'FashionFlow EU', type: 'Zagraniczny', category: 'Odzież', integration: 'Shopify, Etsy', margin: '30-45%', link: 'https://fashionflow.eu' },
  { id: 'wh4', name: 'AgroTech Hurt', type: 'Polski', category: 'Rolnictwo', integration: 'Direct, Local', margin: '10-20%', link: 'https://agrotech.pl' },
  { id: 'wh5', name: 'AliExpress Direct', type: 'Zagraniczny', category: 'General', integration: 'API, Scraping', margin: '50-80%', link: 'https://aliexpress.com' },
  { id: 'wh6', name: 'Temu Global', type: 'Zagraniczny', category: 'General', integration: 'Direct, App', margin: '60-90%', link: 'https://temu.com' }
];

const AFFILIATE_PROGRAMS = [
  { id: 'af1', name: 'MyLead Global', commission: 'CPA/CPL/CPS', status: 'Aktywny', logo: 'ML' },
  { id: 'af2', name: 'WebPartners Network', commission: '15-25% CPS', status: 'Zintegrowany', logo: 'WP' },
  { id: 'af3', name: 'Awin International', commission: 'Custom Commission', status: 'Wymaga Konta', logo: 'AW' },
  { id: 'af5', name: 'Google AdSense', commission: 'CPC/CPM Revenue', status: 'Gotowy do AI', logo: 'G' },
  { id: 'af6', name: 'Microsoft Ads', commission: 'High CPC Tiers', status: 'W trakcie AI', logo: 'M' },
  { id: 'af4', name: 'nowe Ads Referral', commission: '10% Revenue Share', status: 'Premium', logo: 'NA' }
];

const VIDEO_CHANNELS = [
  { id: 'v1', title: 'Strategie Skalowania 2026', author: 'Ekspert noweimperium', duration: '12:45', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400' },
  { id: 'v2', title: 'Automatyzacja MyLead', author: 'Affiliate Pro', duration: '08:20', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400' },
  { id: 'v3', title: 'Export na Rynki USA', author: 'Global Seller', duration: '15:10', thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=400' }
];

import { ViewProps } from '../types/view';

interface WholesaleMarketProps extends ViewProps {
  onViewChange?: (view: any) => void;
}

export function WholesaleMarket({ onViewChange, onNavigate, cart }: WholesaleMarketProps) {
  const [activeTab, setActiveTab] = useState<'market' | 'affiliate' | 'video'>('market');

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1586528116311-ad86d7c49b6b?auto=format&fit=crop&q=80&w=2070" 
                alt="Wholesale Market" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono backdrop-blur-md">
              <Layers size={14} /> Wholesale & Dropshipping Solutions
            </div>
            <h1 className="text-4xl font-black text-white mb-6 sm:text-6xl italic leading-tight tracking-tighter">
              Partner Hub <br /> & <span className="text-blue-400">Marketing</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-xl font-medium leading-relaxed">Hurtownie, sieci afiliacyjne MyLead/WebPartners i kanały edukacyjne w jednym miejscu.</p>
          </div>
          
          <div className="flex bg-slate-800/50 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5">
            <button 
                onClick={() => setActiveTab('market')}
                className={cn("px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'market' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-white")}
            >
                Rynek Hurtowy
            </button>
            <button 
                onClick={() => setActiveTab('affiliate')}
                className={cn("px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'affiliate' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-white")}
            >
                Afiliacja
            </button>
            <button 
                onClick={() => setActiveTab('video')}
                className={cn("px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'video' ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-white")}
            >
                <div className="flex items-center gap-2 italic"><Video size={12} /> Kanały Video</div>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'market' ? (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<PackageCheck />} label="Aktywne Hurtownie" value="1,240" color="blue" />
                <StatCard icon={<Truck />} label="Średni Czas Dostawy" value="24-48h" color="emerald" />
                <StatCard icon={<Globe />} label="Rynki Zagraniczne" value="45 Krajów" color="purple" />
                <StatCard icon={<Zap />} label="Auto-Integracje" value="15 Platform" color="amber" />
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Katalog Dostawców</h2>
                        <p className="text-sm text-slate-500 font-medium">Topowe hurtownie dropshippingowe zintegrowane z noweimperium.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase">Filtruj: Polska</span>
                        <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase">Filtruj: Zagranica</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Nazwa Hurtowni</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Pochodzenie</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Kategoria</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Marża (Śr.)</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Integracje</th>
                                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {WHOLESALERS.map((wh) => (
                                <tr key={wh.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-black text-xs">
                                                {wh.name.substring(0, 2)}
                                            </div>
                                            <span className="font-bold text-slate-800">{wh.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter", wh.type === 'Polski' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600")}>
                                            {wh.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-medium text-slate-600">{wh.category}</td>
                                    <td className="px-8 py-6 text-sm font-black text-emerald-600">{wh.margin}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-1">
                                            {wh.integration.split(', ').map((brand, i) => (
                                                <span key={i} className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{brand}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <a 
                                            href={(wh as any).link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="h-8 w-8 rounded-lg bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all hover:translate-x-1"
                                        >
                                            <ArrowRight size={14} />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900 italic flex items-center gap-2 px-4 uppercase tracking-tighter">
                   <Sparkles size={20} className="text-blue-600" /> Bestsellery Drop (AliExpress & Temu)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ProductMiniCard 
                        name="Smartwatch Ultra 2026" 
                        source="AliExpress" 
                        price="120 PLN" 
                        margin="+150%" 
                        img="https://images.unsplash.com/photo-1544117518-29657842ce44?auto=format&fit=crop&q=80&w=400"
                        link="https://aliexpress.com"
                    />
                    <ProductMiniCard 
                        name="Mini Projektor 4K" 
                        source="Temu" 
                        price="180 PLN" 
                        margin="+200%" 
                        img="https://images.unsplash.com/photo-1535016120720-40c646bebbdc?auto=format&fit=crop&q=80&w=400"
                        link="https://temu.com"
                    />
                    <ProductMiniCard 
                        name="Kamera Bezpieczeństwa AI" 
                        source="AliExpress" 
                        price="85 PLN" 
                        margin="+180%" 
                        img="https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=400"
                        link="https://aliexpress.com"
                    />
                    <ProductMiniCard 
                        name="Zestaw Vlogerski Pro" 
                        source="Temu" 
                        price="65 PLN" 
                        margin="+300%" 
                        img="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400"
                        link="https://temu.com"
                    />
                </div>
            </div>
        </div>
      ) : activeTab === 'affiliate' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <h2 className="text-2xl font-black text-slate-900 mb-6">Twój Dashboard Afiliacyjny</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                         <div className="bg-slate-50 p-6 rounded-2xl">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Obrót Partnerów</span>
                             <p className="text-2xl font-black text-slate-900 mt-2">12,450 PLN</p>
                         </div>
                         <div className="bg-slate-50 p-6 rounded-2xl">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Twoja prowizja</span>
                             <p className="text-2xl font-black text-blue-600 mt-2">1,867 PLN</p>
                         </div>
                         <div className="bg-slate-50 p-6 rounded-2xl">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aktywne Polecenia</span>
                             <p className="text-2xl font-black text-slate-900 mt-2">42</p>
                         </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-800 text-sm mb-4 italic uppercase tracking-widest">Zintegrowane Sieci</h3>
                        {AFFILIATE_PROGRAMS.map((prog) => (
                            <div key={prog.id} className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-[32px] hover:border-blue-200 transition-all group/card">
                                <div className="flex items-center gap-6">
                                    <div className={cn(
                                        "h-14 w-14 rounded-2xl shadow-sm flex items-center justify-center text-slate-900 font-black text-lg border border-slate-50 italic",
                                        prog.name.includes('Google') ? "bg-gradient-to-br from-blue-50 to-red-50 text-blue-600" : 
                                        prog.name.includes('Microsoft') ? "bg-emerald-50 text-emerald-600" : "bg-white"
                                    )}>
                                        {prog.logo}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-800 text-lg flex items-center gap-2">
                                          {prog.name}
                                          {prog.status === 'Aktywny' && <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />}
                                        </p>
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{prog.commission}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="hidden md:inline text-[10px] font-black text-slate-400 uppercase tracking-widest">{prog.status}</span>
                                    <button className="flex items-center gap-2 p-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all group-hover/card:scale-105 active:scale-95 shadow-lg shadow-slate-900/10">
                                        {prog.name.includes('Google') || prog.name.includes('Microsoft') ? 'Aktywuj Monetyzację' : 'Generuj Link'} <ExternalLink size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black mb-4 italic tracking-tighter uppercase">Monetyzacja AI: Big Tech Hub</h3>
                            <p className="text-blue-100 text-lg max-w-2xl mb-8 leading-relaxed font-medium">Połącz swój sklep noweimperium z Google AdSense i Microsoft Advertising. Boty AI automatycznie optymalizują rozmieszczenie reklam pod kątem CTR.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                                <div className="p-6 bg-white/10 rounded-[32px] border border-white/20 backdrop-blur-md">
                                    <h4 className="font-black text-xl mb-2 flex items-center gap-2">
                                        <div className="h-2 w-2 bg-white rounded-full" /> Google Ads / AdSense
                                    </h4>
                                    <p className="text-xs text-blue-100 font-bold uppercase tracking-widest">Wypłaty co 30 dni • Bonus AI $100</p>
                                </div>
                                <div className="p-6 bg-white/10 rounded-[32px] border border-white/20 backdrop-blur-md">
                                    <h4 className="font-black text-xl mb-2 flex items-center gap-2">
                                        <div className="h-2 w-2 bg-white rounded-full" /> Microsoft Advertising
                                    </h4>
                                    <p className="text-xs text-blue-100 font-bold uppercase tracking-widest">Wysoki CPC • Dedykowany Account AI</p>
                                </div>
                            </div>
                            <button className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">
                                Konfiguruj Monetyzację Globalną
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="space-y-8">
                <div 
                    onClick={() => onViewChange?.('affiliate-bot')}
                    className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden group border border-indigo-500/20 mb-4 cursor-pointer hover:scale-[1.02] transition-transform"
                >
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-white/10 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                    <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                      <Bot size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 leading-tight italic">AI Bot Afiliacyjny</h3>
                    <p className="text-indigo-100 text-sm mb-8 leading-relaxed font-medium">Uruchom dedykowanego bota, który automatycznie znajdzie niszowe oferty i wygeneruje treści promocyjne.</p>
                    <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/20">
                        Otwórz Agenta AI
                    </button>
                </div>

                <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group border border-blue-500/20">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                    <div className="h-14 w-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
                      <TrendingUp size={28} className="text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-black mb-4 leading-tight italic">Ekspert Afiliacji MyLead</h3>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">Polecaj produkty z MyLead bezpośrednio przez noweimperium i odbieraj prowizję na swój portfel AI.</p>
                    <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30">
                        Otwórz Panel MyLead
                    </button>
                </div>

                <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 italic uppercase tracking-tighter">
                        <TrendingUp size={20} className="text-blue-600" /> Top Earnings
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center font-black text-[10px]">
                                        #{i}
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">Wojciech K.</span>
                                </div>
                                <span className="text-xs font-black text-blue-600">+12,450 PLN</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      ) : activeTab === 'video' ? (
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <div>
               <h2 className="text-3xl font-black text-slate-900 italic">Kanały Video dla Partnerów</h2>
               <p className="text-slate-500 font-medium tracking-tight">Ekskluzywne materiały szkoleniowe, webinary live i case studies.</p>
            </div>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all">
              Subskrybuj Kanały <Play size={12} fill="currentColor" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VIDEO_CHANNELS.map((v) => (
              <motion.div 
                key={v.id}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-[32px] overflow-hidden mb-6 shadow-sm border border-slate-100">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center text-slate-900 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-white">
                    {v.duration}
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight italic">{v.title}</h3>
                <div className="flex items-center gap-3">
                   <div className="h-6 w-6 bg-slate-100 rounded-full flex items-center justify-center text-[8px] font-black">{v.author.substring(0, 2)}</div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{v.author}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-[48px] p-12 flex flex-col md:flex-row items-center gap-12 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
            <div className="flex-1 relative z-10">
               <h2 className="text-4xl font-black text-slate-900 mb-6 italic leading-tight">Zostań Twórcą <br /> Video Partner</h2>
               <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8 italic">Twórz poradniki dla innych sprzedawców i zarabiaj noweCash za każde wyświetlenie i polecenie systemu.</p>
               <button className="px-10 py-5 bg-blue-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-blue-600/30">
                 Aplikuj do Programu Partnerskiego
               </button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 relative z-10">
               <div className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-100 italic">
                  <p className="text-2xl font-black text-blue-600">5.0k+</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase mt-1">Aktywnych widzów</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-100 italic">
                  <p className="text-2xl font-black text-emerald-600">30%</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase mt-1">Wyższa konwersja</p>
               </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ProductMiniCard({ name, source, price, margin, img, link }: any) {
    return (
        <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white rounded-[32px] border border-slate-100 p-4 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group flex flex-col h-full"
        >
            <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-900 border border-slate-100 italic">
                    {source}
                </div>
            </div>
            <h4 className="text-sm font-black text-slate-800 mb-2 truncate italic">{name}</h4>
            <div className="flex items-center justify-between mt-auto">
                <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Koszt</p>
                    <p className="text-xs font-black text-slate-900 mt-1">{price}</p>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Min. Marża</p>
                    <p className="text-xs font-black text-emerald-600 mt-1">{margin}</p>
                </div>
            </div>
        </a>
    );
}

function StatCard({ icon, label, value, color }: any) {
    const colors: any = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100"
    };

    return (
        <div className={cn("p-6 rounded-[32px] border shadow-sm transition-all hover:shadow-md", colors[color])}>
            <div className="flex items-center justify-between mb-4">
                <div className="opacity-50">{icon}</div>
                <ArrowUpRight size={16} className="opacity-30" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{label}</p>
            <p className="text-2xl font-black">{value}</p>
        </div>
    );
}
