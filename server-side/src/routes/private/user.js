const express = require('express');
const router = express.Router();

// Import Middleware
const { isRequestBodyValid } = require('../../middleware/validation request payload/user');
// const { upload } = require('../middleware/multer/carMulter');
const { admin } = require('../../middleware/auth');

// Import Controller
const { getUsers, getUsersById, createUser, updateUser, deleteUser } = require('../../controller/private/user');

// User Routes
router.use(admin);

// get method
router.get('/', getUsers);
router.get('/:kodeUser', getUsersById);

// post method
router.post('/', isRequestBodyValid, createUser);

// put method
router.put('/:kodeUser', isRequestBodyValid, updateUser);

// delete method
router.delete('/:kodeUser', deleteUser);


module.exports = router;