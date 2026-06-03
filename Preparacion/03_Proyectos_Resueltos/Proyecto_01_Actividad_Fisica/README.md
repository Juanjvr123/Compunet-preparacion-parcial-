# Proyecto 01 - Actividad Fisica SPA

Solucion modelo para un parcial de SPA React con autenticacion JWT, roles, servicios, hooks, Material UI, progreso, estadisticas y reporte PDF.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Dependencias

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install axios jwt-decode react-router-dom jspdf
```

## Endpoints esperados

- `POST /auth/login`
- `GET /routines/my`
- `PUT /progress/:id`
- `GET /coach/students`
- `GET /events`

Si tu backend usa otro prefijo, cambia `src/api/axiosConfig.js`.

