# Parcial 02 - Biblioteca universitaria

## Contexto

Una biblioteca necesita una SPA para consultar libros, administrar prestamos y permitir que los bibliotecarios gestionen el inventario.

## Roles

- `STUDENT`: consulta libros y ve sus prestamos.
- `LIBRARIAN`: crea, edita y elimina libros.
- `ADMIN`: gestiona usuarios y reportes.

## Requerimientos

1. Login con JWT.
2. Navbar con opciones segun rol.
3. Listado de libros.
4. Filtro por titulo o categoria.
5. Vista de prestamos del estudiante.
6. Panel de bibliotecario para CRUD de libros.
7. Ruta protegida para panel administrativo.
8. Servicio centralizado con Axios.
9. Hook para cargar libros.
10. UI con Material UI.

## Endpoints sugeridos

- `POST /auth/login`
- `GET /books`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`
- `GET /loans/my`

## Vista esperada

Revisa `04_Mockups_Visuales/mockup_biblioteca.svg`.

