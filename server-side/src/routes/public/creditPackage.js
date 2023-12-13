const express = require('express');
const { getCreditPackages } = require('../../controller/public/creditPackage');
const router = express.Router();

// Get
router.get('/', getCreditPackages);

module.exports = router;
