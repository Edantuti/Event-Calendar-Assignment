import { Router } from "express";
import { EventRouter } from "./event";
import { AuthRouter } from "./auth";

const v1 = Router();

v1.use("/event", EventRouter);
v1.use("/auth", AuthRouter);

export { v1 };
