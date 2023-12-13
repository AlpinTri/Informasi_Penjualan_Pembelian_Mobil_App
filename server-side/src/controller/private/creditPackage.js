const { get, find, create, update, remove, search } = require('../../models/private/creditPackages');

async function getCreditPackages(req, res) {
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

    if (!data.length) throw new Error('NOT_FOUND_ERROR');

    res.status(200).json({
      code: 200,
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

    console.log(err.message, 'Credit Route');
  }
}

async function findCreditPackage(req, res) {
  try {
    const { kodePaket } = req.params;

    if (!kodePaket) throw new Error('MISSING_PARAMS_ERROR');

    const [data] = await find(kodePaket);

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
        error: "MISSING_PARAMS 'kodePaket'"
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }

    console.log(err.message, 'Credit Package Route');
  }
}

async function createCreditPackage(req, res) {
  try {
    // Get Payload
    const payload = req.body;

    // Add Timestamps
    const date = new Date();
    payload.createdAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');
    payload.updatedAt = payload.createdAt;

    // Kode Paket (Unique)
    payload.kodePaket = date.getTime().toString().slice(6);

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

    console.log(err.message, 'Cash Route');
  }
}

async function updateCreditPackage(req, res) {
  try {
    const payload = req.body;
    const { kodePaket } = req.params;

    if(!kodePaket) throw new Error('MISSING_PARAMS_ERROR')
    
    const [creditPackage] = await find(kodePaket);

    if (!creditPackage.length) throw new Error('NOT_FOUND_ERROR');

    payload.kodePaket = kodePaket;

    const date = new Date();
    payload.updatedAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');

    const [result] = await update(payload);

    if (!result.changedRows) throw new Error('FAILED_UPDATE_ERROR');


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

    } else if (err.message === 'FAILED_UPDATE_ERROR') {
      res.status(400).json({
        status: 400,
        error: 'FAILED_TO_UPDATE_DATA'
      });

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodePaket'"
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

    console.log(err.message);
  }
}

async function deleteCreditPackage(req, res) {
  try {
    const { kodePaket } = req.params;

    if (!kodePaket) throw new Error('MISSING_PARAMS_ERROR');

    const [creditPackage] = await find(kodePaket);

    if (!creditPackage.length) throw new Error('NOT_FOUND_ERROR');

    const [result] = await remove(kodePaket);

    if (!result.affectedRows) throw new Error('FAILED_DELETE_ERROR');

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

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodePaket'"
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

    console.log(err.message);
  }
}

module.exports = {
  getCreditPackages,
  findCreditPackage,
  createCreditPackage,
  updateCreditPackage,
  deleteCreditPackage
}