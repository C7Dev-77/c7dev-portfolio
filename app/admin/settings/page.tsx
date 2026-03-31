'use client';

import {
    Palette,
    Languages,
    Accessibility,
    Gauge,
    PenTool,
    Type,
    Save,
    RotateCcw,
    CheckCircle2,
    AlertCircle,
    User,
    Code,
    Plus,
    Trash2
} from 'lucide-react';
import { useState } from 'react';
import { useConfig } from '@/context/ConfigContext';


export default function SettingsPage() {
    const { config, updateConfig, resetConfig } = useConfig();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('theme');

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            updateConfig(config);
            setSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 800);
    };

    const handleReset = () => {
        if (confirm('¿Estás seguro de restablecer la configuración por defecto?')) {
            resetConfig();
        }
    };

    // Helper para actualizar config profundamente
    const updateSettings = (
        section: 'theme' | 'texts' | 'bio' | 'stack' | 'accessibility' | 'performance' | 'language' | 'devMode',
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
        { id: 'language', label: 'Idioma', icon: Languages },
        { id: 'accessibility', label: 'Accesibilidad', icon: Accessibility },
        { id: 'performance', label: 'Rendimiento', icon: Gauge },
        { id: 'devMode', label: 'Modo Dev', icon: PenTool },
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

                {/* ===== IDIOMA ===== */}
                {activeTab === 'language' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Configuración de Idioma</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { code: 'es', label: 'Español', flag: '🇪🇸' },
                                { code: 'en', label: 'English', flag: '🇬🇧' },
                                { code: 'fr', label: 'Français', flag: '🇫🇷' },
                                { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
                            ].map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => updateConfig({ ...config, language: lang.code })}
                                    className={`
                    p-4 rounded-xl border-2 transition-all text-left
                    ${config.language === lang.code
                                            ? 'border-neon-gold bg-neon-gold/10'
                                            : 'border-gray-700 bg-white/5 hover:border-gray-600'
                                        }
                  `}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{lang.flag}</span>
                                        <div>
                                            <p className="text-white font-medium">{lang.label}</p>
                                            <p className="text-xs text-gray-500">{lang.code.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-blue-400 text-sm font-medium">Próximamente</p>
                                <p className="text-blue-300/70 text-sm">La traducción automática se implementará en una actualización futura.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== ACCESIBILIDAD ===== */}
                {activeTab === 'accessibility' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Opciones de Accesibilidad</h2>

                        <div className="space-y-4">
                            {[
                                { key: 'highContrast', label: 'Alto Contraste', desc: 'Mejora la visibilidad de elementos', value: config.accessibility.highContrast },
                                { key: 'largeText', label: 'Texto Grande', desc: 'Aumenta el tamaño de fuente', value: config.accessibility.largeText },
                                { key: 'reduceMotion', label: 'Reducir Movimiento', desc: 'Desactiva animaciones complejas', value: config.accessibility.reduceMotion },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">{item.label}</p>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={item.value}
                                            onChange={(e) => updateSettings('accessibility', item.key, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-gold"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== RENDIMIENTO ===== */}
                {activeTab === 'performance' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Optimización de Rendimiento</h2>

                        <div className="space-y-4">
                            {[
                                { key: 'lazyLoadImages', label: 'Lazy Load de Imágenes', desc: 'Carga imágenes cuando sean visibles', value: config.performance.lazyLoadImages },
                                { key: 'cacheEnabled', label: 'Caché Activado', desc: 'Almacena recursos para carga rápida', value: config.performance.cacheEnabled },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">{item.label}</p>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={item.value}
                                            onChange={(e) => updateSettings('performance', item.key, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                    </label>
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm text-gray-400 mb-3">
                                    Nivel de Compresión: {config.performance.compressionLevel}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={config.performance.compressionLevel}
                                    onChange={(e) => updateSettings('performance', 'compressionLevel', parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-gold"
                                />
                                <div className="flex justify-between text-xs text-gray-600 mt-1">
                                    <span>Sin compresión</span>
                                    <span>Máxima compresión</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== MODO DEV ===== */}
                {activeTab === 'devMode' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Modo Desarrollador</h2>

                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                            <div>
                                <p className="text-white font-medium text-lg">Activar Modo Edición Visual</p>
                                <p className="text-sm text-gray-400 mt-1">Edita tu página en tiempo real (similar a Wix)</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.devMode}
                                    onChange={(e) => updateConfig({ ...config, devMode: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                            </label>
                        </div>

                        {config.devMode && (
                            <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                                <div className="flex items-start gap-3 mb-4">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-green-400 font-medium mb-1">¡Modo Dev Activado!</p>
                                        <p className="text-green-300/70 text-sm">
                                            Ahora puedes hacer clic en cualquier elemento de la página para editarlo directamente.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-green-200/70">
                                    <p>• Haz clic en cualquier texto para editarlo</p>
                                    <p>• Arrastra elementos para reordenarlos</p>
                                    <p>• Doble clic en imágenes para cambiarlas</p>
                                    <p>• Los cambios se guardan automáticamente</p>
                                </div>
                            </div>
                        )}

                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-yellow-400 text-sm font-medium">Función Experimental</p>
                                <p className="text-yellow-300/70 text-sm">El modo de edición visual está en desarrollo. Algunas funciones pueden no funcionar como se espera.</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
