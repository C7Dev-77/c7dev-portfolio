-- SQL-SECURITY-FIX-RLS.sql
-- ============================================================
-- CORRECCIÓN DE SEGURIDAD: Restringir RLS al email del Admin
-- ============================================================
-- IMPORTANTE: Ejecutar este script en el SQL Editor de Supabase
-- Fecha: Septiembre 2026
-- Motivo: Las políticas anteriores permitían INSERT/UPDATE/DELETE
--         a CUALQUIER usuario autenticado (no solo al admin).
-- ============================================================

-- ============================================================
-- TABLA: proyectos
-- ============================================================

-- 1. Eliminar políticas permisivas anteriores
DROP POLICY IF EXISTS "Allow authenticated insert proyectos" ON proyectos;
DROP POLICY IF EXISTS "Allow authenticated update proyectos" ON proyectos;
DROP POLICY IF EXISTS "Allow authenticated delete proyectos" ON proyectos;

-- 2. Lectura pública (visitantes) — se mantiene igual
DROP POLICY IF EXISTS "Allow public read active proyectos" ON proyectos;
CREATE POLICY "Allow public read active proyectos"
  ON proyectos
  FOR SELECT
  TO anon
  USING (true);

-- 3. Lectura para usuarios autenticados (admin) — se mantiene igual
DROP POLICY IF EXISTS "Allow authenticated read proyectos" ON proyectos;
CREATE POLICY "Allow authenticated read proyectos"
  ON proyectos
  FOR SELECT
  TO authenticated
  USING (true);

-- 4. INSERT restringido SOLO al admin
CREATE POLICY "Admin only insert proyectos"
  ON proyectos
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'christian.dev.77@gmail.com');

-- 5. UPDATE restringido SOLO al admin
CREATE POLICY "Admin only update proyectos"
  ON proyectos
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'christian.dev.77@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'christian.dev.77@gmail.com');

-- 6. DELETE restringido SOLO al admin
CREATE POLICY "Admin only delete proyectos"
  ON proyectos
  FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'christian.dev.77@gmail.com');


-- ============================================================
-- TABLA: products
-- ============================================================

-- 1. Eliminar políticas permisivas anteriores
DROP POLICY IF EXISTS "Allow authenticated read products" ON products;
DROP POLICY IF EXISTS "Allow authenticated insert products" ON products;
DROP POLICY IF EXISTS "Allow authenticated update products" ON products;
DROP POLICY IF EXISTS "Allow authenticated delete products" ON products;

-- 2. Lectura restringida SOLO al admin (productos internos)
CREATE POLICY "Admin only read products"
  ON products
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'christian.dev.77@gmail.com');

-- 3. INSERT restringido SOLO al admin
CREATE POLICY "Admin only insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'christian.dev.77@gmail.com');

-- 4. UPDATE restringido SOLO al admin
CREATE POLICY "Admin only update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'christian.dev.77@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'christian.dev.77@gmail.com');

-- 5. DELETE restringido SOLO al admin
CREATE POLICY "Admin only delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'christian.dev.77@gmail.com');

-- 6. Mantener bloqueado el acceso anónimo directo a products
DROP POLICY IF EXISTS "Deny anon access to products" ON products;
CREATE POLICY "Deny anon access to products"
  ON products
  FOR ALL
  TO anon
  USING (false);

-- 7. Vista pública sigue accesible para anon
GRANT SELECT ON products_public TO anon;


-- ============================================================
-- TABLA: site_settings (si existe)
-- ============================================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'site_settings') THEN
    -- Eliminar políticas anteriores
    EXECUTE 'DROP POLICY IF EXISTS "Allow public read site_settings" ON site_settings';
    EXECUTE 'DROP POLICY IF EXISTS "Allow authenticated update site_settings" ON site_settings';

    -- Lectura pública (para cargar configuración del sitio)
    EXECUTE 'CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT TO anon USING (true)';
    EXECUTE 'CREATE POLICY "Auth read site_settings" ON site_settings FOR SELECT TO authenticated USING (true)';

    -- Escritura SOLO admin
    EXECUTE 'CREATE POLICY "Admin only update site_settings" ON site_settings FOR UPDATE TO authenticated USING ((auth.jwt() ->> ''email'') = ''christian.dev.77@gmail.com'') WITH CHECK ((auth.jwt() ->> ''email'') = ''christian.dev.77@gmail.com'')';
    EXECUTE 'CREATE POLICY "Admin only insert site_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK ((auth.jwt() ->> ''email'') = ''christian.dev.77@gmail.com'')';
  END IF;
END $$;


-- ============================================================
-- VERIFICACIÓN: Ejecuta esto después para confirmar
-- ============================================================
-- SELECT schemaname, tablename, policyname, roles, cmd 
-- FROM pg_policies 
-- WHERE tablename IN ('proyectos', 'products', 'site_settings')
-- ORDER BY tablename, cmd;
