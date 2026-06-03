// Tabla de eventos.
const EventTable = ({ events, onEdit, onDelete, onToggleActive }) => {
  // Estado vacio.
  if (events.length === 0) {
    return <div className="alert alert-info">No hay eventos registrados.</div>
  }

  // Renderiza la tabla.
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Lugar</th>
            <th>Fecha</th>
            <th>Cupos</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.eventType}</td>
              <td>{event.place}</td>
              <td>{event.date}</td>
              <td>{event.capacity}</td>
              <td>
                <span className={`badge ${event.active ? 'bg-success' : 'bg-secondary'}`}>
                  {event.active ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <div className="d-flex flex-wrap gap-2">
                  <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => onEdit(event)}>
                    Editar
                  </button>
                  <button className="btn btn-outline-warning btn-sm" type="button" onClick={() => onToggleActive(event)}>
                    Cambiar estado
                  </button>
                  <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onDelete(event.id)}>
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

// Se exporta EventTable.
export default EventTable

