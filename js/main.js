// ========================
// MENU MOBILE
// ========================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
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
const carouselDots = document.getElementById('carouselDots');

// Créer les points du carrousel
if (testimonialCards.length > 0) {
    const carouselDotsEl = document.getElementById('carouselDots'); // Assurez-vous que cet ID existe dans votre HTML
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

    // Auto-rotation du carrousel (optionnel - toutes les 5 secondes)
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
const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta):not(.nav-phone)');

function highlightNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Gère les liens vers la page elle-même (ex: /#services -> services)
        let linkHref = link.getAttribute('href');
        // Supprime le premier '/' s'il existe et vérifie si le lien correspond à l'ID de la section
        if (linkHref.startsWith('/')) {
            linkHref = linkHref.slice(1);
        }
        if (linkHref.slice(1) === current) { // linkHref.slice(1) enlève le '#'
            link.classList.add('active');
        }
        // Gère le cas où le lien est vers la page d'accueil (ex: /)
        if (current === '' && linkHref === '/') { 
             link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==========================================================
// FORMULAIRE CONTACT - SECTION COMMENTÉE POUR ÉVITER LE CONFLIT
// avec le formulaire de devis plus complexe dans le HTML.
// Décommentez et adaptez cette section si vous avez un formulaire
// de contact simple sur une autre page (ex: /contact.html)
// ==========================================================
/*
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            nom: document.getElementById('nom').value,
            telephone: document.getElementById('telephone').value,
            email: document.getElementById('email').value,
            // ATTENTION: Les IDs 'service', 'ville', etc. doivent exister dans le HTML.
            // Si cette page utilise des checkboxes (comme la page devis), 
            // la logique ci-dessous doit être remplacée.
            service: document.getElementById('service').value, 
            ville: document.getElementById('ville').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Validation basique
        if (!formData.nom || !formData.telephone || !formData.email) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // Email regex simple
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }

        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Merci ! Votre devis a bien été envoyé. Nous vous recontacterons dans les 48h.');
                contactForm.reset();
            } else {
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
}
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
