// Se importa api para llamadas HTTP.
import api from '../api/axiosConfig'

// Endpoint base de eventos.
const endpoint = '/events'

// Servicio CRUD de eventos.
export const eventService = {
  // GET /events lista todos los eventos.
  getAll: async () => {
    // Se realiza la peticion GET.
    const response = await api.get(endpoint)

    // Se retorna la data.
    return response.data
  },

  // POST /events crea un evento.
  create: async (event) => {
    // Se envia el formulario al backend.
    const response = await api.post(endpoint, event)

    // Se retorna el evento creado.
    return response.data
  },

  // PUT /events/{id} actualiza un evento completo.
  update: async (id, event) => {
    // Se envia el id en la URL.
    const response = await api.put(`${endpoint}/${id}`, event)

    // Se retorna el evento actualizado.
    return response.data
  },

  // PATCH /events/{id} cambia solo algunos campos.
  updateStatus: async (id, active) => {
    // Se envia solo el campo active.
    const response = await api.patch(`${endpoint}/${id}`, { active })

    // Se retorna el evento modificado.
    return response.data
  },

  // DELETE /events/{id} elimina un evento.
  remove: async (id) => {
    // Se llama la eliminacion.
    await api.delete(`${endpoint}/${id}`)
  },
}

