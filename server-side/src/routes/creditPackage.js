const express = require('express');
const router = express.Router();

const { getCreditPackages, findCreditPackage, createCreditPackage, updateCreditPackage, deleteCreditPackage } = require('../controller/creditPackage');

// Import Middleware
const { authentication, admin } = require('../middleware/auth');

// Credit Packages Routes
// middleware
router.use(authentication, admin)

// get methods
router.get('/', getCreditPackages);
router.get('/:kodePaket', findCreditPackage);

// post methods
router.post('/', createCreditPackage);

// put methods
router.put('/:kodePaket', updateCreditPackage);

// delete methods
router.delete('/:kodePaket', deleteCreditPackage);

module.exports = router;