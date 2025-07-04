import { auth } from './firebase.js';
import { fetchGameResults } from './fetchResults.js';
import { gameConfigs } from './gameConfigs.js';
import { renderGameResults } from './renderGame.js';
import { showError } from '../utils/showError.js';

const firstVisit = localStorage.getItem('vlb_first_visit');

if (!firstVisit) {
  const banner = document.getElementById('firstTimeBanner');
  banner?.classList.remove('hidden');
  localStorage.setItem('vlb_first_visit', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBannerBtn = document.querySelector('.close-banner-btn');
  if (closeBannerBtn) {
    closeBannerBtn.addEventListener('click', () => {
      const banner = document.getElementById('firstTimeBanner');
      if (banner) banner.classList.add('hidden');
    });
  }
});


const container = document.getElementById('homePageContainer');
const status = document.getElementById('statusMessage');
// const nav = document.getElementById('subnav');

function linkButton(subscribe, login) {
  const paymentBtn = document.querySelector(".actions #subscribeBtn");
  const loginBtn = document.querySelector(".actions #loginBtn");

  if(paymentBtn) {
    paymentBtn.addEventListener("click", () => {
      window.location.href = "https://app.visuallottoboard.com/confirmation";
    })
  }

  if(loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.href = "https://app.visuallottoboard.com/";
    })
  }
}
linkButton();
// const payLink = window.location.href = "https://lottoclassificationchart.visuallottoboard.com";

// Build subnavbar (no Home link on homepage)
// gameConfigs.forEach(cfg => {
//   const link = document.createElement('a');
//   link.href = `/games/${cfg.slug}.html`;
//   link.textContent = cfg.label;
//   link.target = "_blank";
//   nav.appendChild(link);
// });


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
      status.textContent = "Loading results. Please wait...";

      const allResults = await fetchGameResults();
      console.log("🎯 All Results:", allResults);
      status.textContent = "";

      gameConfigs.forEach(cfg => {
        const data = allResults[cfg.key];
        console.log("🧩 Checking:", cfg.key, "→ Data:", data);

        if(!data) return;

        const section = document.createElement("section");
        section.classList.add('game-section');
        section.innerHTML = `<h2>${cfg.label}</h2>`;
        renderGameResults(cfg.key, data, section);
        container.appendChild(section);
      });
    } else {
        throw new Error("Session not valid");
    }
  } catch (error) {
    console.warn("Session failed:", error);
    status.innerHTML = `
      🤖 Sorry, bot access isn’t allowed.<br>
      If you're human (and lucky), <a href="https://app.visuallottoboard.com/">sign in here</a> to view results.
    `;
    container.innerHTML = "";  
  }
}

console.log("🧱 Container HTML:", container.innerHTML);




