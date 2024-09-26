var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Status } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { writeBeeperToJsonFile, readFromJsonFile } from "../DAL/jsonBeepers.js";
export const createBeeper = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const existingBeeper = beepers.find((b) => b.name === name);
    if (existingBeeper) {
        throw new Error("name already exists.");
    }
    const newBeeperId = uuidv4();
    const newBeeper = {
        id: newBeeperId,
        name: name,
        status: Status.manufactured,
        createTime: new Date(),
    };
    yield writeBeeperToJsonFile(newBeeper);
    return newBeeperId;
});
