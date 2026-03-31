'use client';

import { Mail, MessageCircle } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';

interface BioStackSectionProps {
    whatsappLink: string;
}

export default function BioStackSection({ whatsappLink }: BioStackSectionProps) {
    const { config } = useConfig();
    const bio = config.bio;
    const stack = config.stack;

    return (
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

                    <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                        <p>
                            <strong className="text-white">{bio.name}</strong> — {bio.bio1}
                        </p>
                        <p>
                            Cuento con experiencia en <span className="text-neon-gold">desarrollo web, backend y automatización</span>, {bio.bio2.startsWith('Cuento') ? bio.bio2.replace(/^Cuento[^,]+,\s*/, '') : bio.bio2}
                        </p>
                        <p>{bio.bio3}</p>
                        <p className="text-sm border-l-2 border-neon-gold pl-4 italic text-gray-400">
                            {bio.quote}
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
                    {stack.skills.map((skill) => (
                        <div key={skill.name}>
                            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">
                                <span>{skill.name}</span>
                                <span style={{ color: skill.color }}>{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${skill.level}%`,
                                        background: `linear-gradient(to right, ${skill.color}99, ${skill.color})`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-8">
                    {stack.badges.map((badge) => (
                        <span
                            key={badge}
                            className="px-3 py-1.5 bg-white/5 border border-gray-800 rounded-lg text-[10px] text-gray-500 uppercase tracking-wider hover:border-neon-gold hover:text-neon-gold transition-colors cursor-default"
                        >
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
