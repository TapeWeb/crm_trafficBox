import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password, gender, age } = req.body;
    const result = await userService.createUser({ name, surname, email, password, gender, age });
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
    res.status(400).json({ error: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const user = await userService.getUser(token);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    const mappedUsers = users.map((user) => ({
      uid: user.uid,
      name: user.uname,
      surname: user.usurname,
      age: user.uage,
      email: user.uemail,
      gender: user.ugender,
      role: user.urole,
    }));

    res.json(mappedUsers);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};


export const removeUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const result = await userService.removeUser({ id: Number(uid) });
    res.status(200).json({ message: "User deleted successfully", result });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
