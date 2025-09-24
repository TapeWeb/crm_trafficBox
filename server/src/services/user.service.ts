import { prisma } from "../config/database";
import { generateToken } from "../utils/generateToken.utils.ts";
import { hashPassword } from "../utils/hashPassword.utils.ts";
import { checkData } from "../utils/checkData.utils.ts";
import { CreateUserData, CheckUserData } from "../types/user.types.ts";

export const createUser = async (data: CreateUserData) => {
  const { name, surname, email, password, gender, age } = data;

  if (!password) throw new Error("Password is required");
  if (age < 16) throw new Error("User must be at least 16 years old");

  const exists = await prisma.users.findUnique({ where: { email } });
  if (exists) throw new Error("Email already exists");

  const hashedPassword = await hashPassword(password, 10);
  const tokenGenerate = await generateToken(32, "hex");

  const user = await prisma.users.create({
    data: {
      name,
      surname,
      email,
      password: hashedPassword,
      gender,
      age,
      role: "User",
      balance: 0,
      token: tokenGenerate,
    },
  });

  return { token: user.token, message: "User successfully created" };
};

export const checkUser = async (data: CheckUserData) => {
  const { email, password } = data;

  if (!password) throw new Error("Password is required");

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const match = await checkData(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return { token: user.token, message: "Login successfully" };
};

export const getCurrentUser = async (token: string) => {
  const user = await prisma.users.findFirst({ where: { token } });
  if (!user) throw new Error("User not found");

  return {
    uid: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    age: user.age,
    gender: user.gender,
    role: user.role,
    balance: user.balance,
  };
};


export const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      age: true,
      gender: true,
      role: true,
      balance: true,
    }
  });

  return users as any;
};

export const removeUser = async (data: { id: number }) => {
  const { id } = data;

  const user = await prisma.users.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");

  await prisma.users.delete({ where: { id } });
  return { message: "User deleted" };
};
