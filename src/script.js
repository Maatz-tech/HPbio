const menuToggle = document.querySelector('.menu-toggle');
const sideMenu = document.querySelector('.side-menu');

menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
})

//fechar ao clicar nos links
const menuLinks = document.querySelectorAll('.menu-list a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

//funcionalidade tab
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab =>{
    tab.addEventListener('click', () => {
        //remove active de todas
        tabs.forEach(t => t.classList.remove('active'));
        //Adiciona active na clicada
        tab.classList.add('active');
    });
});