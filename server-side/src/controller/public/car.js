const { findAll, getAll, findOne } = require("../../models/public/cars");

async function getCars(req, res) {
  try {

    const [cars] = await getAll();

    if (!cars || !cars.length) throw new Error('Cars Not Found');

    res.status(200).json({
      status: 'OK',
      data: cars
    });

  } catch (err) {

    console.log(err);

    if (err.message === 'Cars Not Found') {
      res.status(404).json({
        error: 'Cars not found'
      });
    } else {
      res.status(500).json({
        error: 'Internal server error'
      });
    }

  }
}

async function searchCars(req, res) {
  try {
    const query = req.query;
    // console.log(query)

    if (!Object.keys(query).length) throw new Error('Query is Null');
    
    const [cars] = await findAll(query);

    if (!cars.length) throw new Error('Cars Not Found');

    res.status(200).json({
      status: 'OK',
      data: cars
    });
     
  } catch (err) {
    
    // console.debug(err);

    if (err.message === 'Query is Null') {
      res.status(400).json({
        error: {
          code: 400,
          message: 'Query must not be null'
        }
      });
    } else if (err.message === 'Cars Not Found') {
      res.status(404).json({
        error: {
          code: 404,
          message: 'Cars not found'
        }
      });
    } else {
      res.status(500).json({
        error: {
          code: 500,
          message: 'Internal server error'
        }
      });
    }

  }
}

async function findCar(req, res) {
  try {
    
    const { kodeMobil } = req.params;

    const [car] = await findOne(kodeMobil);

    if (!car.length) throw new Error('Cars Not Found');

    res.status(200).json({
      status: 'OK',
      data: car
    });

  } catch (err) {

    console.log(err);

    if (err.message === 'Car Not Found') {
      res.status(404).json({
        error: 'Car not found'
      });
    } else {
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
}


module.exports = {
  getCars,
  searchCars,
  findCar
}