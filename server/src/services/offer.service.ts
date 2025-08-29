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
      ouid: user.id,
      oname: oName,
      odescribe: oDescribe,
      oprice: oPrice,
      ovalues: oValues,
    },
  });
};

export const getOffersByUser = async (uid: number) => {
  return prisma.offers.findMany({ where: { ouid: uid } });
};

export const deleteOffer = async (oid: number) => {
  const deleted = await prisma.offers.deleteMany({ where: { oid } });
  if (deleted.count === 0) throw new Error("Offer not found");
};


export const getAllOffers = async () => {
  return prisma.offers.findMany();
};