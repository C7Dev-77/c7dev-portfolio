-- Esquema consolidado de Base de Datos para C7Dev Portfolio & Digital Codes

-- Tabla de Proyectos (Portafolio)
CREATE TABLE IF NOT EXISTS public.proyectos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    imagen_url TEXT,
    repo_url TEXT,
    demo_url TEXT,
    video_url TEXT,
    tags TEXT[],
    categoria TEXT DEFAULT 'Web App',
    destacado BOOLEAN DEFAULT false,
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Productos Públicos / Códigos
CREATE TABLE IF NOT EXISTS public.products_public (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price_cents INT DEFAULT 0,
    image_url TEXT,
    has_free_version BOOLEAN DEFAULT true,
    external_product_id TEXT,
    video_url TEXT,
    capturas TEXT[],
    tags TEXT[],
    category TEXT DEFAULT 'Código',
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Configuración del Sitio
CREATE TABLE IF NOT EXISTS public.site_config (
    id TEXT PRIMARY KEY DEFAULT 'default',
    config JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (Permisos de lectura pública)
ALTER TABLE public.proyectos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products_public ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de proyectos" ON public.proyectos FOR SELECT USING (true);
CREATE POLICY "Lectura pública de productos" ON public.products_public FOR SELECT USING (true);
CREATE POLICY "Lectura pública de config" ON public.site_config FOR SELECT USING (true);
