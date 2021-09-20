import DAO, { Image, User } from '../db';

class ImageManagementDAO extends DAO {
  readonly imageTable: string = 'images';

  async getAllImages(): Promise<Image[]> {
    const results = await this.query(`SELECT * FROM ${this.imageTable} ORDER BY created_date ASC;`);
    return results.rows;
  }

  async getImagesByUserId(userId: string): Promise<Image[]> {
    const query = `SELECT * FROM ${this.imageTable} WHERE user_id = $1 ORDER BY created_date ASC;`;

    const results = await this.query(query, [userId]);
    return results.rows;
  }

  async createImage(imageInfo: Image): Promise<string> {
    const query = `INSERT INTO ${this.imageTable} (link, user_id) values ($1, $2) RETURNING id;`;
    const values = [imageInfo.link, imageInfo.user_id];
    
    const results = await this.query(query, values);
    return results.rows[0].id;
  }

  async deleteImage(imageId: string): Promise<string> {
    const query = `DELETE FROM ${this.imageTable} WHERE id = $1 RETURNING id;`;
    const values = [imageId];
    
    const results = await this.query(query, values);
    return results.rows[0].id;
  }
}

export default ImageManagementDAO;