const { createWriteStream, unlinkSync } = require('fs');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const uploadDir = './uploads';
const db = new lowdb(new FileSync('db.json'));

// Seed an empty DB
db.defaults({ uploads: [] }).write();

// Ensure upload directory exists
mkdirp.sync(uploadDir);

const getFilePath = (id) => `${uploadDir}/${id}.txt`;

const saveFileToFilesystem = async ({ stream }) => {
  const id = shortid.generate();
  const path = getFilePath(id);

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject),
  );
};

const saveFileToDB = file =>
  db
    .get('uploads')
    .push(file)
    .last()
    .write();

const saveFile = async upload => {
  const { stream, filename, mimetype, encoding } = await upload;
  const { id, path } = await saveFileToFilesystem({ stream });
  return saveFileToDB({ id, filename, mimetype, encoding, path });
};

const deleteFile = async id => {
  await deleteFileFromFilesystem({ id });
  deleteFileFromDB({ id });
  return id;
};

const deleteFileFromFilesystem = async ({ id }) => {
  try {
    unlinkSync(getFilePath(id));
  } catch (e) {
    return false;
  }

  return true;
};

const deleteFileFromDB = id => {
  const upload = db
    .get('uploads')
    .find({ id })
    .value();
  db.get('uploads')
    .remove(upload)
    .write()
};

module.exports = {
  db,
  deleteFile,
  saveFile
};
