import express from "express";
import "dotenv/config";

import { upload } from '../utils/imageMiddleware';
import ImageManagementService from "../image_management";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const results = await ImageManagementService.getAllImages();
    res.status(200).json(results);
  }
  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/upload', upload.array('photos', 10), (req, res) => {
  res.send('Successfully uploaded ' + req.files?.length+ ' files!');
});

router.post("/", upload.array('photos', 10), async (req, res) => {
  try {
    const userId = req.body.userId;
    const files = req.files as Express.MulterS3.File[];
    await ImageManagementService.createImages(userId, files);
    res.status(200).json({ message: "Images uploaded successfully." });
  }
  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const imageId = await ImageManagementService.deleteImage(key);
    res.status(200).json({ message: "Image deleted successfully.", imageId});
  }
  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;