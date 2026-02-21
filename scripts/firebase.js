// Your Firebase config
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, doc, getDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

let app = null;
let db = null;

// Promise that resolves when Firestore is ready
export const dbReady = fetch("https://firebase-config-key.netlify.app/.netlify/functions/htmlProject")
    .then(res => res.json())
    .then(config => {
        app = initializeApp(config);
        db = getFirestore(app);
        return db;
    })
    .catch(err => {
      console.error("🔥 Failed to fetch Firebase config:", err.message || err);
      throw err;
    });

// Usage: await dbReady; then call getDb()
export function getDb() {
    if (!db) throw new Error("Firestore has not been initialized yet.");
    return db;
}

export async function getLastUpdateInfo() {
    try {
        await dbReady;
        const ref = doc(getDb(), "messages", "lottoResultUpdates");
        const snapshot = await getDoc(ref);
        const { dateUpdated, description, note, updatedBy } = snapshot.data();
        return { dateUpdated, description, note, updatedBy };
    } catch (err) {
        console.error("🔥 Failed to fetch Firestore document:", err.message || err);
        return null;
    }
}



// export async function fetchFrequentNumbers() {
//   try {
//     await dbReady;
//     const colRef = collection(getDb(), "frequentNumbers");
//     const snapshot = await getDocs(colRef);
//     return snapshot;
//   } catch (err) {
//     console.error("🔥 Failed to fetch frequentNumbers:", err.message || err);
//     return null;
//   }
// }




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


