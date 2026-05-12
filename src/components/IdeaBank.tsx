import { 
  Lightbulb, 
  Sparkles, 
  TrendingUp, 
  Brain, 
  Zap, 
  ArrowRight,
  TrendingDown,
  LineChart,
  MessageCircle,
  Gem
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState } from 'react';

const IDEAS = [
  { 
    id: 'id1', 
    title: 'Mikro-SaaS dla Lokalnych Rolników', 
    difficulty: 'Średni', 
    potential: 'Wysoki', 
    category: 'Technologia',
    desc: 'Platforma do bezpośredniej sprzedaży płodów rolnych w modelu subskrypcyjnym dla osiedli.',
    trending: true
  },
  { 
    id: 'id2', 
    title: 'Eko-Packaging Hub', 
    difficulty: 'Łatwy', 
    potential: 'Skalowalny', 
    category: 'Logistyka',
    desc: 'Usługa dostarczania biodegradowalnych opakowań dla małych sklepów e-commerce.',
    trending: false
  },
  { 
    id: 'id3', 
    title: 'AI Personal Shopper dla Vinted', 
    difficulty: 'Trudny', 
    potential: 'Ekstremalny', 
    category: 'AI / Fashion',
    desc: 'Bot wyszukujący okazje na podstawie stylu użytkownika i automatycznie licytujący.',
    trending: true
  },
  { 
    id: 'id4', 
    title: 'Mobilne Biuro / Coworking Podlaskie', 
    difficulty: 'Średni', 
    potential: 'Lokalny', 
    category: 'Nieruchomości',
    desc: 'Konwersja starych stodół na nowoczesne biura dla cyfrowych nomadów.',
    trending: false
  }
];

import { ViewProps } from '../types/view';

export function IdeaBank({ onNavigate, cart }: ViewProps) {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-amber-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=2070" 
                alt="Ideas" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-950/80 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 border border-amber-500/30 mb-8 font-mono backdrop-blur-md">
              <Lightbulb size={14} className="animate-pulse" /> noweimperium Bank Pomysłów
            </div>
            <h1 className="text-4xl font-black text-white mb-6 sm:text-6xl italic leading-tight tracking-tighter">
              Kapitał <br /> <span className="text-amber-400">Intelektualny</span>
            </h1>
            <p className="text-amber-100 text-lg max-w-xl font-medium leading-relaxed italic">Nie masz pomysłu na biznes? Odkryj naszą bazę zweryfikowanych konceptów z potencjałem na milionowe obroty.</p>
          </div>
          
          <div className="flex bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10">
            <button 
                onClick={() => setFilter('all')}
                className={cn("px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", filter === 'all' ? "bg-white text-amber-900 shadow-sm" : "text-amber-200 hover:text-white")}
            >
                Wszystkie Pomysły
            </button>
            <button 
                onClick={() => setFilter('trending')}
                className={cn("px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", filter === 'trending' ? "bg-amber-500 text-white shadow-sm" : "text-amber-200 hover:text-white")}
            >
                <div className="flex items-center gap-2 italic"><TrendingUp size={12} /> Trendy 2026</div>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Brain size={24} />} label="Unikalne Koncepty" value="124" color="amber" />
          <StatCard icon={<Zap size={24} />} label="Średni ROI" value="150%" color="emerald" />
          <StatCard icon={<TrendingUp size={24} />} label="Wzrost Zainteresowania" value="+45%" color="blue" />
          <StatCard icon={<Lightbulb size={24} />} label="Nowości w tym tyg." value="12" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {IDEAS.filter(i => filter === 'all' || (filter === 'trending' && i.trending)).map((idea) => (
               <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={idea.id} 
                className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:border-amber-200 transition-all group flex flex-col h-full"
               >
                 <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-lg italic">
                      {idea.category}
                    </span>
                    {idea.trending && (
                      <span className="flex items-center gap-1 text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg uppercase italic animate-pulse">
                        <Sparkles size={10} /> Hot
                      </span>
                    )}
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-4 italic leading-tight group-hover:text-amber-600 transition-colors">{idea.title}</h3>
                 <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed italic flex-1">
                   {idea.desc}
                 </p>
                 <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Trudność</span>
                       <span className="text-xs font-black text-slate-700">{idea.difficulty}</span>
                    </div>
                    <div className="flex flex-col text-right">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Potencjał</span>
                       <span className="text-xs font-black text-emerald-600">{idea.potential}</span>
                    </div>
                 </div>
                 <button className="w-full mt-6 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-amber-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                    Szczegóły Modelu Biznesowego <ArrowRight size={14} />
                 </button>
               </motion.div>
             ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group border border-amber-500/20">
              <Gem className="mb-6 text-amber-400" size={48} />
              <h3 className="text-2xl font-black mb-4 leading-tight italic">Ekskluzywne Analizy</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium italic">Uzyskaj dostęp do szczegółowych kosztorysów i analiz prawnych dla każdego pomysłu.</p>
              <button className="w-full py-4 bg-amber-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-500 transition-all shadow-lg shadow-amber-600/30">
                Wybierz Plan Premium
              </button>
           </div>

           <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 italic">
                 <MessageCircle size={20} className="text-blue-600" /> Forum Ekspertów
              </h3>
              <div className="space-y-4">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="py-3 border-b border-slate-50 last:border-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-black">EK</div>
                         <div>
                            <p className="text-xs font-black text-slate-800">Ekspert Kamil</p>
                            <p className="text-[10px] text-slate-400 font-bold italic">Odpowiedział na pomysł #{i}</p>
                         </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-300" />
                   </div>
                 ))}
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  const colors: any = {
      amber: "bg-amber-50 text-amber-600 border-amber-100",
      emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      purple: "bg-purple-50 text-purple-600 border-purple-100"
  };

  return (
    <div className={cn("p-6 rounded-[32px] border shadow-sm transition-all hover:translate-y-[-4px]", colors[color])}>
        <div className="opacity-70 mb-4">{icon}</div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
        <p className="text-2xl font-black italic">{value}</p>
    </div>
  );
}
