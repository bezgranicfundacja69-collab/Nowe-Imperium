import { Package, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { CATEGORIES } from '../constants/categories';
import { motion, AnimatePresence } from 'motion/react';

const PROMOTIONS = [
  {
    id: 1,
    title: 'Gotowe Sklepy: Shoper & Shopify',
    subtitle: 'Kup biznes i zacznij zarabiać dzisiaj',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600',
    category: 'ready-businesses',
    color: 'from-blue-600 to-indigo-900'
  },
  {
    id: 2,
    title: 'OmniSync: Allegro Integration',
    subtitle: 'Synchronizuj oferty w 30 sekund',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    category: 'business',
    color: 'from-[#ff5a00] to-[#ff8000]'
  },
  {
    id: 3,
    title: 'Shoppity: Full Automation',
    subtitle: 'Zintegruj swój sklep AI z Shoppity',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    category: 'ready-businesses',
    color: 'from-[#002f34] to-[#007782]'
  }
];

interface CategoryBarProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onSelect: (catId: string, subId: string) => void;
  onViewChange?: (view: any) => void;
}

export function CategoryBar({ selectedCategory, selectedSubcategory, onSelect, onViewChange }: CategoryBarProps) {
  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 overflow-x-auto py-5 no-scrollbar">
          <button
            onClick={() => onSelect('', '')}
            className={cn(
              "flex flex-col items-center gap-2 transition-all min-w-fit px-2",
              selectedCategory === '' ? "text-blue-600 scale-105" : "text-slate-400 hover:text-slate-900"
            )}
          >
            <div className={cn(
              "flex h-14 w-14 items-center justify-center rounded-[20px] transition-all",
              selectedCategory === '' ? "bg-blue-50 shadow-sm" : "bg-slate-50"
            )}>
              <Package size={22} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Wszystko</span>
          </button>

          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onSelect(category.id, '')}
                className={cn(
                  "flex flex-col items-center gap-2 transition-all min-w-fit px-2",
                  isActive ? "text-blue-600 scale-105" : "text-slate-400 hover:text-slate-900"
                )}
              >
                <div className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-[20px] transition-all",
                  isActive ? "bg-blue-50 shadow-sm" : "bg-slate-50"
                )}>
                  <Icon size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{category.name}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {activeCategory?.subcategories && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 overflow-x-auto py-4 border-t border-slate-50 no-scrollbar pb-6">
                <button
                  onClick={() => onSelect(selectedCategory, '')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                    selectedSubcategory === '' ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  )}
                >
                  Wszystkie {activeCategory.name}
                </button>
                {activeCategory.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onSelect(selectedCategory, sub.id)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                      selectedSubcategory === sub.id ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    )}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Promotions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 mt-2">
          {PROMOTIONS.map((promo) => (
            <motion.div
              key={promo.id}
              whileHover={{ y: -4 }}
              className={cn(
                "relative h-32 rounded-[28px] overflow-hidden group cursor-pointer border border-slate-100",
                "bg-gradient-to-br", promo.color
              )}
              onClick={() => {
                if (promo.category === 'integrations' || promo.category === 'business' || promo.category === 'ready-businesses') {
                  onViewChange?.(promo.category);
                } else {
                  onSelect(promo.category, '');
                }
              }}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              
              <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-black text-sm uppercase tracking-tighter italic flex items-center gap-2">
                       <Zap size={14} className="text-amber-400 fill-amber-400" /> {promo.title}
                    </h4>
                    <p className="text-white/70 text-[10px] font-bold mt-1 uppercase tracking-widest">{promo.subtitle}</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl group-hover:translate-x-1">
                    Zobacz ofertę <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
