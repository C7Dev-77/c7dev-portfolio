# 🤖 AI Context & Architecture Guide (C7Dev Portfolio)

Este documento contiene todo el contexto, arquitectura y decisiones de diseño necesarias para que cualquier IA entienda y edite el proyecto de manera segura y precisa.

---

## 🏗️ 1. Arquitectura y Stack Tecnológico
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS (Vanilla CSS para personalizaciones específicas como fondos neon y animaciones)
- **Backend / Base de Datos:** Supabase (PostgreSQL)
- **Iconos:** Lucide React

## 📂 2. Estructura de Directorios Principal
- `/app` -> Contiene el enrutador principal de Next.js.
  - `/admin` -> Panel de administración (Dashboard interactivo).
  - `/portafolio` -> Listado de proyectos del portafolio.
  - `/tienda` -> Tienda de recursos y códigos.
  - `/api/stats` -> API Route encargada del seguimiento de métricas (vistas y descargas).
- `/components` -> Componentes de interfaz de usuario reutilizables (`Navbar`, `Footer`, `ProjectStats`, `DownloadButtons`, etc.).
- `/lib` -> Utilidades y cliente de Supabase (`supabase.ts` y `server.ts`).

## 🗄️ 3. Esquema de Base de Datos (Supabase)
El proyecto depende de tres tablas principales:
1. **`proyectos`**: Almacena los proyectos de desarrollo para la sección de Portafolio.
2. **`products_public` (y/o `products` / `productos`)**: Tabla que almacena los recursos que se muestran y venden en la Tienda.
3. **`project_metrics`**: Tabla analítica que almacena las métricas reales partiendo desde 0.
   - Columnas principales: `project_id` (relaciona productos/proyectos), `views` (visitas reales), `downloads` (descargas/interacciones reales).

## 📊 4. Lógica de Métricas (Visitas e Interacciones)
Existe una dualidad deliberada en cómo se muestran las métricas para dar un impulso visual en la parte pública, pero mantener datos reales en la administración:

- **Web Pública (`/api/stats` -> GET/POST):**
  - Aplica un incremento estático base de **100 por proyecto**.
  - Fórmula: `(projectCount * 100) + extraViews` (o extraDownloads).
  - Esto significa que en el home y vistas públicas, el contador arranca en `100+`, `400+`, etc.

- **Panel de Administración (`/admin`):**
  - Muestra datos crudos estrictamente desde **CERO (0)**.
  - El frontend lee `rawViews` y `rawDownloads` devueltos por la misma API para mostrar la actividad del sitio mediante un gráfico interactivo (mensual) distribuido sobre las métricas reales.

## 🎨 5. Diseño y Sistema UI
- **Aesthetics Premium**: Se usan fondos oscuros (`#111111`, fondos negros), efectos de *glassmorphism* (`glass-panel`), gradientes y brillos neón.
- **Colores Clave**: 
  - Oro Neón (`neon-gold`): Usado frecuentemente para destacar (ej: botones de compra, Interacciones).
  - Platino Neón (`neon-platinum`): Usado para acentos y textos secundarios.
  - Esmeralda/Verde (`emerald-400`, `green-500`): Usado para mensajes de seguridad, confirmaciones y la gráfica de Visitas.
- **Microinteracciones**: Tooltips en hover, botones que cambian de color, y gráficas que actualizan sus barras con animaciones dinámicas al cambiar de pestaña (Visitas vs Interacciones).

## 🛒 6. Flujo de Descarga y Seguridad
En `app/tienda/[id]/page.tsx`, debajo de la sección "¿Qué incluye?", existen cajas de aviso para el usuario:
- **Compra 100% Segura**: Avisa que la descarga del archivo `.ZIP` es automática tras el pago.
- **Descarga Gratis (Con Anuncios)**: Avisa que requiere resolver un CAPTCHA y esperar 60 segundos.

## 🛠️ 7. Reglas de Modificación para IAs
- **Nunca romper las métricas separadas**: Asegúrate de mantener `totalViews` (base +100) y `rawViews` (base 0) intactas si tocas `/api/stats`.
- **Mantenimiento del Diseño Premium**: Cualquier nuevo componente debe seguir la paleta oscura, bordes sutiles y efectos glow/glassmorphism existentes (ej. usar `border-gray-800/50`, `bg-[#111111]`, hover text transitions).
- **Scripts de Base de Datos**: Ya no hay archivos `.sql` en el repositorio porque las migraciones de tabla ya están aplicadas directamente en Supabase.
- **Clean Code**: No dejes archivos `.md`, `.txt` o scripts temporales "basura" en la raíz del proyecto. Toda la info debe consolidarse aquí.
