import { Request, Response, NextFunction } from "express";
import { tokenChecker } from "../utils";

const AuthCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.includes("Bearer ")) {
      res.status(401).json({ message: "Unauthorized:TOKEN_NOT_FOUND" });
      return;
    }

    const token = authHeader.substring(7);
    if (!tokenChecker(token)) {
      res.status(401).json({ message: "Unauthorized:TOKEN_INVALID" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json("Unauthorized");
  }
};

export { AuthCheckMiddleware };
