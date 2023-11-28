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

function search(q) {
  const query = `SELECT * FROM mobil 
                WHERE kode_mobil LIKE '%${q}%' 
                OR merk LIKE '%${q}%' 
                OR type LIKE '%${q}%' 
                OR warna LIKE '%${q}%' 
                OR bahan_bakar LIKE '%${q}%' 
                OR kapasitas_mesin LIKE '%${q}%' 
                OR jenis_transmisi LIKE '%${q}%' 
                OR harga LIKE '%${q}%'`;

  const data = dbPool.execute(query);
  return data;
}

function create({kodeMobil, merk, type, warna, bahanBakar, kapasitasMesin, jenisTransmisi, harga, gambar, createdAt, updatedAt}) {
  const query = `INSERT INTO mobil(kode_mobil, merk, type, warna, bahan_bakar, kapasitas_mesin, jenis_transmisi, harga, gambar, created_at, updated_at)
                VALUES ('${kodeMobil}','${merk}','${type}','${warna}','${bahanBakar}','${kapasitasMesin}','${jenisTransmisi}','${harga}','${gambar}','${createdAt}','${updatedAt}')`;

  const result = dbPool.execute(query);

  return result;
}

function update({ kodeMobil, merk, type, warna, bahanBakar, kapasitasMesin, jenisTransmisi, harga, gambar, updatedAt }) {
  let query;
  if (!gambar) {
    query = `UPDATE mobil SET merk = '${merk}', type = '${type}', warna = '${warna}', bahan_bakar = '${bahanBakar}', kapasitas_mesin = '${kapasitasMesin}', jenis_transmisi = '${jenisTransmisi}', harga = '${harga}', updated_at = '${updatedAt}'
            WHERE kode_mobil = '${kodeMobil}'`;
  } else {
    query = `UPDATE mobil SET merk = '${merk}', type = '${type}', warna = '${warna}', bahan_bakar = '${bahanBakar}', kapasitas_mesin = '${kapasitasMesin}', jenis_transmisi = '${jenisTransmisi}', harga = '${harga}', gambar = '${gambar}', updated_at = '${updatedAt}'
            WHERE kode_mobil = '${kodeMobil}'`;
  }

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
  search,
  create,
  remove,
  update
}
