import express from "express";
import "dotenv/config";

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

router.post("/", async (req, res) => {
  try {
    // Upload to S3
    const imageInfo = req.body.imageInfo;
    const imageId = await ImageManagementService.createImage(imageInfo);
    res.status(200).json({ message: "Image uploaded successfully.", imageId });
  }
  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/:imageId", async (req, res) => {
  try {
    const imageId = req.params.imageId;
    await ImageManagementService.deleteImage(imageId);
    res.status(200).json({ message: "Image deleted successfully.", imageId});
  }
  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;