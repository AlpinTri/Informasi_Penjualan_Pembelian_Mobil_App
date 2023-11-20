const express = require('express');
const router = express.Router();

// Import Middleware
const { authentication, admin, adminAndFinance } = require('../middleware/auth');

// Import Controller
const { getInstallmentPayments, findInstallmentPayment, createInstallmentPayment } = require('../controller/installmentPayment');

// Pembayaran Cicilan Methods
// get methods
router.get('/', getInstallmentPayments);
router.get('/:kodeCicilan', findInstallmentPayment);

// post methods
router.post('/', createInstallmentPayment);


module.exports = router;
