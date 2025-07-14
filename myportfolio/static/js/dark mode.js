function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  
  // Send request to Django to update session
  fetch('/toggle-dark-mode/', {
    method: 'POST',
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({dark_mode: isDark})
  });
}

// Helper function to get CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Initialize dark mode from session
document.addEventListener('DOMContentLoaded', function() {
  // Trigger animations
  setTimeout(function() {
    document.body.classList.add('animation-ready');
  }, 100);
  
  // Spacebar to toggle dark mode
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) { // Spacebar
      toggleDarkMode();
    }
  });
  
  // Click on body to toggle dark mode (optional)
  // document.addEventListener('click', function() {
  //   toggleDarkMode();
  // });
});