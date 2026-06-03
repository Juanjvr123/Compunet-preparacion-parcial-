# Analisis critico de parciales React - Computacion en Internet II

Este documento compara el parcial seguro de este semestre con los ejemplos antiguos ubicados en:

- `C:\Users\juanj\Downloads\parcial-react-g3-Isaac-Chaves-G-master`
- `C:\Users\juanj\compunet2\ParcialesUtimosEjemplos`

## Punto de referencia seguro: parcial de proyectos

Este es el ejemplo mas confiable porque el usuario indico que es de este semestre y que su contenido sale 100%.

Temas seguros:

- React con Vite.
- React Router.
- Login contra API REST.
- Guardar token en `localStorage` o `sessionStorage`.
- Consumir endpoint protegido usando `Authorization`.
- Renderizar lista dinamica con `.map()`.
- Manejar estados visibles: carga, error y exito.
- Separar responsabilidades: servicios, componentes, paginas, hooks/contexto.
- Context API para autenticacion.
- Ruta protegida.
- Control de permisos en UI.
- Imagenes construidas desde URL base + path recibido por API.
- Fidelidad visual con una imagen guia.

Contrato principal del parcial seguro:

- Login: `POST /public/authentication/login`
- Respuesta: contiene `accessToken` y `tokenType`.
- Proyectos: `GET /projects`.
- Header protegido: `Authorization: Bearer <token>`.
- Permisos esperados:
  - `create-project`
  - `edit-project`
  - `view-survey`
  - `create-interviews`

Riesgo principal:

- No basta con ocultar botones manualmente en cada componente. El enunciado pide una utilidad reutilizable para validar permisos.

## Ejemplo antiguo 1: vuelos

Archivos:

- PDF: `Examen de Frontend 252 Vuelos (1).pdf`
- Proyecto: `computacion-2-g3-202502-examen-individual-taller-frontend-examen-final-2-main`

Resumen del enunciado:

- Construir tablero de vuelos.
- Login con JWT.
- Crear vuelos.
- Mostrar vuelos.
- Cambiar estado del vuelo.
- Eliminar vuelos.
- Backend incluido, no modificable.

Estados del dominio:

- `PROGRAMADO`
- `EN_VUELO`
- `ATERRIZADO`

Backend relevante:

- `POST /api/v1/auth/login`
- `GET /api/v1/vuelos`
- `POST /api/v1/vuelos`
- `PUT /api/v1/vuelos/{id}`
- `DELETE /api/v1/vuelos/{id}`

Respuesta de login:

```json
{
  "accessToken": "..."
}
```

Payload de vuelo:

```json
{
  "numeroVuelo": "AV101",
  "estado": "PROGRAMADO",
  "aerolineaId": 1
}
```

Respuesta de vuelo:

```json
{
  "id": 1,
  "numeroVuelo": "AV101",
  "estado": "PROGRAMADO",
  "aerolineaId": 1,
  "nombreAerolinea": "Avianca"
}
```

Critica:

- El frontend viene practicamente vacio: solo plantilla Vite.
- Sirve para practicar construir una app desde cero.
- No evidencia Context API ni permisos de forma explicita.
- Es muy fuerte para CRUD protegido y cambio de estado.
- Puede ser ruido si uno se enfoca demasiado en formularios complejos y olvida permisos, que si son seguros en el parcial actual.

Valor para preparacion:

- Alto para login + token + CRUD.
- Medio para React Router.
- Bajo para permisos.

## Ejemplo antiguo 2: pedidos/domicilios

Archivos:

- PDF: `Examen de Frontend 252 Pedidos.pdf`
- Proyecto: `computacion2-252-g1-examen-front-examen-final-main`

Resumen del enunciado:

- Construir tablero de pedidos/domicilios.
- Login con JWT.
- Crear pedido.
- Mostrar componente de pedido.
- Cambiar estado.
- Eliminar.
- Backend incluido, no modificable.

Estados del dominio:

- `EN_CAMINO`
- `EN_REPARTO`
- `ENTREGADO`

Backend relevante:

- `POST /api/v1/auth/login`
- `GET /api/v1/domicilios`
- `POST /api/v1/domicilios`
- `PUT /api/v1/domicilios/{id}`
- `DELETE /api/v1/domicilios/{id}`

Respuesta de login:

```json
{
  "accessToken": "..."
}
```

Payload de domicilio:

```json
{
  "nombreDomiciliario": "Carlos Rodriguez",
  "estado": "EN_CAMINO",
  "userId": 1
}
```

Respuesta de domicilio:

```json
{
  "id": 1,
  "nombreDomiciliario": "Carlos Rodriguez",
  "estado": "EN_CAMINO",
  "userId": 1,
  "username": "usuario1@correo.com"
}
```

Credenciales de prueba vistas en `data.sql`:

- Usuarios: `usuario1@correo.com`, `usuario2@correo.com`
- Password indicada: `123456`

Critica:

- Es casi el mismo parcial que vuelos con otro nombre de entidad.
- El frontend tambien viene vacio.
- Sirve para aprender el patron generico, no para memorizar el dominio.
- No hay enfasis en permisos por accion; solo autenticacion y CRUD.

Valor para preparacion:

- Alto para CRUD protegido.
- Alto para entender payloads exactos del backend.
- Medio para formularios.
- Bajo para permisos.

## Ejemplo antiguo 3: posts y comentarios

Archivos:

- PDF: `Examen de Frontend (2).pdf`
- Proyecto: `parcial-final-front-JuliianaV2106-main`

Resumen del enunciado:

- Login.
- Pantalla de feed.
- Componente de usuario autenticado.
- Crear post.
- Listar posts.
- Pantalla de detalle de comentarios.
- Crear comentario.
- Listar comentarios.
- El proyecto base incluye tests.

Frontend observado:

- Usa `react-router`.
- Usa `@tanstack/react-query`.
- Tiene componentes visuales: `UserCard`, `UserPostForm`, `Post`, `Comments`.
- La pantalla `ComponentsPage` usa datos estaticos, no consumo real de API.

Backend observado:

- Context path: `/post-manager`
- Login implementado: `POST /login`
- Respuesta de login:

```json
{
  "token": "...",
  "username": "...",
  "name": "...",
  "lastName": "...",
  "userId": 1,
  "roles": ["..."]
}
```

DTOs relevantes:

Post de salida:

```json
{
  "id": 1,
  "content": "Primer post",
  "createdAt": "...",
  "user": {},
  "commentsCount": 2
}
```

Post de entrada:

```json
{
  "id": 1,
  "content": "Texto",
  "createdAt": "...",
  "userId": 1
}
```

Comentario de entrada:

```json
{
  "id": 1,
  "content": "Texto",
  "userId": 1
}
```

Critica:

- Es mas ambicioso que el parcial seguro: feed, detalle y comentarios.
- Es menos confiable como guia porque el backend de posts aparece incompleto: se ve una interfaz `PostController`, pero no se encontro implementacion concreta de endpoints de posts/comentarios.
- La app React esta mas maquetada, pero no tiene flujo completo de login/token/API.
- Sirve para practicar composicion de componentes y diseño, pero no deberia desplazar la preparacion principal.

Valor para preparacion:

- Alto para componentes visuales.
- Medio para rutas y pantallas.
- Medio para formularios controlados.
- Bajo/medio para API real, porque hay huecos.
- Bajo para el parcial actual si el foco final es permisos tipo `create-project`.

## Ejemplo adicional cercano: vuelos parcialmente resuelto

Archivo/proyecto:

- `examen-individual-taller-frontend-Santiagozapatar19-main`

Este ejemplo no trae enunciado, pero por el README de GitHub Classroom y el backend coincide con el parcial antiguo de vuelos. Es mas util que el proyecto de vuelos vacio porque ya intenta implementar una arquitectura de frontend completa.

Estructura observada:

- `src/context/AuthContext.jsx`
- `src/router/AppRouter.jsx`
- `src/router/PrivateRoute.jsx`
- `src/services/api.js`
- `src/services/authService.js`
- `src/services/vuelosService.js`
- `src/pages/LoginPage.jsx`
- `src/pages/VuelosPage.jsx`
- `src/components/ProductForm.jsx`
- `src/components/ProductTable.jsx`
- `src/components/Layout.jsx`
- `src/components/AuthUserBadge.jsx`

Contrato backend:

- Login: `POST /api/v1/auth/login`
- Vuelos: `GET /api/v1/vuelos`
- Crear: `POST /api/v1/vuelos`
- Actualizar: `PUT /api/v1/vuelos/{id}`
- Eliminar: `DELETE /api/v1/vuelos/{id}`

Respuesta de login:

```json
{
  "accessToken": "..."
}
```

Payload correcto para crear/actualizar vuelo:

```json
{
  "numeroVuelo": "AV101",
  "estado": "PROGRAMADO",
  "aerolineaId": 1
}
```

Lo bueno del ejemplo:

- Separa responsabilidades mejor que los ejemplos vacios.
- Usa `AuthContext` para login/logout.
- Usa un cliente `axios` centralizado en `api.js`.
- Tiene interceptor que agrega `Authorization`.
- Tiene servicios HTTP separados.
- Tiene formulario y tabla separados.
- Maneja estado local de lista, carga, guardado y edicion.
- Usa `useEffect` para cargar datos al montar.
- Actualiza la lista local despues de crear, editar y eliminar.

Errores criticos encontrados:

- `PrivateRoute` existe, pero no se usa en `AppRouter.jsx`. La ruta `/products` queda publica.
- `LoginPage.jsx` guarda `data.accessToken`, pero despues llama `setAuthToken(data.token)` y `login(data.token, data.user)`. El backend no devuelve `token` ni `user`; devuelve `accessToken`.
- `AuthContext` no inicializa desde `localStorage`, entonces al recargar la pagina se pierde la sesion en memoria aunque el token exista.
- `logout()` limpia el contexto, pero no borra `localStorage`.
- `AuthUserBadge` intenta mostrar `user.name` y `user.email`, pero el login de este backend no devuelve usuario.
- `ProductForm.jsx` no compila correctamente: usa `name.trim()` sin existir `name`.
- `ProductForm.jsx` usa `Long(airlineId)`, pero `Long` no existe en JavaScript.
- `ProductForm.jsx` manda campos incorrectos: `num`, `state`, `airlineId`; el backend espera `numeroVuelo`, `estado`, `aerolineaId`.
- En edicion lee `initialData.num`, `initialData.state`, `initialData.airlineId`; la respuesta real trae `numeroVuelo`, `estado`, `aerolineaId`.
- El campo `estado` deberia ser un `select` con valores exactos: `PROGRAMADO`, `EN_VUELO`, `ATERRIZADO`.
- `ProductTable.jsx` muestra vuelos, pero usa nombres de producto y algunos textos mal escritos.
- `ProductTable.jsx` imprime el id como `$${p.id}`, lo cual no tiene sentido para un id.
- `VuelosPage.jsx` solo registra errores por consola; falta estado visual de error.
- `Layout.jsx` dice `Post Manager`, pero el dominio real es vuelos.
- El CSS usa clases tipo Tailwind, pero `index.css` es el estilo base de Vite y no importa Tailwind. Si Tailwind no esta configurado, la UI no se vera como el autor espera.
- `api.js` usa una IP fija (`http://192.168.131.153:8080`), mala practica para entrega; conviene usar constante o `.env`.

Correccion conceptual del login:

```js
const data = await loginRequest({ username, password });
localStorage.setItem("token", data.accessToken);
setAuthToken(data.accessToken);
login(data.accessToken, { username });
navigate("/products");
```

Correccion conceptual del payload:

```js
onSubmit({
  numeroVuelo,
  estado,
  aerolineaId: Number(aerolineaId),
});
```

Correccion conceptual de rutas:

```jsx
<Route element={<PrivateRoute />}>
  <Route path="/products" element={<ProductsPage />} />
</Route>
```

Critica:

- Este ejemplo es cercano porque incluye exactamente los temas que suelen pedir: React Router, Context API, axios, token, ruta protegida y CRUD.
- Sin embargo, esta parcialmente resuelto con errores fuertes. Es mas valioso como ejercicio de depuracion que como plantilla para copiar.
- El patron de servicios/context/rutas si sirve. Los nombres de campos y el flujo de token deben corregirse con mucho cuidado.
- No tiene permisos por accion, asi que no cubre completo el parcial seguro de este semestre.

Valor para preparacion:

- Muy alto para detectar errores frecuentes.
- Alto para arquitectura de frontend.
- Alto para CRUD con axios.
- Medio para rutas protegidas, porque la idea existe pero no esta aplicada.
- Bajo para permisos.

## Patrones que se repiten en todos los ejemplos

Estos patrones son muy probables:

1. Login
   - Formulario con `username` y `password`.
   - `POST` a endpoint de auth.
   - Guardar token.
   - Redirigir al dashboard/listado.

2. Token
   - Guardar en `localStorage`.
   - Leerlo desde servicios.
   - Enviar header `Authorization`.

3. Servicio HTTP
   - Crear funciones tipo `login`, `getItems`, `createItem`, `updateItem`, `deleteItem`.
   - Usar `fetch` o `axios`.
   - No dejar todo dentro de la pagina.

4. Listado dinamico
   - `useState([])` para datos.
   - `useEffect()` para cargar al montar.
   - `.map()` para renderizar tarjetas.

5. Estados UI
   - `loading`.
   - `error`.
   - `data`.

6. Acciones por item
   - Boton crear.
   - Boton editar/cambiar estado.
   - Boton eliminar.
   - Refrescar lista despues de mutar.

7. Rutas
   - `/login`.
   - `/dashboard`, `/projects`, `/feed` o equivalente.
   - Ruta protegida si no hay token.

## Diferencias importantes con el parcial seguro

Lo mas seguro del parcial actual:

- Permisos.
- Context API.
- Rutas protegidas.
- Login JWT.
- Axios/fetch con Authorization.
- Renderizado desde API.

Lo que aparece en antiguos pero puede no salir:

- CRUD completo con `POST`, `PUT`, `DELETE`.
- Cambio de estado con select.
- Pantalla de detalle.
- Comentarios.
- React Query.
- Tests automatizados.
- Backend local incluido.

## Orden recomendado de preparacion

Prioridad 1: indispensable

- Crear app React/Vite.
- Configurar rutas con React Router.
- Crear login.
- Guardar token.
- Crear contexto de autenticacion.
- Crear ruta protegida.
- Consumir API protegida con token.
- Renderizar lista con tarjetas.
- Loading/error/success.

Prioridad 2: muy probable

- Crear hook o utilidad `hasPermission(permission)`.
- Ocultar botones segun permisos.
- Usar `axios.create` con `baseURL`.
- Usar interceptor para inyectar token.
- Manejar 401 cerrando sesion o redirigiendo.

Prioridad 3: posible por parciales antiguos

- Crear elementos desde formulario.
- Actualizar estado con `select`.
- Eliminar elemento.
- Refrescar lista despues de cada accion.
- Separar `ItemCard`, `ItemForm`, `ItemList`.

Prioridad 4: no gastar demasiado tiempo

- React Query.
- Tailwind.
- Maquetacion muy compleja.
- Implementar backend.
- Tests del backend.

## Checklist mental para resolver un parcial parecido

1. Leer PDF y subrayar:
   - URL base.
   - Endpoint login.
   - Nombre exacto del token en respuesta.
   - Endpoint principal.
   - Campos exactos del objeto.
   - Permisos/roles.

2. Crear estructura:
   - `services/authService.js`
   - `services/itemService.js`
   - `context/AuthContext.jsx`
   - `hooks/useAuth.js`
   - `hooks/usePermission.js`
   - `components/ProtectedRoute.jsx`
   - `components/ItemCard.jsx`
   - `pages/LoginPage.jsx`
   - `pages/HomePage.jsx`

3. Implementar login:
   - Formulario controlado.
   - Llamada HTTP.
   - Guardar token.
   - Guardar usuario/permisos si existen.
   - `navigate()`.

4. Implementar ruta protegida:
   - Si no hay token/user, `Navigate` a login.
   - Si hay sesion, renderizar `Outlet` o children.

5. Implementar consumo:
   - Obtener token.
   - Enviar `Authorization`.
   - `try/catch/finally`.

6. Implementar UI:
   - `loading`.
   - `error`.
   - `.map()`.
   - Tarjetas.
   - Imagen si aplica.
   - Botones segun permisos.

## Conclusiones criticas

- El parcial seguro de proyectos es la base real. Los antiguos amplian patrones, pero no todos pesan igual.
- Vuelos y pedidos son excelentes para practicar CRUD protegido desde cero.
- Posts es bueno para componentes, pero no confiar en el backend como ejemplo completo.
- Si el parcial de este semestre mezcla estilos, lo mas probable es: proyectos + permisos + algun CRUD simple.
- La preparacion debe enfocarse en arquitectura repetible, no en memorizar dominios.
