import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaWhatsapp } from 'react-icons/fa'
import { NEGOCIO, formatoPrecio } from './datos.js'
import Foto from './Foto.jsx'
import Redes from './Redes.jsx'
import Login from './Login.jsx'
import FormularioProducto from './FormularioProducto.jsx'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/api/productos'
const CATEGORIAS = ['Todas', 'Macramé', 'Mostacillas']

function App() {
  // Estados: la "memoria" del componente
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('')
  // La manilla que está abierta en el cuadro. null = ninguna.
  const [abierta, setAbierta] = useState(null)
  // El pedido: una lista de { _id, nombre, precio, cantidad }
  const [carrito, setCarrito] = useState([])
  const [pedidoAbierto, setPedidoAbierto] = useState(false)
  // La sesión: { token, usuario, rol } o null si nadie ha ingresado.
  // Al abrir la página se lee lo que haya guardado en el navegador.
  const [sesion, setSesion] = useState(() => {
    const guardada = localStorage.getItem('sesion')
    return guardada ? JSON.parse(guardada) : null
  })
  const [loginAbierto, setLoginAbierto] = useState(false)
  // Formulario de manillas: null = cerrado, {} = nueva, una manilla = editar
  const [formulario, setFormulario] = useState(null)

  // Pide las manillas al servidor
  function cargarProductos() {
    fetch(API_URL)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos)
        setError('')
      })
      .catch(() => setError('No se pudo conectar con el servidor'))
      .finally(() => setCargando(false))
  }

  // Al abrir la página se piden una sola vez
  useEffect(() => {
    cargarProductos()
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

  function cambiarCantidad(id, cambio) {
    setCarrito(
      carrito
        .map((i) => (i._id === id ? { ...i, cantidad: i.cantidad + cambio } : i))
        .filter((i) => i.cantidad > 0)
    )
  }

  const cantidadTotal = carrito.reduce((suma, i) => suma + i.cantidad, 0)
  const total = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0)

  const mensaje =
    'Hola Lasitu, quiero hacer este pedido:\n' +
    carrito
      .map((i) => `- ${i.cantidad} x ${i.nombre} (${formatoPrecio(i.precio * i.cantidad)})`)
      .join('\n') +
    '\nTotal: ' +
    formatoPrecio(total)
  const enlaceWhatsApp = `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`

  // ===== Sesión =====
  // Guarda la sesión en el estado y también en el navegador (localStorage)
  function iniciarSesion(datos) {
    setSesion(datos)
    localStorage.setItem('sesion', JSON.stringify(datos))
    setLoginAbierto(false)
    toast.success('Sesión iniciada')
  }

  function cerrarSesion() {
    setSesion(null)
    localStorage.removeItem('sesion')
    setFormulario(null)
  }

  // ===== Administrar manillas (solo con sesión) =====
  // Envía una petición al servidor incluyendo el token en la cabecera.
  // Si el servidor dice 401, la sesión venció: se cierra y se avisa.
  async function enviarConToken(url, metodo, datos) {
    const respuesta = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sesion.token,
      },
      body: datos ? JSON.stringify(datos) : undefined,
    })

    if (respuesta.status === 401) {
      cerrarSesion()
      toast.error('Tu sesión venció. Ingresa de nuevo.')
      return null
    }
    return respuesta
  }

  // Crea una manilla nueva o actualiza una existente
  async function guardarProducto(datos) {
    const editando = Boolean(formulario._id)
    const url = editando ? `${API_URL}/${formulario._id}` : API_URL
    const metodo = editando ? 'PUT' : 'POST'

    try {
      const respuesta = await enviarConToken(url, metodo, datos)
      if (!respuesta) return

      if (!respuesta.ok) {
        toast.error('No se pudo guardar. Revisa los datos.')
        return
      }

      toast.success(editando ? 'Manilla actualizada' : 'Manilla agregada')
      setFormulario(null)
      cargarProductos()
    } catch {
      toast.error('No se pudo conectar con el servidor')
    }
  }

  async function eliminarProducto(p) {
    if (!window.confirm('¿Eliminar "' + p.nombre + '"? Esta acción no se puede deshacer.')) {
      return
    }

    try {
      const respuesta = await enviarConToken(`${API_URL}/${p._id}`, 'DELETE')
      if (!respuesta) return

      if (!respuesta.ok) {
        toast.error('No se pudo eliminar')
        return
      }

      toast.success('Manilla eliminada')
      setAbierta(null)
      cargarProductos()
    } catch {
      toast.error('No se pudo conectar con el servidor')
    }
  }

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
        <div className="acciones-cabecera">
          {!sesion && (
            <button className="boton-pedido" onClick={() => setLoginAbierto(true)}>
              Ingresar
            </button>
          )}
          <button className="boton-pedido" onClick={() => setPedidoAbierto(true)}>
            Pedido ({cantidadTotal})
          </button>
        </div>
      </header>

      {/* ===== Barra del vendedor: solo existe si hay sesión ===== */}
      {sesion && (
        <div className="barra-vendedor">
          <span>Modo vendedor: {sesion.usuario}</span>
          <button className="boton-claro" onClick={() => setFormulario({})}>
            AGREGAR MANILLA
          </button>
          <button className="boton-claro" onClick={cerrarSesion}>
            SALIR
          </button>
        </div>
      )}

      {/* ===== Portada: el eslogan como cartel ===== */}
      <section className="portada" id="inicio">
        <h1>
          <span className="lleno">INSPIRACIÓN</span>
          <span className="contorno">QUE MOTIVA</span>
        </h1>

        {/* Debajo del título: texto y redes a un lado, foto decorativa al otro */}
        <div className="portada-fila">
          <div>
            <p className="bajada">{NEGOCIO.descripcion}</p>
            <Redes />
          </div>
          <div className="portada-foto">
            <Foto
              src={NEGOCIO.decorativas[0]}
              alt="Manillas hechas a mano de Lasitu"
              texto="Foto decorativa"
            />
          </div>
        </div>
      </section>

      {/* ===== Banda con el eslogan. Es decoración, por eso se oculta a lectores de pantalla ===== */}
      <div className="banda" aria-hidden="true">
        <span>{NEGOCIO.eslogan}</span>
        <span>{NEGOCIO.eslogan}</span>
        <span>{NEGOCIO.eslogan}</span>
      </div>

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
        
        {cargando && (
          <p className="aviso-vacio">
            Cargando las manillas... la primera vez puede tardar hasta un minuto.
          </p>
        )}      
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

      {/* ===== Tira de tres fotos decorativas ===== */}
      <section className="tira">
        {NEGOCIO.decorativas.slice(1).map((src, n) => (
          <Foto key={n} src={src} alt="Manillas hechas a mano de Lasitu" texto="Foto decorativa" />
        ))}
      </section>

      {/* ===== Cómo pedir ===== */}
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

            <div className="acciones">
              <button className="boton" onClick={() => agregarAlPedido(abierta)}>
                AGREGAR AL PEDIDO
              </button>

              {/* Editar y eliminar solo aparecen si hay sesión */}
              {sesion && (
                <>
                  <button
                    className="boton-claro"
                    onClick={() => {
                      setFormulario(abierta)
                      setAbierta(null)
                    }}
                  >
                    EDITAR
                  </button>
                  <button
                    className="boton-claro boton-rojo"
                    onClick={() => eliminarProducto(abierta)}
                  >
                    ELIMINAR
                  </button>
                </>
              )}
            </div>
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

      {/* ===== Login ===== */}
      {loginAbierto && (
        <Login onEntrar={iniciarSesion} onCerrar={() => setLoginAbierto(false)} />
      )}

      {/* ===== Formulario para agregar o editar una manilla ===== */}
      {formulario && sesion && (
        <FormularioProducto
          producto={formulario}
          onGuardar={guardarProducto}
          onCerrar={() => setFormulario(null)}
        />
      )}
    </>
  )
}

export default App