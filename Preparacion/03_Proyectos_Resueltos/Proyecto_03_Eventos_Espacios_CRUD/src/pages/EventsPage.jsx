// useEffect carga eventos al iniciar.
import { useEffect, useState } from 'react'

// Formulario de eventos.
import EventForm from '../components/EventForm'

// Tabla de eventos.
import EventTable from '../components/EventTable'

// Servicio HTTP de eventos.
import { eventService } from '../services/eventService'

// Normaliza lista directa o paginada.
const normalizeEvents = (data) => {
  // Si data es arreglo, retorna data.
  if (Array.isArray(data)) {
    return data
  }

  // Si data tiene content, retorna content.
  if (Array.isArray(data?.content)) {
    return data.content
  }

  // Si no hay lista valida, retorna arreglo vacio.
  return []
}

// Pagina CRUD de eventos.
const EventsPage = () => {
  // Lista de eventos.
  const [events, setEvents] = useState([])

  // Evento seleccionado.
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Control de formulario visible.
  const [showForm, setShowForm] = useState(false)

  // Carga visual.
  const [loading, setLoading] = useState(false)

  // Error visible.
  const [error, setError] = useState('')

  // Carga eventos desde backend.
  const loadEvents = async () => {
    // Activa carga.
    setLoading(true)

    // Limpia error.
    setError('')

    try {
      // GET /events.
      const data = await eventService.getAll()

      // Guarda lista normalizada.
      setEvents(normalizeEvents(data))
    } catch (requestError) {
      // Muestra error.
      setError(requestError.response?.data?.message || 'No fue posible cargar eventos')
    } finally {
      // Apaga carga.
      setLoading(false)
    }
  }

  // Ejecuta carga inicial.
  useEffect(() => {
    // Llama GET al montar.
    loadEvents()
  }, [])

  // Abre modo crear.
  const handleCreate = () => {
    setSelectedEvent(null)
    setShowForm(true)
  }

  // Abre modo editar.
  const handleEdit = (event) => {
    setSelectedEvent(event)
    setShowForm(true)
  }

  // Cierra formulario.
  const handleCancel = () => {
    setSelectedEvent(null)
    setShowForm(false)
  }

  // Guarda creacion o edicion.
  const handleSubmit = async (form) => {
    try {
      if (selectedEvent) {
        // PUT /events/{id}.
        const updated = await eventService.update(selectedEvent.id, form)

        // Actualiza lista local.
        setEvents((currentEvents) =>
          currentEvents.map((event) => (event.id === selectedEvent.id ? updated : event)),
        )
      } else {
        // POST /events.
        const created = await eventService.create(form)

        // Agrega nuevo evento.
        setEvents((currentEvents) => [created, ...currentEvents])
      }

      // Cierra formulario.
      handleCancel()
    } catch (requestError) {
      // Muestra error de guardado.
      setError(requestError.response?.data?.message || 'No fue posible guardar el evento')
    }
  }

  // Cambia estado con PATCH.
  const handleToggleActive = async (event) => {
    try {
      // PATCH /events/{id}.
      const updated = await eventService.updateStatus(event.id, !event.active)

      // Actualiza lista local.
      setEvents((currentEvents) =>
        currentEvents.map((currentEvent) =>
          currentEvent.id === event.id ? updated : currentEvent,
        ),
      )
    } catch (requestError) {
      // Muestra error.
      setError(requestError.response?.data?.message || 'No fue posible cambiar el estado')
    }
  }

  // Elimina con DELETE.
  const handleDelete = async (id) => {
    // Confirmacion minima.
    const confirmed = window.confirm('Desea eliminar este evento?')

    // Si cancela, termina.
    if (!confirmed) {
      return
    }

    try {
      // DELETE /events/{id}.
      await eventService.remove(id)

      // Quita de la lista local.
      setEvents((currentEvents) => currentEvents.filter((event) => event.id !== id))
    } catch (requestError) {
      // Muestra error.
      setError(requestError.response?.data?.message || 'No fue posible eliminar el evento')
    }
  }

  // Render principal.
  return (
    <main className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
        <div>
          <h1 className="h3 mb-1">Eventos y espacios</h1>
          <p className="text-muted mb-0">CRUD de eventos conectado al backend.</p>
        </div>
        <button className="btn btn-primary align-self-start" type="button" onClick={handleCreate}>
          Nuevo evento
        </button>
      </div>

      {showForm && (
        <EventForm selectedEvent={selectedEvent} onSubmit={handleSubmit} onCancel={handleCancel} />
      )}

      {loading && <div className="alert alert-secondary">Cargando eventos...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <EventTable
          events={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />
      )}
    </main>
  )
}

// Se exporta EventsPage.
export default EventsPage

