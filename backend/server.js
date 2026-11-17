// Importar librerías
import 'dotenv/config' // Lee las variables del archivo .env
import express from 'express'
import mongoose from 'mongoose'
import Producto from './Producto.js' // El molde de las manillas

const app = express()
const PUERTO = process.env.PORT || 4000

// Permite que el servidor lea los datos JSON que le envían (req.body)
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API de Lasitu funcionando')
})

// GET: listar todas las manillas
app.get('/api/productos', async (req, res) => {
  const productos = await Producto.find()
  res.json(productos)
})

// POST: crear una manilla nueva
app.post('/api/productos', async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body)
    res.status(201).json(nuevo)
  } catch (error) {
    res.status(400).json({ mensaje: 'Datos inválidos' })
  }
})

// PUT: editar una manilla por su id
app.put('/api/productos/:id', async (req, res) => {
  const editado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!editado) {
    return res.status(404).json({ mensaje: 'Manilla no encontrada' })
  }
  res.json(editado)
})

// DELETE: eliminar una manilla por su id
app.delete('/api/productos/:id', async (req, res) => {
  const eliminado = await Producto.findByIdAndDelete(req.params.id)
  if (!eliminado) {
    return res.status(404).json({ mensaje: 'Manilla no encontrada' })
  }
  res.json({ mensaje: 'Manilla eliminada' })
})

// Primero conectar a MongoDB; solo si funciona, encender el servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(PUERTO, () => {
      console.log(`Servidor en http://localhost:${PUERTO}`)
    })
  })
  .catch((error) => {
    console.log('Error al conectar a MongoDB:', error.message)
  })