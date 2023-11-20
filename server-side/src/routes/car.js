const express = require('express');
const router = express.Router();

// Middleware
const { authentication, admin } = require('../middleware/auth');

// Import Multer
const { upload } = require('../middleware/multer/carMulter');

// Import Controller
const { getCars, findCar, createCar, updateCar, deleteCar } = require('../controller/car');

// Car Routes
// get method
router.get('/', getCars);
router.get('/:kodeMobil', findCar);

// middleware
router.use(authentication, admin);

// post method
router.post('/', upload.single('gambar'), createCar);

// put method
router.put('/:kodeMobil', upload.single('gambar'), updateCar);

// delete method
router.delete('/:kodeMobil', deleteCar);


module.exports = router;