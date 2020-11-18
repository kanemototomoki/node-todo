const bodyParser = require('body-parser');
const api = require('./api.js');

module.exports = app => {
  app.use(bodyParser.json());
  app.use('/api', api);
}