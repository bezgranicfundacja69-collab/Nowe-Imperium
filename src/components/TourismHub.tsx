import { 
  Palmtree, 
  Map as MapIcon, 
  Compass, 
  Bed, 
  Plane, 
  Camera, 
  Search,
  Navigation
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useState } from 'react';

import { ViewProps } from '../types/view';

export function TourismHub({ onNavigate, cart }: ViewProps) {
  const [searchQuery, setSearchQuery] = useState('Warszawa');

  return (
    <div className="space-y-12 pb-20">
      <div className="relative overflow-hidden rounded-[48px] bg-sky-900 px-8 py-12 text-white shadow-2xl sm:px-16 sm:py-24 group">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2042" 
                alt="Tourism" 
                className="w-full h-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-900 via-sky-900/60 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-400 border border-sky-500/30 mb-8 font-mono backdrop-blur-md">
              <Compass size={14} className="animate-spin-slow" /> Global Tourism & Travel Hub
            </div>
            <h1 className="text-4xl font-black text-white mb-6 sm:text-6xl italic leading-tight tracking-tighter">
              Świat w Twoim <br /> <span className="text-sky-400">Zasięgu</span>
            </h1>
            <p className="text-sky-100 text-lg max-w-xl font-medium leading-relaxed italic">Zintegrowany portal turystyczny z mapami Google. Planuj, rezerwuj i odkrywaj nowe rynki podróżnicze.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/20 w-full md:w-auto">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Gdzie chcesz lecieć?"
                  className="bg-white/20 border-none rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-sky-200 focus:ring-2 focus:ring-sky-400 transition-all w-full md:w-64"
                />
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Map Integration */}
          <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm aspect-video relative group">
            <iframe 
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA_NOT_A_REAL_KEY&q=${encodeURIComponent(searchQuery)}`}
              className="w-full h-full border-none grayscale-[0.5] contrast-[1.2] brightness-[1.1] transition-all group-hover:grayscale-0"
              allowFullScreen
            />
            {/* Note: I'm using a placeholder key here as this is a mock interface. 
                In a real app, the user would provide their Google Maps API Key. */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100">
              <div className="h-10 w-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600">
                <Navigation size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Twoja Lokalizacja</p>
                <p className="text-sm font-bold text-slate-800">{searchQuery || 'Wybierz miejsce'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PromoCard 
              image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400"
              title="Luksusowe Hotele"
              desc="Zniżki do 40% dla partnerów noweimperium."
            />
            <PromoCard 
              image="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=400"
              title="Egzotyczne Wyprawy"
              desc="Odkrywaj nieznane z naszymi przewodnikami."
            />
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 italic">
               <Bed size={20} className="text-sky-600" /> Polecane Noclegi
            </h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="h-20 w-20 rounded-2xl overflow-hidden shadow-sm">
                    <img src={`https://picsum.photos/seed/hotel${i}/200/200`} alt="Hotel" className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-sky-600 transition-colors">Grand nowe Resort {i}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">Grecja, Mykonos</p>
                    <div className="flex items-center justify-between mt-2">
                       <span className="text-sm font-black text-sky-600">od 450 PLN</span>
                       <div className="flex items-center gap-1 text-[10px] text-amber-500 font-black">
                         ★ 4.9
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-600 transition-all">
              Zobacz Wszystkie Oferty
            </button>
          </div>

          <div className="bg-gradient-to-br from-sky-600 to-indigo-700 rounded-[40px] p-8 text-white relative overflow-hidden group">
            <Plane className="mb-6 opacity-30 animate-pulse" size={48} />
            <h3 className="text-2xl font-black mb-4 leading-tight italic">noweFlight AI</h3>
            <p className="text-sky-100 text-sm mb-8 leading-relaxed font-medium italic">Nasze algorytmy przeszukują tysiące połączeń, aby znaleźć najtańsze bilety dla Ciebie.</p>
            <button className="w-full py-4 bg-white text-sky-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-sky-900/20">
              Szukaj Lotów
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PromoCard({ image, title, desc }: any) {
  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-4 shadow-sm group cursor-pointer hover:border-sky-200 transition-all">
       <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
       </div>
       <h4 className="text-lg font-black text-slate-900 mb-1 italic leading-none">{title}</h4>
       <p className="text-xs text-slate-500 font-medium">{desc}</p>
    </div>
  );
}
