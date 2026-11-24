/* Apply the saved theme before first paint so there is no flash. */
try {
  var p = JSON.parse(localStorage.getItem('yris:v2:prefs') || '{}');
  if (p.theme === 'dark' || p.theme === 'light') document.documentElement.setAttribute('data-theme', p.theme);
} catch (e) { /* storage unavailable */ }
