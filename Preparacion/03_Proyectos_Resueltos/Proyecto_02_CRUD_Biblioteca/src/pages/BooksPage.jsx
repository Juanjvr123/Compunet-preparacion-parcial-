// Se importa la tabla de libros.
import BookTable from '../components/BookTable'

// Se importa el hook CRUD.
import { useBooks } from '../hooks/useBooks'

// Pagina de consulta para cualquier usuario autenticado.
const BooksPage = () => {
  // Se obtienen datos y estados.
  const { books, loading, error } = useBooks()

  // Retorna vista de consulta.
  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h3 mb-1">Catalogo de libros</h1>
          <p className="text-muted mb-0">Consulta los libros disponibles en la biblioteca.</p>
        </div>
      </div>

      {loading && <div className="alert alert-secondary">Cargando libros...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && <BookTable books={books} />}
    </main>
  )
}

// Se exporta la pagina.
export default BooksPage

