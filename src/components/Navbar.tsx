import { ShoppingBag, Search, PlusCircle, User as UserIcon, LogOut, MessageSquare, Bot, Settings, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';
import React, { useState } from 'react';
import { AuthModal } from './AuthModal';
import { NotificationManager } from './NotificationManager';

interface NavbarProps {
  onSearchChange?: (val: string) => void;
  searchValue?: string;
  cartCount?: number;
  onNavigate?: (view: 'home' | 'automation' | 'wallet' | 'rewards' | 'media' | 'contact' | 'agents' | 'profile' | 'settings' | 'messages' | 'business' | 'wholesale' | 'integrations' | 'tourism' | 'idea-bank' | 'ai-scraping' | 'affiliate-bot' | 'marketing-manager' | 'ready-businesses' | 'ai-help' | 'cart' | 'crowdfunding' | 'equity' | 'pitch' | 'investors') => void;
}

export function Navbar({ onSearchChange, searchValue, onNavigate, cartCount = 0 }: NavbarProps) {
  const { user, signInGoogle, logOut } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[60] w-full border-b border-prestige-200 bg-white/70 backdrop-blur-xl">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 flex-1">
          <div onClick={() => onNavigate?.('home')} className="flex items-center gap-2.5 group cursor-pointer">
            <div className="flex items-center justify-center h-9 w-9 bg-prestige-950 rounded-xl shadow-lg ring-1 ring-white/20 group-hover:scale-105 transition-all duration-500">
              <ShoppingBag className="text-white" size={18} />
            </div>
            <div className="flex flex-col gap-0 leading-none">
              <span className="text-lg font-display font-black text-prestige-950 tracking-tight uppercase leading-none">
                nowe<span className="text-accent-indigo">imperium</span>
              </span>
              <span className="text-[7px] font-technical font-bold tracking-[0.3em] text-prestige-400 uppercase leading-none mt-0.5">AI Enterprise Ecosystem</span>
            </div>
          </div>

          <div className="relative hidden md:block flex-1 max-w-md group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-prestige-400 group-focus-within:text-accent-indigo transition-colors" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Wyszukaj w ekosystemie..."
              className="h-9 w-full rounded-xl bg-prestige-100 border-none pl-10 pr-4 text-xs font-medium text-prestige-900 focus:outline-none focus:ring-1 focus:ring-accent-indigo/30 focus:bg-white transition-all duration-300"
            />
          </div>
        </div>

          <div className="flex items-center gap-5 ml-4">
            <div className="relative">
              <button 
                onClick={() => onNavigate?.('cart')}
                className="p-2 text-prestige-600 hover:text-accent-indigo hover:bg-prestige-100 rounded-xl transition-all relative"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-md bg-accent-indigo text-white text-[9px] font-black flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            
            <nav className="hidden lg:flex items-center gap-4">
              <button 
                onClick={() => (window as any).togglenoweAgent?.()}
                className="text-[10px] font-display font-bold uppercase tracking-wider text-accent-emerald hover:text-emerald-700 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-emerald-50"
              >
                <Sparkles size={12} /> Asystent AI
              </button>
              
              <button 
                onClick={() => onNavigate?.('agents')}
                className="text-[10px] font-display font-bold uppercase tracking-wider text-accent-indigo hover:text-indigo-700 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-indigo-50"
              >
                <Bot size={12} /> Agent Hub
              </button>

              <button 
                onClick={() => onNavigate?.('home')}
                className="text-[11px] font-display font-semibold text-prestige-500 hover:text-prestige-900 px-2 py-1 rounded-md transition-all"
              >
                Kategorie
              </button>
            </nav>
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button 
                  onClick={() => onNavigate?.('messages')}
                  className="relative p-2 text-prestige-600 hover:text-accent-indigo hover:bg-prestige-100 rounded-xl transition-all"
                >
                  <MessageSquare size={18} />
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent-indigo ring-2 ring-white" />
                </button>

                <NotificationManager />

                <div className="h-6 w-px bg-prestige-200" />

                <div className="group relative">
                  <button className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl ring-1 ring-prestige-200 bg-white text-prestige-900 font-display font-bold text-[10px] transition-all hover:ring-accent-indigo/50 hover:shadow-md">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || ''} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span>{user.displayName?.substring(0, 2).toUpperCase() || 'U'}</span>
                    )}
                  </button>
                  
                  <div className="absolute right-0 top-full pt-3 scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
                    <div className="glass-card w-48 p-1.5 rounded-2xl overflow-hidden">
                      <div className="px-3 py-2.5 mb-1 bg-prestige-50/50 rounded-xl">
                        <p className="text-[11px] font-display font-bold text-prestige-950 truncate">{user.displayName}</p>
                        <p className="text-[9px] font-medium text-prestige-400 truncate tracking-tight">{user.email}</p>
                      </div>
                      <div className="space-y-0.5">
                        <button 
                          onClick={() => onNavigate?.('profile')}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-prestige-700 hover:bg-white hover:text-accent-indigo transition-all"
                        >
                          <UserIcon size={14} /> Profil
                        </button>
                        <button 
                          onClick={() => onNavigate?.('settings')}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-prestige-700 hover:bg-white hover:text-accent-indigo transition-all"
                        >
                          <Settings size={14} /> Ustawienia
                        </button>
                        <div className="my-1 border-t border-prestige-100" />
                        <button onClick={logOut} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 transition-all">
                          <LogOut size={14} /> Wyloguj
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="prestige-button-primary !py-2 !px-5 !text-[11px]"
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
