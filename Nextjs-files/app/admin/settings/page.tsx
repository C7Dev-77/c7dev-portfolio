'use client';

import {
    Palette,
    Type,
    Save,
    RotateCcw,
    CheckCircle2,
    User,
    Code,
    Plus,
    Trash2,
    Heart
} from 'lucide-react';
import { useState } from 'react';
import { useConfig } from '@/context/ConfigContext';


export default function SettingsPage() {
    const { config, updateConfig, resetConfig } = useConfig();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('theme');

    const handleSave = async () => {
        setSaving(true);
        setSaveError(null);
        const success = await updateConfig(config);
        setSaving(false);
        if (success) {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } else {
            setSaveError('Error al guardar en Supabase. Verifica tu sesión de admin.');
        }
    };

    const handleReset = () => {
        if (confirm('¿Estás seguro de restablecer la configuración por defecto?')) {
            resetConfig();
        }
    };

    // Helper para actualizar config profundamente
    const updateSettings = (
        section: 'theme' | 'texts' | 'bio' | 'stack' | 'donations',
        key: string,
        value: any
    ) => {
        const newConfig = { ...config } as any;
        if (newConfig[section] !== null && typeof newConfig[section] === 'object') {
            newConfig[section] = { ...newConfig[section], [key]: value };
        } else {
            newConfig[section] = value;
        }
        updateConfig(newConfig);
    };

    const tabs = [
        { id: 'theme', label: 'Tema', icon: Palette },
        { id: 'perfil', label: 'Perfil', icon: User },
        { id: 'stack', label: 'Stack', icon: Code },
        { id: 'texts', label: 'Textos', icon: Type },
        { id: 'donations', label: 'Donaciones', icon: Heart },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
                    <p className="text-gray-500">Personaliza tu sitio web</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Restablecer
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-neon-gold to-amber-600 text-black font-medium rounded-xl hover:shadow-lg hover:shadow-neon-gold/25 transition-all disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                Guardando...
                            </>
                        ) : saved ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                Guardado
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Guardar Cambios
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all
              ${activeTab === tab.id
                                ? 'bg-neon-gold text-black'
                                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                            }
            `}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-[#111111] rounded-2xl border border-gray-800/50 p-6">

                {/* ===== PERFIL / BIO ===== */}
                {activeTab === 'perfil' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Biografía Profesional</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Tu Nombre</label>
                                <input
                                    type="text"
                                    value={config.bio?.name || ''}
                                    onChange={(e) => updateSettings('bio', 'name', e.target.value)}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none"
                                    placeholder="Cristian Morales"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Párrafo 1 — Presentación</label>
                                <textarea
                                    value={config.bio?.bio1 || ''}
                                    onChange={(e) => updateSettings('bio', 'bio1', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none resize-none"
                                    placeholder="Ingeniero de Sistemas enfocado en..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Párrafo 2 — Experiencia</label>
                                <textarea
                                    value={config.bio?.bio2 || ''}
                                    onChange={(e) => updateSettings('bio', 'bio2', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none resize-none"
                                    placeholder="Cuento con experiencia en..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Párrafo 3 — Pasión</label>
                                <textarea
                                    value={config.bio?.bio3 || ''}
                                    onChange={(e) => updateSettings('bio', 'bio3', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none resize-none"
                                    placeholder="Me apasiona transformar..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Frase / Quote</label>
                                <input
                                    type="text"
                                    value={config.bio?.quote || ''}
                                    onChange={(e) => updateSettings('bio', 'quote', e.target.value)}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none"
                                    placeholder={'"Mi objetivo es crear software que no solo funcione bien..."'}
                                />
                            </div>
                        </div>
                        <div className="p-4 bg-neon-gold/10 border border-neon-gold/30 rounded-xl text-sm text-yellow-200/80">
                            ✅ Los cambios se reflejan en tiempo real en la página principal.
                        </div>
                    </div>
                )}

                {/* ===== STACK ===== */}
                {activeTab === 'stack' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Stack Tecnológico</h2>

                        {/* Skills / Barras de progreso */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm text-gray-400">Habilidades (barras de progreso)</label>
                                <button
                                    onClick={() => {
                                        const newSkills = [
                                            ...(config.stack?.skills || []),
                                            { name: 'Nueva habilidad', level: 70, color: '#FFD700' }
                                        ];
                                        updateConfig({ ...config, stack: { ...config.stack, skills: newSkills } });
                                    }}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-neon-gold/20 text-neon-gold rounded-lg text-xs hover:bg-neon-gold/30 transition-colors"
                                >
                                    <Plus className="w-3 h-3" /> Agregar
                                </button>
                            </div>
                            <div className="space-y-3">
                                {(config.stack?.skills || []).map((skill, idx) => (
                                    <div key={idx} className="flex gap-3 items-center p-3 bg-white/5 rounded-xl">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => {
                                                const s = [...config.stack.skills];
                                                s[idx] = { ...s[idx], name: e.target.value };
                                                updateConfig({ ...config, stack: { ...config.stack, skills: s } });
                                            }}
                                            className="flex-1 px-3 py-2 bg-black border border-gray-700 rounded-lg text-white text-sm focus:border-neon-gold focus:outline-none"
                                            placeholder="Nombre tecnología"
                                        />
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={skill.level}
                                            onChange={(e) => {
                                                const s = [...config.stack.skills];
                                                s[idx] = { ...s[idx], level: parseInt(e.target.value) || 0 };
                                                updateConfig({ ...config, stack: { ...config.stack, skills: s } });
                                            }}
                                            className="w-20 px-3 py-2 bg-black border border-gray-700 rounded-lg text-white text-sm focus:border-neon-gold focus:outline-none"
                                            placeholder="%"
                                        />
                                        <input
                                            type="color"
                                            value={skill.color}
                                            onChange={(e) => {
                                                const s = [...config.stack.skills];
                                                s[idx] = { ...s[idx], color: e.target.value };
                                                updateConfig({ ...config, stack: { ...config.stack, skills: s } });
                                            }}
                                            className="w-10 h-10 rounded-lg border border-gray-700 bg-black cursor-pointer"
                                            title="Color de la barra"
                                        />
                                        <button
                                            onClick={() => {
                                                const s = config.stack.skills.filter((_, i) => i !== idx);
                                                updateConfig({ ...config, stack: { ...config.stack, skills: s } });
                                            }}
                                            className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Badges */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Badges / Tecnologías (separadas por coma)</label>
                            <textarea
                                value={(config.stack?.badges || []).join(', ')}
                                onChange={(e) => {
                                    const badges = e.target.value.split(',').map((b) => b.trim()).filter(Boolean);
                                    updateConfig({ ...config, stack: { ...config.stack, badges } });
                                }}
                                rows={3}
                                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none resize-none"
                                placeholder="React, Next.js, Node.js, Tailwind, Git, ..."
                            />
                        </div>

                        <div className="p-4 bg-neon-gold/10 border border-neon-gold/30 rounded-xl text-sm text-yellow-200/80">
                            ✅ Los cambios se reflejan en tiempo real en la página principal.
                        </div>
                    </div>
                )}

                {/* ===== TEMA ===== */}
                {activeTab === 'theme' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Personalización de Tema</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Color Primario (Oro)</label>
                                <input
                                    type="color"
                                    value={config.theme.primaryColor}
                                    onChange={(e) => updateSettings('theme', 'primaryColor', e.target.value)}
                                    className="w-full h-12 rounded-xl border border-gray-700 bg-black cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Color Secundario (Platino)</label>
                                <input
                                    type="color"
                                    value={config.theme.secondaryColor}
                                    onChange={(e) => updateSettings('theme', 'secondaryColor', e.target.value)}
                                    className="w-full h-12 rounded-xl border border-gray-700 bg-black cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Color de Acento</label>
                                <input
                                    type="color"
                                    value={config.theme.accentColor}
                                    onChange={(e) => updateSettings('theme', 'accentColor', e.target.value)}
                                    className="w-full h-12 rounded-xl border border-gray-700 bg-black cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div>
                                <p className="text-white font-medium">Modo Oscuro</p>
                                <p className="text-sm text-gray-500">Activar tema oscuro</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.theme.darkMode}
                                    onChange={(e) => updateSettings('theme', 'darkMode', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-gold"></div>
                            </label>
                        </div>
                    </div>
                )}

                {/* ===== TEXTOS ===== */}
                {activeTab === 'texts' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Textos Editables</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Título Principal</label>
                                <input
                                    type="text"
                                    value={config.texts.homeTitle}
                                    onChange={(e) => updateSettings('texts', 'homeTitle', e.target.value)}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none"
                                    placeholder="C7Dev_"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Subtítulo</label>
                                <input
                                    type="text"
                                    value={config.texts.homeSubtitle}
                                    onChange={(e) => updateSettings('texts', 'homeSubtitle', e.target.value)}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none"
                                    placeholder="Desarrollador Web • Ing de Sistemas"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Botón CTA Principal</label>
                                <input
                                    type="text"
                                    value={config.texts.ctaButton}
                                    onChange={(e) => updateSettings('texts', 'ctaButton', e.target.value)}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none"
                                    placeholder="Ver Códigos"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Texto Footer</label>
                                <textarea
                                    value={config.texts.footerText}
                                    onChange={(e) => updateSettings('texts', 'footerText', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none resize-none"
                                    placeholder="Código limpio y mantenible"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== DONACIONES ===== */}
                {activeTab === 'donations' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Configuración de Donaciones</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Llave Nu / Nequi / Bre-B</label>
                                <input
                                    type="text"
                                    value={config.donations?.nuKey || ''}
                                    onChange={(e) => updateSettings('donations', 'nuKey', e.target.value)}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none font-mono"
                                    placeholder="@UDS891"
                                />
                                <p className="text-xs text-gray-500 mt-1">Ejemplo: @UDS891 o tu número de Nequi/Bre-B</p>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Ruta o URL de Imagen QR de Donaciones</label>
                                <input
                                    type="text"
                                    value={config.donations?.qrCodeUrl || ''}
                                    onChange={(e) => updateSettings('donations', 'qrCodeUrl', e.target.value)}
                                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-neon-gold focus:outline-none"
                                    placeholder="/donaciones-qr.png"
                                />
                                <p className="text-xs text-gray-500 mt-1">Puedes usar /donaciones-qr.png o una URL pública de Supabase Storage/Image</p>
                            </div>
                        </div>

                        <div className="p-4 bg-neon-gold/10 border border-neon-gold/30 rounded-xl text-sm text-yellow-200/80">
                            ✅ Esta información se mostrará automáticamente en el pie de la tienda y en la sección de donaciones.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
