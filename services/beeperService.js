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
import { writeBeeperToJsonFile, readFromJsonFile, editBeeperToJsonFile } from "../DAL/jsonBeepers.js";
//CREATE
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
//READ
export const getAllBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield readFromJsonFile();
});
export const getBeeperByID = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield getAllBeepers();
    const beeper = beepers.find((b) => b.id === beeperId);
    if (beeper) {
        return beeper;
    }
    else
        return -1;
});
//UPDATE
export const promoteStatus = (id, LAT, LON) => __awaiter(void 0, void 0, void 0, function* () {
    ;
    const beeper = yield getBeeperByID(id);
    if (typeof (beeper) == 'number') {
        return "beeper dos not exist";
    }
    else {
        const currentStatus = beeper.status;
        if (currentStatus < 4) {
            beeper.status == currentStatus + 1;
            beeper.explosionTime = new Date();
            if (LAT) {
                beeper.latPoint = LAT;
            }
            if (LON) {
                beeper.lonPoint = LON;
            }
            yield editBeeperToJsonFile(beeper, beeper);
            return `status promoted to ${currentStatus + 1} `;
        }
        else if (currentStatus == 4) {
            if (beeper.latPoint && beeper.lonPoint) {
                if (isInLebanon(beeper.latPoint, beeper.lonPoint))
                    ;
                {
                    return `status promoted to ${currentStatus + 1} `;
                }
            }
        }
        else {
            return "the beepers status are already at the highest level";
        }
    }
});
export const isInLebanon = (LAT, LON) => {
    return true;
};
