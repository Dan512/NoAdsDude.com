// i18n.js — translation table + t() helper + setLanguage(). English only in v1.
// Add more languages by appending blocks to the TRANSLATIONS object below.

(function () {
  'use strict';

  var STORAGE_KEY = 'noadsdude:lang';

  // Allowlist of supported language codes. Update when adding translations.
  var SUPPORTED = ['en'];

  var TRANSLATIONS = {
    en: {
      headline: 'Websites that do the thing. Nothing else.',
      bodyP1: 'NoAdsDude is a handful of small websites built without ads, popups, cookie banners, tracking scripts, newsletter traps, or "create an account to continue."',
      bodyP2: 'No analytics. No creepy pixels. No autoplay videos. No dark patterns. No waiting for twelve different ad networks before you can check the weather, read a recipe, or look up a score.',
      bodyP3: 'Maybe this is the future of the internet. Maybe it\'s just the part of the old internet worth keeping. Either way, I got tired of bloated pages that treat people like inventory, so I started making alternatives.',

      sitesLabel: 'The sites',
      siteWeatherDesc: 'Fast forecasts. No popups, no tracking.',
      siteSportsDesc: 'Live scores without the gambling nags.',
      siteMenuDesc: 'Recipes. Just the food, no life story.',
      sitePhotosDesc: 'Batch image editing in your browser. No uploads, no signup, no ads.',
      siteMassageDesc: 'Press play, give your partner a better massage. 30 or 60 minutes.',
      siteHealthDesc: 'Fitness and health articles without the clickbait, miracle cures, or ad-choked pages.',

      whyLabel: 'Why make this?',
      whyIntro: 'Because most websites got weird.',
      whyExample1: 'A weather page should not need a consent manager, six trackers, a video ad, and half your battery.',
      whyExample2: 'A recipe should not make you scroll through a memoir and a stack of affiliate links.',
      whyExample3: 'A health article should not be wrapped in panic headlines, miracle-product funnels, or "doctors hate this one trick" garbage.',
      whyClosing: 'The goal here is simple: make pages that load fast, respect your privacy, and get out of the way.',

      rulesLabel: 'The rules',
      ruleAdsTitle: 'No ads.',
      ruleAdsBody: 'Not "fewer ads." Not "better ads." None.',
      ruleTrackingTitle: 'No tracking.',
      ruleTrackingBody: 'No analytics, cookies, fingerprinting, pixels, or third-party surveillance scripts.',
      ruleTrapsTitle: 'No engagement traps.',
      ruleTrapsBody: 'No infinite scroll, no newsletter wall, no fake urgency, no "you may also like" maze.',
      ruleOneJobTitle: 'One job per site.',
      ruleOneJobBody: 'Each site should do the thing it says on the label, then leave you alone.',

      supportLabel: 'Support',
      supportP1: 'Everything here is free, open source, and built on weekends.',
      supportP2: 'If one of these sites saved you from a cookie banner, a video preroll, or a page that crashed your phone, you can throw a couple bucks in the tip jar.',
      kofiPrivacyNote: 'Heads up: Ko-fi is a third-party service. Once you click, their privacy practices apply.',

      privacyHeading: 'Privacy',
      privacyP1: 'This page makes zero third-party requests. No analytics, no cookies, no fingerprinting, no remote fonts, no embedded widgets. Fonts and stylesheets are served from noadsdude.com.',
      privacyP2: 'The only thing stored locally is your theme preference, kept in your browser\'s localStorage. That is not a cookie.',
      privacyP3: 'Outbound links to sibling sites (noadsweather.com, noadssports.com, backonthemenu.com, noadsphotos.com, partnermassage.app, noadshealth.com) and to Ko-fi take you off this site; their own privacy practices apply once you click.',
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
