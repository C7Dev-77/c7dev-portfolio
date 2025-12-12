'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Por favor ingresa un email válido');
            return;
        }

        setStatus('loading');

        try {
            // Enviar email usando FormSubmit.co (servicio gratuito)
            const response = await fetch('https://formsubmit.co/ajax/christian.dev.77@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: '🔔 Nueva Suscripción al Newsletter - C7Dev',
                    email: email,
                    tipo: 'Newsletter',
                    fecha: new Date().toLocaleString('es-ES'),
                    _template: 'table',
                    _captcha: 'false'
                })
            });

            if (response.ok) {
                setStatus('success');
                setMessage('¡Suscripción exitosa! 🎉');
                setEmail('');

                // Reset después de 3 segundos
                setTimeout(() => {
                    setStatus('idle');
                    setMessage('');
                }, 3000);
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Error al suscribirse. Intenta de nuevo.');

            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 3000);
        }
    };

    return (
        <div>
            <h4 className="font-outfit font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-white"></span>
                NOVEDADES
            </h4>
            <p className="text-gray-500 text-xs mb-4">
                Suscríbete para recibir actualizaciones sobre nuevos assets y tutoriales.
            </p>

            <form onSubmit={handleSubmit} className="relative group">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu email..."
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-black/30 border border-gray-700 p-3 text-sm text-white focus:outline-none focus:border-neon-gold transition-colors pr-12 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                />

                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-neon-gold/10 hover:bg-neon-gold text-neon-gold hover:text-black transition-all rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? (
                        <Loader className="w-4 h-4 animate-spin" />
                    ) : status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : status === 'error' ? (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                    ) : (
                        <ArrowRight className="w-4 h-4" />
                    )}
                </button>
            </form>

            {message && (
                <p className={`mt-2 text-xs ${status === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}>
                    {message}
                </p>
            )}
        </div>
    );
}
