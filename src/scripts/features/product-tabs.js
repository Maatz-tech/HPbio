/* ================================
   Product Tabs Feature
   Handles specification tabs switching
   ================================ */

export function initProductTabs() {
    const tabsContainer = document.querySelector('.product-tabs');
    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll('.product-tab');
    const panels = document.querySelectorAll('.product-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = `tab-${tab.dataset.tab}`;

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Remove active class from all panels
            panels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Add active class to target panel
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}
