import { Router } from "express";
import {
  createUser,
  checkUser,
  getUser, getAllUsers, removeUser
} from "../controllers/user.controller.ts";

const router = Router();

router.post("/create-user", createUser);
router.post("/check-user", checkUser);
router.post("/get-user", getUser);
router.get("/get-all-users", getAllUsers);
router.delete("/remove-user/:uid", removeUser)

export default router;