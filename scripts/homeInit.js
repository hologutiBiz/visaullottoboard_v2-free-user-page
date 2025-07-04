import { fetchGameResults } from './fetchResults.js';
import { gameConfigs } from './gameConfigs.js';
import { renderGameResults } from './renderGame.js';
import { showError } from '../utils/showError.js';

const container = document.getElementById('homePageContainer');
const status = document.getElementById('statusMessage');

// 🎉 First-time visitor banner
if (!localStorage.getItem('vlb_first_visit')) {
  document.getElementById('firstTimeBanner')?.classList.remove('hidden');
  localStorage.setItem('vlb_first_visit', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.close-banner-btn')?.addEventListener('click', () => {
    document.getElementById('firstTimeBanner')?.classList.add('hidden');
  });
});

// 📬 Link buttons
function linkButton() {
  document.querySelector("#subscribeBtn")?.addEventListener("click", () => {
    window.location.href = "https://app.visuallottoboard.com/confirmation";
  });

  document.querySelector("#loginBtn")?.addEventListener("click", () => {
    window.location.href = "https://app.visuallottoboard.com/";
  });
}
linkButton();

// 🔄 Load results directly (no session validation)
loadResults();

async function loadResults() {
  try {
    status.textContent = '🔄 Loading latest lotto results...';

    const allResults = await fetchGameResults();

    if (!allResults || Object.keys(allResults).length === 0) {
      showError("⚠️ No results available at the moment. Please check back soon.");
      return;
    }

    gameConfigs.forEach(cfg => {
      const data = allResults[cfg.key];
      if (!data) return;

      const section = document.createElement('section');
      section.classList.add('game-section');
      section.innerHTML = `<h2>${cfg.label}</h2>`;
      renderGameResults(cfg.key, data, section);
      container.appendChild(section);
    });

    status.textContent = '';
  } catch (err) {
    console.error("Fetch error:", err);
    const banner = document.getElementById('firstTimeBanner');
    const subnav = document.getElementById('subnav');

    if (!navigator.onLine) {
      status.innerHTML = "📡 No internet connection detected.";
    } else if (err.message.includes("403")) {
      status.innerHTML = "🔒 Access to results is restricted. Try visiting from an approved page.";
    } else {
      status.innerHTML = "⚠️ Couldn’t load results due to a network or server issue.";
    }

    container.innerHTML = "";
    if (banner) banner.style.display = "none";
    if (subnav) subnav.style.display = "none";
  }
}
