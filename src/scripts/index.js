/* ================================
   Main Scripts Entry Point
   Import and initialize all features
   ================================ */

import { initMenu } from './features/menu.js';
import { initCarousel } from './features/carousel.js';
import { initFooter } from './features/footer.js';

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initCarousel();
    initFooter();
});
