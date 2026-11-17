// Este archivo llena la base de datos con manillas de ejemplo.
// Se ejecuta con: npm run seed
import 'dotenv/config'
import mongoose from 'mongoose'
import Producto from './Producto.js'

// Manillas de EJEMPLO. Cambien nombres, precios y fotos por los reales.
// imagen: '' deja un espacio reservado hasta que pongan la foto.
const manillas = [
  { nombre: 'Nudo Marinero', colores: 'Azul y blanco', etiqueta: 'Más vendida', precio: 15000, categoria: 'Macramé', descripcion: 'Hilo encerado azul con nudo plano y cierre ajustable.', imagen: '' },
  { nombre: 'Espiral Roja', colores: 'Rojo y blanco', precio: 16000, categoria: 'Macramé', descripcion: 'Nudo en espiral que gira alrededor de la muñeca.', imagen: '' },
  { nombre: 'Trenza Noche', colores: 'Negro y blanco', precio: 18000, categoria: 'Macramé', descripcion: 'Trenza negra con detalles en blanco.', imagen: '' },
  { nombre: 'Cielo Abierto', colores: 'Celeste y blanco', etiqueta: 'Nuevo', precio: 17000, categoria: 'Macramé', descripcion: 'Macramé celeste y blanco con dije central.', imagen: '' },
  { nombre: 'Rombo Tradicional', colores: 'Azul oscuro y blanco', etiqueta: 'Más vendida', precio: 22000, categoria: 'Mostacillas', descripcion: 'Patrón de rombos tejido cuenta por cuenta.', imagen: '' },
  { nombre: 'Ola Azul', colores: 'Azules y celeste', precio: 20000, categoria: 'Mostacillas', descripcion: 'Degradado de azules en mostacilla de vidrio.', imagen: '' },
  { nombre: 'Corazón Rojo', colores: 'Blanco y rojo', etiqueta: 'Nuevo', precio: 21000, categoria: 'Mostacillas', descripcion: 'Corazones rojos sobre fondo blanco.', imagen: '' },
  { nombre: 'Ajedrez', colores: 'Blanco y negro', precio: 19000, categoria: 'Mostacillas', descripcion: 'Cuadros blancos y negros en tejido plano.', imagen: '' },
]

async function llenarBaseDeDatos() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await Producto.deleteMany() // Borra lo que había
    await Producto.insertMany(manillas) // Inserta las manillas de ejemplo
    console.log('Base de datos llena con', manillas.length, 'manillas')
  } catch (error) {
    console.log('Error:', error.message)
  } finally {
    await mongoose.disconnect() // Cierra la conexión al terminar
  }
}

llenarBaseDeDatos()