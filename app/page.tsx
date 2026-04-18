import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  ShoppingBag,
  FolderGit2,
  ArrowRight,
  ChevronDown,
  Mail,
  MessageCircle,
  Code,
  Zap,
  Users,
  Target,
  Award,
  Briefcase,
  Instagram,
  Youtube,
  Github,
  Linkedin
} from 'lucide-react';

import ScrambleText from '@/components/ScrambleText';
import RealTimeStats from '@/components/RealTimeStats';
import BioStackSection from '@/components/BioStackSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';

// Lazy load componentes visuales pesados (mejora LCP/FCP)
const ParticleNetwork = dynamic(() => import('@/components/ParticleNetwork'), { ssr: false });
const FloatingCode = dynamic(() => import('@/components/FloatingCode'), { ssr: false });


// Ícono de TikTok personalizado
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function HomePage() {
  // WhatsApp link con mensaje predeterminado
  const whatsappNumber = '573244259132';
  const whatsappMessage = encodeURIComponent('¡Hola C7Dev! Me interesa trabajar contigo.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="relative overflow-hidden">
      <ParticleNetwork />
      <FloatingCode />
      {/* Background Grid - Global for Home */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none z-0"></div>


      {/* ========================================
          HERO SECTION - Todo visible sin scroll
          ======================================== */}
      {/* ========================================
          HERO SECTION - Todo visible sin scroll
          ======================================== */}
      {/* Reducido pt para subir todo el contenido */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-4 relative">
        {/* Lighter overlay to let background effects show through */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="text-center max-w-4xl mx-auto z-10 w-full">

          {/* Profile Section */}
          <div className="flex flex-col items-center">
            {/* Profile Image con efecto escáner intensificado */}
            {/* Tamaño aumentado: w-40/h-40 móvil, w-48/h-48 desktop */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 group animate-[fadeInUp_0.8s_ease-out]">
              {/* Glow exterior más intenso */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-gold to-yellow-500 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-slow"></div>

              {/* Contenedor de imagen */}
              <div className="relative w-full h-full rounded-full border-2 border-neon-gold overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.5)] bg-black scan-overlay">
                <Image
                  src="/images/profile.png"
                  alt="C7Dev_ - Christian Developer"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay de línea de escáner INTENSIFICADO */}
                {/* Más opacidad y grosor en el gradiente */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-gold/50 to-transparent animate-[scanline_2.5s_linear_infinite] pointer-events-none h-[30%]"></div>

                {/* Brillo especular adicional */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-gold/20 to-transparent opacity-30 pointer-events-none"></div>
              </div>
            </div>

            {/* Name - Logo animado + Animación continua (Pulse Glow) */}
            <div className="relative mb-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <h1 className="font-outfit text-5xl md:text-7xl font-black tracking-tighter flex justify-center items-baseline gap-2 animate-[pulse_4s_ease-in-out_infinite]">
                <ScrambleText text="C7" className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                <ScrambleText text="Dev" className="text-neon-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                <span className="text-neon-gold animate-pulse">_</span>
              </h1>
            </div>

            {/* Roles - Margen reducido */}
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 text-gray-300 text-[10px] md:text-xs tracking-widest font-semibold uppercase mb-5 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
              <span>Desarrollador Web</span>
              <span className="text-neon-gold">•</span>
              <span>Ing de Sistemas</span>
              <span className="text-neon-gold">•</span>
              <span>Creador de Contenido</span>
            </div>

            {/* Texto eliminado por solicitud del usuario */}

            {/* Social Icons - Margen reducido */}
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
              <a
                href="https://www.tiktok.com/@c7dev_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-white hover:text-white hover:bg-white/5 transition-all hover:scale-110 group"
                title="TikTok"
              >
                <TikTokIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              </a>
              <a
                href="https://www.instagram.com/c7dev_/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-[#E4405F] hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-all hover:scale-110 group"
                title="Instagram"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.5)]" />
              </a>
              <a
                href="https://www.youtube.com/@c7dev_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-all hover:scale-110 group"
                title="YouTube"
              >
                <Youtube className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all hover:scale-110 group"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.5)]" />
              </a>
              <a
                href="https://github.com/C7Dev-77"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-white hover:text-white hover:bg-white/5 transition-all hover:scale-110 group"
                title="GitHub"
              >
                <Github className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              </a>
              <a
                href="https://www.linkedin.com/in/christiandev7/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all hover:scale-110 group"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.5)]" />
              </a>
            </div>

            {/* CTA Buttons - Margen reducido */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
              <Link
                href="/tienda"
                className="group px-8 py-3 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-bold uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Code className="w-4 h-4" />
                Ver Códigos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/portafolio"
                className="px-8 py-3 border-2 border-neon-platinum text-neon-platinum font-bold uppercase tracking-wider rounded-xl hover:bg-neon-platinum hover:text-black hover:shadow-[0_0_20px_rgba(229,228,226,0.4)] transition-all flex items-center justify-center gap-2 text-sm"
              >
                <FolderGit2 className="w-4 h-4" />
                Portafolio
              </Link>
            </div>

            {/* Stats - Estadísticas en tiempo real desde la base de datos */}
            <div className="mt-2 bg-[#050505] backdrop-blur-md rounded-2xl border border-gray-800 py-4 px-8 animate-[fadeInUp_0.8s_ease-out_1s_both] w-full max-w-2xl shadow-lg">
              <RealTimeStats className="" />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
            <ChevronDown className="w-6 h-6 text-neon-gold" />
          </div>
        </div>
      </section>

      {/* ========================================
          SECCIÓN MIS SERVICIOS
          ======================================== */}
      {/* ========================================
          SECCIÓN MIS SERVICIOS
          ======================================== */}
      {/* Background removed to let global effects show through */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Título de sección con efecto */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-3xl">
              <div className="w-96 h-32 bg-neon-gold rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4 relative z-10">
              Mis <span className="text-neon-gold text-glow-gold">Servicios</span>
            </h2>
          </div>

          {/* ========== SERVICIOS - 4 Tarjetas ========== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Servicio 1 - Desarrollo 3D */}
            <div className="group bg-[#0d0d0d] border border-gray-800 hover:border-purple-500 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors group-hover:scale-110 duration-300">
                <svg className="w-7 h-7 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-3 group-hover:text-purple-400 transition-colors">Desarrollo 3D</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Creación de experiencias visuales inmersivas con tecnologías modernas de renderizado 3D y animaciones interactivas para la web.</p>
            </div>

            {/* Servicio 2 - Arquitectura de Sistemas */}
            <div className="group bg-[#0d0d0d] border border-gray-800 hover:border-red-500 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors group-hover:scale-110 duration-300">
                <svg className="w-7 h-7 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-3 group-hover:text-red-400 transition-colors">Arquitectura de Sistemas</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Diseño escalable y eficiente de infraestructuras complejas, garantizando rendimiento, mantenibilidad y evolución del software.</p>
            </div>

            {/* Servicio 3 - Optimización de Código */}
            <div className="group bg-[#0d0d0d] border border-gray-800 hover:border-gray-400 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(156,163,175,0.15)]">
              <div className="w-14 h-14 bg-gray-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-500/20 transition-colors group-hover:scale-110 duration-300">
                <svg className="w-7 h-7 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-3 group-hover:text-gray-300 transition-colors">Optimización de Código</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Mejora de rendimiento y calidad en aplicaciones existentes, reduciendo tiempos de carga y deuda técnica con buenas prácticas.</p>
            </div>

            {/* Servicio 4 - Consultoría Tecnológica */}
            <div className="group bg-[#0d0d0d] border border-gray-800 hover:border-amber-600 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(217,119,6,0.15)]">
              <div className="w-14 h-14 bg-amber-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600/20 transition-colors group-hover:scale-110 duration-300">
                <Briefcase className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-white text-lg font-bold mb-3 group-hover:text-amber-500 transition-colors">Consultoría Tecnológica</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Asesoría experta en transformación digital y modernización de procesos para empresas que buscan evolucionar con tecnología.</p>
            </div>
          </div>

          {/* Texto de experiencia debajo de las tarjetas */}
          <div className="text-center">
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed border border-neon-gold/20 bg-black/90 rounded-2xl p-8 backdrop-blur-sm">
              <span className="text-neon-gold font-bold">Ingeniero de Sistemas especializado en desarrollo web y software</span>, con más de 3 años creando soluciones digitales escalables, modernas y orientadas a resultados.
              Transformo ideas en productos funcionales combinando arquitectura de software, lógica avanzada y diseño de alto impacto visual.
            </p>
          </div>

          {/* ========== STATS DE RESULTADOS ========== */}
          <div className="mt-20 bg-black/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-neon-gold/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-neon-gold" />
                  <span className="text-3xl md:text-4xl font-bold text-white">3+</span>
                </div>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Años Exp.</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FolderGit2 className="w-5 h-5 text-neon-platinum" />
                  <span className="text-3xl md:text-4xl font-bold text-white">50+</span>
                </div>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Proyectos</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-3xl md:text-4xl font-bold text-white">100%</span>
                </div>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Satisfacción</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <span className="text-3xl md:text-4xl font-bold text-white">24h</span>
                </div>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Respuesta</p>
              </div>
            </div>
          </div>

          {/* ========== DATOS DEL SISTEMA ========== */}
          <div className="mt-32 flex items-center justify-center gap-4 mb-16">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-neon-gold"></div>
            <h2 className="text-2xl md:text-4xl font-outfit font-bold text-white uppercase tracking-widest text-center">
              DATOS DEL <span className="text-neon-gold">SISTEMA</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-neon-gold"></div>
          </div>

          <BioStackSection whatsappLink={whatsappLink} />

        </div>
      </section>

      {/* ========================================
          SECCIÓN TESTIMONIOS
          ======================================== */}
      <TestimonialsSection />

      {/* ========================================
          SECCIÓN FAQ
          ======================================== */}
      <FAQSection />


      {/* ========================================
          CTA CONTRATACIÓN
          ======================================== */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* ========== CTA CONTRATACIÓN ========== */}
          <div className="text-center bg-gradient-to-r from-neon-gold/5 via-[#0d0d0d] to-neon-platinum/5 rounded-3xl p-10 border border-gray-800 hover:border-neon-gold/30 transition-colors">
            <Briefcase className="w-12 h-12 text-neon-gold mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl md:text-3xl font-outfit font-bold text-white mb-4">
              ¿Listo para llevar tu proyecto al siguiente nivel?
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales.
              Si buscas un desarrollador comprometido, creativo y orientado a resultados, hablemos y construyamos algo de valor juntos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-[#25D366]/30 transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Escríbeme por WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>



        </div>
      </section>
    </main>
  );
}