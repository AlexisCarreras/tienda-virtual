import { Link as RouterLink } from 'react-router';

import {
  Email as EmailIcon,
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { Box, Container, Stack, Typography } from '@mui/material';

import { Divider } from '@/shared/components/Divider';
import { Logo } from '@/shared/components/Logo';
import { buildWhatsAppUrl, siteConfig } from '@/shared/config/siteConfig';

/**
 * Footer principal del sitio público.
 *
 * Estructura simple para emprendimiento chico:
 *  - Bloque superior: marca + 2 columnas (Tienda, Contacto+Ayuda).
 *  - Bloque inferior: copyright + micro-links legales.
 *
 * En mobile las columnas se apilan.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        mt: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        {/* Grilla: 1 col en mobile, 3 cols en desktop */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '2fr 1fr 1.4fr',
            },
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Columna 1: Marca */}
          <Stack spacing={2.5}>
            <Logo variant="full" height={40} taglineSize="small" />
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.7,
                maxWidth: 360,
              }}
            >
              {siteConfig.brand.description}
            </Typography>
            <Stack direction="row" spacing={1}>
              <SocialIconLink
                href={siteConfig.social.instagramUrl}
                icon={<InstagramIcon fontSize="small" />}
                label={`Instagram: @${siteConfig.social.instagram}`}
              />
              <SocialIconLink
                href={buildWhatsAppUrl()}
                icon={<WhatsAppIcon fontSize="small" />}
                label="WhatsApp"
              />
              <SocialIconLink
                href={`mailto:${siteConfig.contact.email}`}
                icon={<EmailIcon fontSize="small" />}
                label="Email"
              />
            </Stack>
          </Stack>

          {/* Columna 2: Tienda */}
          <FooterColumn title="Tienda">
            <FooterLink to="/">Inicio</FooterLink>
            <FooterLink to="/catalogo">Ver catálogo</FooterLink>
          </FooterColumn>

          {/* Columna 3: Contacto */}
          <FooterColumn title="Contacto">
            <Box
              component="a"
              href={buildWhatsAppUrl('Hola, me gustaría hacer una consulta.')}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                textDecoration: 'none',
                color: 'text.primary',
                fontSize: '0.875rem',
                py: 0.5,
                transition: 'color 200ms',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 18, color: 'success.main' }} />
              {siteConfig.contact.whatsappDisplay}
            </Box>
            <Box
              component="a"
              href={`mailto:${siteConfig.contact.email}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                textDecoration: 'none',
                color: 'text.primary',
                fontSize: '0.875rem',
                py: 0.5,
                transition: 'color 200ms',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <EmailIcon sx={{ fontSize: 18, color: 'primary.main' }} />
              {siteConfig.contact.email}
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                mt: 1.5,
                lineHeight: 1.6,
              }}
            >
              Atendemos consultas de lunes a viernes
              <br />
              de 10 a 18 hs.
            </Typography>
          </FooterColumn>
        </Box>

        <Divider spacing="medium" />

        {/* Bloque inferior: copyright + links legales discretos */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 0 }}
          sx={{
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © {currentYear} {siteConfig.brand.name}. Todos los derechos reservados.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: 'wrap',
              gap: { xs: 1.5, md: 2 },
            }}
            divider={
              <Box
                sx={{
                  width: '1px',
                  height: 12,
                  backgroundColor: 'divider',
                  alignSelf: 'center',
                }}
              />
            }
          >
            <FooterMicroLink to="/terminos">Términos</FooterMicroLink>
            <FooterMicroLink to="/privacidad">Privacidad</FooterMicroLink>
            <FooterMicroLink to="/cambios">Cambios</FooterMicroLink>
            <FooterMicroLink to="/envios">Envíos</FooterMicroLink>
            <FooterMicroLink to="/arrepentimiento">Arrepentimiento</FooterMicroLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

/**
 * Columna del footer con título.
 */
type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => (
  <Stack spacing={1.25}>
    <Typography
      variant="overline"
      sx={{
        color: 'text.secondary',
        letterSpacing: '0.15em',
        fontSize: '0.7rem',
        fontWeight: 600,
        mb: 0.5,
      }}
    >
      {title}
    </Typography>
    {children}
  </Stack>
);

/**
 * Link de navegación dentro del footer.
 */
type FooterLinkProps = {
  to: string;
  children: React.ReactNode;
};

const FooterLink = ({ to, children }: FooterLinkProps) => (
  <Box
    component={RouterLink}
    to={to}
    sx={{
      textDecoration: 'none',
      color: 'text.primary',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      py: 0.25,
      transition: 'color 200ms',
      '&:hover': { color: 'primary.main' },
    }}
  >
    {children}
  </Box>
);

/**
 * Mini link del footer inferior.
 */
const FooterMicroLink = ({ to, children }: FooterLinkProps) => (
  <Box
    component={RouterLink}
    to={to}
    sx={{
      textDecoration: 'none',
      color: 'text.secondary',
      fontSize: '0.75rem',
      transition: 'color 200ms',
      '&:hover': { color: 'primary.main' },
    }}
  >
    {children}
  </Box>
);

/**
 * Botón circular para ícono de red social.
 */
type SocialIconLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

const SocialIconLink = ({ href, icon, label }: SocialIconLinkProps) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      borderRadius: '50%',
      border: 1,
      borderColor: 'divider',
      color: 'text.secondary',
      transition: 'all 200ms',
      '&:hover': {
        color: 'primary.main',
        borderColor: 'primary.main',
        backgroundColor: 'action.hover',
      },
    }}
  >
    {icon}
  </Box>
);
