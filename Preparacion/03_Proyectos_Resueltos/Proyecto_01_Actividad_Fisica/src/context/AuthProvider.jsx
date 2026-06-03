import { useEffect, useState } from 'react'; // Importa hooks para estado y carga inicial.
import { jwtDecode } from 'jwt-decode'; // Importa decodificador de JWT.
import { AuthContext } from './AuthContext.js'; // Importa el contexto creado.
import { login as loginRequest } from '../services/authService.js'; // Importa servicio de login.

const readUserFromToken = (token) => { // Funcion auxiliar para convertir token en usuario.
  try { // Intenta decodificar el token.
    const decoded = jwtDecode(token); // Decodifica payload del JWT.
    return { // Devuelve un objeto simple para usar en la UI.
      id: decoded.userId || decoded.id, // Toma el id segun como venga del backend.
      username: decoded.username || decoded.sub, // Toma username o subject.
      role: decoded.role, // Toma rol principal.
      permissions: decoded.roles || decoded.permissions || [] // Toma permisos si existen.
    }; // Cierra objeto.
  } catch { // Si el token no se puede decodificar.
    return null; // Devuelve null para tratarlo como sesion invalida.
  } // Cierra try/catch.
}; // Cierra helper.

const AuthProvider = ({ children }) => { // Define proveedor que envuelve toda la app.
  const [user, setUser] = useState(null); // Guarda usuario autenticado.
  const [loading, setLoading] = useState(true); // Evita redireccionar antes de leer token.

  useEffect(() => { // Se ejecuta una vez al cargar la app.
    const token = localStorage.getItem('token'); // Busca token previo en navegador.
    if (token) { // Si existe token.
      const userData = readUserFromToken(token); // Lo decodifica.
      if (userData) { // Si el token era valido.
        setUser(userData); // Guarda usuario.
      } else { // Si no era valido.
        localStorage.removeItem('token'); // Limpia token danado.
      } // Cierra condicion interna.
    } // Cierra condicion token.
    setLoading(false); // Marca que ya termino la carga inicial.
  }, []); // Dependencias vacias para ejecutar solo una vez.

  const login = async (username, password) => { // Funcion usada por Login.jsx.
    const data = await loginRequest(username, password); // Llama al backend.
    localStorage.setItem('token', data.token); // Guarda token recibido.
    const userData = readUserFromToken(data.token); // Decodifica token.
    setUser(userData); // Guarda usuario global.
    return userData; // Devuelve usuario por si la pagina lo necesita.
  }; // Cierra login.

  const logout = () => { // Funcion para cerrar sesion.
    localStorage.removeItem('token'); // Borra token.
    setUser(null); // Limpia usuario.
  }; // Cierra logout.

  return ( // Devuelve provider.
    <AuthContext.Provider value={{ user, loading, login, logout }}> {/* Expone estado y funciones. */}
      {children} {/* Renderiza toda la app dentro. */}
    </AuthContext.Provider> // Cierra provider.
  ); // Finaliza retorno.
}; // Cierra componente.

export default AuthProvider; // Exporta proveedor.

