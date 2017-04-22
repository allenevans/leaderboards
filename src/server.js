/*
 * File         :   server.js
 * Description  :   Scoreboard server entry point.
 * ------------------------------------------------------------------------------------------------ */
const http = require('http');
const debug = require('debug')('scoreboard:api');
const port = parseInt(process.env.PORT || '3000', 10);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = require('./app');
app.set('port', port);

const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

process.on('SIGINT', () => setImmediate(() => process.exit(0)));
process.on('SIGTERM', () => setImmediate(() => process.exit(0)));

/**
 * Handle express server errors
 * @param error
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const address = server.address();
  const bind = typeof address === 'string'
    ? 'pipe ' + address
    : 'port ' + address.port;
  debug('Listening on ' + bind);
}
