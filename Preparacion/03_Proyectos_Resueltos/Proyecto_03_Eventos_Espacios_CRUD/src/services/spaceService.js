// Se importa api para consultar backend.
import api from '../api/axiosConfig'

// Servicio simple de espacios.
export const spaceService = {
  // GET /spaces lista espacios disponibles.
  getAll: async () => {
    // Se consulta el endpoint de espacios.
    const response = await api.get('/spaces')

    // Se retorna la lista.
    return response.data
  },
}

