import { type PaletteOptions } from '@mui/material';

const brandColors = {
  terracota: {
    light: '#D9663D',
    main: '#B4521E',
    dark: '#8C3D14',
  },
  mostaza: {
    light: '#E8B968',
    main: '#D4A04C',
    dark: '#A87E36',
  },
  denim: {
    light: '#5A7AA8',
    main: '#2B4865',
    dark: '#1B2F45',
  },
  crudo: {
    100: '#FAF7F2',
    200: '#F0EBE2',
    300: '#E8E0D5',
    400: '#A39A91',
    500: '#5C544E',
  },
  carbon: {
    100: '#3A332D',
    200: '#252118',
    300: '#1A1614',
  },
};

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    light: brandColors.terracota.light,
    main: brandColors.terracota.main,
    dark: brandColors.terracota.dark,
    contrastText: '#FFFFFF',
  },
  secondary: {
    light: brandColors.mostaza.light,
    main: brandColors.mostaza.main,
    dark: brandColors.mostaza.dark,
    contrastText: brandColors.carbon[300],
  },
  background: {
    default: brandColors.crudo[100],
    paper: '#FFFFFF',
  },
  text: {
    primary: brandColors.carbon[300],
    secondary: brandColors.crudo[500],
  },
  divider: brandColors.crudo[300],
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    light: '#E88564',
    main: brandColors.terracota.light,
    dark: brandColors.terracota.main,
    contrastText: brandColors.carbon[300],
  },
  secondary: {
    light: '#F0CC85',
    main: brandColors.mostaza.light,
    dark: brandColors.mostaza.main,
    contrastText: brandColors.carbon[300],
  },
  background: {
    default: brandColors.carbon[300],
    paper: brandColors.carbon[200],
  },
  text: {
    primary: brandColors.crudo[100],
    secondary: brandColors.crudo[400],
  },
  divider: brandColors.carbon[100],
};

export { brandColors };
