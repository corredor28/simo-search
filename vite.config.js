import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/empleos': {
        target: 'https://simo.cnsc.gov.co',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
