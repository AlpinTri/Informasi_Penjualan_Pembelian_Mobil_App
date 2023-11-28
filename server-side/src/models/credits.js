const dbPool = require('../config/db_config');

function get() {
  const query = `SELECT * FROM kredit`;

  const result = dbPool.execute(query);
  return result;
}

function getLiteTransactions() {
  const query = `SELECT kredit.kode_kredit, kredit.tanggal, kredit.kode_paket_kredit, customer.nama, customer.no_telp, mobil.type 
                FROM kredit INNER JOIN customer ON kredit.nik = customer.nik 
                INNER JOIN mobil ON kredit.kode_mobil = mobil.kode_mobil`;
  
  const result = dbPool.execute(query);
  return result;
}

function getCompliteTransaction(kodeKredit) {
  const query = `SELECT kredit.kode_kredit, kredit.fotocopy_ktp, kredit.fotocopy_kk, kredit.foto_slip_gaji, kredit.tanggal, customer.nik, customer.nama, customer.jenis_kelamin, customer.no_telp, customer.alamat, mobil.kode_mobil, mobil.type, mobil.gambar, mobil.harga, mobil.warna, mobil.merk, paket_kredit.kode_paket, paket_kredit.uang_muka, paket_kredit.bunga, paket_kredit.tenor 
                FROM kredit INNER JOIN customer ON kredit.nik = customer.nik 
                INNER JOIN mobil ON kredit.kode_mobil = mobil.kode_mobil
                INNER JOIN paket_kredit ON kredit.kode_paket_kredit = paket_kredit.kode_paket
                WHERE kode_kredit = '${kodeKredit}'`;
  
  const result = dbPool.execute(query);
  return result;
}

function search(q) {
  const query = `SELECT kredit.kode_kredit, kredit.tanggal, customer.nik, customer.nama, customer.jenis_kelamin, customer.no_telp, customer.alamat, mobil.kode_mobil, mobil.type, mobil.harga, mobil.warna, mobil.merk, mobil.bahan_bakar, mobil.kapasitas_mesin, mobil.jenis_transmisi, paket_kredit.kode_paket, paket_kredit.uang_muka, paket_kredit.bunga, paket_kredit.tenor 
                FROM kredit INNER JOIN customer ON kredit.nik = customer.nik 
                INNER JOIN mobil ON kredit.kode_mobil = mobil.kode_mobil
                INNER JOIN paket_kredit ON kredit.kode_paket_kredit = paket_kredit.kode_paket
                WHERE kredit.kode_kredit LIKE '%${q}%' 
                OR kredit.tanggal LIKE '%${q}%' 
                OR customer.nik LIKE '%${q}%' 
                OR customer.nama LIKE '%${q}%' 
                OR customer.jenis_kelamin LIKE '%${q}%' 
                OR customer.no_telp LIKE '%${q}%' 
                OR customer.alamat LIKE '%${q}%' 
                OR mobil.kode_mobil LIKE '%${q}%' 
                OR mobil.type LIKE '%${q}%' 
                OR mobil.harga LIKE '%${q}%' 
                OR mobil.warna LIKE '%${q}%' 
                OR mobil.merk LIKE '%${q}%' 
                OR mobil.bahan_bakar LIKE '%${q}%' 
                OR mobil.kapasitas_mesin LIKE '%${q}%' 
                OR mobil.jenis_transmisi LIKE '%${q}%' 
                OR paket_kredit.kode_paket LIKE '%${q}%' 
                OR paket_kredit.uang_muka LIKE '%${q}%' 
                OR paket_kredit.bunga LIKE '%${q}%' 
                OR paket_kredit.tenor LIKE '%${q}%';`;

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
  getLiteTransactions,
  getCompliteTransaction,
  search,
  find,
  create,
  update,
  remove
}