import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  DollarSign,
  PieChart as PieChartIcon,
  Gift,
  BarChart3,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice, cn } from '../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const CURRENCIES = [
  { code: 'PLN', label: 'Złoty Polski', symbol: 'zł' },
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
  { code: 'CHF', label: 'Swiss Franc', symbol: 'Fr' },
];

const MOCK_HISTORICAL_DATA = [
  { name: 'Pon', balance: 120 },
  { name: 'Wt', balance: 145 },
  { name: 'Śr', balance: 132 },
  { name: 'Czw', balance: 180 },
  { name: 'Pt', balance: 210 },
  { name: 'Sob', balance: 245 },
  { name: 'Ndz', balance: 280 },
];

const PIE_DATA = [
  { name: 'Sprzedaż', value: 400, color: '#3b82f6' },
  { name: 'Afiliacja', value: 300, color: '#10b981' },
  { name: 'Nagrody', value: 150, color: '#8b5cf6' },
  { name: 'Inne', value: 100, color: '#94a3b8' },
];

import { ViewProps } from '../types/view';

export function WalletView({ onNavigate, cart }: ViewProps) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('PLN');
  const [rates, setRates] = useState<Record<string, number>>({ PLN: 1 });
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, 'wallets', user.uid), (doc) => {
      if (doc.exists()) setWallet(doc.data());
    }, (error) => {
      console.error("Wallet snapshot error:", error);
    });
    return unsub;
  }, [user]);

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoadingRates(true);
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/PLN');
        const data = await response.json();
        if (data.rates) {
          setRates(data.rates);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      } finally {
        setIsLoadingRates(false);
      }
    };
    fetchRates();
  }, []);

  const convertPrice = (plnAmount: number) => {
    const rate = rates[selectedCurrency] || 1;
    return plnAmount * rate;
  };

  const getFormattedBalance = (plnAmount: number) => {
    return formatPrice(convertPrice(plnAmount), selectedCurrency);
  };

  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-[3rem] bg-prestige-950 p-10 text-white shadow-2xl sm:p-14 border border-white/5">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-accent-indigo/20 blur-[120px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font- technical font-bold uppercase tracking-widest text-accent-indigo mb-6">
              <Globe size={12} /> Currency: {selectedCurrency}
            </div>
            <h1 className="text-5xl font-display font-black mb-3 tracking-tighter">Your Assets</h1>
            <p className="text-prestige-400 font-medium text-lg">Elegancja w zarządzaniu Twoim kapitałem.</p>
            
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="relative inline-block">
                <select 
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white appearance-none pr-12 focus:ring-2 focus:ring-accent-indigo cursor-pointer hover:bg-white/10 transition-all outline-none"
                >
                  {CURRENCIES.map(curr => (
                    <option key={curr.code} value={curr.code} className="bg-prestige-900 text-white">
                      {curr.code} - {curr.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-accent-indigo">
                  <DollarSign size={16} />
                </div>
              </div>
              <button className="prestige-button-primary !bg-accent-indigo hover:!bg-indigo-600 shadow-xl shadow-indigo-600/20">
                <ArrowUpRight size={18} className="mr-2" /> Wpłać Środki
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ rotate: -2, y: 30, opacity: 0 }}
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm rounded-[2.5rem] bg-gradient-to-br from-prestige-800 to-prestige-950 p-10 shadow-2xl ring-1 ring-white/10 relative group overflow-hidden border border-white/5"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
               <Zap className="text-accent-indigo" size={80} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-technical font-bold uppercase tracking-[0.3em] text-accent-indigo mb-3">Portfolio Balance</p>
              <h2 className="text-4xl font-display font-black mb-16 tracking-tighter">
                {isLoadingRates ? '...' : getFormattedBalance(wallet?.balance || 0)}
              </h2>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-technical font-bold uppercase text-prestige-500 tracking-wider">Account holder</p>
                  <p className="text-[11px] font-display font-bold uppercase tracking-[0.2em]">{user?.displayName || 'PRESTIGE USER'}</p>
                </div>
                <div className="h-10 w-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center backdrop-blur-md">
                   <div className="w-8 h-5 bg-accent-indigo/20 rounded-sm border border-accent-indigo/30" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatSmallCard 
          label="Income" 
          value={getFormattedBalance(2480)} 
          icon={<TrendingUp size={20} />} 
          color="bg-emerald-50 text-accent-emerald" 
          isLoading={isLoadingRates}
        />
        <StatSmallCard 
          label="Rewards" 
          value={getFormattedBalance(150)} 
          icon={<Gift size={20} />} 
          color="bg-indigo-50 text-accent-indigo" 
          isLoading={isLoadingRates}
        />
        <StatSmallCard 
          label="Escrow" 
          value={getFormattedBalance(0)} 
          icon={<ShieldCheck size={20} />} 
          color="bg-prestige-100 text-prestige-600" 
          isLoading={isLoadingRates}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 bg-white rounded-[2.5rem] border border-prestige-200 p-10 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
               <h2 className="text-2xl font-display font-bold text-prestige-950 tracking-tight">Performance Analytics</h2>
               <p className="text-xs text-prestige-400 mt-1 font-medium italic">Monitoruj wzrost swojego kapitału w czasie rzeczywistym ({selectedCurrency})</p>
            </div>
            <div className="flex gap-1.5 bg-prestige-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-prestige-500 transition-all">7 Dni</button>
              <button className="px-4 py-1.5 rounded-lg bg-white shadow-sm text-accent-indigo text-[10px] font-bold uppercase tracking-wider transition-all">30 Dni</button>
            </div>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_HISTORICAL_DATA.map(d => ({ ...d, balance: convertPrice(d.balance) }))} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4338ca" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4338ca" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number) => [formatPrice(value, selectedCurrency), 'Balance']}
                  contentStyle={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 800, color: '#4338ca' }}
                  labelStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px', letterSpacing: '0.05em' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#4338ca" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="lg:col-span-4 bg-white rounded-[2.5rem] border border-prestige-200 p-10 shadow-sm flex flex-col items-center">
          <div className="w-full text-left mb-10">
             <h2 className="text-2xl font-display font-bold text-prestige-950 tracking-tight">Allocation</h2>
             <p className="text-xs text-prestige-400 mt-1 font-medium italic">Gdzie pracują Twoje środki</p>
          </div>
          <div className="h-[220px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="transparent"
                      className="hover:opacity-80 transition-opacity outline-none" 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none text-center">
              <span className="text-[9px] font-technical font-bold uppercase text-prestige-400 tracking-tighter">Total Assets</span>
              <span className="text-xl font-display font-black text-prestige-950 tracking-tighter">
                {isLoadingRates ? '...' : getFormattedBalance(950)}
              </span>
            </div>
          </div>
          <div className="mt-10 w-full space-y-3">
            {PIE_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full ring-4 ring-prestige-50" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] font-bold text-prestige-600 transition-colors group-hover:text-prestige-950">{item.name}</span>
                </div>
                <span className="text-[11px] font-black text-prestige-950">
                  {isLoadingRates ? '...' : getFormattedBalance(item.value)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white rounded-[2.5rem] border border-prestige-200 p-10 shadow-sm">
        <h2 className="text-2xl font-display font-bold text-prestige-950 mb-10 flex items-center gap-3 tracking-tight">
          <History className="text-accent-indigo" size={24} /> 
          Prywatna Historia Operacji
        </h2>
        <div className="grid gap-3">
          <ActivityItem 
            title="Pasywny Dochód AI" 
            date="Przed chwilą" 
            amount={getFormattedBalance(0.05)} 
            isPositive={true} 
            isLoading={isLoadingRates}
          />
          <ActivityItem 
            title="Wypłata na konto osobiste" 
            date="2 dni temu" 
            amount={getFormattedBalance(-450)} 
            isPositive={false} 
            isLoading={isLoadingRates}
          />
          <ActivityItem 
            title="Bonus Affiliate Tier 1" 
            date="3 dni temu" 
            amount={getFormattedBalance(120)} 
            isPositive={true} 
            isLoading={isLoadingRates}
          />
        </div>
      </section>
    </div>
  );
}

function StatSmallCard({ label, value, icon, color, isLoading }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-prestige-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-6 ring-8 ring-prestige-50/50", color)}>{icon}</div>
      <p className="text-[10px] font-technical font-bold uppercase tracking-[0.2em] text-prestige-400 mb-2">{label}</p>
      <p className="text-xl font-display font-black text-prestige-950 tracking-tighter">
        {isLoading ? '...' : value}
      </p>
    </div>
  );
}

function ActivityItem({ title, date, amount, isPositive, isLoading }: any) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-prestige-50/40 border border-prestige-100 hover:bg-white hover:border-accent-indigo/20 transition-all group">
      <div className="flex items-center gap-5">
        <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", isPositive ? "bg-emerald-100 text-accent-emerald" : "bg-rose-100 text-rose-600")}>
          {isPositive ? <ArrowUpRight size={22} /> : <ArrowDownLeft size={22} />}
        </div>
        <div>
          <p className="text-sm font-display font-bold text-prestige-800 tracking-tight">{title}</p>
          <p className="text-[10px] text-prestige-400 font-technical font-bold uppercase tracking-wider mt-0.5">{date}</p>
        </div>
      </div>
      <div className={cn("text-base font-display font-black tracking-tighter", isPositive ? "text-accent-emerald" : "text-rose-600")}>
        {isLoading ? '...' : amount}
      </div>
    </div>
  );
}
