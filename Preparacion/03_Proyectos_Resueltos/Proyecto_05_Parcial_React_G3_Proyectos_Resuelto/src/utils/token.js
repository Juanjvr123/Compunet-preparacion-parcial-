// Decodifica la parte payload de un JWT sin validar firma.
export const decodeJwtPayload = (token) => {
  // Si no hay token, no hay nada que decodificar.
  if (!token) {
    return null
  }

  try {
    // Un JWT tiene formato header.payload.signature.
    const payload = token.split('.')[1]

    // Si el token no tiene payload, se retorna null.
    if (!payload) {
      return null
    }

    // JWT usa base64url, por eso se reemplazan caracteres antes de atob.
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')

    // atob convierte base64 a texto JSON.
    const decodedPayload = atob(normalizedPayload)

    // Se convierte el texto JSON a objeto.
    return JSON.parse(decodedPayload)
  } catch {
    // Si el token no se puede decodificar, se evita romper la aplicacion.
    return null
  }
}

