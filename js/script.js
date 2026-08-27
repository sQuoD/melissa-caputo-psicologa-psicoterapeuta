document.addEventListener("DOMContentLoaded", function() {
    // 1. Animazione all'entrata per elementi con classe .fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // 2. Intersection Observer per apparizione graduale delle card e sezioni
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Anima solo una volta
            }
        });
    }, observerOptions);

    // Applichiamo l'observer alle card e alle sezioni
    document.querySelectorAll('.custom-card, section').forEach(el => {
        el.classList.add('fade-prepare');
        observer.observe(el);
    });

    // 3. Smooth scroll per la freccia nella hero
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            const servicesSection = document.getElementById('servizi');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
