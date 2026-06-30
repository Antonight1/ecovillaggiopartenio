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

        // Update icon based on state
        const icon = mobileMenuBtn.querySelector('i');
        if (isOpen) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
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

    // ===== FORM REDIRECT AFTER SUBMISSION =====
    // Check if form was submitted successfully (FormSubmit.co redirects back)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        // Show success message if redirected from FormSubmit.co
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.getElementById('success-message');
        if (contactForm && successMessage) {
            contactForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            successMessage.classList.add('animate-fade-in-up');
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Re-initialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
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

    // ===== CALENDARIO INTERATTIVO =====
    const calGrid = document.getElementById('cal-grid');
    const calMonthYear = document.getElementById('cal-month-year');
    const calPrev = document.getElementById('cal-prev');
    const calNext = document.getElementById('cal-next');
    const calTooltip = document.getElementById('cal-tooltip');
    const calTooltipDate = document.getElementById('cal-tooltip-date');
    const calTooltipEvents = document.getElementById('cal-tooltip-events');
    const calTooltipClose = document.getElementById('cal-tooltip-close');
    

    let currentDate = new Date(); // Oggi
    let selectedDay = null; // Giorno selezionato per il tooltip

    // Eventi predefiniti (statici per demo) - formato: 'YYYY-MM-DD' => [{ titolo, tipo }]
    const eventiPredefiniti = {
        '2025-06-21': [{ titolo: 'Festa del Solstizio d\'Estate 🌞', tipo: 'festival' }],
        '2025-06-22': [{ titolo: 'Laboratorio Artigianale', tipo: 'mercato' }],
        '2025-07-05': [{ titolo: 'Concerto sotto le Stelle 🎵', tipo: 'concerto' }],
        '2025-07-06': [{ titolo: 'Mercato dell\'Artigianato', tipo: 'mercato' }],
        '2025-07-12': [{ titolo: 'Concerto sotto le Stelle', tipo: 'concerto' }],
        '2025-07-19': [{ titolo: 'Concerto sotto le Stelle', tipo: 'concerto' }],
        '2025-07-26': [{ titolo: 'Concerto sotto le Stelle', tipo: 'concerto' }],
        '2025-08-02': [{ titolo: 'Concerto sotto le Stelle', tipo: 'concerto' }],
        '2025-08-03': [{ titolo: 'Mercato dell\'Artigianato', tipo: 'mercato' }],
        '2025-08-10': [{ titolo: 'Festa di Mezza Estate 🌻', tipo: 'festival' }],
        '2025-08-15': [{ titolo: 'Ferragosto in Musica', tipo: 'concerto' }],
        '2025-09-07': [{ titolo: 'Mercato dell\'Artigianato', tipo: 'mercato' }],
        '2025-09-21': [{ titolo: 'Festa del Raccolto Autunnale 🍇', tipo: 'festival' }],
        '2025-10-05': [{ titolo: 'Mercato dell\'Artigianato', tipo: 'mercato' }],
        '2025-12-21': [{ titolo: 'Festa del Solstizio d\'Inverno ❄️', tipo: 'festival' }],
    };

    function getEventiGiorno(dateStr) {
        return eventiPredefiniti[dateStr] || [];
    }

    function getTipoColore(tipo) {
        switch (tipo) {
            case 'festival': return 'bg-terra-500';
            case 'concerto': return 'bg-cielo-500';
            case 'mercato': return 'bg-purple-500';
            default: return 'bg-green-400';
        }
    }

    function renderCalendario(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        // Lunedì come primo giorno (getDay: 0=domenica, 1=lunedì...)
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6; // Domenica diventa 6
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        calMonthYear.textContent = date.toLocaleString('it-IT', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase());

        let html = '';
        // Giorni vuoti prima del primo giorno
        for (let i = 0; i < startDay; i++) {
            html += '<div></div>';
        }
        // Giorni del mese
        for (let d = 1; d <= daysInMonth; d++) {
            const cellDate = new Date(year, month, d);
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const isToday = cellDate.getTime() === today.getTime();
            const eventi = getEventiGiorno(dateStr);
            const hasEventi = eventi.length > 0;
            let dotHtml = '';
            if (hasEventi) {
                // Mostra fino a 3 pallini, poi un "+"
                const maxDots = 3;
                const tipi = [...new Set(eventi.map(e => e.tipo))];
                const dots = tipi.slice(0, maxDots);
                dotHtml = dots.map(tipo => `<span class="w-2 h-2 rounded-full ${getTipoColore(tipo)} inline-block ml-0.5 first:ml-0"></span>`).join('');
                if (tipi.length > maxDots) dotHtml += '<span class="text-[10px] leading-none text-white/80 ml-0.5">+</span>';
            }
            html += `
                <button 
                    class="cal-day relative w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all
                    ${isToday ? 'bg-white/20 ring-2 ring-terra-400' : 'bg-white/5 hover:bg-white/15'}
                    ${hasEventi ? 'cursor-pointer font-semibold' : 'cursor-pointer'}"
                    data-date="${dateStr}"
                    aria-label="${d} ${date.toLocaleString('it-IT', { month: 'long' })}${hasEventi ? ', ci sono eventi' : ''}"
                >
                    <span class="text-sm ${isToday ? 'text-white font-bold' : 'text-white/90'}">${d}</span>
                    ${dotHtml ? `<div class="flex items-center mt-1">${dotHtml}</div>` : ''}
                </button>`;
        }
        calGrid.innerHTML = html;

        // Riassegna event listener ai giorni
        calGrid.querySelectorAll('.cal-day').forEach(btn => {
            btn.addEventListener('click', () => {
                const dateStr = btn.getAttribute('data-date');
                mostraEventiGiorno(dateStr, btn);
            });
        });

        // Re-inizializza icone Lucide se necessario
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function mostraEventiGiorno(dateStr, btnElement) {
        selectedDay = dateStr;
        const [y, m, d] = dateStr.split('-');
        const dataFormattata = new Date(y, m - 1, d).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
        calTooltipDate.textContent = dataFormattata;
        const eventi = getEventiGiorno(dateStr);
        let eventiHtml = '';
        if (eventi.length > 0) {
            eventiHtml = eventi.map(e => `
                <div class="flex items-start gap-2 text-sm">
                    <span class="w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${getTipoColore(e.tipo)}"></span>
                    <span class="text-white/90">${e.titolo}</span>
                </div>
            `).join('');
        } else {
            eventiHtml = '<p class="text-white/60 text-sm">Nessun evento in programma per questa data.</p>';
        }
        calTooltipEvents.innerHTML = eventiHtml;
        calTooltip.classList.remove('hidden');
        calTooltip.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function nascondiTooltip() {
        calTooltip.classList.add('hidden');
        selectedDay = null;
    }

    // Navigazione mesi
    calPrev.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendario(currentDate);
        nascondiTooltip();
    });
    calNext.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendario(currentDate);
        nascondiTooltip();
    });

    // Chiudi tooltip
    calTooltipClose.addEventListener('click', nascondiTooltip);

    

    // Inizializza calendario
    if (calGrid) {
        renderCalendario(currentDate);
    }

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