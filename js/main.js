document.addEventListener('DOMContentLoaded', () => {

    // ========================
    // MENU MOBILE & DROPDOWN
    // ========================

    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const isMobile = () => window.innerWidth <= 991; // Définit la taille mobile basée sur le CSS

    if (mobileToggle && navMenu) {
        // 1. GESTION DU MENU PRINCIPAL
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');

            // Fermer tous les dropdowns lorsque le menu principal est fermé
            if (!navMenu.classList.contains('active')) {
                dropdownToggles.forEach(toggle => {
                    toggle.classList.remove('active');
                    const dropdownContent = toggle.nextElementSibling;
                    if (dropdownContent) dropdownContent.style.display = 'none';
                });
            }
        });

        // Fermer le menu principal quand on clique sur un lien (sauf les dropdown-toggle)
        const navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMobile()) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        });

        // 2. GESTION DES MENUS DÉROULANTS (MOBILE)
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const dropdownContent = toggle.nextElementSibling;
                
                // Si l'on est en mode mobile
                if (isMobile()) {
                    e.preventDefault();

                    // Fermer les autres sous-menus ouverts
                    document.querySelectorAll('.dropdown-toggle').forEach(otherToggle => {
                        if (otherToggle !== toggle) {
                            otherToggle.classList.remove('active');
                            const otherContent = otherToggle.nextElementSibling;
                            if (otherContent) otherContent.style.display = 'none';
                        }
                    });

                    // Basculer l'affichage de l'élément actuel
                    toggle.classList.toggle('active');
                    if (dropdownContent.style.display === 'block') {
                        dropdownContent.style.display = 'none';
                    } else {
                        dropdownContent.style.display = 'block';
                    }
                }
                // Sur desktop, le lien parent reste cliquable, le dropdown est géré par CSS hover.
            });
        });
    }

    // ========================
    // CARROUSEL AVIS CLIENTS
    // ========================

    let currentTestimonial = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDotsEl = document.getElementById('carouselDots');

    if (testimonialCards.length > 0) {
        // Créer les points du carrousel
        if (carouselDotsEl) { 
            testimonialCards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('data-index', index);
                dot.addEventListener('click', () => goToTestimonial(index));
                carouselDotsEl.appendChild(dot);
            });
        }

        // Fonction pour aller à un témoignage spécifique
        function goToTestimonial(index) {
            testimonialCards.forEach((card, i) => {
                card.classList.remove('hidden');
                if (i !== index) {
                    card.classList.add('hidden');
                }
            });

            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });

            currentTestimonial = index;
        }

        // Bouton précédent
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
                goToTestimonial(currentTestimonial);
            });
        }

        // Bouton suivant
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                goToTestimonial(currentTestimonial);
            });
        }

        // Auto-rotation du carrousel
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            goToTestimonial(currentTestimonial);
        }, 5000);
    }

    // ========================
    // ACCORDÉON FAQ
    // ========================

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isOpen = question.classList.contains('active');

            // Fermer tous les autres éléments (mode accordéon exclusif)
            document.querySelectorAll('.faq-question').forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    const otherAnswer = q.parentElement.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.classList.remove('open');
                }
            });

            // Toggle de l'élément actuel
            question.classList.toggle('active');
            if (faqAnswer) faqAnswer.classList.toggle('open');
        });
    });

    // ========================
    // ANIMATIONS AU SCROLL
    // ========================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.badge-card, .service-card, .zone-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // ========================
    // EFFETS DE PARALLAX
    // ========================

    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (hero) {
                hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
            }
        });
    }

    // ========================
    // SMOOTH SCROLL
    // ========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================
    // ACTIVE STATE NAVIGATION
    // ========================

    const sections = document.querySelectorAll('section');
    const mainNavLinks = document.querySelectorAll('.nav-menu > li > a.nav-link:not(.nav-link-cta):not(.nav-phone)');

    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Utiliser la section ID pour déterminer la section courante
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        mainNavLinks.forEach(link => {
            link.classList.remove('active');
            
            let linkHref = link.getAttribute('href');
            // Gère les liens vers la page elle-même (ex: /#services -> services)
            if (linkHref.startsWith('/')) {
                linkHref = linkHref.slice(1);
            }

            // Pour l'accueil
            if (linkHref === '/' && current === 'hero') {
                link.classList.add('active');
            }
            // Pour les liens ancres (ex: #zones)
            if (linkHref.startsWith('#')) {
                if (linkHref.slice(1) === current) { 
                    link.classList.add('active');
                }
            }
            // Pour les liens de page (ex: /services/)
            if (linkHref.endsWith('/') && linkHref.slice(1, -1) === current) {
                link.classList.add('active');
            }
            
            // Si la section courante correspond au début de l'un des dropdowns (ex: 'services')
            const parentLi = link.closest('.dropdown');
            if (parentLi && current && current.startsWith(linkHref.slice(1))) {
                link.classList.add('active');
            }
            
            // Correction pour le lien "Accueil" (/) quand il n'y a pas d'ID
            if (linkHref === '/' && scrollY < 200) { 
                 // Supposition : l'accueil est en haut de la page.
                link.classList.add('active');
            }

        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Initial call to highlight the current section on load
    highlightNavLink(); 

    // ==========================================================
    // FORMULAIRE CONTACT - SECTION COMMENTÉE...
    // ==========================================================
    /*
    const contactForm = document.getElementById('contactForm');
    
    // ... (votre logique de formulaire ici) ...
    */
    // ========================
    // FIN FORMULAIRE CONTACT
    // ========================


    // ========================
    // AFFICHAGE DE L'ANNÉE ACTUELLE
    // ========================

    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} ER Rénovation - Tous droits réservés`;
    }

    // ========================
    // DEBOUNCE POUR OPTIMISATION
    // ========================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ========================
    // SCROLL INDICATOR
    // ========================

    window.addEventListener('scroll', debounce(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Vous pouvez utiliser scrollPercent pour une barre de progression si nécessaire
    }, 100));

    // ========================
    // ACCESSIBLE - FOCUS MANAGEMENT
    // ========================

    // Ajouter un outline visible pour l'accessibilité clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // ========================
    // LOG INITIALISATION
    // ========================

    console.log('ER Rénovation - Site chargé avec succès');
    console.log('Version: 1.0.0');
    console.log('Entreprise: ER Rénovation - Passy, 74190');

});
