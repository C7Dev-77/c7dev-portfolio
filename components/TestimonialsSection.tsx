'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Andrés Mejía',
    role: 'CEO — StartupCO',
    avatar: 'AM',
    avatarColor: 'from-purple-500 to-indigo-600',
    rating: 5,
    text: 'Cristian transformó completamente nuestra plataforma en tiempo récord. La calidad del código y el diseño superaron todas nuestras expectativas. Definitivamente volvería a contratar.',
    project: 'App Web Full Stack',
    date: 'Marzo 2025',
  },
  {
    id: 2,
    name: 'Valentina Torres',
    role: 'Directora de Marketing — AgenciaVT',
    avatar: 'VT',
    avatarColor: 'from-pink-500 to-rose-600',
    rating: 5,
    text: 'El portafolio que nos entregó es simplemente impresionante. Animaciones fluidas, diseño premium y carga rapidísima. Nuestros clientes quedaron encantados.',
    project: 'Portafolio Empresarial',
    date: 'Enero 2025',
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    role: 'Desarrollador — Freelance',
    avatar: 'CR',
    avatarColor: 'from-green-500 to-emerald-600',
    rating: 5,
    text: 'Compré uno de sus códigos y la calidad es brutal. Comentado, organizado y funcionando perfectamente. La relación calidad-precio es imbatible. 100% recomendado.',
    project: 'Dashboard Template',
    date: 'Febrero 2025',
  },
  {
    id: 4,
    name: 'Laura Sanchez',
    role: 'Emprendedora Digital',
    avatar: 'LS',
    avatarColor: 'from-amber-500 to-orange-600',
    rating: 5,
    text: 'Me ayudó a lanzar mi tienda online en menos de 2 semanas. Muy profesional, puntual y siempre disponible para resolver dudas. Mi negocio creció un 40% ese mes.',
    project: 'E-commerce Completo',
    date: 'Diciembre 2024',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 200);
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-neon-gold/60 text-xs uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-neon-gold/40" />
            Lo que dicen
            <span className="w-8 h-px bg-neon-gold/40" />
          </div>
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4">
            Clientes <span className="text-neon-gold text-glow-gold">Satisfechos</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Más de 30 proyectos entregados exitosamente. Aquí lo que dicen quienes trabajaron conmigo.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto text-center">
          {[
            { value: '30+', label: 'Proyectos' },
            { value: '100%', label: 'Satisfacción' },
            { value: '5★', label: 'Calificación' },
          ].map((s) => (
            <div key={s.label} className="bg-black/50 border border-neon-gold/20 rounded-xl py-3 px-2">
              <p className="text-xl font-bold text-neon-gold">{s.value}</p>
              <p className="text-gray-600 text-xs uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main testimonial card */}
        <div className="relative max-w-3xl mx-auto">
          <div
            className={`bg-[#0d0d0d] border border-gray-800 hover:border-neon-gold/30 rounded-3xl p-8 md:p-10 transition-all duration-300 ${
              animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Quote icon */}
            <div className="absolute -top-4 left-8 w-10 h-10 bg-neon-gold rounded-xl flex items-center justify-center shadow-lg">
              <Quote className="w-5 h-5 text-black fill-black" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6 mt-2">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-neon-gold fill-neon-gold" />
              ))}
            </div>

            {/* Text */}
            <p className="text-gray-200 text-lg leading-relaxed mb-8 italic">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-neon-gold/60 uppercase tracking-widest bg-neon-gold/10 border border-neon-gold/20 px-3 py-1 rounded-full">
                  {t.project}
                </span>
                <p className="text-gray-700 text-xs mt-1">{t.date}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-700 hover:border-neon-gold text-gray-500 hover:text-neon-gold transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-neon-gold w-6' : 'bg-gray-700 w-2 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-700 hover:border-neon-gold text-gray-500 hover:text-neon-gold transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom mini cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.id}
              onClick={() => goTo(i)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                i === current
                  ? 'border-neon-gold/50 bg-neon-gold/5'
                  : 'border-gray-800 bg-[#0a0a0a] hover:border-gray-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white text-xs font-bold mb-2`}>
                {testimonial.avatar}
              </div>
              <p className="text-white text-xs font-medium truncate">{testimonial.name}</p>
              <p className="text-gray-600 text-[10px] truncate">{testimonial.project}</p>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
