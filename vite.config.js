import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pomi-icon.svg'],
      manifest: {
        name: 'Gracias Pomi',
        short_name: 'Pomi',
        description: 'Chat with Pomodoro the Corgi',
        theme_color: '#D2691E',
        background_color: '#FFF8F0',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pomi-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pomi-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
