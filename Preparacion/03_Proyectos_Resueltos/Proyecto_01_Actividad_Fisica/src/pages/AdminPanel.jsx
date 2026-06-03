import { Alert, Container, Typography } from '@mui/material'; // Importa UI.

const AdminPanel = () => { // Define panel admin.
  return ( // Devuelve UI.
    <Container sx={{ mt: 4 }}> {/* Contenedor. */}
      <Typography variant="h4" gutterBottom>Panel administrativo</Typography> {/* Titulo. */}
      <Alert severity="info">Aqui se gestionan entrenadores, ejercicios, eventos y usuarios.</Alert> {/* Mensaje. */}
    </Container> // Cierra contenedor.
  ); // Finaliza retorno.
}; // Cierra componente.

export default AdminPanel; // Exporta pagina.

