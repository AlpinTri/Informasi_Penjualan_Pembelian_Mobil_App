const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
  try {
    const header = req.headers.authorization || req.headers.Authorization;

    if (!header) throw new Error('MISSING_AUTHENTICATION_ERROR');

    const token = header.split(' ')[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: 401,
        error: "TOKEN_EXPIRED"
      });
    } else if (err.message === 'MISSING_AUTHENTICATION_ERROR') {
      res.status(401).json({
        status: 401,
        error: "MISSING_AUTHENTICATION_CREDENTIALS"
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
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
    res.status(500).json({
      status: 500,
      error: 'INTERNAL_SERVER_ERROR'
    });
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
    res.status(500).json({
      status: 500,
      error: 'INTERNAL_SERVER_ERROR'
    });
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
    res.status(500).json({
      status: 500,
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
}

module.exports = {
  authentication,
  allAdmin,
  adminAndFinance,
  adminAndSales,
  admin
}