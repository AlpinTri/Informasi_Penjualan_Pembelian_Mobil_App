const express = require('express');
const router = express.Router();

// Import Middleware
const { admin, adminAndSales, allAdmin } = require('../../middleware/auth');

// Import Controller
const { getCashes, findCash, createCash, updateCash, deleteCash, getSpesificTransaction, getTransactions } = require('../../controller/private/cash');
const { upload } = require('../../middleware/multer/cashMulter');

// Cash Routes
// middleware
router.use(allAdmin);

// get methods
router.get('/', getCashes);
router.get('/transactions', getTransactions);
router.get('/transactions/:kodeCash', getSpesificTransaction);
router.get('/:kodeCash', findCash);

router.use(adminAndSales);
// post methods
router.post('/', upload.single('KTP'), createCash);

// put methods
router.put('/:kodeCash', upload.single('KTP'), updateCash);

// delete methods
router.delete('/:kodeCash', admin, deleteCash);

module.exports = router;