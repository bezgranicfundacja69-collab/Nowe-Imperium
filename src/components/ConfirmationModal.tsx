import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, Info, Trash2, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  icon?: React.ReactNode;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Potwierdź',
  cancelLabel = 'Anuluj',
  type = 'info',
  icon
}: ConfirmationModalProps) {
  const getIcon = () => {
    if (icon) return icon;
    switch (type) {
      case 'danger': return <Trash2 size={24} className="text-rose-600" />;
      case 'warning': return <AlertTriangle size={24} className="text-accent-amber" />;
      case 'success': return <ShoppingBag size={24} className="text-accent-emerald" />;
      default: return <Info size={24} className="text-accent-indigo" />;
    }
  };

  const getButtonStyles = () => {
    switch (type) {
      case 'danger': return 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20';
      case 'warning': return 'bg-accent-amber hover:bg-amber-600 shadow-accent-amber/20';
      case 'success': return 'bg-accent-emerald hover:bg-emerald-700 shadow-accent-emerald/20';
      default: return 'bg-accent-indigo hover:bg-accent-indigo/90 shadow-accent-indigo/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-prestige-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-3xl border border-prestige-200 overflow-hidden"
          >
            <div className="flex flex-col items-center text-center">
              <div className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ring-8 ring-prestige-50/50",
                type === 'danger' ? 'bg-rose-50 text-rose-600' :
                type === 'warning' ? 'bg-amber-50 text-accent-amber' :
                type === 'success' ? 'bg-emerald-50 text-accent-emerald' :
                'bg-indigo-50 text-accent-indigo'
              )}>
                {getIcon()}
              </div>
              
              <h3 className="text-2xl font-display font-bold text-prestige-950 mb-3 tracking-tight">
                {title}
              </h3>
              
              <p className="text-sm text-prestige-500 font-medium leading-relaxed italic mb-10 px-4">
                {message}
              </p>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={onClose}
                  className="prestige-button-secondary !py-4 !rounded-2xl border-prestige-100 text-prestige-400 hover:text-prestige-950"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={cn(
                    "prestige-button-primary !py-4 !rounded-2xl shadow-xl transition-all",
                    getButtonStyles()
                  )}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-prestige-300 hover:text-prestige-600 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
