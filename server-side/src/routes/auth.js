const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { find } = require('../models/users');
const jwt = require('jsonwebtoken');
const login = require('../controller/auth');

//
// router.post('/login', async (req, res) => {
//   const [result] = await find(req.body.kode);
//   const valid = await bcrypt.compare(req.body.password, result[0].password);

//   const token = jwt.sign({
//     id: result[0].kode_user,
//     status: result[0].status
//   }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });


//   console.log(token)
//   res.status(200).json({
//     data: result,
//     'x-access-token': token
//   })
// })
// router.post('/', async (req, res) => {

//   const header = req.headers.authorization
//   // console.log(req.headers)

//   if (header) {
//     const token = header.split(' ')[1];

//     const decode = jwt.decode(token)
//     console.log(decode)
//     const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//     if (!result) {
//       console.log('error')
//     }
//     console.log(result)
//     res.status(200).json({
//       message: 'success login'
//     });
//     return
//   }

//   res.status(400).json({
//     message: 'bad request'
//   })
// })

router.post('/login', login);

// router.get('/'. (req))

module.exports = router;