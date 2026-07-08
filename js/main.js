/* ============================================================
   THEME TOGGLE
   Persists preference to localStorage.
   ============================================================ */
(function () {
  const STORAGE_KEY = 'pt-theme';
  const root = document.documentElement;
  const btn  = document.getElementById('theme-toggle');

  // Apply saved theme on load (before paint to avoid flash)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') root.setAttribute('data-theme', 'dark');

  function updateIcon(isDark) {
    if (!btn) return;
    // Sun icon for dark mode (click to go light), moon for light mode
    btn.innerHTML = isDark
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // Set initial icon
  updateIcon(root.getAttribute('data-theme') === 'dark');

  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem(STORAGE_KEY, 'light');
        updateIcon(false);
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem(STORAGE_KEY, 'dark');
        updateIcon(true);
      }
    });
  }

  // Also respect OS preference if no saved preference
  if (!saved) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.setAttribute('data-theme', 'dark');
      updateIcon(true);
    }
  }
})();
