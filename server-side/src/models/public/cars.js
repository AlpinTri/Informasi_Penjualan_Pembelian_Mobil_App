const dbPool = require('../../config/db_config');
const dbQuery = require('../../utils/searchCars');

function getAll() {
  const query = 'SELECT * FROM mobil';

  const data = dbPool.execute(query);

  return data;
}

function findAll(params) {
  let query = dbQuery(params);
  console.log(query)
  const result = dbPool.execute(query);

  return result;
}

function findOne(kodeMobil) {
  const query = `SELECT * FROM mobil WHERE kode_mobil = '${kodeMobil}'`;

  const data = dbPool.execute(query);

  return data;
}

module.exports = {
  getAll,
  findAll,
  findOne,
}