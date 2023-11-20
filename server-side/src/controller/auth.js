require('dotenv').config();
const jwt = require('jsonwebtoken');
const { find } = require('../models/users');
const bcrypt = require('bcrypt');

async function login(req, res) {
  try {
    const { kode, password } = req.body

    if (!kode && !password) {
      res.status(400).json({
        code: 400,
        error: {
          'id': ['id is required'],
          'password': ['password is required']
        }
      });
      return;
    }

    console.log(req.body)
    const [result] = await find(parseInt(kode));

    if (!result.length) {
      res.status(400).json({
        code: 400,
        message: 'id or password wrong'
      });
      return;
    }

    const match = await bcrypt.compare(password, result[0].password);

    if (!match) {
      res.status(400).json({
        code: 400,
        message: 'id or password wrong'
      });
      return;
    }

    const token = jwt.sign({
      id: result[0].id,
      status: result[0].status
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '6h'
    });

    res.status(200).json({
      code: 200,
      'x-access-token': token,
      data: {
        kode: result[0].kode_user,
        name: result[0].nama
      }
    })
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = login;