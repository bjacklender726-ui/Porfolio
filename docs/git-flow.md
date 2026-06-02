# Estrategia de Ramas (Git Flow)

## Estructura

```
main        → Producción (estable, releases oficiales)
develop     → Integración (features terminadas)
feature/*   → Nuevas funcionalidades (desde develop)
release/*   → Preparación de versión (desde develop → main + develop)
hotfix/*    → Parche urgente (desde main → main + develop)
```

## Flujo diario

### 1. Nueva funcionalidad
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-feature

# ... trabajas, commiteas ...

git push origin feature/nombre-feature
# Abres Pull Request → develop en GitHub
```

### 2. Lanzar versión (Release)
```bash
git checkout develop
git checkout -b release/v1.0.0

# Ajustas versiones, tests, docs

git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "v1.0.0 - Descripción del release"
git push origin main --tags

git checkout develop
git merge release/v1.0.0
git push origin develop
```

### 3. Hotfix urgente
```bash
git checkout main
git checkout -b hotfix/arreglo-critico

git commit -m "fix: arreglo crítico"

git checkout main
git merge hotfix/arreglo-critico
git tag -a v1.0.1 -m "v1.0.1 - Hotfix crítico"
git push origin main --tags

git checkout develop
git merge hotfix/arreglo-critico
git push origin develop
```

## Versionado Semántico
Formato: `vMAJOR.MINOR.PATCH`
- **MAJOR**: cambios incompatibles
- **MINOR**: nuevas funcionalidades (compatible)
- **PATCH**: bug fixes

## GitHub Releases

Cada tag en `main` debe ir acompañado de un **Release** en GitHub:
1. Ve a tu repo → Releases → Create a new release
2. Selecciona el tag (ej: v1.0.0)
3. Escribe título y descripción de cambios
4. Publica

## Apps completas vs Demos

Usa **GitHub Releases** con naming claro:
- `app-v1.0.0` → App completa
- `demo-v1.0.0` → Demo

O si prefieres separar:
- `release/app/v1.0.0`
- `release/demo/v1.0.0`

También puedes tener dos repos separados:
- `mi-app`
- `mi-app-demo`
