import { 
  collection, 
  getDocs, 
  query, 
  where,
  doc,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export type BotStatus = 'active' | 'paused' | 'error' | 'idle';

export interface OmniBot {
  id: string;
  name: string;
  type: 'price_watcher' | 'auto_responder' | 'inventory_sync' | 'ad_optimizer' | 'lead_gen' | 'social_manager';
  status: BotStatus;
  lastAction: string;
  description: string;
  stats: { label: string, value: string }[];
  efficiency: number; // 0-100
  uptime: string;
  actionsCount: number;
  userId: string;
}

/**
 * Pobiera boty przypisane do użytkownika.
 * Jeśli pusto, zwraca zestaw startowych botów (MOCK dla demo).
 */
export async function getOmniBots(userId: string): Promise<OmniBot[]> {
  try {
    const botsRef = collection(db, 'omnibots');
    const q = query(botsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      // Mock data for new users or demo
      return [
        {
          id: 'bot-1',
          name: 'SmartPrice Watcher',
          type: 'price_watcher',
          status: 'active',
          lastAction: 'Zaktualizowano cenę: Laptop X o -5%',
          description: 'Monitoruje ceny konkurencji na 15 platformach i automatycznie dostosowuje Twoją ofertę, aby zachować maksymalną marżę przy najwyższej konwersji.',
          stats: [
            { label: 'Uratowane zamówienia', value: '45' },
            { label: 'Oszczędność czasu', value: '24h/mc' }
          ],
          efficiency: 94,
          uptime: '12d 4h',
          actionsCount: 1240,
          userId
        },
        {
          id: 'bot-2',
          name: 'Instant Responder',
          type: 'auto_responder',
          status: 'active',
          lastAction: 'Odpowiedziano na 12 zapytań o dostępność',
          description: 'Wykorzystuje GPT-4 do natychmiastowego odpowiadania na pytania klientów na Allegro i OLX. Zamienia zapytania w sprzedaż w mniej niż 2 minuty.',
          stats: [
            { label: 'Zasięg postów', value: '12k+' },
            { label: 'Średni CTR', value: '14.2%' }
          ],
          efficiency: 99,
          uptime: '45d 2h',
          actionsCount: 8520,
          userId
        },
        {
          id: 'bot-3',
          name: 'Global Inventory Sync',
          type: 'inventory_sync',
          status: 'idle',
          lastAction: 'Synchronizacja zakończona (Shopify)',
          description: 'Utrzymuje stany magazynowe w idealnej synchronizacji między Twoim magazynem a wszystkimi kanałami sprzedaży. Eliminuje błędy "out-of-stock".',
          stats: [
            { label: 'Wystawione ogółem', value: '1250' },
            { label: 'Błędy walidacji', value: '0.2%' }
          ],
          efficiency: 100,
          uptime: '30d 12h',
          actionsCount: 450,
          userId
        },
        {
          id: 'bot-4',
          name: 'AI Ad Architect',
          type: 'ad_optimizer',
          status: 'paused',
          lastAction: 'Wstrzymano kampanię o niskim ROI',
          description: 'Analizuje wydajność Twoich reklam w Google i Meta. Automatycznie przesunięcie budżetu na najlepiej konwertujące słowa kluczowe i grupy odbiorców.',
          stats: [
            { label: 'ROI Średni', value: '450%' },
            { label: 'Koszt kliknięcia', value: '0.12 zł' }
          ],
          efficiency: 82,
          uptime: '5d 1h',
          actionsCount: 124,
          userId
        },
        {
          id: 'bot-5',
          name: 'Omni Social Master',
          type: 'social_manager',
          status: 'active',
          lastAction: 'Zaplanowano 5 postów na LinkedIn i Instagram',
          description: 'Multikanałowa automatyzacja social media. Publikuje treści, odpowiada na komentarze i buduje społeczność na Facebooku, Instagramie, LinkedIn i Telegramie.',
          stats: [
            { label: 'Obsłużone kanały', value: '4' },
            { label: 'Wzrost zaangażowania', value: '+124%' }
          ],
          efficiency: 91,
          uptime: '15d 8h',
          actionsCount: 2450,
          userId
        }
      ];
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as OmniBot[];
  } catch (error) {
    console.error("Error fetching OmniBots:", error);
    return [];
  }
}

export async function toggleBotStatus(botId: string, currentStatus: BotStatus) {
  const newStatus: BotStatus = currentStatus === 'active' ? 'paused' : 'active';
  const botRef = doc(db, 'omnibots', botId);
  
  try {
    await updateDoc(botRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error toggling bot status:", error);
    return false;
  }
}
