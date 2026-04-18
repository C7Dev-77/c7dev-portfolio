'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [attempts, setAttempts] = useState(0);
    const [lockedUntil, setLockedUntil] = useState<number | null>(null);
    const [lockCountdown, setLockCountdown] = useState(0);

    const isLocked = lockedUntil !== null && Date.now() < lockedUntil;
    const remainingAttempts = MAX_ATTEMPTS - attempts;

    const startLockoutCountdown = (until: number) => {
        const interval = setInterval(() => {
            const remaining = Math.ceil((until - Date.now()) / 1000);
            if (remaining <= 0) {
                clearInterval(interval);
                setLockedUntil(null);
                setLockCountdown(0);
                setAttempts(0);
                setError(null);
            } else {
                setLockCountdown(remaining);
            }
        }, 1000);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLocked) return;

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;

            setAttempts(0);
            router.push('/admin');
            router.refresh();
        } catch (err: any) {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= MAX_ATTEMPTS) {
                const until = Date.now() + LOCKOUT_SECONDS * 1000;
                setLockedUntil(until);
                setLockCountdown(LOCKOUT_SECONDS);
                startLockoutCountdown(until);
                setError(`Demasiados intentos. Espera ${LOCKOUT_SECONDS} segundos.`);
            } else {
                const friendly =
                    err.message?.includes('Invalid') || err.message?.includes('invalid')
                        ? 'Email o contraseña incorrectos.'
                        : err.message;
                setError(`${friendly} (${newAttempts}/${MAX_ATTEMPTS} intentos)`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 cyber-grid pt-20">
            <div className="max-w-md w-full glass-panel p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-gold to-transparent opacity-50" />

                <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4 shadow-neon-gold group-hover:scale-110 transition-transform duration-500 ${
                        isLocked ? 'border-red-500/50 bg-red-500/10' : 'border-neon-gold/30 bg-cyber-black'
                    }`}>
                        {isLocked
                            ? <Clock className="w-8 h-8 text-red-500" />
                            : <Lock className="w-8 h-8 text-neon-gold" />
                        }
                    </div>
                    <h1 className="font-outfit text-2xl font-bold text-white mb-2 tracking-wider">
                        ACCESO <span className="text-neon-gold">RESTRINGIDO</span>
                    </h1>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">Solo personal autorizado</p>
                </div>

                {isLocked && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <span className="text-red-400 text-sm font-bold">Acceso bloqueado temporalmente</span>
                        </div>
                        <p className="text-red-400/70 text-xs mb-3">Demasiados intentos fallidos. Sistema de seguridad activado.</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Desbloqueando en</span>
                            <span className="text-red-400 font-mono font-bold text-lg">{lockCountdown}s</span>
                        </div>
                        <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-red-500 rounded-full transition-all duration-1000"
                                style={{ width: `${((LOCKOUT_SECONDS - lockCountdown) / LOCKOUT_SECONDS) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {error && !isLocked && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-red-400 text-sm">{error}</p>
                            {remainingAttempts > 0 && remainingAttempts < MAX_ATTEMPTS && (
                                <p className="text-red-500/60 text-xs mt-1">
                                    {remainingAttempts} intento{remainingAttempts !== 1 ? 's' : ''} restante{remainingAttempts !== 1 ? 's' : ''}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-neon-gold text-[10px] uppercase font-bold tracking-[2px]">Identificación (Email)</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="email"
                                required
                                disabled={isLocked}
                                className="w-full bg-cyber-black/50 border border-gray-800 focus:border-neon-gold outline-none p-3 pl-10 text-white transition-all font-sans rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                                placeholder="admin@c7dev.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-neon-gold text-[10px] uppercase font-bold tracking-[2px]">Clave de Acceso</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="password"
                                required
                                disabled={isLocked}
                                className="w-full bg-cyber-black/50 border border-gray-800 focus:border-neon-gold outline-none p-3 pl-10 text-white transition-all font-sans rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {attempts > 0 && (
                        <div className="flex items-center justify-center gap-2">
                            {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < attempts ? 'bg-red-500' : 'bg-gray-700'}`} />
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || isLocked}
                        className="w-full cyber-btn py-4 bg-neon-gold text-cyber-black font-bold uppercase tracking-[4px] flex items-center justify-center gap-3 hover:shadow-neon-gold transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? <span className="animate-spin text-xl">⚡</span>
                            : isLocked
                                ? <><Clock className="w-5 h-5" /> BLOQUEADO ({lockCountdown}s)</>
                                : <>INICIAR SESIÓN <ArrowRight className="w-5 h-5" /></>
                        }
                    </button>
                </form>

                <p className="text-center text-gray-700 text-[10px] uppercase tracking-widest mt-6">
                    🔒 Conexión segura — Supabase Auth
                </p>
            </div>
        </main>
    );
}
