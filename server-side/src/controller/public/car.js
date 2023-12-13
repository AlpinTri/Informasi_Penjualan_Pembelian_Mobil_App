const { findAll, getAll, findOne } = require("../../models/public/cars");

async function getCars(req, res) {
  try {
    const [cars] = await getAll();

    res.status(200).json({
      status: 'OK',
      data: cars
    });

  } catch (err) {
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });

    }
  }
}

async function searchCars(req, res) {
  try {
    const query = req.query;
    // console.log(query)

    if (!Object.keys(query).length) throw new Error('QUERY_NULL');
    
    const [cars] = await findAll(query);

    if (!cars.length) throw new Error('NOT_FOUND_ERROR');

    res.status(200).json({
      status: 'OK',
      data: cars
    });
     
  } catch (err) {
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else if(err.message === 'NOT_FOUND_ERROR') {
      res.status(404).json({
        status: 404,
        error: 'DATA_NOT_FOUND'
      }); 

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });

    }

  }
}

async function findCar(req, res) {
  try {
    
    const { kodeMobil } = req.params;

    if (!kodeMobil) throw new Error('MISSING_PARAMS_ERROR');

    const [car] = await findOne(kodeMobil);

    if (!car.length) throw new Error('NOT_FOUND_ERROR');

    res.status(200).json({
      status: 'OK',
      data: car
    });

  } catch (err) {
    const expression = /connect ECONNREFUSED/i;

    if (expression.test(err.message)) {
      res.status(500).json({
        status: 500,
        error: 'DATABASE_CONNECTION_ERROR'
      });

    } else if (err.message === 'NOT_FOUND_ERROR') {
      res.status(404).json({
        status: 404,
        error: 'DATA_NOT_FOUND'
      });

    } else if (err.message === 'MISSING_PARAMS_ERROR') {
      res.status(400).json({
        status: 400,
        error: "MISSING_PARAMS 'kodeMobil'"
      });

    } else {
      res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR'
      });
    }
  }
}


module.exports = {
  getCars,
  searchCars,
  findCar
}