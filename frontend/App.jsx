import { useState, useEffect } from 'react'
import { NEGOCIO, formatoPrecio } from './datos.js'
import Foto from './Foto.jsx'

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
    <>
      {/* ===== Cabecera ===== */}
      <header className="cabecera">
        <a className="marca" href="#inicio">
          LASITU
        </a>
        <nav className="menu">
          <a href="#catalogo">Catálogo</a>
        </nav>
      </header>

      {/* ===== Portada: el eslogan como cartel ===== */}
      <section className="portada" id="inicio">
        <h1>
          <span className="lleno">INSPIRACIÓN</span>
          <span className="contorno">QUE MOTIVA</span>
        </h1>
        <p className="bajada">{NEGOCIO.descripcion}</p>
      </section>

      {/* ===== Catálogo: lista de nombres gigantes ===== */}
      <section className="seccion" id="catalogo">
        {error && <p className="aviso-vacio">{error}</p>}
        <ul className="lista">
          {productos.map((p) => (
            <li key={p._id}>
              <div className="fila">
                <span className="miniatura">
                  <Foto src={p.imagen} alt={p.nombre} texto="" />
                </span>
                <span className="titulo">{p.nombre}</span>
                <small>
                  {p.categoria} / {formatoPrecio(p.precio)}
                  {p.etiqueta ? ' / ' + p.etiqueta : ''}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default App