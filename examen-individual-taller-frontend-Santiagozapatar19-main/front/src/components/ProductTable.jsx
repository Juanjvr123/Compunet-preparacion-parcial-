
function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="text-sm text-slate-400">No hay vuelos registrados.</p>
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-950">
          <tr>
            <th className="px-4 py-2 text-left">Aerilinea Id</th>
            <th className="px-4 py-2 text-left">Estado </th>
            <th className="px-4 py-2 text-right">Id</th>
            <th className="px-4 py-2 text-right"> nombreAerolinea</th>
            <th className="px-4 py-2 text-right">Numero Vuelo</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-slate-800">
              <td className="px-4 py-2">{p.aerolineaId}</td>
              <td className="px-4 py-2">{p.estado}</td>
              <td className="px-4 py-2 text-right">${p.id}</td>
              <td className="px-4 py-2 text-right">{p.nombreAerolinea}</td>
              <td className="px-4 py-2 text-right">{p.numeroVuelo}</td>

              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => onEdit(p)}
                  className="text-xs px-3 py-1 rounded-full border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="text-xs px-3 py-1 rounded-full border border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
