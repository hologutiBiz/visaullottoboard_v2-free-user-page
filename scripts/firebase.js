// Your Firebase config
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const db = getFirestore();
const ref = doc(db, "messages", "lottoResultUpdates");

const snapshot = await getDoc(ref);
if (snapshot.exists()) {
   const data = snapshot.data();

   const date = data.lastUpdated.toDate();
   const formatted = date.toLocaleString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit"
   });

   document.getElementById("updateInfo").innerHTML = `
      <small><strong>📝 ${data.description}</strong></small> <strong>
      <time datetime= "${formatted.year}-${formatted.month}-${formatted.day}"><strong>📅 ${formatted}</strong></small>
   `;
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


