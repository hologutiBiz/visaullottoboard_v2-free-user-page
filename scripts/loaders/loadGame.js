import { fetchGameResults } from '../fetchResults.js';
import { gameConfigs } from '../gameConfigs.js';
import { renderGameResults } from '../renderGame.js';
import { showError } from '../../utils/showError.js';

const container = document.getElementById('gameContainer');
const status = document.getElementById('statusMessage');
const nav = document.getElementById('subnav');

// 🧠 Detect game from URL
const slug = window.location.pathname.split('/').pop().replace('.html', '');
const config = gameConfigs.find(cfg => cfg.slug === slug);

if (!config) {
  container.innerHTML = `<p>Unknown game: ${slug}</p>`;
  throw new Error(`No config found for slug "${slug}"`);
}

// 🔗 Build subnavbar with all games
gameConfigs.forEach(cfg => {
  const link = document.createElement('a');
  link.href = `/games/${cfg.slug}.html`;
  link.textContent = cfg.label;
  if (cfg.slug === slug) link.classList.add('active');
  nav.appendChild(link);
});

// 🔐 Start session verification
verifySession();

async function verifySession() {
  try {
    const response = await fetch("https://auth.visuallottoboard.com/verifySession", {
      method: "GET",
      credentials: "include"
    });

    if (response.status === 200) {
      const user = await response.json();
      console.log("✅ Verified:", user);
      status.textContent = `Loading ${config.label} results...`;

      await loadSingleGame();
    } else {
      throw new Error("Session invalid");
    }
  } catch (err) {
    console.warn("Session verification error:", err);
    status.innerHTML = `
      🔐 You must be signed in to view ${config.label} results.<br>
      <a href="https://app.visuallottoboard.com/">Click here to sign up or log in</a>
    `;
    container.innerHTML = '';
  }
}

async function loadSingleGame() {
  try {
    const allResults = await fetchGameResults();
    const data = allResults[config.key];

    if (!data) {
      container.innerHTML = `<p>No ${config.label} data found.</p>`;
      return;
    }

    renderGameResults(config.key, data, container);
    status.textContent = '';
  } catch (err) {
    console.error("Fetch error:", err);
    showError(`Unable to load ${config.label} results due to a network or server issue.`);
  }
}

// 📬 Subscribe & Login buttons
function linkButton() {
  document.querySelector("#subscribeBtn")?.addEventListener("click", () => {
    window.location.href = "https://app.visuallottoboard.com/confirmation";
  });

  document.querySelector("#loginBtn")?.addEventListener("click", () => {
    window.location.href = "https://app.visuallottoboard.com/";
  });
}
linkButton();
