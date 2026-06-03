// useEffect carga datos iniciales.
import { useEffect, useState } from 'react'

// Formulario reutilizable.
import TicketForm from '../components/TicketForm'

// Tabla reutilizable.
import TicketTable from '../components/TicketTable'

// Servicio HTTP.
import { ticketService } from '../services/ticketService'

// Normaliza lista directa o paginada.
const normalizeTickets = (data) => {
  // Si es arreglo, se devuelve.
  if (Array.isArray(data)) {
    return data
  }

  // Si viene de Spring Page, se usa content.
  if (Array.isArray(data?.content)) {
    return data.content
  }

  // Valor seguro por defecto.
  return []
}

// Pagina CRUD de tickets.
const TicketsPage = () => {
  // Lista de tickets.
  const [tickets, setTickets] = useState([])

  // Ticket para editar.
  const [selectedTicket, setSelectedTicket] = useState(null)

  // Control de formulario.
  const [showForm, setShowForm] = useState(false)

  // Estado de carga.
  const [loading, setLoading] = useState(false)

  // Estado de error.
  const [error, setError] = useState('')

  // Carga tickets.
  const loadTickets = async () => {
    // Activa carga.
    setLoading(true)

    // Limpia error.
    setError('')

    try {
      // GET /tickets.
      const data = await ticketService.getAll()

      // Guarda datos.
      setTickets(normalizeTickets(data))
    } catch (requestError) {
      // Muestra mensaje.
      setError(requestError.response?.data?.message || 'No fue posible cargar tickets')
    } finally {
      // Apaga carga.
      setLoading(false)
    }
  }

  // Ejecuta carga inicial.
  useEffect(() => {
    // Llama GET al montar.
    loadTickets()
  }, [])

  // Abre formulario nuevo.
  const handleCreate = () => {
    setSelectedTicket(null)
    setShowForm(true)
  }

  // Abre formulario editar.
  const handleEdit = (ticket) => {
    setSelectedTicket(ticket)
    setShowForm(true)
  }

  // Cierra formulario.
  const handleCancel = () => {
    setSelectedTicket(null)
    setShowForm(false)
  }

  // Guarda crear o editar.
  const handleSubmit = async (form) => {
    try {
      if (selectedTicket) {
        // PUT /tickets/{id}.
        const updated = await ticketService.update(selectedTicket.id, form)

        // Actualiza lista.
        setTickets((currentTickets) =>
          currentTickets.map((ticket) => (ticket.id === selectedTicket.id ? updated : ticket)),
        )
      } else {
        // POST /tickets.
        const created = await ticketService.create(form)

        // Inserta en lista.
        setTickets((currentTickets) => [created, ...currentTickets])
      }

      // Cierra formulario.
      handleCancel()
    } catch (requestError) {
      // Muestra error.
      setError(requestError.response?.data?.message || 'No fue posible guardar el ticket')
    }
  }

  // Cierra ticket con PATCH.
  const handleClose = async (ticket) => {
    try {
      // PATCH /tickets/{id}.
      const updated = await ticketService.changeStatus(ticket.id, 'CERRADO')

      // Actualiza lista.
      setTickets((currentTickets) =>
        currentTickets.map((currentTicket) =>
          currentTicket.id === ticket.id ? updated : currentTicket,
        ),
      )
    } catch (requestError) {
      // Muestra error.
      setError(requestError.response?.data?.message || 'No fue posible cerrar el ticket')
    }
  }

  // Elimina ticket.
  const handleDelete = async (id) => {
    // Confirma accion.
    const confirmed = window.confirm('Desea eliminar este ticket?')

    // Si no confirma, termina.
    if (!confirmed) {
      return
    }

    try {
      // DELETE /tickets/{id}.
      await ticketService.remove(id)

      // Actualiza lista.
      setTickets((currentTickets) => currentTickets.filter((ticket) => ticket.id !== id))
    } catch (requestError) {
      // Muestra error.
      setError(requestError.response?.data?.message || 'No fue posible eliminar el ticket')
    }
  }

  // Renderiza pagina.
  return (
    <main className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
        <div>
          <h1 className="h3 mb-1">Mesa de ayuda</h1>
          <p className="text-muted mb-0">CRUD de tickets con conexion al backend.</p>
        </div>
        <button className="btn btn-primary align-self-start" type="button" onClick={handleCreate}>
          Nuevo ticket
        </button>
      </div>

      {showForm && (
        <TicketForm selectedTicket={selectedTicket} onSubmit={handleSubmit} onCancel={handleCancel} />
      )}

      {loading && <div className="alert alert-secondary">Cargando tickets...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <TicketTable tickets={tickets} onEdit={handleEdit} onDelete={handleDelete} onClose={handleClose} />
      )}
    </main>
  )
}

// Se exporta TicketsPage.
export default TicketsPage

