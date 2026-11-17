import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Conecta React con el <div id="root"> del index.html
createRoot(document.getElementById('root')).render(<App />)