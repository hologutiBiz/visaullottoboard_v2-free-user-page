// Your Firebase config
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, doc, getDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

fetch("https://firebase-config-key.netlify.app/.netlify/functions/htmlProject")
   .then(res => res.json())
   .then(config => {
      firebase.initializeApp(config);
   });

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getLastUpdateInfo() {
   const ref = doc(db, "messages", "lottoResultUpdates");

   try {
      const snapshot = await getDoc(ref);
      const { dateUpdated, description, note, updatedBy } = snapshot.data();
      
      return { dateUpdated, description, note, updatedBy };
   } catch (err) {
      console.error("🔥 Failed to fetch Firestore document:", err.message || err);
      return null;
   }
}

export async function fetchFrequentNumbers() {
   const colRef = collection(db, "frequentNumbers");
   
   try {
      const snapshot = await getDocs(colRef); 
      return snapshot;
   } catch (err) {
      console.error("🔥 Failed to fetch frequentNumbers:", err.message || err)
      return null;
   };
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


