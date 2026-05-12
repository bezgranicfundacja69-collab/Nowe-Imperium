import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Handshake, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Globe,
  Sparkles,
  MessageSquare,
  Building2,
  Rocket
} from 'lucide-react';
import { cn } from '../lib/utils';

import { ViewProps } from '../types/view';

export function CollaborationHub({ onNavigate, cart }: ViewProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">
          <Sparkles size={12} /> Współpraca & Kariera
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
          Buduj z nami <span className="text-blue-600">Nowe Imperium</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-bold italic text-lg">
          Szukamy wizjonerów, partnerów biznesowych i ekspertów, którzy chcą zautomatyzować przyszłość handlu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Looking for a job */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group">
           <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase size={28} />
           </div>
           <h3 className="text-2xl font-black italic mb-4">Szukam Pracy</h3>
           <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed italic">
             Dołącz do zespołu noweimperium AI. Szukamy programistów AI, specjalistów od e-commerce i marketingu.
           </p>
           <div className="space-y-3 mb-8">
              {['AI Engineer', 'Growth Hacker', 'Partner Success'].map(pos => (
                <div key={pos} className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest">
                   <CheckCircle2 size={14} className="text-blue-500" /> {pos}
                </div>
              ))}
           </div>
           <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
              Przeglądaj Oferty <ArrowRight size={14} />
           </button>
        </div>

        {/* Partnership / Propose Collaboration */}
        <div className="bg-slate-900 rounded-[40px] text-white p-8 shadow-2xl group border-t-8 border-blue-600">
           <div className="h-14 w-14 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
              <Handshake size={28} />
           </div>
           <h3 className="text-2xl font-black italic mb-4 text-blue-400">Współpraca B2B</h3>
           <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed italic">
             Jesteś dostawcą, agencją lub właścicielem marketplace? Wykorzystaj nasze API i zasięg, aby skalować swój biznes.
           </p>
           <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                 <Rocket size={16} className="text-blue-500 shrink-0 mt-1" />
                 <span className="text-xs font-bold italic opacity-80">Dostęp do bazy 1M+ aktywnych kupujących.</span>
              </li>
              <li className="flex items-start gap-3">
                 <Globe size={16} className="text-blue-500 shrink-0 mt-1" />
                 <span className="text-xs font-bold italic opacity-80">Logistyka w 24 krajach UE.</span>
              </li>
           </ul>
           <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              Zaproponuj Model
           </button>
        </div>

        {/* Join Us / Community */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all group">
           <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users size={28} />
           </div>
           <h3 className="text-2xl font-black italic mb-4">Dołącz do Nas</h3>
           <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed italic">
             Stwórz profil ambasadora Nowego Imperium. Promuj automatyzację i zarabiaj w modelu Revenue Share.
           </p>
           <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8 italic">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dla kogo?</p>
              <p className="text-xs font-bold text-slate-700">Influencerzy, Blogerzy & Przedsiębiorcy</p>
           </div>
           <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
              Zostań Ambasadorem <Plus size={14} />
           </button>
        </div>
      </div>

      {/* Quick Contact / Inquiry */}
      <div className="bg-blue-600 rounded-[40px] p-10 md:p-20 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12 pointer-events-none">
            <Building2 size={240} />
         </div>
         <div className="relative z-10 max-w-2xl">
            <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-6">Masz dedykowany pomysł na współpracę?</h3>
            <p className="text-xl font-medium italic opacity-80 mb-10 leading-relaxed">
              Opisz nam swój projekt lub prześlij CV. Nasz zespół (i noweAgent) przeanalizuje Twoje zgłoszenie w 48h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <button className="px-10 py-5 bg-white text-blue-600 rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-3">
                  <MessageSquare size={16} /> Napisz do Nas
               </button>
               <button className="px-10 py-5 bg-blue-700 text-white border border-blue-500 rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all">
                  Więcej o Firmie
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
