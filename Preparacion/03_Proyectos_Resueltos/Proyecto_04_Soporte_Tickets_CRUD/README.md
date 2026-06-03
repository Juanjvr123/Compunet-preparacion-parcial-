# Proyecto 04 - Soporte Tickets CRUD

Este proyecto es una solucion compacta para parciales de mesa de ayuda, soporte tecnico o gestion de solicitudes.

## Funcionalidades

- Listar tickets con GET.
- Crear ticket con POST.
- Editar ticket con PUT.
- Cambiar estado con PATCH.
- Eliminar ticket con DELETE.
- Agregar comentario con POST a subrecurso.
- Enviar token JWT en cada peticion.
- Usar formulario controlado, tabla y estados de carga/error.

## Endpoints esperados

| Metodo | Endpoint | Uso |
| --- | --- | --- |
| GET | `/tickets` | Listar tickets |
| POST | `/tickets` | Crear ticket |
| PUT | `/tickets/{id}` | Editar ticket |
| PATCH | `/tickets/{id}` | Cambiar estado |
| DELETE | `/tickets/{id}` | Eliminar ticket |
| POST | `/tickets/{id}/comments` | Agregar comentario |

## Comandos

```bash
npm install
npm run dev
npm run build
```

