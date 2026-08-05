-- SQL-FIX-ADMIN-PORTFOLIO-RLS.sql
-- Ejecuta este script en el SQL Editor de Supabase
-- SOLUCIONA: Permisos RLS para la tabla 'proyectos' para que el Admin pueda crear, editar y eliminar sin bloqueos

-- 1. Habilitar RLS en la tabla proyectos
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

-- 2. Permitir a usuarios anónimos (visitantes de la web) LEER proyectos activos
DROP POLICY IF EXISTS "Allow public read active proyectos" ON proyectos;
CREATE POLICY "Allow public read active proyectos"
  ON proyectos
  FOR SELECT
  TO anon
  USING (true);

-- 3. Permitir a usuarios autenticados (Admin) LEER todos los proyectos
DROP POLICY IF EXISTS "Allow authenticated read proyectos" ON proyectos;
CREATE POLICY "Allow authenticated read proyectos"
  ON proyectos
  FOR SELECT
  TO authenticated
  USING (true);

-- 4. Permitir INSERT a usuarios autenticados (Admin)
DROP POLICY IF EXISTS "Allow authenticated insert proyectos" ON proyectos;
CREATE POLICY "Allow authenticated insert proyectos"
  ON proyectos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. Permitir UPDATE a usuarios autenticados (Admin)
DROP POLICY IF EXISTS "Allow authenticated update proyectos" ON proyectos;
CREATE POLICY "Allow authenticated update proyectos"
  ON proyectos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Permitir DELETE a usuarios autenticados (Admin)
DROP POLICY IF EXISTS "Allow authenticated delete proyectos" ON proyectos;
CREATE POLICY "Allow authenticated delete proyectos"
  ON proyectos
  FOR DELETE
  TO authenticated
  USING (true);
