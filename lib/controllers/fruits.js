const { Router } = require('express');
const Fruit = require('../models/fruit.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const fruit = await Fruit.insert(req.body);
      res.send(fruit);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const fruit = await Fruit.getById(id);
      res.send(fruit);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const fruit = await Fruit.getAll();
      res.send(fruit);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, color, ripe } = req.body;

      const updatedFruit = await Fruit.updateById(id, { name, color, ripe, });


      res.send(updatedFruit);
    } catch (err) {
      next(err);
    }
  }).delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const fruit = await Fruit.deleteById(id);

      res.send({
        message: `${fruit.name} has been eaten!`
      });

    } catch(err) {
      next(err);
    }
  });
