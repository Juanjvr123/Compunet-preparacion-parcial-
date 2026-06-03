// Se importa StrictMode para revision en desarrollo.
import { StrictMode } from 'react'

// Se importa createRoot para montar React.
import { createRoot } from 'react-dom/client'

// Se importa Bootstrap para estilos.
import 'bootstrap/dist/css/bootstrap.min.css'

// Se importa App.
import App from './App'

// Se obtiene el nodo raiz.
const rootElement = document.getElementById('root')

// Se renderiza la aplicacion.
createRoot(rootElement).render(
  // StrictMode no cambia la app en produccion.
  <StrictMode>
    {/* App contiene la pagina de tickets. */}
    <App />
  </StrictMode>,
)

