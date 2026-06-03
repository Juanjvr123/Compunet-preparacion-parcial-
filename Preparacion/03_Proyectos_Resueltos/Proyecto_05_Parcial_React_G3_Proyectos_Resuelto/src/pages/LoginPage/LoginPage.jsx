// Componentes de Material UI.
import { Box, Container, Typography } from '@mui/material'

// useState maneja carga y error.
import { useState } from 'react'

// useNavigate redirige despues de login.
import { Navigate, useNavigate } from 'react-router-dom'

// Formulario visual de login.
import LoginForm from '../../components/Auth/LoginForm'

// Hook de autenticacion.
import { useAuthContext } from '../../hooks/useAuthContext'

// Servicio POST /public/authentication/login.
import { signin } from '../../services/authService'

// Imagen de apoyo del proyecto original.
import heroImage from '../../assets/hero.png'

// Pagina publica de inicio de sesion.
const LoginPage = () => {
  // Estado visible mientras se ejecuta POST login.
  const [loading, setLoading] = useState(false)

  // Error visible si falla el login.
  const [error, setError] = useState('')

  // Contexto para guardar token y usuario.
  const { isAuthenticated, login } = useAuthContext()

  // Navegacion programatica.
  const navigate = useNavigate()

  // Si ya hay sesion, no se muestra login.
  if (isAuthenticated) {
    return <Navigate replace to="/projects" />
  }

  // Maneja envio del formulario.
  const handleSubmit = async (credentials) => {
    // Activa carga.
    setLoading(true)

    // Limpia error anterior.
    setError('')

    try {
      // Ejecuta POST de login con username, password y sysid.
      const loginResponse = await signin(credentials)

      // Valida que la respuesta tenga accessToken.
      if (!loginResponse.accessToken) {
        throw new Error('La respuesta no contiene accessToken')
      }

      // Guarda accessToken, tokenType, usuario y permisos.
      login(loginResponse)

      // Redirige a la ruta correcta; en el proyecto base estaba mal como /project.
      navigate('/projects')
    } catch (requestError) {
      // Muestra mensaje claro para el usuario.
      setError(requestError.message || 'No fue posible iniciar sesion')
    } finally {
      // Apaga carga.
      setLoading(false)
    }
  }

  // Retorna layout de login.
  return (
    <Box
      sx={{
        // Altura minima de pantalla completa.
        minHeight: '100vh',

        // Fondo institucional suave.
        bgcolor: '#edf3fb',

        // Alinea contenido al centro.
        display: 'flex',

        // Centra verticalmente.
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            // Layout responsive de dos columnas.
            display: 'grid',

            // En escritorio usa dos columnas; en movil, una.
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },

            // Separacion entre hero y formulario.
            gap: 4,

            // Alinea verticalmente.
            alignItems: 'center',
          }}
        >
          {/* Bloque de presentacion visual. */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="h2" fontWeight={900} sx={{ mb: 2 }}>
              Sistema Manejador de Encuestas
            </Typography>

            <Typography color="text.secondary" variant="h6" sx={{ mb: 4 }}>
              Consulta proyectos desde la API, valida permisos y muestra tarjetas dinamicas.
            </Typography>

            <Box
              component="img"
              src={heroImage}
              sx={{
                // La imagen se mantiene dentro del contenedor.
                maxWidth: '100%',

                // Bordes suaves.
                borderRadius: 4,

                // Sombra similar a una pantalla de referencia.
                boxShadow: '0 18px 50px rgba(15, 23, 42, 0.18)',
              }}
            />
          </Box>

          {/* Formulario de login. */}
          <LoginForm error={error} loading={loading} onSubmit={handleSubmit} />
        </Box>
      </Container>
    </Box>
  )
}

// Se exporta LoginPage.
export default LoginPage

