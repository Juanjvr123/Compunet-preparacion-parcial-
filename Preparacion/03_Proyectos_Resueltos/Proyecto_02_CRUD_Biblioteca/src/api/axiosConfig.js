// Se importa axios para crear una instancia HTTP.
import axios from 'axios'

// Se crea una instancia con la URL base del backend.
const api = axios.create({
  // VITE_API_URL permite cambiar el backend sin tocar codigo.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
})

// Este interceptor se ejecuta antes de cada peticion.
api.interceptors.request.use((config) => {
  // Se lee el token guardado al iniciar sesion.
  const token = localStorage.getItem('token')

  // Si existe token, se envia en el header Authorization.
  if (token) {
    // Bearer es el formato usual en JWT.
    config.headers.Authorization = `Bearer ${token}`
  }

  // Se devuelve la configuracion modificada.
  return config
})

// Este interceptor se ejecuta despues de cada respuesta.
api.interceptors.response.use(
  // Si no hay error, se retorna la respuesta.
  (response) => response,
  // Si hay error, se maneja de forma basica.
  (error) => {
    // 401 indica sesion vencida o token invalido.
    if (error.response?.status === 401) {
      // Se elimina el token local.
      localStorage.removeItem('token')

      // Se elimina el usuario local.
      localStorage.removeItem('user')
    }

    // Se devuelve el error para que la pagina muestre mensaje.
    return Promise.reject(error)
  },
)

// Se exporta api para servicios.
export default api

