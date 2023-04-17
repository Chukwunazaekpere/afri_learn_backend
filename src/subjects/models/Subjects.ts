import { model, Model, Schema, ObjectId } from "mongoose";


interface SubjectInterface {
    subjectCode: string
    description: string
    dateCreated: Date
    dateUpdated: Date
    createdBy: Schema.Types.ObjectId
    updatedBy: Schema.Types.ObjectId
    stringDate: string
}
const SubjectSchema = new Schema<SubjectInterface>({
    subjectCode: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

const Subject = model<SubjectInterface>("Subject", SubjectSchema);
export default Subject;