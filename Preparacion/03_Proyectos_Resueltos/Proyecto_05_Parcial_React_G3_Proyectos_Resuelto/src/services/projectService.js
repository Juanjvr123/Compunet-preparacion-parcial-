// Cliente fetch reutilizable.
import { requestJson } from '../api/client'

// Configuracion central de endpoints e imagenes.
import {
  PROJECT_IMAGE_BASE_URL,
  PROJECT_MANAGER_URL,
  PROJECTS_API_BASE_URL,
  PROJECTS_PATH,
} from '../config/apiConfig'

// Construye el header Authorization esperado por el backend.
const buildAuthorizationHeader = ({ token, tokenType }) => {
  // Si no hay token, se retorna undefined para evitar enviar Authorization vacio.
  if (!token) {
    return undefined
  }

  // tokenType normalmente es Bearer; si no llega, se usa Bearer por defecto.
  return `${tokenType || 'Bearer'} ${token}`
}

// Consulta proyectos con GET /projects.
export const getProjects = async ({ token, tokenType }) => {
  // URL completa del endpoint protegido de proyectos.
  const url = `${PROJECTS_API_BASE_URL}${PROJECTS_PATH}`

  // Header de autorizacion listo para enviar.
  const authorization = buildAuthorizationHeader({ token, tokenType })

  // Se ejecuta la peticion protegida.
  return requestJson(url, {
    // GET consulta datos y no modifica el backend.
    method: 'GET',

    // Headers requeridos por el PDF.
    headers: {
      // Accept indica que esperamos JSON.
      Accept: 'application/json',

      // Authorization usa tokenType + accessToken.
      ...(authorization ? { Authorization: authorization } : {}),
    },
  })
}

// Construye la URL completa para la imagen de un proyecto.
export const buildProjectImageUrl = (imageUrl) => {
  // Si imageUrl viene null o vacio, no se intenta cargar imagen remota.
  if (!imageUrl || !imageUrl.trim()) {
    return ''
  }

  // Si el backend ya entrega una URL completa, se usa sin modificar.
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // Si imageUrl viene como /files/imagen.png, se concatena con /public.
  return `${PROJECT_IMAGE_BASE_URL}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`
}

// Construye una URL de visualizacion de encuestas asociadas al proyecto.
export const buildProjectSurveyUrl = (project) => {
  // Si el docente entrega otra ruta real, cambia esta funcion.
  return `${PROJECT_MANAGER_URL}/projects/${project.id}`
}

// Construye una URL para crear entrevistas del proyecto.
export const buildCreateInterviewUrl = (project) => {
  // Si el backend entrega otra ruta, cambia solo esta funcion.
  return `${PROJECT_MANAGER_URL}/projects/${project.id}/interviews/create`
}
