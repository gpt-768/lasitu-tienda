import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa'

// Datos del emprendimiento. Si algo cambia, se edita solo aquí.
export const NEGOCIO = {
  nombre: 'Lasitu',
  eslogan: 'Inspiración que motiva',
  descripcion:
    'Creamos manillas a mano con diferentes técnicas, tanto en macramé como en mostacillas.',
  // Número de WhatsApp con código de país, sin + ni espacios.
  // IMPORTANTE: cambien este número de ejemplo por el real.
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
}

// Convierte un número en precio colombiano. Ejemplo: 15000 -> "$15.000"
export function formatoPrecio(valor) {
  return '$' + valor.toLocaleString('es-CO')
}