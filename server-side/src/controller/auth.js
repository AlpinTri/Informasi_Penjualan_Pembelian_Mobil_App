require('dotenv').config();
const jwt = require('jsonwebtoken');
const { find } = require('../models/private/users');
const bcrypt = require('bcrypt');

async function login(req, res) {
  try {
    const { kode, password } = req.body

    if (!kode && !password) throw new Error('PAYLOAD_ERROR')

    const [result] = await find(parseInt(kode));

    if (!result.length) throw new Error('INVALID_CREDENTIALS');

    const match = await bcrypt.compare(password, result[0].password);

    if (!match) throw new Error('INVALID_CREDENTIALS');

    const token = jwt.sign({
      kode: result[0].kode_user,
      name: result[0].nama,
      status: result[0].status
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m'
    });

    res.status(200).json({
      status: 200,
      'x-access-token': token,
      message: 'Login successful',
      data: {
        kode: result[0].kode_user,
        name: result[0].nama
      }
    });

  } catch (err) {
    const expression = /connect ECONNREFUSED/i;
    const expressionForeign = /foreign key constraint/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });
    } else if (err.message === 'PAYLOAD_ERROR') {
      res.status(400).json({
        status: 400,
        error: 'FIELD_MISSING'
      });
    } else if (err.message === 'INVALID_CREDENTIALS') {
      res.status(401).json({
        status: 401,
        error: err.message
      });
    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }
  }
}

module.exports = login;