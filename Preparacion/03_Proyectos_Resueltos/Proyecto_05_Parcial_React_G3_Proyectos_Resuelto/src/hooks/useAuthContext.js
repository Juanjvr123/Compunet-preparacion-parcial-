// useContext permite leer el contexto.
import { useContext } from 'react'

// Se importa el contexto de autenticacion.
import { AuthContext } from '../context/AuthContext'

// Hook propio para acceder a autenticacion.
export const useAuthContext = () => {
  // Se lee el contexto actual.
  const context = useContext(AuthContext)

  // Si context es null, el hook se uso fuera de AuthProvider.
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider')
  }

  // Se retorna user, token, tokenType, isAuthenticated, login y logout.
  return context
}

