import { type ReactNode } from 'react';

import {
  FormControlLabel,
  FormHelperText,
  Switch as MuiSwitch,
  Stack,
  Typography,
} from '@mui/material';

export type SwitchSize = 'small' | 'medium';

export type SwitchProps = {
  /** Si está activado (controlado). */
  checked?: boolean;
  /** Handler de cambio. */
  onChange?: (checked: boolean) => void;
  /** Label principal. */
  label?: ReactNode;
  /** Descripción opcional debajo del label. */
  description?: string;
  /** Tamaño. Default: 'medium' */
  size?: SwitchSize;
  /** Texto de ayuda debajo del switch. */
  helperText?: string;
  /** Si está deshabilitado. */
  disabled?: boolean;
  /** Posición del label. Default: 'end' (a la derecha) */
  labelPosition?: 'start' | 'end';
  /** Nombre para forms. */
  name?: string;
  /** ID HTML. */
  id?: string;
  /** A11y cuando no hay label. */
  'aria-label'?: string;
};

/**
 * Switch (toggle) para opciones booleanas.
 *
 * Diferencia con Checkbox: el switch se siente más "instantáneo" y se usa
 * para configuraciones que afectan el sistema inmediatamente (ej: dark mode,
 * notificaciones). El checkbox se usa más en formularios estáticos.
 *
 * @example
 *   <Switch
 *     checked={isFeatured}
 *     onChange={setIsFeatured}
 *     label="Producto destacado"
 *     description="Aparece en la home"
 *   />
 */
export const Switch = ({
  checked,
  onChange,
  label,
  description,
  size = 'medium',
  helperText,
  disabled = false,
  labelPosition = 'end',
  name,
  id,
  'aria-label': ariaLabel,
}: SwitchProps) => {
  const switchControl = (
    <MuiSwitch
      checked={checked ?? false}
      onChange={(e) => onChange?.(e.target.checked)}
      disabled={disabled}
      size={size}
      name={name}
      id={id}
      color="primary"
      aria-label={ariaLabel}
      sx={{
        // El thumb (círculo) tiene sombra sutil para mejor contraste
        '& .MuiSwitch-thumb': {
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
        // En modo dark, el thumb cuando está apagado es un poco más oscuro
        '& .MuiSwitch-switchBase:not(.Mui-checked) .MuiSwitch-thumb': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? theme.palette.grey[300] : '#FFFFFF',
        },
        // Track más oscuro en off para mejor contraste con el thumb blanco
        '& .MuiSwitch-track': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400],
          opacity: 1,
        },
        // Track cuando está ON usa el primary (terracota)
        '& .Mui-checked + .MuiSwitch-track': {
          backgroundColor: 'primary.main !important',
          opacity: '1 !important',
        },
        // Disabled: todo más tenue
        '& .Mui-disabled .MuiSwitch-thumb': {
          backgroundColor: (theme) => theme.palette.grey[200],
        },
        '& .Mui-disabled + .MuiSwitch-track': {
          opacity: '0.4 !important',
        },
      }}
    />
  );

  const labelContent =
    label || description ? (
      <Stack spacing={0.25}>
        {label && (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
        )}
        {description && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        )}
      </Stack>
    ) : null;

  return (
    <Stack spacing={0.5}>
      {labelContent ? (
        <FormControlLabel
          control={switchControl}
          label={labelContent}
          labelPlacement={labelPosition}
          disabled={disabled}
          sx={{
            margin: 0,
            gap: 1.5,
            justifyContent: labelPosition === 'start' ? 'space-between' : 'flex-start',
            width: labelPosition === 'start' ? '100%' : 'auto',
          }}
        />
      ) : (
        switchControl
      )}
      {helperText && (
        <FormHelperText sx={{ marginLeft: 0, marginTop: 0 }}>{helperText}</FormHelperText>
      )}
    </Stack>
  );
};
