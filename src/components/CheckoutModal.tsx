import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, CreditCard, Loader2 } from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';
import { ConfirmationModal } from './ConfirmationModal';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    price: number;
    sellerId: string;
  } | null;
  onSuccess: (paymentId: string) => void;
}

function CheckoutForm({ item, onSuccess, onClose }: { 
  item: NonNullable<CheckoutModalProps['item']>, 
  onSuccess: CheckoutModalProps['onSuccess'],
  onClose: () => void
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!STRIPE_KEY) {
    return (
      <div className="bg-amber-50 text-amber-700 p-6 rounded-3xl border border-amber-100 text-sm font-bold">
        <p className="mb-2 uppercase tracking-widest text-[10px] font-black">Błąd Konfiguracji</p>
        Brak klucza VITE_STRIPE_PUBLISHABLE_KEY. Skonfiguruj płatności w ustawieniach projektu, aby umożliwić zakupy.
      </div>
    );
  }

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setShowConfirm(true);
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'Błąd walidacji danych.');
      setProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: item.price,
          metadata: { listingId: item.id, sellerId: item.sellerId }
        }),
      });

      const { clientSecret, error: apiError } = await response.json();

      if (apiError) throw new Error(apiError);

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin + '/payment-success',
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      setError(err.message || 'Wystąpił nieoczekiwany błąd.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePreSubmit} className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between mb-6">
         <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Do zapłaty</p>
            <p className="text-xl font-black text-slate-900">{formatPrice(item.price)}</p>
         </div>
         <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <CreditCard size={20} className="text-blue-600" />
         </div>
      </div>

      <PaymentElement options={{ layout: 'tabs' }} />

      {error && (
        <div className="bg-rose-50 text-rose-500 p-4 rounded-2xl text-xs font-bold border border-rose-100">
          {error}
        </div>
      )}

      <div className="pt-4 flex flex-col gap-4">
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full h-14 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 disabled:grayscale disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {processing ? <Loader2 className="animate-spin" size={20} /> : `Potwierdź płatność (${formatPrice(item.price)})`}
        </button>
        <button 
          type="button"
          onClick={onClose}
          className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600"
        >
          Anuluj transakcję
        </button>
      </div>

      <div className="flex items-center justify-center gap-6 opacity-40 grayscale pt-2">
         <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
         <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MC" className="h-5" />
         <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
      </div>

      <ConfirmationModal 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleSubmit}
        type="success"
        title="Potwierdź zamówienie"
        message={`Czy na pewno chcesz złożyć zamówienie na "${item.title}" za kwotę ${formatPrice(item.price)}?`}
        confirmLabel="Tak, płacę"
        cancelLabel="Wróć"
      />
    </form>
  );
}

export function CheckoutModal({ isOpen, onClose, item, onSuccess }: CheckoutModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="text-blue-600" size={20} />
                 </div>
                 <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Bezpieczna Płatność</h3>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Szyfrowane połączenie SSL</p>
                 </div>
              </div>
              <button 
                onClick={onClose}
                className="h-10 w-10 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <div className="mb-8">
                 <h2 className="text-lg font-black text-slate-900 leading-tight mb-2">{item.title}</h2>
                 <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    <Lock size={12} />
                    Płatność obsługiwana przez Stripe
                 </div>
              </div>

              {stripePromise && (
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    mode: 'payment', 
                    amount: Math.round(item.price * 100), 
                    currency: 'pln',
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#3b82f6',
                        borderRadius: '16px'
                      }
                    }
                  }}
                >
                  <CheckoutForm item={item} onSuccess={onSuccess} onClose={onClose} />
                </Elements>
              )}
              {!stripePromise && (
                <CheckoutForm item={item} onSuccess={onSuccess} onClose={onClose} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
