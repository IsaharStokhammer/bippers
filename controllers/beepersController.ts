import { Request, Response } from "express";
import {deleteBeeper, promoteStatusToJson, getBeepersByStatusFromJson, getBeeperByIDFromJson, getAllBeepersFromJson, createBeeperToJsonFile} from "../services/beeperService.js";
import { Beeper, Status } from "../models/types.js";
import exp from "constants";


export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const name: string = req.body;

    if (!name) {
      res.status(400).json({ error: "name is required" });
      return;
    }

    const beeperId = await createBeeperToJsonFile(name);
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

export const getAllBeepers = async (req: Request, res: Response): Promise<void> => {
  try {
    const beepers = await getAllBeepersFromJson();
    res.status(200).json(beepers);
  } catch (error: any) {
    console.error("Error getting beepers:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export const getBeeperByID = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const beeper = await getBeeperByIDFromJson(id);
    if (!beeper) {
      res.status(404).json({ error: "beeper not found 🤔" });
    } else {
      res.status(200).json(beeper);
    }
  } catch (error: any) {
    console.error("Error getting beeper:", error);
    res.status(500).json({ error: "Internal server error.🙄" });
  }
}

export const promoteBeeperStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const reponse : string = await promoteStatusToJson(id);
    res.status(200).json(reponse);
  } catch (error: any) {
    console.error("Error promoting beeper status:", error);
    res.status(500).json({ error: "Internal server error.🙄" });
  }
}

export const deleteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteBeeper(id);
    res.status(204).json();
  } catch (error: any) {
    console.error("Error deleting beeper:", error);
    res.status(500).json({ error: "Internal server error.🙄" });
  }
}
