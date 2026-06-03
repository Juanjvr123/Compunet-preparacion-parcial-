import api from './api'

export async function fetchProducts() {
  const response = await api.get('/api/v1/vuelos')
  return response.data
}

export async function createProduct(product) {
  const response = await api.post('/api/v1/vuelos', product)
  return response.data
}

export async function updateProduct(id, product) {
  const response = await api.put(`/api/v1/vuelos/${id}`, product)
  return response.data
}


export async function deleteProduct(id) {
  await api.delete(`/api/v1/vuelos/${id}`)
}
