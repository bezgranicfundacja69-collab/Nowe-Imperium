import { 
  Bot, 
  ShoppingCart, 
  Megaphone, 
  PlusCircle, 
  Settings, 
  Play, 
  Square, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Cpu,
  Zap,
  Globe,
  ArrowRight,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { BotConfigModal } from './BotConfigModal';
import { getOmniBots, toggleBotStatus, OmniBot, BotStatus } from '../services/botService';
import { useAuth } from '../hooks/useAuth';

export function OmniBotsManager() {
  const { user } = useAuth();
  const [selectedBotForConfig, setSelectedBotForConfig] = useState<OmniBot | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [bots, setBots] = useState<OmniBot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      const data = await getOmniBots(user.uid);
      setBots(data);
      setLoading(false);
    }
    load();
  }, [user]);

  const toggleBot = async (id: string, currentStatus: BotStatus) => {
    const success = await toggleBotStatus(id, currentStatus);
    if (success) {
      setBots(prev => prev.map(bot => {
        if (bot.id === id) {
          return { ...bot, status: bot.status === 'active' ? 'paused' : 'active' };
        }
        return bot;
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getBotIcon = (type: string) => {
    switch (type) {
      case 'price_watcher': return ShoppingCart;
      case 'auto_responder': return Megaphone;
      case 'inventory_sync': return Database;
      case 'ad_optimizer': return TrendingUp;
      case 'social_manager': return Share2;
      default: return Bot;
    }
  };

  const getBotColor = (type: string) => {
    switch (type) {
      case 'price_watcher': return 'blue';
      case 'auto_responder': return 'purple';
      case 'inventory_sync': return 'emerald';
      case 'ad_optimizer': return 'indigo';
      case 'social_manager': return 'rose';
      default: return 'slate';
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.3),transparent)]" />
            <img 
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=2070" 
                alt="AI Bots" 
                className="w-full h-full object-cover opacity-10 transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono">
            <Cpu size={14} className="animate-spin-slow" /> Hyper-Automation Node
          </div>
          <h1 className="text-4xl font-black text-white mb-6 sm:text-7xl italic leading-tight tracking-tighter">
            Zarządzanie <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Botami AI</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-xl font-medium leading-relaxed italic">Twoja armia autonomicznych agentów. Skonfiguruj, uruchom i obserwuj jak zarabiają dla Ciebie 24/7.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {bots.map((bot) => {
          const Icon = getBotIcon(bot.type);
          const color = getBotColor(bot.type);
          const isRunning = bot.status === 'active';

          return (
            <motion.div 
              key={bot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                 {/* Bot Control Panel */}
                 <div className={cn(
                   "lg:w-80 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-50 transition-colors shadow-inner",
                   isRunning ? "bg-slate-900 text-white" : "bg-white text-slate-800"
                 )}>
                    <div>
                      <div className={cn(
                        "h-16 w-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg",
                        color === 'blue' ? "bg-blue-600" : 
                        color === 'purple' ? "bg-purple-600" : 
                        color === 'emerald' ? "bg-emerald-600" : 
                        "bg-indigo-600"
                      )}>
                        <Icon size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-black italic mb-2 tracking-tighter">{bot.name}</h3>
                      <div className="flex items-center gap-2 mb-6">
                         <div className={cn("h-2 w-2 rounded-full", isRunning ? "bg-green-500 animate-pulse" : "bg-red-500")} />
                         <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status: {isRunning ? 'Aktywny' : 'Zatrzymany'}</span>
                      </div>
                    </div>
  
                    <div className="space-y-3">
                      <button 
                        onClick={() => toggleBot(bot.id, bot.status)}
                        className={cn(
                          "w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all",
                          isRunning ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white" : "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20"
                        )}
                      >
                        {isRunning ? <><Square size={16} /> Zatrzymaj</> : <><Play size={16} fill="currentColor" /> Uruchom</>}
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedBotForConfig(bot);
                          setIsConfigOpen(true);
                        }}
                        className="w-full py-4 rounded-2xl bg-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-200 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                      >
                         <Settings size={16} /> Konfiguracja
                      </button>
                    </div>
                 </div>
  
                 {/* Bot Insights Area */}
                 <div className="flex-1 p-8 lg:p-12 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">O czym myśli teraz bot:</h4>
                          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                             <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                                <Sparkles size={16} className="animate-pulse" />
                             </div>
                             <p className="text-sm font-bold text-slate-600 italic leading-relaxed">
                                {bot.description}
                             </p>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          {bot.stats.map((s, idx) => (
                             <div key={idx} className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col justify-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</span>
                                <span className="text-2xl font-black text-slate-900 italic tracking-tighter">{s.value}</span>
                             </div>
                          ))}
                       </div>
                    </div>
  
                    <div className="pt-8 border-t border-slate-50">
                       <div className="flex items-center justify-between mb-6">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ostatnia Logika Wykonana:</h4>
                          <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase">
                             <RefreshCw size={12} className="animate-spin" /> Live Log
                          </div>
                       </div>
                       <div className="flex items-center gap-3 text-sm font-bold text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                          {isRunning ? <CheckCircle2 size={18} className="text-emerald-500" /> : <AlertCircle size={18} className="text-slate-300" />}
                          {bot.lastAction}
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <section className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <Layers size={300} />
         </div>
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
               <h2 className="text-4xl font-black mb-6 italic leading-tight uppercase tracking-tighter">OmniBot Master Control</h2>
               <p className="text-slate-400 text-lg font-medium leading-relaxed italic mb-8">Płynna orkiestracja wszystkich botów. System automatycznie przydziela zasoby obliczeniowe tam, gdzie aktualnie jest największy potencjał zarobkowy.</p>
               <div className="flex gap-4">
                  <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest">CPU: 42%</div>
                  <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest">Node: DX-4</div>
               </div>
            </div>
            <button className="px-12 py-6 bg-blue-600 text-white rounded-[32px] font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-3">
               Połącz Nowy Node AI <ArrowRight size={20} />
            </button>
         </div>
      </section>

      <BotConfigModal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
        bot={selectedBotForConfig} 
      />
    </div>
  );
}
