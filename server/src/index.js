// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

const { port, env } = require('./config/vars');
const app = require('./config/express');
// listen to requests
app.listen(port, () => console.log(`Server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
