# Preparacion para parciales SPA React

Esta carpeta contiene una guia completa para preparar parciales de aplicaciones SPA con React, autenticacion JWT, conexion a API, rutas protegidas, roles, UI con Material UI, servicios, hooks y componentes reutilizables.

## Orden recomendado de estudio

1. Lee `01_Guia_Maestra/Guia_SPA_React_API_JWT.md`.
2. Lee `01_Guia_Maestra/Guia_CRUD_HTTP_Backend.md`.
3. Revisa los enunciados en `02_Enunciados`.
4. Abre cada proyecto resuelto en `03_Proyectos_Resueltos`.
5. Compara las pantallas con los mockups de `04_Mockups_Visuales/mockups.html`.
6. Usa `05_Plantillas_Copia_Rapida/Plantillas_CRUD_Auth_HTTP.md` para practicar respuestas rapidas.

## Contenido

- `01_Guia_Maestra`: teoria, pasos, comandos, estructura de carpetas, recomendaciones y errores comunes.
- `02_Enunciados`: varios parciales tipo examen con requisitos similares a los vistos.
- `03_Proyectos_Resueltos`: proyectos React completos y comentados.
- `04_Mockups_Visuales`: imagenes SVG de referencia visual.
- `05_Plantillas_Copia_Rapida`: bloques base adaptables para examen.

## Archivos principales

- `ANALISIS_PARCIALES_REACT.md`: analisis de temas frecuentes de parciales, endpoints, permisos y riesgos.
- `01_Guia_Maestra/Guia_SPA_React_API_JWT.md`: guia general de SPA, login, JWT, rutas, componentes y despliegue.
- `01_Guia_Maestra/Guia_CRUD_HTTP_Backend.md`: guia especifica de CRUD, metodos HTTP y conexion al backend.
- `02_Enunciados/Parcial_01_Actividad_Fisica.md`: parcial tipo actividad fisica.
- `02_Enunciados/Parcial_02_Biblioteca_Universitaria.md`: parcial tipo biblioteca con CRUD.
- `02_Enunciados/Parcial_03_Eventos_Espacios.md`: parcial tipo eventos y espacios.
- `02_Enunciados/Parcial_04_Soporte_Tickets.md`: parcial tipo soporte y tickets.
- `03_Proyectos_Resueltos/Proyecto_01_Actividad_Fisica`: solucion orientada a autenticacion, progreso, estadisticas y PDF.
- `03_Proyectos_Resueltos/Proyecto_02_CRUD_Biblioteca`: solucion CRUD completa con login, roles y backend.
- `03_Proyectos_Resueltos/Proyecto_03_Eventos_Espacios_CRUD`: solucion compacta de CRUD con GET, POST, PUT, PATCH y DELETE.
- `03_Proyectos_Resueltos/Proyecto_04_Soporte_Tickets_CRUD`: solucion compacta para tickets, estado y comentarios.
- `03_Proyectos_Resueltos/Proyecto_05_Parcial_React_G3_Proyectos_Resuelto`: solucion completa del parcial `parcial-react-g3-Isaac-Chaves-G-master`, comentada y con variantes.
- `04_Mockups_Visuales/mockups.html`: galeria de mockups visuales.
- `05_Plantillas_Copia_Rapida/Plantillas_CRUD_Auth_HTTP.md`: snippets adaptables para resolver rapido.

## Metodos HTTP que debes dominar

| Metodo | Uso en parcial | Ejemplo |
| --- | --- | --- |
| GET | Consultar lista o detalle | `GET /books` |
| POST | Crear registro o iniciar sesion | `POST /books` |
| PUT | Editar registro completo | `PUT /books/1` |
| PATCH | Cambiar solo estado o campo puntual | `PATCH /events/1` |
| DELETE | Eliminar registro | `DELETE /books/1` |

## Comandos base para cualquier proyecto Vite React

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Estructura ideal para responder un parcial

```text
src/
  api/
    axiosConfig.js
  components/
    Navbar.jsx
    ProtectedRoute.jsx
    RoleRoute.jsx
  context/
    AuthContext.js
    AuthProvider.jsx
  hooks/
    useAuth.js
    useEntities.js
  pages/
    Login.jsx
    Dashboard.jsx
    ListPage.jsx
    FormPage.jsx
  services/
    authService.js
    entityService.js
  App.jsx
  main.jsx
```

## Nota de uso

Los proyectos estan hechos para estudiar patrones y practicar. En un parcial real, adapta nombres, endpoints, campos y roles segun el enunciado.
