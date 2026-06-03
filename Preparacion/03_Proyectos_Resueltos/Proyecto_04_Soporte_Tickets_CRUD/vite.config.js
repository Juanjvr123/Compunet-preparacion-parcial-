// Se importa defineConfig para configurar Vite.
import { defineConfig } from 'vite'

// Se importa el plugin oficial de React.
import react from '@vitejs/plugin-react'

// Se exporta la configuracion.
export default defineConfig({
  // El plugin habilita transformacion correcta de JSX.
  plugins: [react()],
})

