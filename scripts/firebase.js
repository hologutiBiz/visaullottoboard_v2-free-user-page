// Your Firebase config
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: ""
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Sign in silently
signInAnonymously(auth)
  .then(() => console.log('🔓 Anonymous user signed in'))
  .catch((error) => console.error('Anonymous login failed:', error));

// Optional: Track state (if needed in frontend logic)
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('✅ Auth ready – UID:', user.uid);
  }
});