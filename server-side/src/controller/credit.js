const { removeImage } = require('../middleware/unlink');
const { get, find, create, update, remove, getLiteTransactions, getCompliteTransaction, search } = require('../models/credits');
const cicilan = require('../models/installmentPayments');


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
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

    console.log(err.message)
  }
}

async function getTransactions(req, res) {
  try {
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
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: 'Bad request'
    });
  }
}

async function getSpecificTransaction(req, res) {
  try {
    const { kodeKredit } = req.params;

    const [data] = await getCompliteTransaction(kodeKredit);

    console.log('pass')

    if (!data.length) {
      res.status(400).json({
        code: 400,
        message: 'Bad request'
      });
      return;
    }

    const [dataCicilan] = await cicilan.getByKodeKredit(kodeKredit, 1);

    res.status(200).json({
      code: 200,
      data: {
        detailKredit: data,
        cicilan: dataCicilan
      }
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: 'Bad request'
    });
  }
}

async function findCredit(req, res) {
  try {
    const { kodeKredit } = req.params;

    const [data] = await find(kodeKredit)
    
    res.status(200).json({
      status: 200,
      message: 'Ok',
      data: data
    })

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });

    console.log(err.message)
  }
}

async function createCredit(req, res) {
  try {

    const payload = req.body;
    
    console.log(payload)
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
    payload.tanggal = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', });

    
    const [result] = await create(payload)

    if (!result.affectedRows) {
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
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });
  }
}

async function updateCredit(req, res) {
  try {

    const payload = req.body;

    const { kodeKredit } = req.params;

    // Is data have??
    const [kredit] = await find(kodeKredit);

    if (!kredit.length) {
      res.status(401).json({
        status: 401,
        message: 'Data not found'
      });
      return;
    }
    console.log('pass 1')
    // 
    payload.kodeKredit = kodeKredit;
    
    // Add Timestamps
    const date = new Date();
    payload.updatedAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');

    // Iamges
    payload.fcKtp = req.files.KTP[0].filename;
    payload.fcKk = req.files.KK[0].filename;
    payload.fcGaji = req.files.slipGaji[0].filename;

    console.log('pass 2')
    console.log(payload)
    const [result] = await update(payload);
    console.log('pass 3')
    if (!result.changedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to Update'
      });
      return;
    }

    await removeImage('credit', kredit[0].fotocopy_ktp)
    await removeImage('credit', kredit[0].fotocopy_kk)
    await removeImage('credit', kredit[0].foto_slip_gaji)

    console.log('pass 4')
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

    console.log(err.message)
  }
}

async function deleteCredit(req, res) {
  try {

    const { kodeKredit } = req.params;

    // Is data have??
    const [kredit] = await find(kodeKredit);

    if (!kredit.length) {
      res.status(401).json({
        status: 401,
        message: 'Data not found'
      });
      return;
    }


    const [result] = await remove(kodeKredit)

    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to Update'
      });
      return;
    }

    await removeImage('credit', kredit[0].fotocopy_ktp)
    await removeImage('credit', kredit[0].fotocopy_kk)
    await removeImage('credit', kredit[0].foto_slip_gaji)

    res.status(200).json({
      status: 200,
      message: 'Ok'
    });


  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });
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