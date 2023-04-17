import { todaysDate } from "date-fran";
import usersModel from "../users/models";
import { hashUserPassword } from "./passwordManipulation";
const { User } = usersModel;

import subjectModels from "../subjects/models";
const { Subject, Topic } = subjectModels;
import fs from "fs/promises";
import { promisify } from "util"; 



const subjects = [
    {code: "BBL", description: "Bible"},
    {code: "MTH", description: "Mathematics"},
    {code: "FTND", description: "Frontend"},
    {code: "BKND", description: "Backend"},
    {code: "MBL", description: "Mobile"},
    {code: "RBTCS", description: "Robotics"},
    {code: "DTA", description: "Data Analytics"},
    {code: "HST", description: "History"},
    {code: "LTR", description: "Literature"},
    {code: "ATN", description: "Astronomy"},
];


const userData = {
    firstname: "Strontium",
    lastname: "Plutonium",
}

class InjectSubjects{
    constructor(){
        this.systemUserData = {}as any;
    }
    systemUserData;
    async subjectInitialiser(){
        let [systemUser, password] = await Promise.all([
            User.findOne({
                firstname: userData.firstname,
                lastname: userData.lastname,
            }),
            hashUserPassword(process.env.SYSTEM_PASSWORD)
        ]);
        this.systemUserData = systemUser ? systemUser : "";
        if(!systemUser){
            systemUser = await User.create({
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: `${userData.firstname}@gmail.com`,
                userType: process.env.SYSTEM_USER_TYPE,
                dateCreated: todaysDate(),
                dateUpdated: todaysDate(),
                username: userData.firstname,
                lastSeen: todaysDate(),
                password,
                phone: process.env.SYSTEM_PHONE,
            });
            this.systemUserData = systemUser;
        };
        for(let subject of subjects){
            const subjectExists = await Subject.findOne({
                subjectCode: subject.code,
                description: subject.description
            });
            if(!subjectExists){
                await Subject.create({
                    dateCreated: todaysDate(),
                    subjectCode: subject.code,
                    description: subject.description,
                    stringDate: todaysDate().toDateString(),
                    createdBy: systemUser._id,
                    dateUpdated: todaysDate(),
                    updatedBy: systemUser._id
                })
                console.info(`Subject: ${subject.description} has been successfully initialised..................`)
            }
        };
    };
    async topicInitialiser(){
        const filenames = ['Astronomy', 'Literature', 'Mathematics', 'Mobile', 'History', 'Frontend'];
        try {
            for(let filename of filenames){
                // console.log("\n\t __dirname: ", __dirname);
                let [systemUser, jsonFile] = await Promise.all([
                    User.findOne({
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                    }),
                    fs.readFile(__dirname+`/seedData/${filename.toLowerCase()}.json`, {encoding: "utf-8"})
                ]);
                const listifyJsonFile = JSON.parse(jsonFile);
                console.info("\n\t json-listifyJsonFile: ", listifyJsonFile[0]);
                // console.info("\n\t json-file-typeof: ", typeof(listifyJsonFile));
                for(let book of listifyJsonFile){
                    const [subject, topic] = await Promise.all([
                        Subject.findOne({description: filename}),
                        Topic.findOne({title: book.title})
                    ]);
                    if(subject && !topic){
                        // console.info("\n\t json-book: ", book);
                        // console.info("\n\t json-subject: ", subject);
                        await Topic.create({
                            createdBy: systemUser!._id,
                            dateCreated: todaysDate(),
                            dateUpdated: todaysDate(),
                            isbn: +book.isbn || 0,
                            longDescription: book.longDescription,
                            pageCount: book.pageCount,
                            shortDescription: book.shortDescription,
                            stringDate: todaysDate().toDateString(),
                            subject: subject._id,
                            thumbnailUrl: book.thumbnailUrl,
                            title: book.title,
                            updatedBy: systemUser!._id
                        });
                        console.info(`Topic: ${book.title} has been successfully initialised..................`)
                    }
                };
            };
        } catch (error) {
            console.info("\n\t topicInitialiser-error: ", error)
            
        }
    }
};

export default InjectSubjects