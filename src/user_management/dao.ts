import DAO, { User } from '../db';

class UserManagementDAO extends DAO {

  readonly userTable: string = 'users';

  async getUserByEmail(email: string): Promise<User> {
    const query = `SELECT * FROM ${this.userTable} WHERE email = $1;`;
    const values = [email];

    const results = await this.query(query, values);
    return results.rows[0];
  }

  async createUser(user: User): Promise<string> {
    const query = `INSERT INTO ${this.userTable} (email, hashed_password, description, last_login_date)
    values ($1, $2, $3, $4) RETURNING id;`;

  const values = [
    user.email,
    user.hashed_password,
    user.description,
    user.last_login_date,
  ];

  const results = await this.query(query, values);
  return results.rows[0].id;
  }
}

export default UserManagementDAO;