# Proyecto 03 - Eventos y Espacios CRUD

Este proyecto compacto sirve como variante para parciales donde se pide administrar eventos, talleres, clases, espacios o reservas.

## Funcionalidades

- Listado de eventos con GET.
- Creacion de eventos con POST.
- Edicion completa con PUT.
- Eliminacion con DELETE.
- Cambio de estado con PATCH.
- Conexion al backend con Axios.
- Token JWT enviado automaticamente.
- Formulario controlado.
- Tabla responsive.

## Endpoints esperados

| Metodo | Endpoint | Uso |
| --- | --- | --- |
| GET | `/events` | Listar eventos |
| POST | `/events` | Crear evento |
| PUT | `/events/{id}` | Editar evento |
| PATCH | `/events/{id}` | Cambiar estado |
| DELETE | `/events/{id}` | Eliminar evento |
| GET | `/spaces` | Listar espacios |

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Adaptacion rapida

Para cambiar esta solucion a tickets, cambia:

- `/events` por `/tickets`.
- `name` por `subject`.
- `place` por `assignedArea`.
- `eventType` por `priority`.
- `active` por `status`.

