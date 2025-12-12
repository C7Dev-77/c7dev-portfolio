'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Upload,
    Database,
    Check,
    Trash2,
    Plus,
    Pencil,
    X,
    Save,
    Package,
    DollarSign,
    Link as LinkIcon,
    Image as ImageIcon,
    Search,
    Play,
    Star,
    Layers,
    Eye,
    EyeOff,
    Tag
} from 'lucide-react';

interface ProductoForm {
    nombre: string;
    descripcion: string;
    precio: number;
    imagen_url: string;
    link_free: string;
    link_paid: string;
    video_url: string;
    capturas: string;
    tags: string;
    categoria: string;
    destacado: boolean;
    activo: boolean;
    orden: number;
}

const CATEGORIAS = ['Código', 'Componentes', 'Templates', 'Animaciones', 'APIs', 'UI Kits', 'Otros'];

export default function ProductsManager() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [products, setProducts] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const emptyForm: ProductoForm = {
        nombre: '',
        descripcion: '',
        precio: 0,
        imagen_url: '',
        link_free: '',
        link_paid: '',
        video_url: '',
        capturas: '',
        tags: '',
        categoria: 'Código',
        destacado: false,
        activo: true,
        orden: 0
    };

    const [formData, setFormData] = useState<ProductoForm>(emptyForm);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setFetching(true);
        const { data } = await (supabase.from('productos') as any)
            .select('*')
            .order('orden', { ascending: true });

        if (data) setProducts(data);
        setFetching(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este producto? Esta acción es irreversible.')) return;

        const { error } = await (supabase.from('productos') as any)
            .delete()
            .eq('id', id);

        if (!error) fetchProducts();
    };

    const handleEdit = (product: any) => {
        setEditingId(product.id);
        setFormData({
            nombre: product.nombre || '',
            descripcion: product.descripcion || '',
            precio: product.precio || 0,
            imagen_url: product.imagen_url || '',
            link_free: product.link_free || '',
            link_paid: product.link_paid || '',
            video_url: product.video_url || '',
            capturas: Array.isArray(product.capturas) ? product.capturas.join(', ') : '',
            tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
            categoria: product.categoria || 'Código',
            destacado: product.destacado || false,
            activo: product.activo !== false,
            orden: product.orden || 0
        });
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData(emptyForm);
        setShowForm(false);
    };

    const handleToggleActive = async (id: string, currentActive: boolean) => {
        const { error } = await (supabase.from('productos') as any)
            .update({ activo: !currentActive })
            .eq('id', id);

        if (!error) fetchProducts();
    };

    const handleToggleDestacado = async (id: string, currentDestacado: boolean) => {
        const { error } = await (supabase.from('productos') as any)
            .update({ destacado: !currentDestacado })
            .eq('id', id);

        if (!error) fetchProducts();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio: formData.precio,
            imagen_url: formData.imagen_url,
            link_free: formData.link_free,
            link_paid: formData.link_paid,
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
            const { error: updateError } = await (supabase.from('productos') as any)
                .update(payload)
                .eq('id', editingId);
            error = updateError;
        } else {
            const { error: insertError } = await (supabase.from('productos') as any)
                .insert([payload]);
            error = insertError;
        }

        if (!error) {
            setSuccess(true);
            setFormData(emptyForm);
            setEditingId(null);
            fetchProducts();
            setTimeout(() => {
                setSuccess(false);
                setShowForm(false);
            }, 2000);
        } else {
            alert("Error al guardar: " + error.message);
        }
        setLoading(false);
    };

    const filteredProducts = products.filter(product =>
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Package className="w-7 h-7 text-neon-gold" />
                        Gestión de Productos
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {products.length} producto{products.length !== 1 ? 's' : ''} en inventario
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
                            : 'bg-gradient-to-r from-neon-gold to-amber-600 text-black hover:shadow-lg hover:shadow-neon-gold/25'
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
                            <span>Agregar Producto</span>
                        </>
                    )}
                </button>
            </div>

            {/* Formulario */}
            {showForm && (
                <div className="bg-[#111111] rounded-2xl border border-gray-800/50 overflow-hidden animate-in slide-in-from-top-4 duration-300">
                    <div className="p-6 border-b border-gray-800/50 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${editingId ? 'bg-blue-500/10' : 'bg-neon-gold/10'}`}>
                            {editingId ? <Pencil className="w-5 h-5 text-blue-500" /> : <Database className="w-5 h-5 text-neon-gold" />}
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">
                                {editingId ? 'Editar Producto' : 'Nuevo Producto'}
                            </h3>
                            <p className="text-gray-500 text-xs">
                                {editingId ? 'Modifica los campos que desees actualizar' : 'Completa todos los campos requeridos'}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Fila 1: Nombre, Precio, Categoría */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <Package className="w-3 h-3" /> Nombre del Producto *
                                </label>
                                <input
                                    required
                                    placeholder="Ej: Cyberpunk UI Kit"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-gold outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.nombre}
                                    onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <DollarSign className="w-3 h-3" /> Precio (USD) *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    required
                                    placeholder="29.99"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-gold outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.precio || ''}
                                    onChange={e => setFormData({ ...formData, precio: parseFloat(e.target.value) || 0 })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <Layers className="w-3 h-3" /> Categoría
                                </label>
                                <select
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-gold outline-none p-3 rounded-xl text-white transition-all text-sm"
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
                                placeholder="Describe tu producto... (aparecerá en la vista de detalle)"
                                className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-gold outline-none p-3 rounded-xl text-white transition-all text-sm resize-none"
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
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    className="flex-1 bg-[#0a0a0a] border border-gray-800 focus:border-neon-gold outline-none p-3 rounded-xl text-white transition-all text-sm"
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

                        {/* Capturas adicionales */}
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

                        {/* Tags */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <Tag className="w-3 h-3" /> Tecnologías (separadas por coma)
                                </label>
                                <input
                                    placeholder="React, Next.js, Tailwind, TypeScript"
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-gray-600 outline-none p-3 rounded-xl text-white transition-all text-sm"
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
                                <label className="text-green-500 text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <LinkIcon className="w-3 h-3" /> Link Gratuito (con anuncios) *
                                </label>
                                <input
                                    required
                                    placeholder="https://linkvertise.com/... o https://github.com/..."
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-green-500 outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.link_free}
                                    onChange={e => setFormData({ ...formData, link_free: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-neon-gold text-xs uppercase font-semibold tracking-wider flex items-center gap-2">
                                    <LinkIcon className="w-3 h-3" /> Link de Pago *
                                </label>
                                <input
                                    required
                                    placeholder="https://gumroad.com/... o https://stripe.com/..."
                                    className="w-full bg-[#0a0a0a] border border-gray-800 focus:border-neon-gold outline-none p-3 rounded-xl text-white transition-all text-sm"
                                    value={formData.link_paid}
                                    onChange={e => setFormData({ ...formData, link_paid: e.target.value })}
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
                                    Producto Destacado
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
                                    Visible en Tienda
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
                                            : 'bg-gradient-to-r from-neon-gold to-amber-600 text-black hover:shadow-lg hover:shadow-neon-gold/25'
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
                                        <span>Crear Producto</span>
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
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-600"
                />
                <span className="text-xs text-gray-600">{filteredProducts.length} resultados</span>
            </div>

            {/* Lista de Productos */}
            <div className="bg-[#111111] rounded-2xl border border-gray-800/50 overflow-hidden">
                <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <Database className="w-4 h-4 text-neon-gold" />
                        Inventario
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
                ) : filteredProducts.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-500 mb-1">No hay productos</p>
                        <p className="text-gray-600 text-sm">
                            {searchQuery ? 'Intenta con otro término de búsqueda' : 'Agrega tu primer producto'}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-800/50">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className={`p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group ${editingId === product.id ? 'bg-blue-500/5 border-l-2 border-blue-500' : ''
                                    } ${!product.activo ? 'opacity-50' : ''}`}
                            >
                                {/* Imagen */}
                                <div className="w-20 h-14 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                                    <img
                                        src={product.imagen_url}
                                        alt={product.nombre}
                                        className="w-full h-full object-cover"
                                    />
                                    {product.video_url && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                            <Play className="w-5 h-5 text-white fill-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-white font-medium truncate">{product.nombre}</h4>
                                        {product.destacado && (
                                            <Star className="w-4 h-4 text-neon-gold fill-neon-gold flex-shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex gap-1.5 flex-wrap">
                                        <span className="text-[10px] bg-neon-gold/10 text-neon-gold px-2 py-0.5 rounded">
                                            {product.categoria || 'Código'}
                                        </span>
                                        {product.tags && product.tags.slice(0, 2).map((tag: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Precio */}
                                <div className="hidden sm:block">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-neon-gold/10 text-neon-gold rounded-full text-sm font-medium">
                                        <DollarSign className="w-3 h-3" />
                                        {product.precio}
                                    </span>
                                </div>

                                {/* Quick Toggle Buttons */}
                                <div className="hidden md:flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleDestacado(product.id, product.destacado)}
                                        className={`p-2 rounded-lg transition-colors ${product.destacado
                                                ? 'bg-neon-gold/20 text-neon-gold'
                                                : 'hover:bg-white/10 text-gray-500 hover:text-white'
                                            }`}
                                        title={product.destacado ? 'Quitar destacado' : 'Marcar destacado'}
                                    >
                                        <Star className={`w-4 h-4 ${product.destacado ? 'fill-current' : ''}`} />
                                    </button>
                                    <button
                                        onClick={() => handleToggleActive(product.id, product.activo)}
                                        className={`p-2 rounded-lg transition-colors ${product.activo
                                                ? 'hover:bg-white/10 text-green-500'
                                                : 'bg-red-500/10 text-red-500'
                                            }`}
                                        title={product.activo ? 'Ocultar' : 'Mostrar'}
                                    >
                                        {product.activo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>

                                {/* Acciones */}
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-gray-400 hover:text-blue-500"
                                        title="Editar"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
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
