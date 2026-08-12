/**
 * Master Application Script — Elizaveta Vakalova Portfolio
 * Provides Dark Mode, Three.js Canvas Controls, Case Study Lightbox,
 * Dynamic Work Filtering, Toast Alerts, Animated Counters & Accordions.
 */

// Global state & Project Database
window.PortfolioApp = (function() {
    const PROJECTS = {
        astro: {
            id: 'astro',
            title: 'Astro Analytics',
            subtitle: 'Dashboard UX/UI & System Architecture',
            category: 'Product Design',
            year: '2025',
            image: 'assets/images/project_astro.webp',
            metrics: [
                { val: '+35%', label: 'Active Users Growth' },
                { val: '4.8/5', label: 'User Satisfaction Score' },
                { val: '-45%', label: 'Task Completion Time' }
            ],
            overview: 'Astro Analytics is an enterprise-grade telemetry and user analytics dashboard created for fast-scaling engineering and product teams. The goal was to simplify multi-dimensional data visualization while reducing cognitive load.',
            role: 'Lead Product Designer & UX Researcher',
            deliverables: 'Design System, Interactive Prototypes, Micro-interactions, User Testing, Component Library',
            highlights: [
                'Dynamic customizable widget grids with responsive canvas snapping',
                'Real-time query performance monitoring with instant anomaly alerts',
                'High-contrast accessible visual palette tailored for multi-monitor setups'
            ]
        },
        aura: {
            id: 'aura',
            title: 'AURA Identity',
            subtitle: 'Brand Identity & Visual System',
            category: 'Brand Identity',
            year: '2024',
            image: 'assets/images/project_aura.webp',
            metrics: [
                { val: '+27%', label: 'Brand Recognition Lift' },
                { val: '3.2M', label: 'Launch Impressions' },
                { val: '14', label: 'Design Awards' }
            ],
            overview: 'AURA is a minimalist holistic wellness brand based in Scandinavia. The design system leverages natural typography, organic material palettes, and restrained spatial hierarchy to express calm and balance.',
            role: 'Creative Director & Brand Designer',
            deliverables: 'Brand Strategy, Visual Identity, Packaging Design, Digital Guidelines, Merchandise',
            highlights: [
                'Custom bespoke display typography paired with tactile texture rules',
                'Tactile eco-friendly packaging specifications using zero-plastic craft stock',
                'Omnichannel digital brand portal and interactive styleguide'
            ]
        },
        alpine: {
            id: 'alpine',
            title: 'Alpine Retreat Editorial',
            subtitle: 'Editorial Design & Architectural Publication',
            category: 'Editorial',
            year: '2024',
            image: 'assets/images/project_alpine.webp',
            metrics: [
                { val: '2.4×', label: 'Longer Average Read Time' },
                { val: '15k', label: 'Collector Print Run' },
                { val: '99%', label: 'Subscriber Satisfaction' }
            ],
            overview: 'A high-end architectural publication examining modernist mountain retreats across the Swiss Alps. Focused on generous grid structures, tactile paper textures, and immersive editorial photography.',
            role: 'Editorial Designer & Art Director',
            deliverables: 'Layout System, Cover Design, Print Specs, Custom Typography, Digital Companion',
            highlights: [
                'Swiss grid layout with asymmetrical margins and generous white space',
                'Duotone image treatment highlighting natural granite and timber tones',
                'Embossed cloth hardcover print finish with custom foil stamping'
            ]
        },
        forma: {
            id: 'forma',
            title: 'Forma Studio Showcase',
            subtitle: 'Spatial Experience & Interactive Web Design',
            category: 'Product Design',
            year: '2025',
            image: 'assets/images/project_forma.webp',
            metrics: [
                { val: '+42%', label: 'Client Inquiry Rate' },
                { val: '0.8s', label: 'Page Speed Score' },
                { val: 'Webby', label: 'Nomination' }
            ],
            overview: 'Digital presence and interactive showcase for an avant-garde interior architecture studio. Seamless web transitions highlight spatial depth, light dynamics, and material scale.',
            role: 'Interactive Designer & Front-end Architect',
            deliverables: 'Web UI/UX, 3D WebGL Interactions, Motion Design, Brand System',
            highlights: [
                'Smooth WebGL perspective reveals reacting to ambient scroll velocity',
                'Fluid responsive layout typography scaling dynamically across breakpoints',
                'Interactive 3D project explorer with real-time room lighting controls'
            ]
        },
        omnimarket: {
            id: 'omnimarket',
            title: 'OmniMarket Platform',
            subtitle: 'E-Commerce System & Mobile Commerce',
            category: 'Campaign',
            year: '2024',
            image: 'assets/images/project_omnimarket.webp',
            metrics: [
                { val: '+18%', label: 'Checkout Completion' },
                { val: '$12M', label: 'Annual Volume Processed' },
                { val: '35ms', label: 'Cart Latency' }
            ],
            overview: 'Re-imagining hyper-scale e-commerce for contemporary retail brands. Streamlining multi-currency checkout, dynamic inventory search, and contextual product recommendations.',
            role: 'Principal Product Designer',
            deliverables: 'Design System, Mobile App UI, Conversion Architecture, Merchant Portal',
            highlights: [
                '1-tap frictionless checkout UI reducing drop-off by 30%',
                'Micro-animated cart feedback providing instant visual validation',
                'Accessible design token infrastructure supporting 12 brand themes'
            ]
        },
        veloce: {
            id: 'veloce',
            title: 'Veloce Mobile App',
            subtitle: 'Fintech & Smart Investment Experience',
            category: 'Product Design',
            year: '2025',
            image: 'assets/images/project_veloce.webp',
            metrics: [
                { val: '4.9★', label: 'App Store Rating' },
                { val: '120k', label: 'Active Monthly Users' },
                { val: '0%', label: 'Onboarding Drop-off' }
            ],
            overview: 'Next-generation wealth management application designed to make personal finance intuitive, transparent, and delighting for digital-native users.',
            role: 'Lead Mobile UX Designer',
            deliverables: 'iOS/Android App Design, Motion Prototypes, Design Token System',
            highlights: [
                'Biometric instant authentication with customizable dashboard widgets',
                'Interactive portfolio growth projections with real-time market feeds',
                'Contextual smart alert feeds with personalized actionable insights'
            ]
        },
        chrome: {
            id: 'chrome',
            title: 'Mist & Chrome',
            subtitle: '3D Motion & Visual Art Campaign',
            category: 'Campaign',
            year: '2026',
            video: 'video_2026-07-30_22-17-26.mp4',
            image: 'assets/images/project_forma.webp',
            metrics: [
                { val: '4.5M', label: 'Campaign Impressions' },
                { val: '+42%', label: 'Engagement Rate' },
                { val: 'Golden Nica', label: 'Ars Electronica Award' }
            ],
            overview: 'An immersive 3D motion exploration blending organic foggy forest environments with fluid liquid-chrome typography. Created as a hero visual campaign for a speculative environmental design summit.',
            role: '3D Motion Designer & Art Director',
            deliverables: '3D Simulation, Liquid Physics, Environment Lighting, Typography Motion, Audio Reactive Visuals',
            highlights: [
                'Real-time fluid simulation and raytraced chrome reflection mapping',
                'Volumetric fog and atmospheric god-ray lighting in Octane Render',
                'Seamless 60fps loop optimized for spatial web and high-res digital billboards'
            ]
        }
    };

    // Helper: Show Toast Notification
    function showToast(message, icon = 'check_circle') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.innerHTML = `<span class="material-symbols-outlined text-[18px]">${icon}</span><span>${message}</span>`;
        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // Theme Management
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme === 'dark' || (!savedTheme && systemDark);

        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        updateThemeToggleIcons(isDark);
        updateThreeColors(isDark);
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeToggleIcons(isDark);
        updateThreeColors(isDark);
        showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, isDark ? 'dark_mode' : 'light_mode');
    }

    function updateThemeToggleIcons(isDark) {
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = isDark ? 'light_mode' : 'dark_mode';
            }
            btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        });
    }

    // Three.js Background Synchronization
    function updateThreeColors(isDark) {
        if (!window.animationSettings) return;
        if (isDark) {
            window.animationSettings.primaryColor = 0xf4f0ef;
            window.animationSettings.accentColor = 0xd4af37;
        } else {
            window.animationSettings.primaryColor = 0x1a1a1a;
            window.animationSettings.accentColor = 0x785929;
        }
    }

    // Modal / Lightbox Logic
    let currentModalId = null;

    function openCaseStudy(projectId) {
        const project = PROJECTS[projectId];
        if (!project) return;
        currentModalId = projectId;

        let modal = document.getElementById('case-study-modal');
        if (!modal) {
            modal = createModalMarkup();
            document.body.appendChild(modal);
        }

        populateModalContent(modal, project);
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        const card = modal.querySelector('.modal-card');
        if (card) card.scrollTop = 0;
    }

    function closeCaseStudy() {
        const modal = document.getElementById('case-study-modal');
        if (modal) {
            const video = modal.querySelector('video');
            if (video) {
                try { video.pause(); video.currentTime = 0; } catch (e) {}
            }
            modal.classList.remove('open', 'flex');
            modal.classList.add('hidden');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        currentModalId = null;
    }

    function navigateModal(direction) {
        const keys = Object.keys(PROJECTS);
        if (!currentModalId) return;
        let index = keys.indexOf(currentModalId);
        if (direction === 'next') {
            index = (index + 1) % keys.length;
        } else {
            index = (index - 1 + keys.length) % keys.length;
        }
        openCaseStudy(keys[index]);
    }

    function createModalMarkup() {
        const div = document.createElement('div');
        div.id = 'case-study-modal';
        div.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-xl';
        div.innerHTML = `
            <div class="modal-card w-full max-w-5xl max-h-[90vh] bg-surface overflow-y-auto rounded-2xl shadow-2xl border border-outline/10 p-6 md:p-12 relative flex flex-col">
                <!-- Close Button -->
                <button id="modal-close-btn" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary flex items-center justify-center transition-all duration-300 z-20" aria-label="Close modal">
                    <span class="material-symbols-outlined">close</span>
                </button>

                <!-- Header Content -->
                <div class="mb-8 pr-12">
                    <div class="flex items-center gap-3 mb-3">
                        <span id="modal-category" class="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em]"></span>
                        <span class="text-outline/40">•</span>
                        <span id="modal-year" class="font-label-caps text-label-caps text-on-surface-variant"></span>
                    </div>
                    <h2 id="modal-title" class="font-headline-lg text-3xl md:text-5xl font-bold text-primary mb-2"></h2>
                    <p id="modal-subtitle" class="font-body-lg text-lg text-on-surface-variant"></p>
                </div>

                <!-- Hero Media -->
                <div class="w-full aspect-[16/9] rounded-xl overflow-hidden bg-surface-container mb-10 shadow-lg relative">
                    <img id="modal-image" src="" alt="" class="w-full h-full object-cover">
                </div>

                <!-- Metrics Grid -->
                <div id="modal-metrics" class="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-xl bg-surface-container-low mb-10 border border-outline/5"></div>

                <!-- Main Grid Details -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
                    <div class="md:col-span-7 space-y-6">
                        <div>
                            <h4 class="font-label-caps text-label-caps uppercase text-primary tracking-widest mb-3">Project Overview</h4>
                            <p id="modal-overview" class="font-body-md text-base leading-relaxed text-on-surface-variant"></p>
                        </div>
                        <div>
                            <h4 class="font-label-caps text-label-caps uppercase text-primary tracking-widest mb-3">Key Solution Highlights</h4>
                            <ul id="modal-highlights" class="space-y-2 font-body-md text-sm text-on-surface-variant list-disc list-inside"></ul>
                        </div>
                    </div>
                    <div class="md:col-span-5 space-y-6 md:border-l md:border-outline/10 md:pl-8">
                        <div>
                            <h4 class="font-label-caps text-label-caps uppercase text-primary tracking-widest mb-2">Role & Responsibility</h4>
                            <p id="modal-role" class="font-body-md text-sm text-primary font-medium"></p>
                        </div>
                        <div>
                            <h4 class="font-label-caps text-label-caps uppercase text-primary tracking-widest mb-2">Key Deliverables</h4>
                            <p id="modal-deliverables" class="font-body-md text-sm text-on-surface-variant leading-normal"></p>
                        </div>
                    </div>
                </div>

                <!-- Footer Modal Nav -->
                <div class="mt-auto pt-6 border-t border-outline/10 flex justify-between items-center">
                    <button id="modal-prev-btn" class="flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">
                        <span class="material-symbols-outlined text-[18px]">west</span> Previous Case
                    </button>
                    <button id="modal-next-btn" class="flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">
                        Next Case <span class="material-symbols-outlined text-[18px]">east</span>
                    </button>
                </div>
            </div>
        `;

        // Event delegation inside modal
        div.addEventListener('click', (e) => {
            if (e.target === div) closeCaseStudy();
        });

        div.querySelector('#modal-close-btn').addEventListener('click', closeCaseStudy);
        div.querySelector('#modal-prev-btn').addEventListener('click', () => navigateModal('prev'));
        div.querySelector('#modal-next-btn').addEventListener('click', () => navigateModal('next'));

        return div;
    }

    function populateModalContent(modal, p) {
        modal.querySelector('#modal-category').textContent = p.category;
        modal.querySelector('#modal-year').textContent = p.year;
        modal.querySelector('#modal-title').textContent = p.title;
        modal.querySelector('#modal-subtitle').textContent = p.subtitle;

        // Render video or image in modal header
        const imageElement = modal.querySelector('#modal-image');
        const mediaWrapper = imageElement.parentElement;
        if (p.video) {
            mediaWrapper.innerHTML = `
                <video id="modal-image" class="w-full h-full object-cover rounded-lg shadow-inner" autoplay loop muted playsinline controls>
                    <source src="${p.video}" type="video/mp4">
                </video>
            `;
        } else {
            mediaWrapper.innerHTML = `
                <img id="modal-image" class="w-full h-full object-cover rounded-lg shadow-inner" src="${p.image}" alt="${p.title}">
            `;
        }

        modal.querySelector('#modal-overview').textContent = p.overview;
        modal.querySelector('#modal-role').textContent = p.role;
        modal.querySelector('#modal-deliverables').textContent = p.deliverables;

        // Populate metrics
        const metricsContainer = modal.querySelector('#modal-metrics');
        metricsContainer.innerHTML = p.metrics.map(m => `
            <div class="flex flex-col">
                <span class="font-stat-number text-3xl font-light text-secondary mb-1">${m.val}</span>
                <span class="font-body-md text-xs uppercase tracking-wider text-on-surface-variant">${m.label}</span>
            </div>
        `).join('');

        // Populate highlights
        const highlightsContainer = modal.querySelector('#modal-highlights');
        highlightsContainer.innerHTML = p.highlights.map(h => `<li>${h}</li>`).join('');
    }

    // Keyboard Navigation & Hotkeys (ESC, Arrow Left/Right)
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('case-study-modal');
        const isModalOpen = modal && modal.classList.contains('open');

        if (e.key === 'Escape') {
            if (isModalOpen) {
                closeCaseStudy();
            }
            const settingsPanel = document.getElementById('settings-panel');
            if (settingsPanel && settingsPanel.classList.contains('open')) {
                settingsPanel.classList.remove('open');
            }
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const toggle = document.getElementById('mobile-menu-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        } else if (isModalOpen && e.key === 'ArrowRight') {
            navigateModal('next');
        } else if (isModalOpen && e.key === 'ArrowLeft') {
            navigateModal('prev');
        }
    });

    // Work Page Dynamic Filter & Search
    function initWorkFilter() {
        const filterChips = document.querySelectorAll('.filter-chip');
        const searchInput = document.getElementById('work-search-input');
        const searchClear = document.getElementById('work-search-clear');
        const resetBtn = document.getElementById('reset-filters-btn');
        const projectItems = document.querySelectorAll('.project-item');

        if (!filterChips.length && !projectItems.length) return;

        let activeCategory = 'all';
        let searchQuery = '';

        function filterProjects() {
            let visibleCount = 0;
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category') || '';
                const title = (item.getAttribute('data-title') || '').toLowerCase();
                const desc = (item.getAttribute('data-desc') || '').toLowerCase();

                const matchCategory = activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase();
                const matchSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

                if (matchCategory && matchSearch) {
                    item.style.display = '';
                    item.classList.add('visible');
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    visibleCount++;
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        if (!matchCategory || !matchSearch) item.style.display = 'none';
                    }, 250);
                }
            });

            // Toggle empty state
            const emptyState = document.getElementById('work-empty-state');
            if (emptyState) {
                if (visibleCount === 0) {
                    emptyState.classList.remove('hidden');
                } else {
                    emptyState.classList.add('hidden');
                }
            }

            // Update visible items count badge
            const countEl = document.getElementById('work-count');
            if (countEl) {
                countEl.textContent = `Showing ${visibleCount} of ${projectItems.length} projects`;
            }

            // Toggle clear button
            if (searchClear) {
                if (searchQuery.length > 0) searchClear.classList.remove('hidden');
                else searchClear.classList.add('hidden');
            }
        }

        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeCategory = chip.getAttribute('data-filter') || 'all';
                filterProjects();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                filterProjects();
            });
        }

        if (searchClear) {
            searchClear.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                searchQuery = '';
                filterProjects();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                activeCategory = 'all';
                searchQuery = '';
                if (searchInput) searchInput.value = '';
                filterChips.forEach(c => {
                    if (c.getAttribute('data-filter') === 'all') c.classList.add('active');
                    else c.classList.remove('active');
                });
                filterProjects();
            });
        }
    }

    // 1-Click Clipboard Email
    function initClipboardEmail() {
        document.querySelectorAll('.copy-email-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const email = btn.getAttribute('data-email') || 'hello@vakalova.design';
                navigator.clipboard.writeText(email).then(() => {
                    showToast(`Copied ${email} to clipboard!`, 'content_copy');
                }).catch(() => {
                    showToast(`Email: ${email}`, 'mail');
                });
            });
        });
    }

    // Animated Counter Logic
    function initAnimatedCounters() {
        const counters = document.querySelectorAll('.stat-counter');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    function animateCounter(el) {
        const targetVal = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';

        // For reduced motion users, set final value immediately
        if (prefersReducedMotion()) {
            el.textContent = `${prefix}${targetVal}${suffix}`;
            return;
        }

        const duration = 1500;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = (targetVal * easeProgress).toFixed(targetVal % 1 === 0 ? 0 : 1);
            el.textContent = `${prefix}${current}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = `${prefix}${targetVal}${suffix}`;
            }
        }
        requestAnimationFrame(step);
    }

    // Active Navigation Link Highlighting
    function initActiveNav() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a.font-label-caps').forEach(link => {
            const href = link.getAttribute('href');
            if (href === path || (path === '' && href === 'index.html')) {
                // Only set aria-current for accessibility — visual styling is handled
                // by hardcoded classes in HTML and CSS [aria-current="page"] rule
                link.setAttribute('aria-current', 'page');
                // Ensure the active link has consistent styling (in case HTML doesn't hardcode it)
                if (!link.classList.contains('text-primary') || !link.querySelector('.border-secondary')) {
                    link.classList.add('text-secondary');
                }
            }
        });
    }

    // Back To Top Button
    function initBackToTop() {
        let btn = document.getElementById('back-to-top');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'back-to-top';
            btn.className = 'fixed bottom-8 left-8 w-12 h-12 rounded-full bg-surface-container border border-outline/10 shadow-xl flex items-center justify-center text-primary hover:bg-secondary hover:text-on-secondary transition-all duration-300 z-50';
            btn.setAttribute('aria-label', 'Scroll back to top');
            btn.innerHTML = `<span class="material-symbols-outlined">arrow_upward</span>`;
            document.body.appendChild(btn);
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Case Study Triggers Binding
    function bindCaseStudyTriggers() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-case-study]');
            if (trigger) {
                e.preventDefault();
                const projectId = trigger.getAttribute('data-case-study');
                openCaseStudy(projectId);
            }
        });
    }

    // Contact Form & Chip Selection
    function initContactForm() {
        const chips = document.querySelectorAll('.scope-chip');
        const scopeInput = document.getElementById('selected-scope-input');
        const form = document.getElementById('contact-form');

        if (chips.length) {
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    chip.classList.toggle('selected');

                    const selected = Array.from(chips)
                        .filter(c => c.classList.contains('selected'))
                        .map(c => c.textContent.trim());

                    if (scopeInput) scopeInput.value = selected.join(', ');
                });
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Form input validation
                const emailInput = form.querySelector('input[type="email"]');
                const nameInput = form.querySelector('input[name="name"], input[placeholder*="Name"], input[id*="name"]');
                const messageInput = form.querySelector('textarea');
                
                const emailVal = emailInput ? emailInput.value.trim() : '';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailInput && (!emailVal || !emailRegex.test(emailVal))) {
                    showToast('Please enter a valid email address.', 'warning');
                    if (emailInput) emailInput.focus();
                    return;
                }
                
                if (messageInput && !messageInput.value.trim()) {
                    showToast('Please provide a brief message.', 'warning');
                    messageInput.focus();
                    return;
                }

                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin mr-2">progress_activity</span> Sending...`;
                }

                setTimeout(() => {
                    showToast('Thank you! Message sent successfully.', 'mark_email_read');
                    form.reset();
                    if (chips.length) {
                        chips.forEach(c => {
                            c.classList.remove('selected');
                        });
                    }
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = `Send Message <span class="material-symbols-outlined ml-2">arrow_forward</span>`;
                    }
                }, 1200);
            });
        }
    }

    // Process Accordion Interactions
    function initProcessAccordions() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        if (!accordionItems.length) return;

        accordionItems.forEach(item => {
            // Click listener on item (ignoring clicks inside accordion-content)
            item.addEventListener('click', (e) => {
                if (e.target.closest('.accordion-content')) return;

                const isActive = item.classList.contains('active');

                // Close all other accordions
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelectorAll('.node-marker').forEach(n => {
                        n.classList.remove('bg-secondary', 'border-secondary', 'scale-125');
                        n.classList.add('bg-primary', 'border-outline/30');
                    });
                    otherItem.querySelectorAll('.material-symbols-outlined').forEach(icon => {
                        if (icon.textContent.trim() === 'expand_more') {
                            icon.style.transform = 'rotate(0deg)';
                        }
                    });
                });

                if (!isActive) {
                    item.classList.add('active');
                    item.querySelectorAll('.node-marker').forEach(n => {
                        n.classList.add('bg-secondary', 'border-secondary', 'scale-125');
                        n.classList.remove('bg-primary', 'border-outline/30');
                    });
                    item.querySelectorAll('.material-symbols-outlined').forEach(icon => {
                        if (icon.textContent.trim() === 'expand_more') {
                            icon.style.transform = 'rotate(180deg)';
                        }
                    });
                }
            });

            // Keyboard accessibility
            const header = item.querySelector('.accordion-header') || item;
            header.addEventListener('keydown', (e) => {
                if (e.target.closest('.accordion-content')) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });
    }

    // Viewport-Relative Smooth Parallax for Card Images
    function initParallax() {
        const parallaxBgElements = document.querySelectorAll('.parallax-bg');
        if (!parallaxBgElements.length) return;

        // Skip parallax for users who prefer reduced motion
        if (prefersReducedMotion()) return;

        let ticking = false;

        function updateParallax() {
            const windowHeight = window.innerHeight;

            parallaxBgElements.forEach(el => {
                const wrapper = el.closest('.parallax-wrapper') || el.parentElement;
                if (!wrapper) return;

                const rect = wrapper.getBoundingClientRect();
                // Process only when element is in or close to viewport
                if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
                    const centerOffset = (rect.top + rect.height / 2) - (windowHeight / 2);
                    // Bounded subtle shift strictly within safety margins (-18px to +18px)
                    const rawY = centerOffset * -0.03;
                    const yPos = Math.max(-18, Math.min(18, rawY));
                    el.style.transform = `translateY(${yPos}px) scale(1.10)`;
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });

        window.addEventListener('resize', updateParallax, { passive: true });
        updateParallax();
    }

    // Centralized Mobile Menu Toggle (works on all pages)
    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenuToggle || !mobileMenu) return;

        function closeMenu() {
            mobileMenu.classList.add('hidden');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }

        function openMenu() {
            mobileMenu.classList.remove('hidden');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }

        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu.classList.contains('hidden')) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close mobile menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!mobileMenu.classList.contains('hidden') &&
                !mobileMenu.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close mobile menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMenu();
                mobileMenuToggle.focus();
            }
        });

        // Close mobile menu on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                closeMenu();
            }
        }, { passive: true });
    }

    // Sticky Navbar Show/Hide on Scroll (works on all pages)
    function initStickyNav() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let ticking = false;
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled <= 0) {
                        navbar.style.transform = "translateY(0)";
                    } else if (scrolled > lastScroll && scrolled > 80) {
                        navbar.style.transform = "translateY(-100%)";
                    } else {
                        navbar.style.transform = "translateY(0)";
                    }
                    lastScroll = scrolled;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Check if user prefers reduced motion
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Centralized Scroll Reveal Observer
    function initScrollReveal() {
        const elements = document.querySelectorAll('.fade-in-up, .image-mask-reveal');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                    // Free GPU layer once animation settles
                    setTimeout(() => {
                        entry.target.style.willChange = 'auto';
                    }, 1400);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(el => observer.observe(el));
    }

    // Canvas Settings Panel Interaction
    function initSettingsPanel() {
        const toggleBtn = document.getElementById('settings-toggle');
        const closeBtn = document.getElementById('settings-close');
        const panel = document.getElementById('settings-panel');
        const backdrop = document.getElementById('settings-backdrop');

        if (!toggleBtn || !panel) return;

        function openPanel() {
            panel.classList.add('open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            if (backdrop) {
                backdrop.classList.remove('hidden');
                requestAnimationFrame(() => backdrop.classList.add('opacity-100'));
            }
        }

        function closePanel() {
            panel.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            if (backdrop) {
                backdrop.classList.remove('opacity-100');
                setTimeout(() => backdrop.classList.add('hidden'), 300);
            }
        }

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (panel.classList.contains('open')) closePanel();
            else openPanel();
        });

        if (closeBtn) closeBtn.addEventListener('click', closePanel);
        if (backdrop) backdrop.addEventListener('click', closePanel);

        // Bind canvas toggles & pickers
        const toggleMotion = document.getElementById('toggle-motion');
        const toggleNodes = document.getElementById('toggle-nodes');
        const toggleGrid = document.getElementById('toggle-grid');
        const colorPrimary = document.getElementById('color-primary');
        const colorAccent = document.getElementById('color-accent');

        if (toggleMotion) toggleMotion.addEventListener('change', (e) => {
            if (window.animationSettings) window.animationSettings.motion = e.target.checked;
        });
        if (toggleNodes) toggleNodes.addEventListener('change', (e) => {
            if (window.animationSettings) window.animationSettings.nodes = e.target.checked;
        });
        if (toggleGrid) toggleGrid.addEventListener('change', (e) => {
            if (window.animationSettings) window.animationSettings.grid = e.target.checked;
        });
        if (colorPrimary) colorPrimary.addEventListener('input', (e) => {
            if (window.animationSettings) window.animationSettings.primaryColor = parseInt(e.target.value.replace('#', '0x'), 16);
        });
        if (colorAccent) colorAccent.addEventListener('input', (e) => {
            if (window.animationSettings) window.animationSettings.accentColor = parseInt(e.target.value.replace('#', '0x'), 16);
        });
    }

    // Top Reading Scroll Progress Bar
    function initScrollProgress() {
        let progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress-bar';
            document.body.appendChild(progressBar);
        }

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
        }, { passive: true });
    }

    // Initialize all modules on DOM ready
    function init() {
        initTheme();
        initActiveNav();
        initStickyNav();
        initMobileMenu();
        initSettingsPanel();
        initScrollProgress();
        initScrollReveal();
        initWorkFilter();
        initClipboardEmail();
        initAnimatedCounters();
        initBackToTop();
        bindCaseStudyTriggers();
        initContactForm();
        initProcessAccordions();
        initParallax();

        // Bind Theme Toggle Buttons across page
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            if (btn.dataset.themeBound) return;
            btn.dataset.themeBound = 'true';
            btn.addEventListener('click', toggleTheme);
        });
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        openCaseStudy,
        closeCaseStudy,
        toggleTheme,
        showToast
    };
})();

