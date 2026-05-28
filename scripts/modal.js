window.addEventListener('DOMContentLoaded', () => {
  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById('menuToggle');
  const subnav = document.getElementById('subnav');
  const headerActions = document.getElementById('headerActions');

  if (menuToggle && subnav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      subnav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a game link
    const gameLinks = subnav.querySelectorAll('.game-link');
    gameLinks.forEach(link => {
      link.addEventListener('click', () => {
        subnav.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!subnav.contains(e.target) && !menuToggle.contains(e.target)) {
        subnav.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        subnav.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }

  // ===== Report Modal =====
  // Open the report modal
  const reportBtn = document.getElementById('reportBtn');
  if (reportBtn) {
    reportBtn.onclick = () => {
      const modal = document.getElementById('reportModal');
      modal?.classList.remove('hidden');
    };
  }

  // Close the modal
  const closeBtn = document.getElementById('closeModalBtn');
  if (closeBtn) {
    closeBtn.onclick = () => {
      document.getElementById('reportModal')?.classList.add('hidden');
    };
  }

  // Send the report via EmailJS
  const sendBtn = document.getElementById('sendReportBtn');
  if (sendBtn) {
    sendBtn.onclick = () => {
      const message = document.getElementById('reportMessage')?.value.trim();
      if (!message) return alert('Please describe the issue.');

      // Disable button + show loading state
      sendBtn.disabled = true;
      sendBtn.textContent = 'Sending...';

      emailjs.send('service_5tnxk2l', 'template_4oe61r6', {
        message: message,
        category: 'Issue Report (via error handler)',
      }, 'BQysLPe_NPpvTICOe')
      .then(() => {
        alert('Thanks! Your report was sent.');
        document.getElementById('reportMessage').value = '';
        document.getElementById('reportModal').classList.add('hidden');
      })
      .catch(err => {
        console.error('Report send error:', err);
        alert('Oops! Something went wrong. Try again later.');
      })
      .finally(() => {
      // Re-enable button and reset text
      sendBtn.disabled = false;
      sendBtn.textContent = 'Submit Report';
    });
    };
  }
});
