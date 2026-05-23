# Mapa del sitio – Dora Galiano

> Documento de referencia del flujo de navegación y rutas del sitio.
> Cualquier cambio en la estructura de páginas debería reflejarse acá primero.

---

## Áreas del sitio

El sitio se divide en **tres áreas**:

1. **Sitio público**: cualquiera lo ve, sin login.
2. **Sitio autenticado**: requiere cuenta de cliente.
3. **Panel de administración**: solo accesible para la dueña (admin).

---

## 1. Sitio público

Rutas accesibles sin necesidad de tener cuenta.

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Hero, sobre la marca, conferencias, trabajos destacados, productos destacados, galería de momentos, CTA al catálogo. Esta página cumple la función de "Sobre nosotros". |
| `/catalogo` | Catálogo | Listado completo de productos con filtros. |
| `/catalogo/:categoriaSlug` | Catálogo por categoría | Listado filtrado por categoría. |
| `/producto/:productoSlug` | Detalle de producto | Galería, descripción, selector de variantes, agregar al carrito. Incluye link a modal de guía de talles. |
| `/carrito` | Carrito | Vista expandida del carrito. |
| `/guia-talles` | Guía de talles | Tabla de equivalencias y mediciones por prenda. Mismo contenido que el modal del producto. |
| `/login` | Iniciar sesión | Login con email o Google. |
| `/registro` | Crear cuenta | Formulario de registro. |
| `/recuperar-clave` | Recuperar contraseña | Form de email para reset. |
| `/terminos` | Términos y condiciones | Página legal. |
| `/privacidad` | Política de privacidad | Página legal. |
| `/envios` | Envíos y entregas | Información sobre envíos. |
| `/cambios` | Cambios y devoluciones | Política de cambios. |
| `/arrepentimiento` | Botón de arrepentimiento | Form para cancelación dentro de los 10 días (obligatorio por ley argentina). |
| `*` | Error 404 | Página no encontrada. |

**Nota sobre contacto**: no hay página dedicada `/contacto`. El contacto se resuelve mediante WhatsApp y email visibles en el footer.

## 2. Sitio autenticado (cliente logueado)

Rutas solo accesibles con sesión iniciada. Si no hay sesión, redirige a `/login`.

| Ruta | Página | Descripción |
|---|---|---|
| `/checkout` | Checkout | Datos de envío + pago. |
| `/checkout/confirmacion` | Confirmación | Resumen de pedido exitoso. |
| `/checkout/pendiente` | Pago pendiente | Mercado Pago lo dejó pendiente. |
| `/checkout/rechazado` | Pago rechazado | Pago no pasó. |
| `/cuenta` | Mi cuenta | Dashboard con secciones (perfil, pedidos, favoritos). |
| `/cuenta/perfil` | Perfil | Editar datos personales. |
| `/cuenta/pedidos` | Mis pedidos | Historial de compras. |
| `/cuenta/pedidos/:orderId` | Detalle de pedido | Ver un pedido específico. |
| `/cuenta/favoritos` | Favoritos | Productos guardados (sincronizados en Firestore por uid). |

**Nota sobre favoritos**: cuando un usuario NO logueado intenta marcar un favorito desde el catálogo o producto, se le muestra un modal "Iniciá sesión para guardar este producto" con botón "Iniciar sesión".

## 3. Panel de administración

Rutas accesibles solo para la dueña (custom claim `admin: true`). Si no es admin, redirige a `/`.

| Ruta | Página | Descripción |
|---|---|---|
| `/admin` | Dashboard | Tablero con métricas: ventas del día/mes, sin stock. |
| `/admin/productos` | Listado de productos | Tabla con todos los productos, búsqueda, filtros. |
| `/admin/productos/nuevo` | Crear producto | Form de alta. |
| `/admin/productos/:productoId` | Editar producto | Form de edición. |
| `/admin/categorias` | Categorías | Listado + alta/edición/orden de categorías. |
| `/admin/ordenes` | Listado de órdenes | Tabla con todas las ventas. |
| `/admin/ordenes/:orderId` | Detalle de orden | Ver una orden, cambiar estado. |
| `/admin/configuracion` | Configuración del sitio | Editar textos del hero, datos de la marca, redes. |
| `/admin/reportes` | Reportes | Gráficos: ventas por período, productos más vendidos. |

---

## Flujos principales del usuario

### Flujo 1: Comprar un producto (usuario nuevo)

```
/ → /catalogo → /producto/:slug → /carrito → /login → /checkout → /checkout/confirmacion
```

### Flujo 2: Comprar (usuario recurrente)

```
/ → /catalogo → /producto/:slug → [agregar al carrito desde la card] → /checkout
```

### Flujo 3: Ver pedidos pasados

```
/cuenta → /cuenta/pedidos → /cuenta/pedidos/:orderId
```

### Flujo 4: Admin agrega un producto

```
/admin → /admin/productos → /admin/productos/nuevo → [submit] → /admin/productos/:productoId
```

### Flujo 5: Admin gestiona una venta

```
/admin → /admin/ordenes → /admin/ordenes/:orderId → [cambiar estado a "preparando" / "enviado" / "entregado"]
```

### Flujo 6: Cliente quiere arrepentirse de una compra

```
[footer] → /arrepentimiento → [completar form] → [email automático a admin]
```

### Flujo 7: Cliente consulta guía de talles

```
/producto/:slug → [click "Ver guía de talles"] → [modal con tabla]
                    O
[footer] → /guia-talles
```

---

## Convenciones de URLs

- **Idioma**: todas las URLs en español (`/catalogo`, no `/catalog`).
- **Slugs**: usar guiones medios, todo en minúsculas, sin acentos (`/producto/campera-creo-en-mi`, no `/producto/Campera-Creo-en-Mí`).
- **Identificadores**:
  - Categorías y productos: por slug (más SEO friendly, más legible).
  - Órdenes y entidades internas: por ID (random, no descriptivo).
- **Sin trailing slash**: `/catalogo`, no `/catalogo/`.

---

## Mapa visual de la estructura

```
SITIO PÚBLICO
├── / (Inicio + Sobre la marca)
├── /catalogo
│   └── /catalogo/:categoriaSlug
├── /producto/:slug
├── /carrito
├── /guia-talles
├── /login
├── /registro
├── /recuperar-clave
└── Legales
    ├── /terminos
    ├── /privacidad
    ├── /envios
    ├── /cambios
    └── /arrepentimiento

SITIO AUTENTICADO
├── /checkout
│   ├── /checkout/confirmacion
│   ├── /checkout/pendiente
│   └── /checkout/rechazado
└── /cuenta
    ├── /cuenta/perfil
    ├── /cuenta/pedidos
    │   └── /cuenta/pedidos/:orderId
    └── /cuenta/favoritos

PANEL ADMIN
└── /admin
    ├── /admin/productos
    │   ├── /admin/productos/nuevo
    │   └── /admin/productos/:productoId
    ├── /admin/categorias
    ├── /admin/ordenes
    │   └── /admin/ordenes/:orderId
    ├── /admin/configuracion
    └── /admin/reportes
```

---

## Decisiones tomadas y descartadas

Esta sección registra qué se evaluó y por qué se descartó, para no volver a discutir lo mismo en el futuro.

### Decisiones tomadas

- **Página `/guia-talles` + modal**: cubrimos UX dentro del producto (modal) y SEO/compartir (página).
- **Botón de arrepentimiento como página dedicada**: legalmente requerido, lleva form para cancelar compras.
- **Favoritos solo para usuarios logueados**: se guardan en Firestore, sincronizan entre dispositivos.

### Decisiones descartadas (para no volver a discutirlas)

- **Página `/nosotros`**: descartada. El home cumple la función porque Dora Galiano es marca personal con historia fuerte. Si en el futuro la sección crece mucho, se migra.
- **Página `/contacto`**: descartada. Footer con WhatsApp + email es suficiente para marca chica.
- **Newsletter**: descartado por ahora. Se evaluará con la dueña en el futuro.
- **Página de "Estado de pedido sin login"**: descartada. El cliente debe loguearse para ver sus pedidos.

---

## Pendientes / a definir con la dueña

- Confirmar si quiere agregar página de blog/novedades en el futuro.
- Definir contenido específico de páginas legales (Términos, Privacidad, Envíos, Cambios).
- Decidir si la guía de talles aplica a una sola tabla o necesita variantes por tipo de prenda.
