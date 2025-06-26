import { auth } from './firebase.js';

export async function fetchGameResults() {
  const user = auth.currentUser;
  const token = await user.getIdToken();

  const res = await fetch('https://visual-lotto-board-results-file.netlify.app/.netlify/functions/getResults', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  // Optional: check for HTTP error
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
