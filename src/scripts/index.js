/* ================================
   Main Scripts Entry Point
   Import and initialize all features
   ================================ */

import { initMenu } from './features/menu.js';
import { initCarousel } from './features/carousel.js';
import { initFooter } from './features/footer.js';
import { initTabs } from './features/tabs.js';
import { initContactForm } from './features/contact-form.js';

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initCarousel();
    initFooter();
    initTabs();
    initContactForm();
});
