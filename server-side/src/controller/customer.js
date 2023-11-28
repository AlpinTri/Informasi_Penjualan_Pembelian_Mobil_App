const { get, find, create, update, remove, search } = require('../models/customers');
const { removeImage } = require('../middleware/unlink');

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
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}

async function findCustomer(req, res) {
  try {
    
    const { nik } = req.params;
    const [data] = await find(nik);

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
  }
}

async function createCustomer(req, res) {
  try {
    
    const data = req.body;
    // Timestamps
    const date = new Date();
    data.createdAt = date.toLocaleString('en-GB').replaceAll('/','-').replace(',', '');
    data.updatedAt = data.createdAt;

    // Image
    data.foto = req.file.filename;

    // Insert
    const [result] = await create(data);

    // Is Inserted??
    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to insert',
      });

      return;
    }

    // If Success
    res.status(201).json({
      status: 201,
      message: 'Ok',
      data: data
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}

async function updateCustomer(req, res) {
  try {
    
    const data = req.body;
    const { nik } = req.params;

    // Find Customer
    const [customer] = await find(nik);
    if (!customer.length) {
      res.status(404).json({
        status: 404,
        message: 'Data not found',
      });

      return;
    }

    // Timestamps
    const date = new Date();
    data.updatedAt = date.toLocaleString('en-GB').replaceAll('/','-').replace(',', '');

    if (!req.file) {
      // Update
      const [result] = await update(data);

      if (!result.changedRows) {
        res.status(500).json({
          status: 500,
          message: 'Failed to insert',
        });

        return;
      }

      res.status(201).json({
        status: 201,
        message: 'Ok',
        data: data
      });

      return;
    }

    // Image
    data.foto = req.file.filename;

    // Update
    const [result] = await update(data);

    // Is Updated??
    if (!result.changedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to insert',
      });

      return;
    }

    await removeImage('customer', customer[0].foto);

    // If Success
    res.status(201).json({
      status: 201,
      message: 'Ok',
      data: data
    });

  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(201).json({
        status: 201,
        message: 'Data updated, but there was an error removing the associated file.'
      });
    } else {
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
  }
}

async function deleteCustomer(req, res) {
  try {
    
    const { nik } = req.params;

    // Find Customer
    const [customer] = await find(nik);
    if (!customer.length) {
      res.status(404).json({
        status: 404,
        message: 'Data not found',
      });

      return;
    }

    // Delete
    const [result] = await remove(nik);
    
    // Is Deleted??
    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to delete',
      });

      return;
    }

    
    await removeImage('customer', customer[0].foto);

    // If Success
    res.status(201).json({
      status: 201,
      message: 'Ok',
    });

  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(201).json({
        status: 201,
        message: 'Data updated, but there was an error removing the associated file.'
      });
    } else if(err instanceof ReferenceError) {
      console.log(err)

    } else {
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
    
  }
}

module.exports = {
  getCustomers,
  findCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
}