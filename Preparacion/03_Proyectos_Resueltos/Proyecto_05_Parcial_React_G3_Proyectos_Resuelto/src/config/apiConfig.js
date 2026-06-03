// URL base del servicio de autenticacion del parcial.
export const LOGIN_API_BASE_URL =
  // Cambia esta variable en .env si el docente entrega otro backend de login.
  import.meta.env.VITE_API_LOGIN_URL || 'https://www.icesi.edu.co/iaslab/saamfiapi'

// URL base del servicio donde se consultan los proyectos.
export const PROJECTS_API_BASE_URL =
  // Cambia esta variable en .env si el endpoint de proyectos cambia.
  import.meta.env.VITE_API_PROJECTS_URL || 'https://pi2tools.icesi.edu.co/iaslab/surveyapi'

// URL base del sistema al que se podria navegar desde un proyecto.
export const PROJECT_MANAGER_URL =
  // Ajusta esta URL si el docente entrega otro sistema destino.
  import.meta.env.VITE_PROJECT_MANAGER_URL || 'https://pi2tools.icesi.edu.co/iaslab/survey-manager'

// Identificador del sistema requerido por el endpoint de login.
export const AUTH_SYSTEM_ID =
  // En el PDF del parcial el sysid es 4; cambia solo si el docente lo indica.
  Number(import.meta.env.VITE_AUTH_SYS_ID || 4)

// Basename de React Router para despliegue en subcarpetas.
export const ROUTER_BASENAME =
  // En local se usa '/', en despliegue puede ser '/iaslab/compu2/codigo'.
  import.meta.env.VITE_ROUTER_BASENAME || '/'

// Ruta exacta de login dentro del backend de autenticacion.
export const AUTH_LOGIN_PATH =
  // Cambia esta constante si el enunciado usa otro path, por ejemplo '/api/v1/auth/login'.
  '/public/authentication/login'

// Ruta exacta para consultar proyectos dentro del backend de surveyapi.
export const PROJECTS_PATH =
  // En el PDF el endpoint protegido es GET /projects.
  '/projects'

// Base publica para construir las imagenes recibidas en imageUrl.
export const PROJECT_IMAGE_BASE_URL =
  // El PDF indica concatenar surveyapi/public + imageUrl.
  `${PROJECTS_API_BASE_URL}/public`

// Permisos exigidos por el enunciado del parcial.
export const REQUIRED_PERMISSIONS = {
  // Permiso para mostrar el boton de crear proyecto.
  createProject: 'create-project',

  // Permiso para mostrar la opcion editar en cada tarjeta.
  editProject: 'edit-project',

  // Permiso para permitir clic o navegacion a encuestas.
  viewSurvey: 'view-survey',

  // Permiso para mostrar la accion de crear entrevistas.
  createInterviews: 'create-interviews',
}

// Claves usadas en localStorage para mantener sesion.
export const STORAGE_KEYS = {
  // Guarda el token JWT recibido en accessToken.
  token: 'parcialG3Token',

  // Guarda el tipo de token, normalmente Bearer.
  tokenType: 'parcialG3TokenType',

  // Guarda los datos del usuario autenticado.
  user: 'parcialG3User',
}

