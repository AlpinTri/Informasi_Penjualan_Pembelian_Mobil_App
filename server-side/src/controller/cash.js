const { removeImage } = require('../middleware/unlink');
const { get, find, create, update, remove} = require('../models/cashes');


async function getCashes(req, res) {
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
      message: 'Internal server error',
    });

    console.log(err.message);
  }
}

async function findCash(req, res) {
  try {
    const { kodeCash } = req.params;

    const [data] = await find(kodeCash);

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
  }
}

async function createCash(req, res) {
  try {
    const payload = req.body;
    
    // Add Timestamps
    const date = new Date()
    payload.createdAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');
    payload.updatedAt = payload.createdAt;
    payload.tanggal = date.toLocaleString('id-ID').substring(0, 10).replaceAll('/', '-');

    // Images
    payload.fcKtp = req.file.filename;

    // Kode Cash (Unique)
    payload.kodeCash = 'INV' + date.getTime().toString().slice(3);

    const [data] = await create(payload);

    if (!data.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to insert'
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
      message: 'Internal server error',
    });

    console.log(err.message)
  }
}

async function updateCash(req, res) {
  try {
    const payload = req.body;
    const { kodeCash } = req.params;

    const [cash] = await find(kodeCash);

    if (!cash.length) {
      res.status(401).json({
        status: 401,
        message: 'Data not found',
      });

      return;
    }

    const date = new Date();
    payload.createdAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');

    payload.kodeCash = kodeCash;

    // Images
    payload.fcKtp = req.file.filename;

    // Update
    const [result] = await update(payload);
    if (!result.changedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to updated'
      });
      return;
    }

    await removeImage('cash', cash[0].fotocopy_ktp);

    res.status(201).json({
      status: 201,
      message: 'Ok',
      data: payload
    })

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });

    console.log(err.message)
  }
}

async function deleteCash(req, res) {
  try {
    const { kodeCash } = req.params;

    const [cash] = await find(kodeCash);
    if (!cash.length) {
      res.status(401).json({
        status: 401,
        message: 'Data not found',
      });

      return;
    }

    const [result] = await remove(kodeCash);
    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to delete',
      });

      return;
    }

    await removeImage('cash', cash[0].fotocopy_ktp);

    res.status(200).json({
      status: 200,
      message: 'Ok'
    })

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

    console.log(err.message);
  }
}

module.exports = {
  getCashes,
  findCash,
  createCash,
  updateCash,
  deleteCash
}