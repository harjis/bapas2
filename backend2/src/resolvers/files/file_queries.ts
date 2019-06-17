import { File } from "../../entities/File";
import { getManager } from "typeorm";

const fileQueries = {
  files(_: void, args: void): Promise<File[]> {
    return getManager().find(File);
  }
};

export default fileQueries;
