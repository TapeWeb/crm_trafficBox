import { Router } from "express";
import {
  createUser,
  checkUser,
  getUser
} from "../controllers/user.controller.ts";

const router = Router();

router.post("/create-user", createUser);
router.post("/check-user", checkUser);
router.post("/get-user", getUser);

export default router;