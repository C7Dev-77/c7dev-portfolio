import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Cookie, Mail, Lock, UserCheck, Globe, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad | C7Dev_',
  description: 'Política de privacidad de C7Dev_. Conoce cómo recopilamos, usamos y protegemos tu información personal en nuestro sitio web.',
  alternates: { canonical: '/privacidad' },
  robots: { index: true, follow: true },
};

const sections = [
  {
    icon: Eye,
    title: 'Información que Recopilamos',
    content: [
      'Datos de navegación: páginas visitadas, tiempo de permanencia, dispositivo y navegador utilizados.',
      'Datos de contacto: nombre, email y mensaje cuando usas nuestro formulario de contacto.',
      'Datos de transacciones: información relacionada con la compra o descarga de recursos digitales.',
      'Cookies técnicas y de publicidad utilizadas por Google AdSense para mostrar anuncios relevantes.',
    ],
  },
  {
    icon: Globe,
    title: 'Cómo Usamos tu Información',
    content: [
      'Mejorar la experiencia de navegación y el rendimiento del sitio.',
      'Responder a consultas y solicitudes enviadas a través del formulario de contacto.',
      'Procesar descargas y compras de recursos digitales de forma segura.',
      'Mostrar publicidad relevante a través de Google AdSense (basada en intereses y comportamiento de navegación).',
      'Analizar el tráfico del sitio mediante herramientas de análisis web para mejorar el contenido.',
    ],
  },
  {
    icon: Cookie,
    title: 'Uso de Cookies',
    content: [
      'Cookies técnicas: esenciales para el funcionamiento del sitio (autenticación, preferencias de idioma).',
      'Cookies de análisis: usadas por herramientas de analítica para medir el tráfico y comportamiento del usuario.',
      'Cookies de publicidad: Google AdSense utiliza cookies para mostrar anuncios personalizados. Puedes gestionar tus preferencias en g.co/adsettings.',
      'Puedes desactivar las cookies en la configuración de tu navegador, aunque esto puede afectar algunas funcionalidades del sitio.',
    ],
  },
  {
    icon: Lock,
    title: 'Seguridad de los Datos',
    content: [
      'Todos los datos se transmiten mediante conexión HTTPS encriptada.',
      'La base de datos utiliza Row Level Security (RLS) de Supabase para proteger el acceso.',
      'No almacenamos datos de tarjetas de crédito; los pagos son procesados por terceros certificados.',
      'Realizamos revisiones periódicas de seguridad para garantizar la protección de tu información.',
    ],
  },
  {
    icon: UserCheck,
    title: 'Tus Derechos',
    content: [
      'Derecho de acceso: puedes solicitar una copia de los datos personales que tenemos sobre ti.',
      'Derecho de rectificación: puedes pedirnos que corrijamos datos inexactos o incompletos.',
      'Derecho de supresión: puedes solicitar que eliminemos tus datos personales de nuestros sistemas.',
      'Derecho de oposición: puedes oponerte al procesamiento de tus datos para fines de publicidad.',
      'Para ejercer cualquiera de estos derechos, contáctanos en christian.dev.77@gmail.com.',
    ],
  },
  {
    icon: Globe,
    title: 'Servicios de Terceros',
    content: [
      'Google AdSense: servicio de publicidad de Google LLC. Política de privacidad: policies.google.com/privacy',
      'Supabase: base de datos y autenticación. Política de privacidad: supabase.com/privacy',
      'Vercel: hosting y despliegue. Política de privacidad: vercel.com/legal/privacy-policy',
      'FormSubmit.co: servicio de formularios de contacto. No almacena tus datos permanentemente.',
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-cyber-black">
      {/* Background grid */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none z-0" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[1] pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back button */}
        <div className="pt-24 px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-gold transition-colors text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
        </div>

        <section className="flex-1 px-4 py-12">
          <div className="max-w-4xl mx-auto">

            {/* Hero badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 border border-neon-gold/50 bg-neon-gold/5 text-neon-gold px-5 py-2 rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                <Shield className="w-3.5 h-3.5" />
                Documento Legal
                <FileText className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="font-outfit text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                Política de{' '}
                <span className="text-neon-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                  Privacidad
                </span>
              </h1>
              <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
                En <span className="text-neon-gold font-semibold">C7Dev_</span> valoramos y respetamos tu privacidad.
                Este documento explica cómo recopilamos, usamos y protegemos tu información personal.
              </p>
              <p className="text-gray-600 text-xs mt-4">
                Última actualización: Septiembre 2026 · Responsable: Cristian Morales (C7Dev_) · Colombia
              </p>
            </div>

            {/* Content sections */}
            <div className="space-y-6">
              {sections.map((section, idx) => (
                <div
                  key={idx}
                  className="glass-panel border border-gray-800 hover:border-neon-gold/30 rounded-2xl p-6 md:p-8 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-neon-gold/10 border border-neon-gold/30 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-4 h-4 text-neon-gold" />
                    </div>
                    <h2 className="font-outfit font-bold text-lg text-white">{section.title}</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-gold/60 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contact card */}
              <div className="glass-panel border border-neon-gold/30 rounded-2xl p-6 md:p-8 bg-neon-gold/5 text-center">
                <Mail className="w-10 h-10 text-neon-gold mx-auto mb-4" />
                <h2 className="font-outfit font-bold text-xl text-white mb-2">¿Tienes preguntas?</h2>
                <p className="text-gray-400 text-sm mb-4 max-w-md mx-auto">
                  Si tienes alguna duda sobre esta política de privacidad o sobre el tratamiento de tus datos,
                  contáctanos directamente.
                </p>
                <a
                  href="mailto:christian.dev.77@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-gold to-amber-500 text-black font-bold text-sm uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
                >
                  <Mail className="w-4 h-4" />
                  christian.dev.77@gmail.com
                </a>
                <div className="mt-4">
                  <Link
                    href="/terminos"
                    className="text-gray-500 hover:text-neon-gold text-xs transition-colors underline underline-offset-4"
                  >
                    Ver Términos de Uso →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
