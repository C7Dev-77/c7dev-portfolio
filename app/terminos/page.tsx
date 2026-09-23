import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, Download, ShieldAlert, Ban, RefreshCcw, Gavel } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos de Uso | C7Dev_',
  description: 'Términos y condiciones de uso del sitio web C7Dev_. Conoce las reglas para el uso de los recursos digitales, descargas y servicios ofrecidos.',
  alternates: { canonical: '/terminos' },
  robots: { index: true, follow: true },
};

const sections = [
  {
    icon: FileText,
    title: '1. Aceptación de los Términos',
    content: [
      'Al acceder y utilizar el sitio web c7dev-portfolio.vercel.app (en adelante "el Sitio"), aceptas quedar vinculado por estos Términos de Uso.',
      'Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no uses el Sitio.',
      'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación.',
      'El uso continuado del Sitio después de cualquier cambio constituye tu aceptación de los nuevos términos.',
    ],
  },
  {
    icon: Scale,
    title: '2. Uso del Sitio y Contenido',
    content: [
      'El contenido del Sitio (artículos, proyectos, imágenes, código fuente) está protegido por derechos de autor y pertenece a Cristian Morales (C7Dev_).',
      'Puedes ver y compartir el contenido del Sitio siempre que atribuyas la autoría a C7Dev_ y no lo uses con fines comerciales sin autorización.',
      'Está prohibido reproducir, distribuir o crear obras derivadas del contenido sin permiso previo por escrito.',
      'El uso del Sitio para actividades ilegales, fraudulentas o que violen derechos de terceros está estrictamente prohibido.',
    ],
  },
  {
    icon: Download,
    title: '3. Recursos Digitales y Descargas',
    content: [
      'Los recursos digitales (códigos fuente, plantillas, etc.) disponibles en la Tienda están sujetos a una licencia de uso personal y comercial limitada.',
      'Al adquirir un recurso, obtienes una licencia no exclusiva, intransferible, para usarlo en tus proyectos personales y comerciales.',
      'Está prohibido revender, redistribuir o sublicenciar los recursos digitales a terceros.',
      'Las descargas gratuitas con publicidad son válidas por el período indicado y están sujetas a disponibilidad.',
      'Las descargas pagas incluyen actualizaciones gratuitas para la versión adquirida mientras estén disponibles.',
    ],
  },
  {
    icon: RefreshCcw,
    title: '4. Política de Reembolsos',
    content: [
      'Dado que se trata de productos digitales con descarga inmediata, no ofrecemos reembolsos automáticos una vez completada la descarga.',
      'Sin embargo, si el recurso no funciona como se describe o presenta errores significativos, contáctanos dentro de los 7 días posteriores a la compra.',
      'Los reembolsos se evaluarán caso por caso y pueden otorgarse como crédito o reintegro según la situación.',
      'Para solicitar un reembolso, envía un correo a christian.dev.77@gmail.com con el detalle de la compra y el problema encontrado.',
    ],
  },
  {
    icon: ShieldAlert,
    title: '5. Limitación de Responsabilidad',
    content: [
      'El Sitio y su contenido se proporcionan "tal cual", sin garantías de ningún tipo, expresas o implícitas.',
      'No garantizamos que el Sitio esté libre de errores, interrupciones o que cumpla con todos tus requerimientos específicos.',
      'No somos responsables de ningún daño directo, indirecto, incidental o consecuente que resulte del uso del Sitio o sus recursos.',
      'Los recursos digitales son proporcionados como herramientas de aprendizaje y referencia. La implementación y adaptación a tus proyectos es tu responsabilidad.',
    ],
  },
  {
    icon: Ban,
    title: '6. Conducta Prohibida',
    content: [
      'Intentar acceder sin autorización a áreas restringidas del Sitio (panel de administración).',
      'Usar herramientas automatizadas para extraer contenido del Sitio (scraping) sin permiso.',
      'Publicar o transmitir contenido malicioso, spam o que viole derechos de terceros.',
      'Suplantar la identidad de C7Dev_ o de cualquier otro usuario.',
      'Usar el Sitio de cualquier manera que pueda dañar su reputación o interferir con su funcionamiento.',
    ],
  },
  {
    icon: Gavel,
    title: '7. Ley Aplicable',
    content: [
      'Estos términos se rigen por las leyes de la República de Colombia.',
      'Cualquier disputa relacionada con estos términos se someterá a los tribunales competentes de Colombia.',
      'Si alguna disposición de estos términos resulta inválida o inaplicable, las disposiciones restantes seguirán vigentes.',
      'Para cualquier consulta legal, puedes contactarnos en christian.dev.77@gmail.com.',
    ],
  },
];

export default function TerminosPage() {
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
                <Scale className="w-3.5 h-3.5" />
                Documento Legal
                <Gavel className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="font-outfit text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                Términos de{' '}
                <span className="text-neon-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                  Uso
                </span>
              </h1>
              <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
                Al usar <span className="text-neon-gold font-semibold">C7Dev_</span> aceptas los siguientes términos y condiciones.
                Por favor léelos cuidadosamente antes de utilizar el sitio o adquirir recursos digitales.
              </p>
              <p className="text-gray-600 text-xs mt-4">
                Última actualización: Septiembre 2026 · Titular: Cristian Morales (C7Dev_) · Colombia
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

              {/* Bottom nav card */}
              <div className="glass-panel border border-neon-gold/30 rounded-2xl p-6 md:p-8 bg-neon-gold/5 text-center">
                <FileText className="w-10 h-10 text-neon-gold mx-auto mb-4" />
                <h2 className="font-outfit font-bold text-xl text-white mb-2">¿Alguna pregunta?</h2>
                <p className="text-gray-400 text-sm mb-4 max-w-md mx-auto">
                  Si tienes dudas sobre estos términos o sobre los recursos digitales que ofrecemos, no dudes en contactarnos.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-gold to-amber-500 text-black font-bold text-sm uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
                >
                  Ir a Contacto
                </Link>
                <div className="mt-4">
                  <Link
                    href="/privacidad"
                    className="text-gray-500 hover:text-neon-gold text-xs transition-colors underline underline-offset-4"
                  >
                    Ver Política de Privacidad →
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
