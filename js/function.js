/**
 * LYRICODE-style Portfolio — Interaction Scripts
 * Pure vanilla JS, no jQuery dependency
 */

(function () {
  'use strict';

  // ---- Easing function (easeOutExpo) ----
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // ---- Smooth Scroll ----
  function smoothScrollTo(target, duration) {
    var start = window.pageYOffset;
    var end = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.pageYOffset;
    var distance = end - start;
    var startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutExpo(progress);
      window.scrollTo(0, start + distance * eased);
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // ---- Initialize on DOM ready ----
  function init() {
    // --- Hamburger Menu ---
    var btnNav = document.getElementById('btn_nav');
    var navModal = document.querySelector('.nav_modal');
    var conceptTop = document.getElementById('concept_top');
    var pageTop = document.getElementById('pagetop');

    if (btnNav && navModal) {
      btnNav.addEventListener('click', function () {
        btnNav.classList.toggle('active');
        navModal.classList.toggle('open');
      });

      // Close modal when clicking nav links
      var modalLinks = navModal.querySelectorAll('a');
      modalLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          btnNav.classList.remove('active');
          navModal.classList.remove('open');
        });
      });
    }

    // --- Page Top Button ---
    if (pageTop) {
      pageTop.addEventListener('click', function () {
        smoothScrollTo(0, 1200);
      });
    }

    // --- Scroll Handling ---
    var scrollThreshold = 240;

    function onScroll() {
      var scrollY = window.pageYOffset;

      // Toggle "back to top" visibility
      if (scrollY > scrollThreshold) {
        if (pageTop) pageTop.classList.add('show');
        if (conceptTop) conceptTop.classList.add('hide');
      } else {
        if (pageTop) pageTop.classList.remove('show');
        if (conceptTop) conceptTop.classList.remove('hide');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // --- Smooth scroll for anchor links ---
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          smoothScrollTo(target, 500);
        }
      });
    });

    // --- Scroll Reveal ---
    var revealElements = document.querySelectorAll('.reveal');
    var revealObserver;

    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      // Fallback: show all immediately
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  // ---- Run on DOM ready ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
