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
const date_fran_1 = require("date-fran");
const models_1 = __importDefault(require("../users/models"));
const passwordManipulation_1 = require("./passwordManipulation");
const { User } = models_1.default;
const models_2 = __importDefault(require("../subjects/models"));
const { Subject, Topic } = models_2.default;
const promises_1 = __importDefault(require("fs/promises"));
const subjects = [
    { code: "BBL", description: "Bible" },
    { code: "MTH", description: "Mathematics" },
    { code: "FTND", description: "Frontend" },
    { code: "BKND", description: "Backend" },
    { code: "MBL", description: "Mobile" },
    { code: "RBTCS", description: "Robotics" },
    { code: "DTA", description: "Data Analytics" },
    { code: "HST", description: "History" },
    { code: "LTR", description: "Literature" },
    { code: "ATN", description: "Astronomy" },
];
const userData = {
    firstname: "Strontium",
    lastname: "Plutonium",
};
class InjectSubjects {
    constructor() {
        this.systemUserData = {};
    }
    subjectInitialiser() {
        return __awaiter(this, void 0, void 0, function* () {
            let [systemUser, password] = yield Promise.all([
                User.findOne({
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                }),
                (0, passwordManipulation_1.hashUserPassword)(process.env.SYSTEM_PASSWORD)
            ]);
            this.systemUserData = systemUser ? systemUser : "";
            if (!systemUser) {
                systemUser = yield User.create({
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    email: `${userData.firstname}@gmail.com`,
                    userType: process.env.SYSTEM_USER_TYPE,
                    dateCreated: (0, date_fran_1.todaysDate)(),
                    dateUpdated: (0, date_fran_1.todaysDate)(),
                    username: userData.firstname,
                    lastSeen: (0, date_fran_1.todaysDate)(),
                    password,
                    phone: process.env.SYSTEM_PHONE,
                });
                this.systemUserData = systemUser;
            }
            ;
            for (let subject of subjects) {
                const subjectExists = yield Subject.findOne({
                    subjectCode: subject.code,
                    description: subject.description
                });
                if (!subjectExists) {
                    yield Subject.create({
                        dateCreated: (0, date_fran_1.todaysDate)(),
                        subjectCode: subject.code,
                        description: subject.description,
                        stringDate: (0, date_fran_1.todaysDate)().toDateString(),
                        createdBy: systemUser._id,
                        dateUpdated: (0, date_fran_1.todaysDate)(),
                        updatedBy: systemUser._id
                    });
                    console.info(`Subject: ${subject.description} has been successfully initialised..................`);
                }
            }
            ;
        });
    }
    ;
    topicInitialiser() {
        return __awaiter(this, void 0, void 0, function* () {
            const filenames = ['Astronomy', 'Literature', 'Mathematics', 'Mobile', 'History', 'Frontend'];
            try {
                for (let filename of filenames) {
                    // console.log("\n\t __dirname: ", __dirname);
                    let [systemUser, jsonFile] = yield Promise.all([
                        User.findOne({
                            firstname: userData.firstname,
                            lastname: userData.lastname,
                        }),
                        promises_1.default.readFile(__dirname + `/seedData/${filename.toLowerCase()}.json`, { encoding: "utf-8" })
                    ]);
                    const listifyJsonFile = JSON.parse(jsonFile);
                    console.info("\n\t json-listifyJsonFile: ", listifyJsonFile[0]);
                    // console.info("\n\t json-file-typeof: ", typeof(listifyJsonFile));
                    for (let book of listifyJsonFile) {
                        const [subject, topic] = yield Promise.all([
                            Subject.findOne({ description: filename }),
                            Topic.findOne({ title: book.title })
                        ]);
                        if (subject && !topic) {
                            // console.info("\n\t json-book: ", book);
                            // console.info("\n\t json-subject: ", subject);
                            yield Topic.create({
                                createdBy: systemUser._id,
                                dateCreated: (0, date_fran_1.todaysDate)(),
                                dateUpdated: (0, date_fran_1.todaysDate)(),
                                isbn: +book.isbn || 0,
                                longDescription: book.longDescription,
                                pageCount: book.pageCount,
                                shortDescription: book.shortDescription,
                                stringDate: (0, date_fran_1.todaysDate)().toDateString(),
                                subject: subject._id,
                                thumbnailUrl: book.thumbnailUrl,
                                title: book.title,
                                updatedBy: systemUser._id
                            });
                            console.info(`Topic: ${book.title} has been successfully initialised..................`);
                        }
                    }
                    ;
                }
                ;
            }
            catch (error) {
                console.info("\n\t topicInitialiser-error: ", error);
            }
        });
    }
}
;
exports.default = InjectSubjects;
