import { Request, Response } from "express";
import {
  createEvent,
  modifyEvent,
  removeEvent,
  retrieveEvent,
} from "../models/actions/event.action";
import { tokenDecoder } from "../utils";

const postEvent = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  if (!data || !data.title || !data.description || !data.dateTime) {
    let message = "Incomplete Info";
    if (!data.title) message += ", title";
    if (!data.description) message += ", description";
    if (!data.dateTime) message += ", dateTime";
    res.status(400).json({ message: message });
    return;
  }
  const tokenData: { userid: string; email: string } | undefined = tokenDecoder(
    req.header("Authorization")!.substring(7),
  );
  if (!tokenData) {
    res.status(400).json({ message: "Incomplete Info" });
    return;
  }
  const { result, error } = await createEvent({
    ...data,
    userId: tokenData.userid,
  });
  if (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
  res.status(201).json(result);
};
const deleteEvent = async (req: Request, res: Response) => {
  const data = req.query;
  if (!data || !data.eventId) {
    res.status(400).json({ message: "Incomplete Info" });
    return;
  }
  const tokenData: { userid: string; email: string } | undefined = tokenDecoder(
    req.header("Authorization")!.substring(7),
  );
  if (!tokenData) {
    res.status(400).json({ message: "Incomplete Info" });
    return;
  }

  const { error } = await removeEvent(data.eventId as string, tokenData.userid);
  if (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
  res.status(204).json();
};
const getEvent = async (req: Request, res: Response) => {
  const tokenData: { userid: string; email: string } | undefined = tokenDecoder(
    req.header("Authorization")!.substring(7),
  );
  if (!tokenData) {
    res.status(400).json({ message: "Incomplete Info" });
    return;
  }

  let data: any = {
    userId: tokenData.userid,
  };
  const { result, error } = await retrieveEvent(data);
  if (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
  res.json(result);
};
const patchEvent = async (req: Request, res: Response) => {
  const data = req.body;
  if (!data || !data.id) {
    res.status(400).json({ message: "Incomplete Info" });
    return;
  }
  const tokenData: { userid: string; email: string } | undefined = tokenDecoder(
    req.header("Authorization")!.substring(7),
  );
  if (!tokenData) {
    res.status(400).json({ message: "Incomplete Info" });
    return;
  }
  const { result, error } = await modifyEvent(data, tokenData.userid);
  if (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
  res.json({ message: "Event Details Updated" });
};
export { getEvent, postEvent, patchEvent, deleteEvent };
