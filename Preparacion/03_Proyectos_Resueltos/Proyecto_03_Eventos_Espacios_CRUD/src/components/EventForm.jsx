// useEffect permite llenar el formulario al editar.
import { useEffect, useState } from 'react'

// Estado inicial del evento.
const emptyForm = {
  name: '',
  eventType: '',
  place: '',
  date: '',
  capacity: 1,
  active: true,
}

// Formulario de evento.
const EventForm = ({ selectedEvent, onSubmit, onCancel }) => {
  // Estado controlado.
  const [form, setForm] = useState(emptyForm)

  // Error local.
  const [error, setError] = useState('')

  // Carga datos al editar.
  useEffect(() => {
    // Si hay evento seleccionado, se copian sus campos.
    if (selectedEvent) {
      setForm({
        name: selectedEvent.name || '',
        eventType: selectedEvent.eventType || '',
        place: selectedEvent.place || '',
        date: selectedEvent.date || '',
        capacity: selectedEvent.capacity || 1,
        active: selectedEvent.active ?? true,
      })
    } else {
      // Si no hay seleccion, se limpia.
      setForm(emptyForm)
    }
  }, [selectedEvent])

  // Maneja inputs comunes.
  const handleChange = (event) => {
    // Se extraen propiedades del input.
    const { name, value } = event.target

    // capacity se convierte a numero.
    const nextValue = name === 'capacity' ? Number(value) : value

    // Se actualiza el estado.
    setForm((currentForm) => ({ ...currentForm, [name]: nextValue }))
  }

  // Maneja checkbox active.
  const handleActiveChange = (event) => {
    // Guarda el valor booleano.
    setForm((currentForm) => ({ ...currentForm, active: event.target.checked }))
  }

  // Envia el formulario.
  const handleSubmit = (event) => {
    // Evita recargar.
    event.preventDefault()

    // Valida nombre.
    if (!form.name.trim()) {
      setError('El nombre es obligatorio')
      return
    }

    // Valida lugar.
    if (!form.place.trim()) {
      setError('El lugar es obligatorio')
      return
    }

    // Valida fecha.
    if (!form.date) {
      setError('La fecha es obligatoria')
      return
    }

    // Limpia error.
    setError('')

    // Envia datos a la pagina.
    onSubmit(form)
  }

  // Retorna formulario Bootstrap.
  return (
    <form className="card card-body mb-4" onSubmit={handleSubmit}>
      <h2 className="h5">{selectedEvent ? 'Editar evento' : 'Nuevo evento'}</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="name">
            Nombre
          </label>
          <input className="form-control" id="name" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="eventType">
            Tipo
          </label>
          <input
            className="form-control"
            id="eventType"
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="place">
            Lugar
          </label>
          <input className="form-control" id="place" name="place" value={form.place} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="date">
            Fecha
          </label>
          <input className="form-control" id="date" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="capacity">
            Cupos
          </label>
          <input
            className="form-control"
            id="capacity"
            min="1"
            name="capacity"
            type="number"
            value={form.capacity}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-check mt-3">
        <input className="form-check-input" id="active" type="checkbox" checked={form.active} onChange={handleActiveChange} />
        <label className="form-check-label" htmlFor="active">
          Evento activo
        </label>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary" type="submit">
          Guardar
        </button>
        <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

// Se exporta EventForm.
export default EventForm

