// Se importa Axios.
import axios from 'axios'

// Se crea una instancia central.
const api = axios.create({
  // URL base desde .env o local.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
})

// Interceptor para token JWT.
api.interceptors.request.use((config) => {
  // Se obtiene el token almacenado.
  const token = localStorage.getItem('token')

  // Si hay token, se envia como Bearer.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Se devuelve la configuracion.
  return config
})

// Se exporta la instancia.
export default api

