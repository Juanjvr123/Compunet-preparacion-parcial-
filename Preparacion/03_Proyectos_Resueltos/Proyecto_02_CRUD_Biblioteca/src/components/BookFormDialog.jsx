// useEffect sincroniza el formulario al editar.
import { useEffect, useState } from 'react'

// Valores iniciales para crear un libro.
const emptyForm = {
  title: '',
  author: '',
  category: '',
  isbn: '',
  available: true,
}

// Formulario reutilizable para crear y editar.
const BookFormDialog = ({ selectedBook, onSubmit, onCancel }) => {
  // Estado controlado del formulario.
  const [form, setForm] = useState(emptyForm)

  // Error local de validacion.
  const [error, setError] = useState('')

  // Sincroniza datos cuando cambia el libro seleccionado.
  useEffect(() => {
    // Si hay libro seleccionado, se cargan sus campos.
    if (selectedBook) {
      setForm({
        title: selectedBook.title || '',
        author: selectedBook.author || '',
        category: selectedBook.category || '',
        isbn: selectedBook.isbn || '',
        available: selectedBook.available ?? true,
      })
    } else {
      // Si no hay libro, se limpia el formulario.
      setForm(emptyForm)
    }
  }, [selectedBook])

  // Maneja inputs de texto.
  const handleChange = (event) => {
    // Extrae name y value del input.
    const { name, value } = event.target

    // Actualiza solo el campo modificado.
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  // Maneja checkbox de disponibilidad.
  const handleAvailableChange = (event) => {
    // Guarda true o false en available.
    setForm((currentForm) => ({ ...currentForm, available: event.target.checked }))
  }

  // Maneja envio del formulario.
  const handleSubmit = (event) => {
    // Evita recarga del navegador.
    event.preventDefault()

    // Valida titulo obligatorio.
    if (!form.title.trim()) {
      setError('El titulo es obligatorio')
      return
    }

    // Valida autor obligatorio.
    if (!form.author.trim()) {
      setError('El autor es obligatorio')
      return
    }

    // Valida categoria obligatoria.
    if (!form.category.trim()) {
      setError('La categoria es obligatoria')
      return
    }

    // Limpia error si todo esta correcto.
    setError('')

    // Envia los datos a la pagina.
    onSubmit(form)
  }

  // Retorna una tarjeta simple de formulario.
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h5 mb-3">{selectedBook ? 'Editar libro' : 'Nuevo libro'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label" htmlFor="title">
                Titulo
              </label>
              <input
                className="form-control"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="author">
                Autor
              </label>
              <input
                className="form-control"
                id="author"
                name="author"
                value={form.author}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="category">
                Categoria
              </label>
              <input
                className="form-control"
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="isbn">
                ISBN
              </label>
              <input
                className="form-control"
                id="isbn"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              id="available"
              type="checkbox"
              checked={form.available}
              onChange={handleAvailableChange}
            />
            <label className="form-check-label" htmlFor="available">
              Disponible para prestamo
            </label>
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary" type="submit">
              {selectedBook ? 'Guardar cambios' : 'Crear libro'}
            </button>
            <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Se exporta el formulario.
export default BookFormDialog

