# Guia maestra para resolver parciales de SPA React con API y JWT

## 1. Objetivo general

En este tipo de parcial normalmente se evalua que puedas construir una Single Page Application usando React, manejar rutas con `react-router-dom`, consumir una API con `axios`, autenticar usuarios con JWT, proteger paginas por rol y construir una interfaz limpia con una libreria visual como Material UI.

La clave no es hacer una aplicacion enorme. La clave es entregar una aplicacion organizada, funcional, facil de sustentar y con una estructura clara.

## 2. Checklist minimo de entrega

Antes de entregar, verifica esto:

- La app abre con `npm run dev`.
- La app compila con `npm run build`.
- ESLint pasa con `npm run lint`.
- Existe login.
- El token se guarda en `localStorage`.
- Axios envia el token automaticamente.
- Las rutas privadas no se pueden abrir sin login.
- Las rutas por rol se restringen correctamente.
- Hay paginas separadas.
- Hay componentes reutilizables.
- Hay servicios separados para API.
- Hay hooks para cargar datos.
- La UI usa Material UI, Bootstrap, Tailwind u otra libreria.
- La estructura de carpetas es clara.
- El README explica como ejecutar.

## 3. Estructura recomendada

```text
src/
  api/
    axiosConfig.js
  components/
    Navbar.jsx
    ProtectedRoute.jsx
    RoleRoute.jsx
    EntityTable.jsx
  context/
    AuthContext.js
    AuthProvider.jsx
  hooks/
    useAuth.js
    useEntityList.js
  pages/
    Login.jsx
    Dashboard.jsx
    AdminPanel.jsx
    UserPanel.jsx
  services/
    authService.js
    userService.js
    entityService.js
  App.jsx
  main.jsx
```

## 4. Instalacion base

```bash
npm create vite@latest nombre-proyecto -- --template react
cd nombre-proyecto
npm install
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install axios jwt-decode react-router-dom
npm install -D eslint
```

Si necesitas PDF:

```bash
npm install jspdf
```

Si necesitas graficos:

```bash
npm install recharts
```

Si no quieres instalar libreria de graficos en examen, puedes usar barras con `LinearProgress` de Material UI.

## 5. Flujo correcto de autenticacion

El flujo ideal es:

1. Usuario escribe credenciales en `Login.jsx`.
2. `authService.login` envia `POST /auth/login`.
3. El backend responde `{ token: "..." }`.
4. El token se guarda en `localStorage`.
5. `AuthProvider` decodifica el token.
6. `axiosConfig` agrega `Authorization: Bearer token`.
7. `ProtectedRoute` bloquea usuarios no autenticados.
8. `RoleRoute` bloquea usuarios sin rol permitido.

## 6. Axios con token

El archivo `api/axiosConfig.js` debe centralizar la URL base y el token.

Ventajas:

- No repites `http://localhost:8081/api` en todos lados.
- No agregas manualmente el token en cada peticion.
- Puedes manejar errores `401` de forma global.

Patron recomendado:

```jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## 7. Contexto de autenticacion

Usa contexto cuando varias paginas necesitan saber quien inicio sesion.

Datos que normalmente se guardan:

- `id`
- `username`
- `role`
- `permissions`
- `loading`

Errores comunes:

- Redirigir a login antes de terminar de leer el token.
- Guardar datos de usuario duplicados en muchas paginas.
- No borrar token al cerrar sesion.

## 8. Rutas protegidas

Hay dos niveles.

`ProtectedRoute` solo exige login.

`RoleRoute` exige login y rol.

Ejemplo:

```jsx
<Route path="/admin" element={
  <RoleRoute roles={['ADMIN']}>
    <AdminPanel />
  </RoleRoute>
} />
```

## 9. Servicios

Los servicios son archivos que hablan con la API.

No metas `axios.get` directamente en todas las paginas.

Ejemplo:

```jsx
import api from '../api/axiosConfig';

export const getRoutines = async () => {
  const response = await api.get('/rest/routines');
  return response.data;
};
```

## 10. Hooks personalizados

Un hook personalizado sirve para cargar datos y manejar estado.

Ejemplo:

```jsx
export const useRoutines = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getRoutines();
        setRoutines(data.content || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { routines, loading, error };
};
```

## 11. UI recomendada con Material UI

Para un parcial, usa componentes simples:

- `Container` para centrar contenido.
- `Typography` para titulos.
- `Button` para acciones.
- `TextField` para formularios.
- `Table` para listados.
- `Card` para dashboard.
- `Dialog` para formularios emergentes.
- `Alert` para errores.
- `Snackbar` para mensajes temporales.
- `LinearProgress` para estadisticas.

## 12. Patrones visuales utiles

### Dashboard

Usa tarjetas con acciones principales.

```jsx
<Grid container spacing={2}>
  <Grid item xs={12} md={4}>
    <Card>
      <CardContent>
        <Typography variant="h6">Mis rutinas</Typography>
        <Typography color="text.secondary">Consulta tu progreso.</Typography>
      </CardContent>
      <CardActions>
        <Button>Entrar</Button>
      </CardActions>
    </Card>
  </Grid>
</Grid>
```

### Tabla CRUD

Usa tabla si hay muchos registros.

```jsx
<Table>
  <TableHead>
    <TableRow>
      <TableCell>Nombre</TableCell>
      <TableCell>Estado</TableCell>
      <TableCell>Acciones</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {items.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.status}</TableCell>
        <TableCell>
          <Button>Editar</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## 13. Requerimientos tipicos y como resolverlos

### Login

Crear pagina `Login.jsx`, servicio `authService.js`, contexto `AuthProvider.jsx`.

### CRUD

Crear servicio, hook, pagina de lista y formulario.

### Rutas

Crear rutas en `App.jsx` con `BrowserRouter`, `Routes`, `Route`, `Navigate`.

### Roles

Decodificar token y crear `RoleRoute`.

### Estadisticas

Usar datos existentes y mostrar barras o graficos.

### PDF

Usar `jspdf` y un boton de descarga.

### WebSockets

Solo si el enunciado lo pide como extra. No lo metas si no hace falta.

## 14. Recomendaciones para sustentar

Explica en este orden:

1. Estructura del proyecto.
2. Login y token.
3. Axios interceptor.
4. Rutas privadas.
5. Rutas por rol.
6. Servicios.
7. Hooks.
8. Componentes reutilizables.
9. UI.
10. Build y lint.

Frases utiles:

- "Separe la conexion a la API en servicios para no repetir axios en las paginas."
- "Use un contexto de autenticacion para mantener el usuario disponible en toda la aplicacion."
- "Use un interceptor de axios para enviar el token JWT automaticamente."
- "Use un wrapper de ruta para impedir acceso a paginas protegidas."
- "Los componentes de pagina estan separados de los componentes reutilizables."

## 15. Errores comunes

- No instalar `react-router-dom`.
- Usar `localStorage` en todas partes sin contexto.
- No manejar `loading`.
- Usar rutas protegidas sin esperar a que cargue el usuario.
- Consumir endpoints con URL mal escrita.
- No mapear `data.content` cuando el backend devuelve paginacion.
- No limpiar formularios despues de guardar.
- No ejecutar `npm run build`.
- Dejar `console.log` innecesarios.
- Poner todo en `App.jsx`.

## 16. Plantilla mental para cualquier parcial

Cuando te den un enunciado, identifica:

1. Roles.
2. Entidades principales.
3. Paginas necesarias.
4. Endpoints necesarios.
5. Operaciones CRUD.
6. Datos que van en formularios.
7. Restricciones por rol.
8. Componentes reutilizables.
9. Estado global necesario.
10. Entrega y sustentacion.

Luego implementa:

1. `axiosConfig`.
2. `authService`.
3. `AuthProvider`.
4. `ProtectedRoute`.
5. `RoleRoute`.
6. `App.jsx` con rutas.
7. `Navbar`.
8. Servicios por entidad.
9. Hooks por entidad.
10. Paginas.

