// Se importa la instancia central de Axios.
import api from '../api/axiosConfig'

// Endpoint base de libros.
const endpoint = '/books'

// Servicio con CRUD completo de libros.
export const bookService = {
  // GET /books lista todos los libros.
  getAll: async () => {
    // Se consulta el backend.
    const response = await api.get(endpoint)

    // Se retorna el cuerpo de respuesta.
    return response.data
  },

  // GET /books/{id} consulta un libro.
  getById: async (id) => {
    // Se usa el id dentro de la URL.
    const response = await api.get(`${endpoint}/${id}`)

    // Se retorna el libro encontrado.
    return response.data
  },

  // POST /books crea un libro.
  create: async (book) => {
    // Se envia el formulario al backend.
    const response = await api.post(endpoint, book)

    // Se retorna el libro creado.
    return response.data
  },

  // PUT /books/{id} actualiza un libro completo.
  update: async (id, book) => {
    // Se envia el id y todos los campos editables.
    const response = await api.put(`${endpoint}/${id}`, book)

    // Se retorna el libro actualizado.
    return response.data
  },

  // DELETE /books/{id} elimina un libro.
  remove: async (id) => {
    // Se llama el endpoint de eliminacion.
    await api.delete(`${endpoint}/${id}`)
  },
}

