import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { loginRequest } from '../services/authService'
import { setAuthToken } from '../services/api'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      const data = await loginRequest({ username, password })
      localStorage.setItem("token", data.accessToken);
      setAuthToken(data.token)
      login(data.token, data.user)
      navigate('/products')
    } catch (err) {
      console.error(err)
      setError('Credenciales inválidas o error en el servidor')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-emerald-400">
          Login
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="username"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          
          <input 
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage