import { Router } from "express";
import {
  createOffer,
  deleteOffer,
  getMyOffers,
  getAllOffers,
} from "../controllers/offer.controller.ts";

const router = Router();

router.post("/createOffer", createOffer);
router.get("/getAllOffers", getAllOffers);
router.get("/getMyOffers", getMyOffers);
router.delete("/deleteOffer/:id", deleteOffer);

export default router;