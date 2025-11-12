import { fetchGameResults } from './fetchResults.js';
import { gameConfigs } from './gameConfigs.js';
import { renderGameResults } from './renderGame.js';
import { getLastUpdateInfo, dbReady } from './firebase.js';
import { showError } from '../utils/showError.js';

// const subnav = document.getElementById('subnav');
const container = document.getElementById('homePageContainer');
const status = document.getElementById('statusMessage');

document.addEventListener("DOMContentLoaded", async () => {
  await dbReady;
  const info = await getLastUpdateInfo();
  const infoContainer = document.getElementById("infoContainer");


  if (info && infoContainer) {
    const date = info.dateUpdated.toDate();
    const formatted = date.toLocaleString("en-GB", {
      day: "numeric", 
      month: "long", 
      year: "numeric",
      hour: "2-digit", 
      minute: "2-digit"
    });

    infoContainer.innerHTML = `
      <small>📝 ${info.description}: </small>
      <time>${formatted}</time>
     `;
    } else {
        console.warn("🚫 UpdateInfo render failed.");
    }
});
 

// 📬 Link buttons
function linkButton() {
  document.querySelector("#subscribeBtn")?.addEventListener("click", () => {
    window.location.href = "https://app.visuallottoboard.com/subscription";
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
    // if (subnav) subnav.style.display = "none";

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

      const gameName = document.createElement("span");
      gameName.textContent = `${cfg.label}`;
    });



    status.textContent = '';
  } catch (err) {
    console.error("Fetch error:", err);
    // const subnav = document.getElementById('subnav');

    if (!navigator.onLine) {
      status.innerHTML = "📡 No internet connection detected.";
    } else if (err.message.includes("403")) {
      status.innerHTML = "🔒 Access to results is restricted. Try visiting from an approved page.";
    } else {
      status.innerHTML = "⚠️ Couldn’t load results due to a network or server issue.";
    }

    container.innerHTML = "";
    // if (subnav) subnav.style.display = "none";
  }
}
