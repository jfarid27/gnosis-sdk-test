import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      process: "process/browser",
    },
  },
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  }
}
