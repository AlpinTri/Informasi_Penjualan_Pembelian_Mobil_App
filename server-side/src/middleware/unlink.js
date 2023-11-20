const fs = require('fs/promises');

function removeImage(path, name) {
  return fs.unlink(`public/images/${path}/${name}`);
}

module.exports = {
  removeImage
}