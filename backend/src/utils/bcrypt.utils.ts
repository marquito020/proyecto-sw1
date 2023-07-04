import { hash, compare } from "bcrypt";

const bcrypt = async (password: string) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
};

const verify = async (password: string, passwordHash: string) => {
  const isCorret = await compare(password, passwordHash);
  return isCorret;
};

export { bcrypt, verify };
