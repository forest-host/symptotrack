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

  // Home
  server.get('/nl', (req, res) => {
    app.render(req, res, '/');
  });

  // Map
  server.get('/nl/kaart', (req, res) => {
    const queryParams = {
      z: req.query.z,
      top: req.query.top,
      right: req.query.right,
      bottom: req.query.bottom,
      left: req.query.left,
    };

    app.render(req, res, '/map', queryParams);
  });

  // About
  server.get('/nl/over-symptotrack', (req, res) => {
    const queryParams = { lang: 'nl' };
    app.render(req, res, '/about', queryParams);
  });

  // Faq
  server.get('/nl/veelgestelde-vragen', (req, res) => {
    const queryParams = { lang: 'nl' };
    app.render(req, res, '/faq', queryParams);
  });

  // Contact
  server.get('/nl/contact', (req, res) => {
    const queryParams = { lang: 'nl' };
    app.render(req, res, '/contact', queryParams);
  });

  // Questionnaire
  server.get('/nl/vragenlijst', (req, res) => {
    const queryParams = { lang: 'nl' };
    app.render(req, res, '/questionnaire', queryParams);
  });

  server.get('/nl/vragenlijst/:name', (req, res) => {
    const queryParams = {
      name: req.query.name,
      lang: 'nl',
    };

    app.render(req, res, '/questionnaire', queryParams);
  });

  // Thank you page
  server.get('/nl/bedankt', (req, res) => {
    const queryParams = { lang: 'nl' };
    app.render(req, res, '/thankyou', queryParams);
  });

  // Privacy
  server.get('/nl/privacyvoorwaarden', (req, res) => {
    const queryParams = { lang: 'nl' };
    app.render(req, res, '/privacy', queryParams);
  });

  // Redirects
  server.get(
    [
      '/kaart',
      '/over-symptotrack',
      '/veelgestelde-vragen',
      '/vragenlijst',
      '/bedankt',
      '/privacyvoorwaarden',
    ],
    (req, res) => {
      res.redirect('/nl' + req.originalUrl);
    }
  );

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
