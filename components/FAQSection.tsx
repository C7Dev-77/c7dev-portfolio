'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: '¿Cuánto tiempo tarda en desarrollar mi proyecto?',
    answer:
      'Depende de la complejidad. Una landing page profesional: 3–5 días. Una web completa con dashboard y pagos: 2–4 semanas. Una app con funcionalidades avanzadas: 4–8 semanas. Siempre te doy un estimado claro antes de empezar.',
    category: 'Proyectos',
  },
  {
    id: 2,
    question: '¿Qué tecnologías usas principalmente?',
    answer:
      'Mi stack principal es Next.js + React + TypeScript para el frontend, Supabase o PostgreSQL para la base de datos, y TailwindCSS para los estilos. También trabajo con Python, Java y Node.js según el proyecto.',
    category: 'Tecnología',
  },
  {
    id: 3,
    question: '¿Cómo funciona la compra de códigos en la tienda?',
    answer:
      'Puedes ver una demo gratuita de cada código. Si te interesa el código completo, puedes adquirirlo a través de los métodos de pago disponibles. Recibes acceso inmediato al repositorio o archivo comprimido. Incluye soporte básico por 30 días.',
    category: 'Tienda',
  },
  {
    id: 4,
    question: '¿Ofrecen soporte post-entrega?',
    answer:
      'Sí. Todos los proyectos incluyen 1 mes de soporte gratuito para correcciones de bugs. Después de ese período, puedo ofrecerte planes de mantenimiento mensual. Para los códigos de la tienda, el soporte básico es de 30 días.',
    category: 'Soporte',
  },
  {
    id: 5,
    question: '¿Puedo solicitar una reunión antes de contratar?',
    answer:
      'Por supuesto. Ofrezco una videollamada de 30 minutos completamente gratis para entender tu proyecto, resolver dudas y darte un presupuesto claro sin compromisos. Contáctame por WhatsApp o email.',
    category: 'Proceso',
  },
  {
    id: 6,
    question: '¿Trabajas con clientes fuera de Colombia?',
    answer:
      'Sí, trabajo con clientes de toda Latinoamérica y también de España, EE.UU. y otros países. La comunicación es 100% remota vía WhatsApp, Slack o Meet. Los pagos internacionales se manejan según convenga a ambas partes.',
    category: 'Internacional',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-neon-gold/60 text-xs uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-neon-gold/40" />
            Preguntas frecuentes
            <span className="w-8 h-px bg-neon-gold/40" />
          </div>
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4">
            Dudas <span className="text-neon-gold text-glow-gold">Resueltas</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Las respuestas a las preguntas más comunes sobre mi trabajo, proceso y tienda.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-neon-gold/40 bg-neon-gold/5'
                    : 'border-gray-800 bg-[#0d0d0d] hover:border-gray-700'
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? 'bg-neon-gold text-black' : 'bg-white/5 text-gray-500'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className={`font-medium text-sm md:text-base transition-colors ${
                      isOpen ? 'text-neon-gold' : 'text-white'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`flex-shrink-0 transition-colors ${isOpen ? 'text-neon-gold' : 'text-gray-600'}`}>
                    {isOpen
                      ? <ChevronUp className="w-5 h-5" />
                      : <ChevronDown className="w-5 h-5" />
                    }
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="pl-12">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                      <span className="inline-block mt-3 text-[10px] uppercase tracking-widest text-neon-gold/50 bg-neon-gold/10 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
