// Componentes de Material UI para construir el formulario.
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material'

// useState maneja los campos controlados.
import { useState } from 'react'

// Estado inicial del formulario.
const initialForm = {
  // Cambia el nombre del campo si el backend pide email en vez de username.
  username: '',

  // Password siempre debe venir del formulario, nunca quemado.
  password: '',
}

// Formulario reutilizable de login.
const LoginForm = ({ error, loading, onSubmit }) => {
  // Estado controlado de credenciales.
  const [form, setForm] = useState(initialForm)

  // Actualiza un campo del formulario.
  const handleChange = (event) => {
    // name identifica que input cambio.
    const { name, value } = event.target

    // Se actualiza solo el campo modificado.
    setForm((currentForm) => ({
      // Se conservan los otros campos.
      ...currentForm,

      // Se reemplaza el campo actual.
      [name]: value,
    }))
  }

  // Envia el formulario.
  const handleSubmit = (event) => {
    // Evita recarga completa del navegador.
    event.preventDefault()

    // Entrega username y password a LoginPage.
    onSubmit(form)
  }

  // Retorna la tarjeta de login.
  return (
    <Paper
      elevation={4}
      sx={{
        // Espaciado interno de la tarjeta.
        p: 4,

        // Borde similar a interfaz institucional.
        borderRadius: 3,
      }}
    >
      {/* Titulo visible del formulario. */}
      <Typography component="h1" variant="h4" fontWeight={800} gutterBottom>
        Iniciar sesion
      </Typography>

      {/* Texto de apoyo; se puede cambiar por el nombre de la organizacion. */}
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Ingresa con las credenciales entregadas por el docente.
      </Typography>

      {/* Error visible cuando falla el login. */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Formulario controlado. */}
      <Box component="form" onSubmit={handleSubmit}>
        {/* Campo username requerido por el endpoint. */}
        <TextField
          autoFocus
          fullWidth
          id="username"
          label="Usuario"
          margin="normal"
          name="username"
          required
          value={form.username}
          onChange={handleChange}
        />

        {/* Campo password requerido por el endpoint. */}
        <TextField
          fullWidth
          id="password"
          label="Contrasena"
          margin="normal"
          name="password"
          required
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        {/* Boton principal; se deshabilita mientras carga. */}
        <Button
          disabled={loading}
          fullWidth
          sx={{
            // Separacion superior del boton.
            mt: 3,

            // Altura consistente con la imagen guia.
            py: 1.3,

            // Texto mas fuerte.
            fontWeight: 700,
          }}
          type="submit"
          variant="contained"
        >
          {/* Cambia el texto durante la peticion POST. */}
          {loading ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </Box>
    </Paper>
  )
}

// Se exporta para usarlo en LoginPage.
export default LoginForm

