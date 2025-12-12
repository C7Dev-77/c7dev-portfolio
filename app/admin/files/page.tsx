'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { UploadCloud, Image as ImageIcon, Copy, Trash2, ArrowLeft, FolderOpen } from 'lucide-react';
import Link from 'next/link';

export default function FilesManager() {
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        // Intentamos listar archivos del bucket 'assets'
        // NOTA: Asegúrate de crear este bucket en tu Supabase y hacerlo público
        setLoading(true);
        const { data, error } = await supabase
            .storage
            .from('assets')
            .list('', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' },
            });

        if (data) setFiles(data);
        setLoading(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('Selecciona un archivo.');
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            fetchFiles();
        } catch (error: any) {
            alert('Error subiendo: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = (fileName: string) => {
        const { data } = supabase.storage.from('assets').getPublicUrl(fileName);
        navigator.clipboard.writeText(data.publicUrl);
        alert('URL Copiada: ' + data.publicUrl);
    };

    const deleteFile = async (fileName: string) => {
        if (!confirm('¿Eliminar archivo?')) return;
        const { error } = await supabase.storage.from('assets').remove([fileName]);
        if (!error) fetchFiles();
    };

    return (
        <main className="min-h-screen pt-24 pb-16 px-4 cyber-grid">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-white uppercase">
                            Storage <span className="text-neon-purple">System</span>
                        </h1>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="cyber-btn px-6 py-2 bg-neon-purple text-white hover:shadow-neon-purple font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all"
                        >
                            {uploading ? <span className="animate-spin">⚡</span> : <><UploadCloud className="w-4 h-4" /> Subir Archivo</>}
                        </button>
                        <input
                            type="file"
                            id="single"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                            ref={fileInputRef}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* File Grid */}
                <div className="glass-panel min-h-[500px] p-8">
                    {loading ? (
                        <div className="flex items-center justify-center h-full text-gray-500 font-mono text-sm">
                            Escaneando almacenamiento...
                        </div>
                    ) : files.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                            <FolderOpen className="w-16 h-16 opacity-20" />
                            <p className="font-mono text-sm">Almacenamiento Vacio</p>
                            <p className="text-xs max-w-xs text-center opacity-60">Asegúrate de crear un bucket público llamado 'assets' en tu Supabase.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {files.map((file) => {
                                // Generar URL para preview
                                const { data } = supabase.storage.from('assets').getPublicUrl(file.name);

                                return (
                                    <div key={file.id} className="group relative aspect-square bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-neon-purple transition-all">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={data.publicUrl} alt={file.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />

                                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                                            <p className="text-white text-[10px] truncate mb-2 font-mono">{file.name}</p>
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => copyToClipboard(file.name)}
                                                    className="p-1.5 bg-white/10 hover:bg-neon-purple hover:text-white text-gray-300 rounded transition-colors"
                                                    title="Copiar URL"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => deleteFile(file.name)}
                                                    className="p-1.5 bg-white/10 hover:bg-red-500 hover:text-white text-gray-300 rounded transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
