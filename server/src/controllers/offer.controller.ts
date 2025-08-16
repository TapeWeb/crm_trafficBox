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

export const checkOffers = async (req: Request, res: Response) => {
  try {
    const offers = await offerService.getAllOffers();
    res.status(200).json(offers);
  } catch (err: any) {
    res.status(400).json({message: err.message});
  }
}

export const checkMyOffers = async (req: Request, res: Response) => {
  try {
    const offers = await offerService.getOffersByUser(req.body.id);
    res.status(200).json(offers);
  } catch (err: any) {
    res.status(400).json({message: err.message});
  }
}

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    await offerService.deleteOffer(req.body.oID);
    res.status(200).json({message: "Offer deleted successfully."});
  } catch (err: any) {
    res.status(400).json({message: err.message});
  }
}