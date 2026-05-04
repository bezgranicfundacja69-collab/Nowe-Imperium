import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ReadyMadeStore {
  id?: string;
  title: string;
  description: string;
  price: number;
  category: 'shoper' | 'shopify' | 'dropshipping' | 'saas' | 'automated';
  platform: string;
  monthlyRevenue?: number;
  monthlyProfit?: number;
  image: string;
  isVerified: boolean;
  features: string[];
  sellerId: string;
  createdAt?: any;
}

/**
 * MOCK: Pobieranie gotowych biznesów z "zintegrowanych" platform.
 * W rzeczywistości mogłoby to uderzać do API Shoper/Shopify.
 */
export async function getReadyMadeBusinesses(categoryFilter?: string) {
  try {
    const businessesRef = collection(db, 'ready_made_businesses');
    let q = query(businessesRef);
    
    if (categoryFilter) {
      q = query(businessesRef, where('category', '==', categoryFilter));
    }
    
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (data.length === 0) {
      // Jeśli pusto, wygenerujmy przykładowe (auto-generacja dla demo)
      return [
        {
          id: 'mock-1',
          title: 'Sklep Eko-Kosmetyki Shoper',
          description: 'W pełni skonfigurowany sklep na platformie Shoper z wgranymi 500 produktami od 3 dostawców. Zintegrowane płatności i kurierzy.',
          price: 4500,
          category: 'shoper',
          platform: 'Shoper',
          monthlyRevenue: 12000,
          monthlyProfit: 3500,
          image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
          isVerified: true,
          features: ['Domena .pl GRATIS', '500 produktów', 'Wsparcie 30 dni', 'Gotowe kampanie ADS'],
          sellerId: 'system'
        },
        {
          id: 'mock-shoppity-1',
          title: 'Automatyczny Sklep Shoppity: Tech & Gadgets',
          description: 'Sklep Shoppity zintegrowany z AI. Sam pobiera nowości z hurtowni i optymalizuje opisy pod SEO.',
          price: 6800,
          category: 'automated',
          platform: 'Shoppity',
          monthlyRevenue: 15000,
          monthlyProfit: 4500,
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
          isVerified: true,
          features: ['AI Product Import', 'Monthly Support', 'Shoppity License', 'Revenue Guarantee'],
          sellerId: 'system'
        },
        {
          id: 'mock-2',
          title: 'Dropshipping Sport & Fitness Shopify',
          description: 'Sklep zintegrowany z AliExpress przez DSers. Automatyczna realizacja zamówień. Zarabiasz na marży bez dotykania towaru.',
          price: 2900,
          category: 'dropshipping',
          platform: 'Shopify',
          monthlyRevenue: 8000,
          monthlyProfit: 2000,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
          isVerified: true,
          features: ['Auto-Order Sync', 'Mobile App Control', 'Brak magazynu', 'Zasięg globalny'],
          sellerId: 'system'
        },
        {
          id: 'mock-shoper-2',
          title: 'Sklep Odzieżowy Shoper: Premium Fashion',
          description: 'Gotowy biznes z towarem w magazynie (fufillment). Marka z dużym potencjałem na Social Media.',
          price: 12000,
          category: 'shoper',
          platform: 'Shoper',
          monthlyRevenue: 25000,
          monthlyProfit: 7000,
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
          isVerified: true,
          features: ['Magazyn Zintegrowany', 'Baza 5k Klientów', 'Instrukcje Operacyjne', '3 m-ce Mentoringu'],
          sellerId: 'system'
        }
      ];
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching ready made businesses:", error);
    return [];
  }
}

/**
 * Automatyczne "wystawienie" sklepu na sprzedaż
 */
export async function createReadyMadeBusinessEntry(store: ReadyMadeStore) {
  try {
    const businessesRef = collection(db, 'ready_made_businesses');
    const docRef = await addDoc(businessesRef, {
      ...store,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating business entry:", error);
    throw error;
  }
}
