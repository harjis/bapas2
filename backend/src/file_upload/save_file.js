const { createWriteStream } = require('fs');
const { getFilePath } = require('./init');

const saveFileToFilesystem = async (id, stream) => {
  const path = getFilePath(id);
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve())
      .on('error', reject),
  );
};

const saveFile = async (ctx, info, upload) => {
  const { stream, filename, mimetype, encoding } = await upload;
  const file = await ctx.db.mutation.createFile(
    {
      data: {
        hasBeenProcessed: false, filename, mimetype, encoding
      }
    },
    info
  );
  await saveFileToFilesystem(file.id, stream);
  return { id: file.id, filename, mimetype, encoding }
};

module.exports = saveFile;
