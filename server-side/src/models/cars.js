const dbPool = require('../config/db_config');

function get() {
  const query = 'SELECT * FROM mobil';

  const data = dbPool.execute(query);

  return data;
}

function find(kodeMobil) {
  const query = `SELECT * FROM mobil WHERE kode_mobil = '${kodeMobil}'`;

  const data = dbPool.execute(query);

  return data;
}

function create({kodeMobil, merk, type, warna, bahanBakar, jenisTransmisi, harga, gambar, createdAt, updatedAt}) {
  const query = `INSERT INTO mobil(kode_mobil, merk, type, warna, bahan_bakar, jenis_transmisi, harga, gambar, created_at, updated_at)
                VALUES ('${kodeMobil}','${merk}','${type}','${warna}','${bahanBakar}','${jenisTransmisi}','${harga}','${gambar}','${createdAt}','${updatedAt}')`;

  const result = dbPool.execute(query);

  return result;
}

function update({kodeMobil, merk, type, warna, bahanBakar, jenisTransmisi, harga, gambar, updatedAt}) {
  const query = `UPDATE mobil SET merk = '${merk}', type = '${type}', warna = '${warna}', bahan_bakar = '${bahanBakar}', jenis_transmisi = '${jenisTransmisi}', harga = '${harga}', gambar = '${gambar}', updated_at = '${updatedAt}'
                WHERE kode_mobil = '${kodeMobil}'`;

  const result = dbPool.execute(query);

  return result;
}

function remove(kodeMobil) {
  const query = `DELETE FROM mobil WHERE kode_mobil = '${kodeMobil}'`;

  const result = dbPool.execute(query);

  return result;
}


module.exports = {
  get,
  find,
  create,
  remove,
  update
}
