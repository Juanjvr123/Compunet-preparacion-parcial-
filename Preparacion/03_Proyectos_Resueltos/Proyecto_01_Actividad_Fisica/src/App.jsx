import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'; // Importa las piezas necesarias para manejar rutas.
import { CssBaseline } from '@mui/material'; // Normaliza estilos base de Material UI.
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Permite aplicar un tema global.
import AuthProvider from './context/AuthProvider.jsx'; // Proveedor global de autenticacion.
import Navbar from './components/Navbar.jsx'; // Barra superior reutilizable.
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Wrapper para rutas que requieren login.
import RoleRoute from './components/RoleRoute.jsx'; // Wrapper para rutas que requieren rol especifico.
import Login from './pages/Login.jsx'; // Pagina publica de inicio de sesion.
import Dashboard from './pages/Dashboard.jsx'; // Pagina principal despues del login.
import MyRoutines from './pages/MyRoutines.jsx'; // Pagina de rutinas del usuario.
import RoutineProgress from './pages/RoutineProgress.jsx'; // Pagina de progreso, estadisticas y PDF.
import CoachPanel from './pages/CoachPanel.jsx'; // Pagina exclusiva para entrenadores.
import AdminPanel from './pages/AdminPanel.jsx'; // Pagina exclusiva para administradores.

const theme = createTheme(); // Crea el tema base de Material UI sin personalizaciones innecesarias.

const App = () => { // Define el componente raiz.
  return ( // Devuelve la estructura principal.
    <ThemeProvider theme={theme}> {/* Aplica el tema a toda la app. */}
      <CssBaseline /> {/* Aplica estilos base consistentes. */}
      <AuthProvider> {/* Hace disponible el usuario y las funciones de auth. */}
        <BrowserRouter> {/* Activa navegacion SPA sin recargar la pagina. */}
          <Navbar /> {/* Muestra navegacion superior. */}
          <Routes> {/* Contenedor de rutas. */}
            <Route path="/login" element={<Login />} /> {/* Ruta publica. */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> {/* Ruta privada general. */}
            <Route path="/routines" element={<ProtectedRoute><MyRoutines /></ProtectedRoute>} /> {/* Rutinas del usuario autenticado. */}
            <Route path="/progress" element={<ProtectedRoute><RoutineProgress /></ProtectedRoute>} /> {/* Progreso personal. */}
            <Route path="/coach" element={<RoleRoute roles={['COACH']}><CoachPanel /></RoleRoute>} /> {/* Solo rol COACH. */}
            <Route path="/admin" element={<RoleRoute roles={['ADMIN']}><AdminPanel /></RoleRoute>} /> {/* Solo rol ADMIN. */}
            <Route path="*" element={<Navigate to="/" replace />} /> {/* Redireccion para rutas no existentes. */}
          </Routes> {/* Cierra rutas. */}
        </BrowserRouter> {/* Cierra router. */}
      </AuthProvider> {/* Cierra provider. */}
    </ThemeProvider> // Cierra tema.
  ); // Finaliza retorno.
}; // Finaliza componente.

export default App; // Exporta App para usarlo en main.jsx.

