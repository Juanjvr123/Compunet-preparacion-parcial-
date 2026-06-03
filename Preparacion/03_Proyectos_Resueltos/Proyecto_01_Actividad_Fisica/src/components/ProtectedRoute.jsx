import { Navigate } from 'react-router-dom'; // Importa Navigate para redireccionar.
import { Box, CircularProgress } from '@mui/material'; // Importa componentes para loading.
import { useAuth } from '../hooks/useAuth.js'; // Importa hook de autenticacion.

const ProtectedRoute = ({ children }) => { // Define wrapper para rutas privadas.
  const { user, loading } = useAuth(); // Obtiene usuario y estado de carga.

  if (loading) { // Si aun se esta leyendo el token.
    return ( // Devuelve spinner centrado.
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}> {/* Caja centrada. */}
        <CircularProgress /> {/* Indicador de carga. */}
      </Box> // Cierra caja.
    ); // Finaliza retorno de loading.
  } // Cierra loading.

  if (!user) { // Si no hay usuario autenticado.
    return <Navigate to="/login" replace />; // Redirige al login.
  } // Cierra condicion.

  return children; // Si hay usuario, muestra la pagina solicitada.
}; // Cierra componente.

export default ProtectedRoute; // Exporta wrapper.

