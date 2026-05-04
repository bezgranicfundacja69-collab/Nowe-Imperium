import { ShoppingBag, Search, PlusCircle, User as UserIcon, LogOut, MessageSquare, Bot, Settings, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';
import React, { useState } from 'react';
import { AuthModal } from './AuthModal';

interface NavbarProps {
  onSearchChange?: (val: string) => void;
  searchValue?: string;
  cartCount?: number;
  onNavigate?: (view: 'home' | 'automation' | 'wallet' | 'rewards' | 'media' | 'contact' | 'agents' | 'profile' | 'settings' | 'messages' | 'business' | 'wholesale' | 'integrations' | 'tourism' | 'idea-bank' | 'ai-scraping' | 'affiliate-bot' | 'marketing-manager' | 'ready-businesses' | 'ai-help' | 'cart') => void;
}

export function Navbar({ onSearchChange, searchValue, onNavigate, cartCount = 0 }: NavbarProps) {
  const { user, signInGoogle, logOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[60] w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 flex-1">
          <div onClick={() => onNavigate?.('home')} className="flex items-center gap-3 group cursor-pointer">
            <div className="flex items-center justify-center h-10 w-10 bg-black rounded-xl shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform border border-blue-500/50">
              <ShoppingBag className="text-blue-400 group-hover:text-blue-300 animate-pulse" size={20} />
            </div>
            <div className="flex flex-col gap-0 leading-none">
              <span className="text-xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">
                Omni<span className="text-blue-600">Market</span>
              </span>
              <span className="text-[8px] font-black tracking-[0.2em] text-slate-400 uppercase leading-none mt-1">AI Ecosystem</span>
            </div>
          </div>

          <div className="relative hidden md:block flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Szukaj produktów i usług..."
              className="h-10 w-full rounded-full bg-slate-100 border-none pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>

          <div className="flex items-center gap-6 ml-4">
            <div className="relative">
              <button 
                onClick={() => onNavigate?.('cart')}
                className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors relative"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            <span 
              onClick={() => (window as any).toggleOmniAgent?.()}
              className="hidden lg:inline text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors flex items-center gap-2"
            >
              <Sparkles size={14} className="animate-pulse" /> Asystent AI
            </span>
            <span 
              onClick={() => onNavigate?.('agents')}
              className="hidden lg:inline text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 cursor-pointer transition-colors flex items-center gap-2"
            >
              <Bot size={14} className="animate-pulse" /> Agent Hub
            </span>
            <span 
              onClick={() => onNavigate?.('home')}
              className="hidden lg:inline text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer transition-colors"
            >
              Kategorie
            </span>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button 
                  onClick={() => onNavigate?.('messages')}
                  className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <MessageSquare size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600" />
                </button>

                <div className="h-8 w-px bg-slate-200 mx-1" />

                <div className="group relative">
                  <button className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 font-bold text-xs transition-transform hover:scale-105">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || ''} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span>{user.displayName?.substring(0, 2).toUpperCase() || 'U'}</span>
                    )}
                  </button>
                  
                  <div className="absolute right-0 top-full mt-2 w-48 scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                      <div className="px-3 py-2 mb-1 border-b border-slate-50">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.displayName}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => onNavigate?.('profile')}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <UserIcon size={16} /> Profil
                      </button>
                      <button 
                        onClick={() => onNavigate?.('settings')}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Settings size={16} /> Ustawienia
                      </button>
                      <button onClick={logOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={16} /> Wyloguj
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="rounded-full bg-blue-600 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-sm"
              >
                Zaloguj się
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
