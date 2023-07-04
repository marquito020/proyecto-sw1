import { Request, Response } from "express";
import AuthService from "../services/auth.service.js";

const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await AuthService.registerNewUser({
      name,
      email,
      password,
    });

    if (!newUser)
      return res.status(400).json({ message: "The email already exist" });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login({ email, password });

    if (!user)
      return res.status(400).json({ message: "Email or Password incorrect" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default {
  registerNewUser,
  login,
  logout,
};
