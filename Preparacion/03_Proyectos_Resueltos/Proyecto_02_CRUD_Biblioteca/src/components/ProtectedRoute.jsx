// Navigate permite cambiar de ruta desde React.
import { Navigate } from 'react-router-dom'

// Se importa el hook de autenticacion.
import { useAuth } from '../hooks/useAuth'

// Componente que protege paginas privadas.
const ProtectedRoute = ({ children }) => {
  // Se obtiene el usuario actual.
  const { user } = useAuth()

  // Si no hay usuario, se redirige al login.
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si hay usuario, se muestra la pagina solicitada.
  return children
}

// Se exporta el componente.
export default ProtectedRoute

