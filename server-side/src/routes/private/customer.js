const express = require('express');
const router = express.Router();

// Import Multer Customer
const {upload} = require('../../middleware/multer/customerMulter')

// Import Middleware
const { admin, adminAndSales } = require('../../middleware/auth');

// Import Controller
const { getCustomers, findCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../../controller/private/customer');

// Middleware  Admin & Sales
router.use(adminAndSales);

// Customer Routes
// get methods
router.get('/', getCustomers);
router.get('/:nik', findCustomer);

// post methods
router.post('/', upload.single('foto'), createCustomer);

// put methods
router.put('/:nik', upload.single('foto'), updateCustomer);

// delete methods
router.delete('/:nik', admin, deleteCustomer);


module.exports = router;