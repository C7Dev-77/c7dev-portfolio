-- SQL-FIX-ADMIN-PRODUCTS-RLS.sql
-- Ejecuta este script en el SQL Editor de Supabase
-- SOLUCIONA: El panel admin no podía leer/escribir en la tabla 'products'

-- 1. Eliminar la política anterior que bloqueaba TODO acceso anon
DROP POLICY IF EXISTS "Deny all public access to products" ON products;

-- 2. Permitir lectura SOLO a usuarios autenticados (admin)
DROP POLICY IF EXISTS "Allow authenticated read products" ON products;
CREATE POLICY "Allow authenticated read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

-- 3. Permitir INSERT a usuarios autenticados (admin)
DROP POLICY IF EXISTS "Allow authenticated insert products" ON products;
CREATE POLICY "Allow authenticated insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 4. Permitir UPDATE a usuarios autenticados (admin)
DROP POLICY IF EXISTS "Allow authenticated update products" ON products;
CREATE POLICY "Allow authenticated update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Permitir DELETE a usuarios autenticados (admin)
DROP POLICY IF EXISTS "Allow authenticated delete products" ON products;
CREATE POLICY "Allow authenticated delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- 6. Mantener bloqueado el acceso de anónimos directamente a products
DROP POLICY IF EXISTS "Deny anon access to products" ON products;
CREATE POLICY "Deny anon access to products"
  ON products
  FOR ALL
  TO anon
  USING (false);

-- 7. Asegurar que la vista products_public siga siendo accesible para anon
GRANT SELECT ON products_public TO anon;

-- Verificar que todo esté correcto:
-- SELECT schemaname, tablename, policyname, roles, cmd FROM pg_policies WHERE tablename = 'products';
