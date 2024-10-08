var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deleteBeeper, promoteStatusToJson, getBeepersByStatusFromJson, getBeeperByIDFromJson, getAllBeepersFromJson, createBeeperToJsonFile } from "../services/beeperService.js";
export const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        if (!name) {
            res.status(400).json({ error: "name is required" });
            return;
        }
        const beeperId = yield createBeeperToJsonFile(name);
        res.status(201).json(beeperId);
    }
    catch (error) {
        if (error.message === "name already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error creating beeper:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getAllBeepersFromJson();
        res.status(200).json(beepers);
    }
    catch (error) {
        console.error("Error getting beepers:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
export const getBeeperByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const beeper = yield getBeeperByIDFromJson(id);
        if (!beeper) {
            res.status(404).json({ error: "beeper not found 🤔" });
        }
        else {
            res.status(200).json(beeper);
        }
    }
    catch (error) {
        console.error("Error getting beeper:", error);
        res.status(500).json({ error: "Internal server error.🙄" });
    }
});
export const promoteBeeperStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reponse = yield promoteStatusToJson(id);
        res.status(200).json(reponse);
    }
    catch (error) {
        console.error("Error promoting beeper status:", error);
        res.status(500).json({ error: "Internal server error.🙄" });
    }
});
export const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield deleteBeeper(id);
        res.status(204).json();
    }
    catch (error) {
        console.error("Error deleting beeper:", error);
        res.status(500).json({ error: "Internal server error.🙄" });
    }
});
export const getBeepersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.params;
        const beepers = yield getBeepersByStatusFromJson(status);
        res.status(200).json(beepers);
    }
    catch (error) {
        console.error("Error getting beepers by status:", error);
        res.status(500).json({ error: "Internal server error.🙄" });
    }
});
