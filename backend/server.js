import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import Producto from './Producto.js'
import Usuario from './Usuario.js'
import { crearToken, soloVendedores } from './auth.js'

const app = express()

// Permite que el frontend (puerto 5173) hable con este servidor (puerto 4000)
app.use(cors())
// Permite leer los datos JSON que llegan en req.body
app.use(express.json())

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Lasitu funcionando')
})

// ===== Login =====
// Recibe usuario y clave. Si son correctos, entrega un token.
app.post('/api/login', async (req, res) => {
  const { usuario, clave } = req.body

  if (!usuario || !clave) {
    return res.status(400).json({ mensaje: 'Escribe usuario y contraseña' })
  }

  try {
    const encontrado = await Usuario.findOne({ usuario })

    // El mismo mensaje para "no existe" y "clave mala":
    // así no se le dice a un extraño cuáles usuarios existen.
    if (!encontrado) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' })
    }

    // compare encripta lo escrito y lo compara con lo guardado
    const coincide = await bcrypt.compare(clave, encontrado.clave)
    if (!coincide) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' })
    }

    res.json({
      token: crearToken(encontrado),
      usuario: encontrado.usuario,
      rol: encontrado.rol,
    })
  } catch {
    res.status(500).json({ mensaje: 'Error del servidor' })
  }
})

// ===== Productos =====
// Ver las manillas es público: cualquiera puede ver el catálogo
app.get('/api/productos', async (req, res) => {
  const productos = await Producto.find()
  res.json(productos)
})

// Crear, editar y borrar: protegido con soloVendedores
app.post('/api/productos', soloVendedores, async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body)
    res.status(201).json(nuevo)
  } catch {
    res.status(400).json({ mensaje: 'Datos inválidos' })
  }
})

app.put('/api/productos/:id', soloVendedores, async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }
    res.json(actualizado)
  } catch {
    res.status(400).json({ mensaje: 'Datos inválidos' })
  }
})

app.delete('/api/productos/:id', soloVendedores, async (req, res) => {
  try {
    const borrado = await Producto.findByIdAndDelete(req.params.id)
    if (!borrado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }
    res.json({ mensaje: 'Producto eliminado' })
  } catch {
    res.status(400).json({ mensaje: 'Id inválido' })
  }
})

// Conecta con MongoDB y, solo si funciona, enciende el servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const puerto = process.env.PORT || 4000
    app.listen(puerto, () => console.log('Servidor en http://localhost:' + puerto))
  })
  .catch((error) => console.log('No se pudo conectar con MongoDB:', error.message))