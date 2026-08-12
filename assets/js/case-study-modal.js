/**
 * Case Study Modal Module
 * Handles modal open/close, focus management, and toast alerts.
 */

// Helper to resolve project data across window object or local data
function getProjectsList() {
    if (typeof window.ProjectController !== 'undefined' && Array.isArray(window.ProjectController.projects)) {
        return window.ProjectController.projects;
    }
    if (typeof window.PortfolioApp !== 'undefined' && window.PortfolioApp.PROJECTS) {
        return Object.values(window.PortfolioApp.PROJECTS);
    }
    if (typeof projectsData !== 'undefined' && Array.isArray(projectsData)) {
        return projectsData;
    }
    return [];
}

function findProjectById(id) {
    const projects = getProjectsList();
    if (!id) return null;
    const cleanId = String(id).toLowerCase().replace(/^project-/, '');
    return projects.find(p => {
        const pId = String(p.id).toLowerCase().replace(/^project-/, '');
        return pId === cleanId || String(p.id).toLowerCase() === String(id).toLowerCase();
    }) || null;
}

// Toast Notification System
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 24px;
                right: 24px;
                left: 24px;
                max-width: calc(100% - 48px);
                background: #1e3a8a;
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                animation: slideInRight 0.3s ease-out forwards, 
                           fadeOut 0.3s ease-in 2.7s forwards;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Focus Management Utilities
function focusFirstVisibleItem(modal) {
    const focusableSelectors = [
        '[tabindex="0"]',
        'button:not([disabled])',
        'a[href]',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])'
    ].join(', ');

    const focusableElements = modal.querySelectorAll(focusableSelectors);
    if (focusableElements.length > 0) {
        let firstVisible = null;
        for (let el of focusableElements) {
            if (getComputedStyle(el).display !== 'none' && 
                getComputedStyle(el).visibility !== 'hidden') {
                firstVisible = el;
                break;
            }
        }
        if (firstVisible) {
            firstVisible.focus();
        } else {
            modal.querySelector('[tabindex="0"]')?.focus() || modal.focus();
        }
    }
}

function restoreFocus(originalElement, modal) {
    if (originalElement && typeof originalElement.focus === 'function') {
        document.activeElement.blur();
        requestAnimationFrame(() => originalElement.focus());
    } else if (modal) {
        const buttons = modal.querySelectorAll('button');
        if (buttons.length > 0) {
            buttons[0].focus();
        }
    }
}

// Global modal closer function
function closeModalElement(modalOrId, triggerElement) {
    let container = null;
    if (typeof modalOrId === 'string') {
        const el = document.getElementById(modalOrId);
        container = el ? (el.closest('.fixed') || el.parentElement) : null;
    } else if (modalOrId && modalOrId.nodeType) {
        container = modalOrId.closest('.fixed') || modalOrId.parentElement;
    }
    
    if (!container) {
        container = document.querySelector('.case-study-modal-container') || document.querySelector('#case-study-modal');
    }

    if (container) {
        container.classList.remove('opacity-100');
        container.classList.add('opacity-0');
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
            document.body.style.overflow = '';
        }, 300);
    }

    if (triggerElement) {
        restoreFocus(triggerElement, null);
    }
}

// Modal Open Function
function openCaseStudy(projectOrId, triggerElement) {
    let project = typeof projectOrId === 'object' ? projectOrId : findProjectById(projectOrId);
    if (!project) {
        project = {
            id: projectOrId || 'case-study',
            title: typeof projectOrId === 'string' ? projectOrId.toUpperCase() : 'Case Study',
            subtitle: 'Project Showcase & Systems Overview',
            overview: 'Detailed exploration of design architecture, interaction patterns, and visual systems.',
            deliverables: ['Design System', 'UI/UX Guidelines', 'Prototypes'],
            role: 'Lead Designer'
        };
    }

    // Delegate to PortfolioApp if available
    if (typeof window.PortfolioApp !== 'undefined' && typeof window.PortfolioApp.openCaseStudy === 'function' && typeof projectOrId === 'string') {
        window.PortfolioApp.openCaseStudy(projectOrId);
        return;
    }

    const projectId = project.id || 'case-study';
    let container = document.getElementById(`modal-container-${projectId}`);
    
    if (!container) {
        container = document.createElement('div');
        container.id = `modal-container-${projectId}`;
        container.className = 'case-study-modal-container fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md opacity-0 transition-opacity duration-300';
        
        const modal = document.createElement('div');
        modal.className = 'case-study-modal w-full max-w-5xl bg-surface dark:bg-slate-900 text-on-surface dark:text-white rounded-xl shadow-2xl overflow-hidden relative border border-outline/10 p-6 md:p-8 max-h-[90vh] overflow-y-auto';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', `modal-title-${projectId}`);
        modal.setAttribute('data-project', projectId);
        
        modal.innerHTML = `
            <div class="flex justify-between items-center mb-6 pb-4 border-b border-outline/10">
                <div>
                    <span class="text-xs uppercase tracking-widest text-secondary font-semibold">${project.category || 'Case Study'}</span>
                    <h2 id="modal-title-${projectId}" class="text-2xl md:text-4xl font-bold mt-1">${project.title}</h2>
                </div>
                <button data-close="true" class="w-10 h-10 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-secondary hover:text-white flex items-center justify-center transition-colors">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            ${project.image ? `<div class="w-full aspect-video rounded-lg overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800"><img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover"></div>` : ''}
            <div class="space-y-4">
                <p class="text-lg italic text-on-surface-variant">${project.subtitle || ''}</p>
                <p class="text-base leading-relaxed">${project.overview || project.description || ''}</p>
                ${project.deliverables ? `<div class="mt-4"><h4 class="text-xs uppercase tracking-wider font-bold mb-2">Deliverables</h4><p class="text-sm">${Array.isArray(project.deliverables) ? project.deliverables.join(', ') : project.deliverables}</p></div>` : ''}
            </div>
        `;
        
        container.appendChild(modal);
        document.body.appendChild(container);
    }

    document.body.style.overflow = 'hidden';

    const closeBtns = container.querySelectorAll('[data-close="true"]');
    closeBtns.forEach(btn => {
        btn.onclick = () => closeModalElement(container, triggerElement);
    });

    container.onclick = (e) => {
        if (e.target === container) closeModalElement(container, triggerElement);
    };

    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModalElement(container, triggerElement);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    requestAnimationFrame(() => {
        container.classList.remove('opacity-0');
        container.classList.add('opacity-100');
    });

    setTimeout(() => {
        focusFirstVisibleItem(container);
    }, 50);

    showToast(`Case Study: ${project.title}`);
}

function closeCaseStudy(modalId, triggerElement) {
    closeModalElement(modalId, triggerElement);
}

// Bind Case Study Triggers from project cards
function bindCaseStudyTriggers() {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-case-study], [data-case-study]');
        if (trigger) {
            e.preventDefault();
            const projectId = trigger.getAttribute('data-open-case-study') || trigger.getAttribute('data-case-study');
            openCaseStudy(projectId, trigger);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const trigger = e.target.closest('[data-open-case-study], [data-case-study]');
            if (trigger) {
                e.preventDefault();
                const projectId = trigger.getAttribute('data-open-case-study') || trigger.getAttribute('data-case-study');
                openCaseStudy(projectId, trigger);
            }
        }
    });
}

// Initialize Modal Module
function initModal() {
    bindCaseStudyTriggers();
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }
}

// Export public API
window.CaseStudyModalAPI = {
    init: initModal,
    openCaseStudy: openCaseStudy,
    closeCaseStudy: closeCaseStudy,
    bindCaseStudyTriggers: bindCaseStudyTriggers,
    showToast: showToast,
    focusFirstVisibleItem: focusFirstVisibleItem,
    restoreFocus: restoreFocus
};

