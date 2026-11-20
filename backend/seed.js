// Este archivo llena la base de datos con las manillas reales de Lasitu.
// Se ejecuta con: npm run seed
// OJO: borra todo el catálogo y lo vuelve a crear con estas manillas.
import 'dotenv/config'
import mongoose from 'mongoose'
import Producto from './Producto.js'

const manillas = [
  {
    nombre: 'Adorno de Trenza',
    precio: 15000,
    categoria: 'Mostacillas',
    descripcion:
      'Adorno para trenza con espiral plateada, cadena dorada y un pequeño dije de flor de cerezo en mostacillas.',
    colores: 'Plateado, dorado, azul y blanco',
    etiqueta: '',
    imagen: '/manillas/adorno-trenza-cerezo.jpeg',
  },
  {
    nombre: 'Palo Chino para Cabello',
    precio: 24000,
    categoria: 'Mostacillas',
    descripcion:
      'Palo chino para el cabello con adorno en mostacillas, cadena dorada y un dije de resina en forma de pieza de rompecabezas.',
    colores: 'Azul, blanco, dorado y transparente',
    etiqueta: '',
    imagen: '/manillas/palo-chino-cabello.jpeg',
  },
  {
    nombre: 'Collar Flores de Cerezo',
    precio: 30000,
    categoria: 'Mostacillas',
    descripcion:
      'Collar con dije colgante de flores de cerezo en mostacillas, con cordón negro.',
    colores: 'Azul, blanco, rojo, rosado y negro',
    etiqueta: '',
    imagen: '/manillas/collar-flores-cerezo.jpeg',
  },
  {
    nombre: 'Llavero Nudo Chino',
    precio: 27000,
    categoria: 'Mostacillas',
    descripcion:
      'Llavero inspirado en el nudo chino original, hecho con cuentas facetadas rojas y un centro amarillo.',
    colores: 'Rojo, amarillo y plateado',
    etiqueta: '',
    imagen: '/manillas/llavero-nudo-chino.jpeg',
  },
  {
    nombre: 'Banda para el cabello con Flor',
    precio: 5400,
    categoria: 'Mostacillas',
    descripcion:
      'Moña para el cabello con una flor de mostacillas rojas y blancas, con una piedra roja al centro.',
    colores: 'Negro, rojo y blanco',
    etiqueta: '',
    imagen: '/manillas/mona-flor.jpeg',
  },
  {
    nombre: 'Llavero Orquídea China',
    precio: 40000,
    categoria: 'Mostacillas',
    descripcion:
      'Llavero con orquídea china hecho en mostacillas a mano, en rojo y blanco con el centro amarillo.',
    colores: 'Rojo, blanco, amarillo y plateado',
    etiqueta: '',
    imagen: '/manillas/llavero-orquidea-china.jpeg',
  },
  {
    nombre: 'Manilla Muranos y Piedras',
    precio: 17000,
    categoria: 'Mostacillas',
    descripcion:
      'Manilla con muranos y piedras naturales entre cuentas facetadas rojas, con cierre plateado en forma de moño.',
    colores: 'Rojo, naranja, amarillo, café y plateado',
    etiqueta: '',
    imagen: '/manillas/manilla-muranos-piedras.jpeg',
  },
  {
    nombre: 'Moña con Flores',
    precio: 5700,
    categoria: 'Mostacillas',
    descripcion:
      'Moña para el cabello con dos adornos de flores en mostacillas, una roja y una azul clara.',
    colores: 'Negro, rojo y azul claro',
    etiqueta: '',
    imagen: '/manillas/mona-flores.jpeg',
  },
  {
    nombre: 'Manilla Mariposa',
    precio: 29000,
    categoria: 'Mostacillas',
    descripcion:
      'Manilla en mostacillas con una mariposa en tonos azules y pequeñas flores transparentes, con cierre dorado y cadena para ajustar.',
    colores: 'Azul, transparente y dorado',
    etiqueta: '',
    imagen: '/manillas/manilla-mariposa.jpeg',
  },
  {
    nombre: 'Manilla Ojo Turco',
    precio: 9500,
    categoria: 'Macramé',
    descripcion:
      'Manilla de macramé negra con un pequeño ojo turco azul al centro y cordones para ajustarla.',
    colores: 'Negro y azul',
    etiqueta: '',
    imagen: '/manillas/manilla-con-ojo-turco.jpeg',
  },
]

async function llenarBaseDeDatos() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await Producto.deleteMany()
    await Producto.insertMany(manillas)
    console.log('Listo: ' + manillas.length + ' manillas guardadas')
  } catch (error) {
    console.error('No se pudo llenar la base de datos:', error.message)
  } finally {
    await mongoose.disconnect()
  }
}

llenarBaseDeDatos()