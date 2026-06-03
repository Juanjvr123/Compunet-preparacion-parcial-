// createContext crea el contexto global de autenticacion.
import { createContext, useCallback, useMemo, useState } from 'react'

// Claves de localStorage centralizadas.
import { STORAGE_KEYS } from '../config/apiConfig'

// Utilidad para leer claims del JWT.
import { decodeJwtPayload } from '../utils/token'

// Se crea el contexto; empieza en null para detectar usos fuera del provider.
export const AuthContext = createContext(null)

// Lee JSON desde localStorage sin romper si esta corrupto.
const readJsonFromStorage = (key) => {
  // Se obtiene el valor crudo guardado.
  const storedValue = localStorage.getItem(key)

  // Si no hay valor, se retorna null.
  if (!storedValue) {
    return null
  }

  try {
    // Se convierte de texto JSON a objeto.
    return JSON.parse(storedValue)
  } catch {
    // Si el JSON esta mal formado, se ignora.
    return null
  }
}

// Construye el usuario que se guarda despues del login.
const buildUserFromLoginResponse = (loginResponse) => {
  // Se toma el accessToken exacto de la respuesta del PDF.
  const token = loginResponse.accessToken

  // Se decodifica el token para buscar roles o permisos.
  const claims = decodeJwtPayload(token)

  // Se retorna un objeto de usuario normalizado.
  return {
    // id puede venir en la respuesta de login.
    id: loginResponse.id,

    // username puede venir en la respuesta de login.
    username: loginResponse.username,

    // email puede venir en la respuesta de login.
    email: loginResponse.email,

    // name y lastname sirven para mostrar nombre en la interfaz.
    name: loginResponse.name,

    // lastname se conserva por si se quiere pintar nombre completo.
    lastname: loginResponse.lastname,

    // permissions se toma de varios posibles nombres del token.
    permissions: claims?.permissions || claims?.authorities || claims?.roles || claims?.role || claims?.scope || [],

    // claims guarda el payload completo para adaptar si el backend usa otro campo.
    claims,

    // systemHomePage queda disponible si se quiere navegar al sistema externo.
    systemHomePage: loginResponse.systemHomePage,
  }
}

// Provider que envuelve toda la aplicacion.
const AuthProvider = ({ children }) => {
  // Token JWT persistido en localStorage.
  const [token, setToken] = useState(localStorage.getItem(STORAGE_KEYS.token))

  // Tipo de token, normalmente Bearer.
  const [tokenType, setTokenType] = useState(localStorage.getItem(STORAGE_KEYS.tokenType) || 'Bearer')

  // Usuario autenticado persistido en localStorage.
  const [user, setUser] = useState(() => readJsonFromStorage(STORAGE_KEYS.user))

  // isAuthenticated queda true cuando existe token.
  const isAuthenticated = Boolean(token)

  // Guarda sesion despues de login exitoso.
  const login = useCallback((loginResponse) => {
    // accessToken es obligatorio segun el PDF.
    const nextToken = loginResponse.accessToken

    // tokenType normalmente llega como Bearer.
    const nextTokenType = loginResponse.tokenType || 'Bearer'

    // Se construye el usuario normalizado.
    const nextUser = buildUserFromLoginResponse(loginResponse)

    // Se actualiza el estado de React.
    setToken(nextToken)

    // Se actualiza el tipo de token.
    setTokenType(nextTokenType)

    // Se actualiza el usuario.
    setUser(nextUser)

    // Se guarda el token en localStorage para recargar sin perder sesion.
    localStorage.setItem(STORAGE_KEYS.token, nextToken)

    // Se guarda tokenType porque el enunciado pide usar accessToken junto con tokenType.
    localStorage.setItem(STORAGE_KEYS.tokenType, nextTokenType)

    // Se guarda usuario y permisos normalizados.
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser))

    // Se retorna el usuario por si LoginPage necesita tomar una decision.
    return nextUser
  }, [])

  // Cierra sesion y limpia datos persistidos.
  const logout = useCallback(() => {
    // Limpia estado de token.
    setToken(null)

    // Restaura Bearer como valor por defecto.
    setTokenType('Bearer')

    // Limpia usuario.
    setUser(null)

    // Elimina token del navegador.
    localStorage.removeItem(STORAGE_KEYS.token)

    // Elimina tipo de token.
    localStorage.removeItem(STORAGE_KEYS.tokenType)

    // Elimina usuario.
    localStorage.removeItem(STORAGE_KEYS.user)
  }, [])

  // Objeto compartido por el contexto.
  const value = useMemo(
    () => ({
      // Usuario actual.
      user,

      // Token actual.
      token,

      // Tipo de token actual.
      tokenType,

      // Booleano para rutas protegidas.
      isAuthenticated,

      // Funcion de login.
      login,

      // Funcion de logout.
      logout,
    }),
    [user, token, tokenType, isAuthenticated, login, logout],
  )

  // Se entrega el contexto a toda la aplicacion.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Se exporta el provider como default.
export default AuthProvider
