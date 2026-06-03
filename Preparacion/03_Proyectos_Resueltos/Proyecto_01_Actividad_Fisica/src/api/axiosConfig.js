import axios from 'axios'; // Importa axios para consumir la API.

const api = axios.create({ // Crea una instancia reutilizable de axios.
  baseURL: 'http://localhost:8081/api' // Define la URL base del backend; cambia esto si tu API usa otro puerto o prefijo.
}); // Finaliza configuracion base.

api.interceptors.request.use((config) => { // Intercepta cada peticion antes de enviarla.
  const token = localStorage.getItem('token'); // Lee el token guardado despues del login.
  if (token) { // Verifica si existe token.
    config.headers.Authorization = `Bearer ${token}`; // Adjunta el token en el header que espera Spring Security.
  } // Cierra condicion.
  return config; // Devuelve la configuracion actualizada para que continue la peticion.
}); // Finaliza interceptor de request.

api.interceptors.response.use( // Define comportamiento global para respuestas.
  (response) => response, // Si la respuesta fue exitosa, se devuelve sin cambios.
  (error) => { // Si ocurre error, entra aqui.
    if (error.response?.status === 401) { // Si el backend responde no autorizado.
      localStorage.removeItem('token'); // Borra token invalido o expirado.
      window.location.href = '/login'; // Manda al usuario al login.
    } // Cierra condicion.
    return Promise.reject(error); // Mantiene el error para que la pagina tambien pueda manejarlo.
  } // Cierra funcion de error.
); // Cierra interceptor de response.

export default api; // Exporta la instancia para todos los servicios.

