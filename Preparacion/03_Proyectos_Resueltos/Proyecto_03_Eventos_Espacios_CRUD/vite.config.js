// Se importa defineConfig para configurar Vite.
import { defineConfig } from 'vite'

// Se importa el plugin de React.
import react from '@vitejs/plugin-react'

// Se exporta la configuracion.
export default defineConfig({
  // React queda habilitado para archivos JSX.
  plugins: [react()],
})

