import mongoose from 'mongoose'

// Plantilla de un usuario: quién puede entrar y con qué rol
const usuarioSchema = new mongoose.Schema(
  {
    usuario: { type: String, required: true, unique: true },
    // Aquí NO se guarda la contraseña real, sino su versión encriptada
    clave: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'vendedor'], default: 'vendedor' },
  },
  { timestamps: true }
)

export default mongoose.model('Usuario', usuarioSchema)