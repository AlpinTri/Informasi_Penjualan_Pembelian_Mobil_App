require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

// Import Middleware
// const corsOptions = {
//    origin:'http://localhost:5173/', 
//    credentials:true,            
//    optionSuccessStatus:200,
// }

// Multer Error
const { MulterError } = require('multer');

// Import Routes
const userRoutes = require('./src/routes/private/user');
const carRoutes = require('./src/routes/private/car');
const customerRoutes = require('./src/routes/private/customer');
const creditPackageRoutes = require('./src/routes/private/creditPackage');
const creditRoutes = require('./src/routes/private/credit');
const cashRoutes = require('./src/routes/private/cash');
const installmentPaymentRoutes = require('./src/routes/private/installmentPayment');
const authRoutes = require('./src/routes/auth');
const countDataRoutes = require('./src/routes/private/countData');

const publicCarsRoutes = require('./src/routes/public/car');
const { authentication } = require('./src/middleware/auth');


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173/");
    next();
});

// Public Routes
app.use('/api/v1/cars', publicCarsRoutes);
// app.use('/api/v1/credit-package',)

// Public Image Middleware
app.use('/api/v1/assets', express.static('public/images/car'));

// Authentication Route
app.use('/api/auth', authRoutes);

// Private Image Middleware
app.use('/api/assets/images/cars', express.static('public/images/car'));
app.use('/api/assets/images/customers', express.static('public/images/customer'));
app.use('/api/assets/images/credits', express.static('public/images/credit'));
app.use('/api/assets/images/cashes', express.static('public/images/cash'));

// Middleware Authentication
app.use(authentication);

// Private Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/credit-packages', creditPackageRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/cashes', cashRoutes);
app.use('/api/installment-payments', installmentPaymentRoutes);
app.use('/api/counts', countDataRoutes);


// Error Handling
app.use((err, req, res, next) => {
  if (err instanceof MulterError) {
    res.status(400).json({
      status: 400,
      message: err.message
    })
    return;
  }

  console.log('This code is run')
})




// Running Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running now on ${process.env.PORT}`);
});
