import { 
  Bot, 
  HelpCircle, 
  Search, 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  BookOpen, 
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Brain,
  Video,
  FileQuestion
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';

import { ViewProps } from '../types/view';

export function AIHelpView({ onNavigate, cart }: ViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const HELP_TOPICS = [
    { 
      title: 'Jak zacząć?', 
      icon: Zap, 
      desc: 'Szybki start w ekosystemie noweimperium. Konfiguracja portfela i pierwsza oferta.',
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      title: 'Możliwości AI', 
      icon: Brain, 
      desc: 'Poznaj moc naszych botów: od generowania opisów po automatyczne kampanie Ads.',
      color: 'bg-purple-50 text-purple-600'
    },
    { 
      title: 'Zarabianie i Rewards', 
      icon: TrendingUp, 
      desc: 'Jak efektywnie używać Affiliate Bota i zbierać nagrody w Centrum Nagród.',
      color: 'bg-emerald-50 text-emerald-600'
    },
    { 
      title: 'Bezpieczeństwo', 
      icon: ShieldCheck, 
      desc: 'Twoje dane i finanse are chronione przez noweShield AI. Dowiedz się jak.',
      color: 'bg-rose-50 text-rose-600'
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.3),transparent)]" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono">
            <Sparkles size={14} className="animate-spin-slow" /> noweHelp AI
          </div>
          <h1 className="text-4xl font-black mb-6 leading-tight sm:text-7xl italic">
            Centrum <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Pomocy AI</span>
          </h1>
          <p className="text-slate-400 mb-10 text-lg font-medium leading-relaxed italic">
            Masz pytania? Nasz agent AI oraz baza wiedzy pomogą Ci zmaksymalizować zyski i zautomatyzować Twój biznes.
          </p>

          <div className="relative max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="W czym możemy Ci pomóc?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] py-6 pl-14 pr-8 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HELP_TOPICS.map((topic, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -8 }}
            className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm", topic.color)}>
              <topic.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{topic.title}</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 italic">
              {topic.desc}
            </p>
            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
              Czytaj więcej <ArrowRight size={14} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded-[48px] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap size={120} className="text-blue-600" />
             </div>
             <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
               <Zap className="text-blue-600" /> Jak zacząć? - Szybki Start
             </h2>
             
             <div className="grid gap-6 relative z-10">
                {[
                  { 
                    step: "01", 
                    title: "Rejestracja i Profil", 
                    desc: "Załóż konto i uzupełnij podstawowe dane profilowe, aby budować zaufanie w społeczności." 
                  },
                  { 
                    step: "02", 
                    title: "Konfiguracja Portfela", 
                    desc: "Przejdź do 'Mój Portfel', aby ustawić walutę rozliczeniową i zabezpieczyć swoje przyszłe zyski." 
                  },
                  { 
                    step: "03", 
                    title: "Wystaw Pierwszą Ofertę", 
                    desc: "Kliknij 'Wystaw Ofertę' w panelu Sprzedawcy. Nasze AI wyręczy Cię w tworzeniu profesjonalnego opisu." 
                  },
                  { 
                    step: "04", 
                    title: "Aktywacja noweBot Node", 
                    desc: "Uruchom swojego pierwszego agenta AI, który będzie czuwał nad Twoim biznesem 24/7." 
                  }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                     <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-lg">
                        {step.step}
                     </div>
                     <div className="pt-2">
                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                        <p className="text-slate-500 text-sm italic">{step.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
             
             <div className="mt-10 p-6 rounded-3xl bg-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="font-bold text-sm italic">Czujesz się gotowy? Zacznij zarabiać już teraz!</p>
                <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                   Otwórz Panel Sprzedawcy
                </button>
             </div>
          </section>

          <section className="bg-white rounded-[48px] p-8 md:p-12 border border-slate-100 shadow-sm">
             <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
               <BookOpen className="text-blue-600" /> Najczęściej czytane
             </h2>
             <div className="space-y-4">
                {[
                  "Jak skonfigurować portfel do wypłat?",
                  "Pierwsza kampania z Marketing Managerem AI",
                  "Zasady bezpieczeństwa transakcji",
                  "Jak działają poziomy nagród?"
                ].map((q, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 transition-all text-left group">
                    <span className="text-sm font-bold text-slate-700">{q}</span>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
             </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-white/10 blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <MessageSquare className="mb-6" size={40} />
              <h3 className="text-2xl font-black mb-4">Czat z Agentem AI</h3>
              <p className="text-blue-100 text-sm font-medium mb-8 leading-relaxed italic">Nasz zaawansowany model Gemini pomoże Ci w czasie rzeczywistym rozwiązać każdy problem.</p>
              <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                Uruchom Czat Pomocy
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 italic">
               <Video className="text-blue-600" /> Wideo Poradniki
            </h3>
            <div className="aspect-video w-full rounded-2xl bg-slate-100 flex items-center justify-center relative overflow-hidden group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform" />
               <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-blue-600 border-b-[8px] border-b-transparent ml-1" />
                  </motion.div>
               </div>
            </div>
            <p className="mt-4 text-xs font-bold text-slate-600 text-center">Przewodnik po ekosystemie noweimperium (1:45)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
