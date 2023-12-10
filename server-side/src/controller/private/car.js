const { get, find, create, update, remove, search } = require('../../models/private/cars');
const { removeImage } = require('../../middleware/unlink');

async function getCars(req, res) {
  try {

    const { q } = req.query;

    if (!q) {
      const [data] = await get();
      
      res.status(200).json({
        status: 200,
        message: 'ok',
        data: data
      })
      return;
    }

    const [data] = await search(q)

    res.status(200).json({
      status: 200,
      message: 'ok',
      data: data
    })
    return;

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message
    })
  }
}

async function findCar(req, res) {
  try {
    const { kodeMobil } = req.params;
    const [data] = await find(kodeMobil);

    if (!data.length) {
      res.status(404).json({
        status: 404,
        message: 'data not found'
      });

      return;
    }
    
    res.status(200).json({
      status: 200,
      message: 'ok',
      data: data
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message
    });
  }
}

async function createCar(req, res) {
  try {
    // Get Payload
    const data = req.body;

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
    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Failed to insert'
      });

      return;
    }

    // Success
    res.status(201).json({
      status: 201,
      message: 'created',
      data: data
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message
    });
  }
}

async function updateCar(req, res) {
  try {
    
    const data = req.body;
    const { kodeMobil } = req.params;
    console.log(data);
    // Find Kode Mobil
    const [car] = await find(kodeMobil)
    if (!car.length) {
      res.status(404).json({
        status: 404,
        message: 'Data not found.'
      });
      
      return;
    }

    data.kodeMobil = kodeMobil;

    // Timestamps
    const date = new Date()
    data.updatedAt = date.toLocaleString('en-GB').replaceAll('/','-').replace(',', '');
    
    if (!req.file) {
      // Update
      const [result] = await update(data);

      if (!result.changedRows) {
        res.status(500).json({
          status: 500,
          message: 'failed to update'
        });

        return;
      }

      // Success
      res.status(201).json({
        status: 201,
        message: 'Ok'
      });
      return;
    }
    // Image
    data.gambar = req.file.filename;

    // Update
    const [result] = await update(data);

    // Is Updated??
    if (!result.changedRows) {
      res.status(500).json({
        status: 500,
        message: 'failed to update'
      });

      return;
    }

    // Delete Image Now
    await removeImage('car',car[0].gambar);

    // Success
    res.status(201).json({
      status: 201,
      message: 'Ok'
    })

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message
    })
  }
}

async function deleteCar(req, res) {
  try {
    
    const { kodeMobil } = req.params;
    
    // Find Image Name
    const [car] = await find(kodeMobil);
    
    if (!car.length) {
      res.status(404).json({
        status: 404,
        message: 'data not found'
      });

      return;
    }
    
    // Remove Data
    const [result] = await remove(kodeMobil)

    // Is Success??
    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'failed to delete',
      });
      
      return;
    }

    // If Success
    // Remove Image
    await removeImage('car',car[0].gambar);

    res.status(200).json({
      status: 200,
      message: 'ok',
    })

  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(200).json({
        status: 200,
        message: 'Data deleted, but there was an error removing the associated file.'
      });
    } else {
      res.status(500).json({
        status: 500,
        message: err.message
      });
    }
  }
}


module.exports = {
  getCars,
  findCar,
  createCar,
  updateCar,
  deleteCar
}