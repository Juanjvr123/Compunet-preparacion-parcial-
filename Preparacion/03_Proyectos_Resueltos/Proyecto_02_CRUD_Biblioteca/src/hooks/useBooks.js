// useCallback mantiene estable la funcion de carga.
import { useCallback, useEffect, useState } from 'react'

// Se importa el servicio CRUD.
import { bookService } from '../services/bookService'

// Normaliza una respuesta directa o paginada.
const normalizeBooks = (data) => {
  // Si data ya es arreglo, se devuelve igual.
  if (Array.isArray(data)) {
    return data
  }

  // Si data viene paginada por Spring, se usa content.
  if (Array.isArray(data?.content)) {
    return data.content
  }

  // Si no coincide, se evita romper la tabla.
  return []
}

// Hook para manejar libros.
export const useBooks = () => {
  // Lista principal de libros.
  const [books, setBooks] = useState([])

  // Estado de carga.
  const [loading, setLoading] = useState(false)

  // Mensaje de error.
  const [error, setError] = useState('')

  // Carga libros desde el backend.
  const loadBooks = useCallback(async () => {
    // Activa indicador visual.
    setLoading(true)

    // Limpia error anterior.
    setError('')

    try {
      // Ejecuta GET /books.
      const data = await bookService.getAll()

      // Guarda libros normalizados.
      setBooks(normalizeBooks(data))
    } catch (requestError) {
      // Muestra mensaje del backend o uno por defecto.
      setError(requestError.response?.data?.message || 'No fue posible cargar los libros')
    } finally {
      // Termina la carga.
      setLoading(false)
    }
  }, [])

  // Crea un libro nuevo.
  const createBook = async (book) => {
    // Ejecuta POST /books.
    const createdBook = await bookService.create(book)

    // Agrega el libro creado al estado local.
    setBooks((currentBooks) => [createdBook, ...currentBooks])

    // Retorna el libro por si la pagina lo necesita.
    return createdBook
  }

  // Actualiza un libro existente.
  const updateBook = async (id, book) => {
    // Ejecuta PUT /books/{id}.
    const updatedBook = await bookService.update(id, book)

    // Reemplaza el libro actualizado en la lista.
    setBooks((currentBooks) =>
      currentBooks.map((currentBook) =>
        currentBook.id === id ? updatedBook : currentBook,
      ),
    )

    // Retorna el libro actualizado.
    return updatedBook
  }

  // Elimina un libro.
  const deleteBook = async (id) => {
    // Ejecuta DELETE /books/{id}.
    await bookService.remove(id)

    // Quita el libro eliminado de la tabla.
    setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id))
  }

  // Carga libros al montar la pagina.
  useEffect(() => {
    // Ejecuta la carga inicial.
    loadBooks()
  }, [loadBooks])

  // Expone estado y acciones.
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

