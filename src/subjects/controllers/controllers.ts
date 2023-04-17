import { Request, Response } from "express";
import Subject from "../models/Subjects";
import Topic from "../models/Topics";




const SubjectControllers = async(req: Request, res: Response) => {
    try {
        const allSubjects = await Subject.find();
        console.log("\n\t allSubjects: ", allSubjects)
        return res.status(200).json({
            status: true,
            data: allSubjects
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            data: []
        })
    }
};


export const TopicDetailsControllers = async(req: Request, res: Response) => {
    try {
        const subjectId = req.params.subjectId;
        // 643c31dd5343ca610cb6a74e
        console.log("\n\t subjectId: ", subjectId)
        console.log("\n\t subjectId: ", await Topic.find())
        // const particularSubject = await Subject.findById(subjectId);
        const subjectData = await Subject.findById(subjectId);
        if(subjectData){
            const topicsUnderSubject = await Topic.find({subject: subjectData._id});
            console.log("\n\t topicsUnderSubject: ", topicsUnderSubject)
            return res.status(200).json({
                status: true,
                data: topicsUnderSubject
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            data: []
        })
    }
};
export default SubjectControllers;