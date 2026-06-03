// Navigate redirige usuarios no autorizados.
import { Navigate } from 'react-router-dom'

// useAuth permite leer el rol actual.
import { useAuth } from '../hooks/useAuth'

// Componente para proteger por rol.
const RoleRoute = ({ allowedRoles, children }) => {
  // Se obtiene el usuario autenticado.
  const { user } = useAuth()

  // Sin usuario no hay acceso.
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si el rol no esta permitido, vuelve al dashboard.
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  // Si el rol coincide, muestra la pagina.
  return children
}

// Se exporta para usarlo en App.jsx.
export default RoleRoute

