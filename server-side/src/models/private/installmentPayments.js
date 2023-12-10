const dbPool = require('../../config/db_config');

function get() {
  const query = `SELECT * FROM pembayaran_cicilan`;

  const result = dbPool.execute(query);
  return result;
}

function find(kodeCicilan) {
  const query = `SELECT * FROM pembayaran_cicilan WHERE kode_cicilan = '${kodeCicilan}'`;

  const result = dbPool.execute(query);
  return result;
}

function getByKodeKredit(kodeKredit, type) {
  let query;
  if (type == 1) {
    query = `SELECT * FROM pembayaran_cicilan WHERE kode_kredit = '${kodeKredit}' ORDER BY cicilan_ke ASC`;
  } else {
    query = `SELECT * FROM pembayaran_cicilan WHERE kode_kredit = '${kodeKredit}' ORDER BY cicilan_ke DESC`;
  }

  const result = dbPool.execute(query);
  return result;
}

function create({ kodeCicilan, kodeKredit, jumlahCicilan, cicilanKe, sisaCicilan, totalSisa, tanggal, createdAt, updatedAt }) {
  const query = `INSERT INTO pembayaran_cicilan(kode_cicilan, kode_kredit, jumlah_cicilan, cicilan_ke, sisa_cicilan, total_sisa, tanggal, created_at, updated_at)
                VALUES ('${kodeCicilan}','${kodeKredit}','${jumlahCicilan}','${cicilanKe}','${sisaCicilan}','${totalSisa}','${tanggal}','${createdAt}','${updatedAt}')`;

  const result = dbPool.execute(query);
  return result
}

function update({ kodeCicilan, kodeKredit, jumlah, cicilan_ke, sisa_cicilan, jumlah_sisa, updatedAt }) {
  const query = `UPDATE pembayaran_cicilan SET kode_kredit='${kodeKredit}',jumlah='${jumlah}',cicilan_ke='${cicilan_ke}',sisa_cicilan='${sisa_cicilan}',jumlah_sisa='${jumlah_sisa}',updated_at='${updatedAt}'
                WHERE kode_cicilan = '${kodeCicilan}'`;
  
  const result = dbPool.execute(query);
  return result;
}

function remove(kodeCicilan) {
  const query = `DELETE FROM pembayaran_cicilan WHERE kode_cicilan = '${kodeCicilan}'`;

  const result = dbPool.execute(query);
  return result;
}

module.exports = {
  get,
  find,
  getByKodeKredit,
  create,
  update,
  remove
}