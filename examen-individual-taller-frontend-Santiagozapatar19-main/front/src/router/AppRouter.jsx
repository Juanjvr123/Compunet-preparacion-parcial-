import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/VuelosPage'
import PrivateRoute from './PrivateRoute'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
          <Route path="/products" element={<ProductsPage />} />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter