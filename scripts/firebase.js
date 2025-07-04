// Your Firebase config
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getLastUpdateInfo() {
   try {
      const ref = doc(db, "messages", "lottoResultUpdates");
      const snapshot = await getDoc(ref);
      
      if (snapshot.exists()) {
         return snapshot.data();
      } else {
        console.warn("ℹ️ No update document found");
         return null; 
      }
   } catch (err) {
      console.error("🔥 Failed to fetch Firestore document:", err);
      return null;
   }
}



  
// const firebaseConfig = {
//   apiKey: "AIzaSyAe8IWoN0f4hhuzxvQ3aTSGKOzzDVuuvIk",
//   authDomain: "lotto-forecast-web-db.firebaseapp.com",
//   projectId: "lotto-forecast-web-db"
// }

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// window.auth = auth;

// Enable persistent login
// setPersistence(auth, browserLocalPersistence)
//   .then(() => {
//     console.log("Persistent login is active");
//   })
//   .catch((error) => {
//     console.error('Persistence setup failed:', error);
//   });


// Optional: Track state (if needed in frontend logic)
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log('✅ Auth ready – UID:', user.uid);
//   } else {
//     console.log('🚫 No authenticated session found');
//   }
// });


