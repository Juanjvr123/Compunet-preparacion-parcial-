# Enunciado resumido y solucion esperada

## Contexto

La aplicacion base debe completarse para iniciar sesion contra una API REST, guardar el token, consultar proyectos protegidos y renderizarlos segun una imagen guia.

## Endpoint de login

Metodo:

```txt
POST
```

URL:

```txt
https://www.icesi.edu.co/iaslab/saamfiapi/public/authentication/login
```

Body:

```json
{
  "username": "usuario_entregado_por_docente",
  "sysid": 4,
  "password": "password_entregado_por_docente"
}
```

Respuesta importante:

```json
{
  "accessToken": "token",
  "tokenType": "Bearer"
}
```

Solucion en el proyecto:

- `src/services/authService.js`
- `src/context/AuthContext.jsx`
- `src/pages/LoginPage/LoginPage.jsx`

## Endpoint de proyectos

Metodo:

```txt
GET
```

URL:

```txt
https://pi2tools.icesi.edu.co/iaslab/surveyapi/projects
```

Header:

```txt
Authorization: Bearer accessToken
```

Respuesta:

```json
[
  {
    "id": 10,
    "name": "Mapeo de actores",
    "description": "Descripcion del proyecto",
    "state": "A",
    "imageUrl": "/files/1776868290457_Logo_Encuesta.png"
  }
]
```

Solucion en el proyecto:

- `src/services/projectService.js`
- `src/hooks/useProjects.js`
- `src/pages/ProjectsPage/ProjectsPage.jsx`

## Imagenes

Base indicada por el PDF:

```txt
https://pi2tools.icesi.edu.co/iaslab/surveyapi/public
```

Si `imageUrl` llega asi:

```txt
/files/1776868290457_Logo_Encuesta.png
```

La URL final debe ser:

```txt
https://pi2tools.icesi.edu.co/iaslab/surveyapi/public/files/1776868290457_Logo_Encuesta.png
```

Solucion:

```js
buildProjectImageUrl(project.imageUrl)
```

## Permisos

El parcial pide controlar acciones con estos permisos:

| Permiso | Accion |
| --- | --- |
| `create-project` | Mostrar boton crear proyecto |
| `edit-project` | Mostrar opcion editar |
| `view-survey` | Permitir abrir encuestas desde la tarjeta |
| `create-interviews` | Mostrar accion crear entrevistas |

Solucion:

- `src/utils/permissions.js`
- `src/hooks/usePermission.js`
- `src/pages/ProjectsPage/ProjectsPage.jsx`
- `src/components/Project/ProjectCard.jsx`

## Estados visibles

El parcial exige:

| Estado | Archivo |
| --- | --- |
| Carga | `src/components/State/LoadingState.jsx` |
| Error | `src/components/State/ErrorState.jsx` |
| Exito | `src/components/Project/ProjectList.jsx` |

## Respuesta ideal en sustentacion

Puedes explicar asi:

1. El login se hace en `authService.js` con `fetch` y metodo `POST`.
2. El token se guarda en `AuthContext.jsx` usando `localStorage`.
3. La ruta `/projects` esta protegida con `ProtectedRoute`.
4. Los proyectos se consultan en `projectService.js` con `GET` y header `Authorization`.
5. `useProjects.js` maneja carga, error y datos.
6. `ProjectList.jsx` usa `.map()` para renderizar todas las tarjetas.
7. `permissions.js` evita duplicar condiciones de permisos en varios componentes.
8. Las imagenes se construyen con la URL publica indicada en el PDF.

