const dbPool = require('../config/db_config');

function get() {
  const query = `SELECT * FROM kredit`;

  const result = dbPool.execute(query);
  return result;
}

function find(kodeKredit) {
  const query = `SELECT * FROM kredit WHERE kode_kredit = '${kodeKredit}'`;

  const result = dbPool.execute(query);
  return result;
}

function create({ kodeKredit, kodePaket, nik, kodeMobil, fcKtp, fcKk, fcGaji, tanggal, createdAt, updatedAt }) {
  const query = `INSERT INTO kredit(kode_kredit, kode_paket_kredit, nik, kode_mobil, fotocopy_ktp, fotocopy_kk, foto_slip_gaji, tanggal, created_at, updated_at)
                VALUES ('${kodeKredit}','${kodePaket}','${nik}','${kodeMobil}','${fcKtp}','${fcKk}','${fcGaji}','${tanggal}','${createdAt}','${updatedAt}')`;
  
  const result = dbPool.execute(query);
  return result;
}

function update({ kodeKredit, kodePaket, nik, kodeMobil, fcKtp, fcKk, fcGaji, updatedAt }) {
  const query = `UPDATE kredit SET kode_paket_kredit = '${kodePaket}', nik = '${nik}', kode_mobil = '${kodeMobil}', fotocopy_ktp = '${fcKtp}', fotocopy_kk = '${fcKk}', foto_slip_gaji = '${fcGaji}', updated_at = '${updatedAt}'
                WHERE kode_kredit = '${kodeKredit}'`;
  
  const result = dbPool.execute(query);
  return result;
}

function remove(kodeKredit) {
  const query = `DELETE FROM kredit WHERE kode_kredit = '${kodeKredit}'`;

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