import { StrictMode } from 'react'; // Importa StrictMode para detectar problemas comunes durante desarrollo.
import { createRoot } from 'react-dom/client'; // Importa la funcion que monta React en el HTML.
import App from './App.jsx'; // Importa el componente raiz de toda la aplicacion.

createRoot(document.getElementById('root')).render( // Busca el div con id root y renderiza la app dentro.
  <StrictMode> {/* Activa verificaciones extra de React en desarrollo. */}
    <App /> {/* Carga toda la SPA. */}
  </StrictMode> // Cierra StrictMode.
); // Finaliza el render principal.

