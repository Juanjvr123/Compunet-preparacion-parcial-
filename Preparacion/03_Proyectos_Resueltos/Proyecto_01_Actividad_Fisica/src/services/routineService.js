import api from '../api/axiosConfig.js'; // Importa axios con token.

export const getMyRoutines = async () => { // Obtiene rutinas del usuario autenticado.
  const response = await api.get('/routines/my'); // Llama endpoint del backend.
  return response.data.content || response.data; // Soporta respuesta paginada o arreglo directo.
}; // Cierra funcion.

export const updateProgress = async (progressId, data) => { // Actualiza progreso existente.
  const response = await api.put(`/progress/${progressId}`, data); // Envia datos nuevos al backend.
  return response.data; // Devuelve progreso actualizado.
}; // Cierra funcion.

