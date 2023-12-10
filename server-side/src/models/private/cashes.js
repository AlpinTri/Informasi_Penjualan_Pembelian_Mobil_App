const dbPool = require('../../config/db_config');

function get() {
  const query = `SELECT * FROM beli_cash`;

  const result = dbPool.execute(query);
  return result;
}

function getLiteTransactions() {
  const query = `SELECT beli_cash.kode_cash, beli_cash.tanggal, customer.nama, customer.no_telp, mobil.type, beli_cash.cash_bayar 
                FROM beli_cash INNER JOIN customer ON beli_cash.nik = customer.nik 
                INNER JOIN mobil ON beli_cash.kode_mobil = mobil.kode_mobil`;
  
  const result = dbPool.execute(query);
  return result;
}

function getCompliteTransaction(kodeCash) {
  const query = `SELECT beli_cash.kode_cash, beli_cash.fotocopy_ktp, beli_cash.cash_bayar, beli_cash.tanggal, customer.nik, customer.nama, customer.jenis_kelamin, customer.no_telp, customer.alamat, mobil.kode_mobil, mobil.type, mobil.gambar, mobil.harga, mobil.warna, mobil.merk
                FROM beli_cash INNER JOIN customer ON beli_cash.nik = customer.nik
                INNER JOIN mobil ON beli_cash.kode_mobil = mobil.kode_mobil WHERE kode_cash = '${kodeCash}'`;
  
  const result = dbPool.execute(query);
  return result;
}

function search(q) {
  const query = `SELECT beli_cash.kode_cash, beli_cash.cash_bayar, beli_cash.tanggal, customer.nik, customer.nama, customer.jenis_kelamin, customer.no_telp, customer.alamat, mobil.kode_mobil, mobil.type, mobil.harga, mobil.warna, mobil.merk, mobil.bahan_bakar, mobil.kapasitas_mesin, mobil.jenis_transmisi 
                FROM beli_cash INNER JOIN customer ON beli_cash.nik = customer.nik
                INNER JOIN mobil ON beli_cash.kode_mobil = mobil.kode_mobil
                WHERE kode_cash LIKE '%${q}%' 
                OR beli_cash.cash_bayar LIKE '%${q}%' 
                OR beli_cash.tanggal LIKE '%${q}%' 
                OR customer.nik LIKE '%${q}%' 
                OR customer.nama LIKE '%${q}%' 
                OR customer.jenis_kelamin LIKE '%${q}%' 
                OR customer.no_telp LIKE '%${q}%' 
                OR customer.alamat LIKE '%${q}%' 
                OR mobil.kode_mobil LIKE '%${q}%' 
                OR mobil.type LIKE '%${q}%' 
                OR mobil.harga LIKE '%${q}%' 
                OR mobil.merk LIKE '%${q}%' 
                OR mobil.warna LIKE '%${q}%' 
                OR mobil.bahan_bakar LIKE '%${q}%' 
                OR mobil.kapasitas_mesin LIKE '%${q}%' 
                OR mobil.jenis_transmisi LIKE '%${q}%'`;
  
  const result = dbPool.execute(query);
  return result;
}

function find(kodeCash) {
  const query = `SELECT * FROM beli_cash WHERE kode_cash = '${kodeCash}'`;

  const result = dbPool.execute(query);
  return result;
}

function findByDate(to, from) {
  const query = `SELECT kode_cash, nik, kode_mobil, cash_bayar, tanggal FROM beli_cash WHERE tanggal BETWEEN '${from}' AND '${to}'`;

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
  getLiteTransactions,
  getCompliteTransaction,
  search,
  find,
  findByDate,
  create,
  update,
  remove
}