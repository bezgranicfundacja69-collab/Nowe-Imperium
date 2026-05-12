import { useState } from 'react';
import { 
  Gamepad2, 
  GraduationCap, 
  Trophy, 
  Star,
  Zap,
  Target,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import React from 'react';

import { ViewProps } from '../types/view';

export function RewardsCenter({ onNavigate, cart }: ViewProps) {
  const [activeTab, setActiveTab] = useState<'games' | 'courses' | 'tasks'>('games');

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-indigo-900 p-8 text-white shadow-2xl sm:p-16">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-600/30 blur-[100px]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-indigo-200">
             <Trophy size={14} className="text-amber-400" /> noweRewards System v2
          </div>
          <h1 className="text-4xl font-black mb-6 sm:text-6xl leading-tight">
            Zmieniaj Swój Czas <br /> w <span className="text-blue-400">Zysk</span>
          </h1>
          
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setActiveTab('games')} className={cn("px-6 py-4 rounded-2xl text-sm font-bold transition-all", activeTab === 'games' ? "bg-white text-slate-900 shadow-xl" : "bg-white/5 text-white")}>Graj i Zarabiaj</button>
            <button onClick={() => setActiveTab('tasks')} className={cn("px-6 py-4 rounded-2xl text-sm font-bold transition-all", activeTab === 'tasks' ? "bg-white text-slate-900 shadow-xl" : "bg-white/5 text-white")}>Zadania</button>
            <button onClick={() => setActiveTab('courses')} className={cn("px-6 py-4 rounded-2xl text-sm font-bold transition-all", activeTab === 'courses' ? "bg-white text-slate-900 shadow-xl" : "bg-white/5 text-white")}>Akademia</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {activeTab === 'games' && <GamesList />}
          {activeTab === 'tasks' && <TasksList />}
          {activeTab === 'courses' && <CoursesList />}
        </div>
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Trophy className="text-amber-500" size={20} /> Ranking Graczy</h3>
             <div className="space-y-4">
               <RankingItem rank={1} name="Lukasz_99" amount="4,250 PLN" />
               <RankingItem rank={2} name="DevMaster" amount="3,120 PLN" />
             </div>
           </div>
        </aside>
      </div>
    </div>
  );
}

function GamesList() {
  const games = [
    { title: "Meta Trader Sim", reward: "Do 500 PLN/tydz", img: "https://images.unsplash.com/photo-1611974717482-58a2d201988e?auto=format&fit=crop&q=80&w=800", provider: "noweimperium AI" },
    { title: "AI Cyberpunk Quest", reward: "5.00 PLN/misja", img: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800", provider: "noweimperium AI" }
  ];

  const externalPlatforms = [
    { name: "Mistplay", type: "Mobile Games", url: "https://www.mistplay.com/", desc: "Zarabiaj karty podarunkowe grając w gry na Androida." },
    { name: "Swagbucks", type: "Multi-Task", url: "https://www.swagbucks.com/", desc: "Punkty za gry, ankiety i zakupy online." },
    { name: "Buff.game", type: "PC/Console", url: "https://buff.game/", desc: "Zarabiaj grając w LoL, CS:GO, Fortnite i inne." },
    { name: "Gamehag", type: "Hardcore Gaming", url: "https://gamehag.com/pl", desc: "Zadania w grach MMO i RPG za Kamienie Dusz." }
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map(game => (
          <motion.div 
            key={game.title} 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
          >
            <img src={game.img} className="aspect-video w-full object-cover" referrerPolicy="no-referrer" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Weryfikowane przez AI</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{game.title}</h3>
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{game.reward}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Star className="text-amber-500 fill-amber-500" size={24} /> Sprawdzone Platformy Zewnętrzne
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {externalPlatforms.map(platform => (
             <a 
              key={platform.name}
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group"
             >
               <div className="flex items-center justify-between mb-3">
                 <h3 className="font-black text-slate-900 text-lg">{platform.name}</h3>
                 <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors" />
               </div>
               <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{platform.type}</p>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">{platform.desc}</p>
             </a>
           ))}
        </div>
      </div>
    </div>
  );
}

function TasksList() {
  return <div className="p-12 text-center bg-white rounded-[32px] font-bold text-slate-400">Pobieranie zadań...</div>;
}

function CoursesList() {
  return <div className="p-12 text-center bg-white rounded-[32px] font-bold text-slate-400">Brak nowych kursów.</div>;
}

function RankingItem({ rank, name, amount }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
      <div className="flex items-center gap-3"><span className="font-black text-blue-600">#{rank}</span> <span className="text-sm font-bold">{name}</span></div>
      <span className="text-sm font-black">{amount}</span>
    </div>
  );
}
