const mkdirp = require('mkdirp');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const uploadDir = './uploads';
const db = new lowdb(new FileSync('db.json'));

// Seed an empty DB
db.defaults({ uploads: [] }).write();

// Ensure upload directory exists
mkdirp.sync(uploadDir);

module.exports = { db, uploadDir };
