// useMemo evita recrear el objeto del contexto en cada render.
import { useMemo, useState } from 'react'

// Se importa el contexto.
import AuthContext from './AuthContext'

// Se importa el servicio de autenticacion.
import { authService } from '../services/authService'

// Lee el usuario guardado de forma segura.
const getStoredUser = () => {
  // Se toma el texto guardado en localStorage.
  const storedUser = localStorage.getItem('user')

  // Si no hay usuario, se retorna null.
  if (!storedUser) {
    return null
  }

  try {
    // Se convierte el texto JSON a objeto.
    return JSON.parse(storedUser)
  } catch {
    // Si el JSON esta danado, se ignora.
    return null
  }
}

// Provider que envuelve la aplicacion.
const AuthProvider = ({ children }) => {
  // Estado del usuario autenticado.
  const [user, setUser] = useState(getStoredUser)

  // Estado para indicar que el login esta en proceso.
  const [loading, setLoading] = useState(false)

  // Funcion para iniciar sesion.
  const login = async (credentials) => {
    // Se activa el estado de carga.
    setLoading(true)

    try {
      // Se llama POST /auth/login.
      const data = await authService.login(credentials)

      // Se toma el token de la respuesta.
      const token = data.token || data.accessToken

      // Se toma el usuario si viene incluido.
      const loggedUser = data.user || data

      // Se guarda el token para futuras peticiones.
      localStorage.setItem('token', token)

      // Se guarda el usuario para mantener sesion tras recargar.
      localStorage.setItem('user', JSON.stringify(loggedUser))

      // Se actualiza el estado global.
      setUser(loggedUser)

      // Se retorna el usuario para que Login pueda redirigir.
      return loggedUser
    } finally {
      // Se apaga la carga aunque falle la peticion.
      setLoading(false)
    }
  }

  // Funcion para cerrar sesion.
  const logout = () => {
    // Se elimina el token.
    localStorage.removeItem('token')

    // Se elimina el usuario.
    localStorage.removeItem('user')

    // Se limpia el estado global.
    setUser(null)
  }

  // Valor que comparten todos los componentes.
  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading],
  )

  // Se entrega el contexto a los hijos.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Se exporta el provider.
export default AuthProvider
