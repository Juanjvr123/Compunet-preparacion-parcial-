import { useState } from 'react'; // Importa hook de estado.
import { useNavigate } from 'react-router-dom'; // Importa navegacion.
import { Alert, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'; // Importa UI.
import { useAuth } from '../hooks/useAuth.js'; // Importa auth.

const Login = () => { // Define pagina de login.
  const { login } = useAuth(); // Toma funcion login del contexto.
  const navigate = useNavigate(); // Permite cambiar ruta.
  const [username, setUsername] = useState(''); // Estado para usuario.
  const [password, setPassword] = useState(''); // Estado para contrasena.
  const [error, setError] = useState(''); // Estado para error visual.

  const handleSubmit = async (event) => { // Maneja envio del formulario.
    event.preventDefault(); // Evita recarga del navegador.
    try { // Intenta login.
      await login(username, password); // Llama contexto.
      navigate('/'); // Si funciona, va al dashboard.
    } catch { // Si falla.
      setError('Credenciales invalidas'); // Muestra error simple.
    } // Cierra try/catch.
  }; // Cierra submit.

  return ( // Devuelve UI.
    <Container maxWidth="xs" sx={{ mt: 8 }}> {/* Contenedor pequeno centrado. */}
      <Paper sx={{ p: 3 }}> {/* Tarjeta de formulario. */}
        <Typography variant="h5" gutterBottom>Iniciar sesion</Typography> {/* Titulo. */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>} {/* Error condicional. */}
        <Stack component="form" spacing={2} onSubmit={handleSubmit}> {/* Formulario vertical. */}
          <TextField label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required /> {/* Campo usuario. */}
          <TextField label="Contrasena" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> {/* Campo password. */}
          <Button type="submit" variant="contained">Entrar</Button> {/* Boton de login. */}
        </Stack> {/* Cierra formulario. */}
      </Paper> {/* Cierra tarjeta. */}
    </Container> // Cierra contenedor.
  ); // Finaliza retorno.
}; // Cierra pagina.

export default Login; // Exporta pagina.

