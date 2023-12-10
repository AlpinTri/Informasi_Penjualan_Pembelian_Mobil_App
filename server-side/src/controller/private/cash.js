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
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });

    console.log(err.message);
  }
}

async function getTransactions(req, res) {
  try {
    const { to, from } = req.query;

    if (!to || !from) {
      
      const [data] = await getLiteTransactions();
  
      if (!data.length) {
        res.status(404).json({
          code: 404,
          message: 'Data not found'
        });
        return;
      }
  
      res.status(200).json({
        code: 200,
        data: data
      });
      return;
    }

    const [data] = await findByDate(to, from);

    if (!data.length) {
      res.status(404).json({
        code: 404,
        message: 'Data not found'
      });
      return;
    }

    res.status(200).json({
      code: 200,
      data: data
    });

  } catch (err) {
    res.status(400).json({
      code: 400,
      message: 'Bad request'
    });
  }
}

async function getSpesificTransaction(req, res) {
  try {
    const { kodeCash } = req.params;

    const [data] = await getCompliteTransaction(kodeCash);
    
    if (!data.length) {
      res.status(400).json({
        code: 400,
        message: 'Bad request'
      });
      return;
    }

    res.status(200).json({
      code: 200,
      data: data
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: 'Bad request'
    });
    console.error(err)
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
    payload.tanggal = date.toLocaleDateString('en-GB').split('/').reverse().join('-');

    // Images
    payload.fcKtp = req.file.filename;

    // Kode Cash (Unique)
    payload.kodeCash = `TRXCASH${date.getFullYear()}${date.getTime().toString().slice(3)}`;

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

    console.log(req.params)
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
  getTransactions,
  getSpesificTransaction,
  findCash,
  createCash,
  updateCash,
  deleteCash
}