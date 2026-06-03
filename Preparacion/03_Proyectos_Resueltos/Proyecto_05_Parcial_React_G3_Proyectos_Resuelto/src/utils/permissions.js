// Normaliza un permiso para comparar formatos distintos del backend.
const normalizePermission = (permission) => {
  // Si no hay permiso, se retorna texto vacio.
  if (!permission) {
    return ''
  }

  // Se convierte a string para aceptar objetos simples o valores mixtos.
  return String(permission)
    // Se quita prefijo comun de Spring Security.
    .replace(/^ROLE_/i, '')
    // Se quita prefijo comun de OAuth scopes.
    .replace(/^SCOPE_/i, '')
    // Se pasa a minuscula para comparar sin errores de mayusculas.
    .toLowerCase()
    // Se limpian espacios accidentales.
    .trim()
}

// Convierte cualquier estructura de permisos en una lista plana de textos.
const flattenPermissions = (value) => {
  // Si no hay valor, no hay permisos.
  if (!value) {
    return []
  }

  // Si ya es un arreglo, se procesa cada elemento.
  if (Array.isArray(value)) {
    return value.flatMap(flattenPermissions)
  }

  // Si es un objeto con authority, se usa ese campo.
  if (typeof value === 'object' && value.authority) {
    return [value.authority]
  }

  // Si es un objeto con name, se usa ese campo.
  if (typeof value === 'object' && value.name) {
    return [value.name]
  }

  // Si es texto separado por comas o espacios, se divide.
  return String(value)
    .split(/[,\s]+/)
    .filter(Boolean)
}

// Obtiene permisos desde el usuario guardado.
export const getUserPermissions = (user) => {
  // Si no hay usuario, no hay permisos.
  if (!user) {
    return []
  }

  // Se juntan campos comunes donde los backends suelen poner permisos.
  const rawPermissions = [
    // Algunos backends devuelven permissions.
    user.permissions,

    // Spring Security a veces devuelve authorities.
    user.authorities,

    // Otros backends devuelven roles.
    user.roles,

    // El proyecto base original usaba role.
    user.role,

    // En caso de guardar claims completos del token.
    user.claims?.permissions,

    // En caso de que el token use scope.
    user.claims?.scope,
  ]

  // Se aplana todo en una lista unica.
  return rawPermissions
    // Se convierte cada campo a lista.
    .flatMap(flattenPermissions)
    // Se normaliza cada permiso.
    .map(normalizePermission)
    // Se eliminan valores vacios.
    .filter(Boolean)
}

// Valida si un usuario tiene un permiso especifico.
export const hasPermission = (user, permission) => {
  // Se normaliza el permiso requerido.
  const requiredPermission = normalizePermission(permission)

  // Se obtienen los permisos del usuario.
  const userPermissions = getUserPermissions(user)

  // Se valida coincidencia exacta.
  return userPermissions.includes(requiredPermission)
}

