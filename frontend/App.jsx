import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:4000/api/productos'

function App() {
  // Estados: la "memoria" del componente
  const [productos, setProductos] = useState([])
  const [error, setError] = useState('')

  // Pide las manillas al servidor una sola vez, al abrir la página
  useEffect(() => {
    fetch(API_URL)
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch(() => setError('No se pudo conectar con el servidor'))
  }, [])

  return (
    <div>
      <h1>Lasitu</h1>
      {error && <p>{error}</p>}
      <ul>
        {productos.map((p) => (
          <li key={p._id}>
            {p.nombre} - {p.categoria} - ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App