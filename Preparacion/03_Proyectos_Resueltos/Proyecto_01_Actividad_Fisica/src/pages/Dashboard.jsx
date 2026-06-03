import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@mui/material'; // Importa UI.
import { useNavigate } from 'react-router-dom'; // Importa navegacion.
import { useAuth } from '../hooks/useAuth.js'; // Importa usuario autenticado.

const Dashboard = () => { // Define dashboard.
  const { user } = useAuth(); // Obtiene usuario.
  const navigate = useNavigate(); // Prepara navegacion.

  return ( // Devuelve UI.
    <Container sx={{ mt: 4 }}> {/* Contenedor principal. */}
      <Typography variant="h4" gutterBottom>Bienvenido, {user?.username}</Typography> {/* Saludo. */}
      <Typography color="text.secondary" sx={{ mb: 3 }}>Rol actual: {user?.role}</Typography> {/* Muestra rol. */}
      <Grid container spacing={2}> {/* Grid responsivo. */}
        <Grid item xs={12} md={4}> {/* Columna. */}
          <Card> {/* Tarjeta. */}
            <CardContent> {/* Contenido. */}
              <Typography variant="h6">Mis rutinas</Typography> {/* Titulo tarjeta. */}
              <Typography color="text.secondary">Consulta rutinas asignadas.</Typography> {/* Descripcion. */}
            </CardContent> {/* Cierra contenido. */}
            <CardActions> {/* Acciones. */}
              <Button onClick={() => navigate('/routines')}>Ver</Button> {/* Boton. */}
            </CardActions> {/* Cierra acciones. */}
          </Card> {/* Cierra card. */}
        </Grid> {/* Cierra columna. */}
        <Grid item xs={12} md={4}> {/* Columna. */}
          <Card> {/* Tarjeta. */}
            <CardContent> {/* Contenido. */}
              <Typography variant="h6">Progreso</Typography> {/* Titulo. */}
              <Typography color="text.secondary">Registra avance y descarga reportes.</Typography> {/* Texto. */}
            </CardContent> {/* Cierra contenido. */}
            <CardActions> {/* Acciones. */}
              <Button onClick={() => navigate('/progress')}>Entrar</Button> {/* Boton. */}
            </CardActions> {/* Cierra acciones. */}
          </Card> {/* Cierra tarjeta. */}
        </Grid> {/* Cierra columna. */}
        {user?.role === 'COACH' && ( // Render condicional para coach.
          <Grid item xs={12} md={4}> {/* Columna. */}
            <Card> {/* Tarjeta. */}
              <CardContent> {/* Contenido. */}
                <Typography variant="h6">Panel coach</Typography> {/* Titulo. */}
                <Typography color="text.secondary">Visualiza estudiantes asignados.</Typography> {/* Texto. */}
              </CardContent> {/* Cierra contenido. */}
              <CardActions> {/* Acciones. */}
                <Button onClick={() => navigate('/coach')}>Abrir</Button> {/* Boton. */}
              </CardActions> {/* Cierra acciones. */}
            </Card> {/* Cierra tarjeta. */}
          </Grid> // Cierra columna.
        )} {/* Cierra condicional. */}
      </Grid> {/* Cierra grid. */}
    </Container> // Cierra contenedor.
  ); // Finaliza retorno.
}; // Cierra componente.

export default Dashboard; // Exporta dashboard.

