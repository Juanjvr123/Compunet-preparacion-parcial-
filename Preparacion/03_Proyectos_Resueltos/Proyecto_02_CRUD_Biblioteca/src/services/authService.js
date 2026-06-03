// Se importa api para hacer peticiones al backend.
import api from '../api/axiosConfig'

// Servicio de autenticacion.
export const authService = {
  // POST /auth/login envia credenciales.
  login: async (credentials) => {
    // Se manda email y password al backend.
    const response = await api.post('/auth/login', credentials)

    // Se retorna token y datos de usuario.
    return response.data
  },

  // GET /auth/me consulta el usuario autenticado.
  getProfile: async () => {
    // Se usa GET porque solo consulta informacion.
    const response = await api.get('/auth/me')

    // Se retorna el perfil.
    return response.data
  },
}

