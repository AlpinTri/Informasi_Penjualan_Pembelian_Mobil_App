const { get, find, create, update, remove, search } = require('../../models/private/cars');
const { removeImage } = require('../../middleware/unlink');

async function getCars(req, res) {
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

    const [data] = await search(q)
    
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

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });

    }

    console.log(err.message, 'Cars Route')
  }
}

async function findCar(req, res) {
  try {
    const { kodeMobil } = req.params;

    if (!kodeMobil) throw new Error('MISSING_PARAMS_ERROR');

    const [data] = await find(kodeMobil);

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
        error: "MISSING_PARAMS 'kodeMobil'"
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }

    console.log(err.message, 'Cars Route')
  }
}

async function createCar(req, res) {
  try {
    // Get Payload
    const data = req.body;

    if (!req.file) throw new Error('PAYLOAD_FILE_ERROR');

    // Image
    data.gambar = req.file.filename;

    // Timestamps
    const date = new Date()
    data.createdAt = date.toLocaleString('en-GB').replaceAll('/','-').replace(',', '');
    data.updatedAt = data.createdAt;
    
    // Kode Mobil (Unique)
    data.kodeMobil = date.getTime().toString().slice(5);
    
    const [result] = await create(data)

    //  Is Inserted??
    if (!result.affectedRows) throw new Error('FAILED_INSERT_ERROR');

    // Success
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
      res.status(500).json({
        status: 500,
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

    console.log(err.message, 'Cars Route')
  }
}

async function updateCar(req, res) {
  try {
    
    const data = req.body;

    const { kodeMobil } = req.params;

    if (!kodeMobil) throw new Error('MISSING_PARAMS_ERROR');

    // Find Kode Mobil
    const [car] = await find(kodeMobil);

    if (!car.length) throw new Error('NOT_FOUND_ERROR');

    data.kodeMobil = kodeMobil;

    // Timestamps
    const date = new Date()
    data.updatedAt = date.toLocaleString('en-GB').replaceAll('/','-').replace(',', '');
    
    if (!req.file) {

      // Update
      const [result] = await update(data);

      if (!result.changedRows) throw new Error('FAILED_UPDATE_ERROR');

      // Success
      res.status(201).json({
        status: 201,
        message: 'CREATED'
      });

      return;
    }

    // Image
    data.gambar = req.file.filename;

    // Update
    const [result] = await update(data);

    // Is Updated??
    if (!result.changedRows) throw new Error('FAILED_UPDATE_ERROR');

    // Delete Image Now
    await removeImage('car', car[0].gambar);

    // Success
    res.status(201).json({
      status: 201,
      message: 'CREATED'
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
        error: "MISSING_PARAMS 'kodeMobil'"
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

async function deleteCar(req, res) {
  try {
    
    const { kodeMobil } = req.params;
    
    if (!kodeMobil) throw new Error('MISSING_PARAMS_ERROR');

    // Find Image Name
    const [car] = await find(kodeMobil);
    
    if (!car.length) throw new Error('NOT_FOUND_ERROR');
    
    // Remove Data
    const [result] = await remove(kodeMobil)

    // Is Success??
    if (!result.affectedRows) throw new Error('FAILED_DELETE_ERROR');

    // If Success
    // Remove Image
    await removeImage('car',car[0].gambar);

    res.status(200).json({
      status: 200,
      message: 'OK',
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
      res.status(201).json({
        status: 201,
        message: 'DATA_DELETED, BUT_THERE_WAS_AN_ERROR_REMOVING_THE_ASSOCIATED_FILE'
      });

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodeMobil'"
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
  getCars,
  findCar,
  createCar,
  updateCar,
  deleteCar
}