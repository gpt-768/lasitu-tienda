import { FiCamera } from 'react-icons/fi'

// Muestra una foto. Si todavía no hay foto, muestra un espacio reservado.
// src, alt y texto son "props": datos que le pasa quien usa el componente.
function Foto({ src, alt, texto = 'Foto próximamente' }) {
  if (src) {
    return <img className="foto" src={src} alt={alt} />
  }

  return (
    <div className="foto foto-vacia" role="img" aria-label={alt}>
      <FiCamera size={28} />
      {texto && <span>{texto}</span>}
    </div>
  )
}

export default Foto