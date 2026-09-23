'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Mail, Send, Linkedin, Github, Instagram, Youtube,
  CheckCircle, AlertCircle, Loader, MessageSquare, Clock, MapPin, Facebook
} from 'lucide-react';
import ParticleNetwork from '@/components/ParticleNetwork';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'christian.dev.77@gmail.com',
    href: 'mailto:christian.dev.77@gmail.com',
    color: 'hover:text-neon-gold hover:border-neon-gold/50',
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '+57 324 425 9132',
    href: 'https://t.me/+573244259132',
    color: 'hover:text-[#0088cc] hover:border-[#0088cc]/50',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Colombia 🇨🇴',
    href: null,
    color: 'cursor-default',
  },
  {
    icon: Clock,
    label: 'Tiempo de respuesta',
    value: 'Menos de 24 horas',
    href: null,
    color: 'cursor-default',
  },
];

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/C7Dev-77', color: 'hover:border-white hover:text-white hover:bg-white/5' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/christiandev7/', color: 'hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/c7dev_', color: 'hover:border-[#E4405F] hover:text-[#E4405F] hover:bg-[#E4405F]/10' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@c7-dev', color: 'hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-[#FF0000]/10' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61584949321538', color: 'hover:border-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10' },
  { icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@c7dev__', color: 'hover:border-white hover:text-white hover:bg-white/5' },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.asunto || !form.mensaje) {
      setStatus('error');
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }
    if (!form.email.includes('@')) {
      setStatus('error');
      setErrorMsg('Por favor ingresa un email válido.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/christian.dev.77@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `📬 Nuevo mensaje de contacto — ${form.asunto}`,
          nombre: form.nombre,
          email: form.email,
          asunto: form.asunto,
          mensaje: form.mensaje,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
      } else {
        throw new Error('Error en el envío');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Error al enviar el mensaje. Intenta de nuevo o escríbeme directamente por Telegram.');
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <ParticleNetwork />
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

        <section className="flex-1 flex items-start justify-center px-4 py-12">
          <div className="max-w-5xl w-full">

            {/* Hero badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 border border-neon-gold/50 bg-neon-gold/5 text-neon-gold px-5 py-2 rounded-full text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                <MessageSquare className="w-3.5 h-3.5" />
                Contáctame
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="font-outfit text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                Hablemos de tu{' '}
                <span className="text-neon-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                  Proyecto
                </span>
              </h1>
              <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
                ¿Tienes una idea, un proyecto o simplemente quieres conectar?
                Escríbeme y te respondo en menos de 24 horas.
              </p>
            </div>

            {/* 2-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* Columna izquierda — Info de contacto */}
              <div className="flex flex-col gap-5">

                {/* Contact info cards */}
                <div className="glass-panel border border-gray-800 rounded-2xl p-6 space-y-4">
                  <h2 className="font-outfit font-bold text-white text-lg mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-neon-gold rounded-full" />
                    Información de Contacto
                  </h2>
                  {contactInfo.map((item) => (
                    <div key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 p-3 border border-gray-800 rounded-xl text-gray-400 transition-all duration-200 ${item.color}`}
                        >
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-600">{item.label}</p>
                            <p className="text-sm font-medium">{item.value}</p>
                          </div>
                        </a>
                      ) : (
                        <div className={`flex items-center gap-3 p-3 border border-gray-800 rounded-xl text-gray-400 ${item.color}`}>
                          <item.icon className="w-4 h-4 flex-shrink-0 text-neon-gold/60" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-600">{item.label}</p>
                            <p className="text-sm font-medium">{item.value}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="glass-panel border border-gray-800 rounded-2xl p-6">
                  <h3 className="font-outfit font-bold text-white text-sm mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-neon-platinum rounded-full" />
                    Redes Sociales
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.label}
                        className={`flex flex-col items-center gap-1.5 p-3 border border-gray-800 rounded-xl text-gray-500 transition-all duration-200 ${s.color}`}
                      >
                        <s.icon className="w-5 h-5" />
                        <span className="text-[9px] uppercase tracking-wide">{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna derecha — Formulario */}
              <div className="glass-panel border border-gray-800 hover:border-neon-gold/30 rounded-2xl p-6 md:p-8 transition-all duration-300">
                <h2 className="font-outfit font-bold text-white text-lg mb-6 flex items-center gap-2">
                  <span className="w-1 h-4 bg-neon-gold rounded-full" />
                  Envíame un Mensaje
                </h2>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-outfit font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                      Gracias por escribirme. Te responderé en menos de 24 horas a tu correo.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 px-5 py-2.5 border border-neon-gold/40 text-neon-gold text-sm rounded-xl hover:bg-neon-gold/10 transition-colors"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1.5">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          disabled={status === 'loading'}
                          className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          disabled={status === 'loading'}
                          className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1.5">
                        Asunto *
                      </label>
                      <select
                        name="asunto"
                        value={form.asunto}
                        onChange={handleChange}
                        disabled={status === 'loading'}
                        className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors disabled:opacity-50 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#111]">Selecciona un tema...</option>
                        <option value="Proyecto Web" className="bg-[#111]">💻 Tengo un proyecto web</option>
                        <option value="Freelance / Colaboración" className="bg-[#111]">🤝 Colaboración / Freelance</option>
                        <option value="Soporte de Producto" className="bg-[#111]">🛠️ Soporte de producto descargado</option>
                        <option value="Consulta Técnica" className="bg-[#111]">❓ Consulta técnica</option>
                        <option value="Otro" className="bg-[#111]">📌 Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1.5">
                        Mensaje *
                      </label>
                      <textarea
                        name="mensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        placeholder="Cuéntame sobre tu proyecto, idea o consulta..."
                        rows={5}
                        disabled={status === 'loading'}
                        className="w-full bg-black/40 border border-gray-800 focus:border-neon-gold rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors resize-none disabled:opacity-50"
                      />
                    </div>

                    {status === 'error' && errorMsg && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-3 py-3.5 bg-gradient-to-r from-neon-gold to-amber-500 text-black font-bold text-sm uppercase tracking-wider rounded-xl hover:shadow-[0_0_20px_rgba(255,215,0,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar Mensaje
                        </>
                      )}
                    </button>

                    <p className="text-center text-gray-700 text-[10px]">
                      También puedes escribirme directamente por{' '}
                      <a
                        href="https://t.me/+573244259132"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0088cc] hover:underline"
                      >
                        Telegram
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
