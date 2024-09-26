import { Beeper, Status } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import {
    writeBeeperToJsonFile,
    readFromJsonFile,
    editBeeperToJsonFile,
    deleteBeeperFromJson
  } from "../DAL/jsonBeepers.js";

  //CREATE
  export const createBeeper = async (name: string): Promise<string> => {
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

  //READ
  export const getAllBeepers = async (): Promise<Beeper[]> => {
    return await readFromJsonFile();
  }

  export const getBeeperByID = async (beeperId: string): Promise<Beeper | Number> => {
    const beepers : Beeper[]  = await getAllBeepers();
    const beeper = beepers.find((b) => b.id === beeperId);
    if (beeper){
        return beeper
    }
    else return -1;
  }

  //UPDATE
export const promoteStatus = async (id : string, LAT? : Number, LON? : Number): Promise<string> => {;
    const beeper =await getBeeperByID(id);
    if (typeof(beeper) == 'number') {
        return "beeper dos not exist"
    }
    else{
        const currentStatus = (beeper as Beeper).status;
        if (currentStatus < 4){
            (beeper as Beeper).status == currentStatus+1;
            (beeper as Beeper).explosionTime = new Date();
            if (LAT){
                (beeper as Beeper).latPoint = LAT;
            }
            if (LON){                
                (beeper as Beeper).lonPoint = LON;
            }
            await editBeeperToJsonFile((beeper as Beeper),(beeper as Beeper));
            return `status promoted to ${currentStatus+1} `
        }
        else if(currentStatus == 4){ 
            if ((beeper as Beeper).latPoint && (beeper as Beeper).lonPoint){
                if (isInLebanon((beeper as Beeper).latPoint , (beeper as Beeper).lonPoint))){
                    return `status promoted to ${currentStatus+1} `
                }
            }
        }
        else{ return "the beepers status are already at the highest level"}
    }
}

export const isInLebanon = (LAT: Number, LON: Number):boolean => {
    return true
}