import { Request, Response } from "express";
import {deleteBeeper, promoteStatus, getBeepersByStatus, getBeeperByID, getAllBeepers, createBeeper} from "../services/beeperService.js";
import { Beeper, Status } from "../models/types.js";


export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const name: string = req.body;

    if (!name) {
      res.status(400).json({ error: "name is required" });
      return;
    }

    const beeperId = await createBeeper(name);
    res.status(201).json(beeperId);
  } catch (error: any) {
    if (error.message === "name already exists.") {
      res.status(409).json({ error: error.message });
    } else {
      console.error("Error creating beeper:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};