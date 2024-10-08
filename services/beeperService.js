var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Status } from "../models/types.js";
import { v4 as uuidv4 } from "uuid";
import { writeBeeperToJsonFile, readFromJsonFile, editBeeperToJsonFile, deleteBeeperFromJson } from "../DAL/jsonBeepers.js";
import { Longitude, Latitude } from "../models/pointsInLebanon.js";
const seqToBoom = 10;
//CREATE
export const createBeeperToJsonFile = (name) => __awaiter(void 0, void 0, void 0, function* () {
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
export const getAllBeepersFromJson = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield readFromJsonFile();
});
export const getBeeperByIDFromJson = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield getAllBeepersFromJson();
    const beeper = beepers.find((b) => b.id === beeperId);
    if (beeper) {
        return beeper;
    }
    else
        return -1;
});
export const getBeepersByStatusFromJson = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield getAllBeepersFromJson();
    return beepers.filter((b) => Status[b.status] == status);
});
//UPDATE
export const promoteStatusToJson = (id, LAT, LON) => __awaiter(void 0, void 0, void 0, function* () {
    ;
    const beeper = yield getBeeperByIDFromJson(id);
    if (typeof (beeper) == 'number') {
        return "beeper dos not exist";
    }
    else {
        const currentStatus = beeper.status;
        if (currentStatus < 4) {
            beeper.status = currentStatus + 1;
            beeper.explosionTime = new Date();
            beeper.lonPoint = LON;
            beeper.latPoint = LAT;
            yield editBeeperToJsonFile(beeper, beeper);
            return `status promoted to ${currentStatus + 1} `;
        }
        else if (currentStatus == 4) {
            if (isInLebanon(LAT, LON)) {
                return `status promoted to ${currentStatus + 1} `;
                boomTheBeeper(beeper, seqToBoom);
            }
            else {
                return "invalid coordinates";
            }
        }
        else {
            return "the beepers status are already at the highest level";
        }
    }
});
const boomTheBeeper = (beeper, seqToBoom) => __awaiter(void 0, void 0, void 0, function* () {
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        beeper.status = Status.detonated;
        yield editBeeperToJsonFile(beeper, beeper);
    }), seqToBoom * 1000);
});
export const isInLebanon = (LAT, LON) => {
    if (LAT && LON) {
        if (Latitude.includes(LAT) && Longitude.includes(LON)) {
            return true;
        }
        return false;
    }
    return false;
};
//DELETE
export const deleteBeeper = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beeper = yield getBeeperByIDFromJson(beeperId);
    yield deleteBeeperFromJson(beeper);
});
