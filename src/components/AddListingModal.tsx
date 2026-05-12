import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { X, Upload, ShoppingBag, Tag, MapPin, Loader2, Sparkles, Wand2, Image as ImageIcon, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../constants/categories';
import { cn } from '../lib/utils';
import { generateProductImage, getAIAssistantResponse } from '../services/aiService';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddListingModal({ isOpen, onClose }: AddListingModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'electronics',
    subcategory: '',
    location: '',
    videoUrl: '',
    type: 'product' as 'product' | 'service',
    dealType: 'sale' as 'sale' | 'exchange' | 'both'
  });

  const selectedCategory = CATEGORIES.find(c => c.id === formData.category);

  const handleAiDescription = async () => {
    if (!formData.title || aiLoading) return;
    setAiLoading(true);
    try {
      const prompt = `Napisz profesjonalny, sprzedażowy opis dla produktu: "${formData.title}" w kategorii ${formData.category}. Opis powinien być krótki, konkretny i zachęcający.`;
      const response = await getAIAssistantResponse(prompt);
      if (response) {
        setFormData(prev => ({ ...prev, description: response }));
      }
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiImage = async () => {
    if (!formData.title || aiLoading) return;
    setAiLoading(true);
    try {
      const img = await generateProductImage(formData.title);
      if (img) {
        setGeneratedImage(img);
      }
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || loading || aiLoading) return;
    setLoading(true);

    try {
      await addDoc(collection(db, 'listings'), {
        ...formData,
        price: parseFloat(formData.price),
        sellerId: user.uid,
        sellerName: user.displayName || user.email?.split('@')[0],
        status: 'active',
        image: generatedImage || `https://picsum.photos/seed/${Math.random()}/800/600`,
        createdAt: serverTimestamp(),
        rating: 5.0,
        aiVerified: true
      });
      onClose();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'listings');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-[48px] bg-white shadow-2xl"
        >
          <div className="flex h-20 items-center justify-between border-b border-slate-100 px-10">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Sparkles className="text-blue-600 animate-pulse" /> Wystaw z noweAI
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto max-h-[80vh]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-12">
                   <div className="bg-blue-50/50 p-4 rounded-3xl border border-blue-100 flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                        <Bot size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Podpowiedź noweAgenta</p>
                        <p className="text-[10px] text-blue-500 font-medium italic">Wpisz tytuł, a ja pomogę Ci z opisem i zdjęciem!</p>
                      </div>
                   </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Tytuł ogłoszenia</label>
                  <input
                    required
                    type="text"
                    disabled={loading || aiLoading}
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="np. Profesjonalny Traktor John Deere"
                    className={cn(
                      "w-full rounded-2xl bg-slate-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20",
                      (loading || aiLoading) && "opacity-50 cursor-not-allowed"
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Cena (PLN)</label>
                    <input
                        required
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="0.00"
                        className="w-full rounded-2xl bg-slate-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                    />
                   </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Lokalizacja</label>
                      <input
                        required
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="Miasto"
                        className="w-full rounded-2xl bg-slate-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2 text-indigo-600">Video URL (YT/TikTok)</label>
                      <input
                        type="text"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                        placeholder="Link do filmu"
                        className="w-full rounded-2xl bg-indigo-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2 flex items-center justify-between">
                    Opis Przedmiotu
                    <button 
                      type="button" 
                      onClick={handleAiDescription}
                      disabled={aiLoading || !formData.title}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest disabled:opacity-30 transition-all bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-100"
                    >
                      {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                      Generuj opis AI
                    </button>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Opisz swój produkt..."
                    className="w-full rounded-[32px] bg-slate-50 border-none px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2 flex items-center justify-between">
                    Zdjęcie Produktu
                    <button 
                      type="button" 
                      onClick={handleAiImage}
                      disabled={aiLoading || !formData.title}
                      className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 normal-case tracking-normal disabled:opacity-30"
                    >
                      <ImageIcon size={12} /> Wygeneruj AI
                    </button>
                  </label>
                  <div className="aspect-square w-full rounded-[32px] bg-slate-50 border-2 border-dashed border-slate-100 flex items-center justify-center overflow-hidden relative group">
                    {generatedImage ? (
                      <img src={generatedImage} alt="AI Preview" className="h-full w-full object-cover" />
                    ) : aiLoading ? (
                       <div className="flex flex-col items-center gap-3">
                         <Loader2 className="animate-spin text-blue-600" size={32} />
                         <p className="text-[10px] font-black uppercase text-slate-400">Pędzel AI pracuje...</p>
                       </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-slate-300">
                        <Upload size={32} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Wgraj lub Wygeneruj</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Kategoria</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
                      className="w-full rounded-2xl bg-slate-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                    >
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  {selectedCategory?.subcategories && (
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Podkategoria</label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                        className="w-full rounded-2xl bg-slate-50 border-none px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">Wybierz podkategorię</option>
                        {selectedCategory.subcategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Forma Transakcji</label>
                    <div className="grid grid-cols-3 gap-2">
                       {['sale', 'exchange', 'both'].map((type) => (
                         <button 
                           key={type}
                           type="button"
                           onClick={() => setFormData({...formData, dealType: type as any})}
                           className={cn(
                             "py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                             formData.dealType === type 
                               ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" 
                               : "bg-white text-slate-600 border-slate-100 hover:border-blue-200"
                           )}
                         >
                           {type === 'sale' ? 'Sprzedaż' : type === 'exchange' ? 'Zamiana' : 'Obie formy'}
                         </button>
                       ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Typ Oferty</label>
                    <div className="grid grid-cols-2 gap-2">
                       <button 
                        type="button"
                        onClick={() => setFormData({...formData, type: 'product'})}
                        className={cn("py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all", formData.type === 'product' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-100")}
                       >
                         Produkt
                       </button>
                       <button 
                        type="button"
                        onClick={() => setFormData({...formData, type: 'service'})}
                        className={cn("py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all", formData.type === 'service' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-100")}
                       >
                         Usługa
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                disabled={loading || aiLoading}
                className="flex-1 rounded-[24px] border border-slate-200 py-5 text-sm font-black text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest disabled:opacity-50"
              >
                Anuluj
              </button>
              <button 
                type="submit"
                disabled={loading || aiLoading}
                className="flex-[2] rounded-[24px] bg-blue-600 py-5 text-sm font-black text-white shadow-2xl shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:opacity-50 uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Przetwarzanie...
                  </>
                ) : 'Wystaw Ofertę noweAI'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
