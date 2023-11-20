const express = require('express');
const router = express.Router();

const { getCredits, findCredit, createCredit, updateCredit, deleteCredit } = require('../controller/credit');
const { upload } = require('../middleware/multer/creditMulter');

// Import Middleware
const { authentication, admin, adminAndSales } = require('../middleware/auth');

// Credit Routes
// middleware
router.use(authentication, adminAndSales)

// get methods
router.get('/', getCredits);
router.get('/:kodeKredit', findCredit);

// post methods
router.post('/', upload.fields([{ name: 'KTP', maxCount: 1 }, { name: 'KK', maxCount: 1 }, { name: 'slipGaji', maxCount: 1 }]), createCredit);

// put methods
router.put('/:kodeKredit', upload.fields([{ name: 'KTP', maxCount: 1 }, { name: 'KK', maxCount: 1 }, { name: 'slipGaji', maxCount: 1 }]), updateCredit);

// delete methods
router.delete('/:kodeKredit', admin, deleteCredit);



module.exports = router;