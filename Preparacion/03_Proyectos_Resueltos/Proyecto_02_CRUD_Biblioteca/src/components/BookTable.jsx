// Tabla reutilizable para mostrar libros.
const BookTable = ({ books, onEdit, onDelete, showActions = false }) => {
  // Si la lista esta vacia, se muestra mensaje simple.
  if (books.length === 0) {
    return <div className="alert alert-info">No hay libros registrados.</div>
  }

  // Se retorna una tabla responsive.
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Categoria</th>
            <th>ISBN</th>
            <th>Estado</th>
            {showActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.isbn || 'Sin ISBN'}</td>
              <td>
                <span className={`badge ${book.available ? 'bg-success' : 'bg-secondary'}`}>
                  {book.available ? 'Disponible' : 'Prestado'}
                </span>
              </td>
              {showActions && (
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      type="button"
                      onClick={() => onEdit(book)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() => onDelete(book.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Se exporta la tabla.
export default BookTable

