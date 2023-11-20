const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images/credit');
  },
  filename: (req, file, callback) => {
    const fileName = uuid.v4() + path.extname(file.originalname);
    callback(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = {
  upload,
};