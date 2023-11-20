const dbPool = require('../config/db_config');

function get() {
  const query = `SELECT * FROM beli_cash`;

  const result = dbPool.execute(query);
  return result;
}

function find(kodeCash) {
  const query = `SELECT * FROM beli_cash WHERE kode_cash = '${kodeCash}'`;

  const result = dbPool.execute(query);
  return result;
}

function create({ kodeCash, nik, kodeMobil, fcKtp, cashBayar, tanggal, createdAt, updatedAt }) {
  const query = `INSERT INTO beli_cash (kode_cash, nik, kode_mobil, fotocopy_ktp, cash_bayar, tanggal, created_at, updated_at)
                VALUES ('${kodeCash}','${nik}','${kodeMobil}','${fcKtp}','${cashBayar}','${tanggal}','${createdAt}','${updatedAt}')`;

  const result = dbPool.execute(query);
  return result;
}

function update({ kodeCash, nik, kodeMobil, fcKtp, cashBayar, updatedAt }) {
  const query = `UPDATE beli_cash SET nik='${nik}',kode_mobil='${kodeMobil}',fotocopy_ktp='${fcKtp}',cash_bayar='${cashBayar}',updated_at='${updatedAt}'
                WHERE kode_cash = '${kodeCash}'`;

  const result = dbPool.execute(query);
  return result;
}

function remove(kodeCash) {
  const query = `DELETE FROM beli_cash WHERE kode_cash = '${kodeCash}'`;

  const result = dbPool.execute(query);
  return result;
}

module.exports = {
  get,
  find,
  create,
  update,
  remove
}