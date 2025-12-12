# 🚀 C7Dev - Portafolio Profesional de Desarrollador

Portafolio web moderno y dinámico construido con Next.js 14, TypeScript, Tailwind CSS y Supabase.

![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-38bdf8?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz premium con animaciones fluidas y efectos visuales impactantes
- 💼 **Portafolio Dinámico**: Gestión de proyectos con imágenes, demos y descripciones detalladas
- 🛒 **Tienda de Códigos**: Sección para vender recursos y códigos de desarrollo
- 🔐 **Panel de Administración**: Sistema completo de gestión de contenido
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- ⚡ **Optimizado**: Rendimiento excepcional con Next.js 14 y App Router
- 🎯 **SEO Friendly**: Optimizado para motores de búsqueda

## 🛠️ Tecnologías

- **Framework**: [Next.js 14](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Base de Datos**: [Supabase](https://supabase.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Despliegue**: [Vercel](https://vercel.com/)

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ instalado
- Cuenta en [Supabase](https://supabase.com/)
- Git instalado

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/TU_USUARIO/c7dev-portfolio.git
cd c7dev-portfolio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
```

4. **Configurar la base de datos**

Ejecuta los scripts SQL en tu proyecto de Supabase:
- `SQL-CREATE-TABLE.sql` - Crea las tablas necesarias
- `SQL-UPDATE-PROYECTOS.sql` - Actualiza la estructura de proyectos

5. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗂️ Estructura del Proyecto

```
c7dev-portfolio/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administración
│   ├── portafolio/        # Página de portafolio
│   ├── tienda/            # Tienda de códigos
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx        # Barra de navegación
│   ├── Footer.tsx        # Pie de página
│   └── ...
├── lib/                   # Utilidades y configuración
│   └── supabase.ts       # Cliente de Supabase
├── types/                 # Tipos de TypeScript
│   └── database.ts       # Tipos de la base de datos
├── public/               # Archivos estáticos
└── ...
```

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Sube tu código a GitHub
2. Ve a [Vercel](https://vercel.com/)
3. Importa tu repositorio
4. Configura las variables de entorno
5. ¡Despliega!

### Opción 2: CLI de Vercel

```bash
npm install -g vercel
vercel
```

### Variables de Entorno en Vercel

Asegúrate de agregar estas variables en la configuración del proyecto:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
```

## 🔐 Panel de Administración

Accede al panel de administración en `/admin` para:

- ✏️ Gestionar proyectos del portafolio
- 🛍️ Administrar productos de la tienda
- 📊 Ver estadísticas
- 🎨 Personalizar contenido

**Nota**: Requiere autenticación con Supabase Auth.

## 🎨 Personalización

### Colores y Tema

Edita `tailwind.config.ts` para personalizar la paleta de colores:

```typescript
theme: {
  extend: {
    colors: {
      // Tus colores personalizados
    }
  }
}
```

### Contenido

- **Información personal**: Edita `app/page.tsx`
- **Proyectos**: Gestiona desde el panel admin o directamente en Supabase
- **Estilos globales**: Modifica `app/globals.css`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## 👤 Autor

**CristianDev**

- GitHub: [@TU_USUARIO](https://github.com/TU_USUARIO)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Instagram: [@tu_instagram](https://instagram.com/tu_instagram)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un [issue](https://github.com/TU_USUARIO/c7dev-portfolio/issues).

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

**Desarrollado con ❤️ por CristianDev**
