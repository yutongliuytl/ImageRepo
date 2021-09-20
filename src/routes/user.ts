import express from "express";
import "dotenv/config";

import UserManagementService from "../user_management";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const results = await UserManagementService.getUserByEmail(email);
    res.status(200).json(results);
  }
  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userInfo = req.body.userInfo;
    // Hash password?
    const userId = await UserManagementService.createUser(userInfo);
    res.status(200).json({ message: "User created successfully.", userId });
  }
  catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;