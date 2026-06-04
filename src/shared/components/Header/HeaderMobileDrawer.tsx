import { useNavigate } from 'react-router';

import {
  Email as EmailIcon,
  Favorite as FavoriteIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';
import { Divider } from '@/shared/components/Divider';
import { Drawer } from '@/shared/components/Drawer';
import { Logo } from '@/shared/components/Logo';
import { Switch } from '@/shared/components/Switch';
import { buildWhatsAppUrl, catalogCategories, siteConfig } from '@/shared/config/siteConfig';
import { useThemeStore } from '@/shared/stores/themeStore';

import { type MockAuthState } from './Header';

type HeaderMobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  auth: MockAuthState;
};

/**
 * Drawer del menú mobile.
 * Se desliza desde la izquierda con toda la navegación, accesos a cuenta,
 * toggle de tema y contacto.
 */
export const HeaderMobileDrawer = ({ open, onClose, auth }: HeaderMobileDrawerProps) => {
  const navigate = useNavigate();
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} side="left" size="medium">
      <Stack spacing={3}>
        {/* Logo arriba del menú */}
        <Box sx={{ paddingY: 1 }}>
          <Logo variant="full" height={32} taglineSize="small" />
        </Box>

        <Divider spacing="none" />

        {/* Si está logueado, mostrar info de usuario */}
        {auth.isAuthenticated && (
          <>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Avatar name={auth.userName ?? 'Usuario'} size="large" />
              <Stack spacing={0}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {auth.userName ?? 'Usuario'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Ver mi cuenta
                </Typography>
              </Stack>
            </Stack>
            <Divider spacing="none" />
          </>
        )}

        {/* Navegación principal */}
        <Stack spacing={0.5}>
          <DrawerNavItem label="Inicio" onClick={() => handleNavigate('/')} />
          <DrawerNavItem label="Ver todo el catálogo" onClick={() => handleNavigate('/catalogo')} />
          {catalogCategories.map((cat) => (
            <DrawerNavItem
              key={cat.slug}
              label={cat.label}
              onClick={() => handleNavigate(`/catalogo/${cat.slug}`)}
              indent
            />
          ))}
        </Stack>

        <Divider spacing="none" />

        {/* Accesos rápidos */}
        <Stack spacing={0.5}>
          {auth.isAuthenticated ? (
            <>
              <DrawerNavItem
                label="Mi cuenta"
                icon={<PersonIcon fontSize="small" />}
                onClick={() => handleNavigate('/cuenta')}
              />
              <DrawerNavItem
                label="Mis pedidos"
                icon={<ShoppingBagIcon fontSize="small" />}
                onClick={() => handleNavigate('/cuenta/pedidos')}
              />
              <DrawerNavItem
                label="Mis favoritos"
                icon={<FavoriteIcon fontSize="small" />}
                onClick={() => handleNavigate('/cuenta/favoritos')}
              />
              <DrawerNavItem
                label="Cerrar sesión"
                icon={<LogoutIcon fontSize="small" />}
                onClick={() => {
                  // TODO: implementar logout en módulo 6
                  onClose();
                }}
              />
            </>
          ) : (
            <Button fullWidth startIcon={<LoginIcon />} onClick={() => handleNavigate('/login')}>
              Iniciar sesión
            </Button>
          )}
        </Stack>

        <Divider spacing="none" />

        {/* Tema */}
        <Switch
          checked={mode === 'dark'}
          onChange={toggleMode}
          label={mode === 'dark' ? 'Modo oscuro' : 'Modo claro'}
          description={mode === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          labelPosition="start"
        />

        <Divider spacing="none" />

        {/* Contacto */}
        <Stack spacing={1.5}>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.15em' }}>
            Contacto
          </Typography>
          <Box
            component="a"
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              padding: 1,
              borderRadius: 1,
              textDecoration: 'none',
              color: 'text.primary',
              transition: 'background-color 200ms',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <WhatsAppIcon fontSize="small" sx={{ color: 'success.main' }} />
            <Typography variant="body2">{siteConfig.contact.whatsappDisplay}</Typography>
          </Box>
          <Box
            component="a"
            href={`mailto:${siteConfig.contact.email}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              padding: 1,
              borderRadius: 1,
              textDecoration: 'none',
              color: 'text.primary',
              transition: 'background-color 200ms',
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          >
            <EmailIcon fontSize="small" sx={{ color: 'primary.main' }} />
            <Typography variant="body2">{siteConfig.contact.email}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Drawer>
  );
};

type DrawerNavItemProps = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  indent?: boolean;
};

const DrawerNavItem = ({ label, onClick, icon, indent = false }: DrawerNavItemProps) => (
  <Box
    component="button"
    onClick={onClick}
    sx={{
      textAlign: 'left',
      background: 'none',
      border: 'none',
      padding: '10px 12px',
      paddingLeft: indent ? '32px' : '12px',
      borderRadius: 1,
      cursor: 'pointer',
      color: 'text.primary',
      fontFamily: 'inherit',
      fontSize: indent ? '0.875rem' : '0.9375rem',
      fontWeight: indent ? 400 : 500,
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      transition: 'background-color 200ms',
      '&:hover': { backgroundColor: 'action.hover' },
    }}
  >
    {icon}
    {label}
  </Box>
);
