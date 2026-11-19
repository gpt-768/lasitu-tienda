import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Usuario from './Usuario.js'

// Los usuarios y contraseñas se leen del archivo .env, que no se sube a GitHub.
const usuarios = [
  {
    usuario: process.env.USUARIO_ADMIN,
    clave: process.env.CLAVE_ADMIN,
    rol: 'admin',
  },
  {
    usuario: process.env.USUARIO_VENDEDOR,
    clave: process.env.CLAVE_VENDEDOR,
    rol: 'vendedor',
  },
]

// Si falta alguno en el .env, se avisa y no se hace nada
const faltan = usuarios.some((u) => !u.usuario || !u.clave)
if (faltan) {
  console.log('Faltan usuarios o contraseñas en backend/.env. Revisa .env.example.')
  process.exit(1)
}

await mongoose.connect(process.env.MONGO_URI)

// Borra los usuarios anteriores y crea los nuevos
await Usuario.deleteMany()

for (const u of usuarios) {
  await Usuario.create({
    usuario: u.usuario,
    // hash convierte la contraseña en un texto ilegible que no se puede revertir
    clave: await bcrypt.hash(u.clave, 10),
    rol: u.rol,
  })
}

console.log('Usuarios creados:', usuarios.map((u) => u.usuario).join(', '))
await mongoose.disconnect()