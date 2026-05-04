import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  doc, 
  increment,
  getDoc,
  setDoc
} from 'firebase/firestore';

/**
 * MOCK: Automatyczny Dropshipping
 * Importuje produkty z zewnętrznych API (symulacja) i wstawia je do bazy
 */
export async function autoImportProducts(category: string, userId: string) {
  const listingsRef = collection(db, 'listings');
  
  // Symulacja importu 3 produktów
  const products = [
    {
      title: `[AUTO-DROPSHIP] Nowoczesny ${category} v1`,
      description: `Wysokiej jakości produkt z kategorii ${category}. Automatyczny import.`,
      price: Math.floor(Math.random() * 1000) + 100,
      category: category,
      type: 'product',
      sellerId: userId,
      status: 'active',
      image: `https://picsum.photos/seed/${Math.random()}/800/600`,
      createdAt: serverTimestamp()
    },
    {
      title: `[AUTO-DROPSHIP] ${category} Premium Edition`,
      description: `Ekskluzywna oferta ${category}. Najlepsza jakość na rynku.`,
      price: Math.floor(Math.random() * 2000) + 500,
      category: category,
      type: 'product',
      sellerId: userId,
      status: 'active',
      image: `https://picsum.photos/seed/${Math.random()}/800/600`,
      createdAt: serverTimestamp()
    }
  ];

  for (const product of products) {
    await addDoc(listingsRef, product);
  }
  
  return true;
}

/**
 * MOCK: Automatyczny Faktoring
 * Pozwala użytkownikowi natychmiastowo spieniężyć należności (z prowizją)
 */
export async function processFactoring(userId: string, amount: number) {
  const fee = amount * 0.05; // 5% prowizji za natychmiastową gotówkę
  const netAmount = amount - fee;
  
  const walletRef = doc(db, 'wallets', userId);
  const walletDoc = await getDoc(walletRef);
  
  if (!walletDoc.exists()) {
    await setDoc(walletRef, { balance: netAmount });
  } else {
    await updateDoc(walletRef, {
      balance: increment(netAmount)
    });
  }
  
  // Log transakcji
  await addDoc(collection(db, 'transactions'), {
    userId,
    type: 'factoring',
    amount: netAmount,
    fee: fee,
    status: 'completed',
    createdAt: serverTimestamp()
  });

  return netAmount;
}

/**
 * MOCK: Automatyczne Rozliczanie Prowizyjne
 * Integracja z partnerami - sprzedaż za procent
 */
export async function processPartnerSale(userId: string, saleAmount: number, partnerId: string) {
  const partnerCommission = saleAmount * 0.10; // 10% dla partnera
  const userProfit = saleAmount - partnerCommission;

  // Aktualizacja portfela użytkownika
  const walletRef = doc(db, 'wallets', userId);
  await updateDoc(walletRef, {
    balance: increment(userProfit)
  });

  // Aktualizacja portfela partnera
  const partnerWalletRef = doc(db, 'wallets', partnerId);
  const partnerSnap = await getDoc(partnerWalletRef);
  if (partnerSnap.exists()) {
    await updateDoc(partnerWalletRef, {
      balance: increment(partnerCommission)
    });
  } else {
    await setDoc(partnerWalletRef, { balance: partnerCommission });
  }

  return { userProfit, partnerCommission };
}

/**
 * MOCK: Automatyczne Kursy Biznesu
 * Dodawanie kursów edukacyjnych do konta użytkownika (AI Academy)
 */
export async function enrollInAutoCourse(userId: string, courseId: string) {
  const userCourseRef = doc(db, `users/${userId}/courses`, courseId);
  await setDoc(userCourseRef, {
    enrolledAt: serverTimestamp(),
    progress: 0,
    status: 'in-progress'
  });
  return true;
}
