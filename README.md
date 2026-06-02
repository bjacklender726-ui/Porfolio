# Proyecto Central

Monorepo con portfolio + proyectos desplegables con Docker.

## Requisitos

- Docker Desktop (con Docker Compose v2)

## Inicio rápido

```bash
# 1. Configura todo e inicia servicios
.\scripts\setup.ps1

# 2. ¡Ya está! Todo corriendo en:
#    Portfolio → http://localhost:3000
#    PostgreSQL → localhost:5432
```

## Comandos útiles

```bash
# Ver logs de todos los servicios
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f portfolio

# Detener todo
docker compose down

# Detener y borrar volúmenes (cuidado, borra BD)
docker compose down -v

# Acceder a la terminal de un contenedor
docker compose exec portfolio sh

# Acceder a PostgreSQL
docker compose exec postgres psql -U admin -d portfolio_db
```

## Estructura

```
proyecto-central/
├── docker-compose.yml    # Orquestador global
├── portfolio/             # Sitio web principal
├── projects/              # Apps y demos (uno por carpeta)
├── scripts/               # Utilidades
├── docs/                  # Documentación
└── .github/workflows/     # CI/CD (GitHub Actions)
```

## Crear un nuevo proyecto

```powershell
.\scripts\new-project.ps1 -ProjectName "mi-app" -Language node
```

Luego añádelo al `docker-compose.yml` raíz para que se despliegue con el resto.

## Estrategia de ramas

Ver [docs/git-flow.md](docs/git-flow.md).
