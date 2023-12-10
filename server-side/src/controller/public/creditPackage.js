// const { findAllByDp } = require("../../models/public/creditPackages");


// async function findAll(req, res) {
//   try {
//     const query = req.query;

//     if (!query.uangMuka) throw new Error('Query is Null');

//     const [result] = await findAllByDp(query.uangMuka);

//     if(result.)

//   } catch (err) {
//     if (err.message === 'Query is Null') {
//       res.status(400).json({
//         status: 'BAD_REQUEST',
//         error: 'Query must not be null'
//       });
//     }
//   }
// }