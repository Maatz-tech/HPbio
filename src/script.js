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

    //fechar ao clicar no botão close
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            backdrop.classList.remove('active');
        });
    }

    //fechar ao clicar nos links
    const menuLinks = document.querySelectorAll('.menu-list a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            backdrop.classList.remove('active');
        });
    });

    //fechar ao clicar no backdrop
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

// Hero Carousel
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

if (carouselSlides.length > 0) {
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
        // Remove active class from all slides
        carouselSlides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Handle wraparound
        if (index >= carouselSlides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = carouselSlides.length - 1;
        } else {
            currentSlide = index;
        }

        // Add active class to current slide
        carouselSlides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    // Start auto-play
    startAutoPlay();

    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
}