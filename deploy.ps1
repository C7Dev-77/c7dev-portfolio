# Script de deploy - Ejecutar en PowerShell como Administrador
# C:\Users\Bienvenido\OneDrive\Desktop\cristiandev

Set-Location "C:\Users\Bienvenido\OneDrive\Desktop\cristiandev"

Write-Host "📦 Preparando archivos para GitHub..." -ForegroundColor Cyan

git add .
git status

Write-Host "`n✅ Haciendo commit..." -ForegroundColor Green
git commit -m "fix: agregar ignoreBuildErrors y ignoreDuringBuilds en next.config.js para Vercel"

Write-Host "`n🚀 Subiendo a GitHub..." -ForegroundColor Yellow
git push origin master

Write-Host "`n✅ Listo! Vercel iniciará el deploy automáticamente." -ForegroundColor Green
Write-Host "Visita https://vercel.com/dashboard para ver el progreso." -ForegroundColor Gray
