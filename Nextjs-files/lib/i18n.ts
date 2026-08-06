export type Language = 'es' | 'en';

export const translations = {
  es: {
    // Navbar
    navHome: 'Inicio',
    navCodes: 'Códigos',
    navPortfolio: 'Portafolio',
    navAdmin: 'Panel Admin',
    musicPlay: 'Reproducir música',
    musicPause: 'Pausar música',

    // Digital Codes Page
    codesTitle: 'DIGITAL',
    codesSub: 'Explora herramientas de alto rendimiento diseñadas para el ecosistema moderno.',
    searchPlaceholder: 'BUSCAR CÓDIGOS...',
    codesCount: 'código',
    codesCountPlural: 'códigos',
    updateBtn: 'Actualizar',
    loadingCodes: 'Cargando códigos...',
    noProducts: 'No hay productos disponibles',
    noProductsDesc: 'Los productos aparecerán aquí cuando se agreguen desde el panel de administración.',
    noResults: 'Sin resultados',
    noResultsDesc: 'No se encontraron productos que coincidan con',
    clearSearch: 'Limpiar búsqueda',
    pageInfo: 'Mostrando',
    prevPage: 'Anterior',
    nextPage: 'Siguiente',

    // Donation Section
    donateTag: 'Apoya el Desarrollo',
    donateTitle: '¿Te sirvió este código?',
    donateTitleHighlight: 'Haz una donación y apoya el proyecto ☕',
    donateSub: 'Tu contribución ayuda a mantener estas herramientas gratuitas y abiertas para todos. Transferencia rápida sin comisiones.',
    nuKeyLabel: 'Llave Nu / Nequi / Bre-B',
    copyKey: 'Copiar llave',
    copiedKey: '¡Copiado!',
    donateFooter: '¡Cualquier aporte marca la diferencia! 🙏 Gracias por tu apoyo.',
    showQrBtn: 'Ver QR de Donación',
    hideQrBtn: 'Ocultar QR',

    // Cards
    viewMore: 'Ver más',
    views: 'Vistas',
    demo: 'Demo',
    details: 'Ver Detalles',

    // Portfolio Page
    portfolioTitle: 'Portafolio',
    portfolioSub: 'Explorando las fronteras entre el diseño y el código puro.',
    viewProject: 'Ver Proyecto',
    contactTelegram: 'Contáctame en Telegram',
    interestedQuestion: '¿Te interesa alguno de estos proyectos?',
    noProjects: 'No hay proyectos en esta categoría',
    noProjectsDesc: 'Intenta seleccionar otra categoría o filtro.',
    allCategory: 'Todos',

    // Product page
    buyNow: 'Comprar Ahora',
    downloadFree: 'Descargar Gratis (con anuncios)',
    donateBtnText: 'Apoya el Desarrollo',

    // Home Page
    role1: 'Desarrollador Web',
    role2: 'Ing de Sistemas',
    role3: 'Creador de Contenido',
    viewCodes: 'Ver Códigos',
    servicesTitle: 'Mis Servicios',
    service1Title: 'Desarrollo 3D',
    service1Desc: 'Creación de experiencias visuales inmersivas con tecnologías modernas de renderizado 3D y animaciones interactivas para la web.',
    service2Title: 'Arquitectura de Sistemas',
    service2Desc: 'Diseño escalable y eficiente de infraestructuras complejas, garantizando rendimiento, mantenibilidad y evolución del software.',
    service3Title: 'Optimización de Código',
    service3Desc: 'Mejora de rendimiento y calidad en aplicaciones existentes, reduciendo tiempos de carga y deuda técnica con buenas prácticas.',
    service4Title: 'Consultoría Tecnológica',
    service4Desc: 'Asesoría experta en transformación digital y modernización de procesos para empresas que buscan evolucionar con tecnología.',

    // Footer
    footerTag: 'Desarrollador Full Stack',
    footerRights: 'Todos los derechos reservados.',
  },
  en: {
    // Navbar
    navHome: 'Home',
    navCodes: 'Codes',
    navPortfolio: 'Portfolio',
    navAdmin: 'Admin Panel',
    musicPlay: 'Play music',
    musicPause: 'Pause music',

    // Digital Codes Page
    codesTitle: 'DIGITAL',
    codesSub: 'Explore high-performance tools designed for the modern ecosystem.',
    searchPlaceholder: 'SEARCH CODES...',
    codesCount: 'code',
    codesCountPlural: 'codes',
    updateBtn: 'Refresh',
    loadingCodes: 'Loading codes...',
    noProducts: 'No products available',
    noProductsDesc: 'Products will appear here once added from the admin panel.',
    noResults: 'No results found',
    noResultsDesc: 'No products matched your search for',
    clearSearch: 'Clear search',
    pageInfo: 'Showing',
    prevPage: 'Previous',
    nextPage: 'Next',

    // Donation Section
    donateTag: 'Support Development',
    donateTitle: 'Did this code help you?',
    donateTitleHighlight: 'Make a donation & support the project ☕',
    donateSub: 'Your contribution keeps these tools free and open for everyone. Fast transfer with zero fees.',
    nuKeyLabel: 'Nu / Nequi / Bre-B Key',
    copyKey: 'Copy Key',
    copiedKey: 'Copied!',
    donateFooter: 'Every contribution makes a difference! 🙏 Thanks for your support.',
    showQrBtn: 'Show Donation QR',
    hideQrBtn: 'Hide QR',

    // Cards
    viewMore: 'View more',
    views: 'Views',
    demo: 'Demo',
    details: 'View Details',

    // Portfolio Page
    portfolioTitle: 'Portfolio',
    portfolioSub: 'Exploring the boundaries between design and pure code.',
    viewProject: 'View Project',
    contactTelegram: 'Contact me on Telegram',
    interestedQuestion: 'Interested in any of these projects?',
    noProjects: 'No projects in this category',
    noProjectsDesc: 'Try selecting another category or filter.',
    allCategory: 'All',

    // Product page
    buyNow: 'Buy Now',
    downloadFree: 'Free Download (with ads)',
    donateBtnText: 'Support Development',

    // Home Page
    role1: 'Web Developer',
    role2: 'Systems Engineer',
    role3: 'Content Creator',
    viewCodes: 'View Codes',
    servicesTitle: 'My Services',
    service1Title: '3D Development',
    service1Desc: 'Creation of immersive visual experiences with modern 3D rendering technologies and interactive web animations.',
    service2Title: 'Systems Architecture',
    service2Desc: 'Scalable and efficient design of complex infrastructures, ensuring software performance, maintainability, and evolution.',
    service3Title: 'Code Optimization',
    service3Desc: 'Performance and quality enhancement in existing applications, reducing load times and technical debt through best practices.',
    service4Title: 'Tech Consulting',
    service4Desc: 'Expert advisory in digital transformation and process modernization for companies looking to evolve through technology.',

    // Footer
    footerTag: 'Full Stack Developer',
    footerRights: 'All rights reserved.',
  }
};
