import crypto from "crypto"

export const generateToken = async (size: number, encoding: any) => {
  return crypto.randomBytes(size).toString(encoding);
}