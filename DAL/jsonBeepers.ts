import jsonfile from 'jsonfile';
import { Beeper } from '../models/types';

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';


export const writeBeeperToJsonFile = async (beeper : Beeper): Promise<void> => {
  const beepers : Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  beepers.push(beeper);
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};

export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const beepers : Beeper[]  = await jsonfile.readFile(DB_FILE_PATH);
  return beepers;
};

export const editBeeperToJsonFile = async(beeper : Beeper,editedBeeper : Beeper):Promise<void>=>{
  const beepers : Beeper[]  = await readFromJsonFile();
  console.log(editedBeeper)
  const oldBeeper = beepers.find((b) => b.id === beeper.id);
  beepers[beepers.indexOf(beeper)] = editedBeeper
  await jsonfile.writeFile(DB_FILE_PATH,beepers)
 }

 export const deleteBeeperFromJson = async (beeper : Beeper): Promise<void> => {
    const beepers : Beeper[]  = await readFromJsonFile();
    beepers.splice(beepers.indexOf(beeper), 1);
    await jsonfile.writeFile(DB_FILE_PATH,beepers);
};