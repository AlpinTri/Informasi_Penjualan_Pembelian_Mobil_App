require('dotenv').config();
const jwt = require('jsonwebtoken');
const { find } = require('../models/private/users');
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

    const [result] = await find(parseInt(kode));

    if (!result.length) {
      res.status(401).json({
        code: 401,
        error: "Invalid credentials",
        message: 'Your id or password is incorrect'
      });
      return;
    }

    const match = await bcrypt.compare(password, result[0].password);

    if (!match) {
      res.status(401).json({
        code: 401,
        error: "Invalid credentials",
        message: 'Your id or password is incorrect'
      });
      return;
    }

    const token = jwt.sign({
      kode: result[0].kode_user,
      name: result[0].nama,
      status: result[0].status
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m'
    });

    res.status(200).json({
      code: 200,
      'x-access-token': token,
      message: 'Login successful',
      data: {
        kode: result[0].kode_user,
        name: result[0].nama
      }
    });

  } catch (err) {
    console.log(err.message)
  }
}

module.exports = login;