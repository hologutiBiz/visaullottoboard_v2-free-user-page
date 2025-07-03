// Your Firebase config
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyAe8IWoN0f4hhuzxvQ3aTSGKOzzDVuuvIk",
  authDomain: "lotto-forecast-web-db.firebaseapp.com",
  projectId: "lotto-forecast-web-db"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
window.auth = auth;

// Enable persistent login
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistent login is active");
  })
  .catch((error) => {
    console.error('Persistence setup failed:', error);
  });


// Optional: Track state (if needed in frontend logic)
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('✅ Auth ready – UID:', user.uid);
  } else {
    console.log('🚫 No authenticated session found');
  }
});


