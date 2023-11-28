const bcrypt = require('bcrypt');

const { get, find, create, update, remove, search } = require('../models/users')


async function getUsers(req, res) {
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

    res.status(502).json({
      message: 'Server error'
    });

  }
}

async function getUsersById(req, res) {
  try {
    
    const { kodeUser } = req.params;
    const [data] = await find(kodeUser);

    if (!data.length) {
      res.status(404).json({
        status: 404,
        message: 'Data not found',
      });

      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Ok',
      data: data
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error.'
    });
    
    console.log(err.message);
  }
}

async function createUser(req, res) {
  try {

    const data = req.body;

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    // Timestamps
    const date = new Date();
    data.createdAt = date.toLocaleString('en-GB').replaceAll('/','-').replace(',', '');
    data.updatedAt = date.toLocaleString('en-GB').replaceAll('/','-').replace(',', '');

    // Kode User (Unique)
    data.kodeUser = date.getTime().toString().slice(3);

    const [result] = await create(data);

    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'Internal server error.',
      });

      return;
    }
    
    res.status(201).json({
      status: 201,
      message: 'Created.',
      data: data
    });

  } catch (err) {

    res.status(500).json({
      status: 500,
      message: 'Internal server error.'
    });
    
    console.log(err.message)
  }
}

async function updateUser(req, res) {
  try {
    
    const { kodeUser } = req.params;
    const data = req.body;

    data.kodeUser = kodeUser;

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    // Timestamps
    const date = new Date();
    data.updatedAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');
    
    const [result] = await update(data);
    
    // Is Updated??
    if (!result.changedRows) {
      res.status(500).json({
        status: 500,
        message: 'failed to update'
      });

      return;
    }

    res.status(201).json({
      status: 201,
      message: 'Created',
      data: data
    });

  } catch (err) {

    res.status(500).json({
      message: 'Internal server error'
    });
    console.log(err.message)
  }
}

async function deleteUser(req, res) {
  try {
    
    const {kodeUser} = req.params;

    const [user] = await find(kodeUser);
    
    if (!user.length) {
      res.status(404).json({
        status: 404,
        message: 'Data not found'
      });

      return;
    }

    const [result] = await remove(kodeUser);

    // Is Deleted??
    if (!result.affectedRows) {
      res.status(500).json({
        status: 500,
        message: 'failed to update'
      });

      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Ok',
    });

  } catch (err) {

    res.status(502).json({
      message: 'Server error'
    });
    console.log(err.message)
  }
}


module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser
}