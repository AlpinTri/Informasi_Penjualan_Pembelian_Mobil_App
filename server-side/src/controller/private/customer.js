const { get, find, create, update, remove, search } = require('../../models/private/customers');
const { removeImage } = require('../../middleware/unlink');

async function getCustomers(req, res) {
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
  }
}

async function findCustomer(req, res) {
  try {
    
    const { nik } = req.params;

    if (!nik) throw new Error('MISSING_PARAMS_ERROR');

    const [data] = await find(nik);

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
        error: "MISSING_PARAMS 'nik'"
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

async function createCustomer(req, res) {
  try {
    
    const data = req.body;

    if (!req.file) throw new Error('PAYLOAD_FILE_ERROR');

    // Timestamps
    const date = new Date();
    data.createdAt = date.toLocaleString('en-GB').replaceAll('/','-').replace(',', '');
    data.updatedAt = data.createdAt;

    // Image
    data.foto = req.file.filename;

    // Insert
    const [result] = await create(data);

    // Is Inserted??
    if (!result.affectedRows) throw new Error('FAILED_INSERT_ERROR');

    // If Success
    res.status(201).json({
      status: 201,
      message: 'CREATED',
      data: data
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

    } else if (err.message === 'PAYLOAD_FILE_ERROR') {
      res.status(400).json({
        status: 400,
        error: "MISSING_CAR_IMAGE_FILE"
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

async function updateCustomer(req, res) {
  try {
    
    const data = req.body;
    const { nik } = req.params;

    if (!nik) throw new Error('MISSING_PARAMS_ERROR');

    // Find Customer
    const [customer] = await find(nik);

    if (!customer.length) throw new Error('NOT_FOUND_ERROR');

    // Timestamps
    const date = new Date();
    data.updatedAt = date.toLocaleString('en-GB').replaceAll('/','-').replace(',', '');

    if (!req.file) {
      // Update
      const [result] = await update(data);

      if (!result.changedRows) throw new Error('FAILED_UPDATE_ERROR');

      res.status(201).json({
        status: 201,
        message: 'CREATED',
        data: data
      });

      return;
    }

    // Image
    data.foto = req.file.filename;

    // Update
    const [result] = await update(data);

    // Is Updated??
    if (!result.changedRows) throw new Error('FAILED_UPDATE_ERROR');

    await removeImage('customer', customer[0].foto);

    // If Success
    res.status(201).json({
      status: 201,
      message: 'CREATED',
      data: data
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
        error: "MISSING_PARAMS 'nik'"
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

async function deleteCustomer(req, res) {
  try {
    
    const { nik } = req.params;

    if (!nik) throw new Error('MISSING_PARAMS_ERROR');

    // Find Customer
    const [customer] = await find(nik);

    if (!customer.length) throw new Error('NOT_FOUND_ERROR');

    // Delete
    const [result] = await remove(nik);
    
    // Is Deleted??
    if (!result.affectedRows) throw new Error('FAILED_DELETE_ERROR');

    await removeImage('customer', customer[0].foto);

    // If Success
    res.status(200).json({
      status: 200,
      message: 'OK',
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
      res.status(400).json({
        status: 400,
        error: 'FAILED_TO_DELETE_DATA'
      });

    } else if (err.code == 'ENOENT') {
      res.status(201).json({
        status: 201,
        message: 'DATA_DELETED, BUT_THERE_WAS_AN_ERROR_REMOVING_THE_ASSOCIATED_FILE'
      });

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'nik'"
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

    console.log(err.message, 'customer Route');
    
  }
}

module.exports = {
  getCustomers,
  findCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
}