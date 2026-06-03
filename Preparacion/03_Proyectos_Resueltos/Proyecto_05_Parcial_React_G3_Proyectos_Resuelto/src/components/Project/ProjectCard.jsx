// Iconos usados en el menu de acciones.
import EditIcon from '@mui/icons-material/Edit'
import LinkIcon from '@mui/icons-material/Link'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'

// Componentes visuales de Material UI.
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'

// useState controla la apertura del menu.
import { useState } from 'react'

// Servicio que construye URL de imagen.
import { buildProjectImageUrl } from '../../services/projectService'

// Logo local usado cuando el proyecto no trae imagen.
import logoIcesi from '../../assets/logo-icesi.png'

// Tarjeta visual de un proyecto.
const ProjectCard = ({
  project,
  canCreateInterview,
  canEditProject,
  canViewSurvey,
  onCreateInterview,
  onEdit,
  onOpenSurvey,
}) => {
  // anchorEl guarda el boton que abre el menu.
  const [anchorEl, setAnchorEl] = useState(null)

  // open indica si el menu esta visible.
  const open = Boolean(anchorEl)

  // imageUrl final con base publica del backend.
  const imageUrl = buildProjectImageUrl(project.imageUrl)

  // Abre el menu de acciones.
  const handleMenuOpen = (event) => {
    // Evita que el clic del menu active la tarjeta.
    event.stopPropagation()

    // Guarda el elemento ancla del menu.
    setAnchorEl(event.currentTarget)
  }

  // Cierra el menu.
  const handleMenuClose = () => {
    // Limpia el ancla.
    setAnchorEl(null)
  }

  // Maneja clic sobre la tarjeta.
  const handleCardClick = () => {
    // Si no tiene view-survey, la tarjeta no ejecuta accion.
    if (!canViewSurvey) {
      return
    }

    // Si tiene permiso, se abre la vista de encuestas.
    onOpenSurvey(project)
  }

  // Retorna la tarjeta.
  return (
    <Card
      onClick={handleCardClick}
      sx={{
        // Altura completa para que las tarjetas queden parejas.
        height: '100%',

        // Borde suave como el ejemplo base.
        borderRadius: 3,

        // Sombra principal.
        boxShadow: '0 10px 28px rgba(15, 23, 42, 0.12)',

        // Cursor solo si el usuario puede abrir encuestas.
        cursor: canViewSurvey ? 'pointer' : 'default',

        // Transicion visual al pasar el mouse.
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',

        // Efecto hover similar a la tarjeta original.
        '&:hover': {
          transform: canViewSurvey ? 'translateY(-3px)' : 'none',
          boxShadow: canViewSurvey ? '0 14px 34px rgba(15, 23, 42, 0.18)' : '0 10px 28px rgba(15, 23, 42, 0.12)',
        },
      }}
    >
      {/* Imagen del proyecto o logo local si no existe imageUrl. */}
      <CardMedia
        alt={project.name}
        component="img"
        image={imageUrl || logoIcesi}
        sx={{
          // Alto fijo para mantener tarjetas uniformes.
          height: 190,

          // objectFit contain respeta logos sin recortarlos.
          objectFit: 'contain',

          // Fondo claro para imagenes transparentes.
          bgcolor: '#f4f6fb',

          // Espaciado interno visual de la imagen.
          p: 3,
        }}
      />

      {/* Contenido textual y acciones. */}
      <CardContent
        sx={{
          // Altura restante de la tarjeta.
          minHeight: 230,

          // Organizacion vertical.
          display: 'flex',

          // Permite separar contenido y estado.
          flexDirection: 'column',
        }}
      >
        {/* Fila de titulo y menu. */}
        <Box
          sx={{
            // Distribuye titulo y boton.
            display: 'flex',

            // Alinea arriba.
            alignItems: 'flex-start',

            // Separacion entre titulo y menu.
            gap: 1,
          }}
        >
          {/* Titulo del proyecto recibido por API. */}
          <Typography component="h2" variant="h6" fontWeight={800} sx={{ flex: 1 }}>
            {project.name}
          </Typography>

          {/* Menu solo aparece si existe al menos una accion visible. */}
          {(canEditProject || canCreateInterview || canViewSurvey) && (
            <IconButton aria-label="acciones del proyecto" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>

        {/* Descripcion recibida por API. */}
        <Typography
          color="text.secondary"
          sx={{
            // Separacion superior.
            mt: 1,

            // Altura controlada para descripciones largas.
            display: '-webkit-box',

            // Numero maximo de lineas visibles.
            WebkitLineClamp: 5,

            // Orientacion requerida por line clamp.
            WebkitBoxOrient: 'vertical',

            // Oculta exceso de texto.
            overflow: 'hidden',
          }}
        >
          {project.description || 'Sin descripcion disponible.'}
        </Typography>

        {/* Estado del proyecto; el PDF muestra state en la respuesta. */}
        <Typography color="primary" fontWeight={700} sx={{ mt: 'auto', pt: 2 }}>
          Estado: {project.state || 'No definido'}
        </Typography>
      </CardContent>

      {/* Menu de acciones controlado por permisos. */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {/* view-survey: permite abrir encuestas asociadas. */}
        {canViewSurvey && (
          <MenuItem
            onClick={(event) => {
              event.stopPropagation()
              handleMenuClose()
              onOpenSurvey(project)
            }}
          >
            <ListItemIcon>
              <LinkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Ver encuestas" />
          </MenuItem>
        )}

        {/* edit-project: muestra opcion editar. */}
        {canEditProject && (
          <MenuItem
            onClick={(event) => {
              event.stopPropagation()
              handleMenuClose()
              onEdit(project)
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Editar proyecto" />
          </MenuItem>
        )}

        {/* create-interviews: muestra accion para crear entrevistas. */}
        {canCreateInterview && (
          <MenuItem
            onClick={(event) => {
              event.stopPropagation()
              handleMenuClose()
              onCreateInterview(project)
            }}
          >
            <ListItemIcon>
              <RecordVoiceOverIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Crear entrevistas" />
          </MenuItem>
        )}
      </Menu>
    </Card>
  )
}

// Se exporta para usarlo en ProjectList.
export default ProjectCard

