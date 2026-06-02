param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectName,
    [string]$Language = "node",   # node, python, java, go, rust
    [switch]$WithDB
)

$root = Resolve-Path "$PSScriptRoot\.."
$target = "$root\projects\$ProjectName"

if (Test-Path $target) {
    Write-Error "El proyecto '$ProjectName' ya existe en $target"
    exit 1
}

New-Item -ItemType Directory -Path "$target" -Force | Out-Null

# Dockerfile genérico
@"
FROM alpine:latest
WORKDIR /app
COPY . .
CMD ["echo", "Proyecto $ProjectName listo"]
"@ | Set-Content "$target\Dockerfile"

# docker-compose del proyecto (dev mode)
@"
version: "3.9"
services:
  $ProjectName:
    build: .
    container_name: pc-$ProjectName
    ports:
      - "8080:8080"
    volumes:
      - .:/app
    networks:
      - proyecto-central-net
"@ | Set-Content "$target\docker-compose.yml"

# .gitignore
@"
.env
*.log
dist/
__pycache__/
node_modules/
target/
"@ | Set-Content "$target\.gitignore"

# README del proyecto
@"
# $ProjectName

## Desarrollo
docker compose up -d

## Producción (desde la raíz)
docker compose --profile $ProjectName up -d
"@ | Set-Content "$target\README.md"

Write-Host "Proyecto '$ProjectName' creado en $target" -ForegroundColor Green
Write-Host "  - Dockerfile              $target\Dockerfile"
Write-Host "  - docker-compose (dev)    $target\docker-compose.yml"
