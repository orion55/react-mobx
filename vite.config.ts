import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/react-mobx/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
