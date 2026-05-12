import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { OperationType, handleFirestoreError } from '../lib/firestore-errors';

export interface CreditProfile {
  userId: string;
  creditLimit: number;
  availableCredit: number;
  creditScore: number;
  updatedAt: any;
}

export interface LoanApplication {
  id?: string;
  userId: string;
  amount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed';
  loanType: string;
  createdAt: any;
  updatedAt?: any;
}

export async function getCreditProfile(userId: string): Promise<CreditProfile | null> {
  const docRef = doc(db, 'creditProfiles', userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as CreditProfile;
    }
    // Initialize profile if not exists (Mock behavior for this app)
    const initialProfile: CreditProfile = {
      userId,
      creditLimit: 5000,
      availableCredit: 5000,
      creditScore: 720,
      updatedAt: serverTimestamp()
    };
    await setDoc(docRef, initialProfile);
    return initialProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `creditProfiles/${userId}`);
    return null;
  }
}

export async function applyForLoan(userId: string, amount: number, purpose: string, loanType: string) {
  const loanData: Omit<LoanApplication, 'id'> = {
    userId,
    amount,
    purpose,
    status: 'pending',
    loanType,
    createdAt: serverTimestamp()
  };
  
  try {
    const docRef = await addDoc(collection(db, 'loanApplications'), loanData);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'loanApplications');
    return null;
  }
}

export async function getUserLoans(userId: string): Promise<LoanApplication[]> {
  const q = query(collection(db, 'loanApplications'), where('userId', '==', userId));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LoanApplication));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'loanApplications');
    return [];
  }
}

export async function cancelLoanApplication(loanId: string) {
  const docRef = doc(db, 'loanApplications', loanId);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `loanApplications/${loanId}`);
    return false;
  }
}
