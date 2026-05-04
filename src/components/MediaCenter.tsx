import { Newspaper, Play, Bookmark, TrendingUp, Search, Clock, FileDown, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const NEWS = [
  { 
    id: 1, 
    title: 'AI w Polskim Rolnictwie - Raport 2026', 
    tag: 'Technologia', 
    description: 'Rewolucja na polskich polach. Jak drony i algorytmy zmieniają sposób w jaki uprawiamy ziemię.',
    img: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, 
    title: 'Jak zarobić pierwszy milion na dropshippingu?', 
    tag: 'Biznes', 
    description: 'Praktyczny przewodnik po handlu bez magazynu. Strategie na rok 2026.',
    img: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, 
    title: '5 trendów w e-commerce których nie możesz przegapić', 
    tag: 'E-commerce', 
    description: 'Social commerce, płatności biometryczne i inne nowości, które zdominują rynek.',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
  }
];

export function MediaCenter() {
  const [isGenerating, setIsGenerating] = useState(false);
  const today = new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF() as any;
      doc.setFontSize(22);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text('OmniMarket AI - Gazeta Biznesowa', 20, 20);
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(`Wydanie z dnia: ${new Date().toLocaleDateString('pl-PL')}`, 20, 28);
      doc.setLineWidth(0.5);
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.line(20, 35, 190, 35);
      let yOffset = 50;
      NEWS.forEach((news, index) => {
        doc.setFontSize(8);
        doc.setTextColor(37, 99, 235); // blue-600
        doc.text(news.tag.toUpperCase(), 20, yOffset);
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42);
        doc.text(news.title, 20, yOffset + 8, { maxWidth: 170 });
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105); // slate-600
        doc.text(news.description, 20, yOffset + 18, { maxWidth: 170 });
        yOffset += 40;
        if (index < NEWS.length - 1) {
          doc.setDrawColor(241, 245, 249); // slate-100
          doc.line(20, yOffset - 10, 190, yOffset - 10);
        }
      });
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text('© 2026 OmniMarket AI. Wygenerowano automatycznie przez OmniAgenta.', 20, 280);
      doc.save('OmniGazeta_Wydanie.pdf');
    } catch (error) {
      console.error('PDF Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 sm:px-6">
      {/* Newspaper Masthead */}
      <header className="border-b-4 border-slate-900 py-10 mb-10">
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between border-b border-slate-200 pb-2 mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 font-sans">
            <span>Vol. LXIV — No. 12</span>
            <span className="hidden md:inline">OmiMarket AI Ecosystem — Intelligence Hub</span>
            <span>{today}</span>
          </div>
          <h1 className="font-editorial text-7xl md:text-9xl text-slate-900 italic font-black tracking-tighter leading-none mb-4 text-center">
            Omni<span className="text-blue-600">Gazeta</span>
          </h1>
          <div className="w-full h-1 bg-slate-900 mt-2"></div>
          <div className="w-full flex items-center justify-between py-2 border-b border-slate-900 text-xs font-bold text-slate-800 italic">
            <span>Wydanie Specjalne: Przyszłość E-commerce</span>
            <button 
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors uppercase tracking-widest text-[9px] font-black not-italic"
            >
              {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <FileDown size={12} />}
              Pobierz wydanie PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Newspaper Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Featured One */}
        <article className="lg:col-span-8 group cursor-pointer">
          <div className="relative overflow-hidden mb-6 aspect-video rounded-sm border border-slate-200">
            <img 
              src={NEWS[0].img} 
              alt={NEWS[0].title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
              {NEWS[0].tag}
            </div>
          </div>
          <h2 className="font-editorial text-4xl md:text-6xl font-black text-slate-900 mb-4 leading-none group-hover:text-blue-600 transition-colors underline decoration-blue-600/0 group-hover:decoration-blue-600 decoration-4 underline-offset-4">
            {NEWS[0].title}
          </h2>
          <p className="font-serif text-lg text-slate-600 leading-relaxed mb-6 italic">
            {NEWS[0].description}
          </p>
          <div className="flex items-center gap-4 py-4 border-t border-slate-100">
            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-editorial italic text-lg text-slate-400">AI</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Autor: OmniAgent 2.0</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Główny Analityk Danych</p>
            </div>
            <button className="ml-auto text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 group/btn">
              Czytaj dalej <Play size={10} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </article>

        {/* Right Column: Secondary Articles */}
        <div className="lg:col-span-4 space-y-10 border-t md:border-t-0 md:border-l border-slate-200 lg:pl-10">
          <div className="inline-block bg-slate-900 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-6">
            Ostatnie Wiadomości
          </div>
          
          {NEWS.slice(1).map((item) => (
            <article key={item.id} className="group cursor-pointer border-b border-slate-100 pb-10 last:border-0 last:pb-0">
               <div className="mb-4 overflow-hidden rounded-sm aspect-square max-h-40 border border-slate-200">
                <img 
                  src={item.img} 
                  alt="" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{item.tag}</p>
              <h3 className="font-editorial text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="font-serif text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed italic">
                {item.description}
              </p>
              <button className="text-[9px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-blue-600 flex items-center gap-2">
                Analiza Ekspercka <ArrowRight size={10} />
              </button>
            </article>
          ))}

          {/* Ad Placeholder */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 text-center rounded-sm">
            <TrendingUp size={32} className="mx-auto text-slate-300 mb-4" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Miejsce na Twoją Reklamę</p>
            <p className="text-[9px] font-medium text-slate-400 mb-4 italic">Dotrzyj do miliona sprzedawców OmniMarket</p>
            <button className="w-full py-2 bg-slate-200 text-slate-600 rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
              Kontakt z Redakcją
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Triptych Section */}
      <section className="mt-20 pt-10 border-t-2 border-slate-900">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 mb-10 text-center italic">Analizy Rynkowe & Trendy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4 group cursor-pointer border-r border-slate-100 pr-5 last:border-0 last:pr-0">
               <div className="flex items-start gap-4">
                  <span className="font-editorial text-4xl font-black text-blue-600 opacity-20 group-hover:opacity-100 transition-opacity leading-none">0{i}</span>
                  <div>
                    <h4 className="font-editorial text-lg font-black text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">Prognozy E-commerce Q4 2026</h4>
                    <p className="text-[11px] text-slate-500 font-serif italic line-clamp-2">Szczegółowa analiza zachowań konsumenckich w nadchodzącym kwartale...</p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
