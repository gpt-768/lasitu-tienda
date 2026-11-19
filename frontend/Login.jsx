import { useState } from 'react'

const API_LOGIN = 'http://localhost:4000/api/login'

// Formulario de inicio de sesión.
// onEntrar y onCerrar son props: funciones que le pasa App.jsx.
function Login({ onEntrar, onCerrar }) {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  async function enviar(evento) {
    // Evita que el formulario recargue la página
    evento.preventDefault()
    setError('')

    try {
      const respuesta = await fetch(API_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, clave }),
      })
      const datos = await respuesta.json()

      if (!respuesta.ok) {
        setError(datos.mensaje)
        return
      }

      // datos trae { token, usuario, rol }
      onEntrar(datos)
    } catch {
      setError('No se pudo conectar con el servidor')
    }
  }

  return (
    <div className="fondo" onClick={onCerrar}>
      <form className="cuadro" onClick={(e) => e.stopPropagation()} onSubmit={enviar}>
        <button type="button" className="cerrar" onClick={onCerrar}>
          CERRAR
        </button>
        <h2 className="titulo">Ingresar</h2>
        <p>Acceso solo para quienes administran el catálogo.</p>

        <label>
          Usuario
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="boton">
          ENTRAR
        </button>
      </form>
    </div>
  )
}

export default Login