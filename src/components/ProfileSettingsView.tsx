import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MessageCircle, 
  Linkedin,
  Github,
  Send,
  Share2, 
  Save, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  Settings,
  Globe,
  Quote,
  ShieldCheck,
  BadgeCheck,
  Trophy,
  Star,
  ExternalLink,
  CreditCard,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';

import { ViewProps } from '../types/view';
import { setDoc, serverTimestamp } from 'firebase/firestore';

interface ProfileSettingsViewProps extends ViewProps {
  onBack: () => void;
}

const BRAND_CONFIG: Record<string, { icon: React.ReactNode, color: string, lightBg: string, label: string, placeholder: string }> = {
  facebook: { 
    icon: <Facebook size={18} />, 
    color: "bg-[#1877F2]", 
    lightBg: "bg-[#1877F2]/10",
    label: "Facebook",
    placeholder: "facebook.com/username"
  },
  instagram: { 
    icon: <Instagram size={18} />, 
    color: "bg-[#E4405F]", 
    lightBg: "bg-[#E4405F]/10",
    label: "Instagram",
    placeholder: "@username"
  },
  tiktok: { 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ), 
    color: "bg-[#010101]", 
    lightBg: "bg-[#010101]/10",
    label: "TikTok",
    placeholder: "@username"
  },
  messenger: { 
    icon: <MessageCircle size={18} />, 
    color: "bg-[#0084FF]", 
    lightBg: "bg-[#0084FF]/10",
    label: "Messenger",
    placeholder: "m.me/username"
  },
  youtube: { 
    icon: <Youtube size={18} />, 
    color: "bg-[#FF0000]", 
    lightBg: "bg-[#FF0000]/10",
    label: "YouTube",
    placeholder: "youtube.com/c/channel"
  },
  twitter: { 
    icon: <Twitter size={18} />, 
    color: "bg-[#1DA1F2]", 
    lightBg: "bg-[#1DA1F2]/10",
    label: "Twitter / X",
    placeholder: "@username"
  },
  telegram: { 
    icon: <Send size={18} />, 
    color: "bg-[#26A5E4]", 
    lightBg: "bg-[#26A5E4]/10",
    label: "Telegram",
    placeholder: "t.me/username"
  },
  linkedin: { 
    icon: <Linkedin size={18} />, 
    color: "bg-[#0077B5]", 
    lightBg: "bg-[#0077B5]/10",
    label: "LinkedIn",
    placeholder: "linkedin.com/in/username"
  },
  github: { 
    icon: <Github size={18} />, 
    color: "bg-[#181717]", 
    lightBg: "bg-[#181717]/10",
    label: "GitHub",
    placeholder: "github.com/username"
  }
};

export function ProfileSettingsView({ onBack, onNavigate, cart }: ProfileSettingsViewProps) {
  const { user, updateUserData } = useAuth();
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      tiktok: '',
      messenger: '',
      youtube: '',
      twitter: '',
      linkedin: '',
      github: '',
      telegram: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Stripe Connect State
  const [stripeStatus, setStripeStatus] = useState<{
    accountId: string | null;
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
    loading: boolean;
  }>({
    accountId: null,
    chargesEnabled: false,
    payoutsEnabled: false,
    loading: true
  });

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        // Fetch Stripe Info
        const stripeRef = doc(db, 'sellerStripeInfo', user.uid);
        const stripeSnap = await getDoc(stripeRef);
        
        if (stripeSnap.exists()) {
          const stripeData = stripeSnap.data();
          setStripeStatus(prev => ({ ...prev, accountId: stripeData.stripeAccountId }));
          
          // Check actual status from Stripe via our server
          try {
            const response = await fetch(`/api/stripe/connect/status/${stripeData.stripeAccountId}`);
            if (response.ok) {
              const status = await response.json();
              setStripeStatus(prev => ({
                ...prev,
                chargesEnabled: status.chargesEnabled,
                payoutsEnabled: status.payoutsEnabled,
                loading: false
              }));
            }
          } catch (e) {
            console.error("Error fetching Stripe status:", e);
            setStripeStatus(prev => ({ ...prev, loading: false }));
          }
        } else {
          setStripeStatus(prev => ({ ...prev, loading: false }));
        }

        if (userSnap.exists()) {
          const data = userSnap.data();
          setFormData({
            bio: data.bio || '',
            location: data.location || '',
            socialLinks: {
              facebook: data.socialLinks?.facebook || '',
              instagram: data.socialLinks?.instagram || '',
              tiktok: data.socialLinks?.tiktok || '',
              messenger: data.socialLinks?.messenger || '',
              youtube: data.socialLinks?.youtube || '',
              twitter: data.socialLinks?.twitter || '',
              linkedin: data.socialLinks?.linkedin || '',
              github: data.socialLinks?.github || '',
              telegram: data.socialLinks?.telegram || ''
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateUserData(formData);
      setMessage({ type: 'success', text: 'Profil został pomyślnie zaktualizowany!' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: 'error', text: 'Wystąpił błąd podczas aktualizacji profilu.' });
    } finally {
      setSaving(false);
    }
  };

  const handleSocialChange = (key: keyof typeof formData.socialLinks, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [key]: value
      }
    }));
  };

  const handleStripeOnboarding = async () => {
    if (!user) return;
    setStripeStatus(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch('/api/stripe/connect/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email
        })
      });

      if (response.ok) {
        const { accountId, url } = await response.json();
        
        // Save the account ID to Firestore immediately
        await setDoc(doc(db, 'sellerStripeInfo', user.uid), {
          userId: user.uid,
          stripeAccountId: accountId,
          updatedAt: serverTimestamp()
        }, { merge: true });

        // Redirect to Stripe onboarding
        window.location.href = url;
      }
    } catch (error) {
      console.error("Stripe onboarding error:", error);
      setMessage({ type: 'error', text: 'Nie udało się zainicjować połączenia ze Stripe.' });
      setStripeStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const isFormDirty = true; // For now always true, could be computed

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-black text-slate-500 hover:text-blue-600 transition-all group"
        >
          <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Wróć do profilu
        </button>

        <div className="flex items-center gap-4">
           <button 
             onClick={() => setShowPreview(!showPreview)}
             className={cn(
               "flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border",
               showPreview ? "bg-slate-900 border-slate-900 text-white shadow-xl" : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
             )}
           >
             {showPreview ? <><Eye size={16} /> Ukryj Podgląd</> : <><Eye size={16} /> Pokaż Podgląd</>}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className={cn(
          "transition-all duration-500",
          showPreview ? "lg:col-span-7 xl:col-span-8" : "lg:col-span-12 max-w-4xl mx-auto w-full"
        )}>
          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-900 p-8 sm:p-12 text-white relative">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[80px]" />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
                  <Settings size={12} /> Account Configuration
                </div>
                <h2 className="text-4xl font-black italic tracking-tighter sm:text-5xl">Ustawienia Profilu</h2>
                <p className="text-slate-400 text-lg font-medium italic">Zarządzaj swoim śladem w sieci noweimperium.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-12">
              <AnimatePresence>
                {message && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className={cn(
                      "p-5 rounded-3xl flex items-center gap-4 font-bold text-sm overflow-hidden border",
                      message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                      message.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    )}>
                      {message.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    </div>
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <SectionHeader icon={<User className="text-blue-600" />} title="Tożsamość Publiczna" />
                  
                  <div className="space-y-6">
                    <FormGroup label="Twój Biogram" desc="Krótka historia o Tobie lub Twojej firmie.">
                      <textarea 
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Opisz siebie lub swój biznes..."
                        className="w-full bg-slate-50 border-2 border-transparent rounded-[24px] px-6 py-5 text-sm focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all min-h-[160px] font-medium shadow-inner placeholder:italic"
                      />
                    </FormGroup>

                    <FormGroup label="Główna Lokalizacja" desc="Gdzie najczęściej operujesz?">
                      <div className="relative group">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input 
                          type="text" 
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="np. Warszawa, Polska"
                          className="w-full bg-slate-50 border-2 border-transparent rounded-[24px] pl-16 pr-6 py-5 text-sm focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-black shadow-inner"
                        />
                      </div>
                    </FormGroup>
                  </div>
                </div>

                <div className="space-y-8">
                  <SectionHeader icon={<Share2 className="text-blue-600" />} title="Ekosystem Społecznościowy" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {Object.entries(BRAND_CONFIG).map(([key, config]) => (
                      <SocialInput 
                        key={key}
                        icon={config.icon} 
                        label={config.label} 
                        value={formData.socialLinks[key as keyof typeof formData.socialLinks]}
                        onChange={(val) => handleSocialChange(key as keyof typeof formData.socialLinks, val)}
                        placeholder={config.placeholder}
                        platformKey={key}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <SectionHeader icon={<CreditCard className="text-blue-600" />} title="Finanse i Wypłaty (Stripe Connect)" />
                  
                  <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 space-y-4">
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "h-12 w-12 rounded-2xl flex items-center justify-center",
                         stripeStatus.chargesEnabled ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                       )}>
                          <ShieldCheck size={24} />
                       </div>
                       <div>
                          <p className="text-sm font-black italic tracking-tight">Status Płatności</p>
                          <p className="text-xs text-slate-500 font-medium italic">Włącz bezpośrednie płatności na swoje konto.</p>
                       </div>
                    </div>

                    <div className="space-y-3">
                       {stripeStatus.loading ? (
                         <div className="flex items-center gap-2 text-xs font-bold text-slate-400 p-4 animate-pulse">
                            <Loader2 size={14} className="animate-spin" /> Sprawdzanie statusu Stripe...
                         </div>
                       ) : stripeStatus.chargesEnabled ? (
                         <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-emerald-700 text-xs font-black">
                               <CheckCircle2 size={16} /> TWOJE KONTO JEST AKTYWNE
                            </div>
                            <button 
                              type="button"
                              onClick={() => window.open('https://dashboard.stripe.com', '_blank')}
                              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 flex items-center gap-1"
                            >
                               Panel Stripe <ExternalLink size={10} />
                            </button>
                         </div>
                       ) : (
                         <button 
                           type="button"
                           onClick={handleStripeOnboarding}
                           className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:-translate-y-0.5"
                         >
                            <CreditCard size={14} /> Połącz Konto noweimperium ze Stripe
                         </button>
                       )}

                       <p className="text-[10px] text-slate-400 font-medium italic text-center px-4">
                         Używamy Stripe Connect Express, aby bezpiecznie przetwarzać Twoje wypłaty. 
                         Pieniądze trafiają bezpośrednio na Twoje konto bankowe.
                       </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-xs font-bold text-slate-400 italic">Ostatnia synchronizacja: {new Date().toLocaleTimeString()}</p>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                   <button 
                     type="button"
                     onClick={onBack}
                     className="flex-1 sm:flex-none px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all"
                   >
                     Anuluj
                   </button>
                   <button 
                     type="submit"
                     disabled={saving}
                     className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-12 py-5 bg-blue-600 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 disabled:opacity-50 disabled:scale-95 group"
                   >
                     {saving ? (
                       <>
                         <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                         Synchronizacja...
                       </>
                     ) : (
                       <>
                         <Save size={18} className="group-hover:scale-110 transition-transform" /> Zapisz Profil
                       </>
                     )}
                   </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <AnimatePresence>
          {showPreview && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="lg:col-span-5 xl:col-span-4 sticky top-8 z-30"
            >
              <div className="bg-slate-50 rounded-[40px] border border-slate-100 p-8 space-y-8">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Eye size={12} className="text-blue-500" /> Podgląd Profilu Live
                    </h3>
                 </div>
                 
                 <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 text-center relative overflow-hidden group">
                   <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-blue-50 blur-3xl opacity-50 transition-all group-hover:scale-150" />
                   
                   <div className="relative mx-auto w-32 h-32 mb-6">
                     <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse" />
                     {user?.photoURL ? (
                       <img 
                         src={user.photoURL} 
                         alt={user.displayName || ''} 
                         className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                         referrerPolicy="no-referrer"
                       />
                     ) : (
                       <div className="relative z-10 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-4xl font-black border-4 border-white shadow-xl">
                         {user?.displayName?.substring(0, 2).toUpperCase() || 'OM'}
                       </div>
                     )}
                     <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-2xl shadow-lg border-2 border-white">
                        <CheckCircle2 size={16} />
                     </div>
                   </div>

                   <h2 className="text-2xl font-black text-slate-900 mb-1 italic tracking-tighter">{user?.displayName || 'Twój Nick'}</h2>
                   
                   <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                     <div className="flex items-center gap-1 text-amber-500">
                       <Star size={16} fill="currentColor" />
                       <span className="text-sm font-black">5.0</span>
                     </div>
                     <span className="text-xs text-slate-400 font-medium">(0 opinii)</span>
                     <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-[9px] font-black uppercase tracking-wider border border-blue-200">
                        <BadgeCheck size={10} /> Zweryfikowany
                     </div>
                   </div>

                   <div className="flex flex-wrap justify-center gap-2 mb-8">
                     <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                       <MapPin size={12} /> {formData.location || 'Brak Lokalizacji'}
                     </div>
                     <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                       <Globe size={12} /> noweID: #{user?.uid.substring(0,6).toUpperCase()}
                     </div>
                   </div>

                   <div className="relative px-4 mb-8">
                      <Quote className="absolute -left-2 -top-2 text-blue-100/50" size={32} />
                      <p className="text-sm text-slate-500 font-medium leading-relaxed italic line-clamp-4">
                        {formData.bio || 'Twoja historia zaczyna się tutaj. Napisz coś o sobie, aby przyciągnąć więcej klientów.'}
                      </p>
                   </div>

                   {/* Social Links Preview */}
                   <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {Object.entries(formData.socialLinks).map(([key, value]) => {
                        if (!value) return null;
                        const config = BRAND_CONFIG[key];
                        if (!config) return null;
                        return (
                          <div 
                            key={key} 
                            className={cn(
                              "h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-all hover:-translate-y-1 active:scale-95",
                              config.color
                            )}
                          >
                            {config.icon}
                          </div>
                        );
                      })}
                   </div>

                   <div className="p-1 rounded-[24px] bg-slate-900">
                      <button className="w-full py-4 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                        <MessageCircle size={14} /> Rozpocznij Czat
                      </button>
                   </div>
                 </div>

                 <div className="p-6 rounded-3xl bg-blue-600 text-white relative overflow-hidden">
                    <div className="relative z-10 flex items-center gap-4">
                       <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
                          <Trophy size={24} />
                       </div>
                       <div>
                          <p className="text-xs font-black uppercase tracking-widest text-blue-100">Twój Status</p>
                          <p className="text-lg font-black italic">Początkujący Kupiec</p>
                       </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                       <span className="text-[10px] font-bold">Postęp Profilu</span>
                       <span className="text-[10px] font-bold">85%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-white w-[85%]" />
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SectionHeader({ icon, title }: { icon: any, title: string }) {
  return (
    <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-50">
      <div className="p-2.5 rounded-xl bg-blue-50">
        {icon}
      </div>
      <h3 className="text-lg font-black text-slate-900 italic tracking-tight">{title}</h3>
    </div>
  );
}

function FormGroup({ label, desc, children }: { label: string, desc: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-black text-slate-900 uppercase tracking-tighter">{label}</label>
        <p className="text-[10px] font-medium text-slate-400 italic">{desc}</p>
      </div>
      {children}
    </div>
  );
}

interface SocialInputProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  platformKey: string;
}

const SocialInput: React.FC<SocialInputProps> = ({ icon, label, value, onChange, placeholder, platformKey }) => {
  const config = BRAND_CONFIG[platformKey];

  return (
    <div className="group space-y-1.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="relative">
        <div className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-white transition-all shadow-sm",
          config?.color || "bg-slate-400"
        )}>
          {icon}
        </div>
        <input 
          type="text" 
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-slate-50 border-2 border-transparent rounded-[20px] pl-14 pr-4 py-3 text-sm focus:ring-4 focus:ring-slate-500/5 focus:bg-white transition-all font-bold placeholder:font-medium shadow-inner",
            "group-focus-within:border-slate-200"
          )}
        />
      </div>
    </div>
  );
};

