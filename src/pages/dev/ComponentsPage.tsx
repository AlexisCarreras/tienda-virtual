import { useState } from 'react';

import {
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Favorite as FavoriteIcon,
  FilterList as FilterListIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  Inventory as InventoryIcon,
  LocalShipping as LocalShippingIcon,
  Lock as LockIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Share as ShareIcon,
  ShoppingBag as ShoppingBagIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { Box, Container, InputAdornment, Stack, Typography } from '@mui/material';

import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Chip,
  Coachmark,
  Divider,
  Drawer,
  EmptyState,
  generateWelcomeThreads,
  IconButton,
  Input,
  Modal,
  ProductCard,
  RadioGroup,
  Select,
  Skeleton,
  Spinner,
  Switch,
  Tag,
  Textarea,
  toast,
  Tooltip,
  WelcomeAnimation,
  type WelcomeAnimationThread,
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
  { id: 'card', label: 'Card', category: 'Estructura' },
  { id: 'product-card', label: 'ProductCard', category: 'Estructura' },
  { id: 'skeleton', label: 'Skeleton', category: 'Feedback' },
  { id: 'spinner', label: 'Spinner', category: 'Feedback' },
  { id: 'alert', label: 'Alert', category: 'Feedback' },
  { id: 'toast', label: 'Toast', category: 'Feedback' },
  { id: 'drawer', label: 'Drawer', category: 'Estructura' },
  { id: 'modal', label: 'Modal', category: 'Estructura' },
  { id: 'breadcrumb', label: 'Breadcrumb', category: 'Estructura' },
  { id: 'coachmark', label: 'Coachmark', category: 'Especiales' },
  { id: 'empty-state', label: 'EmptyState', category: 'Especiales' },
  { id: 'welcome-animation', label: 'WelcomeAnimation', category: 'Especiales' },
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
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 0 } }}>
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
              // En desktop: sticky para que se quede pegada al top mientras scrolleás,
              // pero SIN maxHeight ni overflow propio — scrollea junto con la página.
              position: { md: 'sticky' },
              top: { md: 24 },
              alignSelf: { md: 'start' },
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
            {selectedId === 'card' && <CardSection />}
            {selectedId === 'product-card' && <ProductCardSection />}
            {selectedId === 'skeleton' && <SkeletonSection />}
            {selectedId === 'spinner' && <SpinnerSection />}
            {selectedId === 'alert' && <AlertSection />}
            {selectedId === 'toast' && <ToastSection />}
            {selectedId === 'drawer' && <DrawerSection />}
            {selectedId === 'modal' && <ModalSection />}
            {selectedId === 'breadcrumb' && <BreadcrumbSection />}
            {selectedId === 'coachmark' && <CoachmarkSection />}
            {selectedId === 'empty-state' && <EmptyStateSection />}
            {selectedId === 'welcome-animation' && <WelcomeAnimationSection />}
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

const CardSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Card
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Contenedor genérico con borde, sombra o ambos. Base sobre la que se construyen otros cards
          más específicos (ProductCard, cards de sección, etc).
        </Typography>
      </Stack>

      <DemoBlock
        title="Variantes"
        description="Tres niveles de prominencia visual según necesites."
      >
        <Stack spacing={2}>
          <Card variant="elevated">
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Elevated (default)
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Con sombra sutil. Para cards que destacan sobre el fondo.
            </Typography>
          </Card>
          <Card variant="outlined">
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Outlined
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Con borde sin sombra. Más sutil, ideal para listados densos.
            </Typography>
          </Card>
          <Card variant="flat">
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Flat
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sin borde ni sombra. Solo background distinto. Para secciones contenedoras.
            </Typography>
          </Card>
        </Stack>
      </DemoBlock>

      <DemoBlock title="Padding configurable" description="Distintos niveles de espacio interno.">
        <Stack spacing={2}>
          <Card padding="small" variant="outlined">
            <Typography variant="body2">padding="small"</Typography>
          </Card>
          <Card padding="medium" variant="outlined">
            <Typography variant="body2">padding="medium" (default)</Typography>
          </Card>
          <Card padding="large" variant="outlined">
            <Typography variant="body2">padding="large"</Typography>
          </Card>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Clickeable"
        description="Cuando pasás onClick, el card se vuelve interactivo: cursor pointer + hover con elevación."
      >
        <Card onClick={() => alert('Click en card')}>
          <Stack spacing={1}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Hovereame y clickeame
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Útil para cards que llevan a una página de detalle (productos, conferencias, etc).
            </Typography>
          </Stack>
        </Card>
      </DemoBlock>

      <DemoBlock
        title="Sin padding (para imágenes)"
        description="Cuando querés que la imagen llene el card de borde a borde, sacá el padding."
      >
        <Card padding="none" variant="outlined" sx={{ maxWidth: 320, overflow: 'hidden' }}>
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundColor: 'primary.main',
              opacity: 0.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.primary' }}>
              [Imagen]
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Título del item
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Descripción debajo.
            </Typography>
          </Box>
        </Card>
      </DemoBlock>
    </Stack>
  );
};

const ProductCardSection = () => {
  const [favorites, setFavorites] = useState<string[]>(['prod-2']);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  // URLs de placeholder. Usamos picsum.photos que sirve imágenes de stock
  // para que la demo se vea con fotos reales (ratio 4:5 = 400x500).
  const placeholders = {
    a: 'https://picsum.photos/seed/dora1/400/500',
    aAlt: 'https://picsum.photos/seed/dora1alt/400/500',
    b: 'https://picsum.photos/seed/dora2/400/500',
    c: 'https://picsum.photos/seed/dora3/400/500',
    d: 'https://picsum.photos/seed/dora4/400/500',
  };

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          ProductCard
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Card específico para mostrar productos en el catálogo y home. Incluye foto principal con
          foto secundaria al hover, badge de favoritos, indicadores de stock/descuento, y precio con
          descuento opcional.
        </Typography>
      </Stack>

      <DemoBlock
        title="Básico"
        description="El caso más común: producto con foto, nombre, categoría y precio. Hovereá la card para ver el zoom sutil."
      >
        <Box sx={{ maxWidth: 280 }}>
          <ProductCard
            id="prod-1"
            name="Vestido denim reciclado con bordados artesanales"
            category="Vestidos"
            price={25000}
            imageUrl={placeholders.a}
            isFavorite={favorites.includes('prod-1')}
            onFavoriteClick={() => toggleFavorite('prod-1')}
            onClick={() => alert('Click en producto')}
          />
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Con foto secundaria al hover"
        description="Cuando pasás imageHoverUrl, al hover hace cross-fade a la segunda foto."
      >
        <Box sx={{ maxWidth: 280 }}>
          <ProductCard
            id="prod-1b"
            name="Campera denim con bordado de soles"
            category="Camperas y abrigos"
            price={42000}
            imageUrl={placeholders.a}
            imageHoverUrl={placeholders.aAlt}
            onFavoriteClick={() => toggleFavorite('prod-1b')}
            isFavorite={favorites.includes('prod-1b')}
            onClick={() => alert('Click')}
          />
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Con descuento"
        description="Cuando hay previousPrice mayor al actual, se muestra tachado al lado del precio. Aparece un tag con el % de descuento."
      >
        <Box sx={{ maxWidth: 280 }}>
          <ProductCard
            id="prod-2"
            name="Top con bordados a mano"
            category="Tops y blusas"
            price={18000}
            previousPrice={24000}
            imageUrl={placeholders.b}
            isFavorite={favorites.includes('prod-2')}
            onFavoriteClick={() => toggleFavorite('prod-2')}
            onClick={() => alert('Click')}
          />
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Pocas unidades"
        description="Cuando stock < 3, aparece el tag 'Últimas unidades'."
      >
        <Box sx={{ maxWidth: 280 }}>
          <ProductCard
            id="prod-3"
            name="Vinchas bordadas edición especial"
            category="Accesorios"
            price={8500}
            stock={2}
            imageUrl={placeholders.c}
            onFavoriteClick={() => toggleFavorite('prod-3')}
            isFavorite={favorites.includes('prod-3')}
            onClick={() => alert('Click')}
          />
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Producto nuevo"
        description="Cuando isNew es true, aparece el tag 'Nuevo' en color primary."
      >
        <Box sx={{ maxWidth: 280 }}>
          <ProductCard
            id="prod-4"
            name="Pantalón denim wide leg"
            category="Pantalones y shorts"
            price={32000}
            isNew
            imageUrl={placeholders.d}
            onFavoriteClick={() => toggleFavorite('prod-4')}
            isFavorite={favorites.includes('prod-4')}
            onClick={() => alert('Click')}
          />
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Sin stock"
        description="Cuando outOfStock es true, la card aparece atenuada y muestra el tag 'Sin stock'."
      >
        <Box sx={{ maxWidth: 280 }}>
          <ProductCard
            id="prod-5"
            name="Saco denim oversized"
            category="Camperas y abrigos"
            price={48000}
            outOfStock
            imageUrl={placeholders.a}
            onFavoriteClick={() => toggleFavorite('prod-5')}
            isFavorite={favorites.includes('prod-5')}
          />
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Grilla del catálogo"
        description="Así se vería en el catálogo real, en grilla de 3 columnas."
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          <ProductCard
            id="grid-1"
            name="Vestido denim reciclado con bordados"
            category="Vestidos"
            price={25000}
            imageUrl={placeholders.a}
            isFavorite={favorites.includes('grid-1')}
            onFavoriteClick={() => toggleFavorite('grid-1')}
            onClick={() => alert('Click')}
          />
          <ProductCard
            id="grid-2"
            name="Top bordado a mano"
            category="Tops y blusas"
            price={18000}
            previousPrice={24000}
            imageUrl={placeholders.b}
            isFavorite={favorites.includes('grid-2')}
            onFavoriteClick={() => toggleFavorite('grid-2')}
            onClick={() => alert('Click')}
          />
          <ProductCard
            id="grid-3"
            name="Vinchas bordadas edición especial"
            category="Accesorios"
            price={8500}
            stock={2}
            imageUrl={placeholders.c}
            isFavorite={favorites.includes('grid-3')}
            onFavoriteClick={() => toggleFavorite('grid-3')}
            onClick={() => alert('Click')}
          />
          <ProductCard
            id="grid-4"
            name="Pantalón denim wide leg"
            category="Pantalones"
            price={32000}
            isNew
            imageUrl={placeholders.d}
            isFavorite={favorites.includes('grid-4')}
            onFavoriteClick={() => toggleFavorite('grid-4')}
            onClick={() => alert('Click')}
          />
          <ProductCard
            id="grid-5"
            name="Saco denim oversized"
            category="Camperas y abrigos"
            price={48000}
            outOfStock
            imageUrl={placeholders.a}
          />
          <ProductCard
            id="grid-6"
            name="Falda denim con bordados"
            category="Vestidos"
            price={22000}
            imageUrl={placeholders.b}
            isFavorite={favorites.includes('grid-6')}
            onFavoriteClick={() => toggleFavorite('grid-6')}
            onClick={() => alert('Click')}
          />
        </Box>
      </DemoBlock>
    </Stack>
  );
};

const SkeletonSection = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Skeleton
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Placeholder animado que se muestra mientras un contenido está cargando. Es preferible al
          spinner cuando podés representar la estructura del contenido que viene.
        </Typography>
      </Stack>

      <DemoBlock
        title="Variantes"
        description="Cuatro formas según el contenido al que reemplazan."
      >
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              text
            </Typography>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="90%" />
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              rectangular
            </Typography>
            <Skeleton variant="rectangular" width="100%" height={120} />
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              rounded (esquinas redondeadas)
            </Typography>
            <Skeleton variant="rounded" width="100%" height={120} />
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              circular
            </Typography>
            <Skeleton variant="circular" width={64} height={64} />
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Animaciones"
        description="Pulse (default) es más sutil. Wave hace un brillo de izquierda a derecha. None es estático."
      >
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              pulse (default)
            </Typography>
            <Skeleton variant="rounded" animation="pulse" width="100%" height={40} />
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              wave
            </Typography>
            <Skeleton variant="rounded" animation="wave" width="100%" height={40} />
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              none (sin animación)
            </Typography>
            <Skeleton variant="rounded" animation="none" width="100%" height={40} />
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Skeleton de ProductCard"
        description="Caso real: cómo se vería el catálogo mientras carga. Idealmente la forma del skeleton es igual a la del contenido final."
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {[1, 2, 3].map((i) => (
            <Stack key={i} spacing={1.5}>
              <Skeleton
                variant="rounded"
                width="100%"
                height="100%"
                sx={{ aspectRatio: '4 / 5' }}
              />
              <Stack spacing={0.5} sx={{ paddingX: 0.5 }}>
                <Skeleton variant="text" width="40%" height={14} />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="35%" />
              </Stack>
            </Stack>
          ))}
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Skeleton de detalle de producto"
        description="Mientras carga, mostramos la estructura: imagen grande, info al lado. Así se ve aproximadamente en la página real (ancho completo del contenido)."
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
            gap: 4,
            maxWidth: 900,
          }}
        >
          <Skeleton variant="rounded" width="100%" height="100%" sx={{ aspectRatio: '1 / 1' }} />
          <Stack spacing={2}>
            <Skeleton variant="text" width="30%" height={14} />
            <Skeleton variant="text" width="80%" height={32} />
            <Skeleton variant="text" width="50%" height={28} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="60%" />
            <Stack direction="row" spacing={1}>
              <Skeleton variant="rounded" width={48} height={36} />
              <Skeleton variant="rounded" width={48} height={36} />
              <Skeleton variant="rounded" width={48} height={36} />
              <Skeleton variant="rounded" width={48} height={36} />
            </Stack>
            <Skeleton variant="rounded" width="100%" height={48} />
          </Stack>
        </Box>
      </DemoBlock>

      <DemoBlock
        title="Toggle de loading"
        description="Probá el botón para alternar entre estado cargando y cargado."
      >
        <Stack spacing={2}>
          <Button size="small" variant="secondary" onClick={() => setLoading((p) => !p)}>
            {loading ? 'Ya cargó' : 'Mostrar loading'}
          </Button>
          <Card variant="outlined">
            {loading ? (
              <Stack spacing={1}>
                <Skeleton variant="text" width="70%" height={28} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="50%" />
              </Stack>
            ) : (
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Contenido cargado
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Acá aparece el contenido real cuando terminó de cargar. La transición de skeleton
                  a contenido se siente natural si las formas son parecidas.
                </Typography>
              </Stack>
            )}
          </Card>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const SpinnerSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Spinner
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Indicador circular animado para estados de carga puntuales. Para listas y cards, mejor
          usar <strong>Skeleton</strong>.
        </Typography>
      </Stack>

      <DemoBlock title="Tamaños" description="Cuatro tamaños según el contexto.">
        <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Spinner size="xsmall" />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              xsmall
            </Typography>
          </Stack>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Spinner size="small" />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              small
            </Typography>
          </Stack>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Spinner size="medium" />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              medium (default)
            </Typography>
          </Stack>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Spinner size="large" />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              large
            </Typography>
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock title="Colores">
        <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
          <Spinner color="primary" />
          <Spinner color="secondary" />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Centrado en un contenedor"
        description="Cuando pasás centered, ocupa todo el ancho disponible y centra el spinner."
      >
        <Card variant="outlined" padding="none">
          <Spinner centered size="large" />
        </Card>
      </DemoBlock>

      <DemoBlock
        title="Cuándo usar Spinner vs Skeleton"
        description="Guía rápida para elegir bien."
      >
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Spinner</strong>: dentro de botones (loading), áreas chicas sin estructura
            clara, operaciones puntuales muy rápidas.
          </Typography>
          <Typography variant="body2">
            <strong>Skeleton</strong>: listados, grillas de productos, cards de info, cualquier cosa
            donde se pueda anticipar la estructura del contenido que viene.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            En general el skeleton se ve más profesional y mejora la performance percibida.
          </Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const AlertSection = () => {
  const [showDismissable, setShowDismissable] = useState(true);

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Alert
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Mensaje contextual inline. Ocupa espacio en el layout (no es flotante). Para mensajes de
          feedback rápido después de una acción, usá <strong>Toast</strong>.
        </Typography>
      </Stack>

      <DemoBlock
        title="Severidades"
        description="Cada severidad transmite un tipo de mensaje con su color e ícono."
      >
        <Stack spacing={2}>
          <Alert severity="success">Tu pedido fue confirmado correctamente.</Alert>
          <Alert severity="info">Estás comprando como invitado.</Alert>
          <Alert severity="warning">Quedan pocas unidades de este producto.</Alert>
          <Alert severity="error">No pudimos procesar el pago. Probá de nuevo.</Alert>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Con título"
        description="El título destaca lo más importante. Útil para alerts más largos."
      >
        <Stack spacing={2}>
          <Alert severity="warning" title="Atención">
            Si cerrás esta página, vas a perder los cambios que hiciste en el producto.
          </Alert>
          <Alert severity="error" title="No se pudo guardar">
            Hubo un problema con la conexión. Verificá tu internet e intentalo de nuevo.
          </Alert>
        </Stack>
      </DemoBlock>

      <DemoBlock title="Variantes" description="Tres niveles de prominencia visual.">
        <Stack spacing={2}>
          <Alert severity="info" variant="subtle">
            Variante subtle (default): fondo suave.
          </Alert>
          <Alert severity="info" variant="solid">
            Variante solid: fondo del color completo. Usar con moderación.
          </Alert>
          <Alert severity="info" variant="outline">
            Variante outline: solo borde, sin fondo de color.
          </Alert>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Con acción"
        description="Agrega un botón o link dentro del alert para que el usuario haga algo al respecto."
      >
        <Alert
          severity="info"
          title="¿Tenés cuenta?"
          action={
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="secondary">
                Iniciar sesión
              </Button>
              <Button size="small" variant="ghost">
                Seguir como invitado
              </Button>
            </Stack>
          }
        >
          Iniciá sesión para autocompletar tus datos y guardar el historial del pedido.
        </Alert>
      </DemoBlock>

      <DemoBlock
        title="Cerrable"
        description="Cuando pasás closable, aparece una X para que el usuario lo cierre."
      >
        <Stack spacing={2}>
          {showDismissable && (
            <Alert severity="success" closable onClose={() => setShowDismissable(false)}>
              Tu carrito se guardó automáticamente.
            </Alert>
          )}
          {!showDismissable && (
            <Button size="small" variant="secondary" onClick={() => setShowDismissable(true)}>
              Mostrar de nuevo
            </Button>
          )}
        </Stack>
      </DemoBlock>

      <DemoBlock title="Sin ícono" description="Para alerts más sutiles.">
        <Alert severity="info" hideIcon>
          Este es un alert sin ícono. Útil cuando el contexto ya está claro.
        </Alert>
      </DemoBlock>
    </Stack>
  );
};

const ToastSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Toast
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Notificación flotante para feedback rápido después de una acción. Aparece en la esquina
          inferior derecha (centrado abajo en mobile) y se cierra solo después de unos segundos.
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          Clickeá los botones de abajo para disparar toasts. Aparecen en la esquina inferior derecha
          de la pantalla.
        </Typography>
      </Stack>

      <DemoBlock title="Severidades">
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button
            size="small"
            variant="secondary"
            onClick={() => toast.success('Producto agregado al carrito')}
          >
            Success
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => toast.info('Tu sesión expira en 5 minutos')}
          >
            Info
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => toast.warning('Pocas unidades disponibles')}
          >
            Warning
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => toast.error('No se pudo procesar el pago')}
          >
            Error
          </Button>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Con título"
        description="Útil para destacar lo importante cuando el mensaje es largo."
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button
            size="small"
            variant="secondary"
            onClick={() =>
              toast.success('El producto se guardó correctamente en el catálogo.', {
                title: 'Guardado',
              })
            }
          >
            Toast con título
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() =>
              toast.error('Verificá los datos de la tarjeta o intentá con otro método de pago.', {
                title: 'Pago rechazado',
              })
            }
          >
            Error con título
          </Button>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Múltiples al mismo tiempo"
        description="Los toasts se apilan verticalmente. Probá disparar varios seguidos."
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button
            size="small"
            variant="secondary"
            onClick={() => {
              toast.info('Primer toast');
              setTimeout(() => toast.success('Segundo toast'), 200);
              setTimeout(() => toast.warning('Tercer toast'), 400);
            }}
          >
            Disparar 3 toasts
          </Button>
          <Button size="small" variant="ghost" onClick={() => toast.dismissAll()}>
            Cerrar todos
          </Button>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Duración personalizada"
        description="Por defecto duran 4 segundos. Podés cambiarlo, o ponerlo en 0 para que no se cierre solo."
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button
            size="small"
            variant="secondary"
            onClick={() => toast.info('Este se va rápido', { duration: 1500 })}
          >
            1.5 segundos
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => toast.info('Este dura 10 segundos', { duration: 10000 })}
          >
            10 segundos
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => toast.warning('Tenés que cerrarlo a mano', { duration: 0 })}
          >
            No se cierra solo
          </Button>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Cómo usarlo en código"
        description="Desde cualquier componente o función, importás 'toast' del barrel y lo usás directamente."
      >
        <Box
          component="pre"
          sx={{
            margin: 0,
            padding: 2,
            borderRadius: 1,
            backgroundColor: 'action.hover',
            fontSize: '0.8125rem',
            overflow: 'auto',
            fontFamily: 'monospace',
          }}
        >
          {`import { toast } from '@/shared/components'
            // Llamadas básicas
            toast.success('Producto guardado')
            toast.error('Algo salió mal')
            toast.info('Mira esto')
            toast.warning('Cuidado')

            // Con opciones
            toast.success('Guardado', {
              title: 'Listo',
              duration: 6000,
            })

            // Cerrar manualmente
            const id = toast.info('Procesando...', { duration: 0 })
            // ... más tarde
            toast.dismiss(id)`}
        </Box>
      </DemoBlock>

      <DemoBlock title="Cuándo usar Toast vs Alert" description="Guía rápida para elegir bien.">
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Toast</strong>: feedback de una acción que el usuario acaba de hacer. Aparece,
            se ve, se va. No interrumpe el flujo.
          </Typography>
          <Typography variant="body2">
            Ejemplos: "Agregado al carrito", "Cambios guardados", "Error al pagar".
          </Typography>
          <Typography variant="body2">
            <strong>Alert</strong>: información persistente que el usuario debe ver mientras navega.
            Ocupa espacio en el layout.
          </Typography>
          <Typography variant="body2">
            Ejemplos: "Estás comprando como invitado" en checkout, "Tu cuenta no está verificada" en
            perfil.
          </Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const ModalSection = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Modal
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Ventana centrada con backdrop para confirmaciones, formularios cortos o info contextual.
          Cuando el flujo es más largo o necesita contexto de la página, usá <strong>Drawer</strong>
          .
        </Typography>
      </Stack>

      <DemoBlock
        title="Modal básico"
        description="Estructura mínima: título + descripción + acciones."
      >
        <Button onClick={() => setBasicOpen(true)}>Abrir modal básico</Button>
        <Modal
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          title="Modal de ejemplo"
          description="Este es un modal con título, descripción y acciones de cierre."
          actions={
            <>
              <Button variant="ghost" onClick={() => setBasicOpen(false)}>
                Cerrar
              </Button>
              <Button onClick={() => setBasicOpen(false)}>Entendido</Button>
            </>
          }
        />
      </DemoBlock>

      <DemoBlock
        title="Confirmación destructiva"
        description="Patrón típico para confirmar acciones que no se pueden deshacer."
      >
        <Button variant="danger" startIcon={<DeleteIcon />} onClick={() => setConfirmOpen(true)}>
          Eliminar producto
        </Button>
        <Modal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="¿Eliminar producto?"
          description="Esta acción no se puede deshacer. El producto se quitará del catálogo y de cualquier pedido pendiente."
          icon={<DeleteIcon sx={{ color: 'error.main', fontSize: 20 }} />}
          actions={
            <>
              <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setConfirmOpen(false);
                  toast.success('Producto eliminado');
                }}
              >
                Eliminar
              </Button>
            </>
          }
        />
      </DemoBlock>

      <DemoBlock
        title="Guardá tus favoritos"
        description="Modal que aparece cuando un usuario no logueado intenta agregar a favoritos. Patrón documentado en el wireframe."
      >
        <Button
          variant="secondary"
          startIcon={<FavoriteIcon />}
          onClick={() => setFavoritesOpen(true)}
        >
          Agregar a favoritos
        </Button>
        <Modal
          open={favoritesOpen}
          onClose={() => setFavoritesOpen(false)}
          title="Guardá tus favoritos"
          description="Creá una cuenta o iniciá sesión para guardar productos, ver tu historial de compras y acceder a beneficios exclusivos."
          icon={<FavoriteIcon sx={{ color: 'primary.main', fontSize: 20 }} />}
          actions={
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: '100%' }}>
                <Button variant="secondary" fullWidth onClick={() => setFavoritesOpen(false)}>
                  Iniciar sesión
                </Button>
                <Button fullWidth onClick={() => setFavoritesOpen(false)}>
                  Crear cuenta
                </Button>
              </Stack>
              <Button
                variant="ghost"
                size="small"
                fullWidth
                onClick={() => setFavoritesOpen(false)}
              >
                Seguir navegando sin guardar
              </Button>
            </Stack>
          }
        />
      </DemoBlock>

      <DemoBlock title="Cerrar sesión" description="Modal de confirmación simple, sin descripción.">
        <Button variant="secondary" startIcon={<LogoutIcon />} onClick={() => setLogoutOpen(true)}>
          Cerrar sesión
        </Button>
        <Modal
          open={logoutOpen}
          onClose={() => setLogoutOpen(false)}
          title="¿Cerrar sesión?"
          description="Tu carrito y favoritos se guardan en tu cuenta. Vas a poder verlos cuando vuelvas a iniciar sesión."
          actions={
            <>
              <Button variant="ghost" onClick={() => setLogoutOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  setLogoutOpen(false);
                  toast.success('Sesión cerrada');
                }}
              >
                Cerrar sesión
              </Button>
            </>
          }
        />
      </DemoBlock>

      <DemoBlock
        title="Guía de talles"
        description="Modal grande con contenido (tabla, info). Sin acciones, solo se cierra."
      >
        <Button variant="ghost" startIcon={<HelpIcon />} onClick={() => setSizeGuideOpen(true)}>
          Guía de talles
        </Button>
        <Modal
          open={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          title="Guía de talles"
          description="Equivalencias entre talles internacionales y argentinos. Si tenés dudas, consultanos por WhatsApp."
          icon={<HelpIcon sx={{ color: 'info.main', fontSize: 20 }} />}
          size="medium"
        >
          <Stack spacing={2}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {['Internacional', 'Argentino', 'Busto (cm)', 'Cintura (cm)'].map((h) => (
                <Box
                  key={h}
                  sx={{
                    padding: 1.5,
                    backgroundColor: 'action.hover',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    borderRight: 1,
                    borderColor: 'divider',
                    '&:last-child': { borderRight: 0 },
                  }}
                >
                  {h}
                </Box>
              ))}
              {[
                ['XS', '36', '82-86', '62-66'],
                ['S', '38', '86-90', '66-70'],
                ['M', '40', '90-94', '70-74'],
                ['L', '42', '94-98', '74-78'],
                ['XL', '44', '98-102', '78-82'],
              ].flatMap((row, rowIdx) =>
                row.map((cell, cellIdx) => (
                  <Box
                    key={`${rowIdx}-${cellIdx}`}
                    sx={{
                      padding: 1.5,
                      fontSize: '0.875rem',
                      borderTop: 1,
                      borderRight: 1,
                      borderColor: 'divider',
                      '&:nth-of-type(4n)': { borderRight: 0 },
                    }}
                  >
                    {cell}
                  </Box>
                )),
              )}
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Las medidas son aproximadas. Cada prenda tiene una caída particular según el corte.
            </Typography>
          </Stack>
        </Modal>
      </DemoBlock>

      <DemoBlock
        title="Con formulario"
        description="Modal con form de inputs. Útil para registros rápidos, edición de datos."
      >
        <Button onClick={() => setFormOpen(true)}>Suscribirme al newsletter</Button>
        <Modal
          open={formOpen}
          onClose={() => setFormOpen(false)}
          title="Suscribite al newsletter"
          description="Recibí novedades y descuentos exclusivos. Podés cancelar cuando quieras."
          icon={<EmailIcon sx={{ color: 'primary.main', fontSize: 20 }} />}
          actions={
            <>
              <Button variant="ghost" onClick={() => setFormOpen(false)}>
                Ahora no
              </Button>
              <Button
                onClick={() => {
                  setFormOpen(false);
                  setName('');
                  setEmail('');
                  toast.success('¡Listo! Te suscribiste correctamente');
                }}
              >
                Suscribirme
              </Button>
            </>
          }
        >
          <Stack spacing={2}>
            <Input label="Nombre" value={name} onChange={setName} placeholder="Cómo te llamamos" />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="hola@ejemplo.com"
              required
            />
          </Stack>
        </Modal>
      </DemoBlock>

      <DemoBlock title="Cuándo usar Modal vs Drawer" description="Resumen rápido.">
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Modal</strong>: decisiones puntuales (confirmar, alertar), formularios cortos,
            info contextual breve. Centrado, llama la atención.
          </Typography>
          <Typography variant="body2">
            <strong>Drawer</strong>: flujos más largos donde el usuario quiere ver el contexto
            detrás (carrito, filtros, menú mobile, edición extensa). Lateral, mantiene la página
            visible.
          </Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const DrawerSection = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  // Mini estado para el drawer de filtros
  const [priceRange, setPriceRange] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [onlyOnSale, setOnlyOnSale] = useState(false);

  // Mini estado para el carrito de ejemplo
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Vestido denim con bordados',
      variant: 'Talle M',
      price: 25000,
      qty: 1,
      img: 'https://picsum.photos/seed/dora-cart-1/80/100',
    },
    {
      id: '2',
      name: 'Top bordado a mano',
      variant: 'Talle S',
      price: 18000,
      qty: 2,
      img: 'https://picsum.photos/seed/dora-cart-2/80/100',
    },
  ]);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const formatPrice = (value: number) => `$${value.toLocaleString('es-AR')}`;

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Drawer
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Panel lateral que se desliza desde un borde de la pantalla. Mantiene el contexto de la
          página detrás (el usuario no pierde su lugar). Para decisiones más puntuales, usá{' '}
          <strong>Modal</strong>.
        </Typography>
      </Stack>

      <DemoBlock
        title="Drawer del carrito (right)"
        description="Caso real del e-commerce: muestra los items, total y CTA de checkout. Aparece desde la derecha."
      >
        <Badge content={cartCount} color="primary" invisible={cartCount === 0}>
          <Button startIcon={<ShoppingCartIcon />} onClick={() => setCartOpen(true)}>
            Ver carrito
          </Button>
        </Badge>
        <Drawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          side="right"
          title="Tu carrito"
          description={`${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`}
          icon={<ShoppingBagIcon sx={{ color: 'primary.main', fontSize: 20 }} />}
          footer={
            cartItems.length > 0 ? (
              <Stack spacing={1.5}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Subtotal
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatPrice(cartTotal)}
                  </Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  El costo de envío se calcula en el checkout.
                </Typography>
                <Button
                  fullWidth
                  size="large"
                  onClick={() => {
                    setCartOpen(false);
                    toast.info('Llevándote al checkout...');
                  }}
                >
                  Iniciar compra
                </Button>
                <Button fullWidth variant="ghost" size="small" onClick={() => setCartOpen(false)}>
                  Seguir comprando
                </Button>
              </Stack>
            ) : null
          }
        >
          {cartItems.length === 0 ? (
            <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', paddingY: 4 }}>
              <ShoppingBagIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5 }} />
              <Stack spacing={0.5}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Tu carrito está vacío
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Explorá productos y sumalos para empezar.
                </Typography>
              </Stack>
              <Button variant="secondary" size="small" onClick={() => setCartOpen(false)}>
                Ver catálogo
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2} divider={<Divider spacing="none" />}>
              {cartItems.map((item) => (
                <Stack key={item.id} direction="row" spacing={1.5}>
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.name}
                    sx={{
                      width: 72,
                      height: 90,
                      objectFit: 'cover',
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Stack spacing={0.5} sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {item.variant}
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 0.5 }}
                    >
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Cantidad: {item.qty}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatPrice(item.price * item.qty)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <IconButton
                    size="small"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Quitar"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          )}
        </Drawer>
      </DemoBlock>

      <DemoBlock
        title="Drawer de filtros (left)"
        description="Filtros del catálogo. Aparece desde la izquierda para no confundirse con el carrito."
      >
        <Button
          variant="secondary"
          startIcon={<FilterListIcon />}
          onClick={() => setFiltersOpen(true)}
        >
          Filtros
        </Button>
        <Drawer
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          side="left"
          title="Filtros"
          description="Refiná tu búsqueda"
          icon={<FilterListIcon sx={{ color: 'primary.main', fontSize: 20 }} />}
          footer={
            <Stack direction="row" spacing={1}>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => {
                  setPriceRange('all');
                  setSelectedSizes([]);
                  setOnlyOnSale(false);
                }}
              >
                Limpiar
              </Button>
              <Button fullWidth onClick={() => setFiltersOpen(false)}>
                Aplicar filtros
              </Button>
            </Stack>
          }
        >
          <Stack spacing={3} divider={<Divider spacing="none" />}>
            {/* Precio */}
            <Stack spacing={1.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Precio
              </Typography>
              <RadioGroup
                value={priceRange}
                onChange={setPriceRange}
                options={[
                  { value: 'all', label: 'Todos los precios' },
                  { value: 'lt15', label: 'Hasta $15.000' },
                  { value: '15to30', label: '$15.000 - $30.000' },
                  { value: 'gt30', label: 'Más de $30.000' },
                ]}
              />
            </Stack>

            {/* Talles */}
            <Stack spacing={1.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Talles
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    variant={selectedSizes.includes(size) ? 'solid' : 'outline'}
                    color={selectedSizes.includes(size) ? 'primary' : 'default'}
                    onClick={() => toggleSize(size)}
                  />
                ))}
              </Stack>
            </Stack>

            {/* Otros */}
            <Stack spacing={1.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Otros
              </Typography>
              <Switch
                checked={onlyOnSale}
                onChange={setOnlyOnSale}
                label="Solo productos en oferta"
                labelPosition="start"
              />
            </Stack>
          </Stack>
        </Drawer>
      </DemoBlock>

      <DemoBlock
        title="Menú mobile (left)"
        description="Navegación principal para mobile. Aparece al tocar el botón hamburger."
      >
        <Button variant="secondary" onClick={() => setMenuOpen(true)}>
          Menú
        </Button>
        <Drawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          side="left"
          size="small"
          title="Navegación"
        >
          <Stack spacing={0.5}>
            {[
              { label: 'Inicio', path: '/' },
              { label: 'Catálogo', path: '/catalogo' },
              { label: 'Camperas y abrigos', path: '/catalogo/camperas' },
              { label: 'Vestidos', path: '/catalogo/vestidos' },
              { label: 'Tops y blusas', path: '/catalogo/tops' },
              { label: 'Pantalones', path: '/catalogo/pantalones' },
              { label: 'Accesorios', path: '/catalogo/accesorios' },
              { label: 'Edición especial', path: '/catalogo/edicion-especial' },
            ].map((item) => (
              <Box
                key={item.path}
                component="button"
                onClick={() => {
                  toast.info(`Navegar a ${item.path}`);
                  setMenuOpen(false);
                }}
                sx={{
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: 1,
                  cursor: 'pointer',
                  color: 'text.primary',
                  fontFamily: 'inherit',
                  fontSize: '0.9375rem',
                  transition: 'all 200ms',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Stack>
        </Drawer>
      </DemoBlock>

      <DemoBlock
        title="Tamaños"
        description="Cuatro tamaños disponibles: small, medium, large, full."
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button size="small" variant="secondary" onClick={() => setInfoOpen(true)}>
            Probar drawer
          </Button>
        </Stack>
        <Drawer
          open={infoOpen}
          onClose={() => setInfoOpen(false)}
          side="right"
          size="large"
          title="Drawer tamaño large"
          icon={<InfoIcon sx={{ color: 'info.main', fontSize: 20 }} />}
        >
          <Stack spacing={2}>
            <Typography variant="body2">
              Este drawer es de tamaño <strong>large</strong> (560px). Útil para contenidos extensos
              como edición de productos en el admin o detalles de pedidos.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Los tamaños disponibles son:
            </Typography>
            <Stack spacing={1}>
              {[
                { name: 'small', desc: '320px - menús de navegación' },
                { name: 'medium', desc: '420px - default, carrito, filtros' },
                { name: 'large', desc: '560px - edición de productos' },
                { name: 'full', desc: '100% - mobile fullscreen' },
              ].map((s) => (
                <Stack key={s.name} direction="row" spacing={1}>
                  <Tag label={s.name} color="primary" size="small" />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {s.desc}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Drawer>
      </DemoBlock>

      <DemoBlock
        title="Convención de lados en la app"
        description="Para mantener consistencia, cada tipo de drawer va siempre del mismo lado."
      >
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Right (derecha)</strong>: carrito, detalles de items, info contextual de
            productos.
          </Typography>
          <Typography variant="body2">
            <strong>Left (izquierda)</strong>: filtros del catálogo, menú principal mobile,
            navegación.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            Cuando ambos drawers conviven en una misma página (catálogo: filtros + carrito), nunca
            se chocan visualmente.
          </Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const EmptyStateSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          EmptyState
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Estado vacío con ilustración temática + mensaje + CTA. Se muestra cuando una sección no
          tiene datos. Las ilustraciones son SVG hechas a medida con la estética artesanal de la
          marca (hilos, costuras, agujas).
        </Typography>
      </Stack>

      <DemoBlock
        title="Catálogo vacío"
        description="Cuando una categoría todavía no tiene productos cargados."
      >
        <Card variant="outlined" padding="none">
          <EmptyState
            illustration="catalog"
            title="Pronto encontrás productos acá"
            description="Estamos preparando piezas únicas. Volvé a visitarnos en unos días."
            action={
              <Button onClick={() => toast.info('Volviendo al inicio...')}>Volver al inicio</Button>
            }
            secondaryAction={
              <Button variant="ghost" size="small">
                Ver otras categorías
              </Button>
            }
          />
        </Card>
      </DemoBlock>

      <DemoBlock
        title="Carrito vacío"
        description="Cuando el usuario no tiene productos agregados."
      >
        <Card variant="outlined" padding="none">
          <EmptyState
            illustration="cart"
            title="Tu carrito está vacío"
            description="Cuando encuentres algo que te guste, agregalo y va a aparecer acá."
            action={
              <Button onClick={() => toast.info('Ir al catálogo')}>Explorar productos</Button>
            }
          />
        </Card>
      </DemoBlock>

      <DemoBlock title="Sin favoritos" description="Cuando el usuario no guardó nada todavía.">
        <Card variant="outlined" padding="none">
          <EmptyState
            illustration="favorites"
            title="Todavía no guardaste favoritos"
            description="Tocá el corazón en cualquier producto para guardarlo y verlo más tarde."
            action={<Button variant="secondary">Ir al catálogo</Button>}
          />
        </Card>
      </DemoBlock>

      <DemoBlock
        title="Sin resultados con filtros"
        description="Cuando los filtros aplicados no devuelven resultados."
      >
        <Card variant="outlined" padding="none">
          <EmptyState
            illustration="search"
            title="No encontramos productos con esos filtros"
            description="Probá ajustando algún filtro o limpialos todos para ver el catálogo completo."
            action={
              <Button onClick={() => toast.info('Filtros limpiados')}>Limpiar filtros</Button>
            }
          />
        </Card>
      </DemoBlock>

      <DemoBlock
        title="Listado del admin vacío"
        description="Para usar en panel de administración cuando un listado todavía no tiene datos."
      >
        <Card variant="outlined" padding="none">
          <EmptyState
            illustration="admin"
            title="Todavía no hay pedidos"
            description="Cuando recibas tu primer pedido vas a poder gestionarlo desde acá."
            action={<Button variant="secondary">Ver guía de venta</Button>}
          />
        </Card>
      </DemoBlock>

      <DemoBlock
        title="Versión compacta"
        description="Para usar dentro de drawers, cards chicos o secciones más reducidas."
      >
        <Card variant="outlined" padding="none" sx={{ maxWidth: 320 }}>
          <EmptyState
            illustration="cart"
            title="Carrito vacío"
            description="Sumá productos para empezar."
            action={
              <Button size="small" variant="secondary">
                Ver catálogo
              </Button>
            }
            compact
          />
        </Card>
      </DemoBlock>

      <DemoBlock
        title="Todas las ilustraciones disponibles"
        description="Las cinco ilustraciones temáticas, juntas para comparar."
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(5, 1fr)' },
            gap: 2,
          }}
        >
          {[
            { key: 'catalog', label: 'catalog' },
            { key: 'cart', label: 'cart' },
            { key: 'favorites', label: 'favorites' },
            { key: 'search', label: 'search' },
            { key: 'admin', label: 'admin' },
          ].map((item) => (
            <Card key={item.key} variant="outlined" padding="medium">
              <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
                <EmptyState
                  illustration={item.key as 'catalog'}
                  title=""
                  compact
                  illustrationSize={64}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {item.label}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Box>
      </DemoBlock>
    </Stack>
  );
};

const BreadcrumbSection = () => {
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Breadcrumb
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Navegación jerárquica que muestra dónde está el usuario en el sitio. El último item es la
          página actual y no es clickeable.
        </Typography>
      </Stack>

      <DemoBlock title="Básico" description="Caso típico del detalle de producto.">
        <Card variant="outlined">
          <Breadcrumb
            items={[
              {
                label: 'Inicio',
                href: '#',
                isHome: true,
                onClick: () => toast.info('Click en Inicio'),
              },
              { label: 'Catálogo', onClick: () => toast.info('Click en Catálogo') },
              { label: 'Vestidos', onClick: () => toast.info('Click en Vestidos') },
              { label: 'Vestido denim reciclado con bordados' },
            ]}
          />
        </Card>
      </DemoBlock>

      <DemoBlock title="Sin ícono de home" description="Cuando preferís texto puro, sin íconos.">
        <Card variant="outlined">
          <Breadcrumb
            showHomeIcon={false}
            items={[
              { label: 'Inicio', onClick: () => {} },
              { label: 'Mi cuenta', onClick: () => {} },
              { label: 'Mis pedidos', onClick: () => {} },
              { label: 'Pedido #DG-2026-0142' },
            ]}
          />
        </Card>
      </DemoBlock>

      <DemoBlock
        title="Niveles cortos (2 elementos)"
        description="Para páginas que están a un solo click de inicio."
      >
        <Card variant="outlined">
          <Breadcrumb
            items={[{ label: 'Inicio', onClick: () => {}, isHome: true }, { label: 'Catálogo' }]}
          />
        </Card>
      </DemoBlock>

      <DemoBlock title="Admin" description="Versión típica del panel de administración.">
        <Card variant="outlined">
          <Breadcrumb
            showHomeIcon={false}
            items={[
              { label: 'Admin', onClick: () => {} },
              { label: 'Productos', onClick: () => {} },
              { label: 'Editar producto' },
            ]}
          />
        </Card>
      </DemoBlock>

      <DemoBlock
        title="Item largo (con truncado)"
        description="Cuando el último item tiene un nombre muy largo, se trunca con elipsis para no romper el layout."
      >
        <Card variant="outlined" sx={{ maxWidth: 480 }}>
          <Breadcrumb
            items={[
              { label: 'Inicio', onClick: () => {}, isHome: true },
              { label: 'Catálogo', onClick: () => {} },
              { label: 'Edición especial' },
              { label: 'Campera denim reciclado con bordados artesanales edición limitada' },
            ]}
          />
        </Card>
      </DemoBlock>

      <DemoBlock title="Cuándo usarlo" description="Guía de uso.">
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Usá Breadcrumb cuando</strong>: el sitio tiene jerarquía clara (más de 2
            niveles) y al usuario le sirve saber dónde está y volver fácil hacia atrás.
          </Typography>
          <Typography variant="body2">
            <strong>Ejemplos en este sitio</strong>: detalle de producto, catálogo filtrado, páginas
            del admin, detalle de pedido en cuenta.
          </Typography>
          <Typography variant="body2">
            <strong>NO uses cuando</strong>: estás en una página de top-level (Home, Login), o
            cuando el sitio es muy plano (1-2 niveles).
          </Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const CoachmarkSection = () => {
  const [button1Anchor, setButton1Anchor] = useState<HTMLDivElement | null>(null);
  const [button2Anchor, setButton2Anchor] = useState<HTMLDivElement | null>(null);
  const [button3Anchor, setButton3Anchor] = useState<HTMLDivElement | null>(null);

  const [coachmark1Open, setCoachmark1Open] = useState(false);
  const [coachmark2Open, setCoachmark2Open] = useState(false);
  const [coachmark3Open, setCoachmark3Open] = useState(false);

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Coachmark
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Burbuja con flecha que destaca una feature nueva o explica un elemento. Se ancla a un
          elemento del DOM y aparece al lado.
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          Tip: pasando <code>persistKey</code> el coachmark se muestra una sola vez por navegador.
          Útil para destacar features nuevas que no querés que aparezcan después.
        </Typography>
      </Stack>

      <DemoBlock
        title="Básico"
        description="Click en el botón para mostrar el coachmark apuntando a otro elemento."
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Button variant="secondary" onClick={() => setCoachmark1Open((p) => !p)}>
            {coachmark1Open ? 'Cerrar' : 'Mostrar coachmark'}
          </Button>
          <Box ref={setButton1Anchor}>
            <Button variant="ghost" startIcon={<FavoriteIcon />}>
              Favoritos
            </Button>
          </Box>
          <Coachmark
            open={coachmark1Open}
            anchorEl={button1Anchor}
            onClose={() => setCoachmark1Open(false)}
            title="¡Ahora podés guardar favoritos!"
            description="Tocá el corazón de cualquier producto para guardarlo y verlo más tarde desde tu cuenta."
            placement="bottom"
          />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Con acción secundaria"
        description="Para que el usuario pueda postergar la atención al cambio."
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Button variant="secondary" onClick={() => setCoachmark2Open((p) => !p)}>
            {coachmark2Open ? 'Cerrar' : 'Mostrar'}
          </Button>
          <Badge dot color="error">
            <Box ref={setButton2Anchor}>
              <Button variant="ghost" startIcon={<NotificationsIcon />} aria-label="Notificaciones">
                Notificaciones
              </Button>
            </Box>
          </Badge>
          <Coachmark
            open={coachmark2Open}
            anchorEl={button2Anchor}
            onClose={() => setCoachmark2Open(false)}
            title="Centro de notificaciones"
            description="Acá vas a ver actualizaciones de tus pedidos y avisos importantes del sitio."
            actionLabel="Ver ahora"
            secondaryActionLabel="Más tarde"
            onAction={() => toast.info('Yendo a notificaciones...')}
            onSecondaryAction={() => toast.info('Te lo recordamos después')}
            placement="bottom-end"
          />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Con persistencia"
        description="Este coachmark usa persistKey. Si lo cerrás (o clickeás 'Entendido'), no vuelve a aparecer en este navegador. Para volver a probarlo, abrí la consola y ejecutá: localStorage.removeItem('coachmark_demo-persist-v1')"
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Button variant="secondary" onClick={() => setCoachmark3Open((p) => !p)}>
            {coachmark3Open ? 'Cerrar' : 'Mostrar (una vez)'}
          </Button>
          <Box ref={setButton3Anchor}>
            <Button startIcon={<ShareIcon />}>Compartir</Button>
          </Box>
          <Coachmark
            open={coachmark3Open}
            anchorEl={button3Anchor}
            onClose={() => setCoachmark3Open(false)}
            title="Compartí lo que te gusta"
            description="Pasale el link de cualquier producto a tus amistades por WhatsApp, Instagram o lo que prefieras."
            persistKey="demo-persist-v1"
            placement="bottom-start"
          />
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Posiciones disponibles"
        description="El coachmark se acomoda automáticamente si no hay espacio en la posición pedida."
      >
        <Stack spacing={1}>
          {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
            <Typography key={p} variant="body2" sx={{ color: 'text.secondary' }}>
              <code>placement="{p}"</code>: aparece{' '}
              {p === 'top'
                ? 'arriba'
                : p === 'bottom'
                  ? 'abajo'
                  : p === 'left'
                    ? 'a la izquierda'
                    : 'a la derecha'}{' '}
              del elemento. También: top-start, top-end, bottom-start, bottom-end.
            </Typography>
          ))}
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Cuándo usar Coachmark vs Tooltip vs Modal"
        description="Cada uno tiene su lugar."
      >
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Tooltip</strong>: info contextual al hover. Desaparece al sacar el mouse. Para
            explicar íconos sin texto.
          </Typography>
          <Typography variant="body2">
            <strong>Coachmark</strong>: destacar una feature nueva, explicar un cambio. Aparece una
            vez y se cierra con click o "Entendido". Tiene CTA y persistencia.
          </Typography>
          <Typography variant="body2">
            <strong>Modal</strong>: requiere atención completa. Bloquea la interacción con el resto.
            Para confirmaciones o flujos cortos.
          </Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};

const WelcomeAnimationSection = () => {
  const [threads, setThreads] = useState<WelcomeAnimationThread[]>([]);
  const [playing, setPlaying] = useState(false);

  const [customThreads, setCustomThreads] = useState<WelcomeAnimationThread[]>([]);
  const [playingCustom, setPlayingCustom] = useState(false);

  const handlePlayBasic = () => {
    setThreads(generateWelcomeThreads(28));
    setPlaying(true);
  };

  const handlePlayCustom = () => {
    setCustomThreads(generateWelcomeThreads(36));
    setPlayingCustom(true);
  };

  const persistKey = 'welcomeAnimationShown_v1';
  const wasShownOnLaunch =
    typeof window !== 'undefined' && localStorage.getItem(persistKey) === 'true';

  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          WelcomeAnimation
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Animación de inauguración con hilos cayendo sutilmente desde arriba y un toast de
          bienvenida al final. No bloquea la interacción del usuario. Es <strong>la</strong> señal
          de que la marca se está "armando" frente a vos.
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          En la app real va a aparecer una sola vez por navegador, usando localStorage con la clave{' '}
          <code>welcomeAnimationShown_v1</code>. Si en el futuro hacemos otra inauguración (nueva
          colección, aniversario), usamos <code>_v2</code>.
        </Typography>
      </Stack>

      <DemoBlock
        title="Reproducir animación"
        description="Click en el botón para ver la animación en acción. Dura 3 segundos."
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Button onClick={handlePlayBasic} disabled={playing}>
            {playing ? 'Reproduciendo...' : 'Reproducir bienvenida'}
          </Button>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Mirá toda la pantalla mientras dura.
          </Typography>
        </Stack>
        <WelcomeAnimation open={playing} threads={threads} onComplete={() => setPlaying(false)} />
      </DemoBlock>

      <DemoBlock
        title="Con mensaje personalizado"
        description="Por ejemplo, para celebrar el lanzamiento de una nueva colección."
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Button variant="secondary" onClick={handlePlayCustom} disabled={playingCustom}>
            {playingCustom ? 'Reproduciendo...' : 'Reproducir versión nueva colección'}
          </Button>
        </Stack>
        <WelcomeAnimation
          open={playingCustom}
          threads={customThreads}
          onComplete={() => setPlayingCustom(false)}
          greeting="Nueva colección"
          brandName="Otoño 2026"
          tagline="bordados artesanales únicos"
        />
      </DemoBlock>

      <DemoBlock
        title="Estado del lanzamiento oficial"
        description={`Esta es la animación que se va a disparar UNA SOLA VEZ cuando un usuario nuevo entre al sitio. Persistida en localStorage con la clave "${persistKey}".`}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}
          >
            <Typography variant="body2">Estado actual:</Typography>
            <Tag
              label={
                wasShownOnLaunch ? 'Ya se reprodujo' : 'Se va a reproducir en la próxima visita'
              }
              color={wasShownOnLaunch ? 'success' : 'primary'}
              variant="subtle"
            />
          </Stack>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Button
              size="small"
              variant="secondary"
              onClick={() => {
                localStorage.removeItem(persistKey);
                toast.success('Listo, en la próxima visita se vuelve a reproducir');
              }}
              disabled={!wasShownOnLaunch}
            >
              Resetear (volver a ver al recargar)
            </Button>
            <Button
              size="small"
              variant="ghost"
              onClick={() => {
                localStorage.setItem(persistKey, 'true');
                toast.info('Marcado como vista — no aparecerá en próximas visitas');
              }}
              disabled={wasShownOnLaunch}
            >
              Marcar como ya vista
            </Button>
          </Stack>
        </Stack>
      </DemoBlock>

      <DemoBlock
        title="Cómo se va a usar en la app real"
        description="Implementación que va en el componente raíz del sitio público."
      >
        <Box
          component="pre"
          sx={{
            margin: 0,
            padding: 2,
            borderRadius: 1,
            backgroundColor: 'action.hover',
            fontSize: '0.8125rem',
            overflow: 'auto',
            fontFamily: 'monospace',
            lineHeight: 1.6,
          }}
        >
          {`// En el componente raíz del PublicLayout
const PERSIST_KEY = 'welcomeAnimationShown_v1'

const [threads, setThreads] = useState<WelcomeAnimationThread[]>([])
const [open, setOpen] = useState(false)

useEffect(() => {
  const wasShown = localStorage.getItem(PERSIST_KEY) === 'true'
  if (!wasShown) {
    setThreads(generateWelcomeThreads(18))
    setOpen(true)
  }
}, [])

const handleComplete = () => {
  localStorage.setItem(PERSIST_KEY, 'true')
  setOpen(false)
}

return (
  <>
    <WelcomeAnimation
      open={open}
      threads={threads}
      onComplete={handleComplete}
    />
    <Outlet />
  </>
)`}
        </Box>
      </DemoBlock>

      <DemoBlock title="Detalles técnicos" description="Cómo está construida la animación.">
        <Stack spacing={1.5}>
          <Typography variant="body2">
            <strong>Hilos generados desde afuera</strong>: el componente padre llama a{' '}
            <code>generateWelcomeThreads(N)</code> y pasa el resultado como prop. Esto mantiene al
            componente puro (sin <code>Math.random</code> adentro).
          </Typography>
          <Typography variant="body2">
            <strong>Colores de marca</strong>: terracota (primary) y mostaza (secondary). 50% de
            chance cada uno. La opacidad se queda en 0.4 para que sea sutil y no distractor.
          </Typography>
          <Typography variant="body2">
            <strong>Nudito al final</strong>: cada hilo termina en un pequeño círculo, evocando el
            nudo del hilo después de coser.
          </Typography>
          <Typography variant="body2">
            <strong>No bloqueante</strong>: <code>pointerEvents: none</code> y{' '}
            <code>aria-hidden</code> garantizan que el usuario puede navegar mientras dura, y los
            lectores de pantalla la ignoran.
          </Typography>
          <Typography variant="body2">
            <strong>z-index inteligente</strong>: queda debajo del toast para que el mensaje de
            bienvenida sea legible sobre la animación.
          </Typography>
        </Stack>
      </DemoBlock>
    </Stack>
  );
};
