const dbPool = require('../../config/db_config');

function get() {
  const query = 'SELECT * FROM user';

  const data = dbPool.query(query);

  return data;
}

function find(kodeUser) {
  const query = `SELECT * FROM user WHERE kode_user = '${kodeUser}'`;

  const data = dbPool.query(query);

  return data;
}

function search(q) {
  const query = `SELECT * FROM user 
                WHERE kode_user LIKE '%${q}%' 
                OR nama LIKE '%${q}%' 
                OR jenis_kelamin LIKE '%${q}%' 
                OR no_telp LIKE '%${q}%'`;
  
  const result = dbPool.execute(query);
  return result;
}

function create({kodeUser, nama, jenisKelamin, telp, password, status, createdAt, updatedAt}) {
  const query = `INSERT INTO user (kode_user, nama, jenis_kelamin, no_telp, password, status, created_at, updated_at)
                VALUES ('${kodeUser}','${nama}','${jenisKelamin}','${telp}','${password}','${status}','${createdAt}','${updatedAt}')`;

  const result = dbPool.execute(query);
  return result;
}

function update({ kodeUser, nama, jenisKelamin, telp, password, status, updatedAt }) {
  let query;
  if (password) {
    query = `UPDATE user SET nama = '${nama}', jenis_kelamin = '${jenisKelamin}', no_telp = '${telp}', password = '${password}', status = '${status}', updated_at = '${updatedAt}'
            WHERE kode_user = '${kodeUser}'`;
  } else {
    query = `UPDATE user SET nama = '${nama}', jenis_kelamin = '${jenisKelamin}', no_telp = '${telp}', status = '${status}', updated_at = '${updatedAt}'
            WHERE kode_user = '${kodeUser}'`;
  }

  const result = dbPool.execute(query);
  return result;
}

function remove(kodeUser) {
  const query = `DELETE FROM user WHERE kode_user = '${kodeUser}'`;

  const result = dbPool.execute(query);
  return result;
}


module.exports = {
  get,
  search,
  find,
  create,
  remove,
  update
}
