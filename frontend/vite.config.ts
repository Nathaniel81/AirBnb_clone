// vite.config.ts
import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
