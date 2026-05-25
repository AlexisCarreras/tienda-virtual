import { Fragment, type ReactNode } from 'react';

import { ChevronRight as ChevronRightIcon, Home as HomeIcon } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

export type BreadcrumbItem = {
  /** Texto visible. */
  label: ReactNode;
  /** URL si es clickeable. Si no se pasa, el item es solo texto. */
  href?: string;
  /** Handler de click (si querés manejar la navegación con react-router). */
  onClick?: () => void;
  /** Si se muestra como ícono de home (solo para el primer item). */
  isHome?: boolean;
};

export type BreadcrumbProps = {
  /** Lista de items del breadcrumb. El último siempre es la página actual. */
  items: BreadcrumbItem[];
  /** Separador entre items. Default: chevron. */
  separator?: ReactNode;
  /** Si muestra el ícono de home en el primer item automáticamente. Default: true. */
  showHomeIcon?: boolean;
};

/**
 * Navegación jerárquica que muestra dónde está el usuario en el sitio.
 *
 * El último item es siempre la página actual (no clickeable).
 * Los items anteriores son enlaces a niveles superiores.
 *
 * Use cases:
 *  - Detalle de producto: Inicio > Catálogo > Vestidos > Vestido denim
 *  - Catálogo filtrado: Inicio > Catálogo > Vestidos
 *  - Admin: Admin > Productos > Editar producto
 *
 * @example
 *   <Breadcrumb
 *     items={[
 *       { label: 'Inicio', href: '/', isHome: true },
 *       { label: 'Catálogo', href: '/catalogo' },
 *       { label: 'Vestidos', href: '/catalogo/vestidos' },
 *       { label: 'Vestido denim con bordados' }, // último, sin href
 *     ]}
 *   />
 */
export const Breadcrumb = ({ items, separator, showHomeIcon = true }: BreadcrumbProps) => {
  const defaultSeparator = (
    <ChevronRightIcon
      sx={{
        fontSize: 16,
        color: 'text.secondary',
        opacity: 0.6,
      }}
    />
  );

  return (
    <Box
      component="nav"
      aria-label="Navegación de migas de pan"
      sx={{ width: '100%', overflow: 'hidden' }}
    >
      <Stack
        direction="row"
        spacing={0.75}
        sx={{
          alignItems: 'center',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isClickable = (item.href || item.onClick) && !isLast;
          const showHome = showHomeIcon && idx === 0 && item.isHome;

          const content = (
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', flexShrink: 0 }}>
              {showHome && <HomeIcon sx={{ fontSize: 14 }} />}
              <Typography
                variant="body2"
                component="span"
                sx={{
                  fontSize: '0.8125rem',
                  color: isLast ? 'text.primary' : 'text.secondary',
                  fontWeight: isLast ? 500 : 400,
                  whiteSpace: 'nowrap',
                  ...(isLast && {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: { xs: 180, sm: 320 },
                    display: 'block',
                  }),
                }}
              >
                {item.label}
              </Typography>
            </Stack>
          );

          return (
            <Fragment key={`${idx}-${typeof item.label === 'string' ? item.label : idx}`}>
              {isClickable ? (
                <Box
                  component={item.href ? 'a' : 'button'}
                  href={item.href}
                  onClick={item.onClick}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'color 200ms',
                    '&:hover': {
                      '& > * > span, & > span': {
                        color: 'primary.main',
                      },
                      '& svg': {
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  {content}
                </Box>
              ) : (
                content
              )}
              {!isLast && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  {separator ?? defaultSeparator}
                </Box>
              )}
            </Fragment>
          );
        })}
      </Stack>
    </Box>
  );
};
