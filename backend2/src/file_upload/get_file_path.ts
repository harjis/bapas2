import mkdirp from "mkdirp";

const uploadDir = './uploads';

// Ensure upload directory exists
mkdirp.sync(uploadDir);

export const getFilePath = (id) => `${uploadDir}/${id}.txt`;
