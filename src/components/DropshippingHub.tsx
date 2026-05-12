import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Search, 
  Download, 
  Settings, 
  ArrowRight, 
  CheckCircle2, 
  Plus,
  RefreshCw,
  ShoppingBag,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MarketplaceImporter } from './MarketplaceImporter';

import { ViewProps } from '../types/view';

export function DropshippingHub({ onNavigate, cart }: ViewProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const startAutomatedImport = () => {
    setIsImporting(true);
    setImportProgress(0);
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Automatyczny Dropshipping</h2>
          <p className="text-slate-500 font-bold italic">Generuj, zamawiaj i zarządzaj flitą towarów bez wysiłku.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={startAutomatedImport}
             disabled={isImporting}
             className="px-8 py-4 bg-blue-600 text-white rounded-[32px] font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3"
           >
             {isImporting ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
             Auto-Import Towarów
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Source Management */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
              <h3 className="text-lg font-black italic mb-6">Źródła Dostawców</h3>
              <div className="space-y-4">
                 {['Hurtownia-PL-1', 'China-Direct-Sync', 'Amazon-EU-Sourcing'].map((source) => (
                   <div key={source} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                         <Database size={16} className="text-slate-400" />
                         <span className="text-sm font-bold text-slate-700">{source}</span>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                   </div>
                 ))}
                 <button className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
                   <Plus size={14} /> Dodaj Nowe Źródło
                 </button>
              </div>
           </div>

           <div className="bg-slate-900 rounded-[40px] p-8 text-white">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2 block">Status Bota</span>
              <h4 className="text-xl font-black italic mb-4">Dropship AI Automator</h4>
              <div className="flex items-center gap-3 mb-8">
                 <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center">
                    <Zap size={16} />
                 </div>
                 <div className="text-sm font-bold opacity-80">Gotowy do pracy</div>
              </div>
              <p className="text-xs font-medium opacity-60 italic leading-relaxed mb-6">
                Bot skanuje źródła co 15 minut i automatycznie aktualizuje opisy Twoich ofert używając Gemini API.
              </p>
           </div>
        </div>

        {/* Live List Stream / Management */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-title font-black italic">Ostatnio Przetworzone</h3>
                 <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Live Flow</span>
              </div>

              {isImporting && (
                <div className="mb-8">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Pobieranie danych...</span>
                      <span className="text-xs font-black text-blue-600">{importProgress}%</span>
                   </div>
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${importProgress}%` }}
                        className="h-full bg-blue-600"
                      />
                   </div>
                </div>
              )}

              <div className="space-y-4">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-50 rounded-3xl hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                            <ShoppingBag size={20} />
                         </div>
                         <div>
                            <h4 className="text-sm font-black text-slate-900 italic">Produkt ID #{1000 + i}</h4>
                            <div className="flex items-center gap-2">
                               <span className="text-[10px] font-bold text-emerald-500 uppercase">Synchronizacja OK</span>
                               <span className="text-[10px] font-black text-slate-300">•</span>
                               <span className="text-[10px] font-bold text-slate-400 capitalize">Marża: {10+i}%</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                            <Settings size={16} />
                         </button>
                         <button className="h-10 w-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl">
                            <ArrowRight size={16} />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <MarketplaceImporter />
        </div>
      </div>
    </div>
  );
}
