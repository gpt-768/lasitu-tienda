// Importar librerías
import 'dotenv/config' // Lee las variables del archivo .env
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PUERTO = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send('API de Lasitu funcionando')
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