import { useState } from 'react';

import { useNavigate } from 'react-router';

import { Search as SearchIcon } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { Chip } from '@/shared/components/Chip';
import { Drawer } from '@/shared/components/Drawer';
import { Input } from '@/shared/components/Input';

type HeaderSearchDrawerProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Drawer de búsqueda que se desliza desde la derecha.
 * Input grande de búsqueda + sugerencias populares + búsquedas recientes.
 *
 * Por ahora la búsqueda solo navega a /catalogo con el query.
 * En el módulo 4 vamos a implementar resultados reales en vivo.
 */
export const HeaderSearchDrawer = ({ open, onClose }: HeaderSearchDrawerProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (searchTerm?: string) => {
    const term = searchTerm ?? query;
    if (!term.trim()) return;
    navigate(`/catalogo?q=${encodeURIComponent(term.trim())}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const popularSearches = ['vestidos', 'denim', 'bordados', 'edición especial', 'accesorios'];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="right"
      size="medium"
      title="Buscar productos"
      description="Encontrá lo que buscás en el catálogo"
      icon={<SearchIcon sx={{ color: 'primary.main', fontSize: 20 }} />}
    >
      <Stack spacing={3} onKeyDown={handleKeyDown}>
        <Input autoFocus placeholder="¿Qué estás buscando?" value={query} onChange={setQuery} />

        <Stack spacing={1.5}>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.15em' }}>
            Búsquedas populares
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {popularSearches.map((term) => (
              <Chip key={term} label={term} variant="outline" onClick={() => handleSearch(term)} />
            ))}
          </Box>
        </Stack>
      </Stack>
    </Drawer>
  );
};
