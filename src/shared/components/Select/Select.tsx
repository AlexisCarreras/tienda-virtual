import { type ReactNode } from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';

export type SelectOption<T extends string | number = string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type SelectSize = 'small' | 'medium';

export type SelectProps<T extends string | number = string> = {
  /** Label visible arriba del select. */
  label?: string;
  /** Opciones disponibles. */
  options: SelectOption<T>[];
  /** Valor seleccionado. */
  value?: T;
  /** Handler de cambio. */
  onChange?: (value: T) => void;
  /** Texto cuando no hay nada seleccionado. */
  placeholder?: string;
  /** Texto de ayuda debajo. */
  helperText?: string;
  /** Estado de error. */
  error?: boolean;
  /** Mensaje de error. */
  errorMessage?: string;
  /** Si es obligatorio. */
  required?: boolean;
  /** Si está deshabilitado. */
  disabled?: boolean;
  /** Si ocupa todo el ancho. Default: true */
  fullWidth?: boolean;
  /** Tamaño. Default: 'medium' */
  size?: SelectSize;
  /** Nombre del campo. */
  name?: string;
  /** ID HTML. */
  id?: string;
};

/**
 * Select del sistema. Para elegir UNA opción de una lista.
 *
 * Cuando hay 2-5 opciones, considerá usar RadioGroup (más visible).
 * Cuando hay 6+ opciones, Select es mejor (más compacto).
 *
 * El tipo genérico T te permite tipar el valor: si las opciones son números,
 * el value y onChange manejan números; si son strings, manejan strings.
 *
 * @example
 *   <Select
 *     label="Ordenar por"
 *     value={sortBy}
 *     onChange={setSortBy}
 *     options={[
 *       { value: 'recent', label: 'Más recientes' },
 *       { value: 'price-asc', label: 'Precio: menor a mayor' },
 *     ]}
 *   />
 */
export const Select = <T extends string | number = string>({
  label,
  options,
  value,
  onChange,
  placeholder,
  helperText,
  error = false,
  errorMessage,
  required = false,
  disabled = false,
  fullWidth = true,
  size = 'medium',
  name,
  id,
}: SelectProps<T>) => {
  const displayHelperText = error && errorMessage ? errorMessage : helperText;
  const labelId = id ? `${id}-label` : undefined;

  // Si hay placeholder o ya hay value seleccionado, el label debe estar
  // siempre flotando arriba (no superpuesto con el placeholder).
  const hasPlaceholder = Boolean(placeholder);
  const hasValue = value !== undefined && value !== '';
  const shouldShrinkLabel = hasPlaceholder || hasValue;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      disabled={disabled}
      size={size}
    >
      {label && (
        <InputLabel id={labelId} shrink={shouldShrinkLabel}>
          {label}
        </InputLabel>
      )}
      <MuiSelect
        labelId={labelId}
        id={id}
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value as T)}
        // El label se pasa con espacios o vacío según si debe achicarse
        // para que MUI dibuje correctamente el "notch" (corte en el borde)
        label={shouldShrinkLabel ? label : undefined}
        notched={shouldShrinkLabel}
        displayEmpty
        name={name}
        renderValue={(selected) => {
          if (selected === '' || selected === undefined) {
            return (
              <span style={{ color: 'var(--mui-palette-text-secondary)', opacity: 0.6 }}>
                {placeholder ?? ''}
              </span>
            );
          }
          const option = options.find((o) => o.value === selected);
          return option?.label ?? String(selected);
        }}
        sx={{
          borderRadius: 1,
          '& .MuiOutlinedInput-notchedOutline': {
            transition: 'all 200ms',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'text.primary',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={String(option.value)} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {displayHelperText && <FormHelperText>{displayHelperText}</FormHelperText>}
    </FormControl>
  );
};
