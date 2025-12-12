'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Upload,
    FolderGit2,
    Check,
    Trash2,
    Plus,
    Pencil,
    X,
    Save,
    Github,
    ExternalLink,
    Tag,
    Image as ImageIcon,
    Search,
    Play,
    Star,
    Layers,
    Eye,
    EyeOff,
    ArrowUp,
    ArrowDown
} from 'lucide-react';

interface ProyectoForm {
    titulo: string;
    descripcion: string;
    imagen_url: string;
    repo_url: string;
    demo_url: string;
    video_url: string;
    capturas: string;
    tags: string;
    categoria: string;
    destacado: boolean;
    activo: boolean;
    orden: number;
}

const CATEGORIAS = ['Web', 'Componentes', 'Templates', 'Web Apps', 'APIs', 'Animaciones', 'Otros'];

export default function PortfolioManager() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [projects, setProjects] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const emptyForm: ProyectoForm = {
        titulo: '',
        descripcion: '',
        imagen_url: '',
        repo_url: '',
        demo_url: '',
        video_url: '',
        capturas: '',
        tags: '',
        categoria: 'Web',
        destacado: false,
        activo: true,
        orden: 0
    };

    const [formData, setFormData] = useState<ProyectoForm>(emptyForm);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setFetching(true);
        const { data } = await (supabase.from('proyectos') as any)
            .select('*')
            .order('orden', { ascending: true });

        if (data) setProjects(data);
        setFetching(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este proyecto? Esta acción es irreversible.')) return;

        const { error } = await (supabase.from('proyectos') as any)
            .delete()
            .eq('id', id);

        if (!error) fetchProjects();
    };

    const handleEdit = (project: any) => {
        setEditingId(project.id);
        setFormData({
            titulo: project.titulo || '',
            descripcion: project.descripcion || '',
            imagen_url: project.imagen_url || '',
            repo_url: project.repo_url || '',
            demo_url: project.demo_url || '',
            video_url: project.video_url || '',
            capturas: Array.isArray(project.capturas) ? project.capturas.join(', ') : '',
            tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
            categoria: project.categoria || 'Web',
            destacado: project.destacado || false,
            activo: project.activo !== false, // Por defecto true
            orden: project.orden || 0
        });
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData(emptyForm);
        setShowForm(false);
    };

    const handleToggleActive = async (id: string, currentActive: boolean) => {
        const { error } = await (supabase.from('proyectos') as any)
            .update({ activo: !currentActive })
            .eq('id', id);

        if (!error) fetchProjects();
    };

    const handleToggleDestacado = async (id: string, currentDestacado: boolean) => {
        const { error } = await (supabase.from('proyectos') as any)
            .update({ destacado: !currentDestacado })
            .eq('id', id);

        if (!error) fetchProjects();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            titulo: formData.titulo,
            descripcion: formData.descripcion,
            imagen_url: formData.imagen_url,
            repo_url: formData.repo_url || null,
            demo_url: formData.demo_url || null,
            video_url: formData.video_url || null,
            capturas: formData.capturas.split(',').map(c => c.trim()).filter(Boolean),
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            categoria: formData.categoria,
            destacado: formData.destacado,
            activo: formData.activo,
            orden: formData.orden
        };

        let error;

        if (editingId) {
            const { error: updateError } = await (supabase.from('proyectos') as any)
                .update(payload)
                .eq('id', editingId);
            error = updateError;
        } else {
            const { error: insertError } = await (supabase.from('proyectos') as any)
                .insert([payload]);
            error = insertError;
        }

        if (!error) {
            setSuccess(true);
            setFormData(emptyForm);
            setEditingId(null);
            fetchProjects();
            setTimeout(() => {
                setSuccess(false);
                setShowForm(false);
            }, 2000);
        } else {
            alert("Error al guardar: " + error.message);
        }
        setLoading(false);
    };

    const filteredProjects = projects.filter(project =>
        project.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.descripcion?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags && project.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FolderGit2 className="w-7 h-7 text-neon-platinum" />
                        Gestión de Portafolio
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {projects.length} proyecto{projects.length !== 1 ? 's' : ''} en el portafolio
                    </p>
                </div>
                <button
                    onClick={() => {
                        if (showForm) {
                            handleCancelEdit();
                        } else {
                            setShowForm(true);
                        }
                    }}
                    className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all
                        ${showForm
                            ? 'bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20'
                            : 'bg-gradient-to-r from-neon-platinum to-gray-400 text-black hover:shadow-lg hover:shadow-neon-platinum/25'
                        }
                    `}
                >
                    {showForm ? (
                        <>
                            <X className="w-4 h-4" />
                            <span>Cancelar</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4" />
                            <span>Agregar Proyecto</span>
                        </>
                    )}
                </button>
            </div>

            {/* Formulario */}
            {showForm && (
                <div className="bg-[#111111] rounded-2xl border border-gray-800/50 overflow-hidden animate-in slide-in-from-top-4 duration-300">
                    <div className="p-6 border-b border-gray-800/50 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${editingId ? 'bg-blue-500/10' : 'bg-neon-platinum/10'}`}>
                            {editingId ? <Pencil className="w-5 h-5 text-blue-500" /> : <FolderGit2 className="w-5 h-5 text-neon-platinum" />}
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">
                                {editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                            </h3>
                            <p className="text-gray-500 text-xs">
                                {editingId ? 'Modifica los campos que desees actualizar' : 'Completa todos los campos requeridos'}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Fila 1: Título y Categoría */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <FolderGit2 className="w-3 h-3" /> Título del Proyecto *
                                </label>
                                <input
                                    required
                                    placeholder="Ej: Animación Login Cyberpunk"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-platinum outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.titulo}
                                    onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <Layers className="w-3 h-3" /> Categoría
                                </label>
                                <select
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-platinum outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.categoria}
                                    onChange={e => setFormData({ ...formData, categoria: e.target.value })}
                                >
                                    {CATEGORIAS.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider">
                                Descripción *
                            </label>
                            <textarea
                                rows={3}
                                required
                                placeholder="Describe tu proyecto... (aparecerá en la vista de detalle)"
                                className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-platinum outline-none p-3 rounded-xl text-white transition-all text-sm resize-none"
                                value={formData.descripcion}
                                onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                            />
                        </div>

                        {/* Imagen Principal */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                <ImageIcon className="w-3 h-3" /> Imagen Principal *
                            </label>
                            <div className="flex gap-4">
                                <input
                                    required
                                    placeholder="https://ejemplo.com/imagen.jpg o URL de Unsplash"
                                    className="flex-1 bg-[#0a0a0a] border border-gray-800 focus:border-neon-platinum outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.imagen_url}
                                    onChange={e => setFormData({ ...formData, imagen_url: e.target.value })}
                                />
                                {formData.imagen_url && (
                                    <div className="w-16 h-12 rounded-xl overflow-hidden border border-gray-700 flex-shrink-0">
                                        <img src={formData.imagen_url} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* VIDEO URL - NUEVO */}
                        <div className="space-y-2">
                            <label className="text-neon-gold text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                <Play className="w-3 h-3" /> Video Demo (YouTube/Vimeo) - Opcional
                            </label>
                            <input
                                placeholder="https://www.youtube.com/embed/TU_VIDEO_ID"
                                className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-gold outline-none p-3 rounded-xl text-white transition-all text-sm"
                                value={formData.video_url}
                                onChange={e => setFormData({ ...formData, video_url: e.target.value })}
                            />
                            <p className="text-gray-600 text-xs">
                                💡 Tip: Usa la URL de "embed" de YouTube. Ej: youtube.com/embed/VIDEO_ID
                            </p>
                        </div>

                        {/* Capturas adicionales - NUEVO */}
                        <div className="space-y-2">
                            <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                <ImageIcon className="w-3 h-3" /> Capturas Adicionales (URLs separadas por coma)
                            </label>
                            <input
                                placeholder="https://url1.jpg, https://url2.jpg, https://url3.jpg"
                                className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-gray-600 outline-none p-3 rounded-xl text-white transition-all text-sm"
                                value={formData.capturas}
                                onChange={e => setFormData({ ...formData, capturas: e.target.value })}
                            />
                        </div>

                        {/* Tags y Orden */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <Tag className="w-3 h-3" /> Tecnologías (separadas por coma)
                                </label>
                                <input
                                    placeholder="React, Next.js, Tailwind, TypeScript"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-platinum outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider">
                                    Orden de Visualización
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-gray-600 outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.orden}
                                    onChange={e => setFormData({ ...formData, orden: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <Github className="w-3 h-3" /> Repositorio (GitHub)
                                </label>
                                <input
                                    placeholder="https://github.com/usuario/repo"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-gray-600 outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.repo_url}
                                    onChange={e => setFormData({ ...formData, repo_url: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-neon-platinum text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <ExternalLink className="w-3 h-3" /> Demo en Vivo
                                </label>
                                <input
                                    placeholder="https://mi-proyecto.vercel.app"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-platinum outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.demo_url}
                                    onChange={e => setFormData({ ...formData, demo_url: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="flex flex-wrap gap-6 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.destacado}
                                    onChange={e => setFormData({ ...formData, destacado: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-600 bg-transparent text-neon-gold focus:ring-neon-gold"
                                />
                                <span className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors">
                                    <Star className="w-4 h-4 text-neon-gold" />
                                    Proyecto Destacado
                                </span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.activo}
                                    onChange={e => setFormData({ ...formData, activo: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-600 bg-transparent text-green-500 focus:ring-green-500"
                                />
                                <span className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors">
                                    <Eye className="w-4 h-4 text-green-500" />
                                    Visible en Portafolio
                                </span>
                            </label>
                        </div>

                        {/* Botón Submit */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-6 py-3 bg-white/5 text-gray-400 rounded-xl font-medium hover:bg-white/10 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    flex-1 flex items-center justify-center gap-3 py-3 rounded-xl font-semibold transition-all
                                    ${success
                                        ? 'bg-green-500 text-white'
                                        : editingId
                                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                                            : 'bg-gradient-to-r from-neon-platinum to-gray-400 text-black hover:shadow-lg hover:shadow-neon-platinum/25'
                                    }
                                `}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : success ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        <span>¡Guardado!</span>
                                    </>
                                ) : editingId ? (
                                    <>
                                        <Save className="w-5 h-5" />
                                        <span>Guardar Cambios</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-5 h-5" />
                                        <span>Crear Proyecto</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search Bar */}
            <div className="flex items-center gap-3 bg-[#111111] rounded-xl px-4 py-3 border border-gray-800/50">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Buscar proyectos..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-600"
                />
                <span className="text-xs text-gray-600">{filteredProjects.length} resultados</span>
            </div>

            {/* Lista de Proyectos */}
            <div className="bg-[#111111] rounded-2xl border border-gray-800/50 overflow-hidden">
                <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-neon-platinum" />
                        Proyectos
                    </h3>
                </div>

                {fetching ? (
                    <div className="p-8">
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 animate-pulse">
                                    <div className="w-20 h-14 bg-gray-800 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-48 bg-gray-800 rounded" />
                                        <div className="h-3 w-32 bg-gray-800 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="p-12 text-center">
                        <FolderGit2 className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-500 mb-1">No hay proyectos</p>
                        <p className="text-gray-600 text-sm">
                            {searchQuery ? 'Intenta con otro término de búsqueda' : 'Agrega tu primer proyecto'}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-800/50">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className={`p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group ${editingId === project.id ? 'bg-blue-500/5 border-l-2 border-blue-500' : ''
                                    } ${!project.activo ? 'opacity-50' : ''}`}
                            >
                                {/* Imagen */}
                                <div className="w-20 h-14 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                                    <img
                                        src={project.imagen_url}
                                        alt={project.titulo}
                                        className="w-full h-full object-cover"
                                    />
                                    {project.video_url && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                            <Play className="w-5 h-5 text-white fill-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-white font-medium truncate">{project.titulo}</h4>
                                        {project.destacado && (
                                            <Star className="w-4 h-4 text-neon-gold fill-neon-gold flex-shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex gap-1.5 flex-wrap">
                                        <span className="text-[10px] bg-neon-platinum/10 text-neon-platinum px-2 py-0.5 rounded">
                                            {project.categoria || 'Web'}
                                        </span>
                                        {project.tags && project.tags.slice(0, 2).map((tag: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags && project.tags.length > 2 && (
                                            <span className="text-[10px] text-gray-600">+{project.tags.length - 2}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Quick Toggle Buttons */}
                                <div className="hidden md:flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleDestacado(project.id, project.destacado)}
                                        className={`p-2 rounded-lg transition-colors ${project.destacado
                                                ? 'bg-neon-gold/20 text-neon-gold'
                                                : 'hover:bg-white/10 text-gray-500 hover:text-white'
                                            }`}
                                        title={project.destacado ? 'Quitar destacado' : 'Marcar destacado'}
                                    >
                                        <Star className={`w-4 h-4 ${project.destacado ? 'fill-current' : ''}`} />
                                    </button>
                                    <button
                                        onClick={() => handleToggleActive(project.id, project.activo)}
                                        className={`p-2 rounded-lg transition-colors ${project.activo
                                                ? 'hover:bg-white/10 text-green-500'
                                                : 'bg-red-500/10 text-red-500'
                                            }`}
                                        title={project.activo ? 'Ocultar' : 'Mostrar'}
                                    >
                                        {project.activo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>

                                {/* Links */}
                                <div className="hidden sm:flex items-center gap-2">
                                    {project.repo_url && (
                                        <a
                                            href={project.repo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                            title="Ver repositorio"
                                        >
                                            <Github className="w-4 h-4" />
                                        </a>
                                    )}
                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-neon-platinum"
                                            title="Ver demo"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>

                                {/* Acciones */}
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-gray-400 hover:text-blue-500"
                                        title="Editar"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
