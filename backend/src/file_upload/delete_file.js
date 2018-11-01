const { unlinkSync } = require('fs');
const { getFilePath } = require('./init');

const deleteFile = async (id, ctx) => {
  await deleteFileFromFilesystem({ id });
  return ctx.db.mutation.deleteFile({ where: { id } })
};

const deleteFileFromFilesystem = async ({ id }) => {
  try {
    unlinkSync(getFilePath(id));
  } catch (e) {
    return false;
  }

  return true;
};

module.exports = deleteFile;
