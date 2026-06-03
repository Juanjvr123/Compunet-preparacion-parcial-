import { useState } from 'react'; // Importa useState para manejar mensajes.
import { Alert, Box, Button, CircularProgress, Container, LinearProgress, Snackbar, Stack, Typography } from '@mui/material'; // Importa UI.
import DownloadIcon from '@mui/icons-material/Download'; // Icono de descarga.
import { useAuth } from '../hooks/useAuth.js'; // Importa usuario.
import { useMyRoutines } from '../hooks/useMyRoutines.js'; // Importa rutinas.

const getProgressPercent = (routine) => { // Calcula avance porcentual.
  const suggested = Number(routine.suggestedWeeklyRepetitions) || 0; // Meta semanal.
  const actual = Number(routine.actualWeeklyRepetitions) || 0; // Avance semanal.
  if (!suggested) return 0; // Si no hay meta, el avance es cero.
  return Math.min(Math.round((actual / suggested) * 100), 100); // Calcula porcentaje maximo 100.
}; // Cierra helper.

const RoutineProgress = () => { // Define pagina de progreso.
  const { user } = useAuth(); // Obtiene usuario para el reporte.
  const { routines, loading, error } = useMyRoutines(); // Carga rutinas.
  const [message, setMessage] = useState(''); // Mensaje de snackbar.

  const handleDownloadPdf = async () => { // Genera PDF cuando el usuario hace clic.
    const { jsPDF } = await import('jspdf'); // Carga jsPDF solo cuando se necesita.
    const doc = new jsPDF(); // Crea documento PDF.
    let y = 20; // Define posicion vertical inicial.

    doc.setFontSize(16); // Define tamano de titulo.
    doc.text('Reporte personal de progreso', 14, y); // Escribe titulo.
    y += 10; // Baja una linea.
    doc.setFontSize(10); // Define tamano normal.
    doc.text(`Usuario: ${user?.username || 'usuario'}`, 14, y); // Escribe usuario.
    y += 6; // Baja una linea.
    doc.text(`Rutinas: ${routines.length}`, 14, y); // Escribe cantidad.
    y += 10; // Agrega espacio.

    routines.forEach((routine, index) => { // Recorre rutinas.
      if (y > 260) { // Si se acaba la pagina.
        doc.addPage(); // Agrega nueva pagina.
        y = 20; // Reinicia posicion vertical.
      } // Cierra condicion.
      const percent = getProgressPercent(routine); // Calcula progreso.
      doc.setFontSize(12); // Tamano para nombre.
      doc.text(`${index + 1}. ${routine.name}`, 14, y); // Escribe nombre.
      y += 7; // Baja.
      doc.setFontSize(10); // Tamano normal.
      doc.text(`Dificultad: ${routine.difficultyLevel || 'No definida'}`, 18, y); // Dificultad.
      y += 6; // Baja.
      doc.text(`Avance semanal: ${percent}%`, 18, y); // Avance.
      y += 6; // Baja.
      doc.text(`Repeticiones: ${routine.actualWeeklyRepetitions || 0}/${routine.suggestedWeeklyRepetitions || 0}`, 18, y); // Repeticiones.
      y += 8; // Baja con espacio.
    }); // Cierra recorrido.

    doc.save(`reporte-progreso-${user?.username || 'usuario'}.pdf`); // Descarga archivo.
    setMessage('Reporte descargado'); // Muestra mensaje.
  }; // Cierra handler.

  if (loading) return <CircularProgress />; // Loading.
  if (error) return <Alert severity="error">{error}</Alert>; // Error.

  return ( // Devuelve UI.
    <Container sx={{ mt: 4 }}> {/* Contenedor. */}
      <Typography variant="h4" gutterBottom>Progreso</Typography> {/* Titulo. */}
      <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownloadPdf} disabled={routines.length === 0}>Descargar PDF</Button> {/* Boton PDF. */}
      <Stack spacing={2} sx={{ mt: 3 }}> {/* Lista vertical. */}
        {routines.map((routine) => { // Recorre rutinas.
          const percent = getProgressPercent(routine); // Calcula porcentaje.
          return ( // Retorna bloque.
            <Box key={routine.id}> {/* Caja por rutina. */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}> {/* Fila titulo. */}
                <Typography>{routine.name}</Typography> {/* Nombre. */}
                <Typography color="text.secondary">{percent}%</Typography> {/* Porcentaje. */}
              </Box> {/* Cierra fila. */}
              <LinearProgress variant="determinate" value={percent} /> {/* Barra. */}
            </Box> // Cierra caja.
          ); // Cierra return.
        })} {/* Cierra map. */}
      </Stack> {/* Cierra stack. */}
      <Snackbar open={Boolean(message)} autoHideDuration={3000} onClose={() => setMessage('')} message={message} /> {/* Mensaje temporal. */}
    </Container> // Cierra contenedor.
  ); // Finaliza retorno.
}; // Cierra pagina.

export default RoutineProgress; // Exporta pagina.

