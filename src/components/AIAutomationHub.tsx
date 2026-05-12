import { 
  Workflow, 
  Sparkles, 
  Database, 
  Download, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Link as LinkIcon,
  Bot,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState } from 'react';

import { ViewProps } from '../types/view';

export function AIAutomationHub({ onNavigate, cart }: ViewProps) {
  const [scrapingUrl, setScrapingUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const startScraping = () => {
    if (!scrapingUrl) return;
    setIsScraping(true);
    setLogs(['Inicjalizacja AI Scraper v2.1...', 'Łączenie z serwerem źródłowym...', 'Omijanie zabezpieczeń bot-detection...']);
    setProgress(10);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScraping(false);
          setLogs(l => [...l, 'Sukces: Pobrano 42 produkty.', 'Generowanie opisów AI...', 'Synchronizacja zakończona.']);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15);
        if (next > 40 && next < 60) setLogs(l => [...l, 'Pobieranie zdjęć w wysokiej rozdzielczości...', 'Mapowanie atrybutów: Cena, Stan, Marka']);
        if (next > 80 && next < 95) setLogs(l => [...l, 'Kolejkowanie do wystawienia na Allegro/OLX...']);
        return next > 100 ? 100 : next;
      });
    }, 800);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070" 
                alt="AI Hub" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono backdrop-blur-md">
            <Bot size={14} className="animate-bounce" /> noweimperium AI Automation System
          </div>
          <h1 className="text-5xl font-black text-white mb-6 sm:text-7xl italic leading-tight tracking-tighter">
            Pobieraj Produkty <br /> <span className="text-blue-500">Automatycznie</span>
          </h1>
          <p className="text-slate-300 text-xl font-medium leading-relaxed italic mb-10">Wklej link do dowolnego sklepu lub hurtowni, a nasze AI pobierze dane, stworzy opisy i wystawi oferty za Ciebie.</p>
          
          <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[32px] border border-white/10 flex flex-col md:flex-row gap-4 shadow-2xl">
             <div className="relative flex-1">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={scrapingUrl}
                  onChange={(e) => setScrapingUrl(e.target.value)}
                  disabled={isScraping}
                  placeholder="Wklej link z AliExpress lub Temu..."
                  className={cn(
                    "w-full bg-white/10 border-none rounded-2xl pl-12 pr-4 py-5 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm",
                    isScraping && "opacity-50 cursor-not-allowed"
                  )}
                />
             </div>
             <button 
                onClick={startScraping}
                disabled={isScraping || !scrapingUrl}
                className={cn(
                  "px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3",
                  isScraping ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-blue-600/30"
                )}
             >
                {isScraping ? <RefreshCw className="animate-spin" size={18} /> : <Download size={18} />}
                {isScraping ? 'AI Scraping...' : 'Uruchom AI Scraper'}
             </button>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Obsługiwane platformy:</span>
             <div className="flex gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/AliExpress_logo.svg" alt="AliExpress" className="h-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Temu_logo.svg" alt="Temu" className="h-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" referrerPolicy="no-referrer" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Allegro.pl_logo.svg/1280px-Allegro.pl_logo.svg.png" alt="Allegro" className="h-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" referrerPolicy="no-referrer" />
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900 italic flex items-center gap-2">
                     <Workflow size={20} className="text-blue-600" /> Konsola Procesów AI
                  </h3>
                  <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase italic", isScraping ? "bg-blue-50 text-blue-600 animate-pulse" : "bg-slate-50 text-slate-400")}>
                    Stan: {isScraping ? 'Praca...' : 'Oczekiwanie'}
                  </span>
               </div>

               <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <span>Postęp Zadania</span>
                       <span>{progress}%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                       />
                    </div>
                  </div>

                  {/* Logs */}
                  <div className="bg-slate-900 rounded-3xl p-6 font-mono text-[11px] h-64 overflow-y-auto space-y-2 border border-slate-800">
                     {logs.map((log, i) => (
                       <div key={i} className="flex gap-3 text-slate-400 italic">
                          <span className="text-blue-500">[{new Date().toLocaleTimeString()}]</span>
                          <span className={cn(log.startsWith('Sukces') ? "text-emerald-400" : "")}>{log}</span>
                       </div>
                     ))}
                     {isScraping && <div className="text-blue-500 animate-pulse">_</div>}
                     {logs.length === 0 && <div className="text-slate-600 italic">Czekam na URL do przetworzenia...</div>}
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FeatureCard 
                  icon={<Zap size={20} />} 
                  title="Auto-Description AI" 
                  desc="Automatyczne generowanie unikalnych opisów produktów w 15 językach."
               />
               <FeatureCard 
                  icon={<Layers size={20} />} 
                  title="Bulk Marketplace Export" 
                  desc="Wystawiaj 1000 przedmiotów na raz na Allegro, eBay i Amazon."
               />
            </div>
         </div>

         <aside className="lg:col-span-4 space-y-8">
            <div className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-white/10 blur-3xl group-hover:scale-125 transition-transform" />
               <Database className="mb-6 opacity-30" size={48} />
               <h3 className="text-2xl font-black mb-4 leading-tight italic">Synchronizacja 24/7</h3>
               <p className="text-indigo-100 text-sm mb-8 leading-relaxed font-medium italic">Automat sprawdza stany magazynowe Twoich dostawców co 5 minut i aktualizuje ceny.</p>
               <div className="flex items-center gap-2 mb-8">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span className="text-xs font-bold">Tryb Turbo Aktywny</span>
               </div>
               <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-indigo-900/20">
                 Zarządzaj Scraperami
               </button>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 italic">
                  <Sparkles size={20} className="text-blue-600" /> Statystyki AI
               </h3>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Oszczędzony Czas</p>
                     <p className="text-sm font-black text-blue-600">420h / ms</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pobrane Produkty</p>
                     <p className="text-sm font-black text-slate-900">12,450</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Efektywność AI</p>
                     <p className="text-sm font-black text-emerald-600">99.8%</p>
                  </div>
               </div>
               <button className="w-full mt-8 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 italic">
                 Raport Szczegółowy <ArrowRight size={14} />
               </button>
            </div>
         </aside>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm hover:border-blue-200 transition-all flex flex-col items-center text-center">
       <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 italic">
          {icon}
       </div>
       <h4 className="font-black text-slate-900 mb-2 italic">
         {title}
       </h4>
       <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
         {desc}
       </p>
    </div>
  );
}
