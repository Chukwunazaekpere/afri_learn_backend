import { model, Model, Schema, ObjectId } from "mongoose";


interface TopicInterface {
    subject: Schema.Types.ObjectId
    title: string
    dateCreated: Date
    dateUpdated: Date
    createdBy: Schema.Types.ObjectId
    updatedBy: Schema.Types.ObjectId
    stringDate: string
    isbn: number
    pageCount:number
    thumbnailUrl: string
    shortDescription: string
    longDescription: string
};

        // "publishedDate": { "$date": "1998-07-01T00:00:00.000-0700" },
        // "authors": ["Tim Hatton"],
        // "categories": ["PowerBuilder"]
const TopicSchema = new Schema<TopicInterface>({
    subject: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
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

const Topic = model<TopicInterface>("Topic", TopicSchema);
export default Topic;