// Hook de autenticacion.
import { useAuthContext } from './useAuthContext'

// Utilidad reutilizable para permisos.
import { hasPermission } from '../utils/permissions'

// Hook para validar un permiso concreto.
export const usePermission = (permission) => {
  // Se obtiene el usuario autenticado.
  const { user, isAuthenticated } = useAuthContext()

  // Se valida si el usuario tiene el permiso solicitado.
  const isAuthorized = hasPermission(user, permission)

  // Se retorna autenticacion y autorizacion.
  return {
    // true si hay token guardado.
    isAuthenticated,

    // true si el permiso existe en usuario o token.
    isAuthorized,
  }
}

