import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaWhatsapp } from 'react-icons/fa'
import { NEGOCIO, formatoPrecio } from './datos.js'
import Foto from './Foto.jsx'
import Redes from './Redes.jsx'

const API_URL = 'http://localhost:4000/api/productos'
const CATEGORIAS = ['Todas', 'Macramé', 'Mostacillas']

function App() {
  // Estados: la "memoria" del componente
  const [productos, setProductos] = useState([])
  const [error, setError] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('')
  // La manilla que está abierta en el cuadro. null = ninguna.
  const [abierta, setAbierta] = useState(null)
  // El pedido: una lista de { _id, nombre, precio, cantidad }
  const [carrito, setCarrito] = useState([])
  const [pedidoAbierto, setPedidoAbierto] = useState(false)

  // Pide las manillas al servidor una sola vez, al abrir la página
  useEffect(() => {
    fetch(API_URL)
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch(() => setError('No se pudo conectar con el servidor'))
  }, [])

  // ===== Filtros y orden =====
  let visibles = productos.filter(
    (p) =>
      (categoria === 'Todas' || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )
  if (orden === 'menor') visibles.sort((a, b) => a.precio - b.precio)
  if (orden === 'mayor') visibles.sort((a, b) => b.precio - a.precio)

  // ===== Pedido =====
  // Agrega una manilla. Si ya estaba, le suma 1 a la cantidad.
  function agregarAlPedido(p) {
    const existe = carrito.find((i) => i._id === p._id)
    if (existe) {
      setCarrito(
        carrito.map((i) => (i._id === p._id ? { ...i, cantidad: i.cantidad + 1 } : i))
      )
    } else {
      setCarrito([...carrito, { _id: p._id, nombre: p.nombre, precio: p.precio, cantidad: 1 }])
    }
    toast.success(p.nombre + ' agregada al pedido')
    setAbierta(null)
  }

  // Suma o resta 1 a la cantidad. Si llega a 0, la manilla sale del pedido.
  function cambiarCantidad(id, cambio) {
    setCarrito(
      carrito
        .map((i) => (i._id === id ? { ...i, cantidad: i.cantidad + cambio } : i))
        .filter((i) => i.cantidad > 0)
    )
  }

  // Cuántas manillas hay en total y cuánto suman
  const cantidadTotal = carrito.reduce((suma, i) => suma + i.cantidad, 0)
  const total = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0)

  // Mensaje de WhatsApp con el pedido ya escrito
  const mensaje =
    'Hola Lasitu, quiero hacer este pedido:\n' +
    carrito
      .map((i) => `- ${i.cantidad} x ${i.nombre} (${formatoPrecio(i.precio * i.cantidad)})`)
      .join('\n') +
    '\nTotal: ' +
    formatoPrecio(total)
  const enlaceWhatsApp = `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`

  return (
    <>
      {/* Contenedor de los avisos pequeños */}
      <Toaster position="bottom-center" />

      {/* ===== Cabecera ===== */}
      <header className="cabecera">
        <a className="marca" href="#inicio">
          LASITU
        </a>
        <nav className="menu">
          <a href="#catalogo">Catálogo</a>
          <a href="#como-pedir">Cómo pedir</a>
        </nav>
        <button className="boton-pedido" onClick={() => setPedidoAbierto(true)}>
          Pedido ({cantidadTotal})
        </button>
      </header>

      {/* ===== Portada: el eslogan como cartel ===== */}
      <section className="portada" id="inicio">
        <h1>
          <span className="lleno">INSPIRACIÓN</span>
          <span className="contorno">QUE MOTIVA</span>
        </h1>
        <p className="bajada">{NEGOCIO.descripcion}</p>
        <Redes />
      </section>

      {/* ===== Catálogo ===== */}
      <section className="seccion" id="catalogo">
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
              <button className="fila" onClick={() => setAbierta(p)}>
                <span className="miniatura">
                  <Foto src={p.imagen} alt={p.nombre} texto="" />
                </span>
                <span className="titulo">{p.nombre}</span>
                <small>
                  {p.categoria} / {formatoPrecio(p.precio)}
                  {p.etiqueta ? ' / ' + p.etiqueta : ''}
                </small>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== Cómo pedir: es una secuencia, por eso va numerada ===== */}
      <section className="como" id="como-pedir">
        <h2 className="titulo">Cómo pedir</h2>
        <ol>
          <li>
            <span className="num">1</span>
            <strong>Elige</strong>
            <p>Toca una manilla del catálogo y agrégala al pedido.</p>
          </li>
          <li>
            <span className="num">2</span>
            <strong>Revisa</strong>
            <p>Abre tu pedido, ajusta las cantidades y mira el total.</p>
          </li>
          <li>
            <span className="num">3</span>
            <strong>Envía</strong>
            <p>Te llevamos a WhatsApp con el pedido ya escrito. Solo falta enviarlo.</p>
          </li>
        </ol>
      </section>

      {/* ===== Pie de página ===== */}
      <footer className="pie">
        <span className="marca">LASITU</span>
        <Redes />
        <small>{new Date().getFullYear()} Lasitu. Hecho a mano.</small>
      </footer>

      {/* ===== Botón flotante de WhatsApp ===== */}
      <a
        className="flotante"
        href={'https://wa.me/' + NEGOCIO.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>

      {/* ===== Cuadro de información de una manilla ===== */}
      {abierta && (
        <div className="fondo" onClick={() => setAbierta(null)}>
          <div className="cuadro" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={() => setAbierta(null)}>
              CERRAR
            </button>

            <Foto src={abierta.imagen} alt={abierta.nombre} texto="Foto de referencia" />

            <p className="dato">
              {abierta.categoria}
              {abierta.etiqueta ? ' / ' + abierta.etiqueta : ''}
            </p>
            <h2 className="titulo">{abierta.nombre}</h2>
            <p>{abierta.descripcion || 'Descripción próximamente.'}</p>
            {abierta.colores && (
              <p>
                <strong>Colores:</strong> {abierta.colores}
              </p>
            )}
            <p className="precio">{formatoPrecio(abierta.precio)}</p>

            <button className="boton" onClick={() => agregarAlPedido(abierta)}>
              AGREGAR AL PEDIDO
            </button>
          </div>
        </div>
      )}

      {/* ===== Cuadro del pedido ===== */}
      {pedidoAbierto && (
        <div className="fondo" onClick={() => setPedidoAbierto(false)}>
          <div className="cuadro" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={() => setPedidoAbierto(false)}>
              CERRAR
            </button>
            <h2 className="titulo">Tu pedido</h2>

            {carrito.length === 0 ? (
              <p>Todavía no has agregado manillas. Toca una del catálogo para empezar.</p>
            ) : (
              <>
                <ul className="items">
                  {carrito.map((i) => (
                    <li key={i._id}>
                      <span>{i.nombre}</span>
                      <span className="cantidad">
                        <button onClick={() => cambiarCantidad(i._id, -1)}>-</button>
                        {i.cantidad}
                        <button onClick={() => cambiarCantidad(i._id, 1)}>+</button>
                      </span>
                      <span>{formatoPrecio(i.precio * i.cantidad)}</span>
                    </li>
                  ))}
                </ul>

                <p className="precio">Total: {formatoPrecio(total)}</p>
                <a className="boton" href={enlaceWhatsApp} target="_blank" rel="noreferrer">
                  ENVIAR PEDIDO POR WHATSAPP
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default App