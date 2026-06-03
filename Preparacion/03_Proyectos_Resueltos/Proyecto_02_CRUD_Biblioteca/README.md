# Proyecto 02 - CRUD Biblioteca Universitaria

Este proyecto es una solucion modelo para un parcial donde se pide una SPA en React conectada a backend con autenticacion JWT y CRUD completo.

## Funcionalidades cubiertas

- Login con cuenta institucional.
- Persistencia basica de usuario y token.
- Interceptor de Axios para enviar JWT.
- Rutas protegidas.
- Restriccion de rutas por rol.
- Listado de libros con GET.
- Creacion de libros con POST.
- Edicion de libros con PUT.
- Eliminacion de libros con DELETE.
- Formulario controlado con `useState`.
- Carga inicial con `useEffect`.
- Hook personalizado para separar logica de CRUD.
- Componentes reutilizables para formulario, tabla y navegacion.

## Endpoints esperados

| Metodo | Endpoint | Uso |
| --- | --- | --- |
| POST | `/auth/login` | Iniciar sesion |
| GET | `/auth/me` | Consultar usuario autenticado |
| GET | `/books` | Listar libros |
| GET | `/books/{id}` | Consultar un libro |
| POST | `/books` | Crear libro |
| PUT | `/books/{id}` | Editar libro |
| DELETE | `/books/{id}` | Eliminar libro |

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Variable de entorno opcional

Crear `.env` si el backend no corre en `http://localhost:8080/api`.

```txt
VITE_API_URL=http://localhost:8080/api
```

## Roles usados

| Rol | Permiso |
| --- | --- |
| USER | Ver dashboard y libros |
| ADMIN | Gestionar libros |

## Datos esperados del login

El backend puede responder asi:

```json
{
  "token": "jwt",
  "user": {
    "id": 1,
    "name": "Juan",
    "email": "juan@u.icesi.edu.co",
    "role": "ADMIN"
  }
}
```

Si el backend responde el rol como `authorities`, ajusta `AuthProvider.jsx` para normalizarlo.

