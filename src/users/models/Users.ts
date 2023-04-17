import mongoose, {Model, ObjectId, Schema} from "mongoose";
import dotenv from "dotenv";
import { todaysDate } from "date-fran";

dotenv.config({path: "./backend/src/config/.env"})

interface UsersSchemaInterface {
    firstname: string
    lastname: string
    email: string
    username: string
    password: string
    userType: string
    phone: string
    lastSeen: Date
    createdBy: ObjectId
    updatedBy: ObjectId
    dateCreated: Date,
    dateUpdated: Date
}
export const userRoles = [
   "Parent",
   "Adolescent",
   "Undergraduate",
   "Graduate",
   "Masters",
   "Super Admin",
];

interface UsersMethods extends Model<UsersSchemaInterface> {
    computeUsersId: () => Promise<string | undefined>
    getUsersId: (id: string) => Promise<string | undefined>
};

const UserSchema = new mongoose.Schema<UsersSchemaInterface>({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: false
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        required: false
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    lastSeen: {
        type: Date,
        required: false,
    },
    dateUpdated: {
        type: Date,
        required: true
    }
});


UserSchema.statics.computeUsersId = async function(): Promise<string | undefined> { 
    try {
        // const userDocs = await this.find();
        // const userDocsId = await generateCollectionId(userDocs, 'userId', this);
        // return userDocsId;
    } catch (error: any) {
        return undefined
    }
}

UserSchema.statics.getUsersId = async function(id: string): Promise<string | undefined> { 
    try {
        const usersId = await this.findById(id);
        return usersId.userId;
    } catch (error) {
        return undefined
    }
}

const User = mongoose.model<UsersSchemaInterface, UsersMethods>("User", UserSchema);
export default User;