import { useEffect, useState } from 'react';

import { Link as RouterLink, useLocation, useNavigate } from 'react-router';

import {
  DarkMode as DarkModeIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { Box, Container, Menu, MenuItem, Stack, useMediaQuery, useTheme } from '@mui/material';

import { Avatar } from '@/shared/components/Avatar';
import { Badge } from '@/shared/components/Badge';
import { IconButton } from '@/shared/components/IconButton';
import { Logo } from '@/shared/components/Logo';
import { Tooltip } from '@/shared/components/Tooltip';
import { catalogCategories } from '@/shared/config/siteConfig';
import { useThemeStore } from '@/shared/stores/themeStore';

import { HeaderMobileDrawer } from './HeaderMobileDrawer';
import { HeaderSearchDrawer } from './HeaderSearchDrawer';

/**
 * Mock simple del estado de auth. En el módulo 6 esto se reemplaza por
 * el hook real (`useAuth`) que viene de Firebase Auth.
 */
type MockAuthState = {
  isAuthenticated: boolean;
  userName?: string;
};

export type HeaderProps = {
  /** Estado de auth. Por ahora se pasa por prop, después viene del hook. */
  auth?: MockAuthState;
  /** Cantidad de items en el carrito (para el badge). */
  cartCount?: number;
};

/**
 * Header principal del sitio público.
 *
 * Estructura:
 *  - Desktop: [Logo full] [Menú central con Catálogo dropdown] [Search, Carrito, Cuenta, Tema]
 *  - Mobile:  [Hamburger] [Logo icon centrado] [Search, Carrito]
 *
 * Comportamiento sticky: se mantiene siempre visible al scrollear pero
 * se compacta (menos padding + sombra sutil) después de 16px de scroll.
 */
export const Header = ({ auth = { isAuthenticated: false }, cartCount = 0 }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  // Estado: header compacto al scrollear
  const [isCompact, setIsCompact] = useState(false);

  // Estado: drawers (mobile menu y search)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Estado: dropdown de catálogo
  const [catalogAnchor, setCatalogAnchor] = useState<null | HTMLElement>(null);

  // Estado: dropdown de usuario (cuando está logueado)
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  // Listener de scroll para activar modo compacto
  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCatalogClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCatalogAnchor(e.currentTarget);
  };
  const handleCatalogClose = () => setCatalogAnchor(null);

  const handleUserClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUserAnchor(e.currentTarget);
  };
  const handleUserClose = () => setUserAnchor(null);

  const handleCategoryNavigate = (slug: string) => {
    navigate(`/catalogo/${slug}`);
    handleCatalogClose();
  };

  // Detectar si la ruta actual corresponde al catálogo (para marcar el item activo)
  const isCatalogActive = location.pathname.startsWith('/catalogo');

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: (t) => t.zIndex.appBar,
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          transition: 'all 250ms ease',
          // Sombra sutil cuando está compacto
          ...(isCompact && {
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 2px 12px rgba(0, 0, 0, 0.3)'
                : '0 2px 12px rgba(0, 0, 0, 0.04)',
          }),
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'padding 250ms ease',
              py: isCompact ? { xs: 1, md: 1.25 } : { xs: 1.5, md: 2 },
            }}
          >
            {/* Mobile: botón hamburger a la izquierda */}
            {isMobile && (
              <IconButton aria-label="Abrir menú" onClick={() => setMobileMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo - en mobile va centrado, en desktop a la izquierda */}
            <Box
              component={RouterLink}
              to="/"
              aria-label="Ir al inicio"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                // En mobile: centrado absoluto
                ...(isMobile && {
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }),
              }}
            >
              <Logo
                variant={isMobile ? 'icon' : 'full'}
                height={isCompact ? (isMobile ? 28 : 32) : isMobile ? 32 : 38}
              />
            </Box>

            {/* Menú central - solo desktop */}
            {!isMobile && (
              <Stack
                direction="row"
                spacing={3}
                sx={{
                  alignItems: 'center',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <HeaderNavLink to="/" label="Inicio" exact />

                <Box
                  component="button"
                  onClick={handleCatalogClick}
                  sx={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 4px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '0.9375rem',
                    fontWeight: isCatalogActive ? 500 : 400,
                    color: isCatalogActive ? 'primary.main' : 'text.primary',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    transition: 'color 200ms',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  Catálogo
                  <KeyboardArrowDownIcon
                    sx={{
                      fontSize: 18,
                      transition: 'transform 200ms',
                      transform: catalogAnchor ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </Box>
              </Stack>
            )}

            {/* Acciones a la derecha */}
            <Stack direction="row" spacing={isMobile ? 0.5 : 1} sx={{ alignItems: 'center' }}>
              <IconButton aria-label="Buscar" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </IconButton>

              <Badge content={cartCount} color="primary" invisible={cartCount === 0}>
                <IconButton aria-label="Ver carrito" onClick={() => navigate('/carrito')}>
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>

              {/* Cuenta */}
              {!isMobile &&
                (auth.isAuthenticated ? (
                  <Tooltip title="Mi cuenta">
                    <Box
                      component="button"
                      onClick={handleUserClick}
                      sx={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        ml: 0.5,
                      }}
                    >
                      <Avatar name={auth.userName ?? 'Usuario'} size="small" />
                    </Box>
                  </Tooltip>
                ) : (
                  <Tooltip title="Iniciar sesión">
                    <IconButton aria-label="Iniciar sesión" onClick={() => navigate('/login')}>
                      <PersonIcon />
                    </IconButton>
                  </Tooltip>
                ))}

              {/* Toggle de tema - solo desktop (mobile va dentro del drawer) */}
              {!isMobile && (
                <Tooltip title={mode === 'light' ? 'Modo oscuro' : 'Modo claro'}>
                  <IconButton
                    aria-label={mode === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
                    onClick={toggleMode}
                  >
                    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Dropdown de catálogo (desktop) */}
      <Menu
        anchorEl={catalogAnchor}
        open={Boolean(catalogAnchor)}
        onClose={handleCatalogClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 220, // antes 240
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                  : '0 8px 24px rgba(0, 0, 0, 0.08)',
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate('/catalogo');
            handleCatalogClose();
          }}
          sx={{ fontWeight: 500, fontSize: '0.875rem' }}
        >
          Ver todo el catálogo
        </MenuItem>
        <Box sx={{ height: 1, backgroundColor: 'divider', my: 0.5, mx: 1 }} />
        {catalogCategories.map((cat) => (
          <MenuItem
            key={cat.slug}
            onClick={() => handleCategoryNavigate(cat.slug)}
            sx={{ fontSize: '0.875rem' }}
          >
            {cat.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Dropdown de usuario logueado (desktop) */}
      <Menu
        anchorEl={userAnchor}
        open={Boolean(userAnchor)}
        onClose={handleUserClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate('/cuenta');
            handleUserClose();
          }}
        >
          Mi cuenta
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/cuenta/pedidos');
            handleUserClose();
          }}
        >
          Mis pedidos
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/cuenta/favoritos');
            handleUserClose();
          }}
        >
          Mis favoritos
        </MenuItem>
        <Box sx={{ height: 1, backgroundColor: 'divider', my: 0.5, mx: 1 }} />
        <MenuItem
          onClick={() => {
            // TODO: implementar logout cuando esté Firebase Auth (módulo 6)
            handleUserClose();
          }}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>

      {/* Drawer de búsqueda */}
      <HeaderSearchDrawer
        key={searchOpen ? 'open' : 'closed'}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Drawer del menú mobile */}
      <HeaderMobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        auth={auth}
      />
    </>
  );
};

/**
 * Link del menú principal del header.
 * Marca como activo cuando la ruta coincide.
 */
type HeaderNavLinkProps = {
  to: string;
  label: string;
  exact?: boolean;
};

const HeaderNavLink = ({ to, label }: HeaderNavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Box
      component={RouterLink}
      to={to}
      sx={{
        textDecoration: 'none',
        padding: '8px 4px',
        fontSize: '0.9375rem',
        fontWeight: isActive ? 500 : 400,
        color: isActive ? 'primary.main' : 'text.primary',
        transition: 'color 200ms',
        '&:hover': { color: 'primary.main' },
      }}
    >
      {label}
    </Box>
  );
};

// Exporto el tipo del auth mock para que el Drawer mobile lo use también
export type { MockAuthState };
