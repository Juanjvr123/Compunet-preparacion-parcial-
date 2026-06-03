// Se importa la instancia de Axios.
import api from '../api/axiosConfig'

// Endpoint base de tickets.
const endpoint = '/tickets'

// Servicio CRUD de tickets.
export const ticketService = {
  // GET /tickets lista todas las solicitudes.
  getAll: async () => {
    // Se consulta el backend.
    const response = await api.get(endpoint)

    // Se retorna la lista.
    return response.data
  },

  // POST /tickets crea una solicitud.
  create: async (ticket) => {
    // Se envia el formulario.
    const response = await api.post(endpoint, ticket)

    // Se retorna el ticket creado.
    return response.data
  },

  // PUT /tickets/{id} edita una solicitud completa.
  update: async (id, ticket) => {
    // Se envia el id en la ruta.
    const response = await api.put(`${endpoint}/${id}`, ticket)

    // Se retorna el ticket actualizado.
    return response.data
  },

  // PATCH /tickets/{id} cambia el estado.
  changeStatus: async (id, status) => {
    // Se manda solo status porque es una actualizacion parcial.
    const response = await api.patch(`${endpoint}/${id}`, { status })

    // Se retorna el ticket modificado.
    return response.data
  },

  // POST /tickets/{id}/comments agrega comentario.
  addComment: async (id, message) => {
    // Se envia un subrecurso asociado al ticket.
    const response = await api.post(`${endpoint}/${id}/comments`, { message })

    // Se retorna el comentario o ticket actualizado.
    return response.data
  },

  // DELETE /tickets/{id} elimina una solicitud.
  remove: async (id) => {
    // Se elimina en backend.
    await api.delete(`${endpoint}/${id}`)
  },
}

