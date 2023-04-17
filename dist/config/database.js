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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./src/config/.env" });
const NODE_ENV = process.env.NODE_ENV;
const DB_URI = NODE_ENV === "local" ? process.env.LOCAL_DB_URI : process.env.STAGE_DB_URI;
const databaseConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.info("Afri learn is initiating a database connection.....");
        yield mongoose_1.default.connect(DB_URI, {
        // useCreateIndex: true,
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        });
        yield mongoose_1.default.connection.collection("topics").drop();
        console.info("Database connection was successful....");
    }
    catch (error) {
        console.error("Error in database connection........");
    }
    ;
});
exports.default = databaseConfig;
