---
description: Guía completa para subir a GitHub, desplegar en Vercel/Netlify y monetizar con Google AdSense
---

# 🚀 Guía Completa: GitHub → Vercel/Netlify → Google AdSense

## PARTE 1: PREPARACIÓN DEL PROYECTO

### Paso 1.1: Verificar que el proyecto funciona localmente
```bash
cd c:\Users\Bienvenido\OneDrive\Desktop\cristiandev\Nextjs-files
npm run dev
```
✅ Verifica que el proyecto cargue en `http://localhost:3000` sin errores.

### Paso 1.2: Crear archivo .gitignore (si no existe)
Crea un archivo `.gitignore` en la raíz de `Nextjs-files` con el siguiente contenido:
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### Paso 1.3: Crear archivo .env.example
Crea un archivo `.env.example` con las variables de entorno (SIN valores reales):
```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
```

---

## PARTE 2: SUBIR A GITHUB

### Paso 2.1: Crear repositorio en GitHub
1. Ve a https://github.com
2. Inicia sesión en tu cuenta
3. Haz clic en el botón "+" (arriba a la derecha) → "New repository"
4. Configura el repositorio:
   - **Repository name**: `c7dev-portfolio` (o el nombre que prefieras)
   - **Description**: "Mi portafolio profesional de desarrollador"
   - **Visibility**: Public (para que Vercel/Netlify puedan acceder)
   - ❌ NO marques "Add a README file"
   - ❌ NO agregues .gitignore ni licencia (ya los tenemos)
5. Haz clic en "Create repository"

### Paso 2.2: Inicializar Git localmente
Abre PowerShell en la carpeta `Nextjs-files` y ejecuta:

```bash
# Navegar a la carpeta del proyecto
cd c:\Users\Bienvenido\OneDrive\Desktop\cristiandev\Nextjs-files

# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: C7Dev Portfolio"

# Cambiar la rama principal a 'main'
git branch -M main

# Conectar con GitHub (reemplaza TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/c7dev-portfolio.git

# Subir el código a GitHub
git push -u origin main
```

⚠️ **IMPORTANTE**: Reemplaza `TU_USUARIO` con tu nombre de usuario real de GitHub.

### Paso 2.3: Verificar en GitHub
1. Refresca la página de tu repositorio en GitHub
2. Deberías ver todos tus archivos subidos

---

## PARTE 3: DESPLEGAR EN VERCEL (OPCIÓN RECOMENDADA PARA NEXT.JS)

### Paso 3.1: Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Haz clic en "Sign Up"
3. **Selecciona "Continue with GitHub"** (esto facilita la integración)
4. Autoriza a Vercel para acceder a tus repositorios

### Paso 3.2: Importar proyecto
1. En el dashboard de Vercel, haz clic en "Add New..." → "Project"
2. Busca tu repositorio `c7dev-portfolio`
3. Haz clic en "Import"

### Paso 3.3: Configurar el proyecto
1. **Framework Preset**: Next.js (debería detectarlo automáticamente)
2. **Root Directory**: Selecciona `Nextjs-files` (si tu proyecto está en esa subcarpeta)
3. **Build and Output Settings**: Dejar por defecto
4. **Environment Variables**: Agrega tus variables de Supabase:
   - Click en "Environment Variables"
   - Agrega:
     - `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu clave anónima
5. Haz clic en "Deploy"

### Paso 3.4: Esperar el despliegue
- Vercel construirá tu proyecto (toma 1-3 minutos)
- Una vez completado, te dará una URL como: `https://c7dev-portfolio.vercel.app`
- ✅ ¡Tu sitio está en vivo!

### Paso 3.5: Configurar dominio personalizado (OPCIONAL)
1. En el dashboard del proyecto, ve a "Settings" → "Domains"
2. Agrega tu dominio personalizado si tienes uno
3. Sigue las instrucciones para configurar los DNS

---

## PARTE 4: ALTERNATIVA - DESPLEGAR EN NETLIFY

### Paso 4.1: Crear cuenta en Netlify
1. Ve a https://www.netlify.com
2. Haz clic en "Sign Up"
3. Selecciona "GitHub" para conectar

### Paso 4.2: Importar proyecto
1. En el dashboard, haz clic en "Add new site" → "Import an existing project"
2. Selecciona "Deploy with GitHub"
3. Autoriza a Netlify
4. Selecciona tu repositorio `c7dev-portfolio`

### Paso 4.3: Configurar build settings
1. **Base directory**: `Nextjs-files`
2. **Build command**: `npm run build`
3. **Publish directory**: `.next`
4. **Environment variables**: Agrega las mismas de Supabase

### Paso 4.4: Deploy
1. Haz clic en "Deploy site"
2. Espera 2-5 minutos
3. Obtendrás una URL como: `https://c7dev-portfolio.netlify.app`

---

## PARTE 5: INTEGRAR GOOGLE ADSENSE

### Paso 5.1: Crear cuenta de Google AdSense
1. Ve a https://www.google.com/adsense
2. Haz clic en "Comenzar"
3. Inicia sesión con tu cuenta de Google
4. Completa el formulario:
   - URL del sitio web: Tu URL de Vercel/Netlify
   - País o territorio
   - Acepta los términos y condiciones

### Paso 5.2: Verificar tu sitio
1. AdSense te dará un código de verificación como:
```html
<script data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
```

2. **Agregar el código al proyecto Next.js**:
   - Abre el archivo `Nextjs-files/app/layout.tsx`
   - Agrega el script en el `<head>` usando el componente `Script` de Next.js

### Paso 5.3: Modificar layout.tsx para AdSense

Agrega esto en tu `layout.tsx`:

```tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

⚠️ Reemplaza `ca-pub-XXXXXXXXXXXXXXXX` con tu ID real de AdSense.

### Paso 5.4: Subir cambios a GitHub
```bash
cd c:\Users\Bienvenido\OneDrive\Desktop\cristiandev\Nextjs-files
git add .
git commit -m "Add Google AdSense verification code"
git push
```

Vercel/Netlify detectará el cambio y redesplegará automáticamente.

### Paso 5.5: Completar verificación en AdSense
1. Vuelve a Google AdSense
2. Haz clic en "Verificar" o espera 24-48 horas
3. Google verificará que el código esté en tu sitio

### Paso 5.6: Crear unidades de anuncios
Una vez verificado (puede tomar días o semanas):

1. En AdSense, ve a "Anuncios" → "Por unidad de anuncio"
2. Crea una nueva unidad:
   - **Display ads**: Para banners en el sitio
   - **In-feed ads**: Para anuncios entre contenido
   - **In-article ads**: Para anuncios dentro de artículos

3. Copia el código generado, por ejemplo:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="YYYYYYYYYY"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### Paso 5.7: Crear componente de anuncios en Next.js

Crea un archivo `Nextjs-files/components/AdBanner.tsx`:

```tsx
'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  dataAdSlot: string
  dataAdFormat?: string
  dataFullWidthResponsive?: boolean
}

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    />
  )
}
```

### Paso 5.8: Usar el componente en tus páginas

En cualquier página donde quieras mostrar anuncios:

```tsx
import AdBanner from '@/components/AdBanner'

export default function Page() {
  return (
    <div>
      {/* Tu contenido */}
      
      {/* Anuncio */}
      <AdBanner dataAdSlot="YYYYYYYYYY" />
      
      {/* Más contenido */}
    </div>
  )
}
```

---

## PARTE 6: MEJORES PRÁCTICAS PARA ADSENSE

### 6.1: Ubicaciones recomendadas para anuncios
1. **Header**: Debajo del menú de navegación
2. **Sidebar**: En la barra lateral (si tienes)
3. **Entre contenido**: Cada 2-3 párrafos en artículos
4. **Footer**: Antes del pie de página
5. **Página de portafolio**: Entre proyectos

### 6.2: Políticas importantes de AdSense
- ❌ NO hagas clic en tus propios anuncios
- ❌ NO pidas a otros que hagan clic
- ✅ El contenido debe ser original y de calidad
- ✅ Cumple con las políticas de contenido de Google
- ✅ Ten suficiente contenido antes de aplicar (mínimo 15-20 páginas)

### 6.3: Optimización
- No sobrecargues con anuncios (máximo 3-4 por página)
- Usa anuncios responsive para móviles
- Coloca anuncios donde sean visibles pero no intrusivos
- Espera al menos 1-2 semanas para ver resultados

---

## PARTE 7: MANTENIMIENTO Y ACTUALIZACIONES

### 7.1: Flujo de trabajo para futuras actualizaciones
```bash
# 1. Hacer cambios en tu código local
# 2. Probar localmente
npm run dev

# 3. Subir a GitHub
git add .
git commit -m "Descripción de los cambios"
git push

# 4. Vercel/Netlify desplegará automáticamente
```

### 7.2: Monitorear rendimiento
- **Vercel Analytics**: Ve a tu proyecto → Analytics
- **Google AdSense**: Revisa tus ganancias en el dashboard
- **Google Analytics**: Considera agregarlo para más métricas

---

## RESUMEN DE URLS IMPORTANTES

📌 **GitHub**: https://github.com/TU_USUARIO/c7dev-portfolio
📌 **Vercel**: https://vercel.com/dashboard
📌 **Netlify**: https://app.netlify.com
📌 **Google AdSense**: https://www.google.com/adsense
📌 **Tu sitio en vivo**: https://c7dev-portfolio.vercel.app (o .netlify.app)

---

## CHECKLIST FINAL

- [ ] Proyecto funciona localmente
- [ ] .gitignore creado
- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub
- [ ] Proyecto desplegado en Vercel/Netlify
- [ ] Variables de entorno configuradas
- [ ] Sitio funciona en producción
- [ ] Cuenta de AdSense creada
- [ ] Código de verificación agregado
- [ ] Sitio verificado en AdSense
- [ ] Unidades de anuncios creadas
- [ ] Componente AdBanner implementado
- [ ] Anuncios visibles en el sitio

---

## SOPORTE Y RECURSOS

- **Documentación Next.js**: https://nextjs.org/docs
- **Documentación Vercel**: https://vercel.com/docs
- **Documentación Netlify**: https://docs.netlify.com
- **Centro de ayuda AdSense**: https://support.google.com/adsense
- **Políticas de AdSense**: https://support.google.com/adsense/answer/48182

---

¡Buena suerte con tu proyecto! 🚀
