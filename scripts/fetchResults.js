import { auth } from './firebase.js';

export async function fetchGameResults() {
  let token = null;

  try {
    const user = auth.currentUser;
    if (user) {
      token = await user.getIdToken();
    }
  } catch (err) {
    console.warn("⚠️ Firebase user not available, falling back to session cookie.");
  }

  const res = await fetch('https://visual-lotto-board-results-file.netlify.app/.netlify/functions/getResults', {
    method: "GET",
    credentials: "include", // ✅ send cookies if available
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }

  const data = await res.json();

  if (!data) {
    const message = document.createElement('p');
    message.textContent = 'Lotto results couldn’t load. Check your connection or try again shortly.';
    document.getElementById('gamesContainer')?.appendChild(message);
  }

  return data;
}
