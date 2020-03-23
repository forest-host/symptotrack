const express = require('express');
const next = require('next');
const path = require('path');
const compression = require('compression');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ServiceWorker = (app) => (req, res) => {
  const filePath = path.join(__dirname, '.next', 'service-worker.js');

  app.serveStatic(req, res, filePath);
};

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    // Handle robots.txt file
    const robotsOptions = {
      root: `${__dirname}/public/static/`,
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
    };
    server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', robotsOptions));

    // handle next files
    server.get('/_next/*', (req, res) => handle(req, res));

    // ServiceWorker
    server.get('/service-worker.js', ServiceWorker(app));

    // Fallback handler
    server.get('*', (req, res) => handle(req, res));

    // Listen on the default port (3000)
    server.listen(port, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    process.exit(1);
  });
