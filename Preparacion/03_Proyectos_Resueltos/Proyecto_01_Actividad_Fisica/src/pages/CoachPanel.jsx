import { Alert, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'; // Importa UI.

const students = [ // Datos de ejemplo para mostrar estructura si aun no conectas backend.
  { id: 1, name: 'Ana Gomez', routine: 'Cardio basico', progress: 70 }, // Estudiante 1.
  { id: 2, name: 'Luis Perez', routine: 'Fuerza inicial', progress: 45 } // Estudiante 2.
]; // Cierra arreglo.

const CoachPanel = () => { // Define panel coach.
  return ( // Devuelve UI.
    <Container sx={{ mt: 4 }}> {/* Contenedor. */}
      <Typography variant="h4" gutterBottom>Panel de entrenador</Typography> {/* Titulo. */}
      <Alert severity="info" sx={{ mb: 2 }}>Aqui se muestran estudiantes asignados y su progreso.</Alert> {/* Mensaje. */}
      <Table> {/* Tabla. */}
        <TableHead> {/* Cabecera. */}
          <TableRow> {/* Fila. */}
            <TableCell>Estudiante</TableCell> {/* Columna. */}
            <TableCell>Rutina</TableCell> {/* Columna. */}
            <TableCell>Progreso</TableCell> {/* Columna. */}
          </TableRow> {/* Cierra fila. */}
        </TableHead> {/* Cierra head. */}
        <TableBody> {/* Cuerpo. */}
          {students.map((student) => ( // Recorre estudiantes.
            <TableRow key={student.id}> {/* Fila. */}
              <TableCell>{student.name}</TableCell> {/* Nombre. */}
              <TableCell>{student.routine}</TableCell> {/* Rutina. */}
              <TableCell>{student.progress}%</TableCell> {/* Progreso. */}
            </TableRow> // Cierra fila.
          ))} {/* Cierra map. */}
        </TableBody> {/* Cierra body. */}
      </Table> {/* Cierra tabla. */}
    </Container> // Cierra contenedor.
  ); // Finaliza retorno.
}; // Cierra componente.

export default CoachPanel; // Exporta panel.

