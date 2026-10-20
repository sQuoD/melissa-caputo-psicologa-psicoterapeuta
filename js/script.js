document.addEventListener("DOMContentLoaded", function() {
    // Chi ha chiesto al sistema di ridurre le animazioni non le vede
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Animazione all'entrata per elementi con classe .fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // 2. Intersection Observer per apparizione graduale delle card e sezioni
    //    (la hero è esclusa: è già visibile all'apertura della pagina)
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('fade-in-visible');
                    observer.unobserve(el); // Anima solo una volta

                    // A fine animazione tolgo le classi, così l'effetto hover delle card torna reattivo
                    el.addEventListener('transitionend', function fine(e) {
                        if (e.target !== el) return; // ignoro le transizioni degli elementi interni
                        el.classList.remove('fade-prepare', 'fade-in-visible');
                        el.removeEventListener('transitionend', fine);
                    });
                }
            });
        }, observerOptions);

        // Applichiamo l'observer alle card e alle sezioni
        document.querySelectorAll('.custom-card, main section:not(.hero)').forEach(el => {
            el.classList.add('fade-prepare');
            observer.observe(el);
        });
    }

    // 3. Pulsanti "Copia" (es. indirizzo email nella pagina Contatti)
    document.querySelectorAll('[data-copy]').forEach(btn => {
        const originale = btn.innerHTML;
        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(btn.dataset.copy);
                btn.innerHTML = '<i class="fas fa-check me-1" aria-hidden="true"></i> Copiato!';
            } catch (e) {
                btn.textContent = 'Copia non riuscita';
            }
            setTimeout(() => { btn.innerHTML = originale; }, 2000);
        });
    });

    // 4. Anno del copyright sempre aggiornato
    const anno = document.getElementById('anno-corrente');
    if (anno) {
        anno.textContent = new Date().getFullYear();
    }
});
