import { auth } from '../firebase.js';
import { fetchGameResults } from '../fetchResults.js';
import { gameConfigs } from '../gameConfigs.js';
import { renderGameResults } from '../renderGame.js';
import { showError } from '../../utils/showError.js';


const container = document.getElementById('gameContainer');
const status = document.getElementById('statusMessage');
const nav = document.getElementById('subnav');

// 🧠 Detect game from filename (e.g. "1diamond")
const slug = window.location.pathname.split('/').pop().replace('.html', '');
const config = gameConfigs.find(cfg => cfg.slug === slug);

if (!config) {
  container.innerHTML = `<p>Unknown game: ${slug}</p>`;
  throw new Error(`No config found for slug "${slug}"`);
}

// 🔗 Build subnavbar with home + all games
const homeLink = document.createElement('a');
homeLink.href = '/';
homeLink.setAttribute = "target_blank";
homeLink.textContent = '🏠 Home';
nav.appendChild(homeLink);

gameConfigs.forEach(cfg => {
  const link = document.createElement('a');
  link.href = `/games/${cfg.slug}.html`;
  link.textContent = cfg.label;
  if (cfg.slug === slug) link.classList.add('active');
  nav.appendChild(link);
});

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    status.textContent = 'Not signed in.';
    return;
  }

  try {
    status.textContent = `Loading ${config.label} results...`;
    const allResults = await fetchGameResults();
    status.textContent = '';

    const data = allResults[config.key];
    if (!data) {
      container.innerHTML = `<p>No ${config.label} data found.</p>`;
      return;
    }

    renderGameResults(config.key, data, container);
  } catch (err) {
      if (!navigator.onLine) {
        showError('No internet connection. Please check your network.');
      } else if (err.message.includes('missing') || err.message.includes('API')) {
        showError('Server error: Missing configuration. <a href="#" id="errorReportLink">[Report this error]</a>');
      } else if (err.message.includes('fetchGameResults') || err.message.includes('endpoint')) {
        showError('Server error: Unable to fetch results. <a href="#" id="errorReportLink">[Report this error]</a>');
      } else {
        showError('Something went wrong. <a href="#" id="errorReportLink">[Report this error]</a>');
      }
  }
});
