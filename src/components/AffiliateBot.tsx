import { 
  Bot, 
  Target, 
  TrendingUp, 
  Zap, 
  MessageSquare, 
  Share2, 
  Copy, 
  PieChart, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState } from 'react';

const RECOMMENDED_OFFERS = [
  { id: 'o1', name: 'Suplementy Diety KETO', network: 'MyLead', commission: '45 PLN / CPS', conversion: '8.4%', trend: '+12%' },
  { id: 'o2', name: 'Kurs AI Automatyzacji', network: 'WebPartners', commission: '25% / CPS', conversion: '12.1%', trend: '+45%' },
  { id: 'o5', name: 'Google Content Monetization', network: 'Google', commission: 'CPC Revenue', conversion: 'High CTR', trend: '+22%' },
  { id: 'o6', name: 'Microsoft Ads Search Hub', network: 'Microsoft', commission: 'High CPC', conversion: 'Expert', trend: '+15%' },
  { id: 'o3', name: 'Gadżety Tech AliExpress', network: 'Awin', commission: '8-12% / CPS', conversion: '5.2%', trend: '+5%' },
  { id: 'o4', name: 'E-book: Dochód Pasywny', network: 'Internal', commission: '15 PLN / CPL', conversion: '15.8%', trend: '+18%' }
];

export function AffiliateBot() {
  const [activeStrategy, setActiveStrategy] = useState('aggressive');
  const [isBotRunning, setIsBotRunning] = useState(true);
  const [generationOutput, setGenerationOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = () => {
    setIsGenerating(true);
    setGenerationOutput('');
    const text = "🔥 OKAZJA ROKU! 🔥\n\nSzukasz sposobu na realny dochód pasywny w 2026? Sprawdź nasz najnowszy kurs AI Automatyzacji. \n\n✅ Dowiedz się jak klonować sukcesy.\n✅ Zautomatyzuj swoje social media.\n✅ Odbierz darmowy bonus na start!\n\nSprawdź tutaj: https://omni.link/aff-special-ai";
    
    let i = 0;
    const interval = setInterval(() => {
      setGenerationOutput(prev => prev + text[i]);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 20);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-indigo-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
                alt="Affiliate Bot" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-950/80 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-400 border border-indigo-500/30 mb-8 font-mono backdrop-blur-md">
              <Bot size={14} className="animate-bounce" /> OmniAffiliate AI Agent v3.0
            </div>
            <h1 className="text-4xl font-black text-white mb-6 sm:text-7xl italic leading-tight tracking-tighter">
              Twój Bot <br /> <span className="text-indigo-400">Afiliacyjny</span>
            </h1>
            <p className="text-indigo-100 text-xl max-w-xl font-medium leading-relaxed italic">Autonomiczny agent wyszukujący niszowe oferty i generujący kampanie marketingowe, które konwertują.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-3xl p-8 rounded-[40px] border border-white/20 text-center shadow-2xl">
             <div className="flex flex-col items-center gap-4 mb-8">
                <div className={cn("h-3 w-3 rounded-full animate-pulse", isBotRunning ? "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]" : "bg-red-400")} />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Stan Agenta: {isBotRunning ? 'Praca 24/7' : 'Zatrzymany'}</span>
             </div>
             <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setIsBotRunning(!isBotRunning)}
                  className={cn("px-12 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all shadow-xl", isBotRunning ? "bg-white text-indigo-900" : "bg-indigo-600 text-white hover:bg-indigo-500")}
                >
                  {isBotRunning ? 'Wstrzymaj Bota' : 'Uruchom Bota'}
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
             <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-slate-900 italic flex items-center gap-3">
                   <Target className="text-indigo-600" size={28} /> Inteligentny Content AI
                </h2>
                <div className="flex gap-2">
                   <button 
                    onClick={() => setActiveStrategy('aggressive')}
                    className={cn("px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all", activeStrategy === 'aggressive' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400")}
                   >
                     Aggressive
                   </button>
                   <button 
                    onClick={() => setActiveStrategy('passive')}
                    className={cn("px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all", activeStrategy === 'passive' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400")}
                   >
                     Passive
                   </button>
                </div>
             </div>

             <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 min-h-[120px] relative">
                   <p className="text-sm font-medium text-slate-600 italic whitespace-pre-wrap leading-relaxed">
                     {generationOutput || 'Kliknij generuj, aby bot przygotował treść kampanii...'}
                   </p>
                   {isGenerating && <span className="absolute bottom-6 right-6 text-indigo-600 animate-pulse font-black text-xs">AI MYŚLI...</span>}
                </div>
                <div className="flex flex-wrap gap-4">
                   <button 
                    onClick={generateContent}
                    disabled={isGenerating}
                    className="flex-1 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                   >
                     <Zap size={16} /> Generuj Kampanię
                   </button>
                   <button className="px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                     <Share2 size={16} /> Publikuj Social Media
                   </button>
                </div>
             </div>
          </section>

          <section className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
             <h2 className="text-2xl font-black text-slate-900 mb-8 italic flex items-center gap-3 underline decoration-indigo-600/20 underline-offset-8">
               <TrendingUp className="text-indigo-600" size={28} /> Rekomendacje Niszowe
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RECOMMENDED_OFFERS.map(offer => (
                  <div key={offer.id} className="p-6 rounded-[32px] border border-slate-50 bg-slate-50/50 hover:border-indigo-200 transition-all group">
                     <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg uppercase tracking-widest">
                          {offer.network}
                        </span>
                        <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1 italic">
                          <TrendingUp size={12} /> {offer.trend}
                        </span>
                     </div>
                     <h3 className="font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{offer.name}</h3>
                     <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div>
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Prowizja</p>
                           <p className="text-xs font-black text-slate-900">{offer.commission}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Konwersja (CR)</p>
                           <p className="text-xs font-black text-indigo-600">{offer.conversion}</p>
                        </div>
                     </div>
                     <button className="w-full mt-6 py-4 bg-white text-indigo-600 rounded-xl border border-indigo-100 text-[10px] font-black uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        Kopiuj Smart-Link
                     </button>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group border border-indigo-500/20">
             <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-indigo-600/10 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
             <div className="h-14 w-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
               <DollarSign size={28} className="text-indigo-400" />
             </div>
             <h3 className="text-2xl font-black mb-4 leading-tight italic">OmniAds Factoring</h3>
             <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">Wypłać swoje zarobione prowizje natychmiast, bez czekania na rozliczenie przez sieć afiliacyjną.</p>
             <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30">
                Wypłać Prowizję (Instant)
             </button>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
             <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 italic uppercase tracking-tighter">
                <PieChart size={20} className="text-indigo-600" /> OmniCore Analytics
             </h3>
             <div className="space-y-6">
                <StatItem label="Kliknięcia Unikalne" value="4,250" delta="+15%" positive />
                <StatItem label="Zrealizowane Akcje" value="382" delta="+4%" positive />
                <StatItem label="Skuteczność AI" value="92.4%" delta="+2%" positive />
             </div>
             <div className="mt-8 pt-8 border-t border-slate-50">
                <div className="flex items-center gap-2 mb-4">
                   <Globe size={14} className="text-slate-400" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aktywne Kanały</span>
                </div>
                <div className="flex gap-2">
                   {['FB', 'IG', 'TT', 'X'].map(p => (
                     <div key={p} className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-[8px] font-black text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer">
                        {p}
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="p-8 rounded-[40px] bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden group">
             <Sparkles className="absolute top-4 right-4 opacity-50 group-hover:rotate-12 transition-transform duration-500" size={48} />
             <h3 className="text-xl font-black mb-4 italic">Tryb Ekspercki AI</h3>
             <p className="text-indigo-100 text-xs mb-8 leading-relaxed font-medium">Pozwól botowi na automatyczne licytowanie stawek CPC i optymalizację ROI Twoich kampanii.</p>
             <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest font-mono">
                Aktywuj OmniScalability v4
             </button>
          </div>
        </aside>
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
      <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-md", positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
        {delta}
      </span>
    </div>
  );
}
