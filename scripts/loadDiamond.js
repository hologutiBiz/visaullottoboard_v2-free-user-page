import { fetchGameResults } from './getResults.js';
import { renderGameResults } from './renderGame.js';

(async function () {
  const container = document.getElementById('gameContainer');

  try {
    const allResults = await fetchGameResults();
    const diamondResults = allResults["diamond"];

    if (!diamondResults) {
      container.innerHTML = '<p>No Diamond data found.</p>';
      return;
    }

    renderGameResults("diamond", diamondResults, container);
  } catch (err) {
    container.innerHTML = '<p>Error loading results.</p>';
    console.error('Diamond error:', err.message);
  }
})();
