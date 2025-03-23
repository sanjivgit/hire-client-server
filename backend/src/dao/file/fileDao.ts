const db = require("../../../db/models/index");

class FileDao {
  private files: any;
  private users: any;

  constructor() {
    this.files = db.files;
    this.users = db.users;
  }

  createFile = async (data: {
    file_path: string;
  }) => {

    try {
      const file = await this.files.create(data);
     
      return file;
    } catch (error) {
      throw error;
    }
  };

  getFileById = async (id: number) => {
    return await this.files.findByPk(id);
  };
}

export default FileDao; 