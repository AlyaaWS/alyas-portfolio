document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar & Scroll Styling
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 2. Active Navigation Indicator
        let current = '';
        const sections = document.querySelectorAll('section, header');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` && !link.classList.contains('nav-cta')) {
                link.classList.add('active');
            }
        });
    });

    // 3. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }

    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // 4. Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Auto-Scroll Projects Slider
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        let slideTimer;

        const autoSlide = () => {
            // Find the width of one card + gap (30px)
            const firstCard = projectsGrid.querySelector('.project-card');
            if (!firstCard) return;
            const cardWidth = firstCard.offsetWidth + 30; 
            const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;

            // Allow small margin of error for fractional pixels
            if (projectsGrid.scrollLeft >= maxScroll - 10) {
                // If at the end, smoothly scroll back to the first item
                projectsGrid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Otherwise scroll to the next item
                projectsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        };

        // Start sliding every 2 seconds
        slideTimer = setInterval(autoSlide, 2000);

        // Pause sliding when user interacts (hover or touch)
        projectsGrid.addEventListener('mouseenter', () => clearInterval(slideTimer));
        projectsGrid.addEventListener('mouseleave', () => {
            slideTimer = setInterval(autoSlide, 2000);
        });
        
        projectsGrid.addEventListener('touchstart', () => clearInterval(slideTimer), {passive: true});
        projectsGrid.addEventListener('touchend', () => {
            slideTimer = setInterval(autoSlide, 2000);
        }, {passive: true});
    }
});
