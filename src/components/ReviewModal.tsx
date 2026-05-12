import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import { addReview } from '../services/reviewService';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'listing' | 'user';
  targetTitle: string;
  onSuccess?: () => void;
}

export function ReviewModal({ isOpen, onClose, targetId, targetType, targetTitle, onSuccess }: ReviewModalProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0) return;

    setLoading(true);
    try {
      await addReview({
        reviewerId: user.uid,
        reviewerName: user.displayName || 'Anonimowy Użytkownik',
        targetId,
        targetType,
        rating,
        comment
      });
      setSubmitted(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
        // Reset state after closing
        setRating(0);
        setComment('');
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 italic">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-slate-900 p-8 text-white relative">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-blue-600/20 blur-[60px]" />
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30 text-[10px] font-black uppercase tracking-widest text-blue-400">
                  <Star size={12} fill="currentColor" /> Feedback Exchange
                </div>
                <h2 className="text-3xl font-black italic tracking-tighter leading-none">Dodaj Opinię</h2>
                <p className="text-slate-400 text-sm font-medium italic truncate max-w-[80%]">Oceniając: {targetTitle}</p>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                  <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 italic">Dziękujemy!</h3>
                    <p className="text-slate-500 font-medium italic">Twoja opinia została pomyślnie opublikowana i pomaga innym użytkownikom noweimperium.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Star Rating */}
                  <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block text-center">Twoja Ocena</label>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1 transition-all hover:scale-125 focus:outline-none"
                        >
                          <Star 
                            size={40} 
                            className={cn(
                              "transition-colors",
                              (hoverRating || rating) >= star ? "text-amber-400 fill-amber-400" : "text-slate-200"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <label className="text-xs font-black text-slate-900 uppercase tracking-tighter">Treść Opinii</label>
                      <span className="text-[10px] text-slate-400 font-bold italic">{comment.length}/500</span>
                    </div>
                    <div className="relative group">
                       <MessageSquare className="absolute left-6 top-6 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                       <textarea
                         value={comment}
                         onChange={(e) => setComment(e.target.value.slice(0, 500))}
                         placeholder="Napisz co sądzisz o produkcie lub sprzedawcy..."
                         className="w-full bg-slate-50 border-2 border-transparent rounded-[32px] pl-16 pr-8 py-6 text-sm focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all min-h-[160px] font-medium shadow-inner placeholder:italic resize-none"
                         required
                       />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={rating === 0 || loading}
                    className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-2xl hover:shadow-blue-600/30 disabled:opacity-50 disabled:scale-95 group"
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Publikowanie...
                      </>
                    ) : (
                      <>
                        Wyślij Opinię <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
