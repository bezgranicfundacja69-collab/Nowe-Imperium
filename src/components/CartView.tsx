import { Trash2, ShoppingBag, ArrowRight, CreditCard, Minus, Plus, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatPrice } from '../lib/utils';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface CartViewProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartView({ items, onRemove, onCheckout, onContinueShopping }: CartViewProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-40 blur-xl scale-150" />
           <ShoppingBag size={80} className="relative z-10 text-blue-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 italic uppercase tracking-tighter">Twój koszyk jest pusty</h2>
        <p className="text-slate-500 mb-10 max-w-md font-medium leading-relaxed italic">
          Wygląda na to, że nie dodałeś jeszcze żadnych produktów do swojego koszyka AI. Odkryj tysiące ofert wspieranych przez sztuczną inteligencję.
        </p>
        <button 
          onClick={onContinueShopping}
          className="px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-xl shadow-slate-900/20"
        >
          Rozpocznij zakupy
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-white border border-slate-100 p-8 shadow-sm sm:p-16 text-center">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl opacity-50" />
        <h1 className="text-4xl font-black text-slate-900 mb-4 sm:text-7xl italic leading-none truncate">Twój <span className="text-blue-600">Koszyk</span></h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium italic">Masz {items.length} {items.length === 1 ? 'produkt' : 'produkty'} w swoim inteligentnym koszyku.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => (
              <motion.div 
                key={`${item.id}-${idx}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-blue-100 transition-all"
              >
                <div className="h-24 w-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-black text-slate-900 truncate italic tracking-tight">{item.title}</h3>
                  <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-1">Szybka dostawa AI</p>
                </div>
                <div className="text-right">
                   <p className="text-xl font-black text-slate-900 italic tracking-tighter mb-2">{formatPrice(item.price)}</p>
                   <button 
                    onClick={() => onRemove(item.id)}
                    className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                   >
                     <Trash2 size={18} />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
            
            <h3 className="text-xl font-black mb-8 italic uppercase tracking-tighter flex items-center gap-3">
               <Zap className="text-blue-400" /> Podsumowanie
            </h3>
            
            <div className="space-y-4 mb-10">
               <div className="flex justify-between text-slate-400 font-bold text-sm">
                  <span>Suma produktów</span>
                  <span>{formatPrice(total)}</span>
               </div>
               <div className="flex justify-between text-slate-400 font-bold text-sm">
                  <span>Dostawa OmniExpress</span>
                  <span className="text-emerald-400">GRATIS</span>
               </div>
               <div className="h-px bg-white/10 my-6" />
               <div className="flex justify-between items-baseline">
                  <span className="text-sm font-black opacity-60 uppercase tracking-widest">Razem</span>
                  <span className="text-4xl font-black italic tracking-tighter">{formatPrice(total)}</span>
               </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-blue-700 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 active:scale-95"
            >
               <CreditCard size={18} /> Przejdź do płatności
            </button>
            <button 
              onClick={onContinueShopping}
              className="w-full mt-4 py-4 bg-white/5 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all"
            >
               Kontynuuj zakupy
            </button>
          </div>

          <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex items-start gap-4">
             <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Zap size={20} />
             </div>
             <div>
                <p className="text-blue-900 font-bold text-sm italic">Status Premium OmniMarket</p>
                <p className="text-blue-600/70 text-xs font-medium leading-relaxed mt-1 italic">
                  Twoje zamówienie kwalifikuje się do darmowej dostawy AI i 5% cashbacku w OmniCash.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
