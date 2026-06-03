// Se importa defineConfig para configurar Vite con autocompletado.
import { defineConfig } from 'vite'

// Se importa el plugin oficial de React.
import react from '@vitejs/plugin-react'

// Se exporta la configuracion de Vite.
export default defineConfig({
  // El plugin permite usar JSX moderno y Fast Refresh.
  plugins: [react()],
})

