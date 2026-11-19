import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa'

// Datos del emprendimiento. Si algo cambia, se edita solo aquí.
export const NEGOCIO = {
  nombre: 'Lasitu',
  eslogan: 'Inspiración que motiva',
  descripcion:
    'Creamos manillas a mano con diferentes técnicas, tanto en macramé como en mostacillas.',
  // Número de WhatsApp con código de país, sin + ni espacios.
  // Ejemplo: '573001234567'. Cambien este por el número real.
  whatsapp: '573108889194',
  redes: [
    {
      nombre: 'Instagram',
      enlace: 'https://www.instagram.com/Lasitucompany2',
      icono: FaInstagram,
    },
    {
      nombre: 'Facebook',
      enlace: 'https://www.facebook.com/Lasitucompany2',
      icono: FaFacebookF,
    },
    {
      nombre: 'Pinterest',
      enlace: 'https://www.pinterest.com/Lasitucompany',
      icono: FaPinterestP,
    },
  ],
  // Imágenes decorativas. Mientras estén vacías se muestra un espacio reservado.
  // Para poner una foto: guárdenla en frontend/public/decorativas/
  // y escriban su ruta, por ejemplo '/decorativas/portada.jpg'.
  decorativas: [
    '', // 0: junto a la portada
    '', // 1: tira de fotos, izquierda
    '', // 2: tira de fotos, centro
    '', // 3: tira de fotos, derecha
  ],
}

// Convierte un número en precio colombiano. Ejemplo: 15000 -> "$15.000"
export function formatoPrecio(valor) {
  return '$' + valor.toLocaleString('es-CO')
}