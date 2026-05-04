import { 
  TrendingUp, 
  Wallet, 
  Building2, 
  PiggyBank, 
  LineChart, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  History, 
  Zap,
  Banknote,
  Coins,
  FileBadge
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function InvestorCenterView() {
  const OFFERS = [
    {
      title: 'Kredyty Bankowe',
      icon: Building2,
      desc: 'Finansowanie hipoteczne i celowe z najniższym RRSO na rynku.',
      color: 'bg-blue-50 text-blue-600',
      tag: 'Banki'
    },
    {
      title: 'Pożyczki Pozabankowe',
      icon: Banknote,
      desc: 'Szybka gotówka na rozwój firmy bez zbędnych formalności.',
      color: 'bg-emerald-50 text-emerald-600',
      tag: 'Szybka Decyzja'
    },
    {
      title: 'Finansowanie Prywatne',
      icon: Handshake,
      desc: 'Pożyczki od inwestorów prywatnych pod zastaw lub udział.',
      color: 'bg-purple-50 text-purple-600',
      tag: 'Prywatne'
    },
    {
      title: 'Dotacje Unijne',
      icon: Globe,
      desc: 'Bezzwrotne wsparcie na cyfryzację i ekologię (KPO/FENG).',
      color: 'bg-indigo-50 text-indigo-600',
      tag: 'UE'
    }
  ];

  const FUNDS = [
    { name: 'OmniGrowth Fund I', returns: '+24.5%', risk: 'Medium', min: '10,000 PLN' },
    { name: 'AI Innovation Seed', returns: '+42.1%', risk: 'High', min: '50,000 PLN' },
    { name: 'Real Estate Token', returns: '+8.2%', risk: 'Low', min: '1,000 PLN' }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[48px] bg-slate-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent)]" />
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-1000"
            alt="Finance"
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-400 border border-blue-500/30 mb-8 font-mono">
            <TrendingUp size={14} className="animate-pulse" /> OmniFinance Node
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight sm:text-8xl italic tracking-tighter uppercase">
            Centrum <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 text-glow-blue">Inwestora</span>
          </h1>
          <p className="text-slate-400 mb-10 text-xl font-medium leading-relaxed italic">
            Dostęp do kapitału, funduszy inwestycyjnych i finansowania dla Twojego biznesu. Od kredytów bankowych po dotacje unijne.
          </p>
          <div className="flex flex-wrap gap-4">
             <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2">
                Złóż Wniosek <ArrowRight size={16} />
             </button>
             <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                Kalkulator Zysków
             </button>
             <a href="tel:+48697475190" className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/30 flex items-center gap-2">
                Kontakt Direct: 697 475 190
             </a>
          </div>
        </div>
      </section>

      {/* Loan Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {OFFERS.map((offer, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -8 }}
            className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
          >
            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm", offer.color)}>
              <offer.icon size={28} />
            </div>
            <div className="mb-2">
               <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[8px] font-black uppercase tracking-widest">{offer.tag}</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 italic tracking-tight">{offer.title}</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 italic flex-1">
              {offer.desc}
            </p>
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-[10px] uppercase tracking-widest group-hover:text-blue-600 transition-colors">
              Sprawdź warunki <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Investment Funds */}
        <div className="lg:col-span-8">
          <section className="bg-white rounded-[48px] p-8 md:p-12 border border-slate-100 shadow-sm h-full">
             <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase flex items-center gap-3">
                  <PiggyBank className="text-blue-600" /> Fundusze Inwestycyjne
                </h2>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                   <Zap size={14} /> Giełda Live
                </div>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-slate-50">
                         <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fundusz</th>
                         <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stopa Zwrotu (YTD)</th>
                         <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ryzyko</th>
                         <th className="pb-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Min. Inwestycja</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {FUNDS.map((fund, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                           <td className="py-6 pr-4">
                              <div className="flex items-center gap-3">
                                 <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black">{fund.name[0]}</div>
                                 <span className="font-bold text-slate-900">{fund.name}</span>
                              </div>
                           </td>
                           <td className="py-6">
                              <span className="text-emerald-500 font-black text-lg italic">{fund.returns}</span>
                           </td>
                           <td className="py-6">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                                fund.risk === 'Low' ? "bg-emerald-50 text-emerald-600" : 
                                fund.risk === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                              )}>
                                 {fund.risk === 'Low' ? 'Niskie' : fund.risk === 'Medium' ? 'Średnie' : 'Wysokie'}
                              </span>
                           </td>
                           <td className="py-6 text-right font-bold text-slate-900">{fund.min}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>

             <div className="mt-10 p-6 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                      <LineChart size={20} />
                   </div>
                   <div>
                      <p className="font-black text-slate-900 italic uppercase tracking-tight">Kreator Portfela AI</p>
                      <p className="text-xs text-slate-500 font-medium italic">Pozwól algorytmom zbalansować Twoje inwestycje.</p>
                   </div>
                </div>
                <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:scale-105 transition-transform">
                   Uruchom Kreatora
                </button>
             </div>
          </section>
        </div>

        {/* Sidebar / Info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[48px] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <History className="mb-6 text-blue-400" size={40} />
              <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tighter">Finansowanie Unijne</h3>
              <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed italic">Aktualne nabory: KPO, Ścieżka Smart, FENG. Pomagamy w przygotowaniu biznesplanu i wniosku o dotację.</p>
              
              <ul className="space-y-4 mb-10">
                 {[
                   { l: 'Audyt Innowacyjności', v: 'Gratis' },
                   { l: 'Przygotowanie wniosku', v: 'Success Fee' },
                   { l: 'Rozliczenie projektu', v: 'Pełne wsparcie' }
                 ].map((item, i) => (
                   <li key={i} className="flex justify-between items-center text-xs">
                     <span className="text-slate-500 font-bold">{item.l}</span>
                     <span className="text-white font-black">{item.v}</span>
                   </li>
                 ))}
              </ul>
              
              <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                 Sprawdź dotację
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <section className="bg-white border border-slate-100 rounded-[48px] p-12 overflow-hidden relative shadow-sm">
         <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
               <h2 className="text-3xl font-black text-slate-900 mb-6 italic uppercase tracking-tighter leading-tight">Gwarancja Bezpieczeństwa OmniShield</h2>
               <p className="text-slate-500 text-lg font-medium leading-relaxed italic mb-8">Wszystkie podmioty finansowe na naszej platformie przechodzą rygorystyczną weryfikację. Twoje dane są szyfrowane i chronione przez nasze autorskie systemy cyberbezpieczeństwa.</p>
               <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="text-emerald-500" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Audyt Finansowy</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <FileBadge className="text-blue-500" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legalny Status</span>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="aspect-square bg-slate-50 rounded-full flex items-center justify-center relative overflow-hidden">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-4 border-dashed border-blue-100 rounded-full"
                  />
                  <Coins size={120} className="text-blue-600 relative z-10" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

function Handshake({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m11 17 2 2 6-6"/>
      <path d="m18 14 2.5 2.5a3.3 3.3 0 0 1 0 4.7 3.3 3.3 0 0 1-4.7 0L13.5 19"/>
      <path d="M18 5a3 3 0 0 0-3 3 3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0-3-3 3 3 0 0 0-3 3c0 1.5.6 2.8 1.5 3.7L10 18l3-3"/>
      <path d="m13 6 4.3 4.3c.9.9.9 2.4 0 3.3l-4 4"/>
      <path d="m3 11 3 3"/>
    </svg>
  );
}
