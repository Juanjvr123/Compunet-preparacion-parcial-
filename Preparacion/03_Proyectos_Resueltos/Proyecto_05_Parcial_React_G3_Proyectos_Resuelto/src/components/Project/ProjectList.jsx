// Componentes de Material UI.
import { Alert, Grid } from '@mui/material'

// Tarjeta individual.
import ProjectCard from './ProjectCard'

// Lista de proyectos.
const ProjectList = ({
  canCreateInterview,
  canEditProject,
  canViewSurvey,
  onCreateInterview,
  onEdit,
  onOpenSurvey,
  projects,
}) => {
  // Si no hay proyectos, se muestra estado vacio.
  if (projects.length === 0) {
    return <Alert severity="info">No hay proyectos disponibles para mostrar.</Alert>
  }

  // Retorna grilla responsive de tarjetas.
  return (
    <Grid container spacing={3}>
      {/* Se renderiza una tarjeta por cada proyecto recibido desde API. */}
      {projects.map((project) => (
        <Grid key={project.id} item lg={4} md={6} xs={12}>
          <ProjectCard
            canCreateInterview={canCreateInterview}
            canEditProject={canEditProject}
            canViewSurvey={canViewSurvey}
            project={project}
            onCreateInterview={onCreateInterview}
            onEdit={onEdit}
            onOpenSurvey={onOpenSurvey}
          />
        </Grid>
      ))}
    </Grid>
  )
}

// Se exporta para usarlo en ProjectsPage.
export default ProjectList

