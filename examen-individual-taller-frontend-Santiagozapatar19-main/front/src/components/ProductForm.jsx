
import { useEffect, useState } from 'react'

function ProductForm({ initialData, onSubmit, loading, onCancelEdit }) {
  const [num, setNumVuelo] = useState('')
  const [state, setState] = useState('')
  const [airlineId, setAirlineId] = useState('')

  useEffect(() => {
    if (initialData) {
      setNumVuelo(initialData.num ?? '')
      setState(initialData.state ?? '')
      setAirlineId(initialData.airlineId ?? '')
    } else {
      setNumVuelo('')
      setState('')
      setAirlineId('')
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    onSubmit({
      num,
      state: Number(state),
      airlineId: Long(airlineId),
    })
  }

  const isEditing = Boolean(initialData)

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3"
    >
      <h2 className="text-lg font-semibold">
        {isEditing ? 'Editar producto' : 'Crear producto'}
      </h2>

      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        <input
          type="text"
          placeholder="Numero del Vuelo"
          value={num}
          onChange={(e) => setNumVuelo(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <input
          type="Estado"
          placeholder="Estado"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-32 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <input
          type="Long"
          placeholder="Airline Id"
          value={airlineId}
          onChange={(e) => setAirlineId(e.target.value)}
          className="w-24 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="flex justify-end gap-2">
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-3 py-2 rounded-lg border border-slate-600 text-sm hover:bg-slate-800"
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-sm"
        >
          {loading
            ? isEditing
              ? 'Guardando...'
              : 'Creando...'
            : isEditing
            ? 'Guardar cambios'
            : 'Crear producto'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
