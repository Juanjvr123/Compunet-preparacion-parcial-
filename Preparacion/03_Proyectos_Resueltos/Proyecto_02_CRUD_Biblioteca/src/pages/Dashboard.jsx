// useAuth permite mostrar datos del usuario.
import { useAuth } from '../hooks/useAuth'

// Pagina inicial privada.
const Dashboard = () => {
  // Se obtiene el usuario actual.
  const { user } = useAuth()

  // Se muestran accesos rapidos.
  return (
    <main className="container py-4">
      <h1 className="h3">Panel principal</h1>
      <p className="text-muted mb-4">
        Bienvenido, {user?.name || user?.email}. Rol actual: {user?.role}.
      </p>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Consulta de libros</h2>
              <p className="text-muted">Revisa disponibilidad y datos basicos del catalogo.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5">Administracion</h2>
              <p className="text-muted">Gestiona libros si tu usuario tiene rol ADMIN.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// Se exporta Dashboard.
export default Dashboard

