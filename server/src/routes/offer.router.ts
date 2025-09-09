import { Router } from "express";
import {
  createOffer,
  checkOffers,
  checkMyOffers,
  deleteOffer,
} from "../controllers/offer.controller.ts";

const router = Router();

router.post("/create-offer", createOffer);
router.post("/check-offers", checkOffers);
router.post("/check-my-offers", checkMyOffers);
router.post("/delete-offer/:id", deleteOffer);

export default router;