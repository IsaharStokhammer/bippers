import { Beeper, Status } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import {
    writeBeeperToJsonFile,
    readFromJsonFile,
    editBeeperToJsonFile,
    deleteBeeperFromJson
  } from "../DAL/jsonBeepers.js";

  export const createBeeper = async (
    name: string,
  ): Promise<string> => {
    const beepers : Beeper[]  = await readFromJsonFile();
    const existingBeeper = beepers.find((b) => b.name === name);
  
    if (existingBeeper) {
      throw new Error("name already exists.");
    }
  
    const newBeeperId: string = uuidv4();
  
    const newBeeper : Beeper = {
      id: newBeeperId,
      name: name,
      status: Status.manufactured,
      createTime: new Date(),
    }
  
    await writeBeeperToJsonFile(newBeeper);
    return newBeeperId;
  };