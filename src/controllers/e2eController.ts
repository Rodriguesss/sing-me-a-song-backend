import { Request, Response } from "express";
import { e2eService } from "../services/e2eService.js";

async function resetDatabase(req: Request, res: Response) {
  await e2eService.resetDatabase();

  res.sendStatus(200);
}

export const e2eController = {
  resetDatabase,
}