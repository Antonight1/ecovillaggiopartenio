(function () {
    'use strict';

    const STORAGE_KEY = 'ecovillaggio_cookie_consent';

    // Se il consenso è già stato dato, non mostrare nulla
    if (localStorage.getItem(STORAGE_KEY)) return;

    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.setAttribute('role', 'alert');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Informativa sui cookie');
        banner.className = 'fixed bottom-0 left-0 right-0 z-50 bg-natura-900/95 text-white p-4 shadow-2xl border-t border-natura-700 backdrop-blur-md';

        banner.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-sm text-white/90">
                    <p class="font-semibold mb-1 flex items-center gap-2">
                        🍪 Informativa sui Cookie
                    </p>
                    <p>
                        Utilizziamo solo cookie tecnici necessari al funzionamento del sito. Non usiamo cookie di profilazione né strumenti di tracciamento.
                        Per saperne di più consulta la <a href="privacy.html" class="underline hover:text-terra-300 transition-colors">Privacy Policy</a>.
                    </p>
                </div>
                <button id="cookie-accept" class="flex-shrink-0 px-5 py-2.5 bg-terra-500 hover:bg-terra-600 text-white text-sm font-semibold rounded-full transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-terra-300">
                    Ho capito
                </button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('cookie-accept').addEventListener('click', function () {
            try {
                localStorage.setItem(STORAGE_KEY, 'true');
            } catch (e) {
                // Fallback per navigazione privata se localStorage non è disponibile
            }
            banner.remove();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createBanner);
    } else {
        createBanner();
    }
})();