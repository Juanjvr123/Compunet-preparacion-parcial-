# Proyecto 05 - Parcial React G3 Proyectos Resuelto

Este proyecto resuelve completamente el parcial ubicado en:

`C:\Users\juanj\Downloads\parcial-react-g3-Isaac-Chaves-G-master`

La solucion esta comentada en detalle, especialmente en las lineas donde normalmente se cambian endpoints, rutas, permisos, imagenes, campos de respuesta o configuracion de despliegue.

## Requerimientos cubiertos

- Login con `POST /public/authentication/login`.
- Envio de `username`, `password` y `sysid`.
- Lectura de `accessToken` y `tokenType`.
- Persistencia de sesion en `localStorage`.
- Ruta protegida para proyectos.
- Consumo real de `GET /projects`.
- Header `Authorization: Bearer <token>`.
- Render dinamico de proyectos.
- Construccion correcta de imagenes con `/public`.
- Estados visibles de carga, error y exito.
- Utilidad reutilizable para permisos.
- Visibilidad por permisos:
  - `create-project`
  - `edit-project`
  - `view-survey`
  - `create-interviews`

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Variables importantes

El archivo `.env.development` trae las URLs del parcial.

```txt
VITE_API_LOGIN_URL=https://www.icesi.edu.co/iaslab/saamfiapi
VITE_API_PROJECTS_URL=https://pi2tools.icesi.edu.co/iaslab/surveyapi
VITE_PROJECT_MANAGER_URL=https://pi2tools.icesi.edu.co/iaslab/survey-manager
VITE_AUTH_SYS_ID=4
VITE_ROUTER_BASENAME=/
```

Si el docente exige despliegue bajo una carpeta, cambia `VITE_ROUTER_BASENAME`.

Ejemplo:

```txt
VITE_ROUTER_BASENAME=/iaslab/compu2/A00049176
```

## Archivos clave

| Archivo | Para que sirve |
| --- | --- |
| `src/config/apiConfig.js` | URLs, endpoints, sysid y basename |
| `src/api/client.js` | Cliente fetch reutilizable |
| `src/services/authService.js` | Login contra backend |
| `src/services/projectService.js` | Consulta real de proyectos |
| `src/context/AuthContext.jsx` | Token, usuario, login, logout |
| `src/utils/permissions.js` | Validacion reutilizable de permisos |
| `src/hooks/useProjects.js` | Carga, error y lista de proyectos |
| `src/pages/ProjectsPage/ProjectsPage.jsx` | Pantalla principal |

## Recomendacion para estudiar

Lee primero:

1. `src/config/apiConfig.js`
2. `src/services/authService.js`
3. `src/context/AuthContext.jsx`
4. `src/services/projectService.js`
5. `src/pages/ProjectsPage/ProjectsPage.jsx`

Ese orden sigue el flujo real: configurar API, iniciar sesion, guardar token, consultar datos y pintar UI.

