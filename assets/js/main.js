// main.js - Core UI interactions (theme, nav, scroll)
(function() {
  'use strict';

  // ============================================
  // THEME TOGGLE LOGIC
  // ============================================

  /**
   * Initialize theme toggle functionality.
   */
  function initThemeToggle() {
    const themeBtn = document.querySelector('[data-theme-toggle]');
    if (!themeBtn) return;

    // Check saved preference or default to system preference
    let currentTheme = localStorage.getItem('cv-theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    applyTheme(currentTheme);

    themeBtn.addEventListener('click', () => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      
      // Update button state
      if (themeBtn.classList.contains('bg-white')) {
        themeBtn.classList.remove('bg-white');
        themeBtn.classList.add('bg-slate-900', 'text-white');
      } else {
        themeBtn.classList.remove('bg-slate-900', 'text-white');
        themeBtn.classList.add('bg-white');
      }
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('cv-theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Apply theme to document and update CSS variables.
   */
  function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Update stored preference
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cv-theme', theme);
    }

    console.log(`Theme set to: ${theme}`);
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

    let lastScrollY = window.scrollY;
    const offset = 10;
    
    // Add transition class for smooth effect
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

      lastScrollY = currentScrollY;
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
      
      // Calculate progress percentage
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
        
        // Skip if not a section link or already on target
        if (!targetId || targetId === '#' || window.location.hash === targetId) return;

        e.preventDefault();

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL without scroll jump
          history.pushState(null, '', targetId);
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