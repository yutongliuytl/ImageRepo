import { User, Image } from '../db';
import ImageManagementDAO from "./dao";
import { getImages } from './utils';
import { deleteImage } from '../utils/imageMiddleware';

const imageManagementDAO = new ImageManagementDAO();

class ImageManagementService {

  static async getAllImages(): Promise<Image[]> {
    const images = await imageManagementDAO.getAllImages();
    return images;
  }

  static async getImagesByUserId(user: User): Promise<Image[]> {
    const images = await imageManagementDAO.getImagesByUserId(user.id);
    return images;
  }

  static async createImages(userId: string, files: Express.MulterS3.File[]): Promise<void> {
    if (!files) {
      throw new Error('No files uploaded.');
    }
    const images = getImages(userId, files);
    await imageManagementDAO.createImages(images);
  }

  static async deleteImage(key: string): Promise<void> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: key
    };
    
    deleteImage(params, async (err,data) => {
      await imageManagementDAO.deleteImage(key);
    });
  }
}

export default ImageManagementService;