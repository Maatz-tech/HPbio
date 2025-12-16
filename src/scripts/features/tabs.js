/* ================================
   Tabs Component
   Handles tab switching for all .tabs containers
   ================================ */

export function initTabs() {
    const tabsContainers = document.querySelectorAll('.tabs');
    if (!tabsContainers.length) return;

    tabsContainers.forEach(tabsContainer => {
        const tabs = tabsContainer.querySelectorAll('.tab');

        // Find the parent section to scope the tab-content panels
        const section = tabsContainer.closest('section') || tabsContainer.parentElement;
        const panels = section.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = `tab-${tab.dataset.tab}`;

                // Remove active class from all tabs in this container
                tabs.forEach(t => t.classList.remove('active'));

                // Remove active class from all panels in this section
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
    });
}
