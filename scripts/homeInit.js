import { auth } from './firebase.js';
import { fetchGameResults } from './fetchResults.js';
import { gameConfigs } from './gameConfigs.js';
import { renderGameResults } from './renderGame.js';

const container = document.getElementById('homePageContainer');
const status = document.getElementById('statusMessage');
const nav = document.getElementById('subnav');

// Build subnavbar (no Home link on homepage)
gameConfigs.forEach(cfg => {
  const link = document.createElement('a');
  link.href = `/games/${cfg.slug}.html`;
  link.textContent = cfg.label;
  link.target = "_blank";
  nav.appendChild(link);
});

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    status.textContent = 'Not signed in. Please refresh.';
    return;
  }

  try {
    status.textContent = 'Loading results. Please wait...';
    const allResults = await fetchGameResults();
    status.textContent = '';

    gameConfigs.forEach(cfg => {
      const data = allResults[cfg.key];
      if (!data) return;

      const section = document.createElement('section');
      section.classList.add('game-section');
      section.innerHTML = `<h2>${cfg.label}</h2>`;
      renderGameResults(cfg.key, data, section);
      container.appendChild(section);
    });
  } catch (err) {
    console.error('Home error:', err.message);
    status.textContent = 'Unable to load results. Please check your internet connection.';
  }
});
