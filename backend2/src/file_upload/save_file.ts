import { createWriteStream } from 'fs';
import { getFilePath } from "./get_file_path";
import { File } from "../entities/File";
import { getManager } from "typeorm";

const saveFileToFilesystem = async (id, stream) => {
  const path = getFilePath(id);
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve())
      .on('error', reject),
  );
};

export const saveFile = async (fileUpload) => {
  const { stream, filename, mimetype, encoding } = await fileUpload;
  const file = new File();
  file.hasBeenProcessed = false;
  file.filename = filename;
  file.mimetype = mimetype;
  file.encoding = encoding;
  await getManager().save(File, file);
  await saveFileToFilesystem(file.id, stream);
  return file;
};
