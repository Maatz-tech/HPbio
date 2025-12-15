/* ================================
   Hero Carousel Functionality
   ================================ */

export function initCarousel() {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const heroText = document.querySelector('.hero-text');
    const heroTitleLight = heroText?.querySelector('.hero-title-light');
    const heroTitleBold = heroText?.querySelector('.hero-title-bold');
    const heroDescription = heroText?.querySelector('p');

    if (carouselSlides.length > 0) {
        let currentSlide = 0;
        let autoPlayInterval = null;
        let isPaused = false;

        function updateHeroText(slide) {
            if (!heroText) return;

            const titleLight = slide.dataset.titleLight || '';
            const titleBold = slide.dataset.titleBold || '';
            const description = slide.dataset.description || '';

            if (heroTitleLight) heroTitleLight.textContent = titleLight;
            if (heroTitleBold) heroTitleBold.textContent = titleBold;
            if (heroDescription) heroDescription.textContent = description;
        }

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

            // Update hero text
            updateHeroText(carouselSlides[currentSlide]);
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Auto-play functionality - always clear before setting new interval
        function startAutoPlay() {
            if (isPaused) return;
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            if (autoPlayInterval !== null) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Reset timer after manual navigation
        function resetAutoPlay() {
            stopAutoPlay();
            if (!isPaused) {
                autoPlayInterval = setInterval(nextSlide, 5000);
            }
        }

        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoPlay();
            });
        }

        // Start auto-play
        startAutoPlay();

        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                isPaused = true;
                stopAutoPlay();
            });
            carouselContainer.addEventListener('mouseleave', () => {
                isPaused = false;
                startAutoPlay();
            });
        }
    }
}
