export async function fetchGameResults() {
  try {
    const res = await fetch('https://visual-lotto-board-results-file.netlify.app/.netlify/functions/getResults', {
      method: "GET",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // Detect network-level issue (res undefined or failed fetch)
    if (!res) {
      throw new Error("Network failure");
    }

    // Detect server-side error
    if (!res.ok) {
      if (res.status === 403) {
        throw new Error("Access denied");
      } else if (res.status === 404) {
        throw new Error("Results not found");
      } else {
        throw new Error(`Server error: ${res.status}`);
      }
    }

    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      displayErrorMessage("No results available at this time.");
    }

    return data;

  } catch (err) {
    // 🧠 Intelligent error messaging
    let message = "An unknown error occurred.";

    if (!navigator.onLine) {
      message = "No internet connection.";
    } else if (err.message.includes("Access denied")) {
      message = "Access to results is restricted.";
    } else if (err.message.includes("Results not found")) {
      message = "Lotto results could not be found.";
    } else if (err.message.includes("Server error")) {
      message = "There’s a problem fetching results — please try again later.";
    } else if (err.message.includes("Network failure")) {
      message = "Network failure — check your connection.";
    }

    displayErrorMessage(message);
    console.error("⚠️ Error:", err.message);
  }
}

// Helper to show message on the page
function displayErrorMessage(msg) {
  const container = document.getElementById('gamesContainer');
  if (container) {
    container.innerHTML = `<p class="error-message">${msg}</p>`;
  }
}
