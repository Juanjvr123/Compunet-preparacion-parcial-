import api from '../api/axiosConfig.js'; // Importa instancia axios configurada.

export const login = async (username, password) => { // Exporta funcion de login.
  const response = await api.post('/auth/login', { username, password }); // Envia credenciales al backend.
  return response.data; // Devuelve la respuesta, normalmente { token }.
}; // Cierra funcion.

