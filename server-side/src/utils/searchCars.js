function searchCar({ type, warna, transmisi, seat, kapasitas }) {

  // if (q || warna || transmisi || seat || kapasitas) {
  //   let query;

  //   if (q) {

  //     if (warna) {

  //       if (transmisi) {

  //         if (seat) {

  //           if (kapasitas) {
             
  //             const rangeKapasitas = kapasitas.split('-');
  //             const rangeSeat = seat.split('-');
  //             query = `SELECT * FROM mobil WHERE merk LIKE '%${q}%' OR type LIKE '%${q}%' AND warna = '${warna}' AND jenis_transmisi = '${transmisi}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //             return query; 

  //           } else {

  //             const rangeSeat = seat.split('-');
  //             query = `SELECT * FROM mobil WHERE merk LIKE '%${q}%' OR type LIKE '%${q}%' AND warna = '${warna}' AND jenis_transmisi = '${transmisi}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`;
  //             return query; 

  //           }

  //         } else if (kapasitas) {
            
  //           const rangeKapasitas = kapasitas.split('-');
  //           query = `SELECT * FROM mobil WHERE merk LIKE '%${q}%' OR type LIKE '%${q}%' AND warna = '${warna}' AND jenis_transmisi = '${transmisi}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //           return query;            

  //         } else {
            
  //           query = `SELECT * FROM mobil WHERE merk LIKE '%${q}%' OR type LIKE '%${q}%' AND warna = '${warna}' AND jenis_transmisi = '${transmisi}'`;
  //           return query;

  //         }

  //       } else if (seat) {
          
  //         if (kapasitas) {
            
  //           const rangeSeat = seat.split('-');
  //           const rangeKapasitas = kapasitas.split('-');
  //           query = `SELECT * FROM mobil WHERE merk LIKE '%${q}%' OR type LIKE '%${q}%' AND warna = '${warna}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //           return query;

  //         } else {
            
  //           const rangeSeat = seat.split('-');
  //           query = `SELECT * FROM mobil WHERE merk LIKE '%${q}%' OR type LIKE '%${q}%' AND warna = '${warna}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`;
  //           return query;
  //         }

  //       } else if (kapasitas) {

  //         const rangeKapasitas = kapasitas.split('-');
  //         query = `SELECT * FROM mobil WHERE merk LIKE '%${q}%' OR type LIKE '%${q}%' AND warna = '${warna}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //         return query;

  //       } else {
          
  //         query = `SELECT * FROM mobil WHERE merk LIKE '%${q}%' OR type LIKE '%${q}%' AND warna = '${warna}'`;
  //         return query;

  //       }
          
  //     } else if (transmisi) {
        
  //       if (seat) {
          
  //         if (kapasitas) {

  //           const rangeKapasitas = kapasitas.split('-');
  //           const rangeSeat = seat.split('-');
  //           query = `SELECT * FROM mobil WHERE type LIKE '%${q}%' OR merk LIKE '%${q}%' AND jenis_transmisi = '${transmisi}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //           return query;

  //         } else {
            
  //           const rangeSeat = seat.split('-');
  //           query = `SELECT * FROM mobil WHERE type LIKE '%${q}%' OR merk LIKE '%${q}%' AND jenis_transmisi = '${transmisi}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`;
  //           return query;

  //         }

  //       } else if (kapasitas) {
          
  //         const rangeKapasitas = kapasitas.split('-');
  //         query = `SELECT * FROM mobil WHERE type LIKE '%${q}%' OR merk LIKE '%${q}%' AND jenis_transmisi = '${transmisi}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //         return query;

  //       } else {
          
  //         query = `SELECT * FROM mobil WHERE type LIKE '%${q}%' OR merk LIKE '%${q}%' AND jenis_transmisi = '${transmisi}'`;
  //         return query;

  //       }

  //     } else if (seat) {

  //       if (kapasitas) {
          
  //         const rangeSeat = seat.split('-');
  //         const rangeKapasitas = kapasitas.split('-');
  //         query = `SELECT * FROM mobil WHERE type LIKE '%${q}%' OR merk LIKE '%${q}%' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //         return query;

  //       } else {
          
  //         const rangeSeat = seat.split('-');
  //         query = `SELECT * FROM mobil WHERE type LIKE '%${q}%' OR merk LIKE '%${q}%' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`;
  //         return query;

  //       }
        
  //     } else if (kapasitas) {
        
  //       const rangeKapasitas = kapasitas.split('-');
  //       query = `SELECT * FROM mobil WHERE type LIKE '%${q}%' OR merk LIKE '%${q}%' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //       return query;

  //     } else {

  //       query = `SELECT * FROM mobil WHERE type LIKE '%${q}%' OR merk LIKE '%${q}%'`;
  //       return query;

  //     }

  //   } else if (warna) {
      
  //     if (transmisi) {
        
  //       if (seat) {

  //         if (kapasitas) {

  //           const rangeSeat = seat.split('-');
  //           const rangeKapasitas = kapasitas.split('-');
  //           query = `SELECT * FROM mobil WHERE warna = '${warna}' AND jenis_transmisi = '${transmisi}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}' kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //           return query;

  //         } else {
            
  //           const rangeSeat = seat.split('-');
  //           query = `SELECT * FROM mobil WHERE warna = '${warna}' AND jenis_transmisi = '${transmisi}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}' kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //           return query;

  //         }

  //       } else if (kapasitas) {
          
  //         const rangeKapasitas = kapasitas.split('-')
  //         query = `SELECT * FROM mobil WHERE warna = '${warna}' AND jenis_transmisi = '${transmisi}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //         return query;

  //       } else {
          
  //         query = `SELECT * FROM mobil WHERE warna = '${warna}' AND jenis_transmisi = '${transmisi}'`;
  //         return query;

  //       }

  //     } else if (seat) {
        
  //       if (kapasitas) {
          
  //         const rangeKapasitas = kapasitas.split('-');
  //         const rangeSeat = seat.split('-');
  //         query = `SELECT * FROM mobil WHERE warna = '${warna}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`;
  //         return query;

  //       } else {

  //         const rangeSeat = seat.split('-');
  //         query = `SELECT * FROM mobil WHERE warna = '${warna}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`;
  //         return query;  

  //       }

  //     } else if (kapasitas) {
        
  //       const rangeKapasitas = kapasitas.split('-');
  //       query = `SELECT * FROM mobil WHERE warna = '${warna}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //       return query;

  //     } else {
        
  //       query = `SELECT * FROM mobil WHERE warna = '${warna}'`;
  //       return query;

  //     }

  //   } else if (transmisi) {
      
  //     if (seat) {
        
  //       if (kapasitas) {
          
  //         const rangeSeat = seat.split('-');
  //         const rangeKapasitas = kapasitas.split('-')
  //         query = `SELECT * FROM mobil WHERE jenis_transmisi = '${transmisi}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //         return query;

  //       } else {
          
  //         const rangeSeat = seat.split('-');
  //         query = `SELECT * FROM mobil WHERE jenis_transmisi = '${transmisi}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`;
  //         return query;

  //       }

  //     } else if(kapasitas) {

  //       const rangeKapasitas = kapasitas.split('-')
  //       query = `SELECT * FROM mobil WHERE jenis_transmisi = '${transmisi}' AND kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
  //       return query;

  //     } else {
        
  //       query = `SELECT * FROM mobil WHERE jenis_transmisi = '${transmisi}'`;
  //       return query;

  //     }

  //   } else if (seat) {

  //     if (kapasitas) {

  //       const rangeKapasitas = kapasitas.split('-');
  //       const rangeSeat = seat.split('-');
  //       query = `SELECT * FROM mobil WHERE kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}' AND jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`
  //       return query;

  //     } else {

  //       const rangeSeat = seat.split('-');
  //       query = `SELECT * FROM mobil WHERE jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`
  //       return query;

  //     }

  //   } else if (kapasitas) {
      
  //     const range = kapasitas.split('-')
  //     query = `SELECT * FROM mobil WHERE kapasitas_mesin BETWEEN '${range[0]}' AND '${range[1]}'`;
  //     return query;

  //   }
    
  // } else {

  //   return `SELECT * FROM mobil`;
  // }
  
  let query = `SELECT * FROM mobil`;

  if (type || warna || transmisi || seat || kapasitas) {

    if (warna) {
      console.log(warna)
      if (warna != 'Putih' && warna != 'Hitam') {
        query += ` WHERE warna NOT IN ('Hitam', 'Putih')`;
      } else {
        query += ` WHERE warna = '${warna}'`;
      }

    }

    if (transmisi) {
      query += `${warna ? ' AND' : ' WHERE'} jenis_transmisi = '${transmisi}'`;
    }

    if (seat) {
      const rangeSeat = seat.split('-');
      query += `${warna || transmisi ? ' AND' : ' WHERE'} jumlah_seat BETWEEN '${rangeSeat[0]}' AND '${rangeSeat[1]}'`;
    }

    if (kapasitas) {
      const rangeKapasitas = kapasitas.split('-');
      query += `${warna || transmisi || seat ? ' AND' : ' WHERE'} kapasitas_mesin BETWEEN '${rangeKapasitas[0]}' AND '${rangeKapasitas[1]}'`;
    }

    if (type) {
      query += `${warna || transmisi || seat || kapasitas ? ' AND' : ' WHERE'} type = '${type}'`;
    }
  }

  return query;

}

module.exports = searchCar;