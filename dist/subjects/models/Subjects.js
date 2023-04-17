"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubjectSchema = new mongoose_1.Schema({
    subjectCode: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false
    },
    dateCreated: {
        type: Date,
        required: true
    },
    dateUpdated: {
        type: Date,
        required: true
    },
    stringDate: {
        type: String,
        required: true
    }
});
const Subject = (0, mongoose_1.model)("Subject", SubjectSchema);
exports.default = Subject;
