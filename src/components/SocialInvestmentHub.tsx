import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Globe, 
  Zap,
  Layout,
  Briefcase,
  PieChart,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { formatPrice, cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { addTransaction } from '../services/walletService';
import { toast } from 'sonner';

import { createNotification } from '../services/notificationService';

import { ViewProps } from '../types/view';

export function SocialInvestmentHub({ onNavigate, cart }: ViewProps) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [isInvesting, setIsInvesting] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, 'wallets', user.uid), (doc) => {
      if (doc.exists()) setWallet(doc.data());
    });
    return unsub;
  }, [user]);

  const handleInvest = async (title: string, amount: number) => {
    if (!user) {
      toast.error("Zaloguj się, aby zainwestować.");
      return;
    }

    if (!wallet || wallet.balance < amount) {
      toast.error("Niewystarczające środki w portfelu.");
      return;
    }

    setIsInvesting(title);
    try {
      const success = await addTransaction(user.uid, -amount, `Inwestycja: ${title}`);
      if (success) {
        toast.success(`Pomyślnie zainwestowano ${formatPrice(amount)} w ${title}!`);
        await createNotification(
          user.uid,
          "Potwierdzenie Inwestycji",
          `Twoja inwestycja w kwocie ${formatPrice(amount)} w pulę ${title} została zarejestrowana pomyślnie.`,
          'system'
        );
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      toast.error("Błąd podczas procesowania inwestycji.");
    } finally {
      setIsInvesting(null);
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[3rem] bg-prestige-950 p-10 text-white shadow-2xl sm:p-20 group min-h-[420px] flex items-center border border-white/5">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2026" 
                className="w-full h-full object-cover opacity-20 transition-transform duration-[2000ms] group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-prestige-950 via-prestige-950/60 to-transparent" />
        </div>
        <div className="relative z-10 w-full">
            <div className="flex items-center gap-4 mb-10">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-accent-indigo/10 px-5 py-2 text-[10px] font-technical font-bold uppercase tracking-[0.3em] text-accent-indigo border border-accent-indigo/20 backdrop-blur-md">
                <PieChart size={14} className="animate-pulse" /> Equity & Growth
              </div>
            </div>
            <h1 className="text-5xl font-display font-black tracking-tighter sm:text-8xl mb-8 uppercase italic leading-none">
              Platform <span className="text-accent-indigo">Investing</span>
            </h1>
            <p className="text-prestige-400 max-w-xl text-xl font-medium leading-relaxed italic border-l-2 border-accent-indigo/30 pl-6">
              Stań się współwłaścicielem najszybciej rozwijającego się ekosystemu e-commerce. Inwestuj w technologię, która definiuje handel przyszłości.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Investment Options */}
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-white rounded-[3rem] border border-prestige-200 p-12 shadow-sm">
             <div className="flex items-center gap-5 mb-12">
               <div className="h-14 w-14 rounded-2xl bg-prestige-50 text-accent-indigo flex items-center justify-center border border-prestige-100 shadow-inner">
                 <Layout size={28} />
               </div>
               <div>
                  <h2 className="text-3xl font-display font-bold text-prestige-950 tracking-tight">Enterprise Equity Pools</h2>
                  <p className="text-sm text-prestige-400 italic">Udziały w infrastrukturze i algorytmach noweimperium.</p>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InvestmentCard 
                  title="noweCore AI Pool" 
                  roi="+24.5%" 
                  min={5000} 
                  desc="Inwestycja w rozwój silnika AI sterującego arbitrażem cenowym na rynkach światowych."
                  tags={['Skarbówka', 'Safe']}
                  onInvest={() => handleInvest("noweCore AI Pool", 5000)}
                  isLoading={isInvesting === "noweCore AI Pool"}
                />
                <InvestmentCard 
                  title="Global Logistics Hub" 
                  roi="+18.2%" 
                  min={10000} 
                  desc="Finansowanie centrów logistycznych Alpinator w Azji i Europie Środkowej." 
                  tags={['Infrastruktura', 'Stable']}
                  onInvest={() => handleInvest("Global Logistics Hub", 10000)}
                  isLoading={isInvesting === "Global Logistics Hub"}
                />
             </div>
          </section>

          <section className="bg-prestige-950 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-accent-indigo/10 blur-[80px]" />
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 space-y-6">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 text-[10px] font-technical font-bold uppercase tracking-widest text-accent-indigo">
                     Premium Opportunity
                   </div>
                   <h3 className="text-4xl font-display font-bold tracking-tight">Platform Equity Token</h3>
                   <p className="text-prestige-400 font-medium italic">
                     Ekskluzywna runda inwestycyjna dla kluczowych partnerów. 
                     Otrzymaj udziały w całej platformie noweimperium i bierz udział w dywidendach z globalnego GMV.
                   </p>
                   <div className="flex flex-wrap gap-4 pt-4">
                      <button 
                        onClick={() => handleInvest("Platform Equity Token", 50000)}
                        className="prestige-button-primary !py-5 !px-12 !rounded-2xl shadow-xl shadow-accent-indigo/20 disabled:opacity-50"
                        disabled={isInvesting === "Platform Equity Token"}
                      >
                        {isInvesting === "Platform Equity Token" ? "Procesowanie..." : "Zainwestuj 50,000 PLN"}
                      </button>
                   </div>
                </div>
                <div className="w-full md:w-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 text-center space-y-4">
                   <p className="text-[10px] font-technical font-bold uppercase tracking-widest text-prestige-500">Dostępna pula</p>
                   <p className="text-4xl font-display font-black">2.4M PLN</p>
                   <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-indigo w-3/4" />
                   </div>
                   <p className="text-[9px] font-technical font-bold uppercase text-accent-indigo">75% ZAREZERWOWANE</p>
                </div>
             </div>
          </section>
        </div>

        {/* Sidebar Stats & Info */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-white rounded-[3rem] p-10 border border-prestige-200 shadow-sm">
              <h3 className="text-xl font-display font-bold text-prestige-950 mb-8 flex items-center gap-3">
                 <Briefcase className="text-accent-indigo" size={20} /> Your Portfolio
              </h3>
              <div className="space-y-6">
                 <PortfolioItem label="Twój Balance" value={formatPrice(wallet?.balance || 0)} />
                 <PortfolioItem label="Zainwestowano" value={formatPrice(wallet?.transactions?.filter((t: any) => t.title.startsWith('Inwestycja:')).reduce((acc: number, t: any) => acc + Math.abs(t.amount), 0) || 0)} />
                 <PortfolioItem label="Aktywne Pule" value={wallet?.transactions?.filter((t: any) => t.title.startsWith('Inwestycja:')).length || 0} />
              </div>
              <div className="mt-10 pt-10 border-t border-prestige-100">
                 <div className="bg-prestige-50 rounded-2xl p-6 border border-prestige-100 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-accent-indigo shadow-sm">
                       <Info size={20} />
                    </div>
                    <p className="text-[11px] text-prestige-500 font-medium italic">Wszystkie inwestycje wiążą się z ryzykiem. Przeczytaj regulamin.</p>
                 </div>
              </div>
           </div>

           <div className="bg-accent-indigo rounded-[3rem] p-10 text-white shadow-xl group hover:scale-[1.02] transition-transform">
              <h4 className="text-xl font-display font-bold mb-3 tracking-tight">Social Investing</h4>
              <p className="text-sm text-white/70 mb-8 font-medium italic">Łączymy kapitał społeczny z profesjonalnym e-commerce. Buduj portfel z innymi.</p>
              <button className="w-full py-5 rounded-2xl bg-white/10 backdrop-blur-md text-white text-[10px] font-technical font-bold uppercase tracking-widest hover:bg-white hover:text-accent-indigo transition-all border border-white/10">
                Podejrzyj Inwestorów
              </button>
           </div>
        </aside>
      </div>
    </div>
  );
}

function InvestmentCard({ title, roi, min, desc, tags, onInvest, isLoading }: any) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-prestige-50/50 border border-prestige-100 hover:bg-white hover:shadow-xl transition-all group">
       <div className="flex items-center justify-between mb-8">
         <h4 className="text-2xl font-display font-bold text-prestige-950 tracking-tight">{title}</h4>
         <div className="flex gap-2">
            {tags.map((tag: string) => (
              <span key={tag} className="text-[8px] font-technical font-bold px-2 py-0.5 bg-accent-indigo/10 text-accent-indigo rounded-full uppercase tracking-widest">{tag}</span>
            ))}
         </div>
       </div>
       <p className="text-sm text-prestige-500 leading-relaxed italic mb-8 h-12 line-clamp-2">{desc}</p>
       <div className="grid grid-cols-2 gap-8 pt-8 border-t border-prestige-100">
          <div>
            <p className="text-[9px] font-technical font-bold text-prestige-400 uppercase tracking-widest mb-1">Target ROI</p>
            <p className="text-2xl font-display font-black text-accent-emerald tracking-tight">{roi}</p>
          </div>
          <div>
            <p className="text-[9px] font-technical font-bold text-prestige-400 uppercase tracking-widest mb-1">Min. Entry</p>
            <p className="text-2xl font-display font-bold text-prestige-950 tracking-tight">{formatPrice(min)}</p>
          </div>
       </div>
       <button 
        onClick={onInvest}
        disabled={isLoading}
        className="prestige-button-primary w-full !py-4 !rounded-2xl mt-8 flex items-center justify-center gap-2 disabled:opacity-50"
       >
          {isLoading ? "Przetwarzanie..." : "Inwestuj"} <ArrowUpRight size={16} />
       </button>
    </div>
  );
}

function PortfolioItem({ label, value }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-technical font-bold text-prestige-400 uppercase tracking-widest">{label}</span>
      <span className="text-lg font-display font-bold text-prestige-950 tracking-tight">{value}</span>
    </div>
  );
}
