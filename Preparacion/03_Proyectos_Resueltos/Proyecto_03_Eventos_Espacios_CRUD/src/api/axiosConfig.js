// Se importa Axios.
import axios from 'axios'

// Se crea instancia central.
const api = axios.create({
  // URL base configurable por .env.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
})

// Interceptor para adjuntar JWT.
api.interceptors.request.use((config) => {
  // Se lee token guardado por el login de la app principal.
  const token = localStorage.getItem('token')

  // Si existe token, se agrega al header.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Se retorna la configuracion.
  return config
})

// Se exporta api.
export default api

