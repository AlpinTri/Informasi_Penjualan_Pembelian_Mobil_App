function countTransactions(data) {
  const filterData = [...data];
  for (let i = 0; i < 12; i++) {

    const existingData = filterData.find(item => item.bulan === i + 1);

    if (!existingData) {
      filterData.push({ jumlah_pembelian: 0, bulan: i + 1 });
    }
  }

  filterData.sort((a, b) => a.bulan - b.bulan);
  const arrayData = [];
  filterData.forEach(item => arrayData.push(item.jumlah_pembelian))
  return arrayData;
}

module.exports = {
  countTransactions
}