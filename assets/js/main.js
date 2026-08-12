// main.js - Core UI interactions (theme, nav, scroll)
(function() {
  'use strict';

  // ============================================
  // THEME TOGGLE LOGIC
  // ============================================

  /**
   * Apply theme to document and update CSS variables and stored preference.
   */
  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    
    // Sync localStorage keys used across app.js and main.js
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cv-theme', theme);
      localStorage.setItem('theme', theme);
    }

    // Update buttons matching [data-theme-toggle] or .theme-toggle-btn
    const themeBtns = document.querySelectorAll('[data-theme-toggle], .theme-toggle-btn');
    themeBtns.forEach(btn => {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = isDark ? 'light_mode' : 'dark_mode';
      }
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      
      if (btn.hasAttribute('data-theme-toggle')) {
        if (isDark) {
          btn.classList.remove('bg-white', 'text-slate-900');
          btn.classList.add('bg-slate-900', 'text-white');
        } else {
          btn.classList.remove('bg-slate-900', 'text-white');
          btn.classList.add('bg-white', 'text-slate-900');
        }
      }
    });

    console.log(`Theme set to: ${theme}`);
  }

  /**
   * Initialize theme toggle functionality.
   */
  function initThemeToggle() {
    const themeBtns = document.querySelectorAll('[data-theme-toggle], .theme-toggle-btn');
    if (!themeBtns.length) return;

    // Check saved preference or default to system preference
    let currentTheme = localStorage.getItem('theme') || localStorage.getItem('cv-theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    applyTheme(currentTheme);

    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(currentTheme);
      });
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme') && !localStorage.getItem('cv-theme')) {
        currentTheme = e.matches ? 'dark' : 'light';
        applyTheme(currentTheme);
      }
    });
  }

  // ============================================
  // STICKY NAVIGATION
  // ============================================

  /**
   * Initialize sticky navigation behavior.
   */
  function initStickyNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const offset = 10;
    nav.classList.add('transition-all', 'duration-300');

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > offset) {
        nav.classList.remove('py-6', 'bg-transparent');
        nav.classList.add('shadow-md', 'backdrop-blur-sm', 'bg-white/90', 'dark:bg-slate-900/90');
      } else {
        nav.classList.add('py-6', 'bg-transparent');
        nav.classList.remove('shadow-md', 'backdrop-blur-sm', 'bg-white/90', 'dark:bg-slate-900/90');
      }
    }, { passive: true });
  }

  // ============================================
  // SCROLL PROGRESS INDICATOR
  // ============================================

  /**
   * Initialize scroll progress bar.
   */
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      let progress = 0;
      if (docHeight > 0) {
        progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      }

      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // ============================================
  // SMOOTH SCROLLING
  // ============================================

  /**
   * Initialize smooth scrolling for anchor links.
   */
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        
        // Skip if not a valid section selector or just '#'
        if (!targetId || targetId === '#' || targetId.length <= 1) return;

        try {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            if (history.pushState) {
              history.pushState(null, '', targetId);
            }
          }
        } catch (err) {
          // Ignore invalid selector syntax for non-id hashes
        }
      });
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  /**
   * Initialize all core UI modules.
   */
  function init() {
    console.log('main.js module initializing...');

    initThemeToggle();
    initStickyNav();
    initScrollProgress();
    initSmoothScroll();

    console.log('main.js module initialized successfully');
  }

  // Run initialization when DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  // Export for module usage
  if (typeof window !== 'undefined') {
    window.MainUI = {
      applyTheme,
      initThemeToggle,
      initStickyNav,
      initScrollProgress,
      initSmoothScroll
    };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      applyTheme,
      initThemeToggle,
      initStickyNav,
      initScrollProgress,
      initSmoothScroll
    };
  }

})();