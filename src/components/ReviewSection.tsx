import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageCircle, TrendingUp, User, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { getReviews, Review } from '../services/reviewService';

interface ReviewSectionProps {
  targetId: string;
  targetType: 'listing' | 'user';
  averageRating?: number;
  reviewCount?: number;
  refreshTrigger?: number;
}

export function ReviewSection({ targetId, targetType, averageRating = 0, reviewCount = 0, refreshTrigger = 0 }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getReviews(targetId, targetType);
      setReviews(data);
      setLoading(false);
    }
    load();
  }, [targetId, targetType, refreshTrigger]);

  const stats = [
    { label: 'Średnia Ocena', value: averageRating.toFixed(1), icon: <Star size={16} className="text-amber-500 fill-amber-500" /> },
    { label: 'Wszystkie Opinie', value: reviewCount, icon: <MessageCircle size={16} className="text-blue-500" /> },
    { label: 'Trend Pozytywny', value: '98%', icon: <TrendingUp size={16} className="text-emerald-500" /> },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 italic">
      {/* Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4 group hover:shadow-xl transition-all">
            <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
               {stat.icon}
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
               <p className="text-xl font-black text-slate-900 leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="bg-slate-50 rounded-[32px] border border-dashed border-slate-200 p-12 text-center">
             <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <AlertCircle size={24} className="text-slate-300" />
             </div>
             <h4 className="text-lg font-black text-slate-400 italic">Brak opinii dla tej pozycji</h4>
             <p className="text-sm text-slate-400 font-medium italic mt-2">Bądź pierwszym, który podzieli się swoim doświadczeniem!</p>
          </div>
        ) : (
          <AnimatePresence mode='popLayout'>
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-black text-xs border-2 border-white shadow-sm shrink-0">
                         {review.reviewerName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900 leading-none mb-1">{review.reviewerName}</p>
                         <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star 
                                key={s} 
                                size={12} 
                                className={cn(s <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} 
                              />
                            ))}
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                      <Clock size={12} />
                      {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString('pl-PL') : 'Dzisiaj'}
                   </div>
                </div>
                
                <div className="relative">
                   <div className="absolute top-0 left-0 -ml-4 -mt-2 opacity-10">
                      <MessageCircle size={40} className="text-blue-500" />
                   </div>
                   <p className="text-slate-600 text-sm font-medium leading-relaxed italic relative z-10 pl-2">
                     {review.comment}
                   </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
