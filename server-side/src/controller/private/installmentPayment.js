const { calculateInstallment } = require('../../config/installment');
const { updateStatus } = require('../../models/private/credits');
const { get, find, create, update, remove, getByKodeKredit } = require('../../models/private/installmentPayments');

async function getInstallmentPayments(req, res) {
  try {

    const { kode_kredit, sort } = req.query;

    if (kode_kredit && sort) {
      const [data] = await getByKodeKredit(kode_kredit, sort);

      res.status(200).json({
        status: 200,
        message: 'OK',
        data: data
      });

      return;
    }

    const [data] = await get();

    res.status(200).json({
      status: 200,
      message: 'OK',
      data: data
    });

  } catch (err) {
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else if(err.message === 'NOT_FOUND_ERROR') {
      res.status(404).json({
        status: 404,
        error: 'DATA_NOT_FOUND'
      }); 

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });

    }

    console.log(err.message)
  }
}

async function findInstallmentPayment(req, res) {
  try {
    const { kodeCicilan } = req.params;

    if (!kodeCicilan) throw new Error('MISSING_PARAMS_ERROR');

    const [data] = await find(kodeCicilan);

    if (!data.length) throw new Error('NOT_FOUND_ERROR');

    res.status(200).json({
      status: 200,
      message: 'OK',
      data: data
    });

  } catch (err) {
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else if (err.message === 'NOT_FOUND_ERROR') {
      res.status(404).json({
        status: 404,
        error: 'DATA_NOT_FOUND'
      });

    } else if (err.message === 'MISSING_PARAMS_ERROR') {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodeCicilan'"
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }

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
    payload.tanggal = date.toLocaleDateString('en-GB').split('/').reverse().join('-');

    // Kode Pembayaran Cicilan
    payload.kodeCicilan = 'CC-' + date.getTime();

    // Sisa Cicilan dan Jumlah Sisa
    const { jumlahCicilan, cicilanKe, sisaCicilan, totalSisa } = await calculateInstallment(payload.kodeKredit);

    payload.jumlahCicilan = jumlahCicilan;
    payload.cicilanKe = cicilanKe;
    payload.sisaCicilan = sisaCicilan;
    payload.totalSisa = totalSisa;

    const [result] = await create(payload);

    if (!result.affectedRows) throw new Error('FAILED_INSERT_ERROR');

    if (sisaCicilan == 0) {
      const [result] = await updateStatus(payload.kodeKredit, 'Lunas');

      if (!result.affectedRows) throw new Error('FAILED_INSERT_ERROR');
    }

    res.status(201).json({
      status: 201,
      message: 'CREATED',
      data: payload
    });

  } catch (err) {
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else if (err.message === 'FAILED_INSERT_ERROR') {
      res.status(400).json({
        status: 400,
        error: 'FAILED_TO_INSERT_DATA'
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }

    console.log(err.message);
  }
}

async function updateInstallmentPayment(req, res) {
  try {
    
  } catch (err) {
    
  }
}

async function deleteInstallmentPayment(req, res) {
  try {
    const { kodeCicilan } = req.params;

    if (!kodeCicilan) throw new Error('MISSING_PARAMS_ERROR');

    const [cicilan] = await find(kodeCicilan);

    if (!cicilan.length) throw new Error('NOT_FOUND_ERROR');

    const [result] = await remove(kodeCicilan);

    if (!result.affectedRows) throw new Error('FAILED_DELETE_ERROR');

    // Sisa Cicilan dan Jumlah Sisa
    const { sisaCicilan } = await calculateInstallment(cicilan[0].kode_kredit);

    console.log(sisaCicilan)
    if (sisaCicilan >= 0) {
      const [result] = await updateStatus(cicilan[0].kode_kredit, 'Belum lunas');

      if (!result.affectedRows) throw new Error('FAILED_UPDATE_ERROR');
    }

    res.status(200).json({
      status: 200,
      message: 'OK'
    })

  } catch (err) {
    const expression = /connect ECONNREFUSED/i;
    const expressionForeign = /foreign key constraint/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else if (expressionForeign.test(err.message)) {
      res.status(400).json({
        status: 400,
        error: 'CANNOT_DELETE_DATA, FOREIGN_KEY_CONSTRAINT'
      });

    } else if (err.message === 'FAILED_UPDATE_ERROR') {
      res.status(400).json({
        status: 400,
        error: 'FAILED_TO_UPDATE_DATA'
      });

    } else if (err.message === 'FAILED_DELETE_ERROR') {
      res.status(400).json({
        status: 400,
        error: 'FAILED_TO_DELETE_DATA'
      });

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodeCicilan'"
      });

    } else if (err.message === `NOT_FOUND_ERROR`) {
      res.status(404).json({
        status: 404,
        error: 'DATA_NOT_FOUND'
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });

    }
  }
}

module.exports = {
  getInstallmentPayments,
  findInstallmentPayment,
  createInstallmentPayment,
  updateInstallmentPayment,
  deleteInstallmentPayment
}