// Navigate redirige a otra ruta.
import { Navigate, Outlet } from 'react-router-dom'

// Hook de autenticacion.
import { useAuthContext } from '../../hooks/useAuthContext'

// Ruta protegida para paginas que requieren token.
const ProtectedRoute = () => {
  // Se consulta si hay sesion activa.
  const { isAuthenticated } = useAuthContext()

  // Si no hay token, se redirige al login.
  if (!isAuthenticated) {
    return <Navigate replace to="/login" />
  }

  // Si hay token, se muestra la ruta hija.
  return <Outlet />
}

// Se exporta para usarlo en main.jsx.
export default ProtectedRoute

