import { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { toast } from 'sonner';

export function NotificationService() {
  const { user } = useAuth();
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'loanApplications'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (initialLoadRef.current) {
        initialLoadRef.current = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const loanData = change.doc.data();
          const prevStatus = change.doc.data().status; // This is actually the new status from data()
          // To get previous state correctly with docChanges, we just look at the new data
          // and maybe track it locally, but usually docChanges for 'modified' is enough 
          // if we want to alert "Status changed".
          
          let message = '';
          const status = loanData.status;

          switch (status) {
            case 'approved':
              message = `✅ Twój wniosek o pożyczkę (${loanData.loanType}) został ZATWIERDZONY!`;
              break;
            case 'rejected':
              message = `❌ Twój wniosek o pożyczkę (${loanData.loanType}) został ODRZUCONY.`;
              break;
            case 'disbursed':
              message = `💰 Środki z Twojej pożyczki (${loanData.loanType}) zostały WYPŁACONE na portfel!`;
              break;
            default:
              return;
          }

          if (message) {
            toast.info('Zmiana statusu wniosku', {
              description: message,
              duration: 10000,
            });
          }
        }
      });
    }, (error) => {
      console.error("Notification listener error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  return null;
}
