import { Router } from "express";
import {
  deleteEvent,
  getEvent,
  patchEvent,
  postEvent,
} from "../../../controller/event.controller";
import { AuthCheckMiddleware } from "../../../middleware/auth.middleware";

const EventRouter = Router();

EventRouter.get("/", AuthCheckMiddleware, getEvent);
EventRouter.post("/create", AuthCheckMiddleware, postEvent);
EventRouter.patch("/modify", AuthCheckMiddleware, patchEvent);
EventRouter.delete("/delete", AuthCheckMiddleware, deleteEvent);

export { EventRouter };
