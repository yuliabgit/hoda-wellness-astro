/* HODA Wellness Group — client-side interactions */

(function () {
  'use strict';

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function isAnnouncementDismissed(announceId) {
    if (!announceId) return false;
    try {
      if (sessionStorage.getItem('hoda_ann_dismiss') === announceId) return true;
    } catch (e) {
      /* sessionStorage unavailable */
    }
    try {
      return (window.name || '').indexOf('hoda_ann_dismissed=' + announceId) !== -1;
    } catch (e) {
      return false;
    }
  }

  function markAnnouncementDismissed(announceId) {
    if (!announceId) return;
    try {
      sessionStorage.setItem('hoda_ann_dismiss', announceId);
    } catch (e) {
      /* no-op */
    }
    try {
      var flag = 'hoda_ann_dismissed=' + announceId;
      if ((window.name || '').indexOf(flag) === -1) {
        window.name = (window.name || '') + (window.name ? '|' : '') + flag;
      }
    } catch (e) {
      /* no-op */
    }
  }

  function initAnnouncementBanner() {
    var banner = $('#announcement');
    if (!banner) return;

    var announceId = banner.getAttribute('data-announce-id');

    if (isAnnouncementDismissed(announceId)) {
      banner.hidden = true;
      return;
    }

    banner.hidden = false;

    var closeBtn = $('.announce__close', banner);
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        banner.hidden = true;
        markAnnouncementDismissed(announceId);
      });
    }
  }

  function initMobileNav() {
    var toggle = $('.nav__toggle');
    var list = $('.nav__list');
    if (!toggle || !list) return;

    toggle.addEventListener('click', function () {
      var isOpen = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    $$('.nav__link, .nav__cta', list).forEach(function (link) {
      link.addEventListener('click', function () {
        list.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initHeaderScroll() {
    var header = $('.site-header');
    if (!header || !header.classList.contains('site-header--transparent')) return;

    function update() {
      if (window.scrollY > 80) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function boot() {
    initAnnouncementBanner();
    initMobileNav();
    initHeaderScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
