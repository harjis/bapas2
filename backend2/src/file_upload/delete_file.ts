import { unlinkSync } from "fs";
import { getFilePath } from "./get_file_path";
import { getManager } from "typeorm";
import { File } from "../entities/File";

export const deleteFile = async (id) => {
  await deleteFileFromFilesystem({ id });
  return getManager().delete(File, id);
};

const deleteFileFromFilesystem = async ({ id }) => {
  try {
    unlinkSync(getFilePath(id));
  } catch (e) {
    return false;
  }

  return true;
};
