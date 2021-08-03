const pool = require('../utils/pool.js');

module.exports = class Fruit {
  id;
  name;
  color;
  ripe;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.ripe = row.ripe;
  }

  static async insert({ name, color, ripe }) {
    const { rows } = await pool.query(
      `INSERT 
      INTO fruits (name, color, ripe)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, color, ripe]
    );
    return new Fruit(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
        FROM fruits 
        WHERE id=$1`,
      [id]
    );
    return new Fruit(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT * 
        FROM fruits `
    );
    return rows.map((row) => new Fruit(row));
  }

  static async updateById(id, { name, color, ripe }) {
    const currentFruit = await Fruit.getById(id);
    const newName = name ?? currentFruit.name;
    const newColor = color ?? currentFruit.color;
    const newRipe = ripe ?? currentFruit.ripe;

    const { rows } = await pool.query(
      `UPDATE fruits
      SET
      name=$1, color=$2, ripe=$3
      WHERE id=$4 
      RETURNING *`,
      [newName, newColor, newRipe, id]
    );
    return new Fruit(rows[0]);
  }

  static async deleteById(id) {
    const currentFruit = await Fruit.getById(id);
    const newName = name ?? currentFruit.name;
    const newColor = color ?? currentFruit.color;
    const newRipe = ripe ?? currentFruit.ripe;

    const { rows } = await pool.query(
      `UPDATE fruits
      SET
      name=$1, color=$2, ripe=$3
      WHERE id=$4 
      RETURNING *`,
      [newName, newColor, newRipe, id]
    );
    return new Fruit(rows[0]);
  }
};
