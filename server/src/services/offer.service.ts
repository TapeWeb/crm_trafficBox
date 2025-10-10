import { prisma } from "../config/database";
import { getCurrentUser as getUserService } from "../services/user.service";
import { CreateOfferData } from "../types/offer.types";

export const createOffer = async (data: CreateOfferData) => {
  const { name, description, price, value, token } = data;

  if (!token) throw new Error("Token is required");

  const user = await getUserService(token);
  if (!user) throw new Error("User ID not found");

  return prisma.offers.create({
    data: {
      uid: user.id,
      name: name,
      description: description,
      price: price,
      value: value,
    },
  });
};

export const getOffersByUser = async (userId: number) => {
  return prisma.offers.findMany({ where: { uid: userId } });
};

export const deleteOffer = async (id: number) => {
  const deleted = await prisma.offers.deleteMany({ where: { id } });
  if (deleted.count === 0) throw new Error("Offer not found");
};


export const getAllOffers = async () => {
  return prisma.offers.findMany();
};