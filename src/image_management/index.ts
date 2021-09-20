import { User, Image } from '../db';
import ImageManagementDAO from "./dao";

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

  static async createImage(imageInfo: Image): Promise<string> {
    const imageId = await imageManagementDAO.createImage(imageInfo);
    return imageId;
  }

  static async deleteImage(imageId: string): Promise<string> {
    const id = await imageManagementDAO.deleteImage(imageId);
    return id;
  }
}

export default ImageManagementService;