import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment, arrayUnion, serverTimestamp } from 'firebase/firestore';

export async function addTransaction(userId: string, amount: number, title: string) {
  const walletRef = doc(db, 'wallets', userId);
  
  try {
    const walletDoc = await getDoc(walletRef);

    const transaction = {
      title,
      amount,
      date: new Date().toLocaleString('pl-PL'),
      isPositive: amount >= 0,
      timestamp: Date.now()
    };

    if (!walletDoc.exists()) {
      await setDoc(walletRef, {
        balance: amount,
        transactions: [transaction],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      await updateDoc(walletRef, {
        balance: increment(amount),
        transactions: arrayUnion(transaction),
        updatedAt: serverTimestamp()
      });
    }
    return true;
  } catch (error) {
    console.error("Error adding transaction:", error);
    return false;
  }
}
