const express = require('express');
const router = express.Router();

// Import Middleware
const { authentication, admin, adminAndSales } = require('../middleware/auth');

// Import Controller
const { getCashes, findCash, createCash, updateCash, deleteCash, getSpesificTransaction, getTransactions } = require('../controller/cash');
const { upload } = require('../middleware/multer/cashMulter');

// Cash Routes
// middleware
router.use(authentication, adminAndSales);

// get methods
router.get('/', getCashes);
router.get('/transactions', getTransactions);
router.get('/transactions/:kodeCash', getSpesificTransaction);
router.get('/:kodeCash', findCash);

// post methods
router.post('/', upload.single('KTP'), createCash);

// put methods
router.put('/:kodeCash', upload.single('KTP'), updateCash);

// delete methods
router.delete('/:kodeCash', admin, deleteCash);

module.exports = router;