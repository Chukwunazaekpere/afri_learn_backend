"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const AfriLearnServer = (0, express_1.default)();
AfriLearnServer.use(express_1.default.json());
AfriLearnServer.use((0, cors_1.default)());
AfriLearnServer.use("/afri-learn/api/v1/", routes_1.default);
exports.default = AfriLearnServer;
