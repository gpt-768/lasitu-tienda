// Importar Express, la librería que crea el servidor
import express from 'express'

// Crear la aplicación: es el servidor en sí
const app = express()

// Puerto: el "número de puerta" por donde el servidor recibe visitas
const PUERTO = 4000

// Una ruta: cuando alguien visite "/", el servidor responde este texto
app.get('/', (req, res) => {
  res.send('API de Lasitu funcionando')
})

// Encender el servidor y quedarse esperando peticiones
app.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`)
})