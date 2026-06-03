// Link permite navegar sin recargar la pagina.
import { Link, useNavigate } from 'react-router-dom'

// useAuth trae usuario y logout.
import { useAuth } from '../hooks/useAuth'

// Barra de navegacion principal.
const Navbar = () => {
  // Se obtiene usuario actual y funcion de cierre.
  const { user, logout } = useAuth()

  // useNavigate permite redirigir tras logout.
  const navigate = useNavigate()

  // Maneja cierre de sesion.
  const handleLogout = () => {
    // Limpia estado y localStorage.
    logout()

    // Regresa al login.
    navigate('/login')
  }

  // Retorna una navbar Bootstrap.
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Biblioteca
        </Link>
        <div className="navbar-nav me-auto">
          <Link className="nav-link" to="/books">
            Libros
          </Link>
          {user?.role === 'ADMIN' && (
            <Link className="nav-link" to="/admin/books">
              Administracion
            </Link>
          )}
        </div>
        <span className="navbar-text me-3">{user?.name || user?.email}</span>
        <button className="btn btn-outline-light btn-sm" type="button" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </nav>
  )
}

// Se exporta la navbar.
export default Navbar

