-- SQL-MIGRATE-PRODUCTS.sql
-- Ejecuta este script en el SQL Editor de Supabase para migrar los datos.

BEGIN;

-- 1. Añadimos los campos visuales a la nueva tabla 'products'
alter table products 
  add column if not exists description text,
  add column if not exists image_url text,
  add column if not exists video_url text,
  add column if not exists tags text[],
  add column if not exists category text,
  add column if not exists is_featured boolean default false,
  add column if not exists is_active boolean default true,
  add column if not exists display_order int default 0,
  add column if not exists has_free_version boolean default false;

-- 2. Migramos los datos de la vieja tabla 'productos' a la nueva tabla 'products'
insert into products (
  id, 
  title, 
  slug, 
  description, 
  price_cents, 
  image_url, 
  video_url, 
  tags, 
  category, 
  is_featured, 
  is_active, 
  display_order, 
  has_free_version, 
  storage_path
)
select 
  id::uuid,
  nombre as title,
  -- Generamos un slug seguro a partir del nombre
  lower(regexp_replace(nombre, '[^a-zA-Z0-9]+', '-', 'g')) as slug, 
  descripcion as description,
  -- Redondeo seguro para evitar pérdida de centavos
  round(precio::numeric * 100)::int as price_cents, 
  imagen_url as image_url,
  video_url,
  tags,
  categoria as category,
  coalesce(destacado, false) as is_featured,
  coalesce(activo, true) as is_active,
  coalesce(orden, 0) as display_order,
  -- Si link_free tiene algo, significa que tiene versión gratuita
  (link_free is not null and link_free != '') as has_free_version,
  -- Como no teníamos archivos en Supabase Storage antes, ponemos un path genérico temporal
  'migrated/' || id::text as storage_path
from productos
on conflict (id) do nothing;

COMMIT;
