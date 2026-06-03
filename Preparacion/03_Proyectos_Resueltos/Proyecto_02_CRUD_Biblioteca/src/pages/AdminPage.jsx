// useState maneja modo crear y editar.
import { useState } from 'react'

// Formulario reutilizable.
import BookFormDialog from '../components/BookFormDialog'

// Tabla reutilizable.
import BookTable from '../components/BookTable'

// Hook CRUD de libros.
import { useBooks } from '../hooks/useBooks'

// Pagina administrativa.
const AdminPage = () => {
  // Se obtiene estado y funciones CRUD.
  const { books, loading, error, createBook, updateBook, deleteBook } = useBooks()

  // Libro seleccionado para editar.
  const [selectedBook, setSelectedBook] = useState(null)

  // Controla si se muestra el formulario.
  const [showForm, setShowForm] = useState(false)

  // Error de acciones como crear o eliminar.
  const [actionError, setActionError] = useState('')

  // Abre formulario en modo crear.
  const handleCreateClick = () => {
    setSelectedBook(null)
    setActionError('')
    setShowForm(true)
  }

  // Abre formulario en modo editar.
  const handleEditClick = (book) => {
    setSelectedBook(book)
    setActionError('')
    setShowForm(true)
  }

  // Cierra formulario.
  const handleCancel = () => {
    setSelectedBook(null)
    setShowForm(false)
    setActionError('')
  }

  // Crea o actualiza segun exista selectedBook.
  const handleSubmit = async (form) => {
    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, form)
      } else {
        await createBook(form)
      }

      handleCancel()
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || 'No fue posible guardar el libro')
    }
  }

  // Elimina un libro con confirmacion.
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Desea eliminar este libro?')

    if (!confirmed) {
      return
    }

    try {
      setActionError('')
      await deleteBook(id)
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || 'No fue posible eliminar el libro')
    }
  }

  // Retorna CRUD administrativo.
  return (
    <main className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
        <div>
          <h1 className="h3 mb-1">Administracion de libros</h1>
          <p className="text-muted mb-0">CRUD conectado al backend con metodos HTTP.</p>
        </div>
        <button className="btn btn-primary align-self-start" type="button" onClick={handleCreateClick}>
          Nuevo libro
        </button>
      </div>

      {showForm && (
        <BookFormDialog
          selectedBook={selectedBook}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {actionError && <div className="alert alert-danger">{actionError}</div>}
      {loading && <div className="alert alert-secondary">Cargando libros...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <BookTable
          books={books}
          showActions
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      )}
    </main>
  )
}

// Se exporta AdminPage.
export default AdminPage

