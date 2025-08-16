import { prisma } from "../config/database";
import { generateToken } from "../utils/generateToken.utils.ts";
import { hashPassword } from "../utils/hashPassword.utils.ts";
import { checkData } from "../utils/checkData.utils.ts";
import { CreateUserData, CheckUserData } from "../types/user.types.ts";

export const createUser = async (data: CreateUserData) => {
  const { name, surname, email, password, gender, age } = data;

  if (!password) throw new Error("Password is required");
  if (age < 16) throw new Error("User must be at least 16 years old");

  const exists = await prisma.users.findFirst({ where: { uEmail: email } });
  if (exists) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(password, 10);
  const tokenGenerate = await generateToken(32, "hex");

  const user = await prisma.users.create({
    data: {
      uName: name,
      uSurname: surname,
      uEmail: email,
      uPassword: hashedPassword,
      uGender: gender,
      uAge: age,
      uToken: tokenGenerate,
    },
  });

  return { token: user.uToken, message: "User successfully created" };
};

export const checkUser = async (data: CheckUserData) => {
  const { email, password } = data;

  if (!password) throw new Error("Password is required");

  const user = await prisma.users.findFirst({ where: { uEmail: email } });
  if (!user) throw new Error("User not found");
  if (!user.uPassword) throw new Error("User password missing in DB");

  const match = await checkData(password, user.uPassword);
  if (!match) throw new Error("Invalid credentials");

  return { token: user.uToken, message: "Login successfully" };
};

export const getUser = async (token: string) => {
  const user = await prisma.users.findFirst({ where: { uToken: token } });
  if (!user) throw new Error("User not found");

  return {
    id: user.uID,
    name: user.uName,
    surname: user.uSurname,
    email: user.uEmail,
    age: user.uAge,
    gender: user.uGender,
  };
};
