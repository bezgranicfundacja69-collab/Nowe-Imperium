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
  Sparkles,
  Share2,
  Package,
  Search,
  LineChart,
  Target,
  Wand2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { BotConfigModal } from './BotConfigModal';
import { getnoweBots, toggleBotStatus, updateBotAction, noweBot, BotStatus } from '../services/botService';
import { analyzeMarket, generateMarketingCampaign } from '../services/aiService';
import { useAuth } from '../hooks/useAuth';

import { ViewProps } from '../types/view';

export function NoweBotsManager({ onNavigate, cart }: ViewProps) {
  const { user } = useAuth();
  const [selectedBotForConfig, setSelectedBotForConfig] = useState<noweBot | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [bots, setBots] = useState<noweBot[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiWorking, setAiWorking] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<Record<string, any>>({});

  useEffect(() => {
    async function load() {
      if (!user) return;
      setLoading(true);
      const data = await getnoweBots(user.uid);
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

  const handleMarketAnalysis = async (bot: noweBot) => {
    setAiWorking(bot.id);
    const result = await analyzeMarket("Podzespoły Komputerowe i Elektronika"); // Example category
    if (result) {
      setAiResults(prev => ({ ...prev, [bot.id]: { type: 'market', data: result } }));
      await updateBotAction(bot.id, `Analiza AI: ${result.recommendation.substring(0, 40)}...`);
      setBots(prev => prev.map(b => b.id === bot.id ? { ...b, lastAction: `Analiza AI zakończona: ${result.trends[0]}` } : b));
    }
    setAiWorking(null);
  };

  const handleMarketingCampaign = async (bot: noweBot) => {
    setAiWorking(bot.id);
    const result = await generateMarketingCampaign(
      "Gaming Setup Pro Max 2026", 
      "Zestaw dla profesjonalnych graczy z RTX 5090 i najnowszym procesorem.", 
      12500
    );
    if (result) {
      setAiResults(prev => ({ ...prev, [bot.id]: { type: 'campaign', data: result } }));
      await updateBotAction(bot.id, `Kampania AI: ${result.ad_copy_short.substring(0, 40)}...`);
      setBots(prev => prev.map(b => b.id === bot.id ? { ...b, lastAction: `Wygenerowano kampanię dla: ${result.channels.join(', ')}` } : b));
    }
    setAiWorking(null);
  };

  const handleUpgrade = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            name: 'noweimperium Premium Partner Node',
            description: 'Deploys 5 additional high-priority AI nodes for maximum arbitrage and market scouting.',
            price: 499.00
          }],
          successUrl: window.location.href + '?upgrade=success',
          cancelUrl: window.location.href,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Upgrade error:", error);
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
      case 'dropship_automator': return Zap;
      case 'order_fulfillment': return Package;
      case 'marketplace_scout': return Search;
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
      case 'dropship_automator': return 'orange';
      case 'order_fulfillment': return 'cyan';
      case 'marketplace_scout': return 'amber';
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
            Zautomatyzowane <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Procesy AI</span>
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
                      {bot.type === 'marketplace_scout' && (
                        <button 
                          onClick={() => handleMarketAnalysis(bot)}
                          disabled={!!aiWorking}
                          className="w-full py-4 rounded-2xl bg-blue-50 text-blue-600 font-extrabold text-[10px] uppercase tracking-[0.15em] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-blue-100"
                        >
                          {aiWorking === bot.id ? <RefreshCw size={14} className="animate-spin" /> : <LineChart size={14} />}
                          Analiza Rynku AI
                        </button>
                      )}
                      {(bot.type === 'ad_optimizer' || bot.type === 'social_manager') && (
                        <button 
                          onClick={() => handleMarketingCampaign(bot)}
                          disabled={!!aiWorking}
                          className="w-full py-4 rounded-2xl bg-purple-50 text-purple-600 font-extrabold text-[10px] uppercase tracking-[0.15em] hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-purple-100"
                        >
                          {aiWorking === bot.id ? <RefreshCw size={14} className="animate-spin" /> : <Wand2 size={14} />}
                          Generuj Kampanię AI
                        </button>
                      )}
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

                    <AnimatePresence>
                        {aiResults[bot.id] && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-8 border-t-2 border-dashed border-blue-100 overflow-hidden"
                          >
                             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[32px] p-8 border border-blue-100 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 text-blue-200">
                                   <Sparkles size={64} />
                                </div>
                                <div className="relative z-10 space-y-6">
                                   <div className="flex items-center justify-between">
                                      <h5 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                         <Cpu size={16} /> Wynik Zaawansowanej Analizy AI
                                      </h5>
                                      <button 
                                        onClick={() => setAiResults(prev => {
                                          const next = { ...prev };
                                          delete next[bot.id];
                                          return next;
                                        })}
                                        className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500"
                                      >
                                         Zamknij
                                      </button>
                                   </div>

                                   {aiResults[bot.id].type === 'market' && (
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                           <div>
                                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 italic">Aktualne Trendy</p>
                                              <ul className="space-y-1">
                                                 {aiResults[bot.id].data.trends.map((t: string, i: number) => (
                                                   <li key={i} className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                      <div className="h-1 w-1 bg-blue-400 rounded-full" /> {t}
                                                   </li>
                                                 ))}
                                              </ul>
                                           </div>
                                           <div>
                                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 italic">Bestsellery</p>
                                              <div className="flex flex-wrap gap-2">
                                                 {aiResults[bot.id].data.popular_products.map((p: string, i: number) => (
                                                   <span key={i} className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-slate-600 shadow-sm border border-blue-50">{p}</span>
                                                 ))}
                                              </div>
                                           </div>
                                        </div>
                                        <div className="space-y-4 p-6 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50">
                                           <div className="flex items-center justify-between">
                                              <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Nasycenie Rynku</span>
                                              <span className="text-lg font-black text-blue-600">{aiResults[bot.id].data.saturation}%</span>
                                           </div>
                                           <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                                              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${aiResults[bot.id].data.saturation}%` }} />
                                           </div>
                                           <p className="text-xs font-bold text-slate-600 italic">"{aiResults[bot.id].data.recommendation}"</p>
                                        </div>
                                     </div>
                                   )}

                                   {aiResults[bot.id].type === 'campaign' && (
                                     <div className="space-y-6">
                                        <div className="p-6 bg-white rounded-3xl shadow-sm border border-blue-50">
                                           <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 italic">Wygenerowany Nagłówek</p>
                                           <p className="text-lg font-black text-slate-900 italic leading-tight">"{aiResults[bot.id].data.ad_copy_short}"</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                           <div>
                                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 italic">Grupa Docelowa</p>
                                              <p className="text-xs font-bold text-slate-600 leading-relaxed">{aiResults[bot.id].data.target_audience}</p>
                                           </div>
                                           <div className="space-y-3">
                                              <div className="flex items-center gap-2">
                                                 <Target size={14} className="text-blue-500" />
                                                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Kanały: {aiResults[bot.id].data.channels.join(', ')}</span>
                                              </div>
                                              <div className="flex flex-wrap gap-2">
                                                 {aiResults[bot.id].data.hashtags.map((h: string, i: number) => (
                                                   <span key={i} className="text-[10px] font-bold text-blue-600">{h}</span>
                                                 ))}
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                   )}
                                </div>
                             </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
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
               <h2 className="text-4xl font-black mb-6 italic leading-tight uppercase tracking-tighter">noweimperium Bot Master Control</h2>
               <p className="text-slate-400 text-lg font-medium leading-relaxed italic mb-8">Płynna orkiestracja wszystkich botów. System automatycznie przydziela zasoby obliczeniowe tam, gdzie aktualnie jest największy potencjał zarobkowy.</p>
               <div className="flex gap-4">
                  <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest">CPU: 42%</div>
                  <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest">Node: DX-4</div>
               </div>
            </div>
            <button 
              onClick={handleUpgrade}
              className="px-12 py-6 bg-blue-600 text-white rounded-[32px] font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-3"
            >
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
