import { fetchGameResults } from './fetchResults.js';
import { gameConfigs } from './gameConfigs.js';
import { renderGameResults } from './renderGame.js';
import { showError } from '../utils/showError.js';

const container = document.getElementById('homePageContainer');
const status = document.getElementById('statusMessage');

// 🎉 First visit logic
const firstVisit = localStorage.getItem('vlb_first_visit');
if (!firstVisit) {
  document.getElementById('firstTimeBanner')?.classList.remove('hidden');
  localStorage.setItem('vlb_first_visit', 'true');
}

// ❌ Close banner
document.addEventListener('DOMContentLoaded', () => {
  const closeBannerBtn = document.querySelector('.close-banner-btn');
  closeBannerBtn?.addEventListener('click', () => {
    document.getElementById('firstTimeBanner')?.classList.add('hidden');
  });
});

// 🔗 Subscribe & Login buttons
function linkButton() {
  document.querySelector("#subscribeBtn")?.addEventListener("click", () => {
    window.location.href = "https://app.visuallottoboard.com/confirmation";
  });

  document.querySelector("#loginBtn")?.addEventListener("click", () => {
    window.location.href = "https://app.visuallottoboard.com/";
  });
}
linkButton();

// 🧠 Step 1: Verify session
verifySession();

async function verifySession() {
  try {
    const response = await fetch("https://auth.visuallottoboard.com/verifySession", {
      method: "GET",
      credentials: "include"
    });

    if (response.status === 200) {
      const user = await response.json();
      console.log("✅ Session verified:", user);
      status.textContent = '✅ You are verified. Loading results...';
      await loadResults();
    } else {
      throw new Error("Not verified");
    }
  } catch (err) {
    console.warn("Session check failed:", err);
    showError("🤖 Sorry, bot access isn’t allowed.<br>If you're human, <a href='https://app.visuallottoboard.com'>sign in here</a> to unlock your game results.");
    container.innerHTML = "";
  }
}

// 🧩 Step 2: Fetch and render results
async function loadResults() {
  try {
    const allResults = await fetchGameResults();

    if (!allResults || Object.keys(allResults).length === 0) {
      showError("⚠️ No results found. Server may be temporarily offline.");
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
    console.error("Failed to load results:", err);
    showError("🚧 We couldn't load the game results due to a server issue or network error. Please try again later.");

    console.warn("Session error:", err);

  const subnav = document.getElementById('subnav');
  const status = document.getElementById('statusMessage');

  // Detect network or server fetch failure
  if (err.message.includes("Failed to fetch") || err.message.includes("CORS")) {
    status.innerHTML = `
      ⚠️ We’re having trouble connecting to the server.<br>
      This is likely a technical issue on our end.<br>
      Please try again shortly. Alternatively, use the <b>Report<b/> to inform us about this.
    `;
    container.innerHTML = "";
    if (subnav) subnav.style.display = "none";
    return;
  }

  // Fallback for actual session failure
  status.innerHTML = `
    🤖 Sorry, bot access isn’t allowed.<br>
    If you're human, <a href='https://app.visuallottoboard.com'>sign in here</a> to unlock your game results.
  `;
  container.innerHTML = "";
  if (subnav) subnav.style.display = "none";
  }
}

console.log("🧱 Container HTML:", container.innerHTML);




