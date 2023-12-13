function searchCar({ type, warna, transmisi, seat, kapasitas }) {
  
  let query = `SELECT * FROM mobil WHERE status_penjualan = ${true}`;

  if (type || warna || transmisi || seat || kapasitas) {

    if (warna) {

      if (warna != 'Putih' && warna != 'Hitam') {
        query += ` AND warna NOT IN ('Hitam', 'Putih')`;
      } else {
        query += ` AND warna = '${warna}'`;
      }

    }

    if (transmisi) {
      query += ` AND jenis_transmisi = '${transmisi}'`;
    }

    if (seat) {
      const rangeSeat = seat.split('-');
      query += ` AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`;
    }

    if (kapasitas) {
      const rangeKapasitas = kapasitas.split('-');
      query += ` AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
    }

    if (type) {
      query += ` AND type LIKE '%${type}%'`;
    }
  }

  return query;

}

module.exports = searchCar;