const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const nextI18next = require('./i18n');

const path = require('path');
const compression = require('compression');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));
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

  // Map
  server.get('/kaart', (req, res) => {
    app.render(req, res, '/map');
  });

  // About
  server.get('/over-symptotrack', (req, res) => {
    app.render(req, res, '/about');
  });

  // Faq
  server.get('/veelgestelde-vragen', (req, res) => {
    app.render(req, res, '/faq');
  });

  // Questionnaire
  server.get('/vragenlijst', (req, res) => {
    app.render(req, res, '/questionnaire');
  });

  server.get('/vragenlijst/:name', (req, res) => {
    const queryParams = {
      name: req.query.name,
    };

    app.render(req, res, '/questionnaire', queryParams);
  });

  // Thank you page
  server.get('/bedankt', (req, res) => {
    app.render(req, res, '/thankyou');
  });

  // ServiceWorker
  server.get('/service-worker.js', (req, res) => {
    res.sendFile(path.join(__dirname, '.next', 'service-worker.js'));
  });

  // Fallback handler
  server.get('*', (req, res) => handle(req, res));

  // Listen on the default port (3000)
  server.listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
