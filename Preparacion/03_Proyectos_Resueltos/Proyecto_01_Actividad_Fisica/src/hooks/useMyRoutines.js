import { useCallback, useEffect, useState } from 'react'; // Importa hooks necesarios.
import { getMyRoutines } from '../services/routineService.js'; // Importa servicio de rutinas.

export const useMyRoutines = () => { // Define hook reutilizable.
  const [routines, setRoutines] = useState([]); // Guarda rutinas cargadas.
  const [loading, setLoading] = useState(true); // Indica si esta cargando.
  const [error, setError] = useState(null); // Guarda error si falla la API.

  const refresh = useCallback(async () => { // Funcion para cargar o recargar.
    try { // Intenta pedir datos.
      setLoading(true); // Activa loading.
      const data = await getMyRoutines(); // Llama servicio.
      setRoutines(data); // Guarda rutinas.
      setError(null); // Limpia error previo.
    } catch (err) { // Captura error.
      setError(err.message || 'Error al cargar rutinas'); // Guarda mensaje.
    } finally { // Siempre se ejecuta.
      setLoading(false); // Apaga loading.
    } // Cierra try.
  }, []); // No depende de variables externas.

  useEffect(() => { // Carga al montar componente.
    refresh(); // Ejecuta la carga inicial.
  }, [refresh]); // Depende de refresh.

  return { routines, loading, error, refresh }; // Expone datos y recarga.
}; // Cierra hook.

