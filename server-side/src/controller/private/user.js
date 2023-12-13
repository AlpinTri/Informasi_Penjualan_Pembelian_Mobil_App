const bcrypt = require('bcrypt');

const { get, find, create, update, remove, search } = require('../../models/private/users')


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
  }
}

async function getUsersById(req, res) {
  try {
    
    const { kodeUser } = req.params;

    if (!kodeUser) throw new Error('MISSING_PARAMS_ERROR');

    const [data] = await find(kodeUser);

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
        error: "MISSING_PARAMS 'kodeUser'"
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

    if (!result.affectedRows) throw new Error('FAILED_INSERT_ERROR');

    
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

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }

    console.log(err.message);
  }
}

async function updateUser(req, res) {
  try {
    
    const { kodeUser } = req.params;
    if (!kodeUser) throw new Error('MISSING_PARAMS_ERROR');
    const data = req.body;

    data.kodeUser = kodeUser;

    if (data.password) {
      // Hashing New Password
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    // Timestamps
    const date = new Date();
    data.updatedAt = date.toLocaleString('en-GB').replaceAll('/', '-').replace(',', '');
    
    const [result] = await update(data);
    
    // Is Updated??
    if (!result.changedRows) throw new Error('FAILED_UPDATE_ERROR');

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
      res.status(400).json({
        status: 400,
        error: 'FAILED_TO_UPDATE_DATA'
      });

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodeUser'"
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

async function deleteUser(req, res) {
  try {

    const { kodeUser } = req.params;
    
    if (!kodeUser) throw new Error('MISSING_PARAMS_ERROR');

    const [user] = await find(kodeUser);
    
    if (!user.length) throw new Error('NOT_FOUND_ERROR');

    const [result] = await remove(kodeUser);

    // Is Deleted??
    if (!result.affectedRows) throw new Error('FAILED_DELETE_ERROR');


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

    } else if (err.message === "MISSING_PARAMS_ERROR") {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodeUser'"
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