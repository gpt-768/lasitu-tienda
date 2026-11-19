import { NEGOCIO } from './datos.js'

// Fila de iconos con los enlaces a las redes. Se usa en la portada y en el pie.
function Redes() {
  return (
    <div className="redes">
      {NEGOCIO.redes.map((r) => (
        <a
          key={r.nombre}
          href={r.enlace}
          target="_blank"
          rel="noreferrer"
          aria-label={r.nombre}
          title={r.nombre}
        >
          <r.icono size={22} />
        </a>
      ))}
    </div>
  )
}

export default Redes