import { Router} from "express";
import subjectControllers from "../controllers";
const { SubjectControllers, TopicDetailsControllers } = subjectControllers;


const subjectRouter = Router()


subjectRouter.get("/all", SubjectControllers)
subjectRouter.get("/topic-details/:subjectId", TopicDetailsControllers)


export default subjectRouter;