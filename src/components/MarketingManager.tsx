import { 
  Megaphone, 
  Target, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Share2, 
  Monitor, 
  Search, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  DollarSign,
  Cpu,
  Mail,
  Instagram,
  Youtube,
  Layout,
  Video
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState } from 'react';

const CAMPAIGN_TEMPLATES = [
  { id: 't1', name: 'SEO Dominator 2026', type: 'Organiczny', color: 'blue', reach: '50k+ Views', conversion: '4.2%' },
  { id: 't2', name: 'Viral Reels AI', type: 'Social Media', color: 'purple', reach: '200k+ Views', conversion: '2.1%' },
  { id: 't3', name: 'Google Ads Optimizer', type: 'Płatny', color: 'emerald', reach: '10k+ Clicks', conversion: '8.5%' },
  { id: 't4', name: 'Newsletter Cold-Reach', type: 'Email', color: 'amber', reach: '1k+ Open', conversion: '12.4%' }
];

import { ViewProps } from '../types/view';

export function MarketingManager({ onNavigate, cart }: ViewProps) {
  const [isBotActive, setIsBotActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'strategy' | 'ads' | 'creators' | 'analytics'>('strategy');

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2070" 
                alt="Marketing Manager" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono backdrop-blur-md">
              <Megaphone size={14} className="animate-bounce" /> noweMarketing AI Director
            </div>
            <h1 className="text-4xl font-black text-white mb-6 sm:text-7xl italic leading-tight tracking-tighter">
              Marketing <br /> <span className="text-blue-400">Manager AI</span>
            </h1>
            <p className="text-slate-300 text-xl max-w-xl font-medium leading-relaxed italic">Twój osobisty komandor marketingu. Autonomiczne planowanie kampanii, optymalizacja stawek i budowanie wizerunku marki.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-3xl p-8 rounded-[40px] border border-white/20 text-center shadow-2xl">
             <div className="flex flex-col items-center gap-4 mb-8">
                <div className={cn("h-3 w-3 rounded-full animate-pulse", isBotActive ? "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]" : "bg-red-400")} />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">System AI: {isBotActive ? 'Aktywny' : 'Uśpiony'}</span>
             </div>
             <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setIsBotActive(!isBotActive)}
                  className={cn("px-12 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all shadow-xl", isBotActive ? "bg-white text-slate-900 focus:ring-4 focus:ring-white/20" : "bg-blue-600 text-white hover:bg-blue-500")}
                >
                  {isBotActive ? 'Wstrzymaj Managera' : 'Aktywuj Managera'}
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="flex bg-slate-100 p-2 rounded-3xl w-fit border border-slate-200 overflow-x-auto max-w-full">
         {(['strategy', 'ads', 'creators', 'analytics'] as const).map((tab) => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={cn(
               "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
               activeTab === tab ? "bg-white text-blue-600 shadow-md" : "text-slate-400 hover:text-slate-600"
             )}
           >
             {tab === 'strategy' ? 'Strategia AI' : tab === 'ads' ? 'Kampanie Płatne' : tab === 'creators' ? 'Creator Kit' : 'Analityka ROI'}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {activeTab === 'strategy' && (
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                  <Target size={120} />
               </div>
               <h2 className="text-2xl font-black text-slate-900 mb-10 italic flex items-center gap-3">
                  <Target className="text-blue-600" size={28} /> Planer Działań Organicznych
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {CAMPAIGN_TEMPLATES.map(t => (
                    <div key={t.id} className="p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 hover:border-blue-200 transition-all group overflow-hidden relative">
                       <div className={cn(
                         "absolute bottom-0 right-0 h-24 w-24 -mr-8 -mb-8 rounded-full blur-3xl opacity-20 transition-transform group-hover:scale-150",
                         t.color === 'blue' ? "bg-blue-600" : t.color === 'purple' ? "bg-purple-600" : t.color === 'emerald' ? "bg-emerald-600" : "bg-amber-600"
                       )} />
                       <span className="text-[8px] font-black uppercase tracking-widest bg-white border border-slate-100 px-3 py-1 rounded-full mb-4 inline-block text-slate-400">
                         {t.type}
                       </span>
                       <h3 className="font-black text-slate-900 text-lg mb-6 group-hover:text-blue-600 transition-colors">{t.name}</h3>
                       <div className="flex justify-between items-end">
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Zasięg Estymowany</p>
                            <p className="text-sm font-black text-slate-900">{t.reach}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Skuteczność</p>
                            <p className="text-sm font-black text-blue-600">{t.conversion}</p>
                         </div>
                       </div>
                       <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                          Aktywuj Lejek <ArrowRight size={14} />
                       </button>
                    </div>
                  ))}
               </div>
            </section>
          )}

          {activeTab === 'creators' && (
            <section className="space-y-10">
               <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Layout size={120} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4 italic flex items-center gap-3">
                    <Layout className="text-blue-600" size={28} /> Banery dla Sponsorów & Partnerów
                  </h2>
                  <p className="text-slate-500 text-sm italic mb-10 max-w-2xl">Zautomatyzowane aktywa wizualne. Prowadź profesjonalną komunikację na swoich kanałach social media z gotowymi banerami noweimperium.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <CreatorAssetCard 
                        icon={<Youtube size={24} />} 
                        title="YouTube Banner Kit" 
                        dimensions="2560 x 1440 px" 
                        desc="Zoptymalizowane nagłówki kanałów z Twoim ID partnera."
                        image="https://images.unsplash.com/photo-1574680077534-7546cb993f41?auto=format&fit=crop&q=80&w=800"
                     />
                     <CreatorAssetCard 
                        icon={<Video size={24} />} 
                        title="TikTok / Shorts Overlay" 
                        dimensions="1080 x 1920 px" 
                        desc="Dynamiczne nakładki AI do Twoich krótkich form wideo."
                        image="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800"
                     />
                     <CreatorAssetCard 
                        icon={<Instagram size={24} />} 
                        title="Instagram Stories Pack" 
                        dimensions="1080 x 1920 px" 
                        desc="Estetyczne szablony do promowania produktów i okazji."
                        image="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800"
                     />
                     <CreatorAssetCard 
                        icon={<Monitor size={24} />} 
                        title="Twitch / Live Overlay" 
                        dimensions="1920 x 1080 px" 
                        desc="Profesjonalna ramka i alerty dla Twoich transmisji."
                        image="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800"
                     />
                  </div>
               </div>

               <div className="bg-slate-900 rounded-[48px] p-10 md:p-16 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.3),transparent)]" />
                  <Sparkles size={48} className="mx-auto mb-8 text-blue-400 animate-pulse" />
                  <h3 className="text-3xl md:text-5xl font-black italic mb-6 tracking-tighter">AI Custom Brand Generator</h3>
                  <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 font-medium italic">Wygeneruj unikalny baner ze swoim logotypem lub twarzą, wkomponowany w estetykę noweimperium Prestige.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                      Wgraj Swoje Logo / Avatar
                    </button>
                    <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 shadow-xl shadow-blue-600/20">
                      Generuj przez nowe-Vision
                    </button>
                  </div>
               </div>
            </section>
          )}

          {activeTab === 'ads' && (
            <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
               <h2 className="text-2xl font-black text-slate-900 mb-10 italic flex items-center gap-3">
                  <Zap className="text-blue-600" size={28} /> Reklamy nowe-Paid
               </h2>
               <div className="bg-slate-900 rounded-3xl p-8 text-white mb-8 border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent)]" />
                  <div className="relative z-10 flex items-center justify-between">
                     <div>
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Budżet Managed AI</p>
                        <p className="text-4xl font-black italic">$4,250.00</p>
                     </div>
                     <button className="px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
                        Zwiększ Budżet
                     </button>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <AdRow name="Retargeting: Aktywni Kupujący" platform="Google Ads" budget="$850" status="Działa" ROI="450%" positive />
                  <AdRow name="Prospecting: Rynek Rolny" platform="FB Ads" budget="$1,200" status="Optymalizacja" ROI="280%" positive />
                  <AdRow name="Search Hub Keywords 2026" platform="Microsoft" budget="$500" status="Analiza" ROI="--%" />
               </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
             <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 italic uppercase tracking-tighter">
                <Cpu size={20} className="text-blue-600" /> noweCore Marketing Node
             </h3>
             <div className="space-y-6">
                <StatItem label="Aktywne Kampanie" value="12" delta="Stan Optymalny" positive />
                <StatItem label="Średni CPC AI" value="0.12 PLN" delta="-15% vs Rynek" positive />
                <StatItem label="nowe-Score" value="98/100" delta="Top Strateg" positive />
             </div>
          </div>

          <div className="p-8 rounded-[40px] bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-20">
                <BarChart3 size={100} />
             </div>
             <h3 className="text-xl font-black mb-4 italic">Raporty AI Predictive</h3>
             <p className="text-blue-100 text-xs mb-8 leading-relaxed font-medium">Przewidujemy zapotrzebowanie rynku na 14 dni do przodu. Ustaw kampanie przed konkurencją.</p>
             <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                Wygeneruj Raport Trendów
             </button>
          </div>

          <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-100">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Integracje Marketingowe</h3>
             <div className="grid grid-cols-4 gap-4">
                <IntegrationIcon icon={<Mail size={16} />} active />
                <IntegrationIcon icon={<Instagram size={16} />} active />
                <IntegrationIcon icon={<Search size={16} />} active />
                <IntegrationIcon icon={<Globe size={16} />} />
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AdRow({ name, platform, budget, status, ROI, positive }: any) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 bg-slate-50/30 hover:border-blue-100 transition-all group">
       <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center font-black text-[8px] text-slate-400 group-hover:text-blue-600 transition-colors">
             {platform.substring(0, 2)}
          </div>
          <div>
             <p className="text-xs font-bold text-slate-800">{name}</p>
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{platform} • {budget}</p>
          </div>
       </div>
       <div className="text-right">
          <p className={cn("text-[10px] font-black", positive ? "text-emerald-500" : "text-slate-400")}>{ROI}</p>
          <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{status}</p>
       </div>
    </div>
  );
}

function IntegrationIcon({ icon, active }: { icon: any, active?: boolean }) {
   return (
      <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer border", active ? "bg-white text-blue-600 border-blue-100 shadow-sm" : "bg-white text-slate-300 border-slate-100")}>
         {icon}
      </div>
   );
}

function CreatorAssetCard({ icon, title, dimensions, desc, image }: any) {
  return (
    <div className="group rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col h-full">
      <div className="h-48 overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
          <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">{icon}</div>
          <span className="text-[10px] font-black uppercase tracking-widest">{dimensions}</span>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-xl font-black text-slate-900 mb-3 italic">{title}</h3>
        <p className="text-slate-500 text-xs italic mb-8 font-medium leading-relaxed">{desc}</p>
        <div className="mt-auto pt-6 border-t border-slate-50">
          <button className="w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center justify-center gap-2">
            Pobierz Pakiet <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, delta, positive }: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-lg font-black text-slate-900">{value}</p>
      </div>
      <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-md", positive ? "bg-emerald-50 text-emerald-600 font-mono" : "bg-red-50 text-red-600 font-mono")}>
        {delta}
      </span>
    </div>
  );
}
