const dbPool = require("../../config/db_config")

function getAll() {
  const query = `SELECT * FROM paket_kredit WHERE status_keaktifan = ${true}`

  const result = dbPool.execute(query);

  return result;
}

module.exports = {
  getAll
}