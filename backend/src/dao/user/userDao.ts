import { generateRes } from "../../utils/generateRes";
const db = require("../../../db/models/index");

class UserDao {
  private users: any;

  constructor() {
    this.users = db.users;
  }

  getUserByUserId = async (userId: string) => {
    const user = await this.users.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'phone', 'email', 'address', 'createdAt', 'updatedAt']
    });

    return generateRes(user);
  };
}

export default UserDao;
