import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Important for custom domain
  server: {
    port: 3000, // You can change this if needed
    open: true, // Automatically open the browser
  }
})