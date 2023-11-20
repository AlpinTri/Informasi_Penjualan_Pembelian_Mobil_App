const { get, find, create, update, remove } = require('../models/creditPackages');

async function getCreditPackages(req, res) {
  try {
    const [data] = await get();

    res.status(200).json({
      status: 200,
      message: 'Ok',
      data: data
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });
  }
}

async function findCreditPackage(req, res) {
  try {
    const { kodePaket } = req.params;

    const [data] = await find(kodePaket);

    if (!data.length) {
      res.status(404).json({
        status: 404,
        message: 'Data not found'
      });
      return
    }

    res.status(200).json({
      status: 200,
      message: 'Ok',
      data: data
    });
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

    console.log(err.message);
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

    if (!data.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to insert'
      });
    }

    res.status(201).json({
      status: 201,
      message: 'Ok',
      data: payload
    });

  } catch (error) {
    req.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

    console.log(err.message);
  }
}

async function updateCreditPackage(req, res) {
  try {
    const payload = req.body;
    const { kodePaket } = req.params;
    
    const [creditPackage] = await find(kodePaket);

    if (!creditPackage.length) {
      res.status(404).json({
        status: 404,
        message: 'Data not found'
      });

      return;
    }

    payload.kodePaket = kodePaket;

    const date = new Date();
    payload.updatedAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');

    const [result] = await update(payload);

    if (!result.changedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to update'
      });

      return;
    }

    res.status(201).json({
      status: 201,
      message: 'Ok'
    });


  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

    console.log(err.message);
  }
}

async function deleteCreditPackage(req, res) {
  try {
    const { kodePaket } = req.params;

    const [creditPackage] = await find(kodePaket);

    if (!creditPackage.length) {
      res.status(404).json({
        status: 500,
        message: 'Data not found'
      });

      return;
    }

    const [result] = await remove(kodePaket);

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
    });


  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

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