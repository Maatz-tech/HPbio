/* ================================
   Menu Functionality
   ================================ */

export function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    const backdrop = document.querySelector('.backdrop');
    const menuClose = document.querySelector('.side-menu-close');

    if (menuToggle && sideMenu && backdrop) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            backdrop.classList.toggle('active');
        });

        // Fechar ao clicar no botão close
        if (menuClose) {
            menuClose.addEventListener('click', () => {
                sideMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                backdrop.classList.remove('active');
            });
        }

        // Fechar ao clicar nos links
        const menuLinks = document.querySelectorAll('.menu-list a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                sideMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                backdrop.classList.remove('active');
            });
        });

        // Fechar ao clicar no backdrop
        backdrop.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            backdrop.classList.remove('active');
        });
    }

    // Dropdown menus expansíveis
    const expansionToggles = document.querySelectorAll('.expansion-toggle');
    expansionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.closest('.side-menu-expansion-content').classList.toggle('active');
        });
    });
}
