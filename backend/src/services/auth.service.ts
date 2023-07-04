import { Auth } from "../interfaces/auth.interface.js";
import { User } from "../interfaces/user.intefaces.js";
import UserModel from "../models/user.model.js";
import { bcrypt, verify } from "../utils/bcrypt.utils.js";
import { generateToken } from "../utils/jwt.utils.js";

const registerNewUser = async ({ name, email, password }: User) => {
  const existUser = await UserModel.findOne({ email });
  if (existUser) return null;

  const passwordHash = await bcrypt(password);
  const newUser = await UserModel.create({
    name,
    email,
    password: passwordHash,
  });

  return newUser;
};

const login = async ({ email, password }: Auth) => {
  const userFound = await UserModel.findOne({ email });
  if (!userFound) return null;

  const passwordHash = userFound.password;
  const isCorrect = await verify(password, passwordHash);
  if (!isCorrect) return null;

  const token = generateToken(userFound);
  const data = {
    token,
    user: { _id: userFound._id, email: userFound.email, name: userFound.name },
  };

  return data;
};

export default {
  registerNewUser,
  login,
};
