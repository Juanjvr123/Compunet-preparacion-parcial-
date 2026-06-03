// Se importa defineConfig para escribir configuracion de Vite con formato claro.
import { defineConfig } from 'vite'

// Se importa el plugin oficial de React; este plugin es necesario para JSX y Fast Refresh.
import react from '@vitejs/plugin-react'

// Se exporta la configuracion del proyecto; en un parcial casi nunca necesitas agregar mas.
export default defineConfig({
  // Si falla JSX o React Refresh, revisa que este plugin este presente.
  plugins: [react()],
})

