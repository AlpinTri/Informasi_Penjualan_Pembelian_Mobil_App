const express = require('express');
const router = express.Router();

// Middleware
const { admin, allAdmin } = require('../../middleware/auth');

// Import Multer
const { upload } = require('../../middleware/multer/carMulter');

// Import Controller
const { getCars, findCar, createCar, updateCar, deleteCar } = require('../../controller/private/car');

// Middleware All Admin
router.use(allAdmin);

// Car Routes
// get method
router.get('/', getCars);
router.get('/:kodeMobil', findCar);

// Middleware Super Admin
router.use(admin);

// post method
router.post('/', upload.single('gambar'), createCar);

// put method
router.put('/:kodeMobil', upload.single('gambar'), updateCar);

// delete method
router.delete('/:kodeMobil', deleteCar);


module.exports = router;