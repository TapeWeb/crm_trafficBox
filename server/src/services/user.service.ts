import { prisma } from "../config/database";
import { generateToken } from "../utils/generateToken.utils.ts";
import { hashPassword } from "../utils/hashPassword.utils.ts";
import { checkData } from "../utils/checkData.utils.ts";
import { CreateUserData, CheckUserData } from "../types/user.types.ts";

export const createUser = async (data: CreateUserData) => {
  const { name, surname, email, password, gender, age } = data;

  if (!password) throw new Error("Password is required");
  if (age < 16) throw new Error("User must be at least 16 years old");

  const exists = await prisma.users.findUnique({ where: { uemail: email } });
  if (exists) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(password, 10);
  const tokenGenerate = await generateToken(32, "hex");

  const user = await prisma.users.create({
    data: {
      uname: name,
      usurname: surname,
      uemail: email,
      upassword: hashedPassword,
      ugender: gender,
      uage: age,
      utoken: tokenGenerate,
    },
  });


  return { token: user.utoken, message: "User successfully created" };
};

export const checkUser = async (data: CheckUserData) => {
  const { email, password } = data;

  if (!password) throw new Error("Password is required");

  const user = await prisma.users.findUnique({ where: { uemail: email } });
  if (!user) throw new Error("User not found");

  const match = await checkData(password, user.upassword);
  if (!match) throw new Error("Invalid credentials");

  return { token: user.utoken, message: "Login successfully" };
};

export const getUser = async (token: string) => {
  const user = await prisma.users.findFirst({ where: { utoken: token } });
  if (!user) throw new Error("User not found");

  return {
    id: user.uid,
    name: user.uname,
    surname: user.usurname,
    email: user.uemail,
    age: user.uage,
    gender: user.ugender,
  };
};