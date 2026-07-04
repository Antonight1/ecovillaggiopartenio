// ===== Dati eventi condivisi per index.html ed eventi.html =====
const eventi = [
    // --- PASSATI ---
    {
        id: 'arboria',
        titolo: 'ARBORIA – Silviotherapy e Inclusione',
        data: '2025-06-14',
        orario: '9:00 – 13:00',
        luogo: 'Acqua Fidia, Mercogliano (AV)',
        descrizione: 'Percorso terapeutico nella natura per bambini e adolescenti con ASD e altre disabilità. Camminate consapevoli, attività sensoriali e ascolto della natura.',
        img: 'https://res.cloudinary.com/dfd44st4u/image/upload/v1782908463/Locandina_evento_arboria_joplrv.jpg',
        stato: 'passato',
        categoria: 'Inclusione',
        link: 'evento-sensoriale.html',
        gallery: []
    },
    {
        id: 'primavera-2025',
        titolo: 'Festa della Primavera',
        data: '2025-04-20',
        orario: '10:00 – 18:00',
        luogo: 'Campo Maggiore, Parco del Partenio',
        descrizione: 'Celebrazione dell\'arrivo della primavera con laboratori naturalistici, musica folk e degustazione di prodotti tipici irpini.',
        img: 'http://static.photos/nature/640x360/55',
        stato: 'passato',
        categoria: 'Festival',
        gallery: [
            'http://static.photos/nature/640x360/91',
            'http://static.photos/people/640x360/12',
            'http://static.photos/nature/640x360/45'
        ]
    },
    {
        id: 'caseificazione-2025',
        titolo: 'Workshop di Caseificazione Tradizionale',
        data: '2025-03-15',
        orario: '15:00 – 18:00',
        luogo: 'Rifugio del Bosco, Parco del Partenio',
        descrizione: 'Laboratorio pratico sulla produzione casearia tradizionale irpina con degustazione dei formaggi appena prodotti.',
        img: 'https://res.cloudinary.com/dfd44st4u/image/upload/v1782993863/labcas_a0cgbe.jpg',
        stato: 'passato',
        categoria: 'Workshop',
        gallery: [
            'http://static.photos/food/640x360/34',
            'http://static.photos/people/640x360/45'
        ]
    },

    // --- FUTURI ---
    {
        id: 'solstizio-estate',
        titolo: 'Festival del Solstizio d\'Estate',
        data: '2025-06-21',
        orario: '18:00 – 23:00',
        luogo: 'Anfiteatro Naturale, Parco del Partenio',
        descrizione: 'Celebrazione del solstizio con musica, falò rituali e osservazione astronomica delle stelle.',
        img: 'http://static.photos/nature/640x360/55',
        stato: 'futuro',
        categoria: 'Festival'
    },
    {
        id: 'campo-maggiore',
        titolo: 'Escursione Guidata al Campo Maggiore',
        data: '2025-07-05',
        orario: '8:00 – 12:00',
        luogo: 'Sentiero 210, Parco del Partenio',
        descrizione: 'Percorso naturalistico con guida esperta alla scoperta della biodiversità del Partenio. Adatto a tutti i livelli.',
        img: 'https://res.cloudinary.com/dfd44st4u/image/upload/v1782904960/Salamandra_insieme_ai_bambini_dumw68.jpg',
        stato: 'futuro',
        categoria: 'Escursioni'
    },
    {
        id: 'concerto-stelle-05',
        titolo: 'Concerto sotto le Stelle',
        data: '2025-07-05',
        orario: '21:00 – 23:00',
        luogo: 'Anfiteatro Naturale, Parco del Partenio',
        descrizione: 'Spettacolo musicale all\'aperto con artisti locali e internazionali sotto il cielo stellato del Partenio.',
        img: 'http://static.photos/nature/640x360/99',
        stato: 'futuro',
        categoria: 'Concerto'
    },
    {
        id: 'mtb-adventure',
        titolo: 'Mountain Bike Adventure',
        data: '2025-07-12',
        orario: '9:00 – 13:00',
        luogo: 'Tracciato Monte Partenio',
        descrizione: 'Percorso guidato per mountain bike con diversi livelli di difficoltà. Noleggio bici disponibile su prenotazione.',
        img: 'https://res.cloudinary.com/dfd44st4u/image/upload/v1783061126/mounbike_noybsg.jpg',
        stato: 'futuro',
        categoria: 'Sport'
    },
    {
        id: 'cavallo-approccio',
        titolo: 'Primo Approccio a Cavallo',
        data: '2025-07-19',
        orario: '10:00 – 12:00',
        luogo: 'Maneggio Ecovillaggio, Parco del Partenio',
        descrizione: 'Esperienza guidata da istruttore equestre qualificato, ideale per principianti e famiglie.',
        img: 'https://res.cloudinary.com/dfd44st4u/image/upload/v1783061434/primappcavall_vnnoeq.jpg',
        stato: 'futuro',
        categoria: 'Sport'
    },
    {
        id: 'passeggiata-tramonto',
        titolo: 'Passeggiata Naturistica al Tramonto',
        data: '2025-07-26',
        orario: '18:00 – 20:30',
        luogo: 'Sentiero Panoramico, Parco del Partenio',
        descrizione: 'Passeggiata al tramonto con area picnic finale. Un momento di relax in famiglia immersi nel verde.',
        img: 'https://res.cloudinary.com/dfd44st4u/image/upload/v1782993835/Scolaresca_nel_parco_hiaxyf.jpg',
        stato: 'futuro',
        categoria: 'Passeggiate'
    },
    {
        id: 'mercato-artigianato',
        titolo: 'Mercato dell\'Artigianato',
        data: '2025-08-03',
        orario: '9:00 – 18:00',
        luogo: 'Piazzale Acqua Fidia, Parco del Partenio',
        descrizione: 'Esposizione e vendita di prodotti artigianali locali con dimostrazioni dal vivo e laboratori creativi.',
        img: 'http://static.photos/nature/640x360/82',
        stato: 'futuro',
        categoria: 'Mercato'
    },
    {
        id: 'workshop-caseificazione',
        titolo: 'Laboratorio di Caseificazione',
        data: '2025-08-10',
        orario: '15:00 – 18:00',
        luogo: 'Rifugio del Bosco, Parco del Partenio',
        descrizione: 'Scopri i segreti della produzione casearia tradizionale irpina con degustazione dei prodotti locali.',
        img: 'https://res.cloudinary.com/dfd44st4u/image/upload/v1782993863/labcas_a0cgbe.jpg',
        stato: 'futuro',
        categoria: 'Workshop'
    },
    {
        id: 'festa-mezza-estate',
        titolo: 'Festa di Mezza Estate',
        data: '2025-08-10',
        orario: '18:00 – 23:00',
        luogo: 'Campo Maggiore, Parco del Partenio',
        descrizione: 'Musica, danze tradizionali e cena sotto le stelle a base di prodotti tipici del territorio.',
        img: 'http://static.photos/nature/640x360/78',
        stato: 'futuro',
        categoria: 'Festival'
    },
    {
        id: 'festa-raccolto',
        titolo: 'Festa del Raccolto Autunnale',
        data: '2025-09-21',
        orario: '10:00 – 18:00',
        luogo: 'Campo Maggiore, Parco del Partenio',
        descrizione: 'Celebrazione del raccolto con mercato agricolo, degustazione di vini e prodotti stagionali, laboratori per bambini.',
        img: 'http://static.photos/food/640x360/12',
        stato: 'futuro',
        categoria: 'Festival'
    },
    {
        id: 'solstizio-inverno',
        titolo: 'Festa del Solstizio d\'Inverno',
        data: '2025-12-21',
        orario: '17:00 – 21:00',
        luogo: 'Rifugio della Montagna, Parco del Partenio',
        descrizione: 'Falò, cioccolata calda, storie attorno al fuoco e osservazione astronomica invernale.',
        img: 'http://static.photos/nature/640x360/33',
        stato: 'futuro',
        categoria: 'Festival'
    }
];