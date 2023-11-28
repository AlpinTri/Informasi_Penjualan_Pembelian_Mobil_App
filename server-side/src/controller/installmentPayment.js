const { calculateInstallment } = require('../config/installment');
const { get, find, create, update, remove, getByKodeKredit } = require('../models/installmentPayments');

async function getInstallmentPayments(req, res) {
  try {

    const { kode_kredit, sort } = req.query;
    console.log(kode_kredit, sort)
    if (kode_kredit && sort) {
      const [data] = await getByKodeKredit(kode_kredit, sort);

      res.status(200).json({
        status: 200,
        message: 'Ok',
        data: data
      });
      return;
    }

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
    payload.tanggal = date.toLocaleDateString('id-ID', {year: 'numeric', month: 'long', day: 'numeric',});

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
    console.log(cicilan);
    if (!cicilan.length) {
      res.status(404).json({
        status: 404,
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