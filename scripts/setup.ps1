# Configuración inicial del monorepo
Write-Host "=== Configurando Proyecto Central ===" -ForegroundColor Cyan

# 1. Verificar Docker
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker no está instalado. Instálalo desde https://docker.com"
    exit 1
}
Write-Host "[OK] Docker detectado" -ForegroundColor Green

# 2. Crear red compartida (idempotente)
docker network create proyecto-central-net 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Red 'proyecto-central-net' creada" -ForegroundColor Green
} else {
    Write-Host "[OK] Red 'proyecto-central-net' ya existe" -ForegroundColor Yellow
}

# 3. Inicializar Git si no existe
if (-not (Test-Path "$PSScriptRoot\..\.git")) {
    git -C "$PSScriptRoot\.." init -b main
    Write-Host "[OK] Repositorio git inicializado" -ForegroundColor Green
} else {
    Write-Host "[OK] Git ya inicializado" -ForegroundColor Yellow
}

# 4. Levantar todo
Write-Host "`n=== Levantando servicios ===" -ForegroundColor Cyan
docker compose up -d --build
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Todos los servicios levantados" -ForegroundColor Green
    Write-Host "`nAccede a:" -ForegroundColor Cyan
    Write-Host "  Portfolio: http://localhost:3000"
    Write-Host "  PostgreSQL: localhost:5432"
} else {
    Write-Error "Error al levantar servicios. Revisa docker compose logs."
}
