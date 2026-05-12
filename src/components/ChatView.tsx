import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc,
  getDocs,
  limit
} from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MessageSquare, 
  Send as SendIcon, 
  ArrowLeft,
  ShoppingBag,
  Clock,
  User as UserIcon,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';

import { ViewProps } from '../types/view';

interface ChatViewProps extends ViewProps {
  onBack: () => void;
  initialListingId?: string;
  initialSellerId?: string;
}

export function ChatView({ onBack, initialListingId, initialSellerId, onNavigate, cart }: ChatViewProps) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch conversations where user is a participant
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      setConversations(convs);
      setLoading(false);

      // If we have an initial listing/seller, try to find or create conversation
      if (initialListingId && initialSellerId && user.uid !== initialSellerId) {
        const existing = convs.find(c => c.listingId === initialListingId && c.participants.includes(user.uid) && c.participants.includes(initialSellerId));
        if (existing) {
          setActiveConversation(existing);
        } else {
          // If not in the fetched list yet, we might need to create it
          // But wait, it might have been created by the "Send Message" action already
        }
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'conversations');
    });

    return () => unsubscribe();
  }, [user, initialListingId, initialSellerId]);

  // Fetch messages for active conversation
  useEffect(() => {
    if (!activeConversation) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'conversations', activeConversation.id, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `conversations/${activeConversation.id}/messages`);
    });

    return () => unsubscribe();
  }, [activeConversation]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !activeConversation) return;

    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      // Add message to subcollection
      await addDoc(collection(db, 'conversations', activeConversation.id, 'messages'), {
        senderId: user.uid,
        text: messageText,
        createdAt: serverTimestamp()
      });

      // Update conversation last message
      await updateDoc(doc(db, 'conversations', activeConversation.id), {
        lastMessage: messageText,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `conversations/${activeConversation.id}`);
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.listingTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-[80vh] flex flex-col">
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 flex-1 flex overflow-hidden">
        
        {/* Sidebar - Conversation List */}
        <div className={cn(
          "w-full md:w-80 border-r border-slate-50 flex flex-col",
          activeConversation ? "hidden md:flex" : "flex"
        )}>
          <div className="p-6 border-b border-slate-50">
            <h2 className="text-xl font-black text-slate-900 mb-4 px-1">Wiadomości</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Szukaj..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversation(conv)}
                  className={cn(
                    "w-full p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors border-b border-slate-50 relative group text-left",
                    activeConversation?.id === conv.id ? "bg-blue-50/50" : ""
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <img 
                      src={conv.listingImage || 'https://picsum.photos/seed/market/100/100'} 
                      alt="" 
                      className="h-12 w-12 rounded-xl object-cover shadow-sm bg-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white p-0.5 shadow-sm">
                      <div className="h-full w-full bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <MessageSquare size={8} />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h4 className="text-sm font-black text-slate-900 truncate">{conv.listingTitle || 'Oferta'}</h4>
                      <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">
                        {conv.updatedAt?.toDate()?.toLocaleDateString('pl-PL') || 'Dzisiaj'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate font-medium">
                      {conv.lastMessage || 'Brak wiadomości'}
                    </p>
                  </div>
                  {activeConversation?.id === conv.id && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"
                    />
                  )}
                </button>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400">
                <MessageSquare className="mx-auto mb-4 opacity-20" size={48} />
                <p className="font-bold text-xs uppercase tracking-widest">Brak rozmów</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col bg-slate-50/30",
          !activeConversation ? "hidden md:flex justify-center items-center" : "flex"
        )}>
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between z-10 shadow-sm">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setActiveConversation(null)}
                    className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 overflow-hidden shadow-sm">
                      <img 
                        src={activeConversation.listingImage || 'https://picsum.photos/seed/market/100/100'} 
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-none mb-1">{activeConversation.listingTitle}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        <UserIcon size={10} /> {user?.uid === activeConversation.sellerId ? 'Kupujący' : 'Sprzedawca'}
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onBack} 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                >
                   Aukcja <ChevronRight size={14} />
                </button>
              </div>

              {/* Messages Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex flex-col items-center mb-8">
                   <div className="px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm flex items-center gap-2 mb-4">
                      <ShieldCheck className="text-green-500" size={14} />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Szyfrowana Rozmowa</span>
                   </div>
                   <div className="text-center space-y-2">
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-slate-200 pb-1">noweimperium AI Bezpieczeństwo</p>
                       <p className="text-[9px] text-slate-300 font-semibold max-w-xs mx-auto italic">Nigdy nie podawaj haseł ani kodów BLIK. Transakcje przeprowadzaj tylko przez platformę.</p>
                   </div>
                </div>

                <AnimatePresence>
                  {messages.map((msg, idx) => {
                    const isMe = msg.senderId === user?.uid;
                    const showDate = idx === 0 || (msg.createdAt?.toDate && messages[idx-1].createdAt?.toDate && msg.createdAt.toDate().getTime() - messages[idx-1].createdAt.toDate().getTime() > 3600000);

                    return (
                      <React.Fragment key={msg.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-3 py-1 rounded-full">
                               {msg.createdAt?.toDate()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Teraz'}
                            </span>
                          </div>
                        )}
                        <motion.div
                          initial={{ opacity: 0, x: isMe ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={cn(
                            "flex w-full",
                            isMe ? "justify-end" : "justify-start"
                          )}
                        >
                          <div className={cn(
                            "max-w-[75%] px-4 py-3 rounded-3xl text-sm font-medium shadow-sm",
                            isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                          )}>
                            {msg.text}
                          </div>
                        </motion.div>
                      </React.Fragment>
                    );
                  })}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center gap-4">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Napisz wiadomość..." 
                  className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:scale-95"
                >
                  <SendIcon size={20} />
                </button>
              </form>
            </>
          ) : (
            <div className="p-12 text-center max-w-sm">
              <div className="h-24 w-24 bg-white rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-8 text-blue-600">
                <MessageSquare size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">noweChat AI</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Wybierz rozmowę z listy, aby zacząć czatować z użytkownikami. Twoje rozmowy są chronione przez AI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
