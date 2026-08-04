-- SQL-SITE-SETTINGS-AND-PRODUCTS.sql
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Crear Vista Pública Segura para la Tienda
CREATE OR REPLACE VIEW products_public AS
SELECT 
  id, 
  title, 
  slug, 
  price_cents, 
  image_url, 
  description,
  tags, 
  category, 
  is_featured, 
  has_free_version,
  created_at
FROM products 
WHERE is_active = true;

-- Conceder permisos de lectura a la clave pública (anon) en la vista
GRANT SELECT ON products_public TO anon;

-- Asegurar que la tabla products original permanezca bloqueada para anon
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Deny all public access to products" ON products;
CREATE POLICY "Deny all public access to products" ON products FOR ALL TO anon USING (false);

-- 2. Crear Tabla de Configuraciones del Sitio (persistencia de Admin)
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  config JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Permitir lectura a todos (para cargar colores, textos y donaciones en el frontend)
DROP POLICY IF EXISTS "Allow public read access to site_settings" ON site_settings;
CREATE POLICY "Allow public read access to site_settings" ON site_settings FOR SELECT TO anon USING (true);

-- 3. Insertar / Actualizar "Flores en Anónimo" con modalidad dual (pago + gratis)
INSERT INTO products (
  title, 
  slug, 
  price_cents, 
  storage_path, 
  has_free_version, 
  is_active,
  description
)
VALUES (
  'Flores en Anónimo',
  'flores-en-anonimo',
  999, -- $9.99 USD
  'flores-en-anonimo.zip',
  true, -- modalidad gratis habilitada (Work.ink)
  true,
  'Sistema dinámico de animación de flores con mensajes anónimos.'
)
ON CONFLICT (slug) DO UPDATE 
SET 
  price_cents = EXCLUDED.price_cents,
  storage_path = EXCLUDED.storage_path,
  has_free_version = EXCLUDED.has_free_version,
  is_active = true;
