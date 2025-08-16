import bcrypt from "bcrypt";

export const hashPassword = async (data: string, saltOrRounds: number) => {
  return bcrypt.hash(data, saltOrRounds);
}