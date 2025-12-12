import Link from 'next/link';
import Image from 'next/image';
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
import CyberBackground from '@/components/CyberBackground';
import ScrambleText from '@/components/ScrambleText';

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
      <CyberBackground />

      {/* ========================================
          HERO SECTION - Todo visible sin scroll
          ======================================== */}
      {/* ========================================
          HERO SECTION - Todo visible sin scroll
          ======================================== */}
      {/* Reducido pt para subir todo el contenido */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-4 relative">
        <div className="text-center max-w-4xl mx-auto z-10 w-full">

          {/* Profile Section */}
          <div className="flex flex-col items-center">
            {/* Profile Image con efecto escáner intensificado */}
            {/* Tamaño aumentado: w-40/h-40 móvil, w-48/h-48 desktop */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 group">
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
            <div className="relative mb-4">
              <h1 className="font-outfit text-5xl md:text-7xl font-black tracking-tighter flex justify-center items-baseline gap-2 animate-[pulse_4s_ease-in-out_infinite]">
                <ScrambleText text="C7" className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                <ScrambleText text="Dev" className="text-neon-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                <span className="text-neon-gold animate-pulse">_</span>
              </h1>
            </div>

            {/* Roles - Margen reducido */}
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-3 text-gray-400 text-[10px] md:text-xs tracking-widest font-semibold uppercase mb-5">
              <span>Desarrollador Web</span>
              <span className="text-neon-gold">•</span>
              <span>Ing de Sistemas</span>
              <span className="text-neon-gold">•</span>
              <span>Creador de Contenido</span>
            </div>

            {/* Texto eliminado por solicitud del usuario */}

            {/* Social Icons - Margen reducido */}
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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

            {/* Stats - Margen superior muy reducido para que suban */}
            <div className="flex items-center justify-center gap-8 md:gap-16 py-4 px-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-neon-gold/30 transition-colors mt-2">
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all">50+</div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Proyectos</div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all">100+</div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Assets</div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-neon-gold group-hover:text-glow-gold transition-all">5K+</div>
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">Downloads</div>
              </div>
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
      <section className="py-24 px-4 relative z-10 bg-gradient-to-b from-transparent to-[#080808]">
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
            {/* Servicio 1 - Desarrollo Web */}
            <div className="group bg-[#0d0d0d] border border-gray-800 hover:border-neon-gold rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]">
              <div className="w-14 h-14 bg-neon-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-neon-gold/20 transition-colors group-hover:scale-110 duration-300">
                <Code className="w-7 h-7 text-neon-gold" />
              </div>
              <h3 className="text-white text-lg font-bold mb-3 group-hover:text-neon-gold transition-colors">Desarrollo Web</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Sitios web modernos, rápidos y optimizados con las últimas tecnologías del mercado.</p>
            </div>

            {/* Servicio 2 - Animaciones Web */}
            <div className="group bg-[#0d0d0d] border border-gray-800 hover:border-green-500 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors group-hover:scale-110 duration-300">
                <Zap className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="text-white text-lg font-bold mb-3 group-hover:text-green-500 transition-colors">Animaciones Web</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Micro-interacciones y animaciones fluidas que dan vida y personalidad a tu proyecto.</p>
            </div>

            {/* Servicio 3 - Python */}
            <div className="group bg-[#0d0d0d] border border-gray-800 hover:border-[#3776AB] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(55,118,171,0.1)]">
              <div className="w-14 h-14 bg-[#3776AB]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#3776AB]/20 transition-colors group-hover:scale-110 duration-300">
                <svg className="w-7 h-7 text-[#3776AB]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-3 group-hover:text-[#3776AB] transition-colors">Python</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Automatización de tareas, scripts eficientes y desarrollo backend robusto.</p>
            </div>

            {/* Servicio 4 - Java */}
            <div className="group bg-[#0d0d0d] border border-gray-800 hover:border-[#ED8B00] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(237,139,0,0.1)]">
              <div className="w-14 h-14 bg-[#ED8B00]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#ED8B00]/20 transition-colors group-hover:scale-110 duration-300">
                <svg className="w-7 h-7 text-[#ED8B00]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-bold mb-3 group-hover:text-[#ED8B00] transition-colors">Java</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Desarrollo de aplicaciones empresariales escalables y sistemas de alta fiabilidad.</p>
            </div>
          </div>

          {/* Texto de experiencia debajo de las tarjetas */}
          <div className="text-center">
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed border border-white/5 bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
              <span className="text-neon-gold font-bold">Ingeniero de Sistemas</span> con +3 años de experiencia creando soluciones tecnológicas integrales.
              Combino lógica de programación avanzada con diseño estético para entregar productos digitales excepcionales.
            </p>
          </div>

          {/* ========== STATS DE RESULTADOS ========== */}
          <div className="mt-20 bg-gradient-to-r from-neon-gold/5 via-transparent to-neon-platinum/5 rounded-3xl p-8 md:p-12 border border-gray-800/50">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* BIO CARD */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-platinum/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative h-full bg-[#0d0d0d] border border-gray-800 group-hover:border-neon-platinum/50 rounded-2xl p-8 backdrop-blur-sm transition-colors">
                <h3 className="text-xl font-outfit text-neon-platinum mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-neon-platinum rounded-full animate-pulse"></span>
                  <span className="text-gray-500 font-mono text-sm">//</span>
                  BIOGRAFÍA_PROFESIONAL
                </h3>

                <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
                  <p>
                    <strong className="text-white">Christian</strong> — Ingeniero de Sistemas apasionado por crear
                    soluciones digitales que combinan estética y funcionalidad.
                  </p>
                  <p>
                    Especializado en <span className="text-neon-gold">desarrollo web</span>, creación de contenido
                    educativo y proyectos innovadores con tecnologías modernas.
                  </p>
                  <p className="text-sm border-l-2 border-neon-gold pl-4 italic">
                    "Mi objetivo es ayudar a empresas y emprendedores a destacar en el mundo digital
                    con productos web de alta calidad."
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-3 text-sm border-t border-gray-800 pt-6">
                  <a href="mailto:christian.dev.77@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-neon-gold transition-colors p-2 hover:bg-white/5 rounded-lg">
                    <Mail className="w-4 h-4" />
                    christian.dev.77@gmail.com
                  </a>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[#25D366] transition-colors p-2 hover:bg-white/5 rounded-lg">
                    <MessageCircle className="w-4 h-4" />
                    +57 324 425 9132
                  </a>
                </div>
              </div>
            </div>

            {/* TECH STACK */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-outfit text-white mb-8 flex items-center gap-2">
                <span className="text-neon-gold font-mono">&gt;_</span>
                STACK TECNOLÓGICO
              </h3>

              <div className="space-y-6">
                {/* HTML/CSS/Tailwind */}
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">
                    <span>HTML5 / CSS3 / TAILWIND</span>
                    <span className="text-neon-gold">98%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-600 to-neon-gold w-[98%] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.3)]"></div>
                  </div>
                </div>

                {/* JavaScript */}
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">
                    <span>JAVASCRIPT / TYPESCRIPT</span>
                    <span className="text-neon-platinum">90%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gray-500 to-neon-platinum w-[90%] rounded-full"></div>
                  </div>
                </div>

                {/* React/Next.js */}
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">
                    <span>REACT / NEXT.JS</span>
                    <span className="text-white">85%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gray-600 to-white w-[85%] rounded-full"></div>
                  </div>
                </div>

                {/* Python/Java */}
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">
                    <span>PYTHON / JAVA</span>
                    <span className="text-[#3776AB]">75%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#3776AB] to-[#ED8B00] w-[75%] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-8">
                {['Git', 'GitHub', 'Firebase', 'Supabase', 'Figma', 'SEO', 'Vercel', 'Node.js'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white/5 border border-gray-800 rounded-lg text-[10px] text-gray-500 uppercase tracking-wider hover:border-neon-gold hover:text-neon-gold transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ========== CTA CONTRATACIÓN ========== */}
          <div className="text-center bg-gradient-to-r from-neon-gold/5 via-[#0d0d0d] to-neon-platinum/5 rounded-3xl p-10 border border-gray-800 hover:border-neon-gold/30 transition-colors">
            <Briefcase className="w-12 h-12 text-neon-gold mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl md:text-3xl font-outfit font-bold text-white mb-4">
              ¿Listo para trabajar juntos?
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Estoy disponible para proyectos freelance, colaboraciones y oportunidades laborales.
              Hablemos sobre cómo puedo aportar valor a tu equipo o proyecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <a
                href="mailto:christian.dev.77@gmail.com"
                className="px-8 py-4 border-2 border-neon-gold text-neon-gold font-bold uppercase tracking-wider rounded-xl hover:bg-neon-gold hover:text-black transition-all flex items-center justify-center gap-3"
              >
                <Mail className="w-5 h-5" />
                Enviar Email
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}