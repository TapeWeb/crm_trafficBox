import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const clientPort = env.VITE_CLIENT_PORT || 5173;

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: Number(clientPort),
      strictPort: true,
    },
  }
})