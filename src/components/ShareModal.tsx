import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Facebook, Twitter, Phone as WhatsApp, Share2, Send, Linkedin } from 'lucide-react';
import { cn } from '../lib/utils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2]',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'WhatsApp',
      icon: WhatsApp,
      color: 'bg-[#25D366]',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#0088cc]',
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0077b5]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl pointer-events-auto border border-slate-100"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Share2 size={24} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 italic tracking-tighter">Udostępnij Ofertę</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg",
                      option.color
                    )}>
                      <option.icon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{option.name}</span>
                  </a>
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Kopiuj Link</p>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100 group">
                  <input
                    type="text"
                    readOnly
                    value={url}
                    className="flex-1 bg-transparent border-none text-xs text-slate-600 focus:outline-none px-2 font-medium"
                  />
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "p-3 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                      copied ? "bg-emerald-500 text-white" : "bg-white text-slate-900 shadow-sm hover:bg-slate-900 hover:text-white"
                    )}
                  >
                    {copied ? (
                      <>
                        <Check size={14} /> Skopiowano
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Kopiuj
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
