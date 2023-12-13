function isRequestBodyValid(req, res, next) {

  const data = req.body;

  if (data instanceof Array || Object.keys(data).length === 0 || !data || typeof data !== 'object') {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({
      status: 400,
      message: 'request body must an object'
    });

    return;
  }
  
  if (!data.nama || !data.jenisKelamin || !data.telp || !data.password || !data.status) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({
        status: 400,
        message: "request body must have properties 'nama', 'jenisKelamin', 'telp', 'password', and 'status'"
    });
    
    return;
  }

  next();
}




module.exports = {
  isRequestBodyValid,
}