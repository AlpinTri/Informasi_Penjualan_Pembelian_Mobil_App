const { removeImage } = require('../../middleware/unlink');
const { get, find, create, update, remove, getLiteTransactions, getCompliteTransaction, search, findByDate, countTransactionsByYear } = require('../../models/private/credits');
const cicilan = require('../../models/private/installmentPayments');


async function getCredits(req, res) {
  try {
    const { q } = req.query;

    if (!q) {
      const [data] = await get();
  
      res.status(200).json({
        status: 200,
        message: 'OK',
        data: data
      });

      return;
    }

    const [data] = await search(q);

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

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });

    }

    console.log(err.message, 'Credit Route');
  }
}

async function getTransactions(req, res) {
  try {
    const { to, from } = req.query;

    if (!to || !from) {
      
      const [data] = await getLiteTransactions();
  
      if (!data.length) throw new Error('NOT_FOUND_ERROR');
  
      res.status(200).json({
        status: 200,
        message: 'OK',
        data: data
      });

      return;
    }

    if (!to || !from) throw new Error('MISSING_QUERY_PARAMS_ERROR');

    const [data] = await findByDate(to, from);

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

    } else if (err.message === "MISSING_QUERY_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_QUERY_PARAMS 'to' OR 'from'"
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });

    }

    console.log(err.message, 'Credit Route');
  }
}

async function getSpecificTransaction(req, res) {
  try {
    const { kodeKredit } = req.params;

    if (!kodeKredit) throw new Error('MISSING_PARAMS_ERROR');
    
    const [data] = await getCompliteTransaction(kodeKredit);

    if (!data.length) throw new Error('NOT_FOUND_ERROR');

    const [dataCicilan] = await cicilan.getByKodeKredit(kodeKredit, 1);

    res.status(200).json({
      status: 200,
      message: 'OK',
      data: {
        detailKredit: data,
        cicilan: dataCicilan
      }
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

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: `MISSING_PARAMS 'kodeKredit'`
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });

    }

    console.log(err.message, 'Credit Route');
  }
}

async function findCredit(req, res) {
  try {
    const { kodeKredit } = req.params;

    if (!kodeKredit) throw new Error('MISSING_PARAMS_ERROR');

    const [data] = await find(kodeKredit)
    
    if (!data.length) throw new Error('NOT_FOUND_ERROR');

    res.status(200).json({
      status: 200,
      message: 'OK',
      data: data
    })

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

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: `MISSING_PARAMS 'kodeKredit'`
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

async function createCredit(req, res) {
  try {

    const payload = req.body;
    
    if (!req.files || Object.keys(req.files) < 3) throw new Error('PAYLOAD_FILE_ERROR');

    // Add Timestamps
    const date = new Date();
    payload.createdAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');
    payload.updatedAt = payload.createdAt;

    
    // Iamges
    payload.fcKtp = req.files.KTP[0].filename;
    payload.fcKk = req.files.KK[0].filename;
    payload.fcGaji = req.files.slipGaji[0].filename;

    // Kode Kredit (Unique)
    payload.kodeKredit = `TRXCRDT${date.getFullYear()}${date.getTime().toString().slice(3)}`;

    // Date
    payload.tanggal = date.toLocaleDateString('en-GB').split('/').reverse().join('-');

    const [result] = await create(payload)

    if (!result.affectedRows) throw new Error('FAILED_INSERT_ERROR');

    res.status(201).json({
      status: 201,
      message: 'CREATED',
      data: payload
    });


  } catch(err) {
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else if (err.message === 'FAILED_INSERT_ERROR') {
      res.status(500).json({
        status: 500,
        error: 'FAILED_TO_INSERT_DATA'
      });

    } else if (err.message === 'PAYLOAD_FILE_ERROR') {
      res.status(400).json({
        status: 400,
        error: "MISSING_IMAGE_FILE"
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }

    console.log(err.message, 'Credit Route');
  }
}

async function updateCredit(req, res) {
  try {

    const payload = req.body;

    const { kodeKredit } = req.params;

    if (!kodeKredit) throw new Error('MISSING_PARAMS_ERROR');

    // Is data have??
    const [kredit] = await find(kodeKredit);

    if (!kredit.length) throw new Error(`NOT_FOUND_ERROR`);

    // 
    payload.kodeKredit = kodeKredit;
    
    // Add Timestamps
    const date = new Date();
    payload.updatedAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');

    if (req.files.KTP[0].filename) payload.fcKtp = req.files.KTP[0].filename;
    if (req.files.KK[0].filename) payload.fcKk = req.files.KK[0].filename;
    if (req.files.slipGaji[0].filename) payload.fcGaji = req.files.slipGaji[0].filename;
    
    const [result] = await update(payload);

    if (!result.changedRows) throw new Error('FAILED_UPDATE_ERROR');

    if (req.files.KTP[0].filename) await removeImage('credit', kredit[0].fotocopy_ktp);
    if (req.files.KK[0].filename) await removeImage('credit', kredit[0].fotocopy_kk);
    if (req.files.slipGaji[0].filename) await removeImage('credit', kredit[0].foto_slip_gaji);

    res.status(201).json({
      status: 201,
      message: 'OK',
      data: payload
    })

  } catch (err) {
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else if (err.message === 'FAILED_UPDATE_ERROR') {
      res.status(500).json({
        status: 500,
        error: 'FAILED_TO_UPDATE_DATA'
      });

    } else if (err.message === 'PAYLOAD_FILE_ERROR') {
      res.status(400).json({
        status: 400,
        error: "MISSING_IMAGE_FILE"
      });

    } else if (err.code == 'ENOENT') {
      res.status(201).json({
        status: 201,
        message: 'DATA_UPDATED, BUT_THERE_WAS_AN_ERROR_REMOVING_THE_ASSOCIATED_FILE'
      });

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodeKredit'"
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

    console.log(err.message)
  }
}

async function deleteCredit(req, res) {
  try {

    const { kodeKredit } = req.params;

    if (!kodeKredit) throw new Error('MISSING_PARAMS_ERROR');

    // Is data have??
    const [kredit] = await find(kodeKredit);

    if (!kredit.length) throw new Error('NOT_FOUND_ERROR');

    const [result] = await remove(kodeKredit)

    if (!result.affectedRows) throw new Error('FAILED_DELETE_ERROR');

    await removeImage('credit', kredit[0].fotocopy_ktp)
    await removeImage('credit', kredit[0].fotocopy_kk)
    await removeImage('credit', kredit[0].foto_slip_gaji)

    res.status(200).json({
      status: 200,
      message: 'OK'
    });


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

    } else if (err.message === 'FAILED_DELETE_ERROR') {
      res.status(500).json({
        status: 500,
        error: 'FAILED_TO_DELETE_DATA'
      });

    } else if (err.code == 'ENOENT') {
      res.status(200).json({
        status: 200,
        message: 'DATA_DELETED, BUT_THERE_WAS_AN_ERROR_REMOVING_THE_ASSOCIATED_FILE'
      });

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodeKredit'"
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

    console.log(err.message)
  }
}

module.exports = {
  getCredits,
  getTransactions,
  getSpecificTransaction,
  findCredit,
  createCredit,
  updateCredit,
  deleteCredit
}