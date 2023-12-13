const { countTransactionsByYear, countAllMaster } = require("../../models/private/countData");
const { countTransactions } = require("../../utils/countTransactions");

async function countAllTransactions(req, res) {
  try {
    const { year } = req.query;

    if (!year) throw new Error('MISSING_QUERY_PARAMS_ERROR');

    const data = await countTransactionsByYear(year);
    if (!data) throw new Error('connect ECONNREFUSED');
    const countKredit = await countTransactions(data.kredit);
    if (!countKredit) throw new Error('connect ECONNREFUSED');
    const countCash = await countTransactions(data.cash);
    if (!countCash) throw new Error('connect ECONNREFUSED');

    res.status(200).json({
      status: 200,
      message: 'OK',
      data: {
        cash: countCash,
        kredit: countKredit
      }
    });

  } catch (err) {
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });
    } else if (err.message === "MISSING_QUERY_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_QUERY_PARAMS 'year'"
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }

    console.log(err.message, 'Counts Route 1');
  }
}

async function countMaster(req, res) {
  try {
    const data = await countAllMaster();

    if (!data) throw new Error('connect ENCONNREFUSED');

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
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
      
    }

    console.log(err.message, 'Counts Route 2');
  }
}
module.exports = {
  countAllTransactions,
  countMaster
}