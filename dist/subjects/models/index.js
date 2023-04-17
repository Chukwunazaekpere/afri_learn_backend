"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Subjects_1 = __importDefault(require("./Subjects"));
const Topics_1 = __importDefault(require("./Topics"));
const subjectModels = {
    Subject: Subjects_1.default,
    Topic: Topics_1.default
};
exports.default = subjectModels;
