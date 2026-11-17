import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Le dice a Vite que el proyecto usa React
export default defineConfig({
  plugins: [react()],
})