// Icono para boton de crear.
import AddIcon from '@mui/icons-material/Add'

// Icono para cerrar sesion.
import LogoutIcon from '@mui/icons-material/Logout'

// Componentes visuales.
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'

// useNavigate permite redirigir al cerrar sesion.
import { useNavigate } from 'react-router-dom'

// Estado visible de error.
import ErrorState from '../../components/State/ErrorState'

// Estado visible de carga.
import LoadingState from '../../components/State/LoadingState'

// Lista de proyectos.
import ProjectList from '../../components/Project/ProjectList'

// Permisos requeridos por el PDF.
import { REQUIRED_PERMISSIONS } from '../../config/apiConfig'

// Hook de autenticacion.
import { useAuthContext } from '../../hooks/useAuthContext'

// Hook reusable para permisos.
import { usePermission } from '../../hooks/usePermission'

// Hook que ejecuta GET /projects.
import { useProjects } from '../../hooks/useProjects'

// Funciones para crear URLs de acciones.
import { buildCreateInterviewUrl, buildProjectSurveyUrl } from '../../services/projectService'

// Logo institucional.
import logoIcesi from '../../assets/logo-icesi.png'

// Pagina principal protegida.
const ProjectsPage = () => {
  // Se obtiene token para llamar proyectos.
  const { logout, token, tokenType, user } = useAuthContext()

  // Se consulta la lista de proyectos.
  const { error, loading, projects, reload } = useProjects({ token, tokenType })

  // Permiso para mostrar boton crear proyecto.
  const { isAuthorized: canCreateProject } = usePermission(REQUIRED_PERMISSIONS.createProject)

  // Permiso para mostrar editar en cada proyecto.
  const { isAuthorized: canEditProject } = usePermission(REQUIRED_PERMISSIONS.editProject)

  // Permiso para permitir clic hacia encuestas.
  const { isAuthorized: canViewSurvey } = usePermission(REQUIRED_PERMISSIONS.viewSurvey)

  // Permiso para mostrar accion crear entrevistas.
  const { isAuthorized: canCreateInterview } = usePermission(REQUIRED_PERMISSIONS.createInterviews)

  // Navegador programatico.
  const navigate = useNavigate()

  // Cierra sesion y vuelve al login.
  const handleLogout = () => {
    // Limpia localStorage y estado global.
    logout()

    // Redirige a login.
    navigate('/login')
  }

  // Accion visible solo con create-project.
  const handleCreateProject = () => {
    // Si el docente entrega endpoint de creacion, cambia este alert por modal o ruta.
    alert('Abrir formulario para crear proyecto')
  }

  // Accion visible solo con edit-project.
  const handleEditProject = (project) => {
    // Si el docente entrega endpoint PUT, cambia este alert por formulario de edicion.
    alert(`Editar proyecto: ${project.name}`)
  }

  // Accion permitida solo con view-survey.
  const handleOpenSurvey = (project) => {
    // Se construye URL destino; cambia la funcion si el docente entrega otra ruta.
    const surveyUrl = buildProjectSurveyUrl(project)

    // Abre el sistema de encuestas en otra pestana.
    window.open(surveyUrl, '_blank', 'noopener,noreferrer')
  }

  // Accion visible solo con create-interviews.
  const handleCreateInterview = (project) => {
    // Se construye URL destino para crear entrevistas.
    const interviewUrl = buildCreateInterviewUrl(project)

    // Abre el sistema externo.
    window.open(interviewUrl, '_blank', 'noopener,noreferrer')
  }

  // Retorna pantalla completa.
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fb' }}>
      {/* Barra superior similar a una app real. */}
      <AppBar color="inherit" elevation={0} position="sticky" sx={{ borderBottom: '1px solid #e5e7eb' }}>
        <Toolbar sx={{ gap: 2 }}>
          {/* Logo local del proyecto original. */}
          <Box component="img" src={logoIcesi} sx={{ height: 38, width: 'auto' }} />

          {/* Nombre del modulo. */}
          <Typography fontWeight={900} sx={{ flex: 1 }}>
            Proyectos del Sistema Manejador de Encuestas
          </Typography>

          {/* Nombre de usuario autenticado. */}
          <Typography color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
            {user?.name || user?.username}
          </Typography>

          {/* Boton para cerrar sesion. */}
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      {/* Contenido principal. */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Encabezado y accion principal. */}
        <Box
          sx={{
            // Distribuye titulo y boton.
            display: 'flex',

            // En movil pasa a columna.
            flexDirection: { xs: 'column', md: 'row' },

            // Separacion responsive.
            gap: 3,

            // Alineacion vertical.
            alignItems: { xs: 'flex-start', md: 'center' },

            // Espacio inferior antes de tarjetas.
            mb: 4,
          }}
        >
          {/* Textos principales de la pantalla. */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight={900} gutterBottom>
              Proyectos disponibles
            </Typography>

            <Typography color="text.secondary" variant="h6">
              Elige uno de los proyectos disponibles para acceder a su informacion y continuar con el proceso.
            </Typography>
          </Box>

          {/* create-project: si no tiene permiso, el boton no aparece. */}
          {canCreateProject && (
            <Button size="large" startIcon={<AddIcon />} variant="contained" onClick={handleCreateProject}>
              Crear nuevo proyecto
            </Button>
          )}
        </Box>

        {/* Estado de carga exigido por el parcial. */}
        {loading && <LoadingState message="Consultando proyectos..." />}

        {/* Estado de error exigido por el parcial. */}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}

        {/* Estado exitoso con renderizado dinamico. */}
        {!loading && !error && (
          <ProjectList
            canCreateInterview={canCreateInterview}
            canEditProject={canEditProject}
            canViewSurvey={canViewSurvey}
            projects={projects}
            onCreateInterview={handleCreateInterview}
            onEdit={handleEditProject}
            onOpenSurvey={handleOpenSurvey}
          />
        )}
      </Container>
    </Box>
  )
}

// Se exporta ProjectsPage.
export default ProjectsPage

