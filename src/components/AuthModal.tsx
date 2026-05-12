import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { X, Mail, Lock, User, AlertCircle, Loader2, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInEmail, signUp, resetPassword, signInGoogle, signInFacebook } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      if (isReset) {
        await resetPassword(email);
        setMessage('Instrukcje resetowania hasła zostały wysłane na Twój e-mail.');
      } else if (isLogin) {
        await signInEmail(email, password);
        onClose();
      } else {
        await signUp(email, password, name);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas autoryzacji.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Błąd logowania przez Google.');
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInFacebook();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Błąd logowania przez Facebook.');
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
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                {isReset ? 'Resetuj hasło' : isLogin ? 'Witaj ponowie!' : 'Dołącz do nas'}
              </h2>
              <p className="text-slate-500 text-sm">
                {isReset 
                  ? 'Podaj e-mail, aby otrzymać link do resetowania.' 
                  : isLogin 
                    ? 'Zaloguj się, aby zarządzać swoimi ofertami.' 
                    : 'Załóż konto i zacznij sprzedawać w kilka minut.'}
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                <AlertCircle size={18} />
                <p>{error}</p>
              </div>
            )}

            {message && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-sm text-green-600 border border-green-100">
                <AlertCircle size={18} />
                <p>{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !isReset && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Twoje imię i nazwisko"
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {!isReset && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Hasło"
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="mx-auto animate-spin" size={20} />
                ) : (
                  isReset ? 'Wyślij link' : isLogin ? 'Zaloguj się' : 'Utwórz konto'
                )}
              </button>
            </form>

            {!isReset && (
              <div className="mt-8 space-y-4">
                <div className="relative flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-100"></div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">LUB</span>
                  <div className="h-px flex-1 bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white py-3.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
                    Google
                  </button>
                  <button
                    onClick={handleFacebookSignIn}
                    className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white py-3.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <Facebook size={16} className="text-[#1877F2]" />
                    Facebook
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 text-center text-sm">
              {isReset ? (
                <button onClick={() => setIsReset(false)} className="font-bold text-blue-600 hover:underline">
                  Wróć do logowania
                </button>
              ) : (
                <>
                  <span className="text-slate-500">
                    {isLogin ? 'Nie masz konta?' : 'Masz już konto?'}
                  </span>{' '}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setIsReset(false);
                      setError('');
                    }}
                    className="font-bold text-blue-600 hover:underline"
                  >
                    {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
                  </button>
                  {isLogin && (
                    <div className="mt-2">
                      <button onClick={() => setIsReset(true)} className="text-xs text-slate-400 hover:text-blue-600">
                        Zapomniałeś hasła?
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
