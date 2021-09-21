import { Image } from "../db";

export const getImages = (userId: string, files: Express.MulterS3.File[]): Image[] => {
  return files.map(file => new Image(file.location, userId, file.key));
};