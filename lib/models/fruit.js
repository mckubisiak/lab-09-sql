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
      `
      INSERT INTO fruits (name, color, ripe)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, color, ripe]
    );
    return new Fruit(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT FROM fruits
      WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Fruit(rows[0]);
  }
};
