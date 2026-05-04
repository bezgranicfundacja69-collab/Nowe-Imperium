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
  BarChart3
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

export function WalletView() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, 'wallets', user.uid), (doc) => {
      if (doc.exists()) setWallet(doc.data());
    });
    return unsub;
  }, [user]);

  return (
    <div className="space-y-8 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-slate-900 p-8 text-white shadow-2xl sm:p-12">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-600/30 blur-[120px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-2">Twój Portfel</h1>
            <p className="text-slate-400 font-medium">Zawsze pod kontrolą. Zawsze bezpieczny.</p>
            
            <div className="mt-12 flex gap-4">
              <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                <ArrowUpRight size={18} /> Wpłać
              </button>
              <button className="flex items-center gap-2 rounded-2xl bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-bold text-white border border-white/10 transition-all hover:bg-white/10">
                <ArrowDownLeft size={18} /> Wypłać
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ rotate: -5, y: 20, opacity: 0 }}
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            className="w-full max-w-sm rounded-[32px] bg-gradient-to-br from-blue-500 to-indigo-600 p-8 shadow-2xl relative group overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">Dostępne środki</p>
              <h2 className="text-5xl font-black mb-12">{formatPrice(wallet?.balance || 0)}</h2>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60">Właściciel</p>
                  <p className="text-sm font-bold uppercase tracking-widest">{user?.displayName || 'USER'}</p>
                </div>
                <div className="h-10 w-14 bg-white/20 rounded-lg backdrop-blur-md" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <StatSmallCard label="Przychód (30d)" value="+2,480.00 PLN" icon={<TrendingUp size={20} />} color="bg-green-50 text-green-600" />
        <StatSmallCard label="Nagrody" value="150.00 PLN" icon={<Gift size={20} />} color="bg-purple-50 text-purple-600" />
        <StatSmallCard label="Zablokowane" value="0.00 PLN" icon={<ShieldCheck size={20} />} color="bg-blue-50 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={24} /> Raport Finansowy
            </h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase text-slate-500">7 Dni</span>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase">30 Dni</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_HISTORICAL_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 800 }}
                  labelStyle={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="lg:col-span-4 bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <PieChartIcon className="text-blue-600" size={24} /> Struktura
          </h2>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-[10px] font-black uppercase text-slate-400">Total</span>
              <span className="text-xl font-black text-slate-900">950 PLN</span>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            {PIE_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-bold text-slate-600">{item.name}</span>
                </div>
                <span className="font-black text-slate-900">{item.value} PLN</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2"><History className="text-blue-600" size={24} /> Ostatnia Aktywność</h2>
        <div className="space-y-4">
          <ActivityItem title="Pasywny Dochód" date="Przed chwilą" amount="+0.05 PLN" isPositive={true} />
          <ActivityItem title="Wypłata na konto" date="2 dni temu" amount="-450.00 PLN" isPositive={false} />
        </div>
      </section>
    </div>
  );
}

function StatSmallCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-4", color)}>{icon}</div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function ActivityItem({ title, date, amount, isPositive }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/30 border border-slate-50">
      <div className="flex items-center gap-4">
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
          {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{title}</p>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{date}</p>
        </div>
      </div>
      <div className={cn("text-sm font-black tracking-tight", isPositive ? "text-green-600" : "text-red-600")}>{amount}</div>
    </div>
  );
}
