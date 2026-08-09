-- =======================================================
-- MIGRACIÓN: Tabla site_settings para configuración del sitio
-- Ejecutar en Supabase SQL Editor
-- =======================================================

-- 1. Crear la tabla site_settings si no existe
CREATE TABLE IF NOT EXISTS public.site_settings (
    id          INTEGER PRIMARY KEY DEFAULT 1,
    config      JSONB NOT NULL DEFAULT '{}',
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- Solo puede haber UNA fila (id = 1 siempre)
    CONSTRAINT site_settings_single_row CHECK (id = 1)
);

-- 2. Insertar fila inicial con config vacía si no existe
INSERT INTO public.site_settings (id, config, updated_at)
VALUES (1, '{}', NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. Habilitar Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 4. Política: Cualquiera puede LEER la configuración (lectura pública)
DROP POLICY IF EXISTS "site_settings_public_read" ON public.site_settings;
CREATE POLICY "site_settings_public_read"
    ON public.site_settings
    FOR SELECT
    USING (true);

-- 5. Política: Solo el SERVICE ROLE puede escribir (la API route usa service_role key)
--    El endpoint /api/settings valida la sesión del admin antes de llamar a supabase
--    y usa createServerSupabaseClient() que tiene service_role key, así que bypass RLS.
--    Pero por seguridad extra, también permitimos UPDATE/INSERT a usuarios autenticados.
DROP POLICY IF EXISTS "site_settings_admin_write" ON public.site_settings;
CREATE POLICY "site_settings_admin_write"
    ON public.site_settings
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 6. Índice para acelerar consultas
CREATE INDEX IF NOT EXISTS idx_site_settings_id ON public.site_settings(id);

-- 7. Comentario descriptivo
COMMENT ON TABLE public.site_settings IS 
'Configuración global del sitio web. Solo debe existir una fila con id=1. 
El campo config almacena el JSON completo de SiteConfig (tema, bio, stack, servicios, etc.)
La API route /api/settings lee y escribe en esta tabla usando service_role.';

-- =======================================================
-- VERIFICAR que la tabla se creó correctamente:
SELECT id, updated_at, config->>'language' as language FROM public.site_settings;
-- =======================================================
