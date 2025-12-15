/* ================================
   Footer Expandable Sections
   ================================ */

export function initFooter() {
    const expandableColumns = document.querySelectorAll('.footer-column-expandable');

    expandableColumns.forEach(column => {
        const header = column.querySelector('.footer-column-header');

        if (header) {
            header.addEventListener('click', () => {
                // Only toggle on mobile (check if arrow is visible)
                const arrow = header.querySelector('.footer-expand-arrow');
                if (arrow && window.getComputedStyle(arrow).display === 'none') {
                    return;
                }

                const isExpanded = column.classList.contains('expanded');

                // Toggle expanded state
                column.classList.toggle('expanded');
                header.setAttribute('aria-expanded', !isExpanded);
            });
        }
    });
}
