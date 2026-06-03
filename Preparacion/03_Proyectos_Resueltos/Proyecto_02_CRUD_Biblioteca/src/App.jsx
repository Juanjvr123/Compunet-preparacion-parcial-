// Routes y Route definen las paginas disponibles.
import { Navigate, Route, Routes } from 'react-router-dom'

// Navbar aparece en las paginas internas.
import Navbar from './components/Navbar'

// ProtectedRoute bloquea paginas sin sesion.
import ProtectedRoute from './components/ProtectedRoute'

// RoleRoute bloquea paginas por rol.
import RoleRoute from './components/RoleRoute'

// Pagina publica de login.
import Login from './pages/Login'

// Pagina inicial despues de iniciar sesion.
import Dashboard from './pages/Dashboard'

// Pagina donde se consulta la lista de libros.
import BooksPage from './pages/BooksPage'

// Pagina administrativa para gestionar libros.
import AdminPage from './pages/AdminPage'

// Componente principal de rutas.
const App = () => {
  // Se retorna el arbol de rutas.
  return (
    <Routes>
      {/* Ruta publica para iniciar sesion. */}
      <Route path="/login" element={<Login />} />

      {/* Rutas internas protegidas por autenticacion. */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Ruta protegida para consultar libros. */}
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Navbar />
            <BooksPage />
          </ProtectedRoute>
        }
      />

      {/* Ruta protegida por rol administrativo. */}
      <Route
        path="/admin/books"
        element={
          <RoleRoute allowedRoles={['ADMIN']}>
            <Navbar />
            <AdminPage />
          </RoleRoute>
        }
      />

      {/* Cualquier ruta desconocida vuelve al inicio. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

// Se exporta App para usarlo en main.jsx.
export default App

