-- ============================================
-- SCRIPT DE ACTUALIZACIÓN COMPLETO
-- Ejecutar en el SQL Editor de Supabase
-- ============================================


-- ============================================
-- PARTE 1: ACTUALIZAR TABLA PRODUCTOS
-- ============================================

-- Agregar columna para video de YouTube/Vimeo (opcional)
ALTER TABLE productos ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Agregar columna para capturas de pantalla adicionales
ALTER TABLE productos ADD COLUMN IF NOT EXISTS capturas TEXT[] DEFAULT '{}';

-- Agregar columna para tags/tecnologías
ALTER TABLE productos ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Agregar columna para categoría
ALTER TABLE productos ADD COLUMN IF NOT EXISTS categoria VARCHAR(100) DEFAULT 'Código';

-- Agregar columna para marcar producto destacado
ALTER TABLE productos ADD COLUMN IF NOT EXISTS destacado BOOLEAN DEFAULT false;

-- Agregar columna para estado activo
ALTER TABLE productos ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT true;

-- Agregar columna para orden de visualización
ALTER TABLE productos ADD COLUMN IF NOT EXISTS orden INTEGER DEFAULT 0;


-- ============================================
-- PARTE 2: ACTUALIZAR TABLA PROYECTOS
-- ============================================

-- Primero, verificamos si la tabla existe y agregamos las columnas nuevas
-- Si la tabla no existe, se creará completa

-- OPCIÓN 1: Si ya tienes la tabla 'proyectos', ejecuta solo estas líneas:
-- ----------------------------------------------------------------

-- Agregar columna para video de YouTube/Vimeo (opcional)
ALTER TABLE proyectos ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Agregar columna para orden de visualización
ALTER TABLE proyectos ADD COLUMN IF NOT EXISTS orden INTEGER DEFAULT 0;

-- Agregar columna para marcar proyecto destacado
ALTER TABLE proyectos ADD COLUMN IF NOT EXISTS destacado BOOLEAN DEFAULT false;

-- Agregar columna para capturas de pantalla adicionales (array de URLs)
ALTER TABLE proyectos ADD COLUMN IF NOT EXISTS capturas TEXT[] DEFAULT '{}';

-- Agregar columna para categoría
ALTER TABLE proyectos ADD COLUMN IF NOT EXISTS categoria VARCHAR(100) DEFAULT 'Web';

-- Agregar columna para estado (activo/inactivo)
ALTER TABLE proyectos ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT true;


-- OPCIÓN 2: Si NO tienes la tabla, ejecuta todo esto:
-- ----------------------------------------------------------------

/*
CREATE TABLE proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  imagen_url TEXT NOT NULL,
  repo_url TEXT,
  demo_url TEXT,
  video_url TEXT,                    -- NUEVO: URL de YouTube/Vimeo para demo
  capturas TEXT[] DEFAULT '{}',       -- NUEVO: Array de capturas adicionales
  tags TEXT[] DEFAULT '{}',
  categoria VARCHAR(100) DEFAULT 'Web', -- NUEVO: Categoría del proyecto
  destacado BOOLEAN DEFAULT false,    -- NUEVO: Marcar como destacado
  activo BOOLEAN DEFAULT true,        -- NUEVO: Mostrar/ocultar
  orden INTEGER DEFAULT 0,            -- NUEVO: Orden de visualización
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer proyectos activos
CREATE POLICY "Proyectos públicos" ON proyectos
  FOR SELECT USING (activo = true);

-- Política: Solo usuarios autenticados pueden insertar
CREATE POLICY "Solo admins pueden insertar proyectos" ON proyectos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Solo admins pueden actualizar proyectos" ON proyectos
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Solo admins pueden eliminar proyectos" ON proyectos
  FOR DELETE USING (auth.role() = 'authenticated');

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para auto-update
CREATE TRIGGER update_proyectos_updated_at
  BEFORE UPDATE ON proyectos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
*/


-- ============================================
-- DATOS DE EJEMPLO (3 proyectos simulados)
-- ============================================

-- Limpiar proyectos de ejemplo anteriores (opcional)
-- DELETE FROM proyectos WHERE titulo IN ('CyberBank Interface', 'Neon Protocol API', 'Glitch AI Assistant');

-- Insertar proyectos de simulación realistas
INSERT INTO proyectos (
  titulo, 
  descripcion, 
  imagen_url, 
  repo_url, 
  demo_url, 
  video_url,
  capturas,
  tags, 
  categoria,
  destacado,
  orden
) VALUES 
(
  'Animación Login Cyberpunk',
  'Componente de login con animaciones de glitch, efectos de neón y partículas interactivas. Perfecto para proyectos con estética futurista. Incluye validación de formularios y efectos hover premium.',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
  'https://github.com/C7Dev-77/login-cyberpunk',
  'https://c7dev-login.vercel.app',
  'https://www.youtube.com/embed/dQw4w9WgXcQ', -- Reemplazar con tu video real
  ARRAY[
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400'
  ],
  ARRAY['React', 'CSS3', 'Framer Motion', 'TypeScript'],
  'Componentes',
  true,
  1
),
(
  'Dashboard Admin Neón',
  'Panel de administración completo con gráficos interactivos, gestión de usuarios y tema oscuro premium. Incluye sistema de notificaciones, tables con filtros y diseño responsive.',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
  'https://github.com/C7Dev-77/dashboard-neon',
  'https://c7dev-dashboard.vercel.app',
  NULL, -- Sin video por ahora
  ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400'
  ],
  ARRAY['Next.js', 'Tailwind', 'Chart.js', 'Supabase'],
  'Templates',
  true,
  2
),
(
  'E-Commerce Minimalista',
  'Tienda online con carrito de compras, pasarela de pagos integrada y panel de administración. Diseño minimalista con animaciones suaves y experiencia de usuario optimizada.',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
  'https://github.com/C7Dev-77/ecommerce-minimal',
  'https://c7dev-shop.vercel.app',
  NULL, -- Sin video por ahora
  ARRAY[
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400'
  ],
  ARRAY['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
  'Web Apps',
  false,
  3
);


-- ============================================
-- VERIFICAR CAMBIOS
-- ============================================

-- Ejecuta esto para verificar que todo está bien:
-- SELECT titulo, video_url, categoria, destacado, orden FROM proyectos ORDER BY orden;
