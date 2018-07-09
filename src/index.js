import http from 'http';
import debug from 'debug';
import app from './server';

const trace = debug(__filename);

// Use `app#callback()` method here instead of directly
// passing `app` as an argument to `createServer` (or use `app#listen()` instead)
// @see https://github.com/koajs/koa/blob/master/docs/api/index.md#appcallback
const server = http.createServer(app.callback());

let currentApp = app;

server.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    trace(error);
  }

  trace('🚀 started');
});

if (module.hot) {
  trace('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    trace('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);

    // eslint-disable-next-line global-require
    const newApp = require('./server').default;

    server.on('request', newApp);
    currentApp = newApp;
  });
}
