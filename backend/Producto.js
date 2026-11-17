import mongoose from 'mongoose'

// El "Schema" define cómo es una manilla en la base de datos
const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    descripcion: { type: String, default: '' },
    colores: { type: String, default: '' }, // Ejemplo: 'Azul y blanco'
    etiqueta: { type: String, default: '' }, // Ejemplo: 'Nuevo' o 'Más vendida'
    imagen: { type: String, default: '' }, // Ruta de la foto, ejemplo: '/nudo-marinero.jpg'
  },
  { timestamps: true } // Agrega fecha de creación y de actualización
)

// El "Model" es el que se usa para crear, buscar, editar y borrar manillas
const Producto = mongoose.model('Producto', productoSchema)

export default Producto