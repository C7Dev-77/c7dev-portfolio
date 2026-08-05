'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

// Tipos iguales a los de SettingsPage
interface SkillItem {
    name: string;
    level: number;
    color: string;
}

export interface SiteConfig {
    theme: {
        primaryColor: string;
        secondaryColor: string;
        accentColor: string;
        darkMode: boolean;
    };
    texts: {
        homeTitle: string;
        homeSubtitle: string;
        ctaButton: string;
        footerText: string;
    };
    bio: {
        name: string;
        bio1: string;
        bio2: string;
        bio3: string;
        quote: string;
    };
    stack: {
        skills: SkillItem[];
        badges: string[];
    };
    donations: {
        nuKey: string;
        qrCodeUrl: string;
    };
    language: string;
    accessibility: {
        highContrast: boolean;
        largeText: boolean;
        reduceMotion: boolean;
    };
    performance: {
        lazyLoadImages: boolean;
        cacheEnabled: boolean;
        compressionLevel: number;
    };
    devMode: boolean;
}

const DEFAULT_CONFIG: SiteConfig = {
    theme: {
        primaryColor: '#FFD700', // Gold
        secondaryColor: '#E5E4E2', // Platinum
        accentColor: '#FFA500',
        darkMode: true
    },
    texts: {
        homeTitle: 'C7Dev_',
        homeSubtitle: 'Desarrollador Web • Ing de Sistemas • Creador de Contenido',
        ctaButton: 'Ver Códigos',
        footerText: 'Código limpio y mantenible'
    },
    bio: {
        name: 'Cristian Morales',
        bio1: 'Ingeniero de Sistemas enfocado en el desarrollo de soluciones digitales eficientes, escalables y visualmente atractivas.',
        bio2: 'Cuento con experiencia en desarrollo web, backend y automatización, aplicando buenas prácticas de programación y tecnologías modernas para crear productos funcionales y bien estructurados.',
        bio3: 'Me apasiona transformar problemas reales en soluciones digitales que generen impacto, valor y crecimiento para empresas, emprendedores y proyectos personales.',
        quote: '"Mi objetivo es crear software que no solo funcione bien, sino que también se vea profesional y aporte resultados reales."'
    },
    stack: {
        skills: [
            { name: 'HTML5 / CSS3', level: 98, color: '#FFD700' },
            { name: 'JAVASCRIPT / TYPESCRIPT', level: 95, color: '#E5E4E2' },
            { name: 'PYTHON', level: 85, color: '#3776AB' },
            { name: 'JAVA', level: 80, color: '#ED8B00' },
            { name: 'PHP', level: 75, color: '#777BB4' },
        ],
        badges: ['React', 'Next.js', 'Node.js', 'Tailwind', 'Git', 'GitHub', 'Firebase', 'Supabase', 'MySQL', 'PostgreSQL', 'Figma', 'SEO', 'Vercel']
    },
    donations: {
        nuKey: '@UDS891',
        qrCodeUrl: '/donaciones-qr.png'
    },
    language: 'es',
    accessibility: {
        highContrast: false,
        largeText: false,
        reduceMotion: false
    },
    performance: {
        lazyLoadImages: true,
        cacheEnabled: true,
        compressionLevel: 80
    },
    devMode: false
};

interface ConfigContextType {
    config: SiteConfig;
    updateConfig: (newConfig: SiteConfig) => Promise<boolean>;
    resetConfig: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const loadInitialConfig = async () => {
            // 1. Intentar cargar desde localStorage rápido
            const savedConfig = localStorage.getItem('siteConfig');
            if (savedConfig) {
                try {
                    const parsed = JSON.parse(savedConfig);
                    setConfig((prev) => ({
                        ...DEFAULT_CONFIG,
                        ...parsed,
                        donations: { ...DEFAULT_CONFIG.donations, ...(parsed.donations || {}) }
                    }));
                } catch (e) {
                    console.error("Error parsing localStorage siteConfig", e);
                }
            }

            // 2. Cargar desde Supabase vía API
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (data?.config) {
                    const mergedConfig = {
                        ...DEFAULT_CONFIG,
                        ...data.config,
                        donations: { ...DEFAULT_CONFIG.donations, ...(data.config.donations || {}) }
                    };
                    setConfig(mergedConfig);
                    localStorage.setItem('siteConfig', JSON.stringify(mergedConfig));
                }
            } catch (err) {
                console.error("Error fetching settings from Supabase API", err);
            } finally {
                setMounted(true);
            }
        };

        loadInitialConfig();

        // Escuchar cambios en localStorage (sincronizar pestañas)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'siteConfig' && e.newValue) {
                setConfig(JSON.parse(e.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateConfig = async (newConfig: SiteConfig): Promise<boolean> => {
        // Actualizar estado local e instantáneamente en localStorage
        setConfig(newConfig);
        localStorage.setItem('siteConfig', JSON.stringify(newConfig));
        window.dispatchEvent(new Event('siteConfigUpdated'));

        // Intentar guardar en Supabase DB con sesión autenticada
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token || '';

            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ config: newConfig })
            });

            if (!res.ok) {
                const errData = await res.json();
                console.error("Failed to persist settings to Supabase DB:", errData);
                return false;
            }
            return true;
        } catch (err) {
            console.error("Error sending POST /api/settings:", err);
            return false;
        }
    };

    const resetConfig = () => {
        setConfig(DEFAULT_CONFIG);
        localStorage.removeItem('siteConfig');
        window.dispatchEvent(new Event('siteConfigUpdated'));
    };

    // Aplicar variables CSS globales para el tema
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        root.style.setProperty('--primary-color', config.theme.primaryColor);
        root.style.setProperty('--secondary-color', config.theme.secondaryColor);
        root.style.setProperty('--accent-color', config.theme.accentColor);

        if (config.theme.darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

    }, [config.theme, mounted]);

    return (
        <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}

