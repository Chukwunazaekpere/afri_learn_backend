"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
// "publishedDate": { "$date": "1998-07-01T00:00:00.000-0700" },
// "authors": ["Tim Hatton"],
// "categories": ["PowerBuilder"]
const TopicSchema = new mongoose_1.Schema({
    subject: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: false
    },
    pageCount: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: false
    },
    longDescription: {
        type: String,
        required: false
    },
    isbn: {
        type: Number,
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
const Topic = (0, mongoose_1.model)("Topic", TopicSchema);
exports.default = Topic;
