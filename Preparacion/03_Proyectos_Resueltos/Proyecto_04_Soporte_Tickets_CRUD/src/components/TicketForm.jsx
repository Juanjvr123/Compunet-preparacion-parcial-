// useEffect carga el ticket seleccionado.
import { useEffect, useState } from 'react'

// Estado inicial.
const emptyForm = {
  subject: '',
  description: '',
  priority: 'MEDIA',
  status: 'ABIERTO',
}

// Formulario de tickets.
const TicketForm = ({ selectedTicket, onSubmit, onCancel }) => {
  // Estado controlado.
  const [form, setForm] = useState(emptyForm)

  // Error local.
  const [error, setError] = useState('')

  // Sincroniza formulario al editar.
  useEffect(() => {
    // Si hay ticket seleccionado, copia sus datos.
    if (selectedTicket) {
      setForm({
        subject: selectedTicket.subject || '',
        description: selectedTicket.description || '',
        priority: selectedTicket.priority || 'MEDIA',
        status: selectedTicket.status || 'ABIERTO',
      })
    } else {
      // Si no hay ticket, limpia el formulario.
      setForm(emptyForm)
    }
  }, [selectedTicket])

  // Actualiza campos.
  const handleChange = (event) => {
    // Toma name y value.
    const { name, value } = event.target

    // Actualiza el campo correspondiente.
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  // Envia formulario.
  const handleSubmit = (event) => {
    // Evita recargar navegador.
    event.preventDefault()

    // Valida asunto.
    if (!form.subject.trim()) {
      setError('El asunto es obligatorio')
      return
    }

    // Valida descripcion.
    if (!form.description.trim()) {
      setError('La descripcion es obligatoria')
      return
    }

    // Limpia error.
    setError('')

    // Entrega datos a la pagina.
    onSubmit(form)
  }

  // Retorna formulario visual.
  return (
    <form className="card card-body mb-4" onSubmit={handleSubmit}>
      <h2 className="h5">{selectedTicket ? 'Editar ticket' : 'Nuevo ticket'}</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="subject">
            Asunto
          </label>
          <input className="form-control" id="subject" name="subject" value={form.subject} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label" htmlFor="priority">
            Prioridad
          </label>
          <select className="form-select" id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="BAJA">Baja</option>
            <option value="MEDIA">Media</option>
            <option value="ALTA">Alta</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label" htmlFor="status">
            Estado
          </label>
          <select className="form-select" id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="ABIERTO">Abierto</option>
            <option value="EN_PROCESO">En proceso</option>
            <option value="CERRADO">Cerrado</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="description">
            Descripcion
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
          />
        </div>
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

// Se exporta TicketForm.
export default TicketForm

