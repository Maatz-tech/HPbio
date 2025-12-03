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

// Carrossel de imagens
const carouselImages = document.querySelectorAll('.carousel-image');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (carouselImages.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;


function showImage(index) {
    carouselImages.forEach(img => img.classList.remove('active'));
    carouselImages[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    showImage(currentIndex);
});
}

// Dropdown menu Neurocirurgia
const neurocirurgiaItem = document.querySelector('.side-menu-neurocirurgia-content');

neurocirurgiaItem.addEventListener('click', function(e) {
    // Só ativa/desativa se clicar no item principal, não nos links do submenu
    if (e.target.tagName !== 'A' || e.target.getAttribute('href') === '#neurocirurgia') {
        e.preventDefault();
        this.classList.toggle('active');
    }
});
