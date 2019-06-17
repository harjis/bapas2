import fileUtils from '../../file_upload';
import { File } from "../../entities/File";

type AddFileArgs = { file: any };
type DeleteFileArgs = { id: number };
type ProcessFileArgs = { id: number };
const fileMutations = {
  addFile(_: void, args: AddFileArgs): Promise<File> {
    return fileUtils.saveFile(args.file);
  },
  deleteFile(_: void, args: DeleteFileArgs) {
    return fileUtils.deleteFile(args.id).then(result => ({ count: result.affected }));
  },
  processFile(_: void, args: ProcessFileArgs) {

  }
};
