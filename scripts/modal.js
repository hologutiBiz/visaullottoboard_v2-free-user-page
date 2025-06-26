// Toggle modal visibility
document.getElementById('reportBtn').onclick = () =>
  document.getElementById('reportModal').classList.remove('hidden');

document.getElementById('closeModalBtn').onclick = () =>
  document.getElementById('reportModal').classList.add('hidden');

// Handle EmailJS send
document.getElementById('sendReportBtn').onclick = () => {
  const message = document.getElementById('reportMessage').value.trim();
  if (!message) return alert('Please describe the issue.');

  emailjs.send('service_5tnxk2l', 'template_4oe61r6', {
    message: message
  }, 'BQysLPe_NPpvTICOe')
  .then(() => {
    alert('Thanks! Your report was sent.');
    document.getElementById('reportMessage').value = '';
    document.getElementById('reportModal').classList.add('hidden');
  })
  .catch(err => {
    console.error('Report send error:', err);
    alert('Oops! Something went wrong. Try again later.');
  });
};
