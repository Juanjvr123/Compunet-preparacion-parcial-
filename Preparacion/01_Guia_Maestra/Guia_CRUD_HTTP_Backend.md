# Guia CRUD, metodos HTTP y conexion al backend

Esta guia resume la forma correcta de resolver funcionalidades de parcial cuando la aplicacion React debe comunicarse con un backend, normalmente Spring Boot, usando Axios, JWT, rutas protegidas y componentes reutilizables.

La idea principal es simple:

1. El backend expone endpoints.
2. El frontend crea servicios para llamar esos endpoints.
3. Los hooks consumen los servicios y manejan estado.
4. Las paginas muestran datos y llaman acciones.
5. Los formularios validan datos antes de enviar.
6. El token JWT se agrega automaticamente en cada peticion protegida.

## 1. CRUD completo

CRUD significa crear, leer, actualizar y eliminar.

| Accion | Metodo HTTP | Endpoint comun | Funcion de servicio | Uso en interfaz |
| --- | --- | --- | --- | --- |
| Listar todos | GET | `/books` | `getBooks()` | Cargar tabla o tarjetas |
| Buscar uno | GET | `/books/{id}` | `getBookById(id)` | Ver detalle o cargar formulario |
| Crear | POST | `/books` | `createBook(data)` | Enviar formulario nuevo |
| Actualizar completo | PUT | `/books/{id}` | `updateBook(id, data)` | Guardar formulario editado |
| Actualizar parcial | PATCH | `/books/{id}` | `patchBook(id, data)` | Cambiar estado, activar, cerrar |
| Eliminar | DELETE | `/books/{id}` | `deleteBook(id)` | Boton eliminar |

En un parcial, si no especifican PATCH, usa PUT para edicion completa y DELETE para eliminacion.

## 2. Flujo correcto de una funcionalidad

Ejemplo: crear un libro.

1. El usuario abre la pagina `BooksPage`.
2. La pagina muestra un boton `Nuevo libro`.
3. Al dar clic, se abre un formulario controlado con `useState`.
4. El usuario llena titulo, autor, categoria y disponibilidad.
5. El formulario ejecuta `handleSubmit`.
6. `handleSubmit` llama `createBook(formData)`.
7. `createBook` hace `api.post('/books', formData)`.
8. Axios agrega el token con el interceptor.
9. El backend responde con el libro creado.
10. El hook actualiza la lista.
11. La tabla se vuelve a renderizar.

Ese flujo demuestra componentes, hooks, servicios, HTTP y backend.

## 3. Estructura recomendada

```txt
src/
  api/
    axiosConfig.js
  components/
    Navbar.jsx
    ProtectedRoute.jsx
    RoleRoute.jsx
    EntityForm.jsx
    EntityTable.jsx
  context/
    AuthContext.js
    AuthProvider.jsx
  hooks/
    useAuth.js
    useEntities.js
  pages/
    Login.jsx
    Dashboard.jsx
    EntitiesPage.jsx
    AdminPage.jsx
  services/
    authService.js
    entityService.js
  App.jsx
  main.jsx
```

Esta estructura separa responsabilidades:

| Carpeta | Responsabilidad |
| --- | --- |
| `api` | Configuracion comun de Axios |
| `services` | Llamadas HTTP al backend |
| `hooks` | Estado, carga, errores y acciones |
| `components` | UI reutilizable |
| `pages` | Vistas completas conectadas a rutas |
| `context` | Estado global de autenticacion |

## 4. Axios y JWT

El archivo `axiosConfig.js` suele resolver tres cosas:

1. Define la URL base del backend.
2. Agrega el token JWT en el header `Authorization`.
3. Maneja errores globales, especialmente `401 Unauthorized`.

Ejemplo conceptual:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
```

Si el backend usa Spring Security con JWT, el header esperado casi siempre es:

```txt
Authorization: Bearer token_aqui
```

## 5. Servicios HTTP

Los servicios no deben guardar estado de React. Solo hacen peticiones.

Ejemplo de servicio CRUD:

```js
import api from '../api/axiosConfig'

export const bookService = {
  getAll: async () => {
    const response = await api.get('/books')
    return response.data
  },

  create: async (book) => {
    const response = await api.post('/books', book)
    return response.data
  },

  update: async (id, book) => {
    const response = await api.put(`/books/${id}`, book)
    return response.data
  },

  remove: async (id) => {
    await api.delete(`/books/${id}`)
  },
}
```

## 6. Hooks para CRUD

El hook es el lugar ideal para:

- `items`: lista de datos.
- `loading`: si esta cargando.
- `error`: mensaje de error.
- `loadItems`: GET.
- `createItem`: POST.
- `updateItem`: PUT.
- `deleteItem`: DELETE.

Ventaja: la pagina queda limpia y solo llama funciones.

## 7. Formularios controlados

Un formulario controlado significa que cada campo se conecta a un estado.

```js
const [form, setForm] = useState({
  title: '',
  author: '',
  category: '',
})
```

Cada input lee desde `form` y escribe con `setForm`.

```js
<input
  value={form.title}
  onChange={(event) => setForm({ ...form, title: event.target.value })}
/>
```

En parciales, esto demuestra `useState`.

## 8. Carga inicial con useEffect

Para listar datos al entrar a una pagina:

```js
useEffect(() => {
  loadBooks()
}, [])
```

Esto demuestra `useEffect`.

Si `loadBooks` esta dentro del hook y usa `useCallback`, se puede poner como dependencia:

```js
useEffect(() => {
  loadBooks()
}, [loadBooks])
```

## 9. Respuestas del backend

El backend puede responder de varias formas.

Respuesta directa:

```json
[
  { "id": 1, "title": "Clean Code" }
]
```

Respuesta paginada de Spring:

```json
{
  "content": [
    { "id": 1, "title": "Clean Code" }
  ],
  "totalElements": 1,
  "totalPages": 1
}
```

Para soportar ambas:

```js
const normalizeList = (data) => {
  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data.content)) {
    return data.content
  }

  return []
}
```

Esto es muy util en parciales porque evita que la pagina falle si el backend cambia entre lista directa y paginacion.

## 10. Estados HTTP importantes

| Codigo | Significado | Que hacer en React |
| --- | --- | --- |
| 200 | OK | Mostrar datos |
| 201 | Created | Agregar nuevo registro |
| 204 | No Content | Eliminar de la lista local |
| 400 | Bad Request | Mostrar error de validacion |
| 401 | Unauthorized | Cerrar sesion o redirigir a login |
| 403 | Forbidden | Mostrar mensaje de rol no autorizado |
| 404 | Not Found | Mostrar que no existe el recurso |
| 500 | Server Error | Mostrar error general |

## 11. DTOs y payloads

Un DTO es el objeto que se envia o recibe.

Ejemplo entidad backend:

```java
public class Book {
  private Long id;
  private String title;
  private String author;
  private String category;
  private Boolean available;
}
```

Payload para crear:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Programacion",
  "available": true
}
```

No envies `id` al crear, porque normalmente el backend lo genera.

Payload para editar:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Ingenieria de software",
  "available": true
}
```

## 12. Rutas protegidas por rol

Roles comunes:

| Rol | Puede ver |
| --- | --- |
| `USER` | Dashboard, sus recursos, historial, progreso |
| `TRAINER` | Panel de entrenador, usuarios asignados, recomendaciones |
| `ADMIN` | Panel administrativo, CRUD general |

Wrapper de proteccion:

```jsx
<Route
  path="/admin"
  element={
    <RoleRoute allowedRoles={['ADMIN']}>
      <AdminPage />
    </RoleRoute>
  }
/>
```

Esto cumple control de acceso por rol.

## 13. Patron minimo para resolver cualquier CRUD

Cuando el parcial pida una funcionalidad nueva, sigue este orden:

1. Identifica la entidad: libro, evento, rutina, ticket, ejercicio.
2. Lista campos obligatorios.
3. Define endpoints.
4. Crea el servicio en `services`.
5. Crea el hook en `hooks`.
6. Crea formulario reutilizable.
7. Crea tabla o tarjetas.
8. Crea pagina.
9. Agrega ruta en `App.jsx`.
10. Protege ruta si requiere login o rol.

## 14. Ejemplo de endpoints por proyecto

Actividad fisica:

| Recurso | Endpoint | Metodos |
| --- | --- | --- |
| Rutinas | `/routines` | GET, POST, PUT, DELETE |
| Progreso | `/progress` | GET, POST |
| Ejercicios | `/exercises` | GET, POST, PUT, DELETE |
| Eventos | `/events` | GET, POST, PUT, DELETE |
| Reportes | `/reports/me/pdf` | GET |

Biblioteca:

| Recurso | Endpoint | Metodos |
| --- | --- | --- |
| Libros | `/books` | GET, POST, PUT, DELETE |
| Prestamos | `/loans` | GET, POST, PATCH |
| Usuarios | `/users` | GET, PUT |
| Categorias | `/categories` | GET, POST |

Tickets:

| Recurso | Endpoint | Metodos |
| --- | --- | --- |
| Tickets | `/tickets` | GET, POST, PUT, PATCH |
| Comentarios | `/tickets/{id}/comments` | GET, POST |
| Tecnicos | `/technicians` | GET |

## 15. Validaciones minimas

No agregues validaciones exageradas en parcial. Usa las necesarias:

- Campo requerido.
- Numero mayor que cero.
- Fecha no vacia.
- Seleccion obligatoria.

Ejemplo:

```js
if (!form.title.trim()) {
  setError('El titulo es obligatorio')
  return
}
```

## 16. Errores en interfaz

Maneja tres estados:

1. Cargando.
2. Error.
3. Datos.

Ejemplo visual:

```jsx
{loading && <p>Cargando...</p>}
{error && <p className="text-danger">{error}</p>}
{!loading && !error && <BookTable books={books} />}
```

## 17. Recomendaciones de parcial

- No llames Axios directamente desde todos los componentes.
- No repitas la URL base en cada archivo.
- No guardes el token en variables temporales que se pierden al recargar.
- No mezcles formulario, tabla, rutas y autenticacion en un solo archivo si puedes separarlo.
- No hagas endpoints inventados sin relacion con el backend.
- Si el backend no esta listo, deja la URL documentada y el servicio preparado.
- Si el endpoint devuelve datos con otro nombre, adapta solo el servicio o el hook, no toda la pagina.

## 18. Checklist final CRUD

Antes de entregar una funcionalidad CRUD, verifica:

- Hay servicio con GET, POST, PUT y DELETE.
- El servicio usa `api` centralizado.
- `api` agrega JWT.
- La pagina carga datos con `useEffect`.
- Hay estado de carga.
- Hay estado de error.
- El formulario es controlado.
- Crear actualiza la lista.
- Editar actualiza la lista.
- Eliminar actualiza la lista.
- La ruta esta en `App.jsx`.
- La ruta esta protegida si corresponde.
- La interfaz es responsiva.

