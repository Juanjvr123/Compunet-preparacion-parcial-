# Guia de cambios, variantes y recomendaciones

Esta guia explica que partes debes cambiar si el parcial conserva la misma estructura, pero modifica detalles como endpoints, permisos, campos o rutas.

## 1. Si cambia el backend

Archivo:

`src/config/apiConfig.js`

Cambia:

```js
export const LOGIN_API_BASE_URL = import.meta.env.VITE_API_LOGIN_URL || '...'
export const PROJECTS_API_BASE_URL = import.meta.env.VITE_API_PROJECTS_URL || '...'
export const AUTH_LOGIN_PATH = '/public/authentication/login'
export const PROJECTS_PATH = '/projects'
```

Variante comun:

```js
export const AUTH_LOGIN_PATH = '/api/v1/auth/login'
export const PROJECTS_PATH = '/api/v1/projects'
```

Recomendacion: no cambies todas las llamadas del proyecto. Cambia solo estas constantes.

## 2. Si el login pide otros campos

Archivo:

`src/services/authService.js`

Actual:

```js
const payload = {
  username,
  sysid: AUTH_SYSTEM_ID,
  password,
}
```

Variante con email:

```js
const payload = {
  email: username,
  password,
}
```

Variante con documentId:

```js
const payload = {
  documentId: username,
  password,
  sysid: AUTH_SYSTEM_ID,
}
```

Recomendacion: el formulario puede seguir usando `username`; solo cambia el nombre que se envia al backend.

## 3. Si la respuesta del login cambia

Archivo:

`src/context/AuthContext.jsx`

Actual:

```js
const nextToken = loginResponse.accessToken
const nextTokenType = loginResponse.tokenType || 'Bearer'
```

Variante:

```js
const nextToken = loginResponse.token
const nextTokenType = 'Bearer'
```

Otra variante:

```js
const nextToken = loginResponse.data.accessToken
const nextTokenType = loginResponse.data.tokenType || 'Bearer'
```

Recomendacion: adapta la lectura del token en un solo lugar y deja igual el resto de la aplicacion.

## 4. Si los permisos vienen en otro campo

Archivo:

`src/context/AuthContext.jsx`

Actual:

```js
permissions: claims?.permissions || claims?.authorities || claims?.roles || claims?.role || claims?.scope || []
```

Variante:

```js
permissions: loginResponse.permissions || []
```

Otra variante:

```js
permissions: loginResponse.user.authorities || []
```

Recomendacion: despues revisa `src/utils/permissions.js`; ahi se normalizan prefijos como `ROLE_` y `SCOPE_`.

## 5. Si cambian los permisos del enunciado

Archivo:

`src/config/apiConfig.js`

Actual:

```js
export const REQUIRED_PERMISSIONS = {
  createProject: 'create-project',
  editProject: 'edit-project',
  viewSurvey: 'view-survey',
  createInterviews: 'create-interviews',
}
```

Variante:

```js
export const REQUIRED_PERMISSIONS = {
  createProject: 'PROJECT_CREATE',
  editProject: 'PROJECT_EDIT',
  viewSurvey: 'SURVEY_VIEW',
  createInterviews: 'INTERVIEW_CREATE',
}
```

Recomendacion: cambia los nombres aqui y no en cada componente.

## 6. Si la respuesta de proyectos viene paginada

Archivo:

`src/hooks/useProjects.js`

Ya esta soportado:

```js
if (Array.isArray(data?.content)) {
  return data.content
}
```

Variante:

```js
if (Array.isArray(data?.data)) {
  return data.data
}
```

Recomendacion: adapta `normalizeProjects` y conserva `ProjectList` igual.

## 7. Si los campos del proyecto cambian

Archivo:

`src/components/Project/ProjectCard.jsx`

Actual:

```jsx
{project.name}
{project.description}
{project.state}
```

Variante:

```jsx
{project.title}
{project.summary}
{project.status}
```

Recomendacion: si son muchos cambios, normaliza los datos en `useProjects` antes de guardarlos.

## 8. Si cambia la URL de imagenes

Archivo:

`src/services/projectService.js`

Actual:

```js
return `${PROJECT_IMAGE_BASE_URL}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`
```

Variante:

```js
return `${PROJECTS_API_BASE_URL}/files/${imageUrl}`
```

Recomendacion: nunca concatenes la imagen directamente en el componente. Hazlo en una funcion.

## 9. Si el profesor pide modal de crear o editar

Archivo:

`src/pages/ProjectsPage/ProjectsPage.jsx`

Actual:

```js
alert('Abrir formulario para crear proyecto')
alert(`Editar proyecto: ${project.name}`)
```

Variante:

```js
setSelectedProject(null)
setOpenForm(true)
```

Y para editar:

```js
setSelectedProject(project)
setOpenForm(true)
```

Recomendacion: solo implementa modal si el enunciado pide crear o editar de verdad. En este parcial solo se exige visibilidad por permisos.

## 10. Si hay que desplegar en subcarpeta

Archivo:

`.env.development`

Actual:

```txt
VITE_ROUTER_BASENAME=/
```

Variante:

```txt
VITE_ROUTER_BASENAME=/iaslab/compu2/A00049176
```

Recomendacion: si la app funciona local pero no al desplegar, revisa primero esta variable.

## 11. Errores corregidos frente al proyecto base

El proyecto base tenia varios puntos incompletos:

- Redirigia a `/project`, pero la ruta definida era `/projects`.
- Redirigia `/` a `/courses`, ruta que no existia.
- `getProjects` simulaba datos con `setTimeout`.
- No enviaba `Authorization`.
- No guardaba `tokenType`.
- No renderizaba proyectos con `.map`.
- No aplicaba permisos a las acciones.
- La imagen de tarjeta estaba fija como `public/logo.png`.
- No tenia estados completos de carga, error y exito.

Esta solucion corrige todos esos puntos.

## 12. Orden recomendado para explicar en sustentacion

1. Muestro `apiConfig.js` para explicar URLs.
2. Muestro `authService.js` para explicar POST login.
3. Muestro `AuthContext.jsx` para explicar token y localStorage.
4. Muestro `projectService.js` para explicar GET protegido.
5. Muestro `useProjects.js` para explicar loading, error y datos.
6. Muestro `permissions.js` para explicar permisos reutilizables.
7. Muestro `ProjectsPage.jsx` para explicar render y acciones.

