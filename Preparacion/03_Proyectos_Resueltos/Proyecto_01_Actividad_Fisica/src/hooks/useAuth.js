import { useContext } from 'react'; // Importa hook para leer contextos.
import { AuthContext } from '../context/AuthContext.js'; // Importa contexto de autenticacion.

export const useAuth = () => useContext(AuthContext); // Devuelve usuario, loading, login y logout desde cualquier componente.

