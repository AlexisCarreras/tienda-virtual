import { Box, CircularProgress } from '@mui/material';

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
