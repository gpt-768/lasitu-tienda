// Datos del emprendimiento. Si algo cambia, se edita solo aquí.
export const NEGOCIO = {
  nombre: 'Lasitu',
  eslogan: 'Inspiración que motiva',
  descripcion:
    'Creamos manillas a mano con diferentes técnicas, tanto en macramé como en mostacillas.',
}

// Convierte un número en precio colombiano. Ejemplo: 15000 -> "$15.000"
export function formatoPrecio(valor) {
  return '$' + valor.toLocaleString('es-CO')
}