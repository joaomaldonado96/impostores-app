import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Reemplaza 'tuUsuario' y 'impostores-app' por tus datos
export default defineConfig({
  plugins: [react()],
  base: '/impostores-app/', 
});