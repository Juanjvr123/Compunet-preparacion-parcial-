import { AppBar, Button, Toolbar, Typography } from '@mui/material'; // Importa componentes de barra.
import { Link, useNavigate } from 'react-router-dom'; // Importa navegacion.
import { useAuth } from '../hooks/useAuth.js'; // Importa usuario global.

const Navbar = () => { // Define barra superior.
  const { user, logout } = useAuth(); // Lee usuario y funcion logout.
  const navigate = useNavigate(); // Permite redireccionar por codigo.

  const handleLogout = () => { // Maneja cierre de sesion.
    logout(); // Limpia token y usuario.
    navigate('/login'); // Vuelve al login.
  }; // Cierra handler.

  if (!user) return null; // No muestra navbar en login.

  return ( // Devuelve barra.
    <AppBar position="static"> {/* Barra fija arriba del contenido. */}
      <Toolbar> {/* Contenedor horizontal. */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Actividad Fisica</Typography> {/* Titulo de app. */}
        <Button color="inherit" component={Link} to="/">Inicio</Button> {/* Link a dashboard. */}
        <Button color="inherit" component={Link} to="/routines">Rutinas</Button> {/* Link a rutinas. */}
        <Button color="inherit" component={Link} to="/progress">Progreso</Button> {/* Link a progreso. */}
        {user.role === 'COACH' && <Button color="inherit" component={Link} to="/coach">Coach</Button>} {/* Link solo coach. */}
        {user.role === 'ADMIN' && <Button color="inherit" component={Link} to="/admin">Admin</Button>} {/* Link solo admin. */}
        <Button color="inherit" onClick={handleLogout}>Salir</Button> {/* Cierra sesion. */}
      </Toolbar> {/* Cierra toolbar. */}
    </AppBar> // Cierra appbar.
  ); // Finaliza retorno.
}; // Cierra componente.

export default Navbar; // Exporta navbar.

