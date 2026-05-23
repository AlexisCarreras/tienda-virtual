# Wireframes – Dora Galiano

> Descripción estructural de las páginas principales del sitio.
> No incluye diseño visual (eso vive en el código del design system) ni estructura de datos (eso vive en `src/shared/types/`).
> Cualquier ajuste de UX importante se documenta acá antes de codear.

---

## Convenciones generales del sitio

Estas reglas aplican a todas las páginas y no se repiten en cada wireframe.

### Layout base

Todas las páginas (excepto admin) tienen este esqueleto:

- **Header fijo arriba**: logo, navegación, búsqueda, ícono carrito con contador, acceso a cuenta.
- **Contenido principal**: variable según página.
- **Footer abajo**: links a páginas legales, redes sociales, contacto (WhatsApp + email), botón de arrepentimiento, copyright.

> **Decisión de navegación**: usamos header arriba (no sidebar lateral) porque es el estándar de marcas de moda modernas. Sidebar lateral queda reservado para el panel de admin.

### Componentes recurrentes

- **ProductCard**: foto, nombre, precio (con precio anterior tachado si aplica), badge de stock si está bajo, ícono de favorito en esquina.
- **Botones primarios**: terracota sólido.
- **Botones secundarios**: outline.
- **Loading states**: skeletons (cards grises animadas) en vez de spinners.
- **Toasts**: notificaciones flotantes para feedback rápido ("Agregado al carrito", "Error al guardar", etc).

### Modal "Iniciá sesión para guardar favoritos"

Cuando un usuario NO logueado clickea el corazón de favoritos en cualquier ProductCard:

```
┌───────────────────────────────────────┐
│  [SVG: hilo y aguja en miniatura]     │
│                                       │
│  Guardá tus favoritos                 │
│                                       │
│  Creá una cuenta para guardar         │
│  productos, ver tu historial de       │
│  compras y acceder a beneficios       │
│  exclusivos.                          │
│                                       │
│  [Crear cuenta]  [Iniciar sesión]    │
│                                       │
│  ¿No es ahora? Seguí navegando.       │
└───────────────────────────────────────┘
```

Modal no bloqueante: si el usuario clickea afuera o presiona ESC, se cierra.

### Manejo de "estados especiales" (regla general)

Todas las páginas deben manejar correctamente los **estados no-felices**:

- **Estado vacío**: cuando no hay datos (catálogo vacío, sin pedidos, sin favoritos). Siempre con **ilustración SVG** + mensaje amigable + CTA para que el usuario pueda salir del estado.
- **Estado de carga (loading)**: skeletons en vez de spinners (mejor UX percibida).
- **Estado de error**: alert visible con mensaje claro + botón "Reintentar" cuando aplica.
- **Estado "no encontrado"**: para entidades que no existen (producto, categoría, orden). Redirige a 404 con SVG y mensaje.

Las ilustraciones SVG deben ser temáticas (hilo, aguja, percha, prenda estilizada) para reforzar la identidad de marca.

### Responsive

- **Mobile-first**: todo se diseña pensando en mobile primero.
- **Breakpoints estándar**: mobile (< 600px), tablet (600-960px), desktop (> 960px).
- **Diferencias entre dispositivos**: solo se documentan cuando son relevantes (no decimos "en mobile hay menos columnas").

---

## 1. Inicio (`/`)

### Objetivo

Comunicar **quién es Dora Galiano** y **qué ofrece**. La home es la cara de la marca y cumple la función de "Sobre nosotros". El visitante tiene que entender en 10 segundos que es una marca artesanal con valores particulares.

### Estructura (orden de arriba a abajo)

#### 1.1 Hero principal

- **Foto principal**: retrato de la dueña con una prenda que destaque (collar bordado, denim intervenido). Disponible en el admin para reemplazar.
- Overlay sutil oscuro en la parte donde va el texto para legibilidad.
- Texto superpuesto:
  - **Título principal**: nombre de marca o frase corta poética.
  - **Subtítulo/tagline**: "diseño para armar".
  - **CTA primario**: "Ver colección" → `/catalogo`.

**Foto inicial confirmada**: la dueña con collar bordado amarillo en fondo de naturaleza (se reemplaza desde admin cuando la dueña lo prefiera).

#### 1.2 Sobre la marca

- Foto en cuadrado/retrato de la dueña en su taller (pendiente: pedir más fotos).
- Texto al lado: ~3 párrafos cortos sobre el origen, la filosofía artesanal, denim reciclado, bordados a mano.
- Sin CTA (es contenido informativo, no acción).
- En mobile: foto arriba, texto abajo.

#### 1.3 Productos destacados

- Título de sección: "Destacados" o "Lo más nuevo".
- Grilla de 3-4 productos featured (la dueña los marca como `isFeatured: true` desde el admin).
- Cada producto es un ProductCard.
- CTA debajo: "Ver todo el catálogo" → `/catalogo`.

#### 1.4 Conferencias y colaboraciones

- Título: "Conferencias y colaboraciones".
- 2-3 cards con foto + título + descripción corta.
- **Editable desde el admin** (la dueña puede agregar/sacar items).
- No clickeables por ahora (puro contenido).

**Contenido inicial sugerido** (basado en su trayectoria):

- **Diseñoteca / Chubut Creativo**: participación en muestras federales de diseño sostenible.
- **Amorfismo (banda)**: diseño de vestimentas para giras y presentaciones.
- **Festivales / pop-ups**: presentaciones en eventos de moda y diseño.

La dueña irá actualizando esta sección a lo largo del tiempo según nuevas participaciones.

#### 1.5 Galería de momentos

- Grilla de fotos en formato masonry (alturas variables) o grilla regular.
- 6-12 fotos del backstage, taller, eventos, detalles de bordado.
- Carga progresiva (lazy loading) para no penalizar la performance.
- Click en foto: lightbox que la muestra en grande.

**Contenido inicial sugerido**: detalles de bordados, prendas en uso, momentos del taller, eventos donde participó.

#### 1.6 CTA final

- Sección visualmente distinta (fondo de color o full bleed).
- Texto: invitación a explorar el catálogo.
- CTA primario grande.

### Estados especiales

- **Sin productos destacados**: la sección 1.3 no se muestra (oculta entera).
- **Sin galería**: la sección 1.5 no se muestra.
- **Loading**: skeletons en las secciones de productos y galería mientras cargan.

---

## 2. Catálogo (`/catalogo` y `/catalogo/:categoriaSlug`)

### Objetivo

Permitirle al usuario **explorar todos los productos** y filtrar para encontrar lo que busca.

### Estructura

#### 2.1 Encabezado de catálogo

- Breadcrumb: `Inicio > Catálogo` (o `Inicio > Catálogo > Categoría` si está filtrado).
- Título de la página: "Catálogo" o nombre de la categoría.
- Descripción opcional (solo en categorías, si la dueña la cargó).

#### 2.2 Barra de controles

- Botón **"Filtros"** a la izquierda → abre drawer (panel lateral desde la izquierda) con todos los filtros.
- Selector **"Ordenar por"** a la derecha:
  - Más recientes (default).
  - Precio: menor a mayor.
  - Precio: mayor a menor.
  - Nombre A-Z.
- Contador de resultados al lado: "32 productos".

#### 2.3 Drawer de filtros (se abre desde "Filtros")

Se desliza desde la **izquierda** (mientras el drawer del carrito se desliza desde la derecha, así no se confunden).

Contiene:
- **Categorías**: lista de checkboxes con todas las categorías.
- **Talle**: chips (XS, S, M, L, XL, talles numéricos).
- **Color**: chips de color (visuales).
- **Precio**: slider de rango (mínimo - máximo).
- **En oferta**: toggle simple para mostrar solo productos con descuento.

Footer del drawer:
- Botón "Aplicar filtros".
- Link "Limpiar todo".

Los filtros activos se reflejan en chips debajo de la barra de controles, con X para sacarlos individualmente.

#### 2.4 Grilla de productos

- **Desktop**: 3 columnas (cards medianas con aire entre ellas, estilo editorial).
- **Tablet**: 2 columnas.
- **Mobile**: 2 columnas (cards más chicas) o 1 columna (decidir al codear, probar ambas).

**Detalle opcional - Hero de categoría**: cuando se entra a `/catalogo/:categoriaSlug` específico, la primera card puede ocupar 2 columnas (formato horizontal con foto grande + texto). Es sutil, da ritmo. **Si visualmente queda raro al codear, se saca.**

#### 2.5 ProductCard

Cada card contiene:
- **Foto del producto**: ratio cuadrado o 4:5 (a definir al codear). Hover en desktop: cambia a segunda foto si existe.
- **Ícono de favorito**: corazón en esquina superior derecha. Click guarda en favoritos (modal de login si no está logueado).
- **Nombre del producto**: 2 líneas máximo.
- **Precio**:
  - Si NO hay descuento: "$25.000" en color normal.
  - Si HAY descuento: "$20.000" en color destacado + "$25.000" tachado al lado.
- **Badge de stock bajo**: si quedan menos de 3 unidades en TOTAL (sumando variantes), aparece chip pequeño "Últimas unidades".

#### 2.6 Paginación

- Después de mostrar N productos (ej: 12 o 16), botón **"Cargar más"** centrado.
- Click: trae los siguientes N sin recargar página.
- Cuando ya no hay más: el botón se oculta, aparece texto sutil "No hay más productos".

> **Decisión técnica**: usamos "load more" en lugar de paginación numerada (1, 2, 3...) porque es más moderno, mobile-friendly, y mejor UX para catálogo de moda.

### Estados especiales

- **Sin productos en la categoría**: ilustración SVG (percha vacía o prenda estilizada) + mensaje "Pronto vas a encontrar productos en esta categoría. Mientras tanto, mirá el catálogo completo." + botón a `/catalogo`.
- **Sin resultados con filtros aplicados**: ilustración SVG + "No encontramos productos con esos filtros. Probá ajustando o limpiando los filtros." + botón "Limpiar filtros".
- **Loading inicial**: 6-8 skeletons de ProductCard.
- **Loading "cargar más"**: spinner pequeño en el botón.

---

## 3. Detalle de producto (`/producto/:slug`)

### Objetivo

Mostrar **toda la información necesaria para decidir comprar**, y resolver dudas (talle, fotos, descripción) sin tener que salir de la página.

### Estructura

#### 3.1 Breadcrumb

`Inicio > Catálogo > Categoría > Nombre del producto`

#### 3.2 Galería de fotos

**Estilo: slider full-width sin miniaturas, estilo editorial.**

- Foto principal ocupa todo el ancho de su contenedor.
- Flechas izquierda/derecha para navegar (visibles solo en hover desktop, siempre en mobile).
- Dots de paginación abajo.
- En mobile: swipe horizontal con el dedo.
- Click en foto: lightbox a pantalla completa con zoom.

#### 3.3 Información del producto (al lado o debajo de galería)

En desktop: **galería a la izquierda (60% ancho), info a la derecha (40% ancho)**. En mobile: galería arriba, info abajo.

Bloques de la info, en orden:

**3.3.1 Categoría**: pequeño texto arriba ("Camperas", "Vestidos", etc) en color secundario.

**3.3.2 Nombre del producto**: título grande, tipografía editorial.

**3.3.3 Precio**:
- Si NO hay descuento: "$25.000" en grande.
- Si HAY descuento: "$20.000" grande destacado + "$25.000" tachado más chico al lado + chip rojo "-20%".

**3.3.4 Descripción corta**: 2-3 líneas con la esencia del producto.

**3.3.5 Selector de variantes**:
- **Talle**: chips horizontales (XS, S, M, L). Los talles agotados aparecen tachados/deshabilitados.
- **Color**: chips visuales (círculos con el color). Los colores agotados aparecen tachados.
- Si no hay stock en NINGUNA combinación de variante seleccionada: mensaje "Sin stock para esta combinación".

**3.3.6 Link guía de talles**: link discreto debajo del selector → abre modal con tabla de equivalencias.

**3.3.7 Cantidad**: selector +/- con número (default: 1). Máximo: el stock disponible de la variante seleccionada.

**3.3.8 Botón principal "Agregar al carrito"**:
- Habilitado solo si seleccionó variante y hay stock.
- Click: agrega al carrito + abre drawer lateral del carrito.

**3.3.9 Botón secundario "Agregar a favoritos"**:
- Outline con ícono de corazón.
- Click si no logueado: modal "Guardá tus favoritos" (ver convenciones generales).
- Click si logueado: el corazón se llena.

**3.3.10 Información de envío**: bloque pequeño con íconos.
- "Envíos a todo el país" + ícono.
- "Cambios y devoluciones hasta 10 días" + ícono.

#### 3.4 Descripción larga

Debajo de la galería + info, sección con:
- Título: "Detalles".
- Texto largo con la historia del producto, materiales, técnica artesanal.

#### 3.5 Productos relacionados

- Título: "También te puede gustar".
- Grilla de 4 productos de la misma categoría (o featured si no hay suficientes).
- Misma estructura de ProductCard.

### Estados especiales

- **Producto sin stock total**: el botón "Agregar al carrito" se reemplaza por botón deshabilitado "Sin stock".
- **Producto no encontrado** (slug inválido): redirige a página 404 con SVG temático y mensaje.
- **Loading**: skeleton de galería + skeleton de info.

---

## 4. Carrito drawer + página (`/carrito`)

### Objetivo

Mostrar **los productos que el usuario quiere comprar** y dejarlo iniciar el checkout.

### Versión drawer (panel lateral)

Se abre al agregar producto desde el detalle o al click ícono carrito del header. Se desliza desde la **derecha**.

#### 4.1 Estructura del drawer

- **Header**: "Tu carrito" + botón cerrar (X).
- **Lista de items** (scrollable):
  - Cada item: foto pequeña, nombre, variante (talle/color), cantidad (con +/-), precio total del item, botón eliminar (ícono tacho).
- **Footer**:
  - Subtotal: "$XX.XXX".
  - Botón primario "Iniciar compra" → `/checkout`.
  - Link secundario "Ver carrito completo" → `/carrito`.

#### 4.2 Estados especiales del drawer

- **Carrito vacío**: ilustración SVG minimalista (bolsa o percha vacía) + mensaje "Tu carrito está vacío" + botón "Explorar productos" → `/catalogo`.
- **Item sin stock** (mientras estaba en el carrito alguien compró el último):
  - Item se ve con opacidad reducida.
  - Badge rojo: "Sin stock".
  - Botón "Eliminar" más visible.
  - El botón "Iniciar compra" del footer se deshabilita con tooltip: "Eliminá los productos sin stock para continuar".

### Versión página (`/carrito`)

Misma información pero en formato página completa. Útil cuando el drawer es muy chico (muchos items) o el usuario prefiere ver todo de corrido.

#### 4.3 Estructura de la página

Layout en 2 columnas (desktop):

**Columna izquierda (60%): items**
- Lista de items con misma info que el drawer pero más espaciada y con foto más grande.
- Cada item permite cambiar cantidad, eliminar.

**Columna derecha (40%): resumen**
- Sticky (se queda fijo al scrollear).
- Resumen de la compra:
  - Subtotal.
  - Envío: "Se calcula en el siguiente paso" (porque depende de la dirección, todavía no la pidió).
  - Total: subtotal.
- Botón primario grande "Iniciar compra".
- Link "Seguir comprando" → `/catalogo`.

En mobile: items arriba, resumen abajo sticky en el footer.

### Estados especiales página

- **Carrito vacío**: misma ilustración SVG y mensaje que el drawer, en formato página centrada.

---

## 5. Login y Registro (`/login` y `/registro`)

### Objetivo

Permitir al usuario **autenticarse o crear cuenta** con mínima fricción. La página debe sentirse cuidada y editorial, **no como un login viejo y aburrido**.

### Estructura común

Ambas páginas son muy similares, layout centrado con card cuidada.

#### 5.1 Layout

- Card centrada vertical y horizontalmente, máx 420px de ancho.
- **SVG temático en miniatura** arriba del card (hilo y aguja) — refuerza la identidad de marca.
- Logo de la marca debajo del SVG.
- Título: "Iniciar sesión" o "Crear cuenta".
- Tagline pequeño debajo del título: "Bienvenida a Dora Galiano" / "Sumate a la comunidad".
- Card con sombra suave + borde redondeado + padding generoso.

#### 5.2 Login

- Botón **"Continuar con Google"** (con ícono de Google).
- Separador: "o continuá con email".
- Form:
  - Input email.
  - Input password (con ícono de mostrar/ocultar).
  - Link pequeño "Olvidé mi contraseña" → `/recuperar-clave`.
  - Botón primario "Iniciar sesión".
- Link debajo: "¿No tenés cuenta? Crear cuenta" → `/registro`.

#### 5.3 Registro

- Botón **"Registrarme con Google"** (con ícono de Google).
- Separador: "o registrate con email".
- Form:
  - Input nombre.
  - Input email.
  - Input password (con indicador de fortaleza).
  - Input confirmar password.
  - Checkbox: "Acepto los Términos y la Política de privacidad" (links).
  - Botón primario "Crear cuenta".
- Link debajo: "¿Ya tenés cuenta? Iniciar sesión" → `/login`.

### Estados especiales

- **Error de credenciales**: alert rojo debajo del form: "Email o contraseña incorrectos".
- **Email ya registrado** (en registro): "Este email ya tiene una cuenta. ¿Querés iniciar sesión?".
- **Loading**: botón con spinner + texto "Iniciando sesión..." / "Creando cuenta...".

---

## 6. Checkout (`/checkout`)

### Objetivo

Pedirle al usuario **los datos de envío y el método de pago**, con mínima fricción. Es el flujo más crítico: cualquier obstáculo acá pierde la venta.

> **Decisión clave**: **single-page checkout** (todo en una sola página con scroll), no stepper de varios pasos. Esto reduce fricción percibida y es el patrón moderno (Shopify default, Tiendanube). El usuario ve todo lo que tiene que completar de un vistazo.

### Estructura

Layout en 2 columnas (desktop): formulario izquierda, resumen sticky a la derecha.

#### 6.1 Aviso de invitado vs. logueado

Arriba del form, banner sutil (no bloqueante):

**Si NO está logueado**:
"Estás comprando como invitado. ¿Tenés cuenta? [Iniciar sesión] para autocompletar tus datos."

**Si está logueado**:
(Sin banner. Solo los datos se autocompletan.)

#### 6.2 Form: datos de contacto

- Email (autocompletado si logueado).
- Teléfono.

#### 6.3 Form: datos de envío

- Nombre completo.
- DNI (para factura/envío).
- Dirección (calle + número).
- Departamento/Piso (opcional).
- Ciudad.
- Provincia (dropdown).
- Código postal.
- Notas para el envío (opcional, ej: "tocar timbre B").

#### 6.4 Método de envío

**Versión MVP** (mientras la dueña define zonas y costos):

- Única opción: **"Coordinar con el comprador"** — costo: "A definir".
- Texto explicativo: "Nos contactaremos por WhatsApp o email para coordinar el método de envío más conveniente (Correo Argentino, OCA, Andreani, retiro, etc.)".

**Cuando la dueña habilite zonas desde el admin**, esto se convierte en:

- Cards de método de envío:
  - **Envío estándar a domicilio**: "$2.500" (3-5 días hábiles).
  - **Envío rápido**: "$4.000" (1-2 días hábiles).
  - **Retiro en taller**: "Gratis" (zona local).
- Radio buttons para seleccionar.

#### 6.5 Método de pago

- Botón único grande: **"Pagar con Mercado Pago"**.
- Logo de Mercado Pago + íconos de tarjetas aceptadas (Visa, Master, Amex).
- Texto pequeño: "Te redirigimos a Mercado Pago para completar el pago de forma segura. Podés pagar con tarjeta de crédito/débito, dinero en cuenta o transferencia."

#### 6.6 Banner de beneficios (sutil, no bloqueante)

Para invitados (no logueados), cerca del final del form:

```
┌────────────────────────────────────────────┐
│  ¿Querés guardar tus datos para futuras    │
│  compras y ver el estado de tu pedido      │
│  desde tu cuenta?                          │
│                                             │
│  [Crear cuenta]   [Continuar sin cuenta]   │
└────────────────────────────────────────────┘
```

#### 6.7 Resumen lateral (sticky)

- Mini-listado de los items (foto chiquita + nombre + variante + cantidad).
- Subtotal.
- Envío: "A coordinar" (mientras no hay zonas).
- Total final.
- Mensaje pequeño: "Vas a poder revisar todo antes de pagar".

#### 6.8 Botón final

Grande, primario: **"Continuar al pago"** → genera la orden en Firestore y redirige a Mercado Pago.

### Estados especiales

- **Carrito vacío al llegar a /checkout**: redirige a `/carrito` con mensaje.
- **Error al crear orden**: toast rojo + mantiene los datos del form.
- **Error al redirigir a MP**: alert con opción "Reintentar".

---

## 7. Mi cuenta - Dashboard (`/cuenta`)

### Objetivo

Dar un **hub central** desde donde el usuario accede a sus datos, pedidos y favoritos.

### Estructura

#### 7.1 Saludo

"Hola, [Nombre]" en grande. Si no tiene nombre cargado, "Bienvenida".

#### 7.2 Tarjetas de accesos rápidos

Grilla de 3 cards (o stack en mobile):

**Card 1 - Perfil**:
- Ícono + título "Mi perfil".
- Texto: "Editá tus datos personales y dirección de envío".
- Click → `/cuenta/perfil`.

**Card 2 - Pedidos**:
- Ícono + título "Mis pedidos".
- Texto: "Ver historial y estado de tus compras".
- Si hay pedidos en curso: badge "1 pedido en preparación".
- Click → `/cuenta/pedidos`.

**Card 3 - Favoritos**:
- Ícono + título "Mis favoritos".
- Texto: "Productos que guardaste para después".
- Badge con cantidad: "5 productos".
- Click → `/cuenta/favoritos`.

#### 7.3 Último pedido (opcional)

Si tiene al menos un pedido, sección destacada:
- Título: "Tu último pedido".
- Card con foto del primer item, nombre, estado actual ("Enviado", "Entregado").
- Botón "Ver detalle" → `/cuenta/pedidos/:id`.

#### 7.4 Cerrar sesión

Botón discreto al final: "Cerrar sesión".

### Estados especiales

- **Sin pedidos**: la sección 7.3 no se muestra.
- **Sin favoritos**: la card de favoritos muestra "Empezá a guardar productos" en lugar del contador.

---

## 8. Detalle de pedido (`/cuenta/pedidos/:orderId`)

### Objetivo

Mostrar **todos los detalles de un pedido específico** y su estado actual de envío.

### Estructura

#### 8.1 Header del pedido

- Botón "← Volver a mis pedidos".
- Número de pedido: "Pedido #ABC123".
- Fecha de compra: "15 de junio de 2026".
- Estado actual: chip grande de color según estado (verde = entregado, azul = en camino, etc).

#### 8.2 Tracker visual de estado

Línea horizontal con 5 pasos:

`[Pagado] → [En preparación] → [Enviado] → [En camino] → [Entregado]`

El paso actual aparece destacado, los anteriores con check, los siguientes en gris.

Si el estado es "cancelado", se muestra un cartel rojo aparte (no en la línea de progreso).

#### 8.3 Tracking del envío (si aplica)

Si el admin cargó número de tracking:
- "Tu pedido está siendo enviado por [Empresa]".
- "Número de seguimiento: XYZ123".
- Link "Ver tracking" → URL del correo.

#### 8.4 Items del pedido

Lista de productos comprados:
- Foto, nombre, variante (talle/color), cantidad, precio.
- NO permite modificar (el pedido ya está cerrado).
- Click en producto: lleva a `/producto/:slug` para volver a comprar si quiere.

#### 8.5 Datos del envío

Card con:
- Nombre del destinatario.
- Dirección completa.
- Teléfono.
- Notas (si las cargó).

#### 8.6 Resumen de costos

- Subtotal.
- Costo de envío.
- Total final.

#### 8.7 Acciones (según estado)

- Si está "pendiente de pago": botón "Reintentar pago".
- Si está "entregado": botón "Comprar de nuevo" (agrega los mismos items al carrito).
- Siempre visible: link "¿Tenés algún problema? Contactanos por WhatsApp".

### Estados especiales

- **Pedido no encontrado** (ID inválido o pedido de otro usuario): 404.
- **Pedido cancelado**: cartel rojo arriba "Este pedido fue cancelado" + motivo si lo cargó el admin.

---

## 9. Admin - Crear/Editar producto (`/admin/productos/nuevo` y `/admin/productos/:id`)

### Objetivo

Permitirle a la dueña **cargar y editar productos** sin necesitar conocimientos técnicos. Es el form más complejo del admin; los demás siguen el mismo patrón.

### Estructura

Layout en 2 columnas (desktop): form principal izquierda, panel de acciones a la derecha (sticky).

#### 9.1 Header

- Breadcrumb: `Admin > Productos > Nuevo` (o `Admin > Productos > Editar [Nombre]`).
- Título: "Crear producto" o "Editar producto".

#### 9.2 Form - Información básica (sección)

- **Nombre del producto** (input).
- **Slug** (input). Se genera automáticamente desde el nombre pero editable. Validación: solo lowercase, guiones, sin acentos.
- **Categoría** (dropdown con las categorías existentes + link "Crear categoría nueva").
- **Descripción corta** (textarea, max 200 chars).
- **Descripción larga** (textarea o editor simple con negrita/cursiva/listas).

#### 9.3 Form - Precios

- **Precio actual** (input numérico con formato $).
- **Precio anterior** (input numérico, OPCIONAL). Si se carga, en el sitio público aparece tachado al lado del actual.
- Si "Precio anterior" está cargado y es menor o igual al actual, error de validación: "El precio anterior debe ser mayor".

#### 9.4 Form - Imágenes

- Componente drag & drop para subir múltiples imágenes.
- Vista previa de las imágenes cargadas en grilla.
- Cada imagen tiene:
  - Botón "Establecer como principal" (la principal es la que se muestra en la card del catálogo).
  - Botón eliminar.
  - Drag handle para reordenar.
- Máximo 8 imágenes por producto.

#### 9.5 Form - Variantes (talle/color)

Tabla editable:

| Talle | Color | Stock | SKU (opcional) | [Eliminar] |
|---|---|---|---|---|
| S | Negro | 5 | DG-001-S-N | 🗑️ |
| M | Negro | 3 | DG-001-M-N | 🗑️ |
| ... | ... | ... | ... | ... |

Botón "Agregar variante" debajo de la tabla.

Si el producto no tiene variantes (ej: accesorio sin talles), botón "Producto sin variantes" → muestra solo input de stock total.

#### 9.6 Form - Configuración

- Toggle: **"Producto activo"** (default ON). Si OFF, no aparece en el catálogo público.
- Toggle: **"Destacado"** (default OFF). Si ON, aparece en home de productos featured.
- Tags (input con chips): para búsqueda interna. Ej: "denim, reciclado, invierno".

#### 9.7 Panel lateral (sticky)

- **Estado del form**:
  - Cantidad de cambios sin guardar.
  - Última vez guardado: "Hace 5 minutos" (si está editando).
- **Botones principales**:
  - "Guardar cambios" (primario).
  - "Cancelar" → vuelve al listado sin guardar.
- **Botón secundario** (solo en edición):
  - "Eliminar producto" (rojo, con confirmación modal: "¿Estás segura? Esta acción no se puede deshacer.").
- **Preview**:
  - Botón "Ver en el sitio" → abre `/producto/:slug` en nueva pestaña (solo si está activo).

### Estados especiales

- **Form inválido**: campos con error en rojo + mensaje. Botón "Guardar" deshabilitado hasta corregir.
- **Guardando**: spinner en el botón + form deshabilitado.
- **Guardado exitoso** (en alta): redirige a `/admin/productos/:nuevoId` y muestra toast "Producto creado".
- **Guardado exitoso** (en edición): toast "Cambios guardados" + queda en la misma página.
- **Error al guardar**: toast rojo con el error específico + form sigue editable.

---

## Patrones que se repiten en el sitio (no se documentan por separado)

### Páginas legales

`/terminos`, `/privacidad`, `/envios`, `/cambios`, `/arrepentimiento` son páginas de texto. Layout:

- Header del sitio (mismo de siempre).
- Título de la página.
- Texto largo en una columna centrada con ancho máximo legible (~700px).
- En el caso de `/arrepentimiento`: además del texto explicativo, form al final (orden, motivo, email).
- Si la página queda visualmente vacía (mucha cabecera + poco texto), agregar un **SVG temático** sutil en el header para dar identidad.
- Footer del sitio.

> **Pendiente**: el contenido legal de cada página (texto real) lo armamos en el módulo 2 con plantillas genéricas adaptadas a Argentina, que después la dueña personaliza.

### Página 404

- Layout centrado.
- **SVG temático** (el del hilo + aguja que ya tenemos, o variante).
- Mensaje amigable: "Esta página no existe o se mudó".
- Botón primario: "Volver al inicio" → `/`.
- Botón secundario: "Ver catálogo" → `/catalogo`.

### Listados del admin

`/admin/productos`, `/admin/ordenes`, `/admin/categorias` siguen un patrón común:

- Header con título + botón "+ Crear nuevo" (cuando aplica).
- Barra de búsqueda + filtros + acciones masivas.
- Tabla con columnas relevantes según el tipo.
- Paginación al final.
- Click en una fila → detalle/edición de ese item.

Cada listado tiene columnas distintas pero misma estructura visual.

---

## Decisiones tomadas y descartadas

### Decisiones tomadas

- **Mobile-first**: todo se diseña para mobile primero y se adapta a desktop.
- **Header arriba, no sidebar**: para el sitio público. Sidebar queda reservado al panel admin.
- **Filtros del catálogo en drawer desde la izquierda**: más simple y moderno que sidebar fijo. El carrito drawer va desde la derecha para no confundirse.
- **Galería de producto sin miniaturas**: estilo editorial, más limpio.
- **Carrito drawer + página**: drawer para acciones rápidas, página para revisión detallada.
- **"Cargar más" en vez de paginación numerada**: mejor UX mobile.
- **Productos sin stock se ven con badge, no se ocultan**: el usuario puede entender por qué no compra.
- **Guest checkout permitido**: prioriza conversión sobre tracking.
- **Items sin stock en carrito se ven pero bloquean checkout**: no confunden al usuario eliminándose solos.
- **Single-page checkout, no stepper**: menos fricción percibida, patrón moderno.
- **Estados especiales con SVG temático**: refuerzan identidad de marca cuando algo está vacío o no existe.
- **Modal "Guardá tus favoritos" no bloqueante**: invita a registrarse sin frustrar al usuario.
- **Envío "a coordinar" como única opción inicial**: hasta que la dueña configure zonas y costos desde admin.

### Decisiones descartadas

- **Wireframes en Figma**: descartado por costo de trabajo duplicado.
- **Login obligatorio para comprar**: descartado, perdería conversión.
- **Paginación numerada (1, 2, 3)**: descartada por UX mobile.
- **Sidebar fijo de filtros**: descartado por preferencia de diseño moderno.
- **Quick view (modal con info del producto sin salir del catálogo)**: descartado del MVP, podría sumarse después.
- **Stepper de checkout en varios pasos**: descartado en favor de single-page (menos fricción).
- **Feature "Avisame cuando vuelva" para productos sin stock**: descartada del MVP.

---

## Pendientes a definir con la dueña

- **Contenido específico del Hero**: foto definitiva (la del collar amarillo sirve para arrancar), texto principal.
- **Texto de "Sobre la marca"** en home: 3 párrafos cortos.
- **Conferencias y colaboraciones** actualizadas: Diseñoteca / Chubut Creativo, Amorfismo, futuros eventos.
- **Más fotos del taller** y del proceso artesanal para galería de momentos.
- **Categorías iniciales del catálogo**. Sugerencia inicial: Camperas y abrigos, Vestidos, Tops y blusas, Pantalones y shorts, Accesorios (collares, vinchas, bolsos), Edición especial / colaboraciones.
- **Zonas de envío y costos**: cuando la dueña esté lista, se cargan desde admin. Hasta entonces, "Coordinar con el comprador".
- **Contenido de páginas legales**: plantillas genéricas válidas para Argentina, ajustables.
- **Datos de contacto**: WhatsApp, email, redes sociales para footer.
- **Color tags de variantes**: paleta de colores que la dueña suele usar para que aparezcan visualmente en los filtros.
