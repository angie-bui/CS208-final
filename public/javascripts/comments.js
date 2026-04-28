document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.comment-form');
  const submitBtn = document.getElementById('submitBtn');

  if (form && submitBtn) {
    form.addEventListener('submit', function() {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Posting...';
    });
  }
});
