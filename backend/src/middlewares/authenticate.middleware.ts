import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.utils.js";

const { JsonWebTokenError, TokenExpiredError } = jsonwebtoken

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) return res.status(401).json({ error: "Send a JWT" });

    const jwt = bearerHeader.split(" ").pop(); // ["Bearer", "010101"]
    const isUser = verifyToken(`${jwt}`); // {_id: 1, email: "", iat: , exp: }

    if (!isUser) return res.status(401).json({ error: "JWT not valid" });

    req.body.user = isUser;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(400).json({ error: error.message });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(400).json({ error: "JWT malformed", e: error });
    }

    res.status(500).json(error);
  }
};

export { authenticate };
