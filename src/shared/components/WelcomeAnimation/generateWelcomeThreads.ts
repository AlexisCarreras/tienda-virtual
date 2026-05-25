export type WelcomeAnimationThread = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  length: number;
  color: 'primary' | 'secondary';
  thickness: number;
  swayAmount: number;
  swayDirection: 1 | -1;
  opacity: number;
};

/**
 * Helper para generar la configuración aleatoria de hilos.
 * Función pura externa: se llama solo cuando el padre necesita generar threads.
 *
 * Vive en su propio archivo para no romper el Fast Refresh de Vite
 * (los archivos con componentes deben exportar solo componentes).
 *
 * @example
 *   const handlePlay = () => {
 *     setThreads(generateWelcomeThreads(28))
 *     setOpen(true)
 *   }
 */
export const generateWelcomeThreads = (count: number): WelcomeAnimationThread[] => {
  return Array.from({ length: count }, (_, id) => {
    // 30% de hilos largos (visualmente protagónicos), 70% más cortos (acompañamiento)
    const isLong = Math.random() < 0.3;
    const length = isLong ? 120 + Math.random() * 100 : 50 + Math.random() * 60;

    // Grosor variable: hay hilos finitos y otros más definidos
    const thickness = isLong ? 2 + Math.random() * 1 : 1.2 + Math.random() * 0.8;

    // 60% terracota (color de marca principal), 40% mostaza
    const color = Math.random() < 0.6 ? 'primary' : 'secondary';

    // Opacidad variable según el tipo: largos más visibles, cortos más sutiles
    const opacity = isLong ? 0.6 + Math.random() * 0.2 : 0.35 + Math.random() * 0.25;

    return {
      id,
      left: Math.random() * 100,
      delay: Math.random() * 1800,
      duration: 2500 + Math.random() * 1800,
      length,
      color,
      thickness,
      swayAmount: 15 + Math.random() * 35,
      swayDirection: Math.random() > 0.5 ? 1 : -1,
      opacity,
    };
  });
};
