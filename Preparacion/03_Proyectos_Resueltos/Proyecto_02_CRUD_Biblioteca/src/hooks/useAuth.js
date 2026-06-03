// Se importa useContext para leer el contexto.
import { useContext } from 'react'

// Se importa el contexto de autenticacion.
import AuthContext from '../context/AuthContext'

// Hook pequeno para no importar useContext en todas partes.
export const useAuth = () => {
  // Se lee el valor actual del contexto.
  const context = useContext(AuthContext)

  // Si se usa fuera del provider, se lanza error claro.
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  // Se retorna usuario, loading, login y logout.
  return context
}

