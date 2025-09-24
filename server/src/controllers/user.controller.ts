import  { Request, Response } from "express";
import * as userService from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password, gender, age } = req.body;
    const result = await userService.createUser({ name, surname, email, password, gender, age, balance: 0 });
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const checkUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.checkUser({ email, password });
    res.json(result);
  } catch (err: any) {
    console.error("Login error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.query as { token?: string };
    if (!token) return res.status(400).json({ error: "Token is required" });

    const user = await userService.getCurrentUser(token);
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};



export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    const mappedUsers = users.map((user: any) => ({
      id: user.id,
      name: user.name,
      surname: user.surname,
      age: user.age,
      email: user.email,
      gender: user.gender,
      role: user.role,
      balance: user.balance,
    }));

    res.json(mappedUsers);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const removeUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await userService.removeUser({ id });
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
