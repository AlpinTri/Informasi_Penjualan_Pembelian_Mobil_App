const dbPool = require('../../config/db_config');

async function countTransactionsByYear(year) {
  try {
    const kreditQuery = `SELECT COUNT(*) AS jumlah_pembelian, MONTH(tanggal) AS bulan FROM kredit WHERE YEAR(tanggal) = ? GROUP BY bulan`;
    const cashQuery = `SELECT COUNT(*) AS jumlah_pembelian, MONTH(tanggal) AS bulan FROM beli_cash WHERE YEAR(tanggal) = ? GROUP BY bulan`;

    const [kreditResult] = await dbPool.execute(kreditQuery, [year]);
    const [cashResult] = await dbPool.execute(cashQuery, [year]);
    return {
      kredit: kreditResult,
      cash: cashResult
    }
  } catch (err) {
    console.log(err, 'Count Data Model')
  }

}

async function countAllMaster() {
  try {
    const customerQuery = 'SELECT COUNT(*) AS jumlah FROM customer';
    const mobilQuery = 'SELECT COUNT(*) AS jumlah FROM mobil';
    const kreditQuery = 'SELECT COUNT(*) AS jumlah FROM kredit';
    const cashQuery = 'SELECT COUNT(*) AS jumlah FROM beli_cash';

    const [customerResult] = await dbPool.execute(customerQuery);
    const [mobilResult] = await dbPool.execute(mobilQuery);
    const [kreditResult] = await dbPool.execute(kreditQuery);
    const [cashResult] = await dbPool.execute(cashQuery);

    return {
      customer: customerResult,
      mobil: mobilResult,
      kredit: kreditResult,
      cash: cashResult
    }
  } catch (err) {
    console.log(err, 'Count Data Model')
  }
}

module.exports = {
  countTransactionsByYear,
  countAllMaster
}