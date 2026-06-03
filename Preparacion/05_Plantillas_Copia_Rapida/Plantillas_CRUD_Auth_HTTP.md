# Plantillas rapidas CRUD, autenticacion y HTTP

Estas plantillas estan pensadas para copiar, pegar y adaptar en un parcial. Todas usan React, Vite, Axios, React Router y un backend con JWT.

Cada bloque esta comentado de forma detallada para que sea facil entender que cambiar segun el contexto.

## 1. axiosConfig.js

```js
// Se importa axios para crear una instancia reutilizable.
import axios from 'axios'

// Se crea una instancia llamada api para no repetir la URL base en cada servicio.
const api = axios.create({
  // Se usa la variable de entorno si existe; si no, se usa el backend local.
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
})

// Se agrega un interceptor antes de cada peticion.
api.interceptors.request.use((config) => {
  // Se lee el token guardado despues del login.
  const token = localStorage.getItem('token')

  // Si hay token, se agrega al header Authorization.
  if (token) {
    // Spring Security normalmente espera el formato Bearer.
    config.headers.Authorization = `Bearer ${token}`
  }

  // Se retorna la configuracion para que Axios continue la peticion.
  return config
})

// Se agrega un interceptor para respuestas y errores.
api.interceptors.response.use(
  // Si la respuesta sale bien, se retorna normal.
  (response) => response,
  // Si ocurre un error, se revisa el estado HTTP.
  (error) => {
    // Si el backend responde 401, el token no sirve o expiro.
    if (error.response?.status === 401) {
      // Se elimina el token para evitar seguir enviandolo.
      localStorage.removeItem('token')

      // Se elimina tambien el usuario si se guarda en localStorage.
      localStorage.removeItem('user')
    }

    // Se propaga el error para que el componente pueda mostrar mensaje.
    return Promise.reject(error)
  },
)

// Se exporta la instancia para usarla en todos los servicios.
export default api
```

## 2. authService.js

```js
// Se importa api para usar la misma configuracion de backend y token.
import api from '../api/axiosConfig'

// Se agrupan las funciones de autenticacion en un objeto.
export const authService = {
  // login recibe las credenciales del formulario.
  login: async (credentials) => {
    // POST envia datos al backend para iniciar sesion.
    const response = await api.post('/auth/login', credentials)

    // Se retorna solo data porque eso es lo que usan los componentes.
    return response.data
  },

  // getProfile consulta el usuario autenticado si el backend ofrece este endpoint.
  getProfile: async () => {
    // GET obtiene informacion sin modificar datos.
    const response = await api.get('/auth/me')

    // Se retorna el usuario autenticado.
    return response.data
  },
}
```

## 3. servicio CRUD generico

Cambia `books` por `events`, `routines`, `tickets`, `exercises` o la entidad del parcial.

```js
// Se importa api para hacer peticiones HTTP con URL base y token.
import api from '../api/axiosConfig'

// Se declara el endpoint base de la entidad.
const endpoint = '/books'

// Se exporta el servicio especifico de la entidad.
export const bookService = {
  // GET /books: lista todos los registros.
  getAll: async () => {
    // Se llama el endpoint con metodo GET.
    const response = await api.get(endpoint)

    // Se retorna la respuesta del backend.
    return response.data
  },

  // GET /books/{id}: obtiene un registro por identificador.
  getById: async (id) => {
    // Se concatena el id en la URL.
    const response = await api.get(`${endpoint}/${id}`)

    // Se retorna el registro encontrado.
    return response.data
  },

  // POST /books: crea un registro.
  create: async (payload) => {
    // El payload contiene los campos del formulario.
    const response = await api.post(endpoint, payload)

    // Se retorna el registro creado.
    return response.data
  },

  // PUT /books/{id}: actualiza un registro completo.
  update: async (id, payload) => {
    // PUT envia todos los campos editables.
    const response = await api.put(`${endpoint}/${id}`, payload)

    // Se retorna el registro actualizado.
    return response.data
  },

  // PATCH /books/{id}: actualiza solo algunos campos.
  patch: async (id, payload) => {
    // PATCH sirve para cambios pequenos, por ejemplo estado.
    const response = await api.patch(`${endpoint}/${id}`, payload)

    // Se retorna el registro modificado.
    return response.data
  },

  // DELETE /books/{id}: elimina un registro.
  remove: async (id) => {
    // DELETE normalmente devuelve 204 sin body.
    await api.delete(`${endpoint}/${id}`)
  },
}
```

## 4. hook CRUD reutilizable

```js
// useCallback evita recrear funciones innecesariamente.
import { useCallback, useEffect, useState } from 'react'

// Se importa el servicio concreto de la entidad.
import { bookService } from '../services/bookService'

// Esta funcion normaliza listas directas o paginadas.
const normalizeList = (data) => {
  // Si el backend responde un arreglo, se usa tal cual.
  if (Array.isArray(data)) {
    return data
  }

  // Si Spring responde paginado, los datos suelen estar en content.
  if (Array.isArray(data?.content)) {
    return data.content
  }

  // Si no hay datos validos, se retorna una lista vacia.
  return []
}

// El hook encapsula el estado y las acciones CRUD.
export const useBooks = () => {
  // Estado para la lista principal.
  const [books, setBooks] = useState([])

  // Estado para indicar carga.
  const [loading, setLoading] = useState(false)

  // Estado para mostrar errores al usuario.
  const [error, setError] = useState('')

  // Funcion para cargar todos los registros.
  const loadBooks = useCallback(async () => {
    // Se activa carga antes de llamar al backend.
    setLoading(true)

    // Se limpia el error anterior.
    setError('')

    try {
      // Se llama GET /books.
      const data = await bookService.getAll()

      // Se normaliza la respuesta y se guarda en estado.
      setBooks(normalizeList(data))
    } catch (requestError) {
      // Se muestra un mensaje entendible si falla el backend.
      setError(requestError.response?.data?.message || 'No fue posible cargar los datos')
    } finally {
      // Se apaga carga al terminar, salga bien o mal.
      setLoading(false)
    }
  }, [])

  // Funcion para crear un registro.
  const createBook = async (payload) => {
    // Se llama POST /books.
    const created = await bookService.create(payload)

    // Se agrega el nuevo registro al inicio de la lista.
    setBooks((currentBooks) => [created, ...currentBooks])

    // Se retorna por si la pagina necesita cerrar modal o mostrar mensaje.
    return created
  }

  // Funcion para actualizar un registro.
  const updateBook = async (id, payload) => {
    // Se llama PUT /books/{id}.
    const updated = await bookService.update(id, payload)

    // Se reemplaza el registro actualizado en la lista.
    setBooks((currentBooks) =>
      currentBooks.map((book) => (book.id === id ? updated : book)),
    )

    // Se retorna el registro actualizado.
    return updated
  }

  // Funcion para eliminar un registro.
  const deleteBook = async (id) => {
    // Se llama DELETE /books/{id}.
    await bookService.remove(id)

    // Se elimina del estado local para actualizar la UI.
    setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id))
  }

  // Se cargan los datos cuando la pagina usa el hook.
  useEffect(() => {
    // Se ejecuta GET inicial.
    loadBooks()
  }, [loadBooks])

  // Se retorna todo lo que necesita la pagina.
  return {
    books,
    loading,
    error,
    loadBooks,
    createBook,
    updateBook,
    deleteBook,
  }
}
```

## 5. formulario de entidad

```jsx
// useEffect sirve para cargar datos cuando se edita.
import { useEffect, useState } from 'react'

// Valores iniciales del formulario.
const initialForm = {
  title: '',
  author: '',
  category: '',
  available: true,
}

// El componente recibe el registro a editar y la funcion submit.
const BookForm = ({ selectedBook, onSubmit, onCancel }) => {
  // Estado controlado del formulario.
  const [form, setForm] = useState(initialForm)

  // Error local de validacion.
  const [error, setError] = useState('')

  // Cada vez que cambia selectedBook, el formulario se llena o se limpia.
  useEffect(() => {
    // Si hay libro seleccionado, se cargan sus datos.
    if (selectedBook) {
      setForm({
        title: selectedBook.title || '',
        author: selectedBook.author || '',
        category: selectedBook.category || '',
        available: selectedBook.available ?? true,
      })
    } else {
      // Si no hay libro, se usa formulario vacio.
      setForm(initialForm)
    }
  }, [selectedBook])

  // Funcion generica para inputs de texto.
  const handleChange = (event) => {
    // Se extraen nombre y valor del input.
    const { name, value } = event.target

    // Se actualiza solo el campo que cambio.
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  // Funcion para el checkbox de disponibilidad.
  const handleCheck = (event) => {
    // Se guarda true o false.
    setForm((currentForm) => ({ ...currentForm, available: event.target.checked }))
  }

  // Funcion que se ejecuta al enviar.
  const handleSubmit = (event) => {
    // Evita que el navegador recargue la pagina.
    event.preventDefault()

    // Validacion minima del titulo.
    if (!form.title.trim()) {
      setError('El titulo es obligatorio')
      return
    }

    // Validacion minima del autor.
    if (!form.author.trim()) {
      setError('El autor es obligatorio')
      return
    }

    // Se limpia el error.
    setError('')

    // Se envia el formulario a la pagina.
    onSubmit(form)
  }

  // Se retorna la interfaz del formulario.
  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} />
      <input name="author" value={form.author} onChange={handleChange} />
      <input name="category" value={form.category} onChange={handleChange} />
      <label>
        <input type="checkbox" checked={form.available} onChange={handleCheck} />
        Disponible
      </label>
      {error && <p>{error}</p>}
      <button type="submit">{selectedBook ? 'Guardar' : 'Crear'}</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  )
}

export default BookForm
```

## 6. tabla de entidad

```jsx
// La tabla recibe datos y acciones desde la pagina.
const BookTable = ({ books, onEdit, onDelete }) => {
  // Si no hay datos, se muestra un estado vacio.
  if (books.length === 0) {
    return <p>No hay registros disponibles.</p>
  }

  // Se renderiza una tabla simple y clara.
  return (
    <table>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Autor</th>
          <th>Categoria</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{book.available ? 'Disponible' : 'No disponible'}</td>
            <td>
              <button type="button" onClick={() => onEdit(book)}>Editar</button>
              <button type="button" onClick={() => onDelete(book.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BookTable
```

## 7. pagina CRUD completa

```jsx
// useState maneja libro seleccionado y apertura del formulario.
import { useState } from 'react'

// Se importa el formulario.
import BookForm from '../components/BookForm'

// Se importa la tabla.
import BookTable from '../components/BookTable'

// Se importa el hook CRUD.
import { useBooks } from '../hooks/useBooks'

// Pagina principal de administracion de libros.
const BooksPage = () => {
  // Se obtiene estado y acciones desde el hook.
  const { books, loading, error, createBook, updateBook, deleteBook } = useBooks()

  // Estado para saber si se esta creando o editando.
  const [selectedBook, setSelectedBook] = useState(null)

  // Estado para mostrar u ocultar el formulario.
  const [showForm, setShowForm] = useState(false)

  // Abre formulario en modo crear.
  const handleNew = () => {
    setSelectedBook(null)
    setShowForm(true)
  }

  // Abre formulario en modo editar.
  const handleEdit = (book) => {
    setSelectedBook(book)
    setShowForm(true)
  }

  // Crea o actualiza segun selectedBook.
  const handleSubmit = async (form) => {
    if (selectedBook) {
      await updateBook(selectedBook.id, form)
    } else {
      await createBook(form)
    }

    setShowForm(false)
    setSelectedBook(null)
  }

  // Elimina despues de confirmar.
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Desea eliminar este registro?')

    if (confirmed) {
      await deleteBook(id)
    }
  }

  return (
    <main>
      <h1>Libros</h1>
      <button type="button" onClick={handleNew}>Nuevo libro</button>
      {showForm && (
        <BookForm
          selectedBook={selectedBook}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </main>
  )
}

export default BooksPage
```

## 8. ProtectedRoute

```jsx
// Navigate redirige al usuario si no cumple la condicion.
import { Navigate } from 'react-router-dom'

// useAuth trae el usuario autenticado desde el contexto.
import { useAuth } from '../hooks/useAuth'

// children representa la pagina protegida.
const ProtectedRoute = ({ children }) => {
  // Se consulta el usuario actual.
  const { user } = useAuth()

  // Si no hay usuario, se envia al login.
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si hay usuario, se muestra la pagina.
  return children
}

export default ProtectedRoute
```

## 9. RoleRoute

```jsx
// Navigate permite redirigir sin recargar.
import { Navigate } from 'react-router-dom'

// useAuth lee el usuario guardado.
import { useAuth } from '../hooks/useAuth'

// allowedRoles es la lista de roles permitidos.
const RoleRoute = ({ allowedRoles, children }) => {
  // Se obtiene el usuario autenticado.
  const { user } = useAuth()

  // Si no hay usuario, se manda al login.
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si el rol no esta permitido, se manda al dashboard.
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  // Si todo esta bien, se renderiza la pagina.
  return children
}

export default RoleRoute
```

## 10. Como adaptar rapido

Para cambiar de libros a eventos:

| Libro | Evento |
| --- | --- |
| `bookService` | `eventService` |
| `/books` | `/events` |
| `title` | `name` |
| `author` | `place` |
| `category` | `eventType` |
| `available` | `active` |

Para cambiar de libros a tickets:

| Libro | Ticket |
| --- | --- |
| `/books` | `/tickets` |
| `title` | `subject` |
| `author` | `createdBy` |
| `category` | `priority` |
| `available` | `status` |

