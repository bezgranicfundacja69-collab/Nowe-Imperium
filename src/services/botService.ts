import { 
  collection, 
  getDocs, 
  query, 
  where,
  doc,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export type BotStatus = 'active' | 'paused' | 'error' | 'idle';

export interface noweBot {
  id: string;
  name: string;
  type: 'price_watcher' | 'auto_responder' | 'inventory_sync' | 'ad_optimizer' | 'lead_gen' | 'social_manager' | 'dropship_automator' | 'order_fulfillment' | 'marketplace_scout';
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
export async function getnoweBots(userId: string): Promise<noweBot[]> {
  try {
    const botsRef = collection(db, 'nowebots');
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
          name: 'nowe Social Master',
          type: 'social_manager',
          status: 'active',
          lastAction: 'Zaplanowano 5 postów na LinkedIn i Instagram',
          description: 'Multikanałowa automatyzacja social media. Publikuje treści, odpowiada na komentarze i buduje społeczność na Facebooku, Instagramie, LinkedIn i Telegramie przy użyciu AI.',
          stats: [
            { label: 'Obsłużone kanały', value: '4' },
            { label: 'Wzrost zaangażowania', value: '+124%' }
          ],
          efficiency: 91,
          uptime: '15d 8h',
          actionsCount: 2450,
          userId
        },
        {
          id: 'bot-6',
          name: 'Dropship AI Automator',
          type: 'dropship_automator',
          status: 'active',
          lastAction: 'Wygenerowano 25 nowych ofert z hurtowni X',
          description: 'Automatycznie skanuje wybrane hurtownie, pobiera zdjęcia, tłumaczy opisy za pomocą AI i wystawia produkty na marketplace z Twoją marżą.',
          stats: [
            { label: 'Pobrane produkty', value: '450' },
            { label: 'Przetłumaczone opisy', value: '100%' }
          ],
          efficiency: 95,
          uptime: '3d 12h',
          actionsCount: 890,
          userId
        },
        {
          id: 'bot-7',
          name: 'Smart Order Fulfilled',
          type: 'order_fulfillment',
          status: 'active',
          lastAction: 'Złożono zamówienie w hurtowni (Order #A-123)',
          description: 'Gdy klient kupi produkt u Ciebie, bot automatycznie zamawia go w hurtowni i wprowadza dane klienta do wysyłki. Pełny proces bez Twojej ingerencji.',
          stats: [
            { label: 'Przetworzone rano', value: '12' },
            { label: 'Średni czas realizacji', value: '5 min' }
          ],
          efficiency: 98,
          uptime: '10d 2h',
          actionsCount: 320,
          userId
        },
        {
          id: 'bot-8',
          name: 'Marketplace Scout (imperiumHunter)',
          type: 'marketplace_scout',
          status: 'active',
          lastAction: 'Znaleziono trend: Akcesoria do Grilla (+200% popytu)',
          description: 'Skanuje Amazon, eBay i Allegro w poszukiwaniu luk rynkowych i trendów o wysokiej marży. Podpowiada co warto teraz wystawić.',
          stats: [
            { label: 'Znalezione okazje', value: '18' },
            { label: 'Analizowane dane', value: '2.5 GB/d' }
          ],
          efficiency: 88,
          uptime: '20d 5h',
          actionsCount: 5400,
          userId
        }
      ];
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as noweBot[];
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'nowebots');
    return [];
  }
}

export async function toggleBotStatus(botId: string, currentStatus: BotStatus) {
  const newStatus: BotStatus = currentStatus === 'active' ? 'paused' : 'active';
  const botRef = doc(db, 'nowebots', botId);
  
  try {
    await updateDoc(botRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `nowebots/${botId}`);
    return false;
  }
}

export async function updateBotAction(botId: string, actionName: string) {
  const botRef = doc(db, 'nowebots', botId);
  try {
    await updateDoc(botRef, {
      lastAction: actionName,
      updatedAt: serverTimestamp(),
      actionsCount: serverTimestamp() // Simple increment simulation in rules/backend
    });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `nowebots/${botId}`);
    return false;
  }
}
