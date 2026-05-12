import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon, 
  Check,
  Share2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      color: 'bg-[#1DA1F2]',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      color: 'bg-[#0077B5]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link skopiowany do schowka!');
    setTimeout(() => setCopied(false), 2000);
  };

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
            className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden p-8"
          >
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  <Share2 size={14} /> Udostępnij
               </div>
               <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <X size={20} />
               </button>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-6 italic tracking-tight">
              {title}
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all group-hover:-translate-y-1 group-active:scale-95",
                    option.color
                  )}>
                    {option.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                    {option.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block ml-2">Skopiuj Link</label>
              <div className="relative">
                <input
                  readOnly
                  value={url}
                  className="w-full bg-slate-50 border-none rounded-2xl pl-4 pr-12 py-4 text-xs font-bold text-slate-600 shadow-inner overflow-hidden text-ellipsis"
                />
                <button
                  onClick={handleCopyLink}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-blue-600 hover:bg-blue-50 transition-all active:scale-90"
                >
                  {copied ? <Check size={16} /> : <LinkIcon size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
