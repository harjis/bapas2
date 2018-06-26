const { createWriteStream } = require('fs');
const shortid = require('shortid');
const { db, getFilePath } = require('./init');

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

module.exports = saveFile;
