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
  Facebook,
  Github,
  Linkedin,
  Send
} from 'lucide-react';

import ScrambleText from '@/components/ScrambleText';
import RealTimeStats from '@/components/RealTimeStats';
import DynamicProjectCount from '@/components/DynamicProjectCount';
import ServicesSection from '@/components/ServicesSection';
import BioStackSection from '@/components/BioStackSection';
import FAQSection from '@/components/FAQSection';
import BlogPreview from '@/components/BlogPreview';
import NewsletterForm from '@/components/NewsletterForm';

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
  // Telegram link con mensaje predeterminado
  const telegramNumber = '573244259132';
  const telegramMessage = encodeURIComponent('¡Hola C7Dev! Me interesa trabajar contigo.');
  const telegramLink = `https://t.me/+${telegramNumber}?text=${telegramMessage}`;

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
                href="https://www.facebook.com/profile.php?id=61584949321538"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-all hover:scale-110 group"
                title="Facebook"
              >
                <Facebook className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.5)]" />
              </a>
              <a
                href="https://www.instagram.com/c7dev_?igsh=MW1ya21xcmxndnd2Yw==&igsi=MW1ya21xcmxndnd2Yw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-[#E4405F] hover:text-[#E4405F] hover:bg-[#E4405F]/10 transition-all hover:scale-110 group"
                title="Instagram"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.5)]" />
              </a>
              <a
                href="https://youtube.com/@c7-dev?si=bqhH_FLhz4L3xsc9"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-[#FF0000]/10 transition-all hover:scale-110 group"
                title="YouTube"
              >
                <Youtube className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
              </a>
              <a
                href="https://www.tiktok.com/@c7dev__?_r=1&_t=ZS-98uDkdLgl0v"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-white hover:text-white hover:bg-white/5 transition-all hover:scale-110 group"
                title="TikTok"
              >
                <TikTokIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              </a>
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-white/10 rounded-xl hover:border-[#0088cc] hover:text-[#0088cc] hover:bg-[#0088cc]/10 transition-all hover:scale-110 group"
                title="Telegram"
              >
                <Send className="w-5 h-5 md:w-6 md:h-6 group-hover:drop-shadow-[0_0_8px_rgba(0,136,204,0.5)]" />
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

          {/* ========== SERVICIOS ========== */}
          <ServicesSection />

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
                  <DynamicProjectCount />
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

          <BioStackSection telegramLink={telegramLink} />

        </div>
      </section>

      {/* ========================================
          SECCIÓN FAQ
          ======================================== */}
      <FAQSection />

      {/* ========================================
          SECCIÓN BLOG TÉCNICO
          ======================================== */}
      <BlogPreview />


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
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-gradient-to-r from-[#0088cc] to-[#005580] text-white font-bold uppercase tracking-wider rounded-xl hover:shadow-lg hover:shadow-[#0088cc]/30 transition-all flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                Escríbeme por Telegram
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>



          {/* ========== NEWSLETTER ========== */}
          <div className="mt-8 max-w-sm mx-auto">
            <NewsletterForm />
          </div>

        </div>
      </section>
    </main>
  );
}