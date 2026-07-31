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
    }

    function closeCaseStudy() {
        const modal = document.getElementById('case-study-modal');
        if (modal) {
            modal.classList.remove('open');
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
        modal.querySelector('#modal-image').src = p.image;
        modal.querySelector('#modal-image').alt = p.title;
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

    // Keyboard ESC Listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCaseStudy();
            const settingsPanel = document.getElementById('settings-panel');
            if (settingsPanel) settingsPanel.classList.remove('open');
        }
    });

    // Work Page Dynamic Filter & Search
    function initWorkFilter() {
        const filterChips = document.querySelectorAll('.filter-chip');
        const searchInput = document.getElementById('work-search-input');
        const projectItems = document.querySelectorAll('.project-item');

        if (!filterChips.length && !projectItems.length) return;

        let activeCategory = 'all';
        let searchQuery = '';

        function filterProjects() {
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category') || '';
                const title = (item.getAttribute('data-title') || '').toLowerCase();
                const desc = (item.getAttribute('data-desc') || '').toLowerCase();

                const matchCategory = activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase();
                const matchSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

                if (matchCategory && matchSearch) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
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
        document.querySelectorAll('nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === path || (path === '' && href === 'index.html')) {
                link.classList.add('text-secondary', 'font-semibold');
                link.setAttribute('aria-current', 'page');
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
            if (window.pageYOffset > 400) {
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
                    chip.classList.toggle('bg-primary');
                    chip.classList.toggle('text-on-primary');
                    chip.classList.toggle('border-primary');

                    const selected = Array.from(chips)
                        .filter(c => c.classList.contains('bg-primary'))
                        .map(c => c.textContent.trim());

                    if (scopeInput) scopeInput.value = selected.join(', ');
                });
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
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
                            c.classList.remove('bg-primary', 'text-on-primary');
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
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.closest('.accordion-item');
                if (!item) return;
                const isActive = item.classList.contains('active');
                
                // Toggle active class
                document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Initialize all modules on DOM ready
    function init() {
        initTheme();
        initActiveNav();
        initWorkFilter();
        initClipboardEmail();
        initAnimatedCounters();
        initBackToTop();
        bindCaseStudyTriggers();
        initContactForm();
        initProcessAccordions();

        // Bind Theme Toggle Buttons across page
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
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
