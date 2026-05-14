// i18n.js — translation table + t() helper + setLanguage(). English only in v1.
// Add more languages by appending blocks to the TRANSLATIONS object below.

(function () {
  'use strict';

  var STORAGE_KEY = 'noadsdude:lang';

  // Allowlist of supported language codes. Update when adding translations.
  var SUPPORTED = ['en'];

  var TRANSLATIONS = {
    en: {
      headline: 'Websites for humans, not for advertisers.',
      bodyP1: 'NoAdsDude is a small family of websites built without ads, popups, cookie banners, or tracking. No analytics. No "sign up to read more." No 15-megabyte download just to check the weather.',
      bodyP2: 'Maybe this is the future of the internet. Maybe it\'s the past — Internet 1.0, or 0.5, depending on how grumpy you\'re feeling. Either way, I got tired of the bloat, so I started building.',

      sitesLabel: 'The sites',
      siteWeatherDesc: 'Fast forecasts. No popups, no tracking.',
      siteSportsDesc: 'Live scores without the gambling nags.',
      siteMenuDesc: 'Recipes. Just the food, no life story.',
      inProgress: 'In progress: NoAdsImages · MassageBuddy',

      whyLabel: 'Why bother',
      whySpeedTitle: 'Speed.',
      whySpeedBody: 'A page should appear before your thumb finishes scrolling — not after megabytes of trackers and consent banners load first.',
      whyPrivacyTitle: 'Privacy by default.',
      whyPrivacyBody: 'No cookies, no analytics, no fingerprinting. The site doesn\'t know who you are because it doesn\'t need to.',
      whyOneTitle: 'One thing, done well.',
      whyOneBody: 'Each site does the one thing its name promises. No newsletter capture, no "related content," no engagement loop.',

      supportLabel: 'Support',
      supportBody: 'All of these are free, open source, and built on weekends. If a NoAdsDude site has saved you from a cookie banner or a video preroll today, throwing a couple of bucks at the tip jar keeps the lights on.',
      kofiPrivacyNote: 'Heads up: Ko-fi is a third-party service. Once you click, their own privacy practices apply.',

      privacyHeading: 'Privacy',
      privacyP1: 'This page makes zero third-party requests. No analytics, no cookies, no fingerprinting, no remote fonts, no embedded widgets. Fonts and stylesheets are served from noadsdude.com.',
      privacyP2: 'The only data stored locally is your theme preference, kept in your browser\'s localStorage (not a cookie).',
      privacyP3: 'Outbound links to sibling sites (noadsweather.com, noadssports.com, backonthemenu.com) and to Ko-fi take you off this site; their own privacy practices apply once you click.',
      privacyStandalone: 'Read this on its own page →',

      footerStance: 'no cookies · no tracking · no ads — by definition.',
      privacyLink: 'Privacy',
      codeLink: 'Code',
      madeBy: 'Made by Dan'
    }
    // To add another language: copy the en block, change the values, append.
    // Then add the language code to SUPPORTED above.
  };

  function detect() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    var nav = (navigator.language || 'en').toLowerCase().split('-')[0];
    return SUPPORTED.indexOf(nav) !== -1 ? nav : 'en';
  }

  var lang = detect();

  function t(key) {
    var block = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return block[key] !== undefined ? block[key] : (TRANSLATIONS.en[key] || '');
  }

  function apply() {
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-i18n');
      var val = t(key);
      // Use textContent — never innerHTML — to avoid XSS even though source is trusted
      nodes[i].textContent = val;
    }
  }

  // Expose a minimal API for future language picker
  window.NoAdsDude = window.NoAdsDude || {};
  window.NoAdsDude.t = t;
  window.NoAdsDude.setLanguage = function (newLang) {
    if (SUPPORTED.indexOf(newLang) === -1) return;
    try { localStorage.setItem(STORAGE_KEY, newLang); } catch (e) {}
    lang = newLang;
    apply();
  };

  apply();
})();
