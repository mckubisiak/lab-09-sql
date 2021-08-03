const express = require('express');
const app = express();
const fruitsController = require('../lib/controllers/fruits');
app.use(express.json());

app.use('/api/v1/fruits', fruitsController);

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
