import { fetchFrequentNumbers } from "./firebase.js";

document.addEventListener("DOMContentLoaded", async () => {
  const gameSection = document.getElementById("gameSection");
  const gameList = [];

  const snapshot = await fetchFrequentNumbers();
  if (!snapshot) {
    gameSection.innerHTML = `<p>🚫 Could not load frequent numbers. Try again later.</p>`;
    return;
  }

  snapshot.forEach((doc) => {
    const gameName = doc.id;
    const topNumbers = doc.data().topNumbers;
    const safeId = gameName.toLowerCase().replace(/\s+/g, "-");

    gameList.push({ name: gameName, id: `game-${safeId}` });

    const section = document.createElement("div");
    section.classList.add("game-section");
    section.id = `game-${safeId}`;
    section.innerHTML = `
      <h2>${gameName}</h2>
      <ul>
        ${topNumbers.map((num) => `<li>${num}</li>`).join("")}
      </ul>
    `;
    gameSection.appendChild(section);
  });

  // 🔍 Search behavior
  document.getElementById("gameSearch").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const match = gameList.find((game) => game.name.toLowerCase().includes(query));

    if (match) {
      const target = document.getElementById(match.id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        target.style.border = "2px solid #0077cc";
        setTimeout(() => (target.style.border = "none"), 1500);
      }
    }
  });
});
