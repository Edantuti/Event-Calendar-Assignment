import { Router } from "express";
import {
  postUserLogin,
  postUserRegister,
} from "../../../controller/user.controller";

const AuthRouter = Router();

AuthRouter.post("/login", postUserLogin);
AuthRouter.post("/register", postUserRegister);
// AuthRouter.post("/verify", VerifyController);
// AuthRouter.post("/resetpassword", ResetPasswordController);

export { AuthRouter };
