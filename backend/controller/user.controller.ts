import { Request, Response } from "express";
import { checkPassword, hashPassword, tokenEncoder } from "../utils";
import { UserDataWithPassword } from "../types";
import { createUser, retrieveUser } from "../models/actions/user.action";

const postUserRegister = async (req: Request, res: Response) => {
  try {
    const userInfo: UserDataWithPassword = {
      ...req.body,
      password: hashPassword(req.body.password),
    };
    const { result, error: RetrieveUserError } = await retrieveUser({
      email: userInfo.email,
    });
    if (!result) {
      const { result, error: CreateUserError } = await createUser(userInfo);
      if (CreateUserError) {
        throw new Error(
          `Error: Creating User ${JSON.stringify(CreateUserError)}`,
        );
      }
      const token = tokenEncoder({
        email: userInfo.email,
        userid: result?.dataValues.id,
      });
      res.status(201).json({
        token,
        userData: {
          email: userInfo.email,
          first: userInfo.firstName,
          last: userInfo.lastName,
        },
      });
    } else if (result) {
      res.status(400).json({
        message: "User already exists",
      });
    } else {
      throw new Error(
        `Error: Retrieving User ${JSON.stringify(RetrieveUserError)}`,
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

const postUserLogin = async (req: Request, res: Response) => {
  const data = req.body;
  if (!data || !data.email || !data.password) {
    res.status(400).json({ message: "Incomplete Info" });
    return;
  }
  const { result: user } = await retrieveUser({ email: req.body.email });
  if (!user) {
    res.status(404).json({ message: "Unauthorized:NOT_FOUND" });
    return;
  }
  if (checkPassword(req.body.password, user.dataValues.password)) {
    res.json({
      token: tokenEncoder({
        email: user.dataValues.email,
        userid: user.dataValues.id,
      }),
      userData: {
        userid: user.dataValues.id,
        email: user.dataValues.email,
        first: user.dataValues.firstName,
        last: user.dataValues.lastName,
      },
    });
  } else if (checkPassword(req.body.password, user.dataValues.password)) {
    res.status(401).json({ message: "Unauthorized:NOT_VERIFIED" });
  } else {
    res.status(401).json({ message: "Unauthorized:INVALID_CREDENTIALS" });
  }
};

export { postUserLogin, postUserRegister };
