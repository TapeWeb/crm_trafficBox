import { Request, Response } from "express";
import * as offerService from "../services/offer.service.ts";

export const createOffer = async (req: Request, res: Response) => {
  try {
    const offer = await offerService.createOffer(req.body);
    res.status(201).json(offer);
  } catch (err: any) {
    res.status(400).json({message: err.message});
  }
}

export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const offers = await offerService.getAllOffers();
    res.status(200).json(offers);
  } catch (err: any) {
    res.status(400).json({message: err.message});
  }
}

export const getMyOffers = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.query.id);
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const offers = await offerService.getOffersByUser(userId);
    res.status(200).json(offers);
  } catch (err: any) {
    console.error("getMyOffers error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    if (!id) return res.status(400).json({ message: "Offer ID is required" });

    await offerService.deleteOffer(Number(id));
    res.status(200).json({ message: "Offer deleted successfully." });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
