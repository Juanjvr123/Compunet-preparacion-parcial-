// Componentes visuales de Material UI.
import { Alert, Box, Button } from '@mui/material'

// Estado visible de error exigido por el parcial.
const ErrorState = ({ message, onRetry }) => {
  // Se retorna un bloque con alerta y boton de reintento.
  return (
    <Box sx={{ py: 4 }}>
      {/* Alert muestra el error de la peticion. */}
      <Alert
        severity="error"
        sx={{
          // Separa alerta del boton.
          mb: 2,
        }}
      >
        {/* Si no llega mensaje, se usa uno generico. */}
        {message || 'Ocurrio un error al consultar la informacion.'}
      </Alert>

      {/* El boton permite volver a ejecutar GET /projects. */}
      <Button variant="outlined" onClick={onRetry}>
        Reintentar
      </Button>
    </Box>
  )
}

// Se exporta para usarlo en ProjectsPage.
export default ErrorState

