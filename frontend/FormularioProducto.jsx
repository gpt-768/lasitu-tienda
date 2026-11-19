import { useState } from 'react'

// Valores de un formulario vacío
const VACIO = {
  nombre: '',
  precio: '',
  categoria: 'Macramé',
  descripcion: '',
  colores: '',
  etiqueta: '',
  imagen: '',
}

// Sirve para crear y para editar una manilla.
// Si "producto" trae un _id se está editando; si viene vacío ({}) se está creando.
function FormularioProducto({ producto, onGuardar, onCerrar }) {
  const [datos, setDatos] = useState({ ...VACIO, ...producto })

  // Una sola función para todos los campos: usa el atributo "name" del campo
  function cambiar(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value })
  }

  function enviar(evento) {
    evento.preventDefault()
    // Se envían solo los campos de la manilla, con el precio como número
    onGuardar({
      nombre: datos.nombre,
      precio: Number(datos.precio),
      categoria: datos.categoria,
      descripcion: datos.descripcion,
      colores: datos.colores,
      etiqueta: datos.etiqueta,
      imagen: datos.imagen,
    })
  }

  return (
    <div className="fondo" onClick={onCerrar}>
      <form className="cuadro" onClick={(e) => e.stopPropagation()} onSubmit={enviar}>
        <button type="button" className="cerrar" onClick={onCerrar}>
          CERRAR
        </button>
        <h2 className="titulo">{producto._id ? 'Editar manilla' : 'Agregar manilla'}</h2>

        <label>
          Nombre
          <input name="nombre" value={datos.nombre} onChange={cambiar} required />
        </label>

        <label>
          Precio
          <input
            name="precio"
            type="number"
            min="0"
            value={datos.precio}
            onChange={cambiar}
            required
          />
        </label>

        <label>
          Categoría
          <select name="categoria" value={datos.categoria} onChange={cambiar}>
            <option value="Macramé">Macramé</option>
            <option value="Mostacillas">Mostacillas</option>
          </select>
        </label>

        <label>
          Descripción
          <textarea name="descripcion" value={datos.descripcion} onChange={cambiar} />
        </label>

        <label>
          Colores
          <input
            name="colores"
            value={datos.colores}
            onChange={cambiar}
            placeholder="Ejemplo: azul, blanco y rojo"
          />
        </label>

        <label>
          Etiqueta (opcional)
          <input
            name="etiqueta"
            value={datos.etiqueta}
            onChange={cambiar}
            placeholder="Ejemplo: Nuevo"
          />
        </label>

        <label>
          Imagen (enlace o ruta)
          <input name="imagen" value={datos.imagen} onChange={cambiar} />
          <span className="ayuda">Déjalo vacío si todavía no hay foto.</span>
        </label>

        <button type="submit" className="boton">
          GUARDAR
        </button>
      </form>
    </div>
  )
}

export default FormularioProducto