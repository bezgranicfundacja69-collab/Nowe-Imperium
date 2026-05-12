import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp, 
  addDoc,
  orderBy,
  limit,
  Timestamp,
  deleteDoc
} from 'firebase/firestore';

export interface UserPreference {
  userId: string;
  subscribedCategories: string[];
  minPrice: number | null;
  maxPrice: number | null;
  keywords: string[];
  updatedAt: any;
}

export interface SiteNotification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  listingId?: string;
  type: 'listing_alert' | 'system' | 'message';
  read: boolean;
  createdAt: any;
}

export async function getUserPreferences(userId: string): Promise<UserPreference | null> {
  const docRef = doc(db, 'userPreferences', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserPreference;
  }
  return null;
}

export async function saveUserPreferences(userId: string, prefs: Partial<UserPreference>) {
  const docRef = doc(db, 'userPreferences', userId);
  await setDoc(docRef, {
    ...prefs,
    userId,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

export function subscribeToNotifications(userId: string, callback: (notifs: SiteNotification[]) => void) {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(20)
  );

  return onSnapshot(q, (snapshot) => {
    const notifs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SiteNotification));
    callback(notifs);
  });
}

export async function markNotificationAsRead(notifId: string) {
  const docRef = doc(db, 'notifications', notifId);
  await updateDoc(docRef, { read: true });
}

export async function deleteNotification(notifId: string) {
  const docRef = doc(db, 'notifications', notifId);
  await deleteDoc(docRef);
}

// Logic for triggering notifications (simulated client-side for now)
export async function createNotification(userId: string, title: string, message: string, type: SiteNotification['type'], listingId?: string) {
  await addDoc(collection(db, 'notifications'), {
    userId,
    title,
    message,
    type,
    listingId: listingId || null,
    read: false,
    createdAt: serverTimestamp()
  });
}
