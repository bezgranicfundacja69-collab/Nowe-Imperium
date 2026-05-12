import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Search, 
  MessageSquare, 
  Package, 
  TrendingUp, 
  Users,
  CheckCircle2,
  Pause,
  AlertCircle,
  Activity,
  ArrowRight,
  Share2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { getnoweBots, noweBot } from '../services/botService';
import { useAuth } from '../hooks/useAuth';

export function NoweBotsHomeSummary({ onManageBots }: { onManageBots: () => void }) {
  const { user } = useAuth();
  const [bots, setBots] = useState<noweBot[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return null;

  const getBotIcon = (type: string) => {
    switch (type) {
      case 'price_watcher': return <Search size={18} />;
      case 'auto_responder': return <MessageSquare size={18} />;
      case 'order_fulfillment': return <Package size={18} />;
      case 'marketplace_scout': return <Search size={18} />;
      case 'social_manager': return <Share2 size={18} />;
      case 'dropship_automator': return <Activity size={18} />;
      default: return <Cpu size={18} />;
    }
  };

  const statusIcons = {
    active: <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />,
    paused: <div className="h-2 w-2 rounded-full bg-slate-300" />,
    error: <div className="h-2 w-2 rounded-full bg-rose-500 animate-bounce" />,
    idle: <div className="h-2 w-2 rounded-full bg-blue-500" />
  };

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 italic overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 pointer-events-none">
         <Cpu size={160} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">
            <Activity size={12} className="animate-pulse" /> Live Status
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">noweimperium Bots</h3>
        </div>
        <button 
          onClick={onManageBots}
          className="flex items-center gap-2 text-xs font-black text-blue-600 hover:scale-105 transition-transform uppercase tracking-widest px-6 py-3 bg-blue-50 rounded-2xl"
        >
          Zarządzaj Flotą <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 relative z-10">
        {bots.slice(0, 8).map((bot) => (
          <div 
            key={bot.id} 
            className="group p-4 bg-slate-50 hover:bg-white rounded-[24px] border border-transparent hover:border-slate-100 transition-all hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                {getBotIcon(bot.type)}
              </div>
              {statusIcons[bot.status]}
            </div>
            
            <h4 className="text-sm font-black text-slate-900 truncate mb-1">{bot.name}</h4>
            <div className="flex items-center justify-between">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bot.status}</span>
               <span className="text-[10px] font-black text-slate-900 bg-white px-2 py-0.5 rounded-full shadow-sm">{bot.efficiency}%</span>
            </div>

            <div className="mt-3 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${bot.efficiency}%` }}
                 className="h-full bg-blue-600 rounded-full"
               />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
