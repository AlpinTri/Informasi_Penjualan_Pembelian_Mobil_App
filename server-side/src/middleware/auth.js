const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
  try {
    const header = req.headers.authorization || req.headers.Authorization;

    if (!header) {
      res.status(401).json({
        code: 401,
        message: "Authentication credentials were missing or incorrect"
      });
      return;
    }

    const token = header.split(' ')[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        code: 401,
        message: "Token expired"
      });
    } else {
      res.status(401).json({
        code: 401,
        message: "Invalid"
      });
    }

  }
}

function adminAndFinance(req, res, next) {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    const token = header.split(' ')[1];

    const { status } = jwt.decode(token);

    if (status !== 'Super Admin' && status !== 'Finance') {
      res.status(403).json({
        code: 403,
        message: 'You do not have permission'
      });
      return;
    }

    next()
  } catch (err) {
    console.log(err.message)
  }
}

function adminAndSales(req, res, next) {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    const token = header.split(' ')[1];

    const { status } = jwt.decode(token);

    if (status !== 'Super Admin' && status !== 'Sales') {
      res.status(403).json({
        code: 403,
        message: 'You do not have permission'
      });
      return;
    }

    next()
  } catch (err) {
    console.error(err.message);
  }
}

function allAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    const token = header.split(' ')[1];

    const { status } = jwt.decode(token);

    if (status !== 'Super Admin' && status !== 'Sales' && status !== 'Finance') {
      res.status(403).json({
        code: 403,
        message: 'You do not have permission'
      });
      return;
    }

    next();
  } catch (err) {
    console.error(err.message);
  }
}

function admin(req, res, next) {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    const token = header.split(' ')[1];

    const { status } = jwt.decode(token);

    if (status !== 'Super Admin') {
      res.status(403).json({
        code: 403,
        message: 'You do not have permission'
      });
      return;
    }

    next();
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  authentication,
  allAdmin,
  adminAndFinance,
  adminAndSales,
  admin
}