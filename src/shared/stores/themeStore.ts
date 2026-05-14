import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type ThemeMode } from '@/app/theme';

type ThemeState = {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
};

/**
 * Obtiene el modo inicial respetando la preferencia del SO del usuario.
 * Si no hay window (SSR), retorna 'light' como fallback.
 */
const getInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: getInitialMode(),
      toggleMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'theme-mode', // key del localStorage
    },
  ),
);
