# 🛍️ Tienda Virtual

E-commerce para marca de indumentaria con diseño basado en telas recicladas. Sitio de marca con catálogo, sistema de compra con Mercado Pago integrado, y panel de administración propio para gestionar todo el contenido sin depender del desarrollador.

---

## 📑 Tabla de contenidos

- [Stack tecnológico](#-stack-tecnológico)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y arranque](#-instalación-y-arranque)
- [Scripts disponibles](#-scripts-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Convenciones de código](#-convenciones-de-código)
  - [Path aliases (@/)](#path-aliases-)
  - [Orden de imports](#orden-de-imports)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [TypeScript](#typescript)
- [Flujo de trabajo con Git](#-flujo-de-trabajo-con-git)
  - [Git Flow (estructura de ramas)](#git-flow-estructura-de-ramas)
  - [Conventional Commits](#conventional-commits)
  - [Husky (validaciones automáticas)](#husky-validaciones-automáticas)
- [Configuración del editor](#-configuración-del-editor)
- [Resolución de problemas comunes](#-resolución-de-problemas-comunes)

---

## 🧰 Stack tecnológico

| Categoría             | Tecnología                                    |
| --------------------- | --------------------------------------------- |
| Framework             | React 19 + Vite 8                             |
| Lenguaje              | TypeScript 6 (strict mode)                    |
| UI / Componentes      | MUI (Material UI) + diseño a medida           |
| Estado global         | Zustand                                       |
| Fetching de datos     | TanStack React Query                          |
| Navegación            | React Router                                  |
| Formularios           | React Hook Form + Zod (validación)            |
| Backend / Servicios   | Firebase (Auth, Firestore, Storage, Hosting) |
| Cloud Functions       | Firebase Functions (solo para Mercado Pago)   |
| Pagos                 | Mercado Pago Bricks (pago embebido)           |
| Linter                | ESLint 10 (flat config)                       |
| Formateador           | Prettier + sort-imports                       |
| Pre-commit hooks      | Husky + lint-staged                           |
| Validación de commits | Commitlint (Conventional Commits)             |

---

## ✅ Requisitos previos

- **Node.js** 20.19+ o 22.13+ (requerido por ESLint 10)
- **npm** 10+
- **Git** instalado y configurado
- **VS Code** recomendado (ver sección de configuración del editor)

Verificá las versiones con:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Instalación y arranque

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd tienda-virtual

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`.

> ⚠️ Al clonar el repo por primera vez, Husky se instala automáticamente gracias al hook `prepare` del `package.json`. Si por algún motivo no se activa, corré `npx husky init` manualmente.

---

## 📜 Scripts disponibles

| Script             | Qué hace                                                        |
| ------------------ | --------------------------------------------------------------- |
| `npm run dev`      | Levanta el servidor de desarrollo con HMR (hot module reload).  |
| `npm run build`    | Compila el proyecto para producción en `/dist`.                 |
| `npm run preview`  | Previsualiza localmente la build de producción.                 |
| `npm run lint`     | Corre ESLint sobre todo el proyecto.                            |
| `npm run lint:fix` | Corre ESLint con `--fix` (arregla lo que puede automáticamente).|
| `npm run format`   | Formatea todo el código con Prettier.                           |
| `npm run format:check` | Verifica si hay archivos sin formatear (sin modificarlos). |

---

## 📁 Estructura del proyecto

El proyecto usa una arquitectura **feature-based**: en lugar de agrupar archivos por tipo (`components/`, `hooks/`, etc.), se agrupan por dominio. Esto hace que todo lo relacionado a una funcionalidad viva junto.

```
tienda-virtual/
├── .husky/                  → Hooks de git (pre-commit, commit-msg)
├── .vscode/                 → Configuración compartida del editor
│   ├── extensions.json      → Extensiones recomendadas
│   └── settings.json        → Configuración del workspace
├── public/                  → Assets estáticos (favicon, robots.txt)
├── src/
│   ├── app/                 → Setup global (router, theme, providers)
│   ├── assets/              → Imágenes, fonts, íconos locales
│   ├── features/            → Un folder por dominio del negocio
│   │   ├── admin/           → Panel de administración
│   │   ├── auth/            → Login, registro, recuperar clave
│   │   ├── brand/           → Sitio de marca (home, sobre, etc.)
│   │   ├── cart/            → Carrito de compras
│   │   ├── checkout/        → Proceso de compra y MP
│   │   └── products/        → Catálogo y página de producto
│   ├── pages/               → Composición de páginas usando features
│   ├── shared/              → Lo que se reusa entre features
│   │   ├── components/      → UI genérica (Layout, Button, etc.)
│   │   ├── hooks/           → Hooks transversales
│   │   ├── lib/             → Wrappers (firebase, mp, etc.)
│   │   ├── types/           → Tipos globales de TS
│   │   └── utils/           → Funciones helper
│   ├── App.tsx              → Componente raíz
│   ├── main.tsx             → Entry point
│   └── index.css            → Estilos globales
├── .gitignore
├── .prettierignore
├── .prettierrc.json         → Configuración de Prettier
├── commitlint.config.js     → Reglas de Conventional Commits
├── eslint.config.js         → Configuración de ESLint
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json        → Config de TS para el código de la app
├── tsconfig.node.json       → Config de TS para archivos de config
└── vite.config.ts           → Configuración de Vite
```

### 🤔 ¿Por qué feature-based y no agrupado por tipo?

Cuando estés trabajando en el módulo de Mercado Pago, todo el código relacionado vive en `features/checkout/`: componentes, hooks, tipos, lógica. No tenés que abrir 5 carpetas distintas para entender qué hace una feature. Cuando una feature crece, escala bien. Cuando una feature se elimina, basta con borrar un folder.

### 📂 Estructura interna de cada feature

Dentro de cada feature, conviene seguir esta organización (no obligatoria, pero recomendada):

```
features/products/
├── components/         → Componentes propios de products
├── hooks/              → Hooks de products (ej: useProducts, useFilters)
├── services/           → Llamadas a Firebase relacionadas a products
├── types/              → Tipos de TS de products
├── utils/              → Helpers de products
└── index.ts            → Exports públicos de la feature (barrel)
```

---

## 🎨 Convenciones de código

### Path aliases (`@/`)

Está configurado el alias `@/` que apunta a `src/`. Sirve para evitar imports relativos largos como `../../../shared/components/Button`.

**❌ Mal:**

```ts
import { Button } from '../../../shared/components/Button'
import { useAuth } from '../../features/auth/hooks/useAuth'
```

**✅ Bien:**

```ts
import { Button } from '@/shared/components/Button'
import { useAuth } from '@/features/auth/hooks/useAuth'
```

El alias está configurado en:

- `tsconfig.app.json` → para que TypeScript lo entienda.
- `vite.config.ts` → para que Vite resuelva el bundle.
- `eslint.config.js` → para que ESLint valide los imports.

### Orden de imports

Prettier reordena los imports automáticamente al guardar el archivo. El orden es:

```ts
// 1. React y core
import { useState } from 'react'

// 2. Librerías externas (orden alfabético)
import { Box, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

// 3. Código de app/
import { theme } from '@/app/theme'

// 4. Código de features/
import { useAuth } from '@/features/auth/hooks/useAuth'
import { ProductCard } from '@/features/products/components/ProductCard'

// 5. Código de pages/
import { HomePage } from '@/pages/HomePage'

// 6. Código de shared/
import { Layout } from '@/shared/components/Layout'

// 7. Assets
import logo from '@/assets/logo.svg'

// 8. Imports relativos (último recurso)
import { formatPrice } from './utils'
```

Los grupos quedan separados por una línea en blanco. **Nunca toques el orden a mano**: dejá que Prettier lo haga al guardar (o corré `npm run format`).

### ESLint

ESLint analiza el código y reporta errores potenciales y violaciones de estilo. Las reglas más importantes configuradas:

| Regla                                | Qué hace                                                       |
| ------------------------------------ | -------------------------------------------------------------- |
| `prettier/prettier`                  | Reporta como warning cualquier desviación del formato.         |
| `@typescript-eslint/no-unused-vars`  | Marca variables sin usar. Se permiten las que empiezan con `_`.|
| `consistent-type-imports`            | Obliga a usar `import type` cuando solo se importa un tipo.    |
| `import-x/no-duplicates`             | No permite importar dos veces de la misma librería.            |
| `import-x/no-cycle`                  | Previene dependencias circulares entre archivos.               |
| `import-x/newline-after-import`      | Obliga una línea en blanco después del bloque de imports.      |
| `no-console`                         | Warning si dejás `console.log` (permite `warn/error/info`).    |
| `eqeqeq`                             | Obliga a usar `===` en vez de `==`.                            |
| `prefer-const`                       | Si declarás con `let` y nunca reasignás, te lo marca.          |

Para arreglar todos los errores automáticamente:

```bash
npm run lint:fix
```

### Prettier

Prettier es el formateador. Las reglas principales (`.prettierrc.json`):

- Sin punto y coma al final de las líneas (`semi: false`).
- Comillas simples (`singleQuote: true`).
- Trailing commas siempre (`trailingComma: "all"`).
- Ancho máximo de línea: 100 caracteres.
- Indentación: 2 espacios.
- Line endings: LF (Unix), también en Windows.
- Orden de imports automático con `@trivago/prettier-plugin-sort-imports`.

Para formatear todo manualmente:

```bash
npm run format
```

Para verificar sin modificar:

```bash
npm run format:check
```

> 💡 Con `editor.formatOnSave: true` configurado en `.vscode/settings.json`, cada vez que guardás un archivo se formatea solo. **No deberías necesitar correr `npm run format` casi nunca**.

### TypeScript

El proyecto usa TypeScript en modo estricto. Reglas importantes:

- **`noUnusedLocals`**: variables locales sin usar son error.
- **`noUnusedParameters`**: parámetros sin usar son error (usá `_` para ignorarlos).
- **`verbatimModuleSyntax`**: obliga a usar `import type` para tipos.
- **`noFallthroughCasesInSwitch`**: previene caer entre casos de un switch sin `break`.
- **`erasableSyntaxOnly`**: no permite sintaxis de TS que no sea simplemente borrable (como `enum` o `namespace`).

Convenciones de tipado:

```ts
// ✅ Importar tipos con "import type"
import type { User } from '@/shared/types'

// ✅ Tipar props de componentes con type, no interface (consistencia)
type ButtonProps = {
  label: string
  onClick: () => void
}

// ✅ Para funciones, declarar el tipo de retorno cuando no es obvio
function calculateTotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.price, 0)
}
```

---

## 🌿 Flujo de trabajo con Git

### Git Flow (estructura de ramas)

```
main                          → Rama de producción (siempre estable y desplegable)
│
└── develop                   → Rama de integración (último estado del desarrollo)
    │
    ├── feature/{nombre}      → Nueva funcionalidad
    ├── fix/{nombre}          → Corrección de bug
    ├── refactor/{nombre}     → Refactor sin cambio de comportamiento
    ├── chore/{nombre}        → Tareas de mantenimiento, config
    └── test/{nombre}         → Tests
```

**Flujo típico de trabajo:**

```bash
# 1. Partir desde develop actualizada
git checkout develop
git pull origin develop

# 2. Crear una rama para tu tarea
git checkout -b feature/listado-productos

# 3. Hacer commits siguiendo Conventional Commits
git add .
git commit -m "feat(products): agrega grilla responsiva del listado"

# 4. Subir la rama
git push origin feature/listado-productos

# 5. Abrir Pull Request hacia develop en GitHub
# 6. Una vez aprobado y mergeado, eliminar la rama local
git checkout develop
git pull
git branch -d feature/listado-productos
```

**Ejemplos de nombres de ramas:**

| Tipo       | Ejemplo                          |
| ---------- | -------------------------------- |
| `feature/` | `feature/login-con-google`       |
| `feature/` | `feature/filtro-por-categorias`  |
| `fix/`     | `fix/calculo-envio-zona-norte`   |
| `fix/`     | `fix/imagen-rota-en-mobile`      |
| `refactor/`| `refactor/extraer-hook-carrito`  |
| `chore/`   | `chore/actualizar-dependencias`  |
| `test/`    | `test/cobertura-productos`       |

### Conventional Commits

Todos los mensajes de commit deben seguir el formato:

```
tipo(scope): descripción en minúsculas
```

- **tipo**: obligatorio. Indica la naturaleza del cambio.
- **scope**: opcional pero recomendado. El módulo afectado.
- **descripción**: obligatoria, en minúsculas, sin punto al final.

**Tipos permitidos:**

| Tipo       | Cuándo usarlo                                    | Ejemplo                                            |
| ---------- | ------------------------------------------------ | -------------------------------------------------- |
| `feat`     | Nueva funcionalidad visible al usuario           | `feat(products): agrega filtro por talle`          |
| `fix`      | Corrección de un bug                             | `fix(cart): corrige cálculo del subtotal`          |
| `docs`     | Solo documentación                               | `docs: actualiza readme con guía de instalación`   |
| `style`    | Formato, espacios (no cambia lógica)             | `style: aplica prettier al proyecto`               |
| `refactor` | Reescritura sin cambiar comportamiento           | `refactor(auth): extrae hook useCurrentUser`       |
| `test`     | Tests nuevos o modificados                       | `test(products): agrega tests al hook usePagination`|
| `chore`    | Mantenimiento, dependencias, config              | `chore: actualiza vite a la última versión`        |
| `perf`     | Mejora de performance                            | `perf(catalog): memoiza la lista de productos`     |
| `ci`       | Cambios en CI/CD                                 | `ci: agrega workflow de deploy en github actions`  |
| `build`    | Cambios en sistema de build                      | `build: agrega path alias @ en vite`               |
| `revert`   | Revierte un commit anterior                      | `revert: revierte feat(products) #123`             |

**Scopes sugeridos** (basados en los módulos del Gantt):

`setup`, `brand`, `products`, `cart`, `checkout`, `auth`, `admin`, `mp`, `ui`, `theme`, `deps`, `ci`.

**Reglas adicionales:**

- ❌ `feat: Agregar login` → no puede empezar con mayúscula.
- ❌ `feat: agregar login.` → no puede terminar con punto.
- ❌ `feat: agregar login y carrito y checkout y panel admin y...` → máximo 100 caracteres.
- ✅ `feat(auth): agrega login con google`

### Husky (validaciones automáticas)

Hay dos hooks configurados que se ejecutan automáticamente en cada commit:

#### 🪝 `pre-commit`

Antes de cada commit, corre `lint-staged` sobre los archivos modificados:

1. ESLint con `--fix` sobre los archivos `.ts/.tsx` modificados.
2. Prettier sobre los archivos `.ts/.tsx/.json/.css/.md` modificados.

Si algo no se puede arreglar automáticamente, el commit se cancela y muestra un mensaje claro de qué corregir.

#### 🪝 `commit-msg`

Valida el mensaje del commit contra las reglas de Conventional Commits. Si no cumple, muestra un mensaje custom con:

- El formato esperado.
- Ejemplos válidos.
- La lista de tipos permitidos.
- Las reglas que no se cumplieron.

#### Saltarse Husky (no recomendado)

En caso muy excepcional, podés saltarte los hooks:

```bash
git commit --no-verify -m "mensaje"
```

⚠️ **No hacerlo regularmente**. Los hooks están para mantener calidad del código y el historial. Si te están molestando seguido, probablemente haya algo en la config que conviene ajustar.

---

## 💻 Configuración del editor

El proyecto incluye configuración compartida de VS Code en `.vscode/`. Al abrir el proyecto por primera vez, VS Code va a sugerirte instalar las extensiones recomendadas:

- **Prettier - Code formatter** (`esbenp.prettier-vscode`) — formateo al guardar.
- **ESLint** (`dbaeumer.vscode-eslint`) — errores y warnings en tiempo real.
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) — por si en el futuro sumamos Tailwind.
- **Code Spell Checker** (`streetsidesoftware.code-spell-checker`) — corrector ortográfico para variables y comentarios.

Aceptá la instalación. Si no aparece el aviso, abrí la pestaña de Extensiones (`Ctrl+Shift+X`) y buscalas manualmente.

**Configuración aplicada automáticamente** (en `.vscode/settings.json`):

- Formato al guardar habilitado.
- Prettier como formateador por defecto.
- ESLint corre `--fix` al guardar.
- Validación de ESLint para JS/TS/JSX/TSX.

---

## 🔧 Resolución de problemas comunes

### "Husky no se ejecuta al hacer commit"

```bash
# Reinstalar Husky
npx husky init

# Verificar que existan los archivos
ls .husky/
# Deberías ver: pre-commit y commit-msg
```

### "ESLint marca errores que no entiendo"

```bash
# Reiniciar el servidor de ESLint en VS Code
# Ctrl+Shift+P → "ESLint: Restart ESLint Server"

# O correr el lint en consola para ver el error completo
npm run lint
```

### "Prettier no formatea al guardar"

1. Verificá que tengas la extensión **Prettier - Code formatter** instalada.
2. Verificá que en VS Code esté seleccionado como formateador por defecto: abrí un `.tsx`, click derecho → "Format Document With..." → "Configure Default Formatter..." → elegí Prettier.
3. Recargá VS Code: `Ctrl+Shift+P` → "Developer: Reload Window".

### "Mi commit fue rechazado y no entiendo el mensaje"

Releé la sección [Conventional Commits](#conventional-commits). Los errores más comunes:

- Olvidaste el tipo: `agregue el login` ❌ → `feat(auth): agrega login` ✅
- Empezaste con mayúscula: `feat: Agregar login` ❌ → `feat: agregar login` ✅
- Terminaste con punto: `feat: agrega login.` ❌ → `feat: agrega login` ✅

### "El alias @/ no funciona"

1. Verificá que en `tsconfig.app.json` esté:
   ```json
   "paths": { "@/*": ["./src/*"] }
   ```
2. Verificá que en `vite.config.ts` esté el `resolve.alias`.
3. Reiniciá el servidor de TS en VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server".

### "Quiero saltarme un hook por una sola vez"

```bash
git commit --no-verify -m "tu mensaje"
```

Usalo con criterio. No abuses.

---

## 📌 Próximos pasos

Ver el Excel `plan_familiar.xlsx` con el Gantt completo del proyecto. El próximo módulo es **Diseño UX/UI**: wireframes, dirección visual y sistema de componentes.

---

## 👤 Autor

Desarrollado por Alexis Carreras.

---

_Última actualización: Mayo 2026_
