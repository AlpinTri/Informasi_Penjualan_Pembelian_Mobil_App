const dbPool = require('../config/db_config');

function get() {
  const query = `SELECT * FROM customer`;

  const result = dbPool.execute(query);
  return result;
}

function find(nik) {
  const query = `SELECT * FROM customer WHERE nik = '${nik}'`;

  const result = dbPool.execute(query);
  return result;
}

function create({nik, nama, jenisKelamin, telp, alamat, foto, createdAt, updatedAt}) {
  const query = `INSERT INTO customer (nik, nama, jenis_kelamin, no_telp, alamat, foto, created_at, updated_at)
                VALUES ('${nik}','${nama}','${jenisKelamin}','${telp}','${alamat}','${foto}','${createdAt}','${updatedAt}')`;

  const result = dbPool.execute(query);
  return result;
}

function update({nik, nama, jenisKelamin, telp, alamat, foto, updatedAt}) {
  const query = `UPDATE customer SET nama = '${nama}', jenis_kelamin = '${jenisKelamin}', no_telp = '${telp}', alamat = '${alamat}', foto = '${foto}', updated_at = '${updatedAt}'
                WHERE nik = '${nik}'`;
  
  const result = dbPool.execute(query);
  return result;
}

function remove(nik) {
  const query = `DELETE FROM customer WHERE nik = '${nik}'`;

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