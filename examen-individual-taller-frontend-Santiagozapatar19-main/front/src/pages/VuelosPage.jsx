
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/vuelosService'

function ProductsPage() {
    console.log("Products!")
  const [products, setProducts] = useState([])        
  const [loading, setLoading] = useState(true)        
  const [saving, setSaving] = useState(false)         
  const [editingProduct, setEditingProduct] = useState(null) 

  
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        setProducts(data) 
      } catch (err) {
        console.error('Error cargando productos', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, []) 


  const handleSubmitProduct = async (productData) => {
    try {
      setSaving(true)

      if (editingProduct) {
        // Estamos editando
        const updated = await updateProduct(editingProduct.id, productData)
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        )
        setEditingProduct(null)
      } else {
        
        const created = await createProduct(productData)
        setProducts((prev) => [created, ...prev])
      }
    } catch (err) {
      console.error('Error guardando producto', err)
    } finally {
      setSaving(false)
    }
  }

  
  const handleEditClick = (product) => {
    setEditingProduct(product)
  }

  
  const handleDeleteClick = async (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este producto?')
    if (!confirmar) return

    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error('Error eliminando producto', err)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-emerald-400">
            Gestión de Productos
          </h1>
        </header>

        {/* Formulario de creación / edición */}
        <ProductForm
          key={editingProduct?.id ?? 'new'}
          initialData={editingProduct}
          onSubmit={handleSubmitProduct}
          loading={saving}
          onCancelEdit={() => setEditingProduct(null)}
        />

        {/* Tabla de productos */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Listado de productos</h2>
          {loading ? (
            <p className="text-sm text-slate-400">Cargando productos...</p>
          ) : (
            <ProductTable
              products={products}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          )}
        </section>
      </div>
    </Layout>
  )
}

export default ProductsPage
