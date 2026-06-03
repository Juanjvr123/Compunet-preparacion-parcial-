// Se importa defineConfig para configurar Vite.
import { defineConfig } from 'vite'

// Se importa el plugin oficial de React.
import react from '@vitejs/plugin-react'

// Se exporta la configuracion del proyecto.
export default defineConfig({
  // El plugin permite JSX moderno y recarga rapida.
  plugins: [react()],
})

