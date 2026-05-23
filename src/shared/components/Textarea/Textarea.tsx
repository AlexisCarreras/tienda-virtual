import { type InputBaseComponentProps, TextField, type TextFieldProps } from '@mui/material';

export type TextareaProps = {
  /** Label visible arriba del campo. */
  label?: string;
  /** Valor controlado. */
  value?: string;
  /** Handler de cambio. */
  onChange?: (value: string) => void;
  /** Placeholder cuando está vacío. */
  placeholder?: string;
  /** Texto de ayuda debajo. */
  helperText?: string;
  /** Estado de error. */
  error?: boolean;
  /** Mensaje de error (sobrescribe helperText). */
  errorMessage?: string;
  /** Campo obligatorio. */
  required?: boolean;
  /** Si está deshabilitado. */
  disabled?: boolean;
  /** Si es solo lectura. */
  readOnly?: boolean;
  /** Si ocupa todo el ancho. Default: true */
  fullWidth?: boolean;
  /** Cantidad mínima de filas visibles. Default: 4 */
  minRows?: number;
  /** Cantidad máxima de filas antes de hacer scroll interno. */
  maxRows?: number;
  /** Cantidad máxima de caracteres. */
  maxLength?: number;
  /** Auto-focus al montar. */
  autoFocus?: boolean;
  /** Nombre del campo. */
  name?: string;
  /** ID HTML. */
  id?: string;
  /** Handler de blur. */
  onBlur?: () => void;
  /** Handler de focus. */
  onFocus?: () => void;
};

/**
 * Campo de texto multilinea.
 * Usar para descripciones largas, notas, mensajes, observaciones, etc.
 *
 * El alto se ajusta automáticamente entre `minRows` y `maxRows`.
 * Si el texto excede `maxRows`, aparece scroll interno.
 *
 * @example
 *   <Textarea
 *     label="Descripción del producto"
 *     value={description}
 *     onChange={setDescription}
 *     minRows={4}
 *     maxRows={10}
 *     maxLength={500}
 *     helperText="Hasta 500 caracteres"
 *   />
 */
export const Textarea = ({
  label,
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
  minRows = 4,
  maxRows,
  maxLength,
  autoFocus = false,
  name,
  id,
  onBlur,
  onFocus,
}: TextareaProps) => {
  const displayHelperText = error && errorMessage ? errorMessage : helperText;

  const inputProps: InputBaseComponentProps = {
    maxLength,
  };

  const slotProps: TextFieldProps['slotProps'] = {
    input: { readOnly },
    htmlInput: inputProps,
  };

  return (
    <TextField
      multiline
      minRows={minRows}
      maxRows={maxRows}
      label={label}
      value={value ?? ''}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      helperText={displayHelperText}
      error={error}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      name={name}
      id={id}
      onBlur={onBlur}
      onFocus={onFocus}
      variant="outlined"
      slotProps={slotProps}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 1,
          transition: 'all 200ms',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'text.primary',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
          },
        },
      }}
    />
  );
};
