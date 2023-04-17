"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicDetailsControllers = void 0;
const Subjects_1 = __importDefault(require("../models/Subjects"));
const Topics_1 = __importDefault(require("../models/Topics"));
const SubjectControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSubjects = yield Subjects_1.default.find();
        console.log("\n\t allSubjects: ", allSubjects);
        return res.status(200).json({
            status: true,
            data: allSubjects
        });
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            data: []
        });
    }
});
const TopicDetailsControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjectId = req.params.subjectId;
        // 643c31dd5343ca610cb6a74e
        console.log("\n\t subjectId: ", subjectId);
        console.log("\n\t subjectId: ", yield Topics_1.default.find());
        // const particularSubject = await Subject.findById(subjectId);
        const subjectData = yield Subjects_1.default.findById(subjectId);
        if (subjectData) {
            const topicsUnderSubject = yield Topics_1.default.find({ subject: subjectData._id });
            console.log("\n\t topicsUnderSubject: ", topicsUnderSubject);
            return res.status(200).json({
                status: true,
                data: topicsUnderSubject
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            data: []
        });
    }
});
exports.TopicDetailsControllers = TopicDetailsControllers;
exports.default = SubjectControllers;
