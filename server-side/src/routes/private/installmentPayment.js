const express = require('express');
const router = express.Router();

// Import Middleware
const { adminAndFinance, admin } = require('../../middleware/auth');

// Import Controller
const { getInstallmentPayments, findInstallmentPayment, createInstallmentPayment, deleteInstallmentPayment } = require('../../controller/private/installmentPayment');

// Middleware
router.use(adminAndFinance)

// Pembayaran Cicilan Methods
// get methods
router.get('/', getInstallmentPayments);
router.get('/:kodeCicilan', findInstallmentPayment);

// post methods
router.post('/', admin, createInstallmentPayment);

// put methods


// delete methods
router.delete('/:kodeCicilan', deleteInstallmentPayment);
module.exports = router;
