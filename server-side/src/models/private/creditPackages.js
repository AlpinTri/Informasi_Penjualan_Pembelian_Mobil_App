const dbPool = require('../../config/db_config');

function get() {
  const query = `SELECT * FROM paket_kredit`;

  const result = dbPool.execute(query);
  return result;
}

function find(kodePaket) {
  const query = `SELECT * FROM paket_kredit WHERE kode_paket = '${kodePaket}'`;

  const result = dbPool.execute(query);
  return result;
}

function search(q) {
  const query = `SELECT * FROM paket_kredit 
                WHERE kode_paket LIKE '%${q}%' 
                OR uang_muka LIKE '%${q}%' 
                OR bunga LIKE '%${q}%' 
                OR tenor LIKE '%${q}%'`;
  
  const result = dbPool.execute(query);
  return result;
}

function create({ kodePaket, uangMuka, bunga, tenor, status, createdAt, updatedAt }) {
  const query = `INSERT INTO paket_kredit (kode_paket, uang_muka, bunga, tenor, status_keaktifan, created_at, updated_at)
                VALUES ('${kodePaket}', '${uangMuka}', '${bunga}', '${tenor}', '${status}', '${createdAt}', '${updatedAt}')`;
  
  const result = dbPool.execute(query);
  return result;
}

function update({ kodePaket, uangMuka, tenor, bunga, status, updatedAt }) {
  const query = `UPDATE paket_kredit SET uang_muka = '${uangMuka}', bunga = '${bunga}', tenor = '${tenor}', status_keaktifan = '${status}', updated_at = '${updatedAt}'
                WHERE kode_paket = '${kodePaket}'`;
  
  const result = dbPool.execute(query);
  return result;
}

function remove(kodePaket) {
  const query = `DELETE FROM paket_kredit WHERE kode_paket = '${kodePaket}'`;

  const result = dbPool.execute(query);
  return result;
}

module.exports = {
  get,
  search,
  find,
  create,
  update,
  remove
}