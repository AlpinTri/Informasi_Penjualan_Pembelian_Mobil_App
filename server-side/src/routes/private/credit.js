const express = require('express');
const router = express.Router();

const { getCredits, findCredit, createCredit, updateCredit, deleteCredit, getTransactions, getSpecificTransaction } = require('../../controller/private/credit');
const { upload } = require('../../middleware/multer/creditMulter');

// Import Middleware
const { admin, adminAndSales, allAdmin } = require('../../middleware/auth');

// Credit Routes
// middleware
router.use(allAdmin)

// get methods
router.get('/', getCredits);
router.get('/transactions', getTransactions);
router.get('/transactions/:kodeKredit', getSpecificTransaction);
router.get('/:kodeKredit', findCredit);

// post methods
router.post('/', upload.fields([{ name: 'KTP', maxCount: 1 }, { name: 'KK', maxCount: 1 }, { name: 'slipGaji', maxCount: 1 }]), adminAndSales, createCredit);

// put methods
router.put('/:kodeKredit', upload.fields([{ name: 'KTP', maxCount: 1 }, { name: 'KK', maxCount: 1 }, { name: 'slipGaji', maxCount: 1 }]), adminAndSales, updateCredit);

// delete methods
router.delete('/:kodeKredit', admin, deleteCredit);



module.exports = router;