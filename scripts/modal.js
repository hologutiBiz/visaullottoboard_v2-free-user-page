window.addEventListener('DOMContentLoaded', () => {
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
