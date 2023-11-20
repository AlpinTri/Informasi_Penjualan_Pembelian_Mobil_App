const { calculateInstallment } = require('../config/installment');
const { get, find, create, update, remove } = require('../models/installmentPayments');

async function getInstallmentPayments(req, res) {
  try {
    const [data] = await get();

    res.status(200).json({
      status: 200,
      message: 'Ok',
      data: data
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

    console.log(err.message)
  }
}

async function findInstallmentPayment(req, res) {
  try {
    const { kodeCicilan } = req.params;

    const [data] = await find(kodeCicilan);

    res.status(200).json({
      status: 200,
      message: 'Ok',
      data: data
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

    console.log(err.message)
  }
}

async function createInstallmentPayment(req, res) {
  try {
    const payload = req.body;

    // Add Timestamps
    const date = new Date();
    payload.createdAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');
    payload.updatedAt = payload.createdAt;
    payload.tanggal = date.toLocaleString('id-ID').substring(0, 10).replaceAll('/', '-');

    // Kode Pembayaran Cicilan
    payload.kodeCicilan = 'CC-' + date.getTime();

    // Sisa Cicilan dan Jumlah Sisa
    const { jumlahCicilan, cicilanKe, sisaCicilan, totalSisa } = await calculateInstallment(payload.kodeKredit);

    payload.jumlahCicilan = jumlahCicilan;
    payload.cicilanKe = cicilanKe;
    payload.sisaCicilan = sisaCicilan;
    payload.totalSisa = totalSisa;

    const [result] = await create(payload);

    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to Inserted'
      });
      return;
    }

    res.status(201).json({
      status: 201,
      message: 'Ok',
      data: payload
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

    console.log(err.message);
  }
}

async function updateInstallmentPayment(req, res) {
  
}

async function deleteInstallmentPayment(req, res) {
  try {
    const { kodeCicilan } = req.params;

    const [cicilan] = await find(kodeCicilan);

    if (!cicilan.length) {
      res.status(401).json({
        status: 401,
        message: 'Data not found'
      })
      return;
    }

    const [result] = await remove(kodeCicilan);

    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to delete'
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Ok'
    })

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message
    })
  }
}

module.exports = {
  getInstallmentPayments,
  findInstallmentPayment,
  createInstallmentPayment,
  updateInstallmentPayment,
  deleteInstallmentPayment
}