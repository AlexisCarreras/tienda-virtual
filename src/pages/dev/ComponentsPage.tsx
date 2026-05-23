import { useState } from 'react';

import {
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Favorite as FavoriteIcon,
  Info as InfoIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Share as ShareIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { Box, Container, InputAdornment, Stack, Typography } from '@mui/material';

import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Input,
  RadioGroup,
  Select,
  Switch,
  Tag,
  Textarea,
  Tooltip,
} from '@/shared/components';

/**
 * Página interna de showcase de componentes del design system.
 *
 * Layout estilo "mini Storybook":
 *  - Menú lateral izquierdo: lista de secciones de componentes.
 *  - Área principal derecha: demos del componente seleccionado con sus variantes.
 *
 * Visible en:
 *  - Localhost (npm run dev)
 *  - Staging (dora-galiano-develop.web.app)
 *
 * Oculta en producción (manejado por el router).
 */

type SectionCategory =
  | 'Fundamentos'
  | 'Acciones'
  | 'Formularios'
  | 'Feedback'
  | 'Estructura'
  | 'Especiales';

type Section = {
  id: string;
  label: string;
  category: SectionCategory;
};

const sections: Section[] = [
  { id: 'intro', label: 'Introducción', category: 'Fundamentos' },
  { id: 'button', label: 'Button', category: 'Acciones' },
  { id: 'icon-button', label: 'IconButton', category: 'Acciones' },
  { id: 'checkbox', label: 'Checkbox', category: 'Formularios' },
  { id: 'input', label: 'Input', category: 'Formularios' },
  { id: 'radio-group', label: 'RadioGroup', category: 'Formularios' },
  { id: 'select', label: 'Select', category: 'Formularios' },
  { id: 'switch', label: 'Switch', category: 'Formularios' },
  { id: 'textarea', label: 'Textarea', category: 'Formularios' },
  { id: 'avatar', label: 'Avatar', category: 'Estructura' },
  { id: 'badge', label: 'Badge', category: 'Estructura' },
  { id: 'chip', label: 'Chip', category: 'Estructura' },
  { id: 'divider', label: 'Divider', category: 'Estructura' },
  { id: 'tag', label: 'Tag', category: 'Estructura' },
  { id: 'tooltip', label: 'Tooltip', category: 'Estructura' },
];

// Orden de las categorías en el sidebar
const categoryOrder: SectionCategory[] = [
  'Fundamentos',
  'Acciones',
  'Formularios',
  'Feedback',
  'Estructura',
  'Especiales',
];

export const ComponentsPage = () => {
  const [selectedId, setSelectedId] = useState<string>('intro');

  const groupedSections = categoryOrder
    .map((category) => ({
      category,
      items: sections.filter((s) => s.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={4}>
        {/* Header */}
        <Stack spacing={1}>
          <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.25em' }}>
            Design System
          </Typography>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 400 }}>
            Componentes
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
            Esta es la biblioteca interna del sitio. Acá se muestran todos los componentes que se
            usan en las páginas, con sus variantes y ejemplos de uso. Sirve para validar el sistema
            visual y como referencia durante el desarrollo.
          </Typography>
        </Stack>

        {/* Layout: sidebar + contenido */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '240px 1fr' },
            gap: { xs: 3, md: 5 },
            alignItems: 'start',
          }}
        >
          {/* Sidebar */}
          <Box
            component="nav"
            sx={{
              position: { md: 'sticky' },
              top: { md: 24 },
              maxHeight: { md: 'calc(100vh - 48px)' },
              overflowY: { md: 'auto' },
              borderRight: { md: 1 },
              borderColor: { md: 'divider' },
              pr: { md: 3 },
            }}
          >
            <Stack spacing={3}>
              {groupedSections.map(({ category, items }) => (
                <Stack key={category} spacing={1}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'text.secondary',
                      letterSpacing: '0.15em',
                      fontSize: '0.7rem',
                    }}
                  >
                    {category}
                  </Typography>
                  <Stack spacing={0.5}>
                    {items.map((item) => (
                      <Box
                        key={item.id}
                        component="button"
                        onClick={() => setSelectedId(item.id)}
                        sx={{
                          textAlign: 'left',
                          background: 'none',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: 1,
                          cursor: 'pointer',
                          color: selectedId === item.id ? 'primary.main' : 'text.primary',
                          backgroundColor:
                            selectedId === item.id ? 'action.selected' : 'transparent',
                          fontFamily: 'inherit',
                          fontSize: '0.875rem',
                          fontWeight: selectedId === item.id ? 500 : 400,
                          transition: 'all 200ms',
                          '&:hover': { backgroundColor: 'action.hover' },
                        }}
                      >
                        {item.label}
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* Contenido principal */}
          <Box component="main">
            {selectedId === 'intro' && <IntroSection />}
            {selectedId === 'button' && <ButtonSection />}
            {selectedId === 'icon-button' && <IconButtonSection />}
            {selectedId === 'checkbox' && <CheckboxSection />}
            {selectedId === 'input' && <InputSection />}
            {selectedId === 'radio-group' && <RadioGroupSection />}
            {selectedId === 'select' && <SelectSection />}
            {selectedId === 'switch' && <SwitchSection />}
            {selectedId === 'textarea' && <TextareaSection />}
            {selectedId === 'badge' && <BadgeSection />}
            {selectedId === 'chip' && <ChipSection />}
            {selectedId === 'tag' && <TagSection />}
            {selectedId === 'avatar' && <AvatarSection />}
            {selectedId === 'divider' && <DividerSection />}
            {selectedId === 'tooltip' && <TooltipSection />}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

/**
 * Wrapper visual para cada demo individual.
 * Sección con título, descripción y área de demo.
 */
type DemoBlockProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const DemoBlock = ({ title, description, children }: DemoBlockProps) => (
  <Stack spacing={2}>
    <Stack spacing={0.5}>
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Stack>
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 1,
        backgroundColor: 'background.paper',
        border: 1,
        borderColor: 'divider',
      }}
    >
      {children}
    </Box>
  </Stack>
);

const IntroSection = () => (
  <Stack spacing={3}>
    <Typography variant="h3" sx={{ fontWeight: 400 }}>
      Bienvenida al design system
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
      Esta página es la biblioteca interna del sitio. Acá vas a poder explorar todos los elementos
      visuales: botones, formularios, ventanas modales, mensajes y más. Cada componente viene con
      ejemplos de las distintas variantes disponibles y una breve explicación de cuándo se usa.
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
      Usá el menú lateral para navegar entre componentes. La página se va actualizando a medida que
      sumamos elementos al sistema.
    </Typography>
  </Stack>
);

const ButtonSection = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Button
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Botón principal del sistema. Se usa para todas las acciones importantes del sitio:
          confirmar compras, enviar formularios, navegar a páginas clave.
        </Typography>
      </Stack>

      {/* Variantes */}
      <DemoBlock
        title="Variantes"
        description="Cada variante tiene un nivel de jerarquía distinto. Usá 'primary' para la acción principal de cada pantalla."
      >
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Stack>
      </DemoBlock>

      {/* Tamaños */}
      <DemoBlock
        title="Tamaños"
        description="Tres tamaños disponibles. 'medium' es el default, 'large' para CTAs destacados."
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </Stack>
      </DemoBlock>

      {/* Con íconos */}
      <DemoBlock
        title="Con íconos"
        description="Los íconos refuerzan visualmente la acción. Pueden ir antes o después del texto."
      >
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <Button startIcon={<ShoppingCartIcon />}>Agregar al carrito</Button>
          <Button variant="secondary" endIcon={<ArrowForwardIcon />}>
            Ver más
          </Button>
          <Button variant="danger" startIcon={<DeleteIcon />}>
            Eliminar
          </Button>
        </Stack>
      </DemoBlock>

      {/* Loading */}
      <DemoBlock
        title="Estado de carga"
        description="Cuando se está procesando una acción, el botón se deshabilita y muestra un spinner. Hacé click en el botón para verlo en acción."
      >
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <Button loading={loading} onClick={handleLoadingDemo}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </Stack>
      </DemoBlock>

      {/* Disabled */}
      <DemoBlock
        title="Deshabilitado"
        description="Botones que no se pueden clickear. Se ven más tenues y no responden al hover."
      >
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <Button disabled>Disabled primary</Button>
          <Button variant="secondary" disabled>
            Disabled secondary
          </Button>
        </Stack>
      </DemoBlock>

      {/* Full width */}
      <DemoBlock
        title="Ancho completo"
        description="Cuando ocupa todo el ancho disponible. Útil para CTAs en modales angostos o checkout."
      >
        <Button fullWidth size="large" startIcon={<AddIcon />}>
          Continuar al pago
        </Button>
      </DemoBlock>

      {/* Guía de uso */}
      <DemoBlock
        title="Cuándo usar cada variante"
        description="Guía rápida para tomar la decisión correcta."
      >
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Primary</strong>: la acción más importante de la pantalla. Solo UNA por sección.
          </Typography>
          <Typography variant="body2">
            <strong>Secondary</strong>: acción alternativa o de menor peso (ej: "Cancelar").
          </Typography>
          <Typography variant="body2">
            <strong>Ghost</strong>: acciones sutiles que no compiten visualmente (ej: links de
            acción).
          </Typography>
          <Typography variant="body2">
            <strong>Danger</strong>: acciones destructivas o irreversibles (ej: eliminar, cancelar
            pedido).
          </Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const IconButtonSection = () => (
  <Stack spacing={5}>
    <Stack spacing={1}>
      <Typography variant="h3" sx={{ fontWeight: 400 }}>
        IconButton
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Botón que contiene solamente un ícono, sin texto visible. Se usa para acciones rápidas donde
        el ícono comunica claramente la acción: cerrar, agregar a favoritos, abrir menú.
      </Typography>
    </Stack>

    <DemoBlock
      title="Variantes"
      description="Default para acciones neutras, primary para acciones destacadas, danger para acciones destructivas."
    >
      <Stack direction="row" spacing={2}>
        <IconButton aria-label="Acción default">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton variant="primary" aria-label="Agregar a favoritos">
          <FavoriteIcon />
        </IconButton>
        <IconButton variant="danger" aria-label="Eliminar">
          <DeleteIcon />
        </IconButton>
      </Stack>
    </DemoBlock>

    <DemoBlock title="Tamaños" description="Tres tamaños disponibles.">
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <IconButton size="small" aria-label="Pequeño">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton size="medium" aria-label="Mediano">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton size="large" aria-label="Grande">
          <ShoppingCartIcon />
        </IconButton>
      </Stack>
    </DemoBlock>

    <DemoBlock title="Deshabilitado" description="Cuando la acción no está disponible.">
      <IconButton disabled aria-label="No disponible">
        <FavoriteIcon />
      </IconButton>
    </DemoBlock>

    <DemoBlock
      title="Accesibilidad obligatoria"
      description="Como el botón no tiene texto visible, es OBLIGATORIO pasar el atributo aria-label que describa la acción. Sin esto, las personas que usan lectores de pantalla no entienden qué hace el botón."
    >
      <Stack spacing={1}>
        <Typography variant="body2" sx={{ color: 'success.main' }}>
          ✓ Correcto: <code>{'<IconButton aria-label="Eliminar producto">'}</code>
        </Typography>
        <Typography variant="body2" sx={{ color: 'error.main' }}>
          ✗ Incorrecto: <code>{'<IconButton>'}</code> (sin aria-label)
        </Typography>
      </Stack>
    </DemoBlock>
  </Stack>
);

const InputSection = () => {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorValue, setErrorValue] = useState('');

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Input
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Campo de entrada de texto para formularios. Soporta varios tipos (email, password,
          número), validación con estado de error, íconos al principio o al final, y mucho más.
        </Typography>
      </Stack>

      <DemoBlock
        title="Básico"
        description="El input más simple, con label flotante. Probá escribir."
      >
        <Box sx={{ maxWidth: 400 }}>
          <Input
            label="Nombre completo"
            value={text}
            onChange={setText}
            placeholder="Ej: María Pérez"
          />
        </Box>
      </DemoBlock>

      <DemoBlock title="Tipos" description="Distintos tipos de input según lo que se pida.">
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="hola@ejemplo.com"
            autoComplete="email"
          />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Ingresá tu clave"
            autoComplete="current-password"
          />
          <Input label="Número" type="number" placeholder="0" />
          <Input label="Buscador" type="search" placeholder="Buscá productos..." />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Con íconos"
        description="Íconos para reforzar visualmente el tipo de campo."
      >
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <Input
            label="Email"
            type="email"
            startIcon={
              <InputAdornment position="start">
                <EmailIcon fontSize="small" />
              </InputAdornment>
            }
            placeholder="hola@ejemplo.com"
          />
          <Input
            label="Contraseña"
            type="password"
            startIcon={
              <InputAdornment position="start">
                <LockIcon fontSize="small" />
              </InputAdornment>
            }
            endIcon={
              <InputAdornment position="end">
                <VisibilityIcon fontSize="small" />
              </InputAdornment>
            }
          />
          <Input
            label="Buscar"
            startIcon={
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            }
            placeholder="Buscá lo que necesites..."
          />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Con texto de ayuda"
        description="Útil para dar pistas sobre el formato esperado."
      >
        <Box sx={{ maxWidth: 400 }}>
          <Input
            label="Teléfono"
            type="tel"
            placeholder="11 1234-5678"
            helperText="Sin el código de área, lo agregamos automáticamente."
          />
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Estado de error"
        description="Cuando la validación falla, el input se pone rojo y muestra el mensaje. Escribí algo menor a 3 caracteres."
      >
        <Box sx={{ maxWidth: 400 }}>
          <Input
            label="Usuario"
            value={errorValue}
            onChange={setErrorValue}
            error={errorValue.length > 0 && errorValue.length < 3}
            errorMessage="El usuario debe tener al menos 3 caracteres"
            placeholder="Mínimo 3 caracteres"
          />
        </Box>
      </DemoBlock>

      <DemoBlock title="Obligatorio" description="Agrega un asterisco al lado del label.">
        <Box sx={{ maxWidth: 400 }}>
          <Input label="Email" type="email" required placeholder="Campo obligatorio" />
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Deshabilitado y solo lectura"
        description="Disabled: no editable y se ve atenuado. ReadOnly: no editable pero visualmente normal."
      >
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <Input label="Deshabilitado" value="No se puede editar" disabled />
          <Input label="Solo lectura" value="Visible pero no editable" readOnly />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Tamaños" description="Dos tamaños disponibles.">
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <Input label="Small" size="small" placeholder="Para inputs compactos" />
          <Input label="Medium (default)" size="medium" placeholder="Tamaño estándar" />
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const TextareaSection = () => {
  const [description, setDescription] = useState('');

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Textarea
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Campo multilinea para textos largos: descripciones, notas, mensajes, observaciones. El
          alto se ajusta automáticamente al contenido.
        </Typography>
      </Stack>

      <DemoBlock
        title="Básico"
        description="4 filas visibles por defecto. Probá escribir varias líneas."
      >
        <Textarea
          label="Descripción"
          value={description}
          onChange={setDescription}
          placeholder="Contanos un poco sobre el producto..."
        />
      </DemoBlock>

      <DemoBlock
        title="Con límite de caracteres"
        description="Limita la cantidad máxima de texto, útil para descripciones cortas."
      >
        <Textarea
          label="Descripción corta"
          minRows={2}
          maxRows={4}
          maxLength={200}
          helperText="Máximo 200 caracteres"
          placeholder="Resumí en pocas palabras..."
        />
      </DemoBlock>

      <DemoBlock
        title="Estado de error"
        description="Mismo comportamiento que Input: cambia color y muestra mensaje."
      >
        <Textarea
          label="Notas"
          error
          errorMessage="Este campo no puede quedar vacío"
          placeholder="Escribí tus notas..."
        />
      </DemoBlock>

      <DemoBlock title="Deshabilitado" description="No se puede editar, se ve atenuado.">
        <Textarea label="Notas" value="Este texto no se puede editar" disabled />
      </DemoBlock>
    </Stack>
  );
};

const CheckboxSection = () => {
  const [accepted, setAccepted] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Checkbox
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Para opciones booleanas en formularios o para seleccionar múltiples items en listas.
        </Typography>
      </Stack>

      <DemoBlock title="Básico" description="Con label simple.">
        <Stack spacing={1.5}>
          <Checkbox
            checked={accepted}
            onChange={setAccepted}
            label="Acepto recibir información sobre nuevos productos"
          />
          <Checkbox
            checked={newsletter}
            onChange={setNewsletter}
            label="Quiero suscribirme al newsletter"
          />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Con texto de ayuda"
        description="Útil para explicar consecuencias o agregar contexto."
      >
        <Checkbox
          label="Producto destacado"
          helperText="Si lo marcás, aparece en la home como producto featured"
        />
      </DemoBlock>

      <DemoBlock title="Estado de error" description="Cuando es obligatorio y no se marcó.">
        <Checkbox
          checked={terms}
          onChange={setTerms}
          label="Acepto los términos y condiciones"
          error={!terms}
          errorMessage="Debés aceptar los términos para continuar"
        />
      </DemoBlock>

      <DemoBlock title="Deshabilitado" description="No editable.">
        <Stack spacing={1}>
          <Checkbox label="Opción deshabilitada (no marcada)" disabled />
          <Checkbox label="Opción deshabilitada (marcada)" disabled checked />
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const RadioGroupSection = () => {
  const [shipping, setShipping] = useState('standard');
  const [size, setSize] = useState('m');

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          RadioGroup
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Para elegir UNA opción entre varias. Cuando hay 2-5 opciones, es mejor que el Select
          porque todas son visibles a la vez.
        </Typography>
      </Stack>

      <DemoBlock
        title="Con descripciones"
        description="Cada opción puede tener descripción adicional. Muy útil para checkout."
      >
        <RadioGroup
          label="Método de envío"
          value={shipping}
          onChange={setShipping}
          options={[
            {
              value: 'standard',
              label: 'Envío estándar',
              description: '$2.500 — entrega en 3 a 5 días hábiles',
            },
            {
              value: 'fast',
              label: 'Envío rápido',
              description: '$4.000 — entrega en 1 a 2 días hábiles',
            },
            {
              value: 'pickup',
              label: 'Retiro en taller',
              description: 'Gratis — coordinás horario con la dueña',
            },
          ]}
        />
      </DemoBlock>

      <DemoBlock title="Horizontal" description="Para opciones cortas que entran en una línea.">
        <RadioGroup
          label="Talle"
          value={size}
          onChange={setSize}
          direction="horizontal"
          options={[
            { value: 'xs', label: 'XS' },
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
            { value: 'xl', label: 'XL' },
          ]}
        />
      </DemoBlock>

      <DemoBlock title="Con opciones deshabilitadas" description="Por ejemplo, talles sin stock.">
        <RadioGroup
          label="Color"
          options={[
            { value: 'natural', label: 'Natural' },
            { value: 'denim', label: 'Denim' },
            { value: 'terracota', label: 'Terracota (sin stock)', disabled: true },
          ]}
        />
      </DemoBlock>

      <DemoBlock title="Estado de error">
        <RadioGroup
          label="Método de pago"
          required
          error
          errorMessage="Tenés que seleccionar un método de pago"
          options={[
            { value: 'mp', label: 'Mercado Pago' },
            { value: 'transferencia', label: 'Transferencia bancaria' },
          ]}
        />
      </DemoBlock>
    </Stack>
  );
};

const SelectSection = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [province, setProvince] = useState('');

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Select
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Para elegir UNA opción de una lista. Más compacto que RadioGroup cuando hay muchas
          opciones (6+). Ideal para ordenar listados, elegir provincia, etc.
        </Typography>
      </Stack>

      <DemoBlock title="Básico" description="Con label flotante.">
        <Box sx={{ maxWidth: 300 }}>
          <Select
            label="Ordenar por"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: 'recent', label: 'Más recientes' },
              { value: 'price-asc', label: 'Precio: menor a mayor' },
              { value: 'price-desc', label: 'Precio: mayor a menor' },
              { value: 'name-asc', label: 'Nombre A-Z' },
            ]}
          />
        </Box>
      </DemoBlock>

      <DemoBlock title="Con placeholder" description="Cuando no hay nada seleccionado todavía.">
        <Box sx={{ maxWidth: 400 }}>
          <Select
            label="Provincia"
            value={province}
            onChange={setProvince}
            placeholder="Elegí tu provincia"
            helperText="Necesaria para calcular el costo de envío"
            options={[
              { value: 'caba', label: 'CABA' },
              { value: 'baires', label: 'Buenos Aires' },
              { value: 'cordoba', label: 'Córdoba' },
              { value: 'santafe', label: 'Santa Fe' },
              { value: 'mendoza', label: 'Mendoza' },
            ]}
          />
        </Box>
      </DemoBlock>

      <DemoBlock title="Estado de error">
        <Box sx={{ maxWidth: 300 }}>
          <Select
            label="Tipo de envío"
            error
            errorMessage="Tenés que seleccionar un tipo de envío"
            required
            options={[
              { value: 'home', label: 'A domicilio' },
              { value: 'pickup', label: 'Retiro' },
            ]}
          />
        </Box>
      </DemoBlock>

      <DemoBlock title="Tamaños">
        <Stack spacing={2} sx={{ maxWidth: 300 }}>
          <Select
            label="Small"
            size="small"
            options={[
              { value: 'a', label: 'Opción A' },
              { value: 'b', label: 'Opción B' },
            ]}
          />
          <Select
            label="Medium (default)"
            options={[
              { value: 'a', label: 'Opción A' },
              { value: 'b', label: 'Opción B' },
            ]}
          />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Deshabilitado">
        <Box sx={{ maxWidth: 300 }}>
          <Select
            label="No disponible"
            disabled
            value="a"
            options={[{ value: 'a', label: 'Opción A' }]}
          />
        </Box>
      </DemoBlock>
    </Stack>
  );
};

const SwitchSection = () => {
  const [featured, setFeatured] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Switch
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Toggle para opciones booleanas. Se siente "instantáneo" — usalo cuando el cambio se aplica
          al momento (dark mode, notificaciones, configuración del admin). Para forms más
          tradicionales, mejor usar Checkbox.
        </Typography>
      </Stack>

      <DemoBlock title="Básico">
        <Switch
          checked={featured}
          onChange={setFeatured}
          label="Producto destacado"
          description="Aparece en la home"
        />
      </DemoBlock>

      <DemoBlock
        title="Label a la izquierda"
        description="Útil cuando va alineado con otros items en una columna (configuración)."
      >
        <Box sx={{ maxWidth: 400 }}>
          <Switch
            checked={notifications}
            onChange={setNotifications}
            label="Notificaciones por email"
            description="Recibí avisos cuando lleguen pedidos"
            labelPosition="start"
          />
        </Box>
      </DemoBlock>

      <DemoBlock title="Tamaños">
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Switch label="Small" size="small" />
          <Switch label="Medium" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Deshabilitado">
        <Stack spacing={1.5}>
          <Switch label="Activado pero bloqueado" checked disabled />
          <Switch label="Desactivado y bloqueado" disabled />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Ejemplo de configuración"
        description="Cómo se vería en una pantalla de settings del admin."
      >
        <Stack spacing={2} sx={{ maxWidth: 480 }}>
          <Switch
            checked={notifications}
            onChange={setNotifications}
            label="Notificaciones por email"
            description="Avisos cuando llegan pedidos nuevos"
            labelPosition="start"
          />
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            label="Modo oscuro"
            description="Tema oscuro para usar de noche"
            labelPosition="start"
          />
          <Switch
            label="Mostrar productos sin stock en el catálogo"
            description="Los clientes ven productos agotados pero no pueden comprarlos"
            labelPosition="start"
          />
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const ChipSection = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['m']);
  const [activeFilters, setActiveFilters] = useState<string[]>(['Talle: M', 'Color: Denim']);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Chip
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Componente interactivo para filtros, selecciones múltiples y tags eliminables. Si
          necesitás algo decorativo (estados, indicadores), usá <strong>Tag</strong>.
        </Typography>
      </Stack>

      <DemoBlock
        title="Filtros activos"
        description="Caso de uso típico: filtros aplicados en el catálogo. Click en la X para eliminar."
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {activeFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              variant="outline"
              onDelete={() => removeFilter(filter)}
            />
          ))}
          {activeFilters.length > 0 && (
            <Chip
              label="Limpiar todo"
              variant="ghost"
              color="primary"
              onClick={() => setActiveFilters([])}
            />
          )}
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Selección múltiple"
        description="Probá clickear los talles. Los que están seleccionados quedan sólidos."
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {['xs', 's', 'm', 'l', 'xl'].map((size) => (
            <Chip
              key={size}
              label={size.toUpperCase()}
              variant={selectedSizes.includes(size) ? 'solid' : 'outline'}
              color={selectedSizes.includes(size) ? 'primary' : 'default'}
              onClick={() => toggleSize(size)}
            />
          ))}
        </Stack>
      </DemoBlock>

      <DemoBlock title="Variantes">
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Chip label="Solid" variant="solid" color="primary" />
          <Chip label="Outline" variant="outline" color="primary" />
          <Chip label="Ghost" variant="ghost" color="primary" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Colores">
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Chip label="Default" color="default" />
          <Chip label="Primary" color="primary" />
          <Chip label="Secondary" color="secondary" />
          <Chip label="Success" color="success" />
          <Chip label="Warning" color="warning" />
          <Chip label="Error" color="error" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Tamaños">
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Chip label="Small" size="small" />
          <Chip label="Medium" size="medium" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Deshabilitado">
        <Stack direction="row" spacing={1}>
          <Chip label="No clickeable" disabled />
          <Chip label="Con delete bloqueado" onDelete={() => {}} disabled />
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const TagSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Tag
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Etiqueta estática (no interactiva) para mostrar estados, categorías o indicadores. Si
          necesitás algo clickeable (filtros, selecciones), usá <strong>Chip</strong>.
        </Typography>
      </Stack>

      <DemoBlock
        title="Estados de pedidos"
        description="Cada estado de una orden usa un color distinto para que se reconozca al vistazo."
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Tag
            label="Pendiente de pago"
            color="warning"
            icon={<WarningIcon fontSize="inherit" />}
          />
          <Tag label="Pagado" color="info" icon={<CheckCircleIcon fontSize="inherit" />} />
          <Tag label="En preparación" color="primary" icon={<InventoryIcon fontSize="inherit" />} />
          <Tag label="Enviado" color="secondary" icon={<LocalShippingIcon fontSize="inherit" />} />
          <Tag label="Entregado" color="success" icon={<CheckCircleIcon fontSize="inherit" />} />
          <Tag label="Cancelado" color="error" />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Indicadores en productos"
        description="Para mostrar info rápida sobre un producto."
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Tag label="Últimas unidades" color="warning" size="small" />
          <Tag label="Nuevo" color="primary" size="small" />
          <Tag label="Destacado" color="secondary" size="small" />
          <Tag label="-20%" color="error" variant="solid" size="small" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Variantes">
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Tag label="Subtle" color="primary" variant="subtle" />
          <Tag label="Solid" color="primary" variant="solid" />
          <Tag label="Outline" color="primary" variant="outline" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Todos los colores">
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Tag label="Default" color="default" />
          <Tag label="Primary" color="primary" />
          <Tag label="Secondary" color="secondary" />
          <Tag label="Success" color="success" />
          <Tag label="Warning" color="warning" />
          <Tag label="Error" color="error" />
          <Tag label="Info" color="info" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Tamaños">
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tag label="Small" color="primary" size="small" />
          <Tag label="Medium" color="primary" size="medium" />
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const BadgeSection = () => {
  const [cartCount, setCartCount] = useState(3);

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Badge
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Indicador chiquito que aparece <strong>sobre</strong> otro elemento (ícono, avatar). Se
          usa para contadores (carrito, notificaciones) o puntitos de "hay algo nuevo".
        </Typography>
      </Stack>

      <DemoBlock
        title="Contador del carrito"
        description="Caso clásico. Probá los botones de +/- para ver cómo cambia el contador."
      >
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Badge content={cartCount} color="primary" invisible={cartCount === 0}>
            <IconButton aria-label="Carrito" size="large">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setCartCount(Math.max(0, cartCount - 1))}
            >
              -
            </Button>
            <Button size="small" variant="secondary" onClick={() => setCartCount(cartCount + 1)}>
              +
            </Button>
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Puntito (sin contenido)"
        description="Cuando solo querés indicar 'hay algo' sin mostrar el número exacto. Útil para notificaciones."
      >
        <Stack direction="row" spacing={3}>
          <Badge dot color="error">
            <IconButton aria-label="Notificaciones">
              <NotificationsIcon />
            </IconButton>
          </Badge>
          <Badge dot color="success">
            <IconButton aria-label="Email">
              <EmailIcon />
            </IconButton>
          </Badge>
        </Stack>
      </DemoBlock>

      <DemoBlock title="Colores">
        <Stack direction="row" spacing={3}>
          <Badge content="3" color="primary">
            <IconButton aria-label="Primary">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
          <Badge content="3" color="secondary">
            <IconButton aria-label="Secondary">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
          <Badge content="3" color="success">
            <IconButton aria-label="Success">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
          <Badge content="3" color="warning">
            <IconButton aria-label="Warning">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
          <Badge content="3" color="error">
            <IconButton aria-label="Error">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Número máximo"
        description="Cuando el contador es muy grande, se muestra '99+' (configurable)."
      >
        <Stack direction="row" spacing={3}>
          <Badge content={99} color="primary">
            <IconButton aria-label="99">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
          <Badge content={100} color="primary">
            <IconButton aria-label="100+">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
          <Badge content={1500} max={999} color="primary">
            <IconButton aria-label="999+">
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Cuándo usar Badge vs Tag vs Chip"
        description="Resumen rápido para no confundirse."
      >
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Badge</strong>: indicador chiquito sobre otro elemento (ícono, avatar). Casi
            siempre es un número o puntito.
          </Typography>
          <Typography variant="body2">
            <strong>Tag</strong>: etiqueta independiente que muestra info estática (estados,
            categorías, indicadores). No interactivo.
          </Typography>
          <Typography variant="body2">
            <strong>Chip</strong>: similar a Tag pero interactivo. Para filtros con X eliminable,
            selecciones de talles, etc.
          </Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const DividerSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Divider
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Línea divisoria para separar visualmente contenido. Puede ser horizontal o vertical, con o
          sin texto en el medio.
        </Typography>
      </Stack>

      <DemoBlock title="Horizontal básico" description="El uso más común: separar secciones.">
        <Box>
          <Typography variant="body2">Sección de arriba</Typography>
          <Divider />
          <Typography variant="body2">Sección de abajo</Typography>
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Con texto en el medio"
        description="Patrón típico de login: 'o continuá con email'."
      >
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <Button fullWidth variant="secondary">
            Continuar con Google
          </Button>
          <Divider>o</Divider>
          <Button fullWidth>Continuar con email</Button>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Variante dashed"
        description="Útil para secciones más sutiles o decorativas."
      >
        <Box>
          <Typography variant="body2">Texto antes</Typography>
          <Divider variant="dashed" />
          <Typography variant="body2">Texto después</Typography>
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Espaciado configurable"
        description="Distintos niveles de aire alrededor de la línea."
      >
        <Box>
          <Typography variant="body2">Texto</Typography>
          <Divider spacing="none" />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            spacing="none"
          </Typography>
          <Divider spacing="small" />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            spacing="small"
          </Typography>
          <Divider spacing="medium" />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            spacing="medium" (default)
          </Typography>
          <Divider spacing="large" />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            spacing="large"
          </Typography>
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Vertical"
        description="Para separar elementos en una fila (botones, items de un menú)."
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', height: 40 }}>
          <Typography variant="body2">Item 1</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Item 2</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Item 3</Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const TooltipSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Tooltip
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Info contextual que aparece al hacer hover sobre un elemento. Útil para íconos sin texto,
          aclaraciones rápidas, o tips. NO usar para info crítica.
        </Typography>
      </Stack>

      <DemoBlock title="Básico" description="Hovereá sobre los íconos para ver el tooltip.">
        <Stack direction="row" spacing={2}>
          <Tooltip title="Agregar a favoritos">
            <IconButton aria-label="Favoritos">
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Compartir producto">
            <IconButton aria-label="Compartir">
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Más información">
            <IconButton aria-label="Info">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Posiciones"
        description="Default es 'top'. Cambiá según el espacio disponible."
      >
        <Stack
          direction="row"
          spacing={4}
          sx={{
            justifyContent: 'center',
            py: 4,
            flexWrap: 'wrap',
          }}
        >
          <Tooltip title="Tooltip arriba" placement="top">
            <Button variant="secondary" size="small">
              Top
            </Button>
          </Tooltip>
          <Tooltip title="Tooltip abajo" placement="bottom">
            <Button variant="secondary" size="small">
              Bottom
            </Button>
          </Tooltip>
          <Tooltip title="Tooltip a la izquierda" placement="left">
            <Button variant="secondary" size="small">
              Left
            </Button>
          </Tooltip>
          <Tooltip title="Tooltip a la derecha" placement="right">
            <Button variant="secondary" size="small">
              Right
            </Button>
          </Tooltip>
        </Stack>
      </DemoBlock>

      <DemoBlock title="Con flecha" description="Apunta visualmente al elemento de referencia.">
        <Stack direction="row" spacing={2}>
          <Tooltip title="Con flecha apuntando" arrow>
            <Button variant="secondary">Hovereá acá</Button>
          </Tooltip>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Delay configurable"
        description="Cuánto tarda en aparecer (enterDelay) o desaparecer (leaveDelay)."
      >
        <Stack direction="row" spacing={2}>
          <Tooltip title="Aparece al toque" enterDelay={0}>
            <Button variant="secondary" size="small">
              Inmediato
            </Button>
          </Tooltip>
          <Tooltip title="Aparece después de 1 segundo" enterDelay={1000}>
            <Button variant="secondary" size="small">
              1 segundo
            </Button>
          </Tooltip>
          <Tooltip title="Tarda en irse" leaveDelay={1500}>
            <Button variant="secondary" size="small">
              Lento en irse
            </Button>
          </Tooltip>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Cuándo NO usar Tooltip"
        description="Reglas importantes para no romper la accesibilidad."
      >
        <Stack spacing={1.5}>
          <Typography variant="body2">
            ✗ Para info crítica: el usuario puede no descubrir el hover.
          </Typography>
          <Typography variant="body2">
            ✗ En mobile: no hay hover, mejor hacer la info visible.
          </Typography>
          <Typography variant="body2">✗ Para acciones: un tooltip no se puede clickear.</Typography>
          <Typography variant="body2">✓ Para complementar un ícono sin texto.</Typography>
          <Typography variant="body2">✓ Para mostrar texto truncado completo.</Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const AvatarSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Avatar
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Imagen redonda o cuadrada para representar a una persona o entidad. Si no hay foto,
          muestra automáticamente las iniciales con un color derivado del nombre.
        </Typography>
      </Stack>

      <DemoBlock
        title="Con iniciales"
        description="Sin foto. El color se genera automáticamente desde el nombre (siempre el mismo color para la misma persona)."
      >
        <Stack direction="row" spacing={2}>
          <Avatar name="Dora Galiano" />
          <Avatar name="María Pérez" />
          <Avatar name="Juan Carlos Rodriguez" />
          <Avatar name="Alexis Carreras" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Tamaños" description="5 tamaños desde xsmall (24px) hasta xlarge (80px).">
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar name="Dora Galiano" size="xsmall" />
          <Avatar name="Dora Galiano" size="small" />
          <Avatar name="Dora Galiano" size="medium" />
          <Avatar name="Dora Galiano" size="large" />
          <Avatar name="Dora Galiano" size="xlarge" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Formas" description="Circular (default), cuadrado redondeado o cuadrado.">
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar name="Dora Galiano" shape="circle" size="large" />
          <Avatar name="Dora Galiano" shape="rounded" size="large" />
          <Avatar name="Dora Galiano" shape="square" size="large" />
        </Stack>
      </DemoBlock>

      <DemoBlock title="Sin nombre" description="Cuando no sabemos quién es. Genérico.">
        <Stack direction="row" spacing={2}>
          <Avatar size="small" />
          <Avatar size="medium" />
          <Avatar size="large" />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Clickeable"
        description="Si pasás onClick, el avatar se vuelve interactivo (cursor pointer + hover)."
      >
        <Stack direction="row" spacing={2}>
          <Avatar name="Dora Galiano" size="large" onClick={() => alert('Click en Dora')} />
          <Tooltip title="Ir al perfil">
            <Avatar name="María Pérez" size="large" onClick={() => alert('Click en María')} />
          </Tooltip>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Combinado con Badge"
        description="Útil para indicar estado en avatares (online, nuevo, etc)."
      >
        <Stack direction="row" spacing={3}>
          <Badge dot color="success">
            <Avatar name="Dora Galiano" size="large" />
          </Badge>
          <Badge content={3} color="error">
            <Avatar name="María Pérez" size="large" />
          </Badge>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};
