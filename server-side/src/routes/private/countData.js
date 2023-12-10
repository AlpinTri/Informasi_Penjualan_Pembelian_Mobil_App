const express = require('express');
const { countAllTransactions, countMaster } = require('../../controller/private/countData');
const router = express.Router();

router.get('/transactions', countAllTransactions);
router.get('/master', countMaster)

module.exports = router;