import { 
  AppWindow, 
  Smartphone, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  Bot, 
  TrendingUp, 
  Database,
  Cpu,
  Monitor
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function OurAppsView() {
  const APPS = [
    {
      id: 'alpinator',
      name: 'Alpinator v4.2',
      category: 'Automatyzacja Handlu',
      desc: 'Najpotężniejszy bot do dropshippingu i arbitrażu rynkowego. Sam znajduje produkty i wystawia je na 12 rynkach jednocześnie.',
      icon: TrendingUp,
      stats: 'Zysk +24% m/m',
      color: 'from-blue-600 to-indigo-600',
      badge: 'TOP SELLER'
    },
    {
      id: 'omnibot',
      name: 'OmniBot Node',
      category: 'Sztuczna Inteligencja',
      desc: 'Twój osobisty agent AI operujący w chmurze 24/7. Zarządza wiadomościami, negocjacjami i logistyką Twojego biznesu.',
      icon: Bot,
      stats: 'Status: Active',
      color: 'from-purple-600 to-fuchsia-600',
      badge: 'PRO'
    },
    {
      id: 'marketing-manager',
      name: 'Marketing Manager AI',
      category: 'Reklama & SEO',
      desc: 'Automatyczny system reklamowy. Tworzy grafiki, pisze teksty sprzedażowe i optymalizuje budżet na FB, Google i TikToku.',
      icon: Zap,
      stats: 'ROI 4.5x',
      color: 'from-amber-500 to-orange-600',
      badge: 'AUTOPILOT'
    },
    {
      id: 'scraping-node',
      name: 'OmniScraper Pro',
      category: 'Data Mining',
      desc: 'Pobiera dane o produktach, cenach i trendach z dowolnej strony internetowej. Idealny do badania konkurencji.',
      icon: Database,
      stats: '1M+ req/day',
      color: 'from-emerald-500 to-teal-600',
      badge: 'FAST'
    },
    {
      id: 'mobile-app',
      name: 'OmniMarket Mobile',
      category: 'Aplikacja Mobilna',
      desc: 'Zarządzaj swoim imperium AI z poziomu telefonu. Powiadomienia push o każdej sprzedaży i automatyczna odpowiedź AI.',
      icon: Smartphone,
      stats: 'iOS / Android',
      color: 'from-rose-500 to-pink-600',
      badge: 'VIVA'
    },
    {
      id: 'media-node',
      name: 'OmniMedia Hub',
      category: 'Treści AI',
      desc: 'Generator profesjonalnych filmów i newsów branżowych. Automatycznie publikuje na Twoich kanałach społecznościowych.',
      icon: Globe,
      stats: 'Viral Mode',
      color: 'from-sky-500 to-blue-600',
      badge: 'CREATIVE'
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent)]" />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <Cpu size={400} className="text-white transform translate-x-20 rotate-12" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono">
            <AppWindow size={14} /> OmniMarket Ecosystem
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight sm:text-8xl italic tracking-tighter uppercase">
            Nasze <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Aplikacje</span>
          </h1>
          <p className="text-slate-400 mb-10 text-xl font-medium leading-relaxed italic">
            Zestaw profesjonalnych narzędzi AI zaprojektowanych, aby wspierać Twój biznes na każdym etapie. Od automatyzacji sprzedaży po zaawansowany marketing.
          </p>
          <div className="flex flex-wrap gap-4">
             <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2">
                Pobierz Ekosystem <Download size={16} />
             </button>
             <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                Wersja Desktop
             </button>
          </div>
        </div>
      </section>

      {/* Grid of Apps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {APPS.map((app, idx) => (
          <motion.div 
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className={cn("h-2 bg-gradient-to-r", app.color)} />
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform", app.color.replace('from-', 'bg-'))}>
                  <app.icon size={32} className="text-white" />
                </div>
                <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-full border border-slate-100">
                  {app.badge}
                </span>
              </div>
              
              <div className="mb-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{app.category}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 italic tracking-tight uppercase">{app.name}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 italic h-20 line-clamp-3">
                {app.desc}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{app.stats}</span>
                </div>
                <button className="flex items-center gap-2 text-slate-900 font-extrabold text-[10px] uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                  Otwórz <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Integration Banner */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full opacity-20">
            <Globe size={300} className="text-blue-400 transform translate-x-20 -translate-y-10" />
         </div>
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
               <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Pełna Integracja Ekosystemu</h2>
               <p className="text-slate-400 font-medium italic">Wszystkie nasze aplikacje komunikują się ze sobą w czasie rzeczywistym. Alpinator znajduje produkt, Marketing Manager tworzy kampanię, a OmniBot obsługuje sprzedaż. Wszystko w jednym panelu.</p>
            </div>
            <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-2xl flex items-center gap-3">
               Zintegruj Swoje Biznesy <ShieldCheck size={20} />
            </button>
         </div>
      </section>
    </div>
  );
}
