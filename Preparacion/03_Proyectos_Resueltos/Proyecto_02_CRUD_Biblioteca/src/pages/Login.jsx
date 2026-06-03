// useState maneja formulario y errores.
import { useState } from 'react'

// useNavigate permite redirigir despues del login.
import { useNavigate } from 'react-router-dom'

// useAuth trae la funcion login.
import { useAuth } from '../hooks/useAuth'

// Estado inicial del formulario.
const initialForm = {
  email: '',
  password: '',
}

// Pagina de inicio de sesion.
const Login = () => {
  // Estado controlado de credenciales.
  const [form, setForm] = useState(initialForm)

  // Estado de error visual.
  const [error, setError] = useState('')

  // Se obtiene login y loading desde contexto.
  const { login, loading } = useAuth()

  // Navegador programatico.
  const navigate = useNavigate()

  // Actualiza campos del formulario.
  const handleChange = (event) => {
    // Extrae name y value.
    const { name, value } = event.target

    // Actualiza solo el campo cambiado.
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  // Envia credenciales al backend.
  const handleSubmit = async (event) => {
    // Evita recargar pagina.
    event.preventDefault()

    // Limpia error anterior.
    setError('')

    try {
      // Ejecuta POST /auth/login.
      await login(form)

      // Redirige al dashboard.
      navigate('/')
    } catch (requestError) {
      // Muestra mensaje claro.
      setError(requestError.response?.data?.message || 'Credenciales invalidas')
    }
  }

  // Retorna vista centrada de login.
  return (
    <main className="min-vh-100 d-flex align-items-center bg-light">
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h1 className="h3 mb-3">Biblioteca Universitaria</h1>
                <p className="text-muted">Ingresa con tu cuenta institucional.</p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Correo
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Contrasena
                    </label>
                    <input
                      className="form-control"
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <button className="btn btn-primary w-100" disabled={loading} type="submit">
                    {loading ? 'Ingresando...' : 'Ingresar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Se exporta Login.
export default Login

