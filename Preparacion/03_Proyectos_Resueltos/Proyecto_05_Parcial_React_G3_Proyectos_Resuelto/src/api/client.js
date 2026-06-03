// Convierte un body de respuesta a JSON de forma segura.
const parseJsonSafely = async (response) => {
  // Se lee el cuerpo como texto para evitar errores cuando la respuesta viene vacia.
  const text = await response.text()

  // Si no hay texto, se retorna null.
  if (!text) {
    return null
  }

  try {
    // Si el texto es JSON valido, se convierte a objeto.
    return JSON.parse(text)
  } catch {
    // Si no es JSON, se retorna como texto para no perder informacion.
    return text
  }
}

// Cliente HTTP reutilizable con fetch.
export const requestJson = async (url, options = {}) => {
  // Se ejecuta fetch con la URL y opciones recibidas.
  const response = await fetch(url, {
    // Se copian primero las opciones enviadas por el servicio.
    ...options,

    // Se mezclan headers por defecto con headers especificos.
    headers: {
      // Accept indica que esperamos JSON del backend.
      Accept: 'application/json',

      // Se copian headers personalizados como Authorization o Content-Type.
      ...(options.headers || {}),
    },
  })

  // Se parsea el cuerpo de respuesta.
  const data = await parseJsonSafely(response)

  // Si el status HTTP no es exitoso, se lanza error controlado.
  if (!response.ok) {
    // Se crea un error con mensaje del backend si existe.
    const error = new Error(data?.message || data?.error || `Error HTTP ${response.status}`)

    // Se guarda el status para que la UI pueda reaccionar si necesita.
    error.status = response.status

    // Se guarda la data original para depurar en el parcial si falla.
    error.data = data

    // Se lanza el error hacia el hook o la pagina.
    throw error
  }

  // Si todo salio bien, se retorna la data parseada.
  return data
}

