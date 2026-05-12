import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  subscribeToNotifications, 
  getUserPreferences, 
  saveUserPreferences, 
  markNotificationAsRead, 
  deleteNotification,
  SiteNotification,
  createNotification
} from '../services/notificationService';
import { 
  Bell, 
  Settings, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { cn } from '../lib/utils';

export function NotificationManager() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<SiteNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [prefs, setPrefs] = useState<any>({
    subscribedCategories: [],
    minPrice: null,
    maxPrice: null,
    keywords: []
  });

  // Load preferences
  useEffect(() => {
    if (user) {
      getUserPreferences(user.uid).then(p => {
        if (p) setPrefs(p);
      });

      const unsub = subscribeToNotifications(user.uid, (notifs) => {
        // Check for new unread notifications to show toast
        const newUnread = notifs.filter(n => !n.read && !notifications.find(old => old.id === n.id));
        if (newUnread.length > 0) {
          newUnread.forEach(n => {
            toast(n.title, {
              description: n.message,
              icon: <Bell size={16} className="text-blue-600" />,
            });
          });
        }
        setNotifications(notifs);
      });
      return unsub;
    }
  }, [user]);

  // Simulated "Listing Watchdog"
  // This listens for new listings and creates a notification if it matches preferences
  useEffect(() => {
    if (!user || !prefs.subscribedCategories?.length) return;

    const q = query(
      collection(db, 'listings'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const listing = change.doc.data();
          
          // Check if it's new (created after we started listening, loosely)
          const isNew = true; // For demo, we assume added change = new listing
          if (isNew && listing.sellerId !== user.uid) {
            const matchesCategory = prefs.subscribedCategories.includes(listing.category);
            const matchesPrice = (!prefs.minPrice || listing.price >= prefs.minPrice) && 
                                 (!prefs.maxPrice || listing.price <= prefs.maxPrice);
            
            if (matchesCategory && matchesPrice) {
              // Self-create notification
              createNotification(
                user.uid,
                "Dobra okazja!",
                `Nowa oferta w kategorii ${listing.category}: ${listing.title}`,
                'listing_alert',
                change.doc.id
              );
            }
          }
        }
      });
    });

    return unsub;
  }, [user, prefs]);

  const handleSavePrefs = async () => {
    if (!user) return;
    try {
      await saveUserPreferences(user.uid, prefs);
      toast.success("Preferencje zapisane!");
      setIsSettingsOpen(false);
    } catch (error) {
      toast.error("Błąd zapisu preferencji.");
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group"
      >
        <Bell size={20} className={cn(unreadCount > 0 && "animate-pulse")} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-900">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-96 max-h-[600px] bg-white rounded-[32px] shadow-2xl z-50 border border-slate-100 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Powiadomienia</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {unreadCount} nieprzeczytanych
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 rounded-xl border border-slate-100 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Settings size={18} />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell size={48} className="mx-auto text-slate-100 mb-4" />
                    <p className="text-slate-400 text-sm font-medium italic">Brak nowych powiadomień</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id}
                      className={cn(
                        "p-4 rounded-2xl border transition-all relative group",
                        n.read ? "bg-slate-50/50 border-slate-100" : "bg-blue-50/30 border-blue-100/50"
                      )}
                    >
                      <div className="flex gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                          n.type === 'listing_alert' ? "bg-blue-100 text-blue-600" : 
                          n.type === 'message' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"
                        )}>
                          {n.type === 'listing_alert' ? <AlertCircle size={20} /> : 
                           n.type === 'message' ? <MessageSquare size={20} /> : <CheckCircle2 size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-black text-slate-900 truncate">{n.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 italic leading-relaxed">{n.message}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                               {n.createdAt?.toDate ? n.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                            </span>
                            <div className="flex gap-2">
                              {!n.read && (
                                <button 
                                  onClick={() => markNotificationAsRead(n.id!)}
                                  className="text-[9px] font-black text-blue-600 uppercase hover:underline"
                                >
                                  Oznacz jako przeczytane
                                </button>
                              )}
                              <button 
                                onClick={() => deleteNotification(n.id!)}
                                className="text-slate-300 hover:text-rose-600 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl shadow-slate-900/20"
            >
              <div className="p-10 border-b border-slate-50">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900 italic">Settings</h3>
                  <button onClick={() => setIsSettingsOpen(false)} className="p-3 rounded-2xl border border-slate-100 hover:bg-slate-50">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">
                       Subskrybowane Kategorie
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Pojazdy', 'Nieruchomości', 'Elektronika', 'Moda', 'Usługi', 'Kariera'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            const newCats = prefs.subscribedCategories.includes(cat)
                              ? prefs.subscribedCategories.filter((c: string) => c !== cat)
                              : [...prefs.subscribedCategories, cat];
                            setPrefs({...prefs, subscribedCategories: newCats});
                          }}
                          className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                            prefs.subscribedCategories.includes(cat) 
                              ? "bg-blue-600 text-white" 
                              : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">
                         Cena od (PLN)
                      </label>
                      <input 
                        type="number"
                        value={prefs.minPrice || ''}
                        onChange={(e) => setPrefs({...prefs, minPrice: Number(e.target.value) || null})}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-100 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">
                         Cena do (PLN)
                      </label>
                      <input 
                        type="number"
                        value={prefs.maxPrice || ''}
                        onChange={(e) => setPrefs({...prefs, maxPrice: Number(e.target.value) || null})}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-100 text-sm font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                        placeholder="1,000,000"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                   <button 
                    onClick={handleSavePrefs}
                    className="flex-1 py-5 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10"
                   >
                     Zapisz Preferencje
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
