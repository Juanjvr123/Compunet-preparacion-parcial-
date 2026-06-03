// Se importa StrictMode para ayudar a detectar problemas durante desarrollo.
import { StrictMode } from 'react'

// Se importa createRoot para montar la aplicacion React.
import { createRoot } from 'react-dom/client'

// Se importa BrowserRouter para manejar rutas en la SPA.
import { BrowserRouter } from 'react-router-dom'

// Se importa Bootstrap como libreria de estilos.
import 'bootstrap/dist/css/bootstrap.min.css'

// Se importa el componente principal de la aplicacion.
import App from './App'

// Se importa el proveedor de autenticacion.
import AuthProvider from './context/AuthProvider'

// Se busca el div root definido en index.html.
const rootElement = document.getElementById('root')

// Se crea la raiz de React.
const root = createRoot(rootElement)

// Se renderiza toda la aplicacion.
root.render(
  // StrictMode solo afecta desarrollo.
  <StrictMode>
    {/* BrowserRouter permite usar Route, Link y Navigate. */}
    <BrowserRouter>
      {/* AuthProvider comparte usuario y token con toda la app. */}
      <AuthProvider>
        {/* App contiene la estructura de rutas. */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

