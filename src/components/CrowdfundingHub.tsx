import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Target, 
  Users, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  HandHeart,
  Gift,
  Search,
  Plus
} from 'lucide-react';
import { formatPrice, cn } from '../lib/utils';

const CAMPAIGNS = [
  {
    id: '1',
    title: 'Eko-Logistyka 2026',
    category: 'Technologia',
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=2070',
    goal: 500000,
    raised: 345000,
    backers: 1240,
    daysLeft: 12,
    desc: 'Rozbudowa floty autonomicznych dronów dostawczych dla modelu dropshipping.'
  },
  {
    id: '2',
    title: 'Fundacja Digital Future',
    category: 'Fundacja',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2070',
    goal: 100000,
    raised: 82000,
    backers: 560,
    daysLeft: 45,
    desc: 'Program edukacyjny dla młodych przedsiębiorców z mniejszych miejscowości.'
  },
  {
    id: '3',
    title: 'Startup Accelerator PL',
    category: 'Biznes',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070',
    goal: 1000000,
    raised: 120000,
    backers: 89,
    daysLeft: 60,
    desc: 'Wsparcie polskiej myśli technologicznej w obszarze AI i E-commerce.'
  }
];

import { ViewProps } from '../types/view';

export function CrowdfundingHub({ onNavigate, cart }: ViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'foundation' | 'mine'>('all');

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[3rem] bg-prestige-950 p-10 text-white shadow-2xl sm:p-20 group min-h-[400px] flex items-center border border-white/5">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2070" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-[2000ms] group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-prestige-950 via-prestige-950/60 to-transparent" />
        </div>
        <div className="relative z-10 w-full">
            <div className="flex items-center gap-4 mb-10">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-accent-indigo/10 px-5 py-2 text-[10px] font-technical font-bold uppercase tracking-[0.3em] text-accent-indigo border border-accent-indigo/20 backdrop-blur-md">
                <Target size={14} className="animate-pulse" /> Community Funding
              </div>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter sm:text-8xl mb-8 uppercase italic leading-none">
              Social <span className="text-accent-indigo">Impact</span>
            </h1>
            <p className="text-prestige-400 max-w-xl text-xl font-medium leading-relaxed italic border-l-2 border-accent-indigo/30 pl-6">
              Wspieraj innowacje i cele charytatywne wewnątrz ekosystemu noweimperium. Buduj przyszłość razem z nami.
            </p>
        </div>
      </div>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard icon={<Users />} label="Społeczność" value="24.5k+" sub="Aktywnych wspierających" />
        <StatCard icon={<TrendingUp />} label="Suma Wsparcia" value="12.4M PLN" sub="Zrealizowane cele" />
        <StatCard icon={<ShieldCheck />} label="Bezpieczeństwo" value="100%" sub="Gwarancja noweTrust" />
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-4 rounded-[2.5rem] border border-prestige-200 shadow-sm">
           <div className="flex items-center gap-2 p-1 bg-prestige-50 rounded-2xl">
              <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} label="Wszystkie Zbiórki" />
              <TabButton active={activeTab === 'foundation'} onClick={() => setActiveTab('foundation')} label="Fundacja" />
              <TabButton active={activeTab === 'mine'} onClick={() => setActiveTab('mine')} label="Moje Wsparcie" />
           </div>
           
           <div className="flex items-center gap-4">
              <button className="prestige-button-primary !py-4 !px-8 !rounded-2xl flex items-center gap-2">
                <Plus size={20} /> Utwórz Projekt
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAMPAIGNS.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>

      {/* Foundation Section */}
      <section className="bg-white rounded-[3rem] border border-prestige-200 p-12 shadow-sm relative overflow-hidden group">
         <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
               <div className="h-16 w-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-sm">
                  <HandHeart size={32} />
               </div>
               <div>
                  <h2 className="text-4xl font-display font-bold text-prestige-950 tracking-tight mb-4">noweFoundation</h2>
                  <p className="text-lg text-prestige-500 leading-relaxed font-medium italic">
                    Nasza fundacja zajmuje się wyrównywaniem szans w dostępie do technologii i edukacji biznesowej. 
                    Przeznaczamy 1% zysków z każdej transakcji na cele statutowe.
                  </p>
               </div>
               <div className="flex flex-wrap gap-4">
                  <button className="prestige-button-primary !py-5 !px-10 !rounded-2xl !bg-rose-600 hover:!bg-rose-700 shadow-xl shadow-rose-600/20">
                    Chcę Pomóc
                  </button>
                  <button className="prestige-button-secondary !py-5 !px-10 !rounded-2xl">
                    Raport Transparentności
                  </button>
               </div>
            </div>
            <div className="lg:w-1/3">
               <div className="bg-prestige-50 rounded-[2.5rem] p-8 border border-prestige-100 italic space-y-4">
                  <QuoteIcon />
                  <p className="text-prestige-600 font-medium">"Technologia bez empatii to tylko zimny kod. W noweimperium budujemy nie tylko biznes, ale i lepsze jutro."</p>
                  <div className="pt-4 border-t border-prestige-200">
                    <p className="font-bold text-prestige-950">Arkadiusz S.</p>
                    <p className="text-xs text-prestige-400">Founder noweimperium AI</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-prestige-200 shadow-sm group hover:scale-[1.02] transition-all">
      <div className="h-12 w-12 rounded-xl bg-prestige-50 text-accent-indigo flex items-center justify-center mb-6 group-hover:bg-accent-indigo group-hover:text-white transition-colors">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <p className="text-[10px] font-technical font-bold text-prestige-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-display font-black text-prestige-950 tracking-tight">{value}</p>
      <p className="text-xs text-prestige-400 font-medium italic mt-2">{sub}</p>
    </div>
  );
}

function TabButton({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-2.5 rounded-xl text-[10px] font-technical font-bold uppercase tracking-widest transition-all",
        active ? "bg-white text-prestige-950 shadow-sm" : "text-prestige-400 hover:text-prestige-600"
      )}
    >
      {label}
    </button>
  );
}

function CampaignCard({ campaign }: any) {
  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2.5rem] overflow-hidden border border-prestige-200 shadow-sm group"
    >
      <div className="h-48 relative overflow-hidden">
        <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4">
           <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-technical font-bold uppercase tracking-widest text-prestige-950">
             {campaign.category}
           </span>
        </div>
      </div>
      <div className="p-8 space-y-6">
        <div>
          <h3 className="text-xl font-display font-bold text-prestige-950 mb-2 truncate">{campaign.title}</h3>
          <p className="text-sm text-prestige-500 leading-relaxed line-clamp-2 italic">{campaign.desc}</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] font-technical font-bold uppercase tracking-widest">
            <span className="text-accent-indigo">{formatPrice(campaign.raised)}</span>
            <span className="text-prestige-400">{Math.round(progress)}% celu</span>
          </div>
          <div className="h-2 w-full bg-prestige-50 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 1, delay: 0.5 }}
               className="h-full bg-accent-indigo" 
             />
          </div>
          <div className="flex items-center justify-between text-[10px] font-technical font-bold uppercase tracking-widest pt-1">
            <span className="text-prestige-900">{campaign.backers} Wspierających</span>
            <span className="text-prestige-400">{campaign.daysLeft} Dni do końca</span>
          </div>
        </div>

        <button className="prestige-button-secondary w-full !py-4 !rounded-2xl group-hover:bg-prestige-950 group-hover:text-white transition-all">
          Wesprzyj Projekt
        </button>
      </div>
    </motion.div>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-rose-200">
      <path d="M10 8V12H6V16H10V24H2V12L6 4H10V8ZM22 8V12H18V16H22V24H14V12L18 4H22V8Z" fill="currentColor"/>
    </svg>
  );
}
