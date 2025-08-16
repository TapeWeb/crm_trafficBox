import { prisma } from "../config/database";
import bcrypt from "bcrypt";
import crypto from "crypto";

interface CreateUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  gender: string;
  age: number;
}

interface CheckUserData {
  email: string;
  password: string;
}

export const createUser = async (data: CreateUserData) => {
  const { name, surname, email, password, gender, age } = data;

  if (!password) throw new Error("Password is required");
  if (age < 16) throw new Error("User must be at least 16 years old");

  const exists = await prisma.users.findFirst({ where: { uEmail: email } });
  if (exists) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString("hex");

  const user = await prisma.users.create({
    data: {
      uName: name,
      uSurname: surname,
      uEmail: email,
      uPassword: hashedPassword,
      uGender: gender,
      uAge: age,
      uToken: token,
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

  const match = await bcrypt.compare(password, user.uPassword);
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
