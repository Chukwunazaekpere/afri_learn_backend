import { Router } from "express";
import subjectRouter from "../subjects/routes";

const AfriLearnRouter = Router();

AfriLearnRouter.use("/subjects", subjectRouter);

export default AfriLearnRouter;