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

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    // status.textContent = 'Not signed in. Please refresh.';
    status.innerHTML = `
      🤖 Sorry, bot access isn’t allowed.<br>
      If you're human (and lucky), <a href="https://app.visuallottoboard.com/">sign in here</a> to unlock your game results.
    `;
    container.innerHTML = "";
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
      if (err.message === "net::ERR_INTERNET_DISCONNECTED") {
        // document.getElementById("statusMessage").textContent = `${showError()}`
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

