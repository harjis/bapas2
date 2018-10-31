const mkdirp = require('mkdirp');

const uploadDir = './uploads';

// Ensure upload directory exists
mkdirp.sync(uploadDir);

const getFilePath = (id) => `${uploadDir}/${id}.txt`;

module.exports = { getFilePath };
