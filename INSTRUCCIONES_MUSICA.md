# INSTRUCCIONES PARA DESCARGAR LA MÚSICA

## Opción 1: Descarga Manual (Recomendada)

1. **Visita**: https://ytmp3.nu/
2. **Pega la URL**: https://youtu.be/h9JFYxXOnNg
3. **Descarga** el archivo MP3
4. **Renombra** el archivo a `music.mp3`
5. **Mueve** el archivo a la carpeta `public` de tu proyecto:
   ```
   cristiandev/Nextjs-files/public/music.mp3
   ```

## Opción 2: Con `yt-dlp` (Terminal)

```powershell
# Instalar yt-dlp (si no está instalado)
winget install yt-dlp

# Descargar la música
cd c:\Users\Bienvenido\OneDrive\Desktop\cristiandev\Nextjs-files
yt-dlp -x --audio-format mp3 -o "public/music.%(ext)s" https://youtu.be/h9JFYxXOnNg
```

## ✅ Verificación

Una vez que hayas colocado el archivo `music.mp3` en `/public`, verás un botón de música flotante en la esquina inferior derecha de tu sitio web. Haz clic para reproducir/pausar.

## 🎵 Configurar Música

El componente ya está integrado en `app/layout.tsx` y funcionará automáticamente una vez que el archivo MP3 esté en su lugar.

**Ubicación del archivo**: `c:\Users\Bienvenido\OneDrive\Desktop\cristiandev\Nextjs-files\public\music.mp3`
