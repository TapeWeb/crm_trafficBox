import { prisma } from "../config/database";
import { getUser as getUserService } from "../services/user.service";
import { CreateOfferData } from "../types/offer.types";

export const createOffer = async (data: CreateOfferData) => {
  const { oName, oDescribe, oPrice, oValues, token } = data;

  if (!token) throw new Error("Token is required");

  const user = await getUserService(token);
  if (!user) throw new Error("User ID not found");


  return prisma.offers.create({
    data: {
      oUID: user.id,
      oName,
      oDescribe,
      oPrice,
      oValues,
    },
  });
};



export const getAllOffers = async () => {
  return prisma.offers.findMany();
};

export const getOffersByUser = async (uID: number) => {
  console.log("Hello");
  return prisma.offers.findMany({ where: { oUID: uID } });
};

export const deleteOffer = async (oID: number) => {
  const deleted = await prisma.offers.deleteMany({ where: { oID } });
  if (deleted.count === 0) throw new Error("Offer not found");
};
