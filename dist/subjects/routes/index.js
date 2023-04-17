"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const { SubjectControllers, TopicDetailsControllers } = controllers_1.default;
const subjectRouter = (0, express_1.Router)();
subjectRouter.get("/all", SubjectControllers);
subjectRouter.get("/topic-details/:subjectId", TopicDetailsControllers);
exports.default = subjectRouter;
