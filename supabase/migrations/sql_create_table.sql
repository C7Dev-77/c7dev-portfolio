-- SQL para crear la tabla 'productos' en Supabase
-- Ejecutar en el SQL Editor de Supabase Dashboard

CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  imagen_url TEXT,
  link_free TEXT NOT NULL,
  link_paid TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer productos
CREATE POLICY "Productos públicos" ON productos
  FOR SELECT USING (true);

-- Política: Solo usuarios autenticados pueden insertar (ajustar según necesites)
CREATE POLICY "Solo admins pueden insertar" ON productos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Solo admins pueden actualizar" ON productos
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Solo admins pueden eliminar" ON productos
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
CREATE TRIGGER update_productos_updated_at
  BEFORE UPDATE ON productos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, imagen_url, link_free, link_paid) VALUES
('Cyberpunk UI Kit', 'Kit completo de componentes UI con estética cyberpunk. Incluye botones, cards, modals y más.', 29.99, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'https://github.com/cristiandev/ui-kit-free', 'https://gumroad.com/l/cyberpunk-ui'),
('Next.js Dashboard Template', 'Template completo para dashboards con Next.js 14, TypeScript y Tailwind.', 49.99, 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', 'https://github.com/cristiandev/dashboard-free', 'https://gumroad.com/l/nextjs-dashboard'),
('Neon Icons Pack', '500+ iconos SVG con efecto neón. Perfectos para proyectos dark mode.', 19.99, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400', 'https://github.com/cristiandev/neon-icons-free', 'https://gumroad.com/l/neon-icons'),
('React Component Library', 'Librería de componentes React listos para producción con Storybook.', 39.99, 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400', 'https://github.com/cristiandev/react-lib-free', 'https://gumroad.com/l/react-components'),
('Tailwind Animations', 'Colección de 100+ animaciones CSS listas para usar con Tailwind.', 14.99, 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', 'https://github.com/cristiandev/animations-free', 'https://gumroad.com/l/tailwind-animations'),
('API Starter Kit', 'Boilerplate para APIs REST con Node.js, Express y MongoDB.', 24.99, 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', 'https://github.com/cristiandev/api-starter-free', 'https://gumroad.com/l/api-starter');

-- ============================================
-- TABLA: PROYECTOS (Portafolio)
-- ============================================

CREATE TABLE proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  imagen_url TEXT NOT NULL,
  repo_url TEXT NOT NULL,
  demo_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer proyectos (público)
CREATE POLICY "Proyectos públicos" ON proyectos
  FOR SELECT USING (true);

-- Política: Solo usuarios autenticados pueden insertar
CREATE POLICY "Solo admins pueden insertar proyectos" ON proyectos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Solo admins pueden actualizar proyectos" ON proyectos
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Política: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Solo admins pueden eliminar proyectos" ON proyectos
  FOR DELETE USING (auth.role() = 'authenticated');

-- Trigger para auto-update (reutiliza la función existente)
CREATE TRIGGER update_proyectos_updated_at
  BEFORE UPDATE ON proyectos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insertar proyectos de ejemplo
INSERT INTO proyectos (titulo, descripcion, imagen_url, repo_url, demo_url, tags) VALUES
('CyberBank Interface', 'Dashboard financiero con transacciones en tiempo real bajo estética minimalista oscura.', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600', 'https://github.com/cristiandev/cyberbank', 'https://cyberbank.demo.com', ARRAY['React', 'Motion', 'Tailwind']),
('Neon Protocol API', 'API gateway ultra-rápido para microservicios de gaming masivo.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600', 'https://github.com/cristiandev/neon-api', 'https://neon-api.demo.com', ARRAY['Node.js', 'Redis', 'TypeScript']),
('Glitch AI Assistant', 'Asistente inteligente con terminal virtual para automatización de tareas DevOps.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600', 'https://github.com/cristiandev/glitch-ai', 'https://glitch-ai.demo.com', ARRAY['OpenAI', 'Next.js', 'Python']);