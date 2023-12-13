const { getAll } = require("../../models/public/creditPackages");

async function getCreditPackages(req, res) {
  try {
    const [creditPackages] = await getAll();

    res.status(200).json({
      status: 'OK',
      data: creditPackages
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
    console.log(err)
  }
}

module.exports = {
  getCreditPackages
}