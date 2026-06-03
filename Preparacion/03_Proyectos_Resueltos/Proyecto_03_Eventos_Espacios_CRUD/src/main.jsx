// Se importa StrictMode para desarrollo.
import { StrictMode } from 'react'

// Se importa createRoot para iniciar React.
import { createRoot } from 'react-dom/client'

// Se importa Bootstrap para estilos rapidos.
import 'bootstrap/dist/css/bootstrap.min.css'

// Se importa la aplicacion principal.
import App from './App'

// Se obtiene el contenedor HTML.
const rootElement = document.getElementById('root')

// Se monta React en el contenedor.
createRoot(rootElement).render(
  // StrictMode ayuda a detectar errores comunes.
  <StrictMode>
    {/* App contiene la pagina CRUD. */}
    <App />
  </StrictMode>,
)

