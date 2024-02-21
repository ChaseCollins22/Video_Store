const express = require('express');
const winston = require('winston');

const app = express();

require('./startup/config')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/validation')();
require('./startup/routes')(app);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => winston.info(`App started at http://localhost:${PORT}`));

module.exports = server;
