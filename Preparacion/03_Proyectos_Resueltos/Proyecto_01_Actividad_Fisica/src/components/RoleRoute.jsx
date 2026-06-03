import { Alert, Container } from '@mui/material'; // Importa componentes para mostrar mensaje.
import ProtectedRoute from './ProtectedRoute.jsx'; // Reutiliza validacion de login.
import { useAuth } from '../hooks/useAuth.js'; // Importa hook de autenticacion.

const RoleRoute = ({ roles, children }) => { // Define wrapper para rutas por rol.
  const { user } = useAuth(); // Lee usuario actual.

  return ( // Devuelve ruta protegida.
    <ProtectedRoute> {/* Primero exige que exista sesion. */}
      {roles.includes(user?.role) ? ( // Si el rol esta permitido.
        children // Muestra la pagina.
      ) : ( // Si no esta permitido.
        <Container sx={{ mt: 4 }}> {/* Contenedor con margen. */}
          <Alert severity="warning">No tienes permisos para acceder a esta pagina.</Alert> {/* Mensaje claro. */}
        </Container> // Cierra contenedor.
      )} {/* Cierra condicion. */}
    </ProtectedRoute> // Cierra ProtectedRoute.
  ); // Finaliza retorno.
}; // Cierra componente.

export default RoleRoute; // Exporta wrapper.

