# Parcial 04 - Mesa de ayuda y tickets

## Contexto

Una plataforma interna necesita que los usuarios creen tickets de soporte y que los agentes los gestionen.

## Roles

- `USER`: crea y consulta sus tickets.
- `AGENT`: atiende tickets.
- `ADMIN`: ve metricas generales.

## Requerimientos

1. Login con JWT.
2. Crear ticket.
3. Listar tickets propios.
4. Cambiar estado del ticket.
5. Panel de agente.
6. Estadisticas basicas por estado.
7. Rutas protegidas y rutas por rol.
8. Axios con token.
9. UI con Material UI.
10. Build funcional.

## Endpoints sugeridos

- `POST /auth/login`
- `GET /tickets/my`
- `GET /tickets`
- `POST /tickets`
- `PUT /tickets/:id/status`

## Vista esperada

Revisa `04_Mockups_Visuales/mockup_tickets.svg`.

