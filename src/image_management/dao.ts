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

  async createImages(images: Image[]): Promise<void> {

    const imagesValues = images.map(image => `('${image.link}', '${image.user_id}')`);

    let query = `INSERT INTO ${this.imageTable} (link, user_id, key) values ${imagesValues.join(', ')} RETURNING id;`;
    await this.query(query);
  }

  async deleteImage(key: string): Promise<void> {
    const query = `DELETE FROM ${this.imageTable} WHERE key = $1 RETURNING id;`;
    const values = [key];
    
    await this.query(query, values);
  }
}

export default ImageManagementDAO;