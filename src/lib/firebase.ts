import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test connection strictly as per guidelines
async function testConnection() {
  try {
    const docRef = doc(db, '_connection_test_', 'ping');
    await getDocFromServer(docRef);
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
    // Expected to error if document doesn't exist, but we just want to wake up the SDK
  }
}
testConnection();
