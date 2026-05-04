import { 
  X, 
  Settings, 
  Database, 
  Brain, 
  Clock, 
  Globe, 
  ChevronRight,
  Sparkles,
  Zap,
  Save,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';

interface BotConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  bot: {
    id: string;
    name: string;
    icon: any;
    color: string;
  } | null;
}

export function BotConfigModal({ isOpen, onClose, bot }: BotConfigModalProps) {
  const [activeTab, setActiveTab] = useState<'sources' | 'ai' | 'schedule' | 'markets'>('sources');
  const [config, setConfig] = useState({
    sources: ['Allegro', 'Amazon DE', 'AliExpress'],
    strategy: 'Balanced',
    frequency: 'Hourly',
    markets: ['Polska', 'Niemcy']
  });

  if (!isOpen || !bot) return null;

  const TABS = [
    { id: 'sources', label: 'Źródła', icon: Database },
    { id: 'ai', label: 'Strategia AI', icon: Brain },
    { id: 'schedule', label: 'Harmonogram', icon: Clock },
    { id: 'markets', label: 'Rynki Docelowe', icon: Globe },
  ] as const;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-[48px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[700px]"
        >
          {/* Sidebar Nav */}
          <div className="w-full md:w-64 bg-slate-50 p-8 border-r border-slate-100 flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                bot.color === 'blue' ? "bg-blue-600" : bot.color === 'purple' ? "bg-purple-600" : "bg-emerald-600"
              )}>
                <bot.icon size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Konfiguracja</p>
                <h3 className="text-sm font-black text-slate-900 truncate leading-none">{bot.name}</h3>
              </div>
            </div>

            <nav className="space-y-1 flex-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all",
                    activeTab === tab.id 
                      ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                  )}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="pt-8 mt-auto">
               <button 
                onClick={onClose}
                className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all"
               >
                 Zamknij
               </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-10 md:p-16 flex flex-col overflow-y-auto">
             <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3">
                   {activeTab === 'sources' && <Database className="text-blue-600" />}
                   {activeTab === 'ai' && <Brain className="text-purple-600" />}
                   {activeTab === 'schedule' && <Clock className="text-amber-600" />}
                   {activeTab === 'markets' && <Globe className="text-emerald-600" />}
                   {TABS.find(t => t.id === activeTab)?.label}
                </h2>
                <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest">
                   Auto-Sync ON
                </div>
             </div>

             <div className="flex-1 space-y-10">
                {activeTab === 'sources' && (
                  <div className="space-y-6">
                    <p className="text-sm font-medium text-slate-500 italic mb-8">Zdefiniuj bazy danych, z których bot ma pobierać dane lub oferty. Możesz dodać własne endpointy API.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {['Allegro PL', 'Amazon Global', 'AliExpress', 'eBay', 'OLX', 'Shopify Store'].map(s => (
                         <div key={s} className="flex items-center justify-between p-5 rounded-3xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-all cursor-pointer group">
                            <span className="text-xs font-bold text-slate-700">{s}</span>
                            <div className="h-5 w-5 rounded-full border-2 border-slate-200 flex items-center justify-center p-0.5 group-hover:border-blue-500">
                               <div className="h-full w-full bg-blue-500 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                            </div>
                         </div>
                       ))}
                       <div className="p-5 rounded-3xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-100 transition-all cursor-pointer">
                          <PlusCircle size={20} />
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden mb-8">
                       <Sparkles className="absolute right-0 bottom-0 -mb-4 -mr-4 text-blue-500/20" size={120} />
                       <h4 className="text-sm font-black uppercase tracking-widest mb-4">Tryb Inteligencji Alpinator v4.2</h4>
                       <p className="text-slate-400 text-xs italic mb-8 font-medium">Algorytm decyduje w czasie rzeczywistym o marżach, opisach i kanałach dystrybucji na podstawie analizy konkurencji.</p>
                       <div className="flex gap-4">
                          <AiModeButton label="Bezpieczny" active={config.strategy === 'Safe'} />
                          <AiModeButton label="Zrównoważony" active={config.strategy === 'Balanced'} />
                          <AiModeButton label="Agresywny" active={config.strategy === 'Aggressive'} />
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Model Językowy (LLM)</p>
                       <select className="w-full p-4 rounded-2xl bg-slate-50 border-none font-bold text-sm focus:ring-2 focus:ring-blue-500/20">
                          <option>Gemini 1.5 Pro (Zalecane)</option>
                          <option>OmniCore Custom Node</option>
                          <option>GPT-4o Integration</option>
                       </select>
                    </div>
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div className="space-y-8 text-center py-10">
                     <div className="h-32 w-32 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-amber-200">
                        <Clock size={48} className="animate-pulse" />
                     </div>
                     <h4 className="text-xl font-black italic">Interwał Działania</h4>
                     <div className="max-w-xs mx-auto">
                        <input 
                           type="range" 
                           min="1" max="24" 
                           className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600" 
                        />
                        <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <span>Co godzinę</span>
                           <span>Raz na dobę</span>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'markets' && (
                  <div className="space-y-6">
                    <p className="text-sm font-bold text-slate-500 italic leading-relaxed">Wybierz terytoria, na których ogłoszenia mają być promowane i tłumaczone przez bota.</p>
                    <div className="space-y-3">
                       <MarketToggle label="Polska (Rynek Lokalny)" active />
                       <MarketToggle label="Unia Europejska (VAT-OSS)" />
                       <MarketToggle label="USA & Azja (Eksport)" />
                    </div>
                  </div>
                )}
             </div>

             <div className="pt-10 flex gap-4">
                <button 
                  onClick={() => {
                    alert('Konfiguracja bota została zapisana pomyślnie!');
                    onClose();
                  }}
                  className="flex-1 py-5 bg-blue-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                >
                   <Save size={18} /> Zapisz Konfigurację
                </button>
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function PlusCircle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  );
}

function AiModeButton({ label, active }: { label: string, active?: boolean }) {
  return (
    <button className={cn(
      "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
      active ? "bg-white text-blue-600 border-white shadow-lg" : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
    )}>
      {label}
    </button>
  );
}

function MarketToggle({ label, active }: { label: string, active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group cursor-pointer hover:border-emerald-200">
       <span className="text-sm font-bold text-slate-700">{label}</span>
       <div className={cn("h-6 w-10 rounded-full relative transition-colors", active ? "bg-emerald-500" : "bg-slate-200")}>
          <div className={cn("absolute top-1 h-4 w-4 bg-white rounded-full transition-all", active ? "left-5" : "left-1")} />
       </div>
    </div>
  );
}
