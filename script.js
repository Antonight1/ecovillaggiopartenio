// ===== Ecovillaggio Partenio - Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons (in case the inline script hasn't run yet)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    let lastScroll = 0;

    function updateHeaderScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', updateHeaderScroll, { passive: true });

    // ===== MOBILE MENU TOGGLE =====
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);

        // Replace icon markup each time (Lucide replaces <i> with <svg>)
        mobileMenuBtn.innerHTML = isOpen
            ? '<i data-lucide="x" class="w-6 h-6 text-natura-700"></i>'
            : '<i data-lucide="menu" class="w-6 h-6 text-natura-700"></i>';
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6 text-natura-700"></i>';
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });

    

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const resetFormBtn = document.getElementById('reset-form-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            // Clear previous errors
            clearFormErrors();

            // Validate form
            const isValid = validateForm();

            if (!isValid) {
                e.preventDefault();
                return;
            }

            // Show loading state
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span>Invio in corso...</span>
            `;
            submitBtn.disabled = true;

            // Form will submit normally to FormSubmit.co
            // No need for AJAX or simulation
        });
    }

    // Reset form
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            contactForm.reset();
            contactForm.classList.remove('hidden');
            successMessage.classList.add('hidden');
            clearFormErrors();
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // ===== FORM VALIDATION =====
    function validateForm() {
        let isValid = true;

        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const tipologia = document.getElementById('tipologia');
        const messaggio = document.getElementById('messaggio');
        const consenso = document.getElementById('consenso');

        // Validate nome
        if (!nome.value.trim()) {
            showError('nome', 'nome-error');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            showError('email', 'email-error');
            isValid = false;
        }

        // Validate tipologia
        if (!tipologia.value) {
            showError('tipologia', 'tipologia-error');
            isValid = false;
        }

        // Validate messaggio
        if (!messaggio.value.trim()) {
            showError('messaggio', 'messaggio-error');
            isValid = false;
        }

        // Validate consenso
        if (!consenso.checked) {
            document.getElementById('consenso-error').classList.remove('hidden');
            isValid = false;
        }

        // Scroll to first error
        if (!isValid) {
            const firstError = document.querySelector('.input-error');
            if (firstError) {
                firstError.focus();
            }
        }

        return isValid;
    }

    function showError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) input.classList.add('input-error');
        if (error) error.classList.remove('hidden');
    }

    function clearFormErrors() {
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        document.querySelectorAll('[id$="-error"]').forEach(el => {
            if (el.id !== 'consenso-error' || !el.classList.contains('hidden')) {
                el.classList.add('hidden');
            }
        });
        // Clear consenso error specifically
        const consensoError = document.getElementById('consenso-error');
        if (consensoError) consensoError.classList.add('hidden');
    }

    

    // ===== LAZY LOAD IMAGES =====
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1,
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => img.classList.add('loaded'));
    }

    // ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        }, { passive: true });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== INITIAL SETUP =====
    updateHeaderScroll();

    console.log('🌿 Ecovillaggio Partenio - Sito web inizializzato con successo!');
    console.log('📋 Pronto per ricevere richieste di informazioni.');
});