const { unlinkSync } = require('fs');
const { db, uploadDir } = require('./init');

const getFilePath = (id) => `${uploadDir}/${id}.txt`;

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

module.exports = deleteFile;