import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Search, 
  Plus, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  FileText,
  Presentation,
  DollarSign,
  Briefcase,
  Monitor,
  Cpu,
  Video,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { formatPrice, cn } from '../lib/utils';

const INVESTORS = [
  {
    id: '1',
    name: 'noweVentures Capital',
    focus: ['AI', 'SaaS', 'Logistics'],
    ticket: '100k - 2M PLN',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    desc: 'Fundusz typu seed/series A skupiony na technologiach e-commerce.'
  },
  {
    id: '2',
    name: 'Helena Wolf',
    focus: ['Retail', 'GreenTech', 'DTC'],
    ticket: '50k - 500k PLN',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1976',
    desc: 'Anioł biznesu z ramienia byłych dyrektorów Amazon Europe.'
  },
  {
    id: '3',
    name: 'Digital Dawn Equity',
    focus: ['Fintech', 'Marketplace', 'Big Data'],
    ticket: '200k - 5M PLN',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2069',
    desc: 'Strategiczny fundusz wspierający globalną ekspansję polskich marek.'
  }
];

import { ViewProps } from '../types/view';

export function PitchDeckHub({ onNavigate, cart }: ViewProps) {
  const [activeTab, setActiveTab] = useState<'pitch' | 'browse' | 'finance'>('pitch');

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[3rem] bg-prestige-950 p-10 text-white shadow-2xl sm:p-20 group min-h-[420px] flex items-center border border-white/5">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-[2000ms] group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-prestige-950 via-prestige-950/60 to-transparent" />
        </div>
        <div className="relative z-10 w-full">
            <div className="flex items-center gap-4 mb-10">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-accent-indigo/10 px-5 py-2 text-[10px] font-technical font-bold uppercase tracking-[0.3em] text-accent-indigo border border-accent-indigo/20 backdrop-blur-md">
                <Rocket size={14} className="animate-pulse" /> Venture Capital Hub
              </div>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter sm:text-8xl mb-8 uppercase italic leading-none">
              Founders <span className="text-accent-indigo">Lounge</span>
            </h1>
            <p className="text-prestige-400 max-w-xl text-xl font-medium leading-relaxed italic border-l-2 border-accent-indigo/30 pl-6">
              Przedstaw swój biznes lub prototyp przed gronem najlepszych inwestorów. Znajdź finansowanie i przyspiesz swój wzrost.
            </p>
        </div>
      </div>

      <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-prestige-200 shadow-sm w-fit mx-auto">
         <TabButton active={activeTab === 'pitch'} onClick={() => setActiveTab('pitch')} label="Twój Pitch" icon={<Presentation size={14} />} />
         <TabButton active={activeTab === 'browse'} onClick={() => setActiveTab('browse')} label="Baza Inwestorów" icon={<Search size={14} />} />
         <TabButton active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} label="Finansowanie" icon={<DollarSign size={14} />} />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'pitch' && (
          <motion.div 
            key="pitch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
             <div className="space-y-8 bg-white p-12 rounded-[3rem] border border-prestige-200 shadow-sm">
                <div className="h-16 w-16 rounded-2xl bg-prestige-50 text-accent-indigo flex items-center justify-center border border-prestige-100 shadow-inner">
                   <Monitor size={32} />
                </div>
                <div>
                   <h2 className="text-4xl font-display font-bold text-prestige-950 tracking-tight mb-4">Wgraj Prototyp / Deck</h2>
                   <p className="text-lg text-prestige-500 font-medium italic">Nasze AI zanalizuje Twój model biznesowy i dopasuje Cię do odpowiednich inwestorów.</p>
                </div>
                <div className="border-4 border-dashed border-prestige-100 rounded-[2rem] p-16 text-center group hover:border-accent-indigo/30 transition-all cursor-pointer bg-prestige-50/50">
                   <div className="flex flex-col items-center gap-4">
                      <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-prestige-400 group-hover:text-accent-indigo group-hover:scale-110 transition-all shadow-sm">
                         <Plus size={40} />
                      </div>
                      <p className="text-sm font-technical font-bold text-prestige-400 uppercase tracking-widest">Kliknij lub przeciągnij plik PDF/Video</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <CheckItem text="Analiza techniczna kodu i architektury" />
                   <CheckItem text="Weryfikacja modelu ekonomicznego (Tokenomics)" />
                   <CheckItem text="Dopasowanie do tezy inwestycyjnej funduszy" />
                </div>
             </div>

             <div className="space-y-8">
                <div className="bg-prestige-950 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden h-full">
                   <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-accent-indigo/10 blur-[80px]" />
                   <div className="relative z-10 space-y-8">
                      <div className="h-16 w-16 rounded-2xl bg-white/10 text-accent-indigo flex items-center justify-center border border-white/5 backdrop-blur-md">
                        <Video size={32} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-display font-bold mb-4 tracking-tight">Kamera Founders Hub</h3>
                        <p className="text-prestige-400 font-medium italic leading-relaxed">
                          Nagraj 60-sekundowy pitch bezpośrednio w aplikacji. Twoje wideo trafi do selektywnej grupy funduszy Angel & Seed.
                        </p>
                      </div>
                      <button className="prestige-button-primary !py-5 !px-12 !rounded-2xl shadow-xl shadow-accent-indigo/20">
                         Start Recording
                      </button>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {activeTab === 'browse' && (
          <motion.div 
            key="browse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {INVESTORS.map((investor) => (
              <InvestorCard key={investor.id} investor={investor} />
            ))}
          </motion.div>
        )}

        {activeTab === 'finance' && (
          <motion.div 
            key="finance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[3rem] border border-prestige-200 p-12 shadow-sm"
          >
             <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 space-y-8">
                   <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-inner">
                      <DollarSign size={32} />
                   </div>
                   <div>
                      <h2 className="text-4xl font-display font-bold text-prestige-950 tracking-tight mb-4">Szybkie Finansowanie Obrotowe</h2>
                      <p className="text-lg text-prestige-500 font-medium italic">
                        Potrzebujesz kapitału na zakup towaru przed chińskim nowym rokiem? Skorzystaj z finansowania opartego o Twoje obroty (Revenue Based Financing).
                      </p>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FinanceFeature icon={<Zap />} title="Decyzja w 2h" desc="Analiza Twoich obrotów na noweimperium." />
                      <FinanceFeature icon={<ShieldCheck />} title="Bez żyrantów" desc="Finansowanie bez zbędnej biurokracji." />
                   </div>
                   <button className="prestige-button-primary !py-5 !px-12 !rounded-2xl !bg-emerald-600 hover:!bg-emerald-700 shadow-xl shadow-emerald-600/20">
                      Sprawdź Limit
                   </button>
                </div>
                <div className="lg:w-1/3 bg-prestige-50 p-10 rounded-[2.5rem] border border-prestige-100 italic">
                   <Lightbulb className="text-accent-indigo mb-6" size={32} />
                   <p className="text-prestige-600 font-medium">
                     "Większość startupów e-commerce nie potrzebuje venture capital, lecz inteligentnego kapitału obrotowego. My dostarczamy oba."
                   </p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({ active, onClick, label, icon }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-xl text-[10px] font-technical font-bold uppercase tracking-widest transition-all flex items-center gap-2",
        active ? "bg-prestige-950 text-white shadow-lg" : "text-prestige-400 hover:text-prestige-600"
      )}
    >
      {icon} {label}
    </button>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-prestige-600 font-medium italic">
      <CheckCircle2 size={18} className="text-accent-indigo" /> {text}
    </div>
  );
}

function FinanceFeature({ icon, title, desc }: any) {
  return (
    <div className="bg-prestige-50/50 p-6 rounded-2xl border border-prestige-100">
       <div className="text-accent-indigo mb-3">{React.cloneElement(icon, { size: 20 })}</div>
       <p className="text-xs font-technical font-bold text-prestige-950 uppercase tracking-widest mb-1">{title}</p>
       <p className="text-[11px] text-prestige-400 font-medium italic">{desc}</p>
    </div>
  );
}

function InvestorCard({ investor }: any) {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-prestige-200 shadow-sm group hover:scale-[1.02] transition-all">
       <div className="h-48 relative">
          <img src={investor.image} alt={investor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-prestige-950/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
             <h4 className="text-xl font-display font-bold text-white tracking-tight">{investor.name}</h4>
          </div>
       </div>
       <div className="p-8 space-y-6">
          <div className="flex flex-wrap gap-2">
             {investor.focus.map((f: string) => (
                <span key={f} className="text-[8px] font-technical font-bold px-2 py-0.5 bg-prestige-50 text-prestige-500 rounded-full uppercase tracking-widest border border-prestige-100">{f}</span>
             ))}
          </div>
          <p className="text-sm text-prestige-500 leading-relaxed italic line-clamp-2">{investor.desc}</p>
          <div className="pt-6 border-t border-prestige-100 flex items-center justify-between">
             <div className="space-y-1">
                <p className="text-[8px] font-technical font-bold text-prestige-400 uppercase tracking-widest">Ticket Size</p>
                <p className="text-sm font-display font-bold text-prestige-950">{investor.ticket}</p>
             </div>
             <button className="h-10 w-10 rounded-full bg-prestige-50 text-accent-indigo flex items-center justify-center hover:bg-accent-indigo hover:text-white transition-all shadow-sm">
                <MessageSquare size={18} />
             </button>
          </div>
       </div>
    </div>
  );
}
