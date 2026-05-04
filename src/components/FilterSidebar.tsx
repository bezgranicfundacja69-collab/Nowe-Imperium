import { useState } from 'react';
import { CATEGORIES } from '../constants/categories';
import { ChevronDown, ChevronRight, Star } from 'lucide-react';
import { cn } from '../lib/utils';

export interface FilterState {
  keyword: string;
  category: string;
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  location: string;
  minRating: number;
  status: 'all' | 'active' | 'sold';
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleUpdate = (updates: Partial<FilterState>) => {
    onChange({ ...filters, ...updates });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-8 h-fit lg:sticky lg:top-24">
      {/* Search by Keyword (Local Sidebar Search) */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Słowo kluczowe</h3>
        <input 
          type="text" 
          value={filters.keyword}
          onChange={(e) => handleUpdate({ keyword: e.target.value })}
          placeholder="Szukaj..."
          className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        />
      </div>

      {/* Categories & Subcategories */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Kategorie</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleUpdate({ category: '', subcategory: '' })}
            className={cn(
              "w-full text-left px-2 py-1.5 text-sm rounded-lg transition-colors",
              filters.category === '' ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-600 hover:bg-slate-50"
            )}
          >
            Wszystko
          </button>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="space-y-1">
              <button
                onClick={() => {
                  handleUpdate({ category: cat.id, subcategory: '' });
                  toggleCategory(cat.id);
                }}
                className={cn(
                  "flex items-center justify-between w-full text-left px-2 py-1.5 text-sm rounded-lg transition-colors",
                  filters.category === cat.id ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <cat.icon size={16} />
                  {cat.name}
                </div>
                {cat.subcategories && (
                  expandedCategories.includes(cat.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                )}
              </button>
              
              {cat.subcategories && expandedCategories.includes(cat.id) && (
                <div className="pl-6 space-y-1">
                  {cat.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleUpdate({ category: cat.id, subcategory: sub.id })}
                      className={cn(
                        "w-full text-left px-2 py-1.5 text-xs rounded-lg transition-colors",
                        filters.subcategory === sub.id ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Przedział cenowy</h3>
        <div className="flex items-center gap-2">
          <input 
            type="number"
            value={filters.minPrice || ''}
            onChange={(e) => handleUpdate({ minPrice: Number(e.target.value) })}
            placeholder="Od"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none"
          />
          <span className="text-slate-400">—</span>
          <input 
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) => handleUpdate({ maxPrice: Number(e.target.value) })}
            placeholder="Do"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Location Search */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Lokalizacja</h3>
        <input 
          type="text" 
          value={filters.location}
          onChange={(e) => handleUpdate({ location: e.target.value })}
          placeholder="Miasto, region..."
          className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none"
        />
      </div>

      {/* Seller Rating */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Minimalna ocena</h3>
        <div className="flex gap-2">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => handleUpdate({ minRating: r })}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all text-xs",
                filters.minRating === r 
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20" 
                  : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
              )}
            >
              {r}+ <Star size={12} className={filters.minRating === r ? "fill-white" : ""} />
            </button>
          ))}
        </div>
      </div>

      {/* Reset All */}
      <button
        onClick={() => onChange({
          keyword: '',
          category: '',
          subcategory: '',
          minPrice: 0,
          maxPrice: 1000000,
          location: '',
          minRating: 0,
          status: 'all'
        })}
        className="w-full py-3 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
      >
        Wyczyść wszystkie filtry
      </button>
    </div>
  );
}
