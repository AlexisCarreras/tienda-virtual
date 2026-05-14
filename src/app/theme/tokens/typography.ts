import { type TypographyVariantsOptions } from '@mui/material/styles';

const FONT_DISPLAY = '"Fraunces Variable", "Times New Roman", serif';
const FONT_BODY = '"Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const typography: TypographyVariantsOptions = {
  fontFamily: FONT_BODY,
  fontSize: 16,
  htmlFontSize: 16,

  // Display / Títulos: Fraunces
  h1: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
  },
  h3: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
    fontSize: '1.5rem',
    lineHeight: 1.25,
  },
  h5: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.3,
  },
  h6: {
    fontFamily: FONT_DISPLAY,
    fontWeight: 500,
    fontSize: '1.125rem',
    lineHeight: 1.35,
  },

  // Body / UI: Inter
  subtitle1: {
    fontFamily: FONT_BODY,
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  subtitle2: {
    fontFamily: FONT_BODY,
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  body1: {
    fontFamily: FONT_BODY,
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontFamily: FONT_BODY,
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  button: {
    fontFamily: FONT_BODY,
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },
  caption: {
    fontFamily: FONT_BODY,
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
  },
  overline: {
    fontFamily: FONT_BODY,
    fontWeight: 600,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
};
