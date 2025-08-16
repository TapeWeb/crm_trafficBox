import bcrypt from "bcrypt";

export const checkData = async (data: string, encrypting: string) => {
  return bcrypt.compare(data, encrypting);
}