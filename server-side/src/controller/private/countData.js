const { countTransactionsByYear, countAllMaster } = require("../../models/private/countData");
const { countTransactions } = require("../../utils/countTransactions");

async function countAllTransactions(req, res) {
  try {
    const { year } = req.query;
    console.log(req.query)

    if (!year) throw new Error('Year is Null');

    const data = await countTransactionsByYear(year);

    const countKredit = countTransactions(data.kredit);
    const countCash = countTransactions(data.cash);
    res.status(200).json({
      code: 200,
      data: {
        cash: countCash,
        kredit: countKredit
      }
    });

  } catch (err) {
    console.log(err)
  }
}

async function countMaster(req, res) {
  try {
    const data = await countAllMaster();
    res.status(200).json({
      code: 200,
      data: {
        customer: data.customer,
        mobil: data.mobil,
        cash: data.cash,
        kredit: data.kredit
      }
    });
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  countAllTransactions,
  countMaster
}