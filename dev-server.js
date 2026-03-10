const path = require('path');

async function start() {
  // Import Express app (API routes, DB connection, etc.)
  const app = require('./server/app');

  // Dynamically import Vite (ESM module)
  const { createServer: createViteServer } = await import('vite');

  // Check if --host flag was passed
  const useHost = process.argv.includes('--host');

  // Create Vite dev server in middleware mode
  const vite = await createViteServer({
    root: path.resolve(__dirname, 'client'),
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Mount Vite's middleware AFTER Express API routes
  // so /api/* is handled by Express, everything else by Vite
  app.use(vite.middlewares);

  const PORT = process.env.PORT || 5173;
  const HOST = useHost ? '0.0.0.0' : 'localhost';

  app.listen(PORT, HOST, () => {
    console.log();
    console.log(`  🚀 Dev server running:`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    if (useHost) {
      const os = require('os');
      const nets = os.networkInterfaces();
      for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
          if (net.family === 'IPv4' && !net.internal) {
            console.log(`  ➜  Network: http://${net.address}:${PORT}/`);
          }
        }
      }
    }
    console.log();
  });
}

start().catch((err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});
