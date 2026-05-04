import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface Review {
  id?: string;
  reviewerId: string;
  reviewerName: string;
  targetId: string;
  targetType: 'listing' | 'user';
  rating: number;
  comment: string;
  createdAt?: any;
}

/**
 * Dodaje nową opinię
 */
export async function addReview(review: Omit<Review, 'id' | 'createdAt'>) {
  const path = review.targetType === 'listing' 
    ? `listings/${review.targetId}/reviews` 
    : `users/${review.targetId}/reviews`;
    
  try {
    const colRef = collection(db, path);
    const docRef = await addDoc(colRef, {
      ...review,
      createdAt: serverTimestamp()
    });
    
    // Opcjonalnie: Aktualizacja średniej oceny celu (listing/user)
    // W rzeczywistym systemie lepiej robić to przez Cloud Functions, 
    // tutaj możemy spróbować zaktualizować pole w dokumencie celu.
    await updateAverageRating(review.targetId, review.targetType);
    
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Pobiera opinie dla danego celu
 */
export async function getReviews(targetId: string, targetType: 'listing' | 'user') {
  const path = targetType === 'listing' 
    ? `listings/${targetId}/reviews` 
    : `users/${targetId}/reviews`;
    
  try {
    const colRef = collection(db, path);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Review[];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

/**
 * Oblicza i aktualizuje średnią ocenę
 */
async function updateAverageRating(targetId: string, targetType: 'listing' | 'user') {
  const path = targetType === 'listing' 
    ? `listings/${targetId}/reviews` 
    : `users/${targetId}/reviews`;
    
  try {
    const reviews = await getReviews(targetId, targetType);
    if (reviews.length === 0) return;
    
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const average = sum / reviews.length;
    
    const targetDocPath = targetType === 'listing' ? `listings/${targetId}` : `users/${targetId}`;
    const targetRef = doc(db, targetDocPath);
    
    try {
      await updateDoc(targetRef, {
        averageRating: average,
        reviewCount: reviews.length
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, targetDocPath);
    }
  } catch (error) {
    console.warn("Error calculating average rating:", error);
  }
}
