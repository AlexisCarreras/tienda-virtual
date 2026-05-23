# Dirección visual – Dora Galiano

> Documento de referencia para todas las decisiones visuales del sitio.
> Define cómo se ve y se siente la marca en pantalla.
> Las decisiones técnicas (paleta, tipografía, tokens) que están en el theme MUI se documentan acá con su intención de uso.

---

## Tono visual

**Artesanal y moderno.**

Estas dos palabras guían cada decisión visual del sitio. Vamos a desglosarlas porque no son obvias y se equilibran entre sí.

### "Artesanal" significa para nosotros

- Cálido, no frío.
- Imperfecto a propósito, no pulido en exceso.
- Humano, con presencia de personas reales.
- Detalles que cuentan una historia (un bordado en primer plano, una textura de tela).
- Espacios respiratorios que respetan el contenido (no apilamos productos como en un supermercado).

### "Moderno" significa para nosotros

- Limpio en estructura, sin ruido decorativo gratuito.
- Animaciones sutiles que dan vida (no decorativas como las del 2010).
- Mobile-first sin compromisos.
- Tipografía expresiva, no genérica.
- Detalles técnicos que sorprenden (microinteracciones, transiciones cuidadas).

### El equilibrio entre los dos

Si solo fuera artesanal: terminaríamos con un sitio que parece de feria de artesanías de los 2000.
Si solo fuera moderno: terminaríamos con otro sitio de moda frío y aburrido.

**La magia está en el cruce**: cuidamos el detalle artesanal (textos manuscritos, fotos con vida) pero lo presentamos con el rigor de un producto digital moderno (grilla impecable, motion fluido, performance).

---

## Concepto guía: "diseño para armar"

El tagline de la marca es "diseño para armar". Lo interpretamos como **metafórico**: armar tu identidad pieza por pieza, construir tu estilo personal.

Aplicado al sitio, esto se traduce en:

- **El contenido se "arma" frente al usuario**: animaciones de entrada sutiles donde los elementos aparecen progresivamente, no de golpe.
- **Las prendas se presentan como piezas componibles**: no como productos aislados, sino como parte de un todo (combinaciones, looks, momentos).
- **El usuario es protagonista del armado**: la web invita a explorar y descubrir, no es un catálogo lineal.

Esto NO significa que cada componente tenga animaciones complejas. Significa que la sensación general del sitio es de **construcción cuidadosa**, no de página estática.

---

## Moodboard y referencias

Cada referencia tiene algo específico que tomar. NO copiamos sitios enteros; tomamos elementos puntuales y los integramos a nuestra propia identidad.

### 1. Lemaire (lemaire.fr)

**Qué tomamos**: el tratamiento editorial de los productos, los fondos que no son blancos puros sino crudos cálidos, las imágenes en contextos reales (no solo silueta sobre fondo).

**Qué descartamos**: la frialdad francesa, el minimalismo extremo, la falta de movimiento.

### 2. Études Studio (etudes-studio.com)

**Qué tomamos**: el equilibrio entre tipografía grande declarativa y fotografía con personalidad. La sensación de revista de arte.

**Qué descartamos**: el monocromatismo, queremos color.

### 3. Sasai (jewelry handcrafted, ganador Awwwards)

**Qué tomamos**: cómo presentan piezas hechas a mano con storytelling, con foco en el proceso, no solo en el producto final.

**Qué descartamos**: si tiene exceso de movimiento, lo simplificamos.

### 4. Aimé Leon Dore (aimeleondore.com)

**Qué tomamos**: la combinación de fotografía lifestyle (productos en contexto real, con personas reales) + tipografía editorial. La sensación de "marca con identidad propia, no genérica".

**Qué descartamos**: la dirección masculina/urbana neoyorquina.

### 5. Story mfg. (storymfg.com)

**Qué tomamos**: la transparencia en el proceso artesanal, mostrar a las personas que hacen las prendas, los textiles naturales en primer plano.

**Qué descartamos**: la sensación a veces caótica, queremos más orden.

### Inspiración para microinteracciones y motion

- **Apple.com**: cuando un producto entra al viewport, hay un fade-in + slide-up sutil. Esto es lo que queremos en nuestras secciones.
- **Linear.app**: las transiciones entre páginas son instantáneas pero no abruptas. Queremos esta sensación de "todo fluye".
- **Stripe.com**: los hovers en cards y botones tienen feedback claro pero discreto. Esto es lo que necesitamos.

> **Nota práctica**: NO vamos a tener un cursor custom, ni intros con loading screen, ni efectos de scroll paralax que mareen. Eso fue tendencia 2018-2022 y hoy se siente pretencioso.

---

## Reglas de uso de la paleta

La paleta ya está definida y aplicada en el theme. Acá documentamos **cuándo usar cada color**.

### Terracota (Primary): `#B4521E` light / `#D9663D` dark

**Es el color principal de la marca.**

Usar para:
- Botones primarios (CTAs principales: "Agregar al carrito", "Iniciar compra", "Crear cuenta").
- Links activos (la página actual en el header).
- Acentos importantes (badges de oferta, precios con descuento destacados).
- Iconos clave (corazón cuando está marcado como favorito).

NO usar para:
- Fondos grandes (sería abrumador).
- Texto largo (cansa visualmente).
- Errores (eso es rojo).

### Mostaza (Secondary): `#D4A04C` light / `#E8B968` dark

**Es el color cómplice del terracota.**

Usar para:
- Acentos visuales en ilustraciones (el SVG de hilo+aguja del sitio en construcción usa terracota, pero podemos hacer variantes en mostaza).
- Estados especiales positivos (badge de "Nuevo", "Destacado").
- Detalles decorativos en secciones (línea divisoria, ícono de sección).

NO usar para:
- CTAs principales (esos son terracota, hay que mantener consistencia).
- Texto sobre fondo claro (poco contraste).

### Denim (Accent): `#2B4865` light / `#5A7AA8` dark

**Es el ancla visual.**

Usar para:
- Headers y elementos estructurales si necesitamos contraste.
- Tipografía de títulos grandes en algunas secciones.
- Hover states de iconos (sutil).

NO usar para:
- Botones primarios (es secundario al terracota).

### Fondos: crudo `#FAF7F2` (light) / carbón `#1A1614` (dark)

**El crudo NO es blanco puro a propósito.** Tiene un tono cálido que evita la sensación clínica que dan los blancos absolutos. Esto es muy importante: refuerza la sensación artesanal.

El carbón en dark mode tampoco es negro puro. Tiene un toque cálido sutil para mantener consistencia.

### Cuando usar dark mode

Dark mode debe estar disponible siempre (ya lo tenés implementado). No es "moderno por moda" — es accesibilidad. Algunas personas tienen sensibilidad a fondos claros.

---

## Tipografía y jerarquía

Ya tenés Fraunces y Inter cargadas. Acá documentamos cuándo usar cada una.

### Fraunces (Editorial / display)

**Es nuestra voz expresiva.**

Usar para:
- Títulos de páginas (`<h1>`).
- Títulos de sección (`<h2>` en home).
- Nombres de productos en el detalle.
- Frases destacadas, citas, tagline.

NO usar para:
- Texto corrido (párrafos largos).
- Botones.
- Inputs de formularios.
- Texto chico.

### Inter (Sans-serif / UI)

**Es nuestra voz funcional.**

Usar para:
- Todo texto de UI: botones, inputs, menús.
- Párrafos de texto corrido.
- Labels, captions, footers.
- Tablas y datos.

NO usar para:
- Títulos importantes donde queremos personalidad.

### Jerarquía de tamaños

```
Hero title (Fraunces, light):      72px desktop / 48px mobile
H1 (Fraunces, light):              48px desktop / 36px mobile
H2 (Fraunces, regular):            36px desktop / 28px mobile
H3 (Fraunces, regular):            28px desktop / 22px mobile
H4 (Inter, semibold):              22px / 20px
H5 (Inter, semibold):              18px
Body large (Inter, regular):       18px
Body (Inter, regular):             16px
Body small (Inter, regular):       14px
Caption (Inter, medium):           12px (uppercase + letter-spacing)
```

**Regla de letter-spacing**:
- Fraunces (títulos): letter-spacing normal o sutil negativo (`-0.01em`).
- Inter en mayúsculas (captions, overlines): letter-spacing positivo (`0.1em` a `0.25em`).
- Inter en caja normal: letter-spacing default.

**Line-height**:
- Títulos: 1.1-1.2 (compactos para impacto).
- Texto corrido: 1.5-1.7 (cómodo para leer).

---

## Sistema de espaciado

Esta es **la decisión que más diferencia un sitio amateur de uno editorial**: el aire entre elementos.

### Escala base: múltiplos de 4

Todo el espaciado del sitio debe ser múltiplo de 4 píxeles. Esto crea consistencia visual.

```
xs:   4px   (espaciado mínimo, entre icono y texto, dentro de chips)
sm:   8px   (entre items relacionados muy cercanos)
md:   16px  (espaciado interno de cards, gap de grilla compacta)
lg:   24px  (espaciado entre elementos de un mismo bloque)
xl:   32px  (espaciado de inputs en forms, gap de grilla normal)
2xl:  48px  (espaciado entre subsecciones)
3xl:  64px  (espaciado entre secciones principales)
4xl:  96px  (espaciado entre bloques grandes de la home)
5xl:  128px (espaciado de respiración generoso, ej. arriba/abajo del hero)
```

### Regla del "respiro editorial"

En secciones de marca (home, "Sobre la marca"), el padding vertical debe ser **generoso**: mínimo 64px (3xl) en mobile, 96-128px (4xl-5xl) en desktop. Esto le da ritmo de revista al sitio.

En catálogo y zonas funcionales, podemos ser más compactos: 32-48px.

### Anchos máximos de contenido

```
Texto largo (legales, blog):       700px max
Contenido principal:                1200px max
Hero full-width:                    sin máximo (ocupa pantalla)
```

---

## Tratamiento de imágenes

**Mantenemos el estilo "natural y real" de las fotos de Dora Galiano.** No retocamos para que parezca un catálogo de Zara.

### Ratios de fotos

- **Productos en catálogo**: ratio `4:5` (vertical, estilo editorial). Más atractivo visualmente que cuadrado.
- **Productos en detalle**: variable según foto, pero respetando ratio nativo. NO recortar a la fuerza.
- **Hero de home**: ratio variable, suele ser `16:9` o `21:9` (horizontal panorámico).
- **Foto "sobre la marca"**: `1:1` o `4:5`.
- **Galería de momentos**: masonry con alturas variables (más rico visualmente que grilla uniforme).
- **Cards de conferencias**: `3:2` (horizontal estándar).

### Tratamiento

- **Sin filtros tipo Instagram**. Las fotos van como son.
- **Compresión inteligente**: usamos WebP y AVIF cuando es posible para reducir peso sin sacrificar calidad.
- **Carga lazy**: solo se descargan cuando entran al viewport.
- **Placeholder**: skeleton gris con animación suave mientras cargan (NO blur del color predominante, eso confunde).

### Cuándo redondear esquinas

- **ProductCard en catálogo**: esquinas levemente redondeadas (`border-radius: 8px`).
- **Foto del hero**: sin redondear (full-bleed).
- **Foto en "Sobre la marca"**: sin redondear (más editorial) o muy sutilmente (4px).
- **Avatares**: redondeados completos (círculos).

---

## Forma y bordes

### Border radius

```
Pequeño (chips, badges):           4px
Medio (cards, modales, inputs):    8px
Grande (drawer del carrito):       12px (solo en la esquina visible)
Imágenes de productos:             8px
Botones:                           8px (mismo que cards, consistencia)
Círculos (avatares, chips de color): 50% (totalmente redondos)
```

**No usamos bordes redondeados grandes** (16-24px) porque se sienten "infantiles" o "amigables al extremo", y rompen con el carácter editorial.

### Sombras

Las sombras deben ser **sutiles, blandas y cálidas**, no duras y oscuras.

```
Sombra base (cards en reposo):     0 1px 3px rgba(0,0,0,0.04)
Sombra al hover (cards):           0 8px 24px rgba(0,0,0,0.08)
Sombra de modales/drawers:         0 16px 48px rgba(0,0,0,0.12)
Sombra del header al scrollear:    0 2px 12px rgba(0,0,0,0.04)
```

**En dark mode**, las sombras son menos visibles (porque el fondo ya es oscuro). Usamos un sutil borde en su lugar:

```
Borde de cards en dark mode:       1px solid rgba(255,255,255,0.06)
```

---

## Microinteracciones y motion

Las animaciones son **sutiles, rápidas y con propósito**. Nunca decorativas.

### Duraciones estándar

```
Instantáneo (hover, tap):          100ms
Rápido (cambios de UI):            200-300ms
Estándar (transiciones entre estados): 400ms
Lento (entradas al viewport):      600-800ms
```

### Easing recomendado

```
Default:           cubic-bezier(0.4, 0, 0.2, 1)   (Material Design "ease")
Salidas:           cubic-bezier(0.4, 0, 1, 1)     (acelera, sale rápido)
Entradas:          cubic-bezier(0, 0, 0.2, 1)     (entra suave)
Énfasis:           cubic-bezier(0.4, 0, 0.6, 1)   (peso curvo)
```

### Patrones de animación

**Hover en botones**:
- Cambio sutil de fondo (10% más oscuro).
- Sin scale (escala se siente "juguetón", no editorial).
- Sin sombra agregada en hover.
- Duración: 200ms.

**Hover en ProductCard**:
- La foto: ligero zoom (`scale: 1.03`) para sentir que el producto "responde".
- La sombra: pasa de base a hover (más profunda).
- Si hay segunda foto: cross-fade a la segunda imagen.
- Duración: 400ms.

**Click en CTA**:
- Pulso sutil: `scale(0.98)` durante el active state.
- Vuelve a normal al soltar.
- Duración: 100ms (debe sentirse instantáneo).

**Apertura de drawer (carrito, filtros)**:
- Slide-in desde el lateral (carrito desde derecha, filtros desde izquierda).
- Backdrop oscuro fade-in detrás.
- Duración: 300ms con easing de entrada.

**Modales**:
- Aparición: scale del 95% al 100% + fade-in del 0 al 100%.
- Backdrop fade-in.
- Duración: 200ms.
- Cierre: rápido (150ms), sale del foco enseguida.

**Toasts**:
- Slide-in desde abajo + fade-in.
- Permanecen 4 segundos.
- Slide-out + fade-out al cerrarse.
- Si hay varios, se apilan verticalmente.

**Entradas al viewport (scroll)**:
- Aplicar a secciones grandes de la home (Sobre la marca, Destacados, Conferencias, Galería).
- Patrón: opacity 0 → 1, translateY(24px) → 0.
- Duración: 600-800ms.
- Trigger: cuando el 20% del elemento entra al viewport.
- Solo se ejecuta UNA VEZ por sección (no loop al scrollear de vuelta).
- En productos del catálogo: animar la entrada de la grilla (stagger de 50ms entre cards).

**Page transitions**:
- Fade muy sutil al cambiar de página (150ms).
- Sin animaciones bruscas tipo slide horizontal.
- Las páginas se sienten "instant" pero con suavidad.

### Lo que NO hacemos (importante)

- **No usar bounce o elastic** (rebotes exagerados): se sienten infantiles.
- **No usar scale en botones al hover**: queda comercial barato.
- **No usar parallax fuerte**: marea y es tendencia vieja.
- **No usar cursor custom**: pretencioso para una marca de moda artesanal.
- **No usar loading screens al entrar al sitio**: penaliza performance percibida.
- **No animar TODO**: las animaciones deben sentirse cuidadas, no constantes.

---

## Componentes con dirección visual aplicada

### Botón primario

- Fondo terracota sólido.
- Texto Inter semibold, blanco, tamaño 14-16px.
- Padding: 12px vertical, 24px horizontal.
- Border-radius: 8px.
- Hover: fondo 10% más oscuro, sin scale.
- Active: scale 0.98.
- Disabled: opacity 0.4, sin hover.

### Botón secundario

- Border 1px terracota, fondo transparente.
- Texto terracota.
- Hover: fondo terracota leve (10%), sin cambio de borde.

### Botón ghost (terciario)

- Sin borde, sin fondo.
- Texto color primary o text.primary.
- Hover: subrayado sutil + fondo levemente teñido.

### ProductCard

- Fondo del color de la página (no añade color propio).
- Esquinas redondeadas 8px.
- Sin borde visible (la imagen es el límite).
- Sombra base muy sutil.
- Hover: zoom de la imagen + sombra más profunda + cross-fade a segunda foto si existe.
- Padding interno: 8px en bordes inferiores para el texto.
- Texto: nombre en Inter regular 14px / precio en Inter semibold 16px / "Últimas unidades" en chip terracota claro.

### Card de sección (en home, en cuenta)

- Fondo crudo en light / variante carbón en dark.
- Esquinas 8px.
- Sombra base.
- Padding interno generoso: 24-32px.

### Inputs de formulario

- Border 1px en text.secondary, sin background propio.
- Esquinas 8px.
- Focus: border 2px terracota + sombra sutil terracota glow.
- Error: border 2px error.main + texto de error debajo en error.main.
- Label flotante (estilo Material), no above-the-field.

### Chips

- Background sutil del color asociado (10% opacidad).
- Texto del color asociado.
- Esquinas 4px (más rectangulares que cards, más editorial).
- Padding compacto: 4px vertical, 12px horizontal.

### Drawers

- Slide-in desde su lado correspondiente.
- Border-radius solo en la esquina visible (12px en la esquina hacia el centro de la página, 0 en la esquina pegada al borde).
- Sombra profunda hacia el centro de la pantalla.
- Backdrop oscuro detrás (40% opacidad).
- Click en backdrop o ESC cierra.

### Modales

- Centrados vertical y horizontal.
- Max-width 480px (mobile-friendly).
- Esquinas 12px.
- Sombra profunda.
- Animación de entrada: scale 95→100% + fade-in.
- Backdrop oscuro detrás.

### Skeletons

- Color: gris muy claro en light, gris muy oscuro en dark.
- Animación: shimmer suave (gradient en movimiento).
- Border-radius: el mismo que el elemento real al que reemplazan.
- Duración del shimmer: ~1.5 segundos.

### Toasts

- Posición: bottom-right en desktop, bottom-center en mobile.
- Max-width 360px.
- Fondo: variante muy oscura del color de la categoría (success/error/info/warning) con texto blanco.
- Esquinas 8px.
- Sombra profunda.
- Animación: slide-in desde abajo.
- Auto-dismiss a los 4 segundos.

---

## Reglas de aplicación general

Para que el sitio se sienta consistente, estas reglas aplican siempre:

1. **Consistencia antes que creatividad ad hoc**. Si tenemos un botón primario, todos los CTAs principales usan ese botón. No inventamos variantes "porque queda mejor en esta sección".

2. **El contenido manda**. La imagen del producto se ve más que la card que la contiene. El texto editorial pesa más que el botón.

3. **Espacio negativo es contenido**. El aire alrededor de las cosas comunica. Si dudás entre apretar elementos o separarlos, separá.

4. **Performance es parte del diseño**. Una animación que tartamudea es peor que no tener animación. Las fotos pesadas que tardan en cargar matan el sitio.

5. **Mobile no es desktop chico**. Pensar las decisiones específicamente para mobile. Algunas cosas que funcionan en desktop (hover) no existen en mobile.

6. **Accesibilidad importa siempre**. Contraste mínimo AA en todos los textos. Los íconos siempre con texto o aria-label.

---

## Lo que vamos a hacer en código (vínculo con la tarea 9)

En la tarea 9 (Sistema de componentes), vamos a codear cada componente listado acá. El documento sirve como **contrato visual**: cuando creemos el `Button`, va a tener exactamente el aspecto que definimos arriba. Cuando creemos el `ProductCard`, lo mismo.

Después de codear los componentes, podemos crear una página oculta `/dev/components` (solo en desarrollo) donde se vean TODOS los componentes en TODAS sus variantes. Es nuestro "Storybook minimalista" sin instalar Storybook.

---

## Pendientes / a iterar con la dueña

- **Validación del moodboard**: cuando avancen los componentes, podemos mostrarle algunas referencias visuales a la dueña para confirmar la dirección.
- **Ajustar tono según feedback de uso**: si después de un mes la dueña dice "se siente muy editorial, quiero algo más cálido", iteramos el theme. El documento se actualiza.
- **Sumar referencias de marcas argentinas** si surgen ejemplos buenos en el futuro.
- **Definir paleta extendida para chips de color** (variantes): el sistema de filtros por color necesita chips que muestren cada color disponible. Esa paleta secundaria se define cuando carguemos los primeros productos.
