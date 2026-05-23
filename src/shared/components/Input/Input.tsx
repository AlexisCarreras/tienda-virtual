import { type ReactNode } from 'react';

import { type InputBaseComponentProps, TextField, type TextFieldProps } from '@mui/material';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'small' | 'medium';

export type InputProps = {
  /** Label visible arriba del input. */
  label?: string;
  /** Tipo HTML del input. Default: 'text' */
  type?: InputType;
  /** Tamaño visual. Default: 'medium' */
  size?: InputSize;
  /** Valor controlado del input. */
  value?: string | number;
  /** Handler de cambio. */
  onChange?: (value: string) => void;
  /** Placeholder cuando el input está vacío. */
  placeholder?: string;
  /** Texto de ayuda debajo del input (instrucciones, ejemplo). */
  helperText?: string;
  /** Si está en estado de error, cambia visualmente y muestra mensaje. */
  error?: boolean;
  /** Mensaje de error (sobrescribe helperText cuando error=true). */
  errorMessage?: string;
  /** Si el input es obligatorio (agrega asterisco al label). */
  required?: boolean;
  /** Si está deshabilitado. */
  disabled?: boolean;
  /** Si es readonly (visible pero no editable). */
  readOnly?: boolean;
  /** Si ocupa todo el ancho disponible. Default: true */
  fullWidth?: boolean;
  /** Ícono opcional al inicio del input. */
  startIcon?: ReactNode;
  /** Ícono opcional al final del input. */
  endIcon?: ReactNode;
  /** Cantidad máxima de caracteres. */
  maxLength?: number;
  /** Auto-focus al montar. */
  autoFocus?: boolean;
  /** Para autocomplete del navegador (email, password, name, etc). */
  autoComplete?: string;
  /** Nombre del campo (importante para forms). */
  name?: string;
  /** ID HTML del input. */
  id?: string;
  /** Handler de blur (perder foco). */
  onBlur?: () => void;
  /** Handler de focus. */
  onFocus?: () => void;
};

/**
 * Campo de entrada de texto del sistema.
 *
 * Soporta varios tipos de input (email, password, number, etc), estados
 * de error con mensaje, íconos al principio o al final, y todas las
 * variantes que la app necesita.
 *
 * @example
 *   <Input
 *     label="Email"
 *     type="email"
 *     value={email}
 *     onChange={setEmail}
 *     required
 *     autoComplete="email"
 *   />
 *
 *   <Input
 *     label="Contraseña"
 *     type="password"
 *     value={password}
 *     onChange={setPassword}
 *     error={hasError}
 *     errorMessage="La contraseña debe tener al menos 8 caracteres"
 *   />
 */
export const Input = ({
  label,
  type = 'text',
  size = 'medium',
  value,
  onChange,
  placeholder,
  helperText,
  error = false,
  errorMessage,
  required = false,
  disabled = false,
  readOnly = false,
  fullWidth = true,
  startIcon,
  endIcon,
  maxLength,
  autoFocus = false,
  autoComplete,
  name,
  id,
  onBlur,
  onFocus,
}: InputProps) => {
  // El mensaje a mostrar: si hay error y tenemos errorMessage, usamos ese.
  // Si no, mostramos helperText (puede estar vacío).
  const displayHelperText = error && errorMessage ? errorMessage : helperText;

  const inputProps: InputBaseComponentProps = {
    maxLength,
  };

  const slotProps: TextFieldProps['slotProps'] = {
    input: {
      startAdornment: startIcon,
      endAdornment: endIcon,
      readOnly,
    },
    htmlInput: inputProps,
  };

  return (
    <TextField
      label={label}
      type={type}
      size={size}
      value={value ?? ''}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      helperText={displayHelperText}
      error={error}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      name={name}
      id={id}
      onBlur={onBlur}
      onFocus={onFocus}
      variant="outlined"
      slotProps={slotProps}
      sx={{
        // Label flotante con animación
        '& .MuiOutlinedInput-root': {
          borderRadius: 1,
          transition: 'all 200ms',
          // Hover sutil
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'text.primary',
          },
          // Focus state
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
          },
        },
      }}
    />
  );
};
