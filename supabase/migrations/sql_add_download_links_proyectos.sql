-- ============================================================
-- sql_add_download_links_proyectos.sql
-- Ejecutar en el SQL Editor de Supabase
-- Agrega los campos link_buy y link_free a la tabla proyectos
-- para mostrar los botones "Descargar Buy / Descargar Free"
-- debajo de la galería de medios en el detalle de proyecto.
-- ============================================================

-- Columna para URL de compra / descarga de pago (Gumroad, PayHip, etc.)
ALTER TABLE proyectos
  ADD COLUMN IF NOT EXISTS link_buy TEXT;

-- Columna para URL de descarga gratuita (GitHub, drive, etc.)
ALTER TABLE proyectos
  ADD COLUMN IF NOT EXISTS link_free TEXT;

-- Verificar columnas creadas
-- SELECT column_name, data_type
-- FROM information_schema.columns
-- WHERE table_name = 'proyectos'
--   AND column_name IN ('link_buy', 'link_free');
