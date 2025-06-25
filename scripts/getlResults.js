import { auth } from './firebase.js';

const NETLIFY_FUNCTION_URL = 'https://visual-lotto-board-results-file.netlify.app/.netlify/functions/getResults';

export async function fetchGameResults() {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not signed in');
    }

    const idToken = await user.getIdToken();

    const response = await fetch(NETLIFY_FUNCTION_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const results = await response.json();
    return results;
  } catch (err) {
    console.error('Error fetching lotto results:', err.message);
    return null;
  }
}
