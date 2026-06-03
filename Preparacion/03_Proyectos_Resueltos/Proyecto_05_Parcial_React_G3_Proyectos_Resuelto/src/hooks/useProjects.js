// useCallback mantiene estable la funcion de carga.
import { useCallback, useEffect, useState } from 'react'

// Servicio que consulta GET /projects.
import { getProjects } from '../services/projectService'

// Normaliza respuesta de proyectos.
const normalizeProjects = (data) => {
  // El PDF dice que la respuesta exitosa es un arreglo.
  if (Array.isArray(data)) {
    return data
  }

  // Si el backend cambia a respuesta paginada, se soporta content.
  if (Array.isArray(data?.content)) {
    return data.content
  }

  // Si no hay formato valido, se retorna lista vacia.
  return []
}

// Hook para cargar proyectos protegidos.
export const useProjects = ({ token, tokenType }) => {
  // Estado con la lista de proyectos.
  const [projects, setProjects] = useState([])

  // Estado visible de carga.
  const [loading, setLoading] = useState(false)

  // Estado visible de error.
  const [error, setError] = useState('')

  // Funcion que llama GET /projects.
  const loadProjects = useCallback(async () => {
    // Si no hay token, se evita llamar un endpoint protegido.
    if (!token) {
      setProjects([])
      return
    }

    // Activa estado de carga.
    setLoading(true)

    // Limpia error anterior.
    setError('')

    try {
      // Ejecuta la peticion protegida con Authorization.
      const data = await getProjects({ token, tokenType })

      // Guarda la lista normalizada.
      setProjects(normalizeProjects(data))
    } catch (requestError) {
      // Guarda un mensaje visible para el usuario.
      setError(requestError.message || 'No fue posible cargar los proyectos')
    } finally {
      // Apaga carga al terminar.
      setLoading(false)
    }
  }, [token, tokenType])

  // Carga proyectos cuando el hook se monta o cambia el token.
  useEffect(() => {
    // Llama la carga inicial.
    loadProjects()
  }, [loadProjects])

  // Retorna datos y estados.
  return {
    // Lista de proyectos.
    projects,

    // Estado de carga.
    loading,

    // Estado de error.
    error,

    // Funcion para reintentar manualmente.
    reload: loadProjects,
  }
}

