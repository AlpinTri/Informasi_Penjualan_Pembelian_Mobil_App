const express = require('express');
const router = express.Router();

const { getCreditPackages, findCreditPackage, createCreditPackage, updateCreditPackage, deleteCreditPackage } = require('../../controller/private/creditPackage');

// Import Middleware
const { admin, allAdmin} = require('../../middleware/auth');

// Middleware All Admin
router.use(allAdmin);

// Credit Packages Routes
// get methods
router.get('/', getCreditPackages);
router.get('/:kodePaket', findCreditPackage);

// Middleware Super Admin
router.use(admin);

// post methods
router.post('/', createCreditPackage);

// put methods
router.put('/:kodePaket', updateCreditPackage);

// delete methods
router.delete('/:kodePaket', deleteCreditPackage);

module.exports = router;