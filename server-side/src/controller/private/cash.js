const { removeImage } = require('../../middleware/unlink');
const { get, find, create, update, remove, getLiteTransactions, getCompliteTransaction, search, findByDate} = require('../../models/private/cashes');


async function getCashes(req, res) {
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

    console.log(err.message, 'Cash Route');
  }
}

async function getTransactions(req, res) {
  try {
    const { to, from } = req.query;

    if (!to && !from) {
      
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

    console.log(err.message, 'Cash Route');
  }
}

async function getSpesificTransaction(req, res) {
  try {
    const { kodeCash } = req.params;

    if (!kodeCash) throw new Error('MISSING_PARAMS_ERROR');
      
    const [data] = await getCompliteTransaction(kodeCash);
    
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

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: `MISSING_PARAMS 'kodeCash'`
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });

    }

    console.log(err.message, 'Cash Route');
  }
}

async function findCash(req, res) {
  try {
    const { kodeCash } = req.params;

    if (!kodeCash) throw new Error('MISSING_PARAMS_ERROR');

    const [data] = await find(kodeCash);

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

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: `MISSING_PARAMS 'kodeCash'`
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }

    console.log(err.message, 'Cash Route');
  }
}

async function createCash(req, res) {
  try {
    const payload = req.body;
    
    if (!req.file) throw new Error('PAYLOAD_FILE_ERROR');

    // Add Timestamps
    const date = new Date()
    payload.createdAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');
    payload.updatedAt = payload.createdAt;
    payload.tanggal = date.toLocaleDateString('en-GB').split('/').reverse().join('-');

    // Images
    payload.fcKtp = req.file.filename;

    // Kode Cash (Unique)
    payload.kodeCash = `TRXCASH${date.getFullYear()}${date.getTime().toString().slice(3)}`;

    const [data] = await create(payload);

    if (!data.affectedRows) throw new Error('FAILED_INSERT_ERROR');

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
      res.status(500).json({
        status: 500,
        error: 'FAILED_TO_INSERT_DATA'
      });

    } else if (err.message === 'PAYLOAD_FILE_ERROR') {
      res.status(400).json({
        status: 400,
        error: "MISSING_CUSTOMER_IMAGE_FILE"
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }

    console.log(err.message, 'Cash Route');
  }
}

async function updateCash(req, res) {
  try {
    const payload = req.body;
    const { kodeCash } = req.params;

    if (!kodeCash) throw new Error('MISSING_PARAMS_ERROR');

    const [cash] = await find(kodeCash);

    if (!cash.length) throw new Error(`NOT_FOUND_ERROR`);

    const date = new Date();
    payload.createdAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');

    payload.kodeCash = kodeCash;

    // Images
    payload.fcKtp = req.file.filename;

    // Update
    const [result] = await update(payload);
    
    if (!result.changedRows) throw new Error('FAILED_UPDATE_ERROR');

    await removeImage('cash', cash[0].fotocopy_ktp);

    res.status(201).json({
      status: 201,
      message: 'OK',
      data: payload
    });

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

    } else if (err.code == 'ENOENT') {
      res.status(201).json({
        status: 201,
        message: 'DATA_UPDATED, BUT_THERE_WAS_AN_ERROR_REMOVING_THE_ASSOCIATED_FILE'
      });

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodeCash'"
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

    console.log(err.message, 'Cash Route');
  }
}

async function deleteCash(req, res) {
  try {
    const { kodeCash } = req.params;

    if (!kodeCash) throw new Error('MISSING_PARAMS_ERROR');

    const [cash] = await find(kodeCash);

    if (!cash.length) throw new Error('NOT_FOUND_ERROR');

    const [result] = await remove(kodeCash);

    if (!result.affectedRows) throw new Error('FAILED_DELETE_ERROR');

    await removeImage('cash', cash[0].fotocopy_ktp);

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
        error: "MISSING_PARAMS 'kodeCash'"
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

    console.log(err.message, 'Cash Route');
  }
}

module.exports = {
  getCashes,
  getTransactions,
  getSpesificTransaction,
  findCash,
  createCash,
  updateCash,
  deleteCash
}