import jsonfile from 'jsonfile';
import { Beeper } from '../models/types';

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';

//CREATE
export const writeBeeperToJsonFile = async (beeper : Beeper): Promise<void> => {
  const beepers : Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  beepers.push(beeper);
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};

//READ
export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const beepers : Beeper[]  = await jsonfile.readFile(DB_FILE_PATH);
  return beepers;
};

//UPDATE
export const editBeeperToJsonFile = async(beeper : Beeper,editedBeeper : Beeper):Promise<void>=>{
  const beepers : Beeper[]  = await readFromJsonFile();
  
  const oldBeeperIndex = beepers.findIndex((b) => b.id === beeper.id);
  beepers[oldBeeperIndex] = editedBeeper
  await jsonfile.writeFile(DB_FILE_PATH,beepers)
 }

 //DELETE
 export const deleteBeeperFromJson = async (beeper : Beeper): Promise<void> => {
    const beepers : Beeper[]  = await readFromJsonFile();
    beepers.splice(beepers.indexOf(beeper), 1);
    await jsonfile.writeFile(DB_FILE_PATH,beepers);
};