# Parcial 03 - Eventos y espacios universitarios

## Contexto

La universidad necesita publicar eventos, talleres y espacios disponibles para estudiantes.

## Roles

- `USER`: consulta eventos y espacios.
- `COORDINATOR`: crea eventos.
- `ADMIN`: administra todo.

## Requerimientos

1. Login con JWT.
2. Dashboard por rol.
3. Listado de eventos.
4. Listado de espacios.
5. Formulario para crear evento.
6. Formulario para crear espacio.
7. Ruta protegida por rol para coordinadores.
8. Alertas de exito y error.
9. Hook personalizado para cargar eventos.
10. Servicio API separado.

## Endpoints sugeridos

- `POST /auth/login`
- `GET /events`
- `POST /events`
- `PUT /events/:id`
- `DELETE /events/:id`
- `GET /spaces`

## Vista esperada

Revisa `04_Mockups_Visuales/mockup_eventos.svg`.

