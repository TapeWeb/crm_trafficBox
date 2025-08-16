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
    const { token } = req.body; // можно передавать в headers.authorization
    const user = await userService.getUser(token);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
