// Cliente fetch reutilizable.
import { requestJson } from '../api/client'

// Configuracion central del parcial.
import { AUTH_LOGIN_PATH, AUTH_SYSTEM_ID, LOGIN_API_BASE_URL } from '../config/apiConfig'

// Realiza login contra el backend indicado en el PDF.
export const signin = async ({ username, password }) => {
  // URL completa del endpoint POST /public/authentication/login.
  const url = `${LOGIN_API_BASE_URL}${AUTH_LOGIN_PATH}`

  // Payload exacto esperado por el backend.
  const payload = {
    // El username viene del formulario; no debe quedar quemado en codigo.
    username,

    // El sysid es 4 segun el PDF; cambia AUTH_SYSTEM_ID si el docente entrega otro.
    sysid: AUTH_SYSTEM_ID,

    // El password viene del formulario; no debe quedar quemado en codigo.
    password,
  }

  // Se llama el endpoint de autenticacion.
  return requestJson(url, {
    // Login usa metodo POST porque envia credenciales.
    method: 'POST',

    // Content-Type indica que enviamos JSON.
    headers: {
      'Content-Type': 'application/json',
    },

    // El body debe ser string JSON.
    body: JSON.stringify(payload),
  })
}

