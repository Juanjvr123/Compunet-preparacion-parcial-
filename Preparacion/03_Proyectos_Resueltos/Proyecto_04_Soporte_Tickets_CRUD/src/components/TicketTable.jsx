// Tabla de tickets.
const TicketTable = ({ tickets, onEdit, onDelete, onClose }) => {
  // Muestra mensaje si no hay datos.
  if (tickets.length === 0) {
    return <div className="alert alert-info">No hay tickets registrados.</div>
  }

  // Renderiza la tabla.
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Asunto</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.subject}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{ticket.description}</td>
              <td>
                <div className="d-flex flex-wrap gap-2">
                  <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => onEdit(ticket)}>
                    Editar
                  </button>
                  <button className="btn btn-outline-success btn-sm" type="button" onClick={() => onClose(ticket)}>
                    Cerrar
                  </button>
                  <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onDelete(ticket.id)}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Se exporta TicketTable.
export default TicketTable

