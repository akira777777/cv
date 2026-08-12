/**
 * Case Study Modal Module
 * Handles modal open/close, focus management, and toast alerts.
 */

// DOM Elements Cache
let domCache = null;

function getDomCache() {
    if (!domCache) {
        domCache = {
            modals: document.querySelectorAll('.case-study-modal'),
            backdrop: document.getElementById('modal-backdrop') || document.body,
            closeButtons: document.querySelectorAll('[data-close="true"]')
        };
    }
    return domCache;
}

// Toast Notification System
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Add animation styles if not present
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
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Auto-remove after 3 seconds
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
        // Find first visible element in DOM order
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
        // Remove focus from modal before restoring
        document.activeElement.blur();
        requestAnimationFrame(() => originalElement.focus());
    } else if (modal) {
        // Fallback: restore to first button in modal
        const buttons = modal.querySelectorAll('button');
        if (buttons.length > 0) {
            buttons[0].focus();
        }
    }
}

// Modal Open/Close Functions
function openCaseStudy(project, triggerElement) {
    // Find or create modal for this project
    let modal = document.querySelector(`.case-study-modal[data-project="${project.id}"]`);
    
    if (!modal) {
        // Create modal dynamically (simplified version from app.js)
        const container = document.createElement('div');
        container.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4';
        container.id = `modal-${project.id}`;
        
        modal = document.createElement('div');
        modal.className = 'case-study-modal w-full max-w-5xl bg-surface dark:bg-surface-container rounded-lg shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', `modal-title-${project.id}`);
        modal.setAttribute('data-project', project.id);
        
        // Modal header
        const header = document.createElement('div');
        header.className = 'flex justify-between items-center p-6 border-b border-outline/10';
        
        const title = document.createElement('h2');
        title.id = `modal-title-${project.id}`;
        title.className = 'font-headline-lg text-headline-lg font-semibold';
        title.textContent = project.title;
        
        header.appendChild(title);
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('data-close', 'true');
        closeBtn.className = 'flex items-center justify-center w-8 h-8 rounded-full bg-surface-contra hover:bg-surface-hover dark:hover:bg-surface-container-low transition-colors';
        closeBtn.innerHTML = '<span class="material-symbols-outlined text-sm">close</span>';
        
        header.appendChild(closeBtn);
        modal.appendChild(header);

        // Modal content (placeholder - would contain full project details)
        const content = document.createElement('div');
        content.className = 'p-6';
        content.innerHTML = `
            <h3 id="modal-subtitle-${project.id}" class="font-body-lg text-on-surface-variant italic mb-4">
                ${project.subtitle}
            </h3>
            <p class="font-body-md text-body-md mb-6">
                ${project.overview}
            </p>
        `;
        
        modal.appendChild(content);
        
        // Backdrop click to close
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 cursor-pointer';
        backdrop.setAttribute('data-close', 'true');
        
        container.appendChild(modal);
        container.appendChild(backdrop);
        document.body.appendChild(container);

        // Add close button to modal header
        const newHeader = modal.querySelector('.flex.justify-between') || header;
        if (newHeader && !modal.querySelector('[data-close="true"]')) {
            const btnContainer = document.createElement('div');
            btnContainer.className = 'absolute top-4 right-4';
            btnContainer.appendChild(closeBtn);
            modal.prepend(btnContainer);
        }
    }

    // Show modal with animation
    const backdrop = modal.parentElement;
    
    // Add focus trap listeners (simplified)
    function handleTabKey(e) {
        if (e.key !== 'Tab') return;
        
        const focusableElements = modal.querySelectorAll(
            '[tabindex="0"], button:not([disabled]), a[href], input:not([disabled])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // Event listeners for this modal
    const closeBtns = modal.querySelectorAll('[data-close="true"]');
    
    function closeModal() {
        backdrop.classList.remove('opacity-100');
        
        setTimeout(() => {
            if (backdrop.parentNode) {
                backdrop.parentNode.remove();
            }
        }, 300);

        // Restore focus to trigger element or first button in modal
        restoreFocus(triggerElement, modal);
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
    });

    // Close on Escape key
    function handleEscape(e) {
        if (e.key === 'Escape') closeModal();
    }

    modal.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscape);

    // Trigger animation
    requestAnimationFrame(() => {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
    });

    // Focus management: focus first element in modal or modal itself
    setTimeout(() => {
        if (modal.querySelector('[tabindex="0"]')) {
            modal.querySelector('[tabindex="0"]').focus();
        } else {
            modal.focus();
        }
    }, 100);

    // Show toast for accessibility
    showToast(`Opening case study: ${project.title}`);
}

function closeCaseStudy(modalId, triggerElement) {
    const modal = document.getElementById(modalId);
    
    if (!modal) return;

    const backdrop = modal.parentElement;
    const closeBtns = modal.querySelectorAll('[data-close="true"]');

    // Remove event listeners to prevent memory leaks
    closeBtns.forEach(btn => {
        btn.removeEventListener('click', () => {});
    });
    
    backdrop.removeEventListener('click', (e) => {
        if (e.target === backdrop) closeModal(modal, backdrop);
    });

    modal.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal(modal, backdrop);
    });

    // Close animation and cleanup
    backdrop.classList.remove('opacity-100');
    
    setTimeout(() => {
        if (backdrop.parentNode) {
            backdrop.parentNode.remove();
        }
        
        // Restore focus to trigger element
        restoreFocus(triggerElement, modal);
        
        // Remove Escape key listener from document scope
        const escHandler = (e) => {
            if (e.key === 'Escape') closeModal(modal, backdrop);
        };
        document.removeEventListener('keydown', escHandler);
    }, 300);

    showToast(`Closing case study: ${modalId.replace('modal-', '')}`);
}

// Bind Case Study Triggers from project cards
function bindCaseStudyTriggers() {
    const triggers = document.querySelectorAll('[data-open-case-study]');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = trigger.getAttribute('data-open-case-study');
            const project = projectsData.find(p => p.id === projectId);
            
            if (project) {
                openCaseStudy(project, trigger);
            } else {
                console.warn(`Project "${projectId}" not found`);
            }
        });

        // Keyboard accessibility: Enter/Space to open
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = trigger.getAttribute('data-open-case-study');
                const project = projectsData.find(p => p.id === projectId);
                
                if (project) {
                    openCaseStudy(project, trigger);
                }
            }
        });
    });
}

// Initialize Modal Module
function initModal() {
    bindCaseStudyTriggers();
    
    // Bind close buttons that exist in the DOM
    const existingCloseButtons = document.querySelectorAll('[data-close="true"]');
    existingCloseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find parent modal and close it
            const modal = btn.closest('.case-study-modal, .modal-backdrop, [role="dialog"]');
            if (modal) {
                closeModal(modal.id, modal);
            }
        });
    });
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
