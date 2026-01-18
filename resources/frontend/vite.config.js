import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      tailwindcss(),
   ],
   build: {
      outDir: '../../public/build',
      emptyOutDir: true,
      rollupOptions: {
         output: {
            entryFileNames: `assets/chat.js`,
            chunkFileNames: `assets/chat-[name].js`,
            assetFileNames: `assets/chat[extname]`
         }
      }
   },
})
