import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  Globe, 
  Search, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Database,
  RefreshCw,
  Box,
  LayoutGrid
} from 'lucide-react';
import { cn } from '../lib/utils';
import { smartSearch } from '../services/aiService';

export function MarketplaceImporter() {
  const [sourceUrl, setSourceUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [foundProducts, setFoundProducts] = useState<any[]>([]);
  const [status, setStatus] = useState<string>('');

  const handleScan = async () => {
    if (!sourceUrl) return;
    setIsScanning(true);
    setStatus('Inicjowanie skanera AI...');
    
    // Simulate AI scanning
    setTimeout(() => {
      setStatus('Analizowanie struktury Marketplace...');
      setTimeout(() => {
        setStatus('Pobieranie meta-danych produktów...');
        setTimeout(() => {
          setFoundProducts([
            { id: 1, title: 'Smart Watch GT5', price: '299 zł', img: 'https://picsum.photos/seed/watch/200' },
            { id: 2, title: 'Bezprzewodowe Słuchawki Pro', price: '159 zł', img: 'https://picsum.photos/seed/audio/200' },
            { id: 3, title: 'Powerbank 20000mAh', price: '89 zł', img: 'https://picsum.photos/seed/power/200' },
          ]);
          setIsScanning(false);
          setStatus('Skanowanie zakończone pomyślnie.');
        }, 1500);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 pointer-events-none">
         <Globe size={160} />
      </div>

      <div className="mb-10 relative z-10">
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Pobieracz Ofert AI</h3>
        <p className="text-slate-500 font-bold italic text-sm">Podaj URL marketplace lub hurtowni, aby automatycznie zaimportować towary.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10 relative z-10">
        <div className="flex-1 relative">
           <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
              <Globe size={20} />
           </div>
           <input 
             type="text" 
             value={sourceUrl}
             onChange={(e) => setSourceUrl(e.target.value)}
             placeholder="https://hurtownia-partner.pl/kategoria/elektronika"
             className="w-full bg-slate-50 border-none rounded-[28px] pl-14 pr-6 py-5 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-300"
           />
        </div>
        <button 
          onClick={handleScan}
          disabled={isScanning || !sourceUrl}
          className="px-10 py-5 bg-slate-900 text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {isScanning ? <RefreshCw className="animate-spin" size={16} /> : <Search size={16} />}
          Skanuj AI
        </button>
      </div>

      {status && (
        <div className="mb-8 p-4 bg-blue-50 rounded-2xl flex items-center gap-3 text-xs font-black text-blue-600 uppercase tracking-widest">
           {isScanning ? <RefreshCw size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
           {status}
        </div>
      )}

      {foundProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
          {foundProducts.map((p) => (
            <div key={p.id} className="group p-4 bg-slate-50 rounded-[32px] border border-transparent hover:border-slate-100 hover:bg-white transition-all hover:shadow-xl">
               <div className="aspect-square rounded-[24px] overflow-hidden mb-4 bg-white relative">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:bg-blue-600 hover:text-white transition-colors">
                        <Download size={18} />
                     </button>
                  </div>
               </div>
               <h4 className="text-sm font-black text-slate-900 truncate mb-1">{p.title}</h4>
               <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-600 italic">{p.price}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wykryto AI</span>
               </div>
            </div>
          ))}
        </div>
      )}

      {!isScanning && foundProducts.length === 0 && (
        <div className="py-20 border-2 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center text-center">
           <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6 font-black">
              AI
           </div>
           <p className="text-slate-300 font-bold italic text-sm">Wprowadź link powyżej, aby rozpocząć inteligentną analizę ofert.</p>
        </div>
      )}
    </div>
  );
}
