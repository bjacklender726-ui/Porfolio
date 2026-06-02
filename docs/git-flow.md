# Estrategia de Ramas (Git Flow)

## Estructura

```
main        → Producción (estable, releases oficiales)
develop     → Integración (features terminadas)
feature/*   → Nuevas funcionalidades (desde develop)
release/*   → Preparación de versión (desde develop → main + develop)
hotfix/*    → Parche urgente (desde main → main + develop)
```

## Convención de Commits (Conventional Commits)

Formato: `tipo(ámbito): descripción en imperativo`

| Tipo        | Cuándo usarlo                          |
|-------------|----------------------------------------|
| `feat`      | Nueva funcionalidad                    |
| `fix`       | Corrección de bug                      |
| `style`     | Cambios de estilo / UI / CSS           |
| `security`  | Mejora de seguridad                    |
| `db`        | Cambios en base de datos               |
| `refactor`  | Reorganización sin cambiar comportamiento |
| `docs`      | Documentación                          |
| `chore`     | Configuración, dependencias, tooling   |

Ejemplos:
```
feat(portfolio): sección de contacto creada
feat(portfolio): sección principal con diseño responsive
style(form): ajustados colores del formulario
security(general): sanitizadas entradas de usuario
db(portfolio): conexión a PostgreSQL implementada
fix(form): corregido bug en validación email
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

## Ejemplo práctico: construcción del portfolio

Escenario real: estás construyendo tu portfolio desde cero.
Cada pieza atómica → un commit. Cada conjunto lógico → una feature branch.

```bash
# 1. Feature: sección principal
git checkout develop
git checkout -b feature/seccion-principal
# ... código HTML ...
git add portfolio/index.html
git commit -m "feat(home): estructura HTML de la sección principal"
# ... código CSS ...
git add portfolio/styles.css
git commit -m "style(home): estilos CSS con diseño responsive"
# Backup del avance
git push origin feature/seccion-principal

# 2. Feature: sección contacto
git checkout develop
git merge feature/seccion-principal
git checkout -b feature/seccion-contacto
git add portfolio/contacto.html
git commit -m "feat(contact): estructura HTML formulario contacto"
git add portfolio/contacto.css
git commit -m "style(contact): estilos del formulario"
git push origin feature/seccion-contacto

# 3. Feature: conexión base de datos
git checkout develop
git merge feature/seccion-contacto
git checkout -b feature/database
git add portfolio/db/
git commit -m "db: configuración conexión PostgreSQL"
git add portfolio/models/
git commit -m "db: modelos de datos del portfolio"
git push origin feature/database

# 4. Feature: seguridad
git checkout develop
git merge feature/database
git checkout -b feature/seguridad
git add portfolio/middleware/
git commit -m "security: middleware de validación de entrada"
git add portfolio/helmet-config.js
git commit -m "security: headers HTTP seguros con helmet"
git push origin feature/seguridad

# 5. Release v1.0.0
git checkout develop
git merge feature/seguridad
git checkout -b release/v1.0.0
# Ajustes finales
git commit -m "chore: ajustes finales pre-release"
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "v1.0.0 - Portfolio funcional con contacto y BD"
git push origin main --tags
git checkout develop
git merge release/v1.0.0
git push origin develop
```

## Política de pushes a GitHub

- **Sube a GitHub al menos una vez al día** o cada 2-3 commits
- Incluso ramas `feature/` se suben → backup + visibilidad
- Crea **Pull Request** por cada feature al mergear a `develop`
- **Nunca pushees directo a `main`** (solo vía `release/` o `hotfix/`)
- Los mensajes de commit deben ser autoexplicativos para que cualquier persona (o tú en 6 meses) entienda qué cambió y por qué

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
