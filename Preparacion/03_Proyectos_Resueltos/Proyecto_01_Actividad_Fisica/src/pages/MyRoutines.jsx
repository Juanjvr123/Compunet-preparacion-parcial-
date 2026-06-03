import { Alert, CircularProgress, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'; // Importa UI.
import { useMyRoutines } from '../hooks/useMyRoutines.js'; // Importa hook de rutinas.

const MyRoutines = () => { // Define pagina.
  const { routines, loading, error } = useMyRoutines(); // Carga rutinas.

  if (loading) return <CircularProgress />; // Muestra cargando.
  if (error) return <Alert severity="error">{error}</Alert>; // Muestra error.

  return ( // Devuelve contenido.
    <Container sx={{ mt: 4 }}> {/* Contenedor. */}
      <Typography variant="h4" gutterBottom>Mis rutinas</Typography> {/* Titulo. */}
      <Table> {/* Tabla principal. */}
        <TableHead> {/* Cabecera. */}
          <TableRow> {/* Fila cabecera. */}
            <TableCell>Nombre</TableCell> {/* Columna. */}
            <TableCell>Dificultad</TableCell> {/* Columna. */}
            <TableCell>Duracion</TableCell> {/* Columna. */}
          </TableRow> {/* Cierra fila. */}
        </TableHead> {/* Cierra cabecera. */}
        <TableBody> {/* Cuerpo. */}
          {routines.map((routine) => ( // Recorre rutinas.
            <TableRow key={routine.id}> {/* Fila por rutina. */}
              <TableCell>{routine.name}</TableCell> {/* Nombre. */}
              <TableCell>{routine.difficultyLevel}</TableCell> {/* Dificultad. */}
              <TableCell>{routine.duration} min</TableCell> {/* Duracion. */}
            </TableRow> // Cierra fila.
          ))} {/* Cierra map. */}
        </TableBody> {/* Cierra cuerpo. */}
      </Table> {/* Cierra tabla. */}
    </Container> // Cierra contenedor.
  ); // Finaliza retorno.
}; // Cierra pagina.

export default MyRoutines; // Exporta pagina.

