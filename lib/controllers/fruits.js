const { Router } = require('express');
const Fruit = require('../models/fruit');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const fruit = await Fruit.insert(req.body);
    res.send(fruit);
  } catch (err) {
    next(err);
  }
});
