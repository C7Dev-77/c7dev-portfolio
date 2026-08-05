# 📋 Checklist de Despliegue - C7Dev Portfolio

## ✅ FASE 1: PREPARACIÓN (COMPLETADA)

- [x] Proyecto compila sin errores (`npm run build`)
- [x] Archivo `.gitignore` creado
- [x] Archivo `.env.example` existe
- [x] Archivo `README.md` creado
- [x] Variables de entorno configuradas localmente

## 🔄 FASE 2: GITHUB (EN PROCESO)

### Paso 1: Crear Repositorio en GitHub
- [ ] Ir a https://github.com/new
- [ ] Nombre del repositorio: `c7dev-portfolio` (o el que prefieras)
- [ ] Descripción: "Portafolio profesional de desarrollador con Next.js, TypeScript y Supabase"
- [ ] Visibilidad: **Public**
- [ ] NO marcar "Add a README file"
- [ ] Hacer clic en "Create repository"

### Paso 2: Inicializar Git y Subir Código

**IMPORTANTE**: Asegúrate de estar en la carpeta correcta antes de ejecutar los comandos.

Ejecuta estos comandos en PowerShell (uno por uno):

```powershell
# 1. Navegar a la carpeta del proyecto
cd c:\Users\Bienvenido\OneDrive\Desktop\cristiandev\Nextjs-files

# 2. Inicializar repositorio Git
git init

# 3. Agregar todos los archivos
git add .

# 4. Hacer el primer commit
git commit -m "Initial commit: C7Dev Portfolio - Next.js 14 + TypeScript + Supabase"

# 5. Cambiar la rama a 'main'
git branch -M main

# 6. Conectar con GitHub (REEMPLAZA TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/c7dev-portfolio.git

# 7. Subir el código a GitHub
git push -u origin main
```

**⚠️ IMPORTANTE**: 
- Reemplaza `TU_USUARIO` en el comando 6 con tu nombre de usuario real de GitHub
- Si te pide credenciales, usa tu nombre de usuario y un Personal Access Token (no tu contraseña)

### Paso 3: Verificar en GitHub
- [ ] Ir a tu repositorio en GitHub
- [ ] Verificar que todos los archivos estén subidos
- [ ] Verificar que `.env.local` NO esté subido (debe estar en .gitignore)

## 🚀 FASE 3: VERCEL (PENDIENTE)

### Paso 1: Conectar con Vercel
- [ ] Ir a https://vercel.com
- [ ] Hacer clic en "Sign Up" o "Log In"
- [ ] Seleccionar "Continue with GitHub"
- [ ] Autorizar a Vercel

### Paso 2: Importar Proyecto
- [ ] En Vercel Dashboard, clic en "Add New..." → "Project"
- [ ] Buscar repositorio `c7dev-portfolio`
- [ ] Hacer clic en "Import"

### Paso 3: Configurar Despliegue
- [ ] Framework Preset: **Next.js** (auto-detectado)
- [ ] Root Directory: **Nextjs-files** (si está en subcarpeta) o dejar en blanco
- [ ] Build Command: `npm run build` (por defecto)
- [ ] Output Directory: `.next` (por defecto)

### Paso 4: Variables de Entorno
Agregar estas variables en Vercel:

```
NEXT_PUBLIC_SUPABASE_URL = https://xggkzausjtvudholsxkk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_vowQwEC0sYrZJsWaWoOi9w_-vUrKWAZ
```

- [ ] Variables agregadas
- [ ] Hacer clic en "Deploy"

### Paso 5: Verificar Despliegue
- [ ] Esperar 2-5 minutos
- [ ] Verificar que el build sea exitoso
- [ ] Abrir la URL de producción (ej: `https://c7dev-portfolio.vercel.app`)
- [ ] Probar que el sitio funcione correctamente

## 💰 FASE 4: GOOGLE ADSENSE (PENDIENTE)

### Paso 1: Crear Cuenta AdSense
- [ ] Ir a https://www.google.com/adsense
- [ ] Hacer clic en "Comenzar"
- [ ] Completar el formulario con la URL de Vercel
- [ ] Aceptar términos y condiciones

### Paso 2: Verificar Sitio
- [ ] Copiar código de verificación de AdSense
- [ ] Agregar código al `layout.tsx`
- [ ] Hacer commit y push a GitHub
- [ ] Esperar redespliegue automático en Vercel
- [ ] Volver a AdSense y verificar

### Paso 3: Esperar Aprobación
- [ ] Esperar revisión de Google (puede tomar 1-2 semanas)
- [ ] Recibir email de aprobación

### Paso 4: Crear Anuncios
- [ ] Crear unidades de anuncios en AdSense
- [ ] Implementar componente `AdBanner.tsx`
- [ ] Agregar anuncios a las páginas
- [ ] Desplegar cambios

## 📊 ESTADO ACTUAL

```
PREPARACIÓN:     ████████████████████ 100% ✅
GITHUB:          ░░░░░░░░░░░░░░░░░░░░   0% 🔄
VERCEL:          ░░░░░░░░░░░░░░░░░░░░   0% ⏳
GOOGLE ADSENSE:  ░░░░░░░░░░░░░░░░░░░░   0% ⏳
```

## 🎯 PRÓXIMO PASO

**Crear repositorio en GitHub y subir el código**

Sigue las instrucciones de la FASE 2 arriba.

---

**Última actualización**: 2025-12-11 22:05
