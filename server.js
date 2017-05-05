import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router'
import App from './app';


//serverRenderer
export default ({ clientStats, serverStats, foo }) => {
  return (req, res, next) => {
    const context = {};

    const html = ReactDOMServer.renderToString(
      <StaticRouter
        location={req.url}
        context={foo}
      >
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      });
      res.end();

    } else {
      res.status(200).send(`
          <!doctype html>
          <html>
          <head>
              <title>${foo}</title>
              <script src="/show/vs/loader.js"></script>
          </head>
          <body>
              <div id="root">${html}</div>
              <script src="/client.js"></script>
          </body>
          </html>
      `);
    }
  };
}
