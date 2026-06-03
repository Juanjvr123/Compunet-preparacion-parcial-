// Componentes visuales de Material UI.
import { Box, CircularProgress, Typography } from '@mui/material'

// Estado visible de carga exigido por el parcial.
const LoadingState = ({ message = 'Cargando informacion...' }) => {
  // Se retorna una caja centrada con spinner.
  return (
    <Box
      sx={{
        // Espaciado vertical para que no quede pegado al encabezado.
        py: 8,

        // Distribucion vertical.
        display: 'flex',

        // Alinea elementos al centro.
        alignItems: 'center',

        // Centra horizontalmente.
        justifyContent: 'center',

        // Separa spinner y texto.
        gap: 2,
      }}
    >
      {/* Spinner visual para indicar carga. */}
      <CircularProgress size={30} />

      {/* Mensaje adaptable; cambia el texto si el parcial usa otro recurso. */}
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  )
}

// Se exporta para usarlo en ProjectsPage.
export default LoadingState

