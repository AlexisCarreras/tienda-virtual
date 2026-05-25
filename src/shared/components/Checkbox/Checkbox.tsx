import { type ReactNode } from 'react';

import { FormControlLabel, FormHelperText, Checkbox as MuiCheckbox, Stack } from '@mui/material';

export type CheckboxProps = {
  /** Si está marcado (controlado). */
  checked?: boolean;
  /** Handler de cambio. */
  onChange?: (checked: boolean) => void;
  /** Label visible al lado del checkbox. */
  label?: ReactNode;
  /** Texto de ayuda debajo. */
  helperText?: string;
  /** Estado de error. */
  error?: boolean;
  /** Mensaje de error (sobrescribe helperText). */
  errorMessage?: string;
  /** Si está deshabilitado. */
  disabled?: boolean;
  /** Para forms. */
  name?: string;
  /** ID HTML. */
  id?: string;
  /** A11y label cuando no hay label visible. */
  'aria-label'?: string;
};

/**
 * Checkbox del sistema.
 * Para opciones booleanas (sí/no) o selección múltiple en listas.
 *
 * @example
 *   <Checkbox
 *     checked={accepted}
 *     onChange={setAccepted}
 *     label="Acepto los términos y condiciones"
 *   />
 *
 *   <Checkbox
 *     checked={isFeatured}
 *     onChange={setIsFeatured}
 *     label="Producto destacado"
 *     helperText="Aparece en la home"
 *   />
 */
export const Checkbox = ({
  checked,
  onChange,
  label,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  name,
  id,
  'aria-label': ariaLabel,
}: CheckboxProps) => {
  const displayHelperText = error && errorMessage ? errorMessage : helperText;

  const checkbox = (
    <MuiCheckbox
      checked={checked ?? false}
      onChange={(e) => onChange?.(e.target.checked)}
      disabled={disabled}
      name={name}
      id={id}
      color={error ? 'error' : 'primary'}
      aria-label={ariaLabel}
      sx={{
        '&.Mui-checked': {
          color: error ? 'error.main' : 'primary.main',
        },
      }}
    />
  );

  return (
    <Stack spacing={0.5}>
      {label ? (
        <FormControlLabel
          control={checkbox}
          label={label}
          disabled={disabled}
          sx={{
            margin: 0,
            gap: 1,
            '& .MuiFormControlLabel-label': {
              fontSize: '0.875rem',
              color: error ? 'error.main' : 'text.primary',
            },
          }}
        />
      ) : (
        checkbox
      )}
      {displayHelperText && (
        <FormHelperText
          error={error}
          sx={{
            marginLeft: label ? '32px' : 0,
            marginTop: 0,
          }}
        >
          {displayHelperText}
        </FormHelperText>
      )}
    </Stack>
  );
};
