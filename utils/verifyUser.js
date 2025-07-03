async function verifySession() {
    try {
      const response = await fetch("https://auth.visuallottoboard.com/verifySession", {
        method: "GET",
        credentials: "include"
      });

      if (response.status === 200) {
        const user = await response.json();
        console.log("✅ Session verified:", user);
        // Optionally show user name, email, etc.
      } else {
        throw new Error("Invalid session");
      }
    } catch (error) {
      console.warn("Session check failed:", error);
      window.location.href = "https://app.visuallottoboard.com/login";
    }
  }

  verifySession();