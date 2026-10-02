-- =====================================================================
-- sql_update_products_public_view.sql
-- Ejecuta este script en el SQL Editor de Supabase
-- Agrega capturas, display_order, link_free y link_paid a la vista
-- products_public para que el detalle del producto pueda mostrar la
-- galería de capturas y el orden sea correcto.
-- =====================================================================

-- 1. Asegurarse de que las columnas nuevas existen en la tabla 'products'
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS capturas TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS link_free TEXT,
  ADD COLUMN IF NOT EXISTS link_paid TEXT;

-- 2. Eliminar la vista existente para poder recrearla con nuevas columnas
--    (CREATE OR REPLACE no puede cambiar el orden/nombre de columnas existentes)
DROP VIEW IF EXISTS products_public;

-- 3. Crear la vista products_public incluyendo todos los campos necesarios
CREATE VIEW products_public AS
SELECT
  id,
  title,
  description,
  price_cents,
  image_url,
  video_url,
  capturas,
  tags,
  category,
  is_featured,
  display_order,
  has_free_version,
  link_free,
  link_paid,
  external_product_id,
  slug,
  storage_path,
  created_at
FROM products
WHERE is_active = true;

-- 4. Otorgar permisos de lectura pública (anon y authenticated)
GRANT SELECT ON products_public TO anon;
GRANT SELECT ON products_public TO authenticated;
