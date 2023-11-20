const { removeImage } = require('../middleware/unlink');
const { get, find, create, update, remove } = require('../models/credits');


async function getCredits(req, res) {
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

    console.log(err.message)
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
    
    // Add Timestamps
    const date = new Date();
    payload.createdAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');
    payload.updatedAt = payload.createdAt;

    // Iamges
    payload.fcKtp = req.files.KTP[0].filename;
    payload.fcKk = req.files.KK[0].filename;
    payload.fcGaji = req.files.slipGaji[0].filename;

    // Kode Kredit (Unique)
    payload.kodeKredit = 'INV' + date.getTime();

    // Date
    payload.tanggal = date.toLocaleString('id-ID').substring(0, 10).replaceAll('/', '-');

    
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
  findCredit,
  createCredit,
  updateCredit,
  deleteCredit
}