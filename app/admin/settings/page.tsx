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
    AlertCircle
} from 'lucide-react';
import { useState } from 'react';
import { useConfig } from '@/context/ConfigContext';


export default function SettingsPage() {
    const { config, updateConfig, resetConfig } = useConfig();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('theme');

    // No necesitamos useEffect para cargar, el contexto ya lo hace

    const handleSave = () => {
        setSaving(true);
        // Simular retraso de red
        setTimeout(() => {
            // El updateConfig ya guarda en localStorage y actualiza el estado global
            // Aquí podríamos hacer una llamada a API si tuviéramos backend real para esto
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
    const updateSettings = (section: keyof typeof config, key: string, value: any) => {
        const newConfig = { ...config };
        // @ts-ignore
        if (typeof newConfig[section] === 'object' && newConfig[section] !== null) {
            // @ts-ignore
            newConfig[section] = { ...newConfig[section], [key]: value };
        } else {
            // @ts-ignore
            newConfig[section] = value;
        }
        updateConfig(newConfig); // Actualización en tiempo real
    };

    const tabs = [
        { id: 'theme', label: 'Tema', icon: Palette },
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
                {/* TEMA */}
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

                {/* TEXTOS */}
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

                {/* IDIOMA */}
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

                {/* ACCESIBILIDAD */}
                {activeTab === 'accessibility' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Opciones de Accesibilidad</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                    <p className="text-white font-medium">Alto Contraste</p>
                                    <p className="text-sm text-gray-500">Mejora la visibilidad de elementos</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={config.accessibility.highContrast}
                                        onChange={(e) => updateSettings('accessibility', 'highContrast', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-gold"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                    <p className="text-white font-medium">Texto Grande</p>
                                    <p className="text-sm text-gray-500">Aumenta el tamaño de fuente</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={config.accessibility.largeText}
                                        onChange={(e) => updateSettings('accessibility', 'largeText', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-gold"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                    <p className="text-white font-medium">Reducir Movimiento</p>
                                    <p className="text-sm text-gray-500">Desactiva animaciones complejas</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={config.accessibility.reduceMotion}
                                        onChange={(e) => updateSettings('accessibility', 'reduceMotion', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-gold"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* RENDIMIENTO */}
                {activeTab === 'performance' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Optimización de Rendimiento</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                    <p className="text-white font-medium">Lazy Load de Imágenes</p>
                                    <p className="text-sm text-gray-500">Carga imágenes cuando sean visibles</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={config.performance.lazyLoadImages}
                                        onChange={(e) => updateSettings('performance', 'lazyLoadImages', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                    <p className="text-white font-medium">Caché Activado</p>
                                    <p className="text-sm text-gray-500">Almacena recursos para carga rápida</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={config.performance.cacheEnabled}
                                        onChange={(e) => updateSettings('performance', 'cacheEnabled', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                            </div>

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

                {/* MODO DEV */}
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
