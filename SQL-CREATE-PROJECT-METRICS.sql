-- SQL-CREATE-PROJECT-METRICS.sql
-- Ejecuta este script en el SQL Editor de Supabase para crear la tabla de métricas en tiempo real

CREATE TABLE IF NOT EXISTS public.project_metrics (
  project_id TEXT PRIMARY KEY,
  views INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.project_metrics ENABLE ROW LEVEL SECURITY;

-- Permitir lectura y actualización a todos los usuarios (anon y authenticated)
DROP POLICY IF EXISTS "Allow public access to project_metrics" ON public.project_metrics;
CREATE POLICY "Allow public access to project_metrics" 
ON public.project_metrics 
FOR ALL 
TO public 
USING (true) 
WITH CHECK (true);

-- Conceder permisos explícitos de SELECT, INSERT, UPDATE a la clave pública anon
GRANT ALL ON public.project_metrics TO anon;
GRANT ALL ON public.project_metrics TO authenticated;
