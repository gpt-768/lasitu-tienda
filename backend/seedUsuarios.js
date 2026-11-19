import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Usuario from './Usuario.js'

// Usuarios de ejemplo para desarrollo. Cambien estas contraseñas
// por otras antes de publicar la página de verdad.
const usuarios = [
  { usuario: 'lasitu', clave: 'cambiame123', rol: 'admin' },
  { usuario: 'vendedor', clave: 'ventas123', rol: 'vendedor' },
]

await mongoose.connect(process.env.MONGO_URI)

// Borra los usuarios anteriores y crea los nuevos
await Usuario.deleteMany()

for (const u of usuarios) {
  await Usuario.create({
    usuario: u.usuario,
    // hash convierte "ventas123" en un texto ilegible que no se puede revertir
    clave: await bcrypt.hash(u.clave, 10),
    rol: u.rol,
  })
}

console.log('Usuarios creados:', usuarios.map((u) => u.usuario).join(', '))
await mongoose.disconnect()