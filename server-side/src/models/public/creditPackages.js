const dbPool = require("../../config/db_config")

function findAllByDp(dp) {
  const query = `SELECT * FROM paket_kredit WHERE uang_muka = '${dp}'`

  const result = dbPool.execute(query);

  return result;
}

module.exports = {
  findAllByDp
}