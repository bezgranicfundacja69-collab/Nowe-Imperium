import { 
  Briefcase, 
  Lightbulb, 
  TrendingUp, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  Rocket, 
  Layout, 
  ArrowRight,
  Sparkles,
  Search,
  Truck,
  Code2,
  Building2,
  Globe,
  Palmtree,
  Workflow,
  Bot,
  Megaphone
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState } from 'react';

const DEPARTMENTS = [
  { 
    id: 'advertising', 
    title: 'Dział Baner Reklamowy', 
    icon: Layout, 
    desc: 'Profesjonalne kampanie reklamowe i widoczność Twojej marki w sieci OmniMarket.',
    color: 'bg-blue-50 text-blue-600',
    stats: '150k+ Wyświetleń/mc',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'prototypes', 
    title: 'Dział Prototypy', 
    icon: Lightbulb, 
    desc: 'Wsparcie w budowaniu MVP, druk 3D i modelowanie rozwiązań technicznych.',
    color: 'bg-amber-50 text-amber-600',
    stats: '45 Aktywnych projektów',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'investors', 
    title: 'Dział Inwestorów', 
    icon: TrendingUp, 
    desc: 'Łączymy innowacyjne pomysły z kapitałem. Znajdź anioła biznesu lub fundusz VC.',
    color: 'bg-emerald-50 text-emerald-600',
    stats: '2.5M PLN Zainwestowane',
    img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'grants', 
    title: 'Dział Dotacje', 
    icon: FileText, 
    desc: 'Pozyskiwanie funduszy unijnych i krajowych na cyfryzację i rozwój firmy.',
    color: 'bg-indigo-50 text-indigo-600',
    stats: '85% Skuteczności',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'loans', 
    title: 'Dział Kredyty', 
    icon: CreditCard, 
    desc: 'Finansowanie dłużne na preferencyjnych warunkach dla użytkowników platformy.',
    color: 'bg-rose-50 text-rose-600',
    stats: 'Decyzja w 24h',
    img: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'insurance', 
    title: 'Dział Ubezpieczenia', 
    icon: ShieldCheck, 
    desc: 'Ochrona Twojego biznesu, towarów i życia w cyfrowym świecie.',
    color: 'bg-sky-50 text-sky-600',
    stats: 'Pełna ochrona 24/7',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'incubator', 
    title: 'Inkubator Przedsiębiorczości', 
    icon: Rocket, 
    desc: 'Mentoring, biuro i doradztwo dla startujących firm i młodych przedsiębiorców.',
    color: 'bg-purple-50 text-purple-600',
    stats: '60+ Zinkubowanych firm',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'logistics', 
    title: 'Dział Logistyki', 
    icon: Truck, 
    desc: 'Magazynowanie, pakowanie i wysyłka Twoich towarów. Pełny outsourcing fulfillmentu.',
    color: 'bg-orange-50 text-orange-600',
    stats: 'Dostawa 24h w całej UE',
    img: 'https://images.unsplash.com/photo-1586528116311-ad86d7c49b6b?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'it-services', 
    title: 'Dział IT & AI', 
    icon: Code2, 
    desc: 'Tworzenie dedykowanego oprogramowania, sklepów i automatyzacji AI dla Twojej firmy.',
    color: 'bg-cyan-50 text-cyan-600',
    stats: 'Top 1% deweloperów',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  }
];

const NEW_DEPARTMENTS = [
  { 
    id: 'tourism', 
    title: 'Dział Turystyka', 
    icon: Palmtree, 
    desc: 'Zintegrowane rezerwacje, mapy podróży i wsparcie dla biur podróży w ekosystemie.',
    color: 'bg-sky-50 text-sky-600',
    stats: 'Globalne zasięgi',
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'idea-bank', 
    title: 'Bank Pomysłów', 
    icon: Lightbulb, 
    desc: 'Repozytorium sprawdzonych modeli biznesowych i trendów rynkowych na rok 2026.',
    color: 'bg-amber-50 text-amber-600',
    stats: '100+ Konceptów',
    img: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'ai-scraping', 
    title: 'AI Scraper Hub', 
    icon: Workflow, 
    desc: 'Automatyczne pobieranie produktów, synchronizacja stanów i inteligentny import danych.',
    color: 'bg-slate-900 text-white',
    stats: 'Auto-Sync 24/7',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'affiliate-bot', 
    title: 'Bot Afiliacyjny AI', 
    icon: Bot, 
    desc: 'Autonomiczny agent do wyszukiwania niszowych ofert i generowania kampanii zarobkowych.',
    color: 'bg-indigo-600 text-white',
    stats: 'ROI +300%',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'marketing-manager', 
    title: 'Marketing Manager AI', 
    icon: Megaphone, 
    desc: 'Twój osobisty komandor marketingu. Autonomiczne planowanie kampanii i optymalizacja Ads.',
    color: 'bg-blue-600 text-white',
    stats: 'CTR +450%',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'ready-businesses', 
    title: 'Gotowe Biznesy', 
    icon: Building2, 
    desc: 'Przejmij dochodowe projekty, franczyzy lub sklepy i zacznij zarabiać od zaraz.',
    color: 'bg-emerald-600 text-white',
    stats: 'Gwarancja Startu',
    img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'omni-bots', 
    title: 'OmniBot Node', 
    icon: Bot, 
    desc: 'Autonomiczne zarządzanie, zamawianie i promowanie produktów. Twoje boty 24/7.',
    color: 'bg-blue-900 text-white',
    stats: 'Pełna Autonomia',
    img: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800'
  }
];

interface BusinessHubProps {
  onCategorySelect?: (cat: string, sub: string) => void;
  onViewChange?: (view: any) => void;
}

export function BusinessHub({ onCategorySelect, onViewChange }: BusinessHubProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'finance' | 'innovation'>('all');

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
                alt="Business Hub" 
                className="w-full h-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono">
            <Sparkles size={14} className="animate-spin-slow" /> Business Growth Hub
          </div>
          <h1 className="text-4xl font-black mb-6 leading-tight sm:text-7xl italic">
            Centrum <br />Rozwoju <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-black">Biznesu</span>
          </h1>
          <p className="text-slate-400 mb-10 text-lg font-medium leading-relaxed italic">
            Od pomysłu, przez finansowanie, aż po globalną promocję. Wszystkie działy wspierające Twój sukces w jednym miejscu.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...DEPARTMENTS, ...NEW_DEPARTMENTS].map((dept) => (
          <motion.div 
            key={dept.id}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:border-blue-100 cursor-pointer overflow-hidden"
            onClick={() => {
                if (dept.id === 'tourism') return onViewChange?.('tourism');
                if (dept.id === 'idea-bank') return onViewChange?.('idea-bank');
                if (dept.id === 'ai-scraping') return onViewChange?.('ai-scraping');
                if (dept.id === 'affiliate-bot') return onViewChange?.('affiliate-bot');
                if (dept.id === 'marketing-manager') return onViewChange?.('marketing-manager');
                if (dept.id === 'ready-businesses') return onViewChange?.('ready-businesses');
                if (dept.id === 'omni-bots') return onViewChange?.('omni-bots');
                
                const subMap: any = {
                    'investors': 'investors',
                    'grants': 'grants',
                    'loans': 'loans',
                    'insurance': 'insurance',
                    'incubator': 'incubator',
                    'prototypes': 'prototypes',
                    'advertising': 'marketing'
                };
                onCategorySelect?.('business', subMap[dept.id]);
            }}
          >
            {/* Background Graphic on Hover */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <img 
                    src={dept.img} 
                    alt="" 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                />
            </div>

            <div className="relative z-10">
                <div className={cn("inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-sm transition-transform group-hover:scale-110", dept.color)}>
                  <dept.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{dept.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                  {dept.desc}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{dept.stats}</span>
                   <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ArrowRight size={18} />
                   </div>
                </div>
            </div>
          </motion.div>
        ))}
        
        {/* Placeholder for AI matching */}
        <div className="lg:col-span-2 rounded-[32px] bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <h3 className="text-2xl font-black mb-2">OmniMatch AI Investors</h3>
                    <p className="text-indigo-100 text-sm font-medium max-w-sm">Nasz system AI dopasuje Twój projekt do najlepszych inwestorów i funduszy dotacyjnych w 60 sekund.</p>
                </div>
                <button className="mt-8 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2 w-fit">
                   Uruchom Dopasowanie AI <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
