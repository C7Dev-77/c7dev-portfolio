'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/admin');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 cyber-grid pt-20">
            <div className="max-w-md w-full glass-panel p-8 relative overflow-hidden group">
                {/* Decorative background glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-neon-gold/30 bg-cyber-black mb-4 shadow-neon-gold group-hover:scale-110 transition-transform duration-500">
                        <Lock className="w-8 h-8 text-neon-gold" />
                    </div>
                    <h1 className="font-outfit text-2xl font-bold text-white mb-2 tracking-wider">
                        ACCESO <span className="text-neon-gold">RESTRINGIDO</span>
                    </h1>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">Solo personal autorizado</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        {error}
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
                                className="w-full bg-cyber-black/50 border border-gray-800 focus:border-neon-gold outline-none p-3 pl-10 text-white transition-all font-sans"
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
                                className="w-full bg-cyber-black/50 border border-gray-800 focus:border-neon-gold outline-none p-3 pl-10 text-white transition-all font-sans"
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cyber-btn py-4 bg-neon-gold text-cyber-black font-bold uppercase tracking-[4px] flex items-center justify-center gap-3 hover:shadow-neon-gold transition-all"
                    >
                        {loading ? <span className="animate-spin">⚡</span> : <>INICIAR SESIÓN <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </form>


            </div>
        </main>
    );
}
