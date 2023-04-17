import express, { Application } from "express";
import cors from "cors";
import AfriLearnRouter from "./routes";

const AfriLearnServer: Application = express();

AfriLearnServer.use(express.json());
AfriLearnServer.use(cors());

AfriLearnServer.use("/afri-learn/api/v1/", AfriLearnRouter);
export default AfriLearnServer;