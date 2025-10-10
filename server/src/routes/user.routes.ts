import { Router } from "express";
import {
  createUser,
  checkUser,
  getCurrentUser,
  getAllUsers,
  getUserRole,
  removeUser
} from "../controllers/user.controller.ts";

const router = Router();

router.post("/createUser", createUser);
router.post("/checkUser", checkUser);
router.get("/getCurrentUser", getCurrentUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserRole/:id", getUserRole)
router.delete("/removeUser/:id", removeUser)

export default router;