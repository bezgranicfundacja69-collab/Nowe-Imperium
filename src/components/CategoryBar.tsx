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
    title: 'noweSync: Allegro Integration',
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
    <div className="bg-white border-b border-prestige-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 overflow-x-auto py-6 no-scrollbar">
          <button
            onClick={() => onSelect('', '')}
            className={cn(
              "flex flex-col items-center gap-3 transition-all min-w-fit px-2 group",
              selectedCategory === '' ? "text-accent-indigo opacity-100" : "text-prestige-400 hover:text-prestige-950 opacity-100"
            )}
          >
            <div className={cn(
              "flex h-16 w-16 items-center justify-center rounded-[24px] transition-all duration-300 border",
              selectedCategory === '' ? "bg-prestige-950 text-white border-prestige-950 shadow-xl shadow-prestige-950/20" : "bg-prestige-50 border-prestige-100 group-hover:bg-prestige-100 group-hover:border-prestige-200"
            )}>
              <Package size={24} />
            </div>
            <span className="text-[10px] font-technical font-bold uppercase tracking-[0.2em]">All</span>
          </button>

          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onSelect(category.id, '')}
                className={cn(
                  "flex flex-col items-center gap-3 transition-all min-w-fit px-2 group",
                  isActive ? "text-accent-indigo opacity-100" : "text-prestige-400 hover:text-prestige-950 opacity-100"
                )}
              >
                <div className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-[24px] transition-all duration-300 border",
                  isActive ? "bg-prestige-950 text-white border-prestige-950 shadow-xl shadow-prestige-950/20" : "bg-prestige-50 border-prestige-100 group-hover:bg-prestige-100 group-hover:border-prestige-200"
                )}>
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-technical font-bold uppercase tracking-[0.2em]">{category.name}</span>
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
              <div className="flex items-center gap-3 overflow-x-auto py-5 border-t border-prestige-100 no-scrollbar pb-8">
                <button
                  onClick={() => onSelect(selectedCategory, '')}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[10px] font-technical font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
                    selectedSubcategory === '' ? "bg-accent-indigo text-white border-accent-indigo shadow-lg shadow-accent-indigo/20" : "bg-white text-prestige-500 border-prestige-200 hover:border-accent-indigo hover:text-accent-indigo"
                  )}
                >
                  All {activeCategory.name}
                </button>
                {activeCategory.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onSelect(selectedCategory, sub.id)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-[10px] font-technical font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
                      selectedSubcategory === sub.id ? "bg-accent-indigo text-white border-accent-indigo shadow-lg shadow-accent-indigo/20" : "bg-white text-prestige-500 border-prestige-200 hover:border-accent-indigo hover:text-accent-indigo"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 mt-4">
          {PROMOTIONS.map((promo) => (
            <motion.div
              key={promo.id}
              whileHover={{ y: -6 }}
              className={cn(
                "relative h-40 rounded-[2.5rem] overflow-hidden group cursor-pointer border border-prestige-200",
                "bg-prestige-950 shadow-xl shadow-prestige-950/5"
              )}
              onClick={() => {
                if (promo.category === 'integrations' || promo.category === 'business' || promo.category === 'ready-businesses') {
                  onViewChange?.(promo.category);
                } else {
                  onSelect(promo.category, '');
                }
              }}
            >
              <div className="absolute inset-0 z-0 opacity-40">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-prestige-950 via-prestige-950/20 to-transparent" />
              </div>
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h4 className="text-white font-display font-black text-lg uppercase tracking-tighter italic flex items-center gap-2 mb-1">
                       <Zap size={16} className="text-accent-indigo fill-accent-indigo" /> {promo.title}
                    </h4>
                    <p className="text-prestige-400 text-[10px] font-technical font-bold uppercase tracking-[0.2em]">{promo.subtitle}</p>
                  </div>
                  <button className="flex h-12 w-12 items-center justify-center bg-white text-prestige-950 rounded-2xl transition-all group-hover:bg-accent-indigo group-hover:text-white group-hover:scale-110 shadow-2xl">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent-indigo transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
