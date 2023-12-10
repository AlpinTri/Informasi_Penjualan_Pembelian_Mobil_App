const express = require('express');
const { getCars, searchCars, findCar } = require('../../controller/public/car');
const router = express.Router();

// Get
router.get('/', getCars);
router.get('/search', searchCars);
router.get('/:kodeMobil', findCar);

module.exports = router;
