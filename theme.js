// theme.js — flip and persist theme. Loaded with defer; the bootstrap that
// prevents FOUC lives inline in index.html <head>.

(function () {
  'use strict';

  var STORAGE_KEY = 'noadsdude:theme';
  var VALID = { light: true, dark: true };
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (VALID[attr]) return attr;
    // Bootstrap should have set it, but fall back to system preference.
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (!VALID[theme]) return;
    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  function persist(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }

  // Initial sync of aria attributes to current theme
  applyTheme(currentTheme());

  btn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    persist(next);
  });

  // If user has not overridden, react to OS theme changes live
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', function (e) {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return; // user has explicit choice; respect it
    } catch (err) { /* localStorage unavailable: still respect system */ }
    applyTheme(e.matches ? 'dark' : 'light');
  });

  // Reveal headline (CSS-only animation, gated on prefers-reduced-motion in CSS)
  requestAnimationFrame(function () { root.classList.add('ready'); });
})();
