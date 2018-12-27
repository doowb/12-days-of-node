'use strict';

const http = require('http');
const { create } = require('./app');

const PORT = process.env.PORT || 3000;

const run = () => {
  return new Promise(async (resolve, reject) => {

    /**
     * Use the factory function to create a new application.
     */

    let app = await create();
    app.once('error', reject);

    /**
     * Create a server using the app and listen on the specified PORT
     * for incoming requests.
     */

    let server = http.createServer(app);
    server.listen(PORT, () => {
      console.log('Web application listening on port:', PORT);
      console.log(`\thttp://localhost:${PORT}`);
    });

    /**
     * When <Ctrl+c> is pressed or when a process monitor
     * sends SIGINT or SIGTERM, end the process by resolving the promise
     */

    process.on('SIGINT', resolve);
    process.on('SIGTERM', resolve);
  });
};

/**
 * Run will create the application and server and start listening on the specified PORT
 */

run()
  .then(() => {
    console.log('\nShutting down');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
