import { useState, useEffect } from 'react'
import { NEGOCIO, formatoPrecio } from './datos.js'
import Foto from './Foto.jsx'

const API_URL = 'http://localhost:4000/api/productos'
const CATEGORIAS = ['Todas', 'Macramé', 'Mostacillas']

function App() {
  // Estados: la "memoria" del componente
  const [productos, setProductos] = useState([])
  const [error, setError] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('')

  // Pide las manillas al servidor una sola vez, al abrir la página
  useEffect(() => {
    fetch(API_URL)
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch(() => setError('No se pudo conectar con el servidor'))
  }, [])

  // Lista que se muestra: se calcula cada vez que cambia un estado.
  // Primero filtra por categoría y por texto de búsqueda.
  let visibles = productos.filter(
    (p) =>
      (categoria === 'Todas' || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Después ordena por precio, si la persona eligió un orden
  if (orden === 'menor') visibles.sort((a, b) => a.precio - b.precio)
  if (orden === 'mayor') visibles.sort((a, b) => b.precio - a.precio)

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

      {/* ===== Catálogo ===== */}
      <section className="seccion" id="catalogo">
        {/* Filtros, buscador y orden */}
        <div className="controles">
          <div className="filtros">
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                className={c === categoria ? 'filtro activo' : 'filtro'}
                onClick={() => setCategoria(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <input
            type="search"
            placeholder="Buscar manilla"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="">Orden original</option>
            <option value="menor">Precio: menor a mayor</option>
            <option value="mayor">Precio: mayor a menor</option>
          </select>
        </div>

        {error && <p className="aviso-vacio">{error}</p>}
        {!error && productos.length > 0 && visibles.length === 0 && (
          <p className="aviso-vacio">No hay manillas con esos filtros.</p>
        )}

        <ul className="lista">
          {visibles.map((p) => (
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
