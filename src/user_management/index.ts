import { Image, User } from "../db";
import UserManagementDAO from "./dao";

const userManagementDAO = new UserManagementDAO();

class UserManagementService {

  static async getUserByEmail(email: string): Promise<User> {
    return userManagementDAO.getUserByEmail(email);
  }

  static async createUser(user: User): Promise<string> {
    const userId = await userManagementDAO.createUser(user);
    return userId;
  }
}

export default UserManagementService;