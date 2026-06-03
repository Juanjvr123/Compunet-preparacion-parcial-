// Se importa createContext para crear un contexto global.
import { createContext } from 'react'

// Se crea el contexto de autenticacion.
const AuthContext = createContext(null)

// Se exporta para usarlo en provider y hook.
export default AuthContext

