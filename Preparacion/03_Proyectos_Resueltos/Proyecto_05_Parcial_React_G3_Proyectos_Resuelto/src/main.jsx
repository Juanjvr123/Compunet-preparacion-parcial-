// StrictMode ayuda a detectar problemas durante desarrollo.
import { StrictMode } from 'react'

// createRoot monta React en el div root.
import { createRoot } from 'react-dom/client'

// RouterProvider activa el router definido abajo.
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

// Ruta protegida para paginas privadas.
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// Basename configurable para despliegue.
import { ROUTER_BASENAME } from './config/apiConfig'

// Provider de autenticacion.
import AuthProvider from './context/AuthContext'

// Pagina publica.
import LoginPage from './pages/LoginPage/LoginPage'

// Pagina privada.
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'

// Estilos globales minimos.
import './styles.css'

// Definicion de rutas del parcial.
const router = createBrowserRouter(
  [
    {
      // Raiz de la aplicacion.
      path: '/',

      // Redirige a proyectos; el proyecto base redirigia a /courses, que no existe.
      element: <Navigate replace to="/projects" />,
    },
    {
      // Ruta publica de login.
      path: '/login',

      // Pagina de login.
      element: <LoginPage />,
    },
    {
      // Este elemento protege todas sus rutas hijas.
      element: <ProtectedRoute />,

      // Rutas que requieren token.
      children: [
        {
          // Ruta correcta de proyectos.
          path: '/projects',

          // Pagina principal del parcial.
          element: <ProjectsPage />,
        },
      ],
    },
    {
      // Cualquier ruta desconocida vuelve a proyectos.
      path: '*',

      // Redireccion de seguridad.
      element: <Navigate replace to="/projects" />,
    },
  ],
  {
    // Cambia VITE_ROUTER_BASENAME si despliegas en subcarpeta.
    basename: ROUTER_BASENAME,
  },
)

// Se obtiene el nodo root del HTML.
const rootElement = document.getElementById('root')

// Se crea y renderiza la aplicacion.
createRoot(rootElement).render(
  // StrictMode solo afecta desarrollo.
  <StrictMode>
    {/* AuthProvider permite usar login, logout, token y usuario en toda la app. */}
    <AuthProvider>
      {/* RouterProvider conecta las rutas con React. */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

