import { Router } from "express";
import {
  createUser,
  checkUser,
  getCurrentUser,
  getAllUsers,
  removeUser
} from "../controllers/user.controller.ts";

const router = Router();

router.post("/createUser", createUser);
router.post("/checkUser", checkUser);
router.get("/getCurrentUser", getCurrentUser);
router.get("/getAllUsers", getAllUsers);
router.delete("/removeUser/:id", removeUser)

export default router;