var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';
//CREATE
export const writeBeeperToJsonFile = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile(DB_FILE_PATH);
    beepers.push(beeper);
    yield jsonfile.writeFile(DB_FILE_PATH, beepers);
});
//READ
export const readFromJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile(DB_FILE_PATH);
    return beepers;
});
//UPDATE
export const editBeeperToJsonFile = (beeper, editedBeeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    console.log(editedBeeper);
    const oldBeeperIndex = beepers.findIndex((b) => b.id === beeper.id);
    beepers[oldBeeperIndex] = editedBeeper;
    yield jsonfile.writeFile(DB_FILE_PATH, beepers);
});
//DELETE
export const deleteBeeperFromJson = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    beepers.splice(beepers.indexOf(beeper), 1);
    yield jsonfile.writeFile(DB_FILE_PATH, beepers);
});
