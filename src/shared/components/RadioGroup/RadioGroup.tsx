import { type ReactNode } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
  Stack,
} from '@mui/material';

export type RadioOption = {
  /** Valor único que identifica la opción. */
  value: string;
  /** Etiqueta visible al lado del radio. */
  label: ReactNode;
  /** Descripción opcional debajo del label. */
  description?: string;
  /** Si esta opción específica está deshabilitada. */
  disabled?: boolean;
};

export type RadioGroupProps = {
  /** Label del grupo entero (ej: "Método de envío"). */
  label?: string;
  /** Opciones disponibles. */
  options: RadioOption[];
  /** Valor seleccionado actualmente. */
  value?: string;
  /** Handler cuando cambia la selección. */
  onChange?: (value: string) => void;
  /** Texto de ayuda debajo del grupo. */
  helperText?: string;
  /** Estado de error. */
  error?: boolean;
  /** Mensaje de error. */
  errorMessage?: string;
  /** Si todo el grupo está deshabilitado. */
  disabled?: boolean;
  /** Si el campo es obligatorio. */
  required?: boolean;
  /** Orientación. Default: vertical. */
  direction?: 'horizontal' | 'vertical';
  /** Nombre del campo para forms. */
  name?: string;
};

/**
 * Grupo de radio buttons. El usuario selecciona UNA opción.
 *
 * Se usa cuando hay 2-5 opciones excluyentes. Si son más, mejor usar Select.
 *
 * @example
 *   <RadioGroup
 *     label="Método de envío"
 *     value={shippingMethod}
 *     onChange={setShippingMethod}
 *     options={[
 *       { value: 'standard', label: 'Estándar', description: '$2.500 - 3 a 5 días' },
 *       { value: 'fast', label: 'Rápido', description: '$4.000 - 1 a 2 días' },
 *       { value: 'pickup', label: 'Retiro en taller', description: 'Gratis' },
 *     ]}
 *   />
 */
export const RadioGroup = ({
  label,
  options,
  value,
  onChange,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  required = false,
  direction = 'vertical',
  name,
}: RadioGroupProps) => {
  const displayHelperText = error && errorMessage ? errorMessage : helperText;

  return (
    <FormControl error={error} disabled={disabled} required={required} component="fieldset">
      {label && (
        <FormLabel
          component="legend"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: 1,
            color: error ? 'error.main' : 'text.primary',
            '&.Mui-focused': {
              color: error ? 'error.main' : 'text.primary',
            },
          }}
        >
          {label}
        </FormLabel>
      )}
      <MuiRadioGroup
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        row={direction === 'horizontal'}
        name={name}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            control={
              <Radio
                color={error ? 'error' : 'primary'}
                sx={{
                  '&.Mui-checked': {
                    color: error ? 'error.main' : 'primary.main',
                  },
                }}
              />
            }
            label={
              <Stack spacing={0.25} sx={{ paddingTop: option.description ? '4px' : 0 }}>
                <span style={{ fontSize: '0.875rem' }}>{option.label}</span>
                {option.description && (
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--mui-palette-text-secondary)',
                    }}
                  >
                    {option.description}
                  </span>
                )}
              </Stack>
            }
            sx={{
              alignItems: option.description ? 'flex-start' : 'center',
              marginX: 0,
              marginY: 0.5,
              gap: 1,
            }}
          />
        ))}
      </MuiRadioGroup>
      {displayHelperText && <FormHelperText>{displayHelperText}</FormHelperText>}
    </FormControl>
  );
};
