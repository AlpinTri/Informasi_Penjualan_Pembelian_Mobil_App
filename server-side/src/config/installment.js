const dbPool = require('./db_config');

function calculateInstallment(kodeKredit) {
  return new Promise(async (resolve, reject) => {
    try {
      // Get Total Kredit / Jumlah Kredit
      // const query = `SELECT pembayaran_cicilan.kode_kredit `
      const [kredit] = await dbPool.execute(`SELECT * FROM kredit WHERE kode_kredit = '${kodeKredit}'`);
      
      const [paket] = await dbPool.execute(`SELECT * FROM paket_kredit WHERE kode_paket = '${kredit[0].kode_paket_kredit}'`);

      const [car] = await dbPool.execute(`SELECT * FROM mobil WHERE kode_mobil = '${kredit[0].kode_mobil}'`);

      // Menghitung Harga Pokok setelah dikurangan uang muka
      const hargaPokok = car[0].harga - (paket[0].uang_muka / 100 * car[0].harga);

      // Mencari bunga dengan mengalikan harga pokok dengan bunga per tahun yang ada di table paket, kemudian membaginya dalam satu tahun (untuk mencari total bunga per bulannya) 
      // Dan mengalikan bunga per bulan dengan jumlah tenor yang diambil customer dalam table paket
      const bunga = (hargaPokok * paket[0].bunga / 100) / 12 * paket[0].tenor;

      // Kemudian menambahkan kredit pokok dengan total bunga
      const totalKredit = hargaPokok + bunga;

      // Get Ciciclan Per Bulan
      const cicilanPerBulan = totalKredit / paket[0].tenor;

      // Get Sisa Angsuran dan Jumlah sisa Angsuran
      const [maxKredit] = await dbPool.execute(`SELECT * FROM pembayaran_cicilan WHERE kode_kredit = '${kodeKredit}' ORDER BY sisa_cicilan LIMIT 1`);

      if (!maxKredit.length) {
        // Jika belum ada angsuran masuk maka akan men set 1
        resolve({
          cicilanKe: 1,
          sisaCicilan: paket[0].tenor - 1,
          jumlahCicilan: cicilanPerBulan,
          totalSisa: totalKredit - cicilanPerBulan,
        });
        return;
      }

      if (!maxKredit[0].sisa_cicilan) {
        reject(new Error('Cicilan sudah lunas'));
        return;
      }
      
      const sisaKredit = maxKredit[0].total_sisa - cicilanPerBulan;
      
      resolve({
        cicilanKe: maxKredit[0].cicilan_ke + 1,
        sisaCicilan: maxKredit[0].sisa_cicilan - 1,
        jumlahCicilan: cicilanPerBulan,
        totalSisa: sisaKredit
      });

    } catch (err) {
      reject(err);
    }
  })
}

module.exports = { calculateInstallment };
