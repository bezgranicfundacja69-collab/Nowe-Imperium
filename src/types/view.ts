import React from 'react';

export type AppView = 'home' | 'automation' | 'wallet' | 'rewards' | 'media' | 'contact' | 'seller' | 'settings' | 'messages' | 'business' | 'wholesale' | 'integrations' | 'tourism' | 'idea-bank' | 'ai-scraping' | 'partners' | 'affiliate-bot' | 'marketing-manager' | 'ready-businesses' | 'nowe-bots' | 'dropshipping-hub' | 'ai-help' | 'investors' | 'our-apps' | 'collaboration' | 'crowdfunding' | 'equity' | 'pitch';

export interface ViewProps {
  onNavigate: (view: AppView) => void;
  cart: { id: string, title: string, price: number, image: string }[];
  setCart?: React.Dispatch<React.SetStateAction<{ id: string, title: string, price: number, image: string }[]>>;
}
