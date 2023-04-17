"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userRoles = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./backend/src/config/.env" });
exports.userRoles = [
    "Parent",
    "Adolescent",
    "Undergraduate",
    "Graduate",
    "Masters",
    "Super Admin",
];
;
const UserSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: false
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
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
UserSchema.statics.computeUsersId = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const userDocs = await this.find();
            // const userDocsId = await generateCollectionId(userDocs, 'userId', this);
            // return userDocsId;
        }
        catch (error) {
            return undefined;
        }
    });
};
UserSchema.statics.getUsersId = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usersId = yield this.findById(id);
            return usersId.userId;
        }
        catch (error) {
            return undefined;
        }
    });
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
